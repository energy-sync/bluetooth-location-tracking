
import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

 Template.visualization.onCreated(function() {
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
       }
   })

   this.selectedBeacon = new ReactiveVar();
   this.selectedPatient = new ReactiveVar();
   this.selectedPatientID = new ReactiveVar()  


 });

 Template.visualization.onRendered(function() {




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
      modalBody.html(`
        
        <p><u><b> Beacon ID</b></u>: ${patient.beaconID}</p>
        <p><u><b> Patient ID</b></u> :${patient.patientInformation.patientID}</p>
        <p><u><b> Age</b></u>: ${patient.patientInformation.age}</p>
        <p><u><b> Location</b></u> :${patient.location}</p>
        <p><u><b> Special Assistance</b></u>: ${patient.patientInformation.specialAssistance}</p>
        
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




  
  Template.visualization.helpers({
    devices() {
      //returns all the beacon ids
      return Template.instance().devices.get().filter(device => device.beaconID );
  },
    patientsReception() {
      let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
      return devices.filter(device => device.location === "Receptionist" && device.beaconID).map(device => device.beaconID);  
       
  },
  patientsDermatology() {
    let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
    return devices.filter(device => device.location === "Dermatology" && device.beaconID).map(device => device.beaconID);      
},
patientsLab() {
  let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
  return devices.filter(device => device.location === "Lab" && device.beaconID).map(device => device.beaconID);      
},
patientsGP() {
  let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
  return devices.filter(device => device.location === "General Practitioner" && device.beaconID).map(device => device.beaconID);      
},
age(device) {
  let patient = patientInformationdb.findOne({'beaconID' : device});
  let age = patient.patientInformation.age;
  
    if(age<=1){
      return "infant";
    }
    else if(age>1 && age<=12){
      return "child";
    }
    else if (age >=13 && age<=17) {
      return "adolescent";
    } 
    else if (age >= 18 && age < 65) {
      return "adult";
    }
     else {
      return "elderly";
    }
},
specialAssistance(device) {
  let patient = patientInformationdb.findOne({'beaconID' : device});
  let specialAssistance = patient.patientInformation.specialAssistance;
  
  if(specialAssistance==="Yes"){
    return "assistance";
  }
  else {
    return "noAssistance";
  }
},
unassignedBeacons(){
  let patients = patientInformationdb.find({}, {limit:6}).fetch();
  let assignedBeacons = patients.map(beacon => beacon.beaconID);
  let remainingBeacons = new Array();

  let beacons = new Array();
  beacons = Template.instance().ids.get();

  for(let i=0; i < beacons.length; i++){
      let assigned = false;
      for(let e=0; e < assignedBeacons.length; e++){
          if(beacons[i] === assignedBeacons[e]){
              assigned = true;
          }
          }
      if(!assigned){
          remainingBeacons.push(beacons[i]);
      }
  }
  return remainingBeacons;
},

selectedBeacon(){
  return Template.instance().selectedBeacon.get();
},

selectedPatient(){
  return Template.instance().selectedPatient.get();
},

selected(){
  return Template.instance().selectedPatientID.get() != undefined;
},

selectedPatientID(){
  return Template.instance().selectedPatientID.get();
}
});

Template.visualization.events({
"click .beacon-button"(event, templateInstance){
  let clicked = event.target;

  templateInstance.selectedBeacon.set(clicked.id);

  this.assignedPatient = new ReactiveVar(patientInformationdb.findOne({ "beaconID": clicked.id}));

  templateInstance.selectedPatient.set(this.assignedPatient.get().patientInformation.patientName);
  templateInstance.selectedPatientID.set(this.assignedPatient.get().patientInformation.patientID);

},

"click .device-modal-button"(event){
  let deviceModal = document.getElementById("unassigned-devices");

  deviceModal.style.display = "block";
},

"click .device-modal-close"(event){
  let deviceModal = document.getElementById("unassigned-devices");

  deviceModal.style.display = "none";
},

"click #unassigned-devices"(event){
  let deviceModal = document.getElementById("unassigned-devices")

  let clicked = event.target;
  if(clicked == deviceModal){
    deviceModal.style.display="none";
  }
}
  })

