import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating';
import { patientInformationdb } from '../lib/database.js';
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