
import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

 Template.visualization.onCreated(function() {
   // get all the device elements
   let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
      // store the devices array in a reactive variable
   this.devices = new ReactiveVar(devices);
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
      return Template.instance().devices.get();
  },
    patientsReception() {
      let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
      return devices.filter(device => device.location === "Receptionist").map(device => device.beaconID);      
  },
  patientsDermatology() {
    let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
    return devices.filter(device => device.location === "Dermatology").map(device => device.beaconID);      
},
patientsLab() {
  let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
  return devices.filter(device => device.location === "Lab").map(device => device.beaconID);      
},
patientsGP() {
  let devices = patientInformationdb.find({}, { limit: 6 }).fetch();
  return devices.filter(device => device.location === "General Practitioner").map(device => device.beaconID);      
},
age(device) {
  console.log(device);
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
  console.log(device);
  let patient = patientInformationdb.findOne({'beaconID' : device});
  let specialAssistance = patient.patientInformation.specialAssistance;
  
  if(specialAssistance==="Yes"){
    return "assistance";
  }
  else {
    return "noAssistance";
  }
}


  })

