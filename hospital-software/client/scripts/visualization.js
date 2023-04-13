
import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';

 Template.visualization.onCreated(function() {
   // get all the device elements
   const devices = patientInformationdb.find({}, { limit: 6 }).fetch();
      // store the devices array in a reactive variable
   this.devices = new ReactiveVar(devices);
 });

 Template.visualization.onRendered(function() {
  Tracker.autorun(() => {
    const devices = document.querySelectorAll('.corner span');

    devices.forEach(device => {
      device.addEventListener('click', () => {
        const modal = document.getElementById('myModal');
        const deviceId = device.textContent.trim();
        const patient = this.devices.get().find(device => device.beaconID === deviceId);
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
          <table>
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
        `;
        modal.style.display = 'block';

        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', () => {
          modal.style.display = 'none';
        });
      });
    });
  });
});


  
  Template.visualization.helpers({
  
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

  Template.visualization.events({
    'click #devices'(event, template) {
      const modal = document.getElementById('myModal');
      modal.style.display = 'block';
  
      const closeButton = modal.querySelector('.close-modal');
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
  });
  