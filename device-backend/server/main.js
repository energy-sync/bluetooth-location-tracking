import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { deviceInformationdb } from '../lib/database.js';

import axios from 'axios';
const fs = Npm.require('fs')

const config1 = JSON.parse(fs.readFileSync(process.cwd().split('.meteor')[0] +"deviceConfig.json", "utf-8"));
const beacons = config1.beacons
const radios = config1.radios



Meteor.startup(() => {
  // code to run on server at startup
  deviceInformationdb.remove({});

    for(device of beacons){
      deviceInformationdb.insert({
        "beaconID": device.beaconID,
        "macAddress": device.macAddress
      });
    }

    //dummy Data for patient overview page
    const locations = ["Reception", "Dermatology", "General Practitioner", "Lab"];

    //random number
    const getRandomNumber = (max) => Math.floor(Math.random() * max);
  
  
    //getting random names
    function getRandomLocation(arr1) {
      let location = arr1[getRandomNumber(arr1.length)];
      return location;
    }
  
  
    for (let i = 0; i < 6; i++) {
      var patientID = "XXXXXXX".replace(/X/g, function () {
        return "0123456789ABCDEF".charAt((Math.random() * 16))
      });
      var macAddress = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
        return "0123456789ABCDEF".charAt((Math.random() * 16))
      });
     
  
      var beaconID = i+1;
  
      var timeStamp = getCurrentTime();
  
      var location = getRandomLocation(locations);
  
      deviceInformationdb.insert({
        "beaconID": beaconID,
        "macAddress": macAddress,
        "location": location,
        "patientID": patientID,
        "timeStamp": timeStamp
      });
  
    }
 

  //calls function to send data of ble beacons to hospital software
  sendData()

});

//handle request from ble-reciever to update db with location of device
WebApp.connectHandlers.use("/location", function(req, res, next) {
  if(req.method === 'POST'){
  req.on('data', Meteor.bindEnvironment((data)=>{
    const body = JSON.parse(data);
    console.log(body);
    let macAddress= body.macAddress
    let distance = body.distance;
    for(device of radios){
        deviceInformationdb.update({macAddress : macAddress}, {$set:{distance : distance, time:getTimestampInSeconds(), location: radios.location}}) 
        updateLocation(macAddress);
     
    }

  })); 
  res.end(Meteor.release)
}
});
//testing purposes
WebApp.connectHandlers.use("/testLocation", function(req, res, next) {
  if(req.method === 'POST'){
  req.on('data', Meteor.bindEnvironment((data)=>{
    const body = JSON.parse(data);
    console.log(body);
    const beaconID = body.beaconID
    const location = body.location
    const distance = body.distance
    console.log(beaconID,location)
    addLocation(beaconID, location, distance)
    updateLocation(beaconID)
  })); 
  res.end(Meteor.release)
}
});

//add location to beacon
function addLocation(beaconID, location, distance){
  deviceInformationdb.update({beaconID : beaconID}, {$set:{location:location, time:getCurrentTime(), distance:distance}})
}
//update the location of the beacon to hospital software when the location changes from beacon
function updateLocation(beaconID){
  let beaconToUpdate = deviceInformationdb.findOne({beaconID:beaconID})
  console.log(beaconToUpdate.beaconID ,beaconToUpdate.location)
  axios.post('http://localhost:3000/update', {
    beaconID: beaconToUpdate.beaconID,
    location : beaconToUpdate.location
  })
  .then(function(response){
  })
  .catch(function(error){
    console.log(error)
  })
}

function sendData(){
  //grab an array of devices
  let arrayOfDevices = deviceInformationdb.find().fetch()
  //console.log(arrayOfDevices)
  axios.post('http://localhost:3000/getBLEs', arrayOfDevices)
  .then(function (response){
  })
  .catch(function (error){
    console.log(error)
  })  
}

function getCurrentTime() {
  return Date(Date.now())
}
