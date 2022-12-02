import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { deviceInformationdb } from '../lib/database.js';
const fs = Npm.require('fs')
const axios = require('axios')

const config1 = JSON.parse(fs.readFileSync(process.cwd().split('.meteor')[0] +"deviceConfig.json", "utf-8"));
const beacons = config1.beacons
const radios = config1.radios


Meteor.startup(() => {
  // code to run on server at startup
  deviceInformationdb.remove({});

    function getTimestampInSeconds() {
      return Math.floor(Date.now() / 1000)
    }

    for(device of beacons){
      deviceInformationdb.insert({

        "deviceID": device.deviceID,
        "macAddress": device.macAddress,
      });
    }

 //handle request from ble-reciever to update db with location of device
  WebApp.connectHandlers.use("/location", function(req, res, next) {
    if(req.method === 'PUT'){
    req.on('data', Meteor.bindEnvironment((data)=>{
      const body = JSON.parse(data);
      console.log(body);
      let ipAddress = this.connection.remoteAddress
      console.log(ipAddress)
      let macAddress= body.macAddress
      let distance = body.distance;
      for(device of radios){
        if(ipAddress === radios.ipAddress){
          deviceInformationdb.update({macAddress : macAddress}, {$set:{distance : distance, time:getTimestampInSeconds(), location: radios.location}}) 
          updateLocation(macAddress);
        }
        break
      }

    })); 
    res.on('end', Meteor.bindEnvironment(()=>{
      res.writeHead(200).end()
    }));
  }
  });

  //handle get request from hospital software to transfer all devices
  WebApp.connectHandlers.use("/getBLEs", async function(req, res, next) {
    res.writeHead(200, {"Content-Type" : "application/json"})
    let arrayOfBeacosns = deviceInformationdb.find().fetch()
    console.log(arrayOfBeacosns)
    res.end(arrayOfBeacosns)
  })


});

//update the location of the beacon to hospital software when the location changes from beacon
function updateLocation(macAddress){
  let device = deviceInformationdb.find({macAddress:macAddress})
  axios.post('/update', {
    device: device
  })
  .then(function(response){
    console.log(response)
  })
  .catch(function(error){
    console.log(error)
  })
}
