import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { deviceInformationdb } from '../lib/database.js';

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
  deviceInformationdb.remove({});

  for (beacon of beacons) {
    deviceInformationdb.insert({
      "beaconID": beacon.beaconID,
      "macAddress": beacon.macAddress,
      "location": null,
      "previousLocation": null
    });
  }

  //calls function to send data of ble beacons to hospital software
  sendData()

});

//the farest away in meters the beacon can be from the radio before it will not update location

const distanceToUpdate = 20;
//handle request from ble-reciever to update db with location of device
WebApp.connectHandlers.use("/location", function (req, res, next) {
  if (req.method === 'POST') {
    req.on('data', Meteor.bindEnvironment((data) => {
      const body = JSON.parse(data);
      console.log(body);
      const beaconMacAddress = body.beaconMacAddress;
      const distance = body.distance;
      const radioMacAddress = body.radioMacAddress;
      //if statement checking how far away the beacon is from the radio sending the transmission
      if (distance <= distanceToUpdate) {
        for (radio of radios) {
          console.log(radioMacAddress);
          console.log(radio.macAddress);
          console.log(radioMacAddress === radio.macAddress)
          if (radioMacAddress === radio.macAddress) {
            console.log('success checking radio')
            //calling functions to add location to deviceDB and then send updated information to patientDB
            addLocation(beaconMacAddress, radio.location, distance)
            updateLocation(beaconMacAddress);
            break;
          }
        }
      }
    }));
    res.end(Meteor.release)
  }
});

//handle request from ble-receiver to respond with the config file
WebApp.connectHandlers.use("/config", (req, res, next) => {
  if (req.method === 'GET') {
    res.writeHead(200).end(JSON.stringify(config));
  }
});

//testing purposes
WebApp.connectHandlers.use("/testLocation", function (req, res, next) {
  if (req.method === 'POST') {
    req.on('data', Meteor.bindEnvironment((data) => {
      const body = JSON.parse(data);
      console.log(body);
      const beaconID = body.beaconID
      const location = body.location
      const distance = body.distance
      const beaconMacAddress = body.macAddress
      console.log(beaconID, location)
      if (distance <= distanceToUpdate) {
        addLocation(beaconMacAddress, location, distance)
        updateLocation(beaconMacAddress)
      }
    }));
    res.end(Meteor.release)
  }
});

//add test location to beacon
function testAddLocation(beaconID, location, distance) {
  deviceInformationdb.update({ beaconID: beaconID }, { $set: { location: location, time: getCurrentTime(), distance: distance } })
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
function updateLocation(beaconMacAddress) {
  let beaconToUpdate = deviceInformationdb.findOne({ macAddress: beaconMacAddress })
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

//add location to beacon
function addLocation(beaconMacAddress, location, distance) {
  let locArray=[]
  let prevArray=[]
  
  let beaconToUpdate = deviceInformationdb.findOne({macAddress:beaconMacAddress});
  
  prevArray.push(beaconToUpdate.arr)
  for(let i=0;i<prevArray.length;i++){
    locArray.push(prevArray[i])
  }

  deviceInformationdb.update({ macAddress: beaconMacAddress }, { $set: { location: location, time: getCurrentTime(), distance: distance, previousLocation: beaconToUpdate.location, arr:locArray } })
  
  
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