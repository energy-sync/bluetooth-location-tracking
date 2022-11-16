import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { deviceInformationdb } from '../lib/database.js';

Meteor.startup(() => {
  // code to run on server at startup
  deviceInformationdb.remove({});

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
    function getTimestampInSeconds() {
      return Math.floor(Date.now() / 1000)
    }


    var deviceID = i;

    var timeStamp = getTimestampInSeconds();

    var location = getRandomLocation(locations);

    deviceInformationdb.insert({

      "deviceID": deviceID,
      "macAddress": macAddress,
      "location": location,
      "patientID": patientID,
      "timeStamp": timeStamp,
    });

  }
});
