import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { patientInformationdb } from '../../lib/database';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.Visual.onCreated(function() {
  this.currentBeacon = new ReactiveVar();
  this.currentBeaconHistory = new ReactiveVar();
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
  getLastLocation(beacon) {
    let beaconHistory = deviceHistorydb.findOne({macAddress: beacon.macAddress});
    if (!beaconHistory)
        return undefined;
    else {
        return beaconHistory.history[beaconHistory.history.length - 1].location;
    }
},

getBeaconName() {
    return Template.instance().currentBeacon.curValue.beaconID;
},

getcurrentBeacon() {
    return Template.instance().currentBeacon.curValue;
},

getCurrentLocation() {
    let historyLog = Template.instance().currentBeaconHistory.curValue;
    if (!historyLog)
        return "None";
    let history = historyLog.history;
    return history[history.length - 1].location;
},

beaconHasHistory() {
    return Template.instance().currentBeaconHistory.curValue !== undefined;
},

getcurrentBeaconHistory() {
    return Template.instance().currentBeaconHistory.curValue.history.reverse();
},

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
  if (waitingTime ==='a few seconds ago') {
    console.log('green')
    return 'green'
  } else if (waitingTime ==='a minute ago') {
    console.log('yellow')
    return 'yellow'
  } else {
    console.log('red')
    return 'red'
  }
}


//refresh page every 30 seconds
setInterval(function(){
  window.location.reload(1);
}, 30000);

function getPatientHistory(patient) {
  const history = [];
  const patientHistory = patientInformationdb.findOne({'patientInformation.patientID': patient.patientInformation.patientID});
  if (patientHistory && patientHistory.history) {
    history.push(...patientHistory.history);
  }
  return history;
}

Template.Visual.onRendered(function() {
 this.autorun(() => {
    let devices2 = patientInformationdb.find({}, { limit: 6 }).fetch();
    // store the devices array in a reactive variable
    this.devices = new ReactiveVar(devices2);
    let devices = this.$('.corner');

    devices.on('click', 'span', (event) => {
      const modal = this.$('#myModal');
      const deviceId = $(event.currentTarget).text().trim();
      const patient = this.devices.get().find(device => device.beaconID === deviceId);
      const modalBody = modal.find('.modal-body');
      const waitingTime = moment(patient.timeOfUpdate).fromNow();
      const history = getPatientHistory(patient);
     
modalBody.html(`
  <p><u><b> Beacon ID</b></u>: ${patient.beaconID}</p>
  <p><u><b> Patient ID</b></u>: ${patient.patientInformation.patientID}</p>
  <p><u><b> Age</b></u>: ${patient.patientInformation.age}</p>
  <p><u><b> Location</b></u>: ${patient.location}</p> 
  <p><u><b> Waiting Time</b></u>: ${waitingTime}</p>
  
`);

      modalBody.html(`
        
        <p><u><b> Beacon ID</b></u>: ${patient.beaconID}</p>
        <p><u><b> Patient ID</b></u> :${patient.patientInformation.patientID}</p>
        <p><u><b> Age</b></u>: ${patient.patientInformation.age}</p>
        <p><u><b> Location</b></u> :${patient.location}</p> 
        <p><u><b> Waiting Time</b></u> :${waitingTime}</p>   
        <p><u><b>History</b></u>:</p>
    <ul>
      ${history.map(entry => `<li>${entry.location} at ${moment(entry.timestamp).format('h:mm A on M/D/YYYY')}</li>`).join('')}
    </ul>
       
      `);
      modal.css('display', 'block');
  

      const closeButton = modal.find('.close-modal');
      closeButton.on('click', () => {
        modal.css('display', 'none');
      });

      const viewPatientPageButton = modal.find('#view-patient-page');
      viewPatientPageButton.on('click', () => {
        // Navigate to the patient page using the patient ID
        FlowRouter.go('/patient/' + patient.patientInformation.patientID);
      });
    });
  });
});

