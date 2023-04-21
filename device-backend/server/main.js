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
    clientSoftwareUrl: "http://localhost:3000",
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
  //for clearing collections on startup for testing purposes
  /*deviceInformationdb.remove({});
  deviceHistorydb.remove({});
  radiodb.remove({});*/

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
  sendData();
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

//the farthest away in meters the beacon can be from the radio before it will not update location
const distanceToUpdate = 20;
WebApp.connectHandlers.use("/location", function (req, res, next) {
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

//update beacon location
function updateLocation(beaconMacAddress, location) {
  let beaconToUpdate = deviceInformationdb.findOne({ macAddress: beaconMacAddress });
  deviceInformationdb.update({ macAddress: beaconMacAddress }, { $set: { location: location } });

  if (beaconToUpdate.location !== location) {
    axios.post(`${config.clientSoftwareUrl}/update`, {
      beaconID: beaconToUpdate.beaconID,
      location: location
    })
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error)
    });
   
    //webchart update (only for Larry)
    //https://bletracking.webchartnow.com/webchart.cgi?f=layoutnouser&name=TrackingGateway&apikey=12345Tracking&pat_id=18&station_name=${location.replace(/\s/g, '')}&raw
    if (beaconToUpdate.beaconID === "Larry") {
      axios.get(`https://bletracking.webchartnow.com/webchart.cgi?f=layoutnouser&name=TrackingGateway&apikey=12345Tracking&pat_id=18&station_name=${location.replace(/\s/g, '')}&raw`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }
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
  axios.post(`${config.clientSoftwareUrl}/getBLEs`, arrayOfDevices)
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error)
    })
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