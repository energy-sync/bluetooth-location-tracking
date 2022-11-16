import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import {deviceInformationdb} from '../lib/database.js';

Meteor.startup(() => {
  // code to run on server at startup
});

WebApp.connectHandlers.use('/', (req, res) =>{
  if(req.method === 'POST'){
    res.writeHead(200)
    let data = Object.values(JSON.parse(req.body))
    deviceInformationdb.insert({
      'patientID':data[0],
      'deviceID' : data[1]
    })
    res.end()
  }
})
