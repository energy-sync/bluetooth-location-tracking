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
import "./pages/Visual.html";
import "./scripts/Visual.js";



//inheritance for accessing patient information between templates
Template.practitioner.inheritsHelpersFrom("patient");
Template.lab.inheritsHelpersFrom("patient");
Template.dermatology.inheritsHelpersFrom("patient");
Template.vitals.inheritsHelpersFrom("patient");
Template.labWork.inheritsHelpersFrom("patient");
Template.prescriptions.inheritsHelpersFrom("patient");
Template.devices.inheritsHelpersFrom("patient");
