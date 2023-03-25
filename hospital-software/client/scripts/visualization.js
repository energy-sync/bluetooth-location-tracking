
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.visualization.onCreated(function() {
    this.deviceLab = new ReactiveVar([]);
    this.deviceReception = new ReactiveVar([]);
    this.deviceGP = new ReactiveVar([]);
    this.deviceDermatology = new ReactiveVar([]);
    
  
    Meteor.call('getDeviceLocation','General Practitioner', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.deviceGP.set(result);
    });
    Meteor.call('getDeviceLocation','Lab', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.deviceLab.set(result);
    });
    Meteor.call('getDeviceLocation','Receptionist', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.deviceReception.set(result);
    });

    Meteor.call('getDeviceLocation','Dermatology', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.deviceDermatology.set(result);
    });
  });
  
  
 
  
  
  
  





  Template.visualization.helpers({
    deviceLab() {
      return Template.instance().deviceLab.get();
    },
    deviceReception() {
      return Template.instance().deviceReception.get();
    },
    deviceGP() {
      return Template.instance().deviceGP.get();
    },
    deviceDermatology() {
      return Template.instance().deviceDermatology.get();
    }
   
  });
