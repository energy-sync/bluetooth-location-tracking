import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { deviceInformationdb, deviceHistorydb, radiodb } from '../lib/database.js';

import axios from 'axios';
const fs = Npm.require('fs')

let configPath = process.cwd().split('.meteor')[0] + "config.json";
let config;

if (!fs.existsSync(configPath)) {
  config = {
    refreshTime: 1,
    measuredPower: -59,
    environmentalFactor: 3,
    distanceChangeToTransmit: 3,
    controllerUrl: "http://localhost:3002",
    restart: false,
    beacons: [],
    radios: []
  };
  saveConfig();
}
else config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const beacons = config.beacons
const radios = config.radios

Meteor.startup(() => {
  // code to run on server at startup

  //for clearing collections on startup for testing purposes
  deviceInformationdb.remove({});
  deviceHistorydb.remove({});
  radiodb.remove({});

  for (beacon of beacons) {
    let b = deviceInformationdb.findOne({"beaconID": beacon.beaconID, "macAddress": beacon.macAddress});
    if (!b) {
      deviceInformationdb.insert({
        "beaconID": beacon.beaconID,
        "macAddress": beacon.macAddress,
        "config": config
      });
    }
  }

  for (radio of radios) {
    let r = radiodb.findOne({"macAddress": radio.macAddress});
    if (!r) {
      let radioConfig = config;
      delete radioConfig.radios;
      radiodb.insert({
        "location": radio.location,
        "macAddress": radio.macAddress,
        "lastPing": 0,
        "online": false,
        "config": radioConfig
      });
    }
  }

  //calls function to send data of ble beacons to hospital software
  sendData()

});

//the farest away in meters the beacon can be from the radio before it will not update location

const distanceToUpdate = 2;
//handle request from ble-reciever to update db with location of device
WebApp.connectHandlers.use("/location", function (req, res, next) {
  if (req.method === 'POST') {
    req.on('data', Meteor.bindEnvironment((data) => {
      const body = JSON.parse(data);
      const beaconMacAddress = body.beaconMacAddress;
      const distance = body.distance;
      const radioMacAddress = body.radioMacAddress;
      //if statement checking how far away the beacon is from the radio sending the transmission
      if (distance <= distanceToUpdate) {
        for (radio of radios) {
          if (radioMacAddress === radio.macAddress) {
            //calling functions to add location to deviceDB and then send updated information to patientDB
            addLocation(beaconMacAddress, radio.location, distance)
            updateLocation(beaconMacAddress, radio.location);
            break;
          }
        }
      }
    }));
    res.end(Meteor.release) 
  }
});

//handle request from ble-receiver to respond with the config file
//also acts as an "alive" ping
WebApp.connectHandlers.use("/config", (req, res, next) => {
  if (req.method === 'POST') {
    req.on("data", Meteor.bindEnvironment(data => {
      //update last ping timestamp
      data = JSON.parse(data);
      radiodb.update({macAddress: data.macAddress}, {$set: {lastPing: Date.now()}});

      //send config as response
      let radio = radiodb.findOne({macAddress: data.macAddress});
      res.writeHead(200).end(JSON.stringify(radio.config));

      //set restart back to false
      radio.config.restart = false;
      radiodb.update({macAddress: radio.macAddress}, {$set: {config: radio.config}});
    }));
  }
});

//testing purposes
WebApp.connectHandlers.use("/testLocation", function (req, res, next) {
  if (req.method === 'POST') {
    req.on('data', Meteor.bindEnvironment((data) => {
      const body = JSON.parse(data);
      //console.log("body:", body);
      const beaconID = body.beaconID
      const location = body.location
      const distance = body.distance
      const beaconMacAddress = body.macAddress
      console.log(beaconID, location)
      if (distance <= distanceToUpdate) {
        addLocation(beaconMacAddress, location, distance)
        updateLocation(beaconMacAddress, location)
      }
    }));
    res.end(Meteor.release) 
  }
});

//check for devices that have pinged in the last 10 seconds to determine if they are online
Meteor.setInterval(function () {
  for (radio of radiodb.find({}).fetch()) {
    let isOnline = Date.now() - radio.lastPing < 10000;
    radiodb.update({macAddress: radio.macAddress}, {$set: {online: isOnline}});
  }
}, 5000);

//add test location to beacon
function testAddLocation(beaconID, location, distance) {
  deviceInformationdb.update({ beaconID: beaconID }, { $set: { location: location, time: getCurrentTime(), distance: distance } });
}
//update the location of the beacon to hospital software when the location changes from beacon
function testUpdateLocation(beaconID) {
  let beaconToUpdate = deviceInformationdb.findOne({ beaconID: beaconID })
  console.log(beaconToUpdate.beaconID, beaconToUpdate.location)
  axios.post('http://localhost:3000/update', {
    beaconID: beaconToUpdate.beaconID,
    location: beaconToUpdate.location
  })
  .then(function (response) {
  })
  .catch(function (error) {
    console.log(error)
  })
}

