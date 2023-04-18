import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { patientInformationdb } from '../../lib/database';

Template.Visual.onCreated(function() {
// get all the device elements
let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
// store the devices array in a reactive variable
this.devices = new ReactiveVar(devices);

this.ids = new ReactiveVar([]);
Meteor.call('getDevices', (error, result) => {
 if(error){
     console.error(error);
 }else{
 this.ids.set(result);
 console.log(this.ids);
 }
})
console.log(this.ids);
});

Template.Visual.helpers({
  devices() {
    //returns all the beacon ids
    return Template.instance().devices.get().filter(device => device.beaconID );
},
  deviceLab() {
    let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
  return devices.filter(device => device.location === "Lab" && device.beaconID).map(device => device.beaconID);    
  },
  deviceReception() {
    let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
      return devices.filter(device => device.location === "Receptionist" && device.beaconID).map(device => device.beaconID);  
  },
  deviceGP() {
    let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
   
  return devices.filter(device => device.location === "General Practitioner" && device.beaconID).map(device => device.beaconID);  
  },
  deviceDermatology() {
    let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
    return devices.filter(device => device.location === "Dermatology" && device.beaconID).map(device => device.beaconID);  
  },
  waitTime(beaconID){
    let beacon= patientInformationdb.findOne({'beaconID': beaconID})
    const waitingTime = moment(beacon.timeOfUpdate).fromNow()

    //console.log(beacon,waitingTime)
    return setDeviceColor(waitingTime);
  }
});



function setDeviceColor(waitingTime) {
  if (waitingTime ==='a few seconds ago' || waitingTime ==='a minute ago' || waitingTime ==='2 minutes ago') {
    console.log('green')
    return 'green'
  } else if (waitingTime ==='3 minutes ago' || waitingTime ==='4 minutes ago' || waitingTime ==='5 minutes ago') {
    console.log('yellow')
    return 'yellow'
  } else {
    console.log('red')
    return 'red'
  }
}