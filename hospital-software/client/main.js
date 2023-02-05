import { Template } from 'meteor/templating';

import '../lib/routing';
import './main.html';
import './stylesheets/bootstrap.min.css';
import "./pages/patient-list.html";
import "./scripts/patient-list.js";
import "./pages/patient.html";
import "./scripts/patient.js";
import "./stylesheets/main.css";
import "./stylesheets/bootstrap.min.css";
import "./stylesheets/device-list.css";
import "./pages/patient-overview.html";
import "./scripts/tracker.html";


Session.setDefault('currentLocation', 'Unknown');
Session.setDefault('locations', []);

Template.body.onCreated(function bodyOnCreated() {
  // updates on the current location and locations
  setInterval(() => {
    Session.set('currentLocation', 'Floor A, Floor 1, Room 143');
    Session.set('locations', ['Floor A, Floor 2, Room 115', 'Building B, Floor 3, Room 106']);
  }, 5000);
});

//inheritance for accessing patient information between templates
Template.practitioner.inheritsHelpersFrom("patient");
Template.lab.inheritsHelpersFrom("patient");
Template.dermatology.inheritsHelpersFrom("patient");
Template.vitals.inheritsHelpersFrom("patient");
Template.labWork.inheritsHelpersFrom("patient");
Template.prescriptions.inheritsHelpersFrom("patient");
Template.devices.inheritsHelpersFrom("patient");
