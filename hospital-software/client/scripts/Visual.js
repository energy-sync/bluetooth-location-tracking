import { Template } from 'meteor/templating';
import './Visual.html';

Template.myTemplate.onCreated(function () {
  this.title = 'Device Visualization';
  this.devicesReception = ['Device 1', 'Device 2', 'Device 3'];
  this.devicesLab = ['Device 4', 'Device 5', 'Device 6'];
  this.devicesGP = ['Device 7', 'Device 8', 'Device 9'];
  this.devicesDermatology = ['Device 10', 'Device 11', 'Device 12'];
});

Template.myTemplate.helpers({
  title() {
    return Template.instance().title;
  },
  devicesReception() {
    return Template.instance().devicesReception;
  },
  devicesLab() {
    return Template.instance().devicesLab;
  },
  devicesGP() {
    return Template.instance().devicesGP;
  },
  devicesDermatology() {
    return Template.instance().devicesDermatology;
  },
});
