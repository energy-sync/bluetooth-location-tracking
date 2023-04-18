import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '/Visual.html';
import '/Visual.css';
import { patientInformationdb } from '../../lib/database';

Template.Visual.onCreated(function() {
  this.reception = new ReactiveVar([]);
  this.dermatology = new ReactiveVar([]);
  this.lab = new ReactiveVar([]);
  this.practitioner = new ReactiveVar([]);

  Meteor.call("getLocationPatient", "Receptionist", (err, res) => {
    this.reception.set(res);
  });

  Meteor.call("getLocationPatient", "Dermatology", (err, res) => {
    this.dermatology.set(res);
  });

  Meteor.call("getLocationPatient", "Lab", (err, res) => {
    this.lab.set(res);
  });

  Meteor.call("getLocationPatient", "General Practitioner", (err, res) => {
    this.practitioner.set(res);
  });
});

Template.Visual.helpers({
  deviceLab() {
    return Template.instance().lab.get();
  },
  deviceReception() {
    return Template.instance().reception.get();
  },
  deviceGP() {
    return Template.instance().practitioner.get();
  },
  deviceDermatology() {
    return Template.instance().dermatology.get();
  }
});

Template.Visual.onRendered(function() {
  const green = "#32CD32";
  const yellow = "#FFFF00";
  const red = "#FF0000";
  const timeThreshold1 = 30 * 60 * 1000; // 30 minutes
  const timeThreshold2 = 60 * 60 * 1000; // 60 minutes
  const allDevices = document.querySelectorAll(".rounded-circle");

  function setDeviceColor(device, waitingTime) {
    if (waitingTime > timeThreshold2) {
      device.classList.remove('green', 'yellow');
      device.classList.add('red');
    } else if (waitingTime > timeThreshold1) {
      device.classList.remove('green', 'red');
      device.classList.add('yellow');
    } else {
      device.classList.remove('yellow', 'red');
      device.classList.add('green');
    }
  }
  
  function updateTime() {
    allDevices.forEach(device => {
      let beacon= patientInformationdb.findOne({'beaconID': device})
      const waitingTime = moment(beacon.timeOfUpdate).fromNow()
      console.log(beacon,waitingTime)
      setDeviceColor(device, waitingTime);
    });
  }

  function startUpdatingTime() {
    setInterval(updateTime, 5000); // update every 5 seconds
    setInterval(updateTime, 10000); // update every 10 seconds
    setInterval(updateTime, 15000); // update every 15 seconds
  }

  startUpdatingTime();
});


