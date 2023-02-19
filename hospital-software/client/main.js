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
import "./scripts/patient-overview.js";

//inheritance for accessing patient information between templates
Template.practitioner.inheritsHelpersFrom("patient");
Template.lab.inheritsHelpersFrom("patient");
Template.dermatology.inheritsHelpersFrom("patient");
Template.vitals.inheritsHelpersFrom("patient");
Template.labWork.inheritsHelpersFrom("patient");
Template.prescriptions.inheritsHelpersFrom("patient");

//inheritance for accessing information from db on data anaylsis page
Template.surgeryTemplate.inheritsHelpersFrom('landing');
Template.gynoTemplate.inheritsHelpersFrom('landing');
Template.paedsTemplate.inheritsHelpersFrom('landing');
Template.eyeTemplate.inheritsHelpersFrom('landing');
Template.entTemplate.inheritsHelpersFrom('landing');
Template.dentalTemplate.inheritsHelpersFrom('landing');
Template.orthoTemplate.inheritsHelpersFrom('landing');
Template.neuroTemplate.inheritsHelpersFrom('landing');
Template.cardioTemplate.inheritsHelpersFrom('landing');
Template.psychTemplate.inheritsHelpersFrom('landing');
Template.skinTemplate.inheritsHelpersFrom('landing');
Template.plasticSurgeryTemplate.inheritsHelpersFrom('landing');
Template.rehabTemplate.inheritsHelpersFrom('landing');
Template.pharmaTemplate.inheritsHelpersFrom('landing');
Template.radioTemplate.inheritsHelpersFrom('landing');
