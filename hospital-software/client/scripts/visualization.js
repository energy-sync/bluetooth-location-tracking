
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.patientOverview.onCreated(function() {
  this.department = new ReactiveVar(null);
    this.averageWaitTimeGP = new ReactiveVar([]);
    this.averageWaitTimeLab = new ReactiveVar([]);
    this.averageWaitTimeReception = new ReactiveVar([]);
    this.averageWaitTimeDermatology = new ReactiveVar([]);
    this.patientNumGP=new ReactiveVar([]);
    this.patientNumLab=new ReactiveVar([]);
    this.patientNumReception=new ReactiveVar([]);
    this.patientNumDermatology=new ReactiveVar([]);
    
  
    Meteor.call('getWaitTimes','General Practitioner', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.averageWaitTimeGP.set(result);
    });
    Meteor.call('getWaitTimes','Lab', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.averageWaitTimeLab.set(result);
    });
    Meteor.call('getWaitTimes','Receptionist', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.averageWaitTimeReception.set(result);
    });

    Meteor.call('getWaitTimes','Dermatology', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.averageWaitTimeDermatology.set(result);
    });
    
    Meteor.call('getPatientNum','General Practitioner', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.patientNumGP.set(result);
    });
    Meteor.call('getPatientNum','Lab', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.patientNumLab.set(result);
    });
    Meteor.call('getPatientNum','Receptionist', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.patientNumReception.set(result);
    });
    Meteor.call('getPatientNum','Dermatology', (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      this.patientNumDermatology.set(result);
    });
  });
  
  
 
  
  
  
  





  Template.patientOverview.helpers({
    averageWaitTimeGP() {
      return Template.instance().averageWaitTimeGP.get();
    },
    averageWaitTimeLab() {
      return Template.instance().averageWaitTimeLab.get();
    },
    averageWaitTimeReception() {
      return Template.instance().averageWaitTimeReception.get();
    },
    averageWaitTimeDermatology() {
      return Template.instance().averageWaitTimeDermatology.get();
    },
    patientNumGP() {
    return Template.instance().patientNumGP.get();
  },
  patientNumLab() {
    return Template.instance().patientNumLab.get();
  },
  patientNumReception() {
    return Template.instance().patientNumReception.get();
  },
  patientNumDermatology() {
    return Template.instance().patientNumDermatology.get();
  },

    isWithPractitioner() {
      return Template.instance().department.get() === "practitioner";
  },
  isInLab() {
      return Template.instance().department.get() === "lab";
  },
  isInDermatology() {
      return Template.instance().department.get() === "dermatology";
  }
  });
