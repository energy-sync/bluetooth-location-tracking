
import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';

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
        <table>
          <tr>
          <td>Beacon ID:</td>
          <td>${patient.beaconID}</td>
          </tr>
          <tr>
            <td>Age:</td>
            <td>${patient.patientInformation.age}</td>
          </tr>
          <tr>
            <td>Patient ID:</td>
            <td>${patient.patientInformation.patientID}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>${patient.location}</td>
          </tr>
        </table>
      `);
      modal.css('display', 'block');

      const closeButton = modal.find('.close-modal');
      closeButton.on('click', () => {
        modal.css('display', 'none');
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