//end of test code

//update beacon location
function updateLocation(beaconMacAddress, location) {
  let beaconToUpdate = deviceInformationdb.findOne({ macAddress: beaconMacAddress });
  deviceInformationdb.update({ macAddress: beaconMacAddress }, { $set: { location: location } });
  axios.post('http://localhost:3000/update', {
    beaconID: beaconToUpdate.beaconID,
    location: location
  })
  .then(function (response) {
  })
  .catch(function (error) {
    console.log(error)
  })
}

//add location to beacon history
function addLocation(beaconMacAddress, location, distance) {
  let beaconHistory = deviceHistorydb.findOne({macAddress:beaconMacAddress});
  if (!beaconHistory) {
    deviceHistorydb.insert({
      macAddress: beaconMacAddress,
      history: [{location: location, timestamp: new Date(Date.now())}]
    })
  }
  else if (!location || beaconHistory.history[beaconHistory.history.length - 1].location !== location) {
    newHistory = beaconHistory.history;
    newHistory.push({location: location, timestamp: new Date(Date.now())});
    deviceHistorydb.update({ macAddress: beaconMacAddress }, { $set: { history: newHistory } });
  }  
}

//send all beacons to EHR
function sendData() {
  //grab an array of devices
  let arrayOfDevices = deviceInformationdb.find().fetch()
  //console.log(arrayOfDevices)
  axios.post('http://localhost:3000/getBLEs', arrayOfDevices)
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error)
    })
}

function getCurrentTime() {
  return Date(Date.now())
}

//scan for updates to config.json
setInterval(() => {
  let newConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  if (JSON.stringify(config) !== JSON.stringify(newConfig)) {
    console.log("Config updated");
    config = newConfig;
  }
}, 5000);

function saveConfig() {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
  fs.chmodSync(configPath, "0777");
}

Meteor.methods({
  updateRadioConfig: (macAddress, config) => {
    radiodb.update({macAddress: macAddress}, {$set: {config: config}});
  },

  updateBeaconName: (macAddress, beaconID) => {
    deviceInformationdb.update({macAddress: macAddress}, {$set: {beaconID: beaconID}});
    for (let i = 0; i < config.beacons.length; i++) {
      if (config.beacons[i].macAddress === macAddress) {
        config.beacons[i].beaconID = beaconID;
        break;
      }
    }
    saveConfig();

    for (let radio of radiodb.find({}).fetch()) {
      let radioConfig = radio.config;
      for (let i = 0; i < radioConfig.beacons.length; i++) {
        if (radioConfig.beacons[i].macAddress === macAddress) {
          radioConfig.beacons[i].beaconID = beaconID;
          break;
        }
      }
      radiodb.update({macAddress: radio.macAddress}, {$set: {config: radioConfig}});
    }

  },

  updateRadioLocation: (macAddress, location) => {
    radiodb.update({macAddress: macAddress}, {$set: {location: location}});
    for (let i = 0; i < config.radios.length; i++) {
      if (config.radios[i].macAddress === macAddress) {
        config.radios[i].location = location;
        break;
      }
    }
    saveConfig();
  },

  addBeacon: (beaconID, macAddress) => {
    config.beacons.push({
      beaconID: beaconID,
      macAddress: macAddress
    });
    saveConfig();

    deviceInformationdb.insert({
      beaconID: beaconID,
      macAddress: macAddress,
      config: config 
    });

    for (let radio of radiodb.find({}).fetch()) {
      let radioConfig = radio.config;
      radioConfig.beacons.push({
        beaconID: beaconID,
        macAddress: macAddress
      });
      radiodb.update({macAddress: radio.macAddress}, {$set: {config: radioConfig}});
    }
  },

  addRadio: (location, macAddress) => {
    config.radios.push({
      location: location,
      macAddress: macAddress
    });
    saveConfig();

    radiodb.insert({
      location: location,
      macAddress: macAddress,
      lastPing: 0, 
      online: false,
      config: config
    });
  },

  deleteBeacon: (macAddress) => {
    for (let i = 0; i < config.beacons.length; i++) {
      if (config.beacons[i].macAddress === macAddress) {
        config.beacons.splice(i, 1);
        break;
      }
    }
    saveConfig();

    deviceInformationdb.remove({macAddress: macAddress});

    for (let radio of radiodb.find({}).fetch()) {
      let radioConfig = radio.config;
      for (let i = 0; i < radioConfig.beacons.length; i++) {
        if (radioConfig.beacons[i].macAddress === macAddress) {
          radioConfig.beacons.splice(i, 1);
          break;
        }
      }
      radiodb.update({macAddress: radio.macAddress}, {$set: {config: radioConfig}});
    }
  },

  deleteRadio: (macAddress) => {
    for (let i = 0; i < config.radios.length; i++) {
      if (config.radios[i].macAddress === macAddress) {
        config.radios.splice(i, 1);
        break;
      }
    }
    saveConfig();

    radiodb.remove({macAddress: macAddress});
  }
}); 