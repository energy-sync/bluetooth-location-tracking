import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function() {
    this.department = new ReactiveVar("reception");
});

Template.patient.onRendered(function() {
    this.patient = new ReactiveVar(patientInformationdb.findOne({"patientInformation.patientID": FlowRouter.getParam("patientID")}))
    this.device = new ReactiveVar(patientInformationdb.findOne({"patientInformation.deviceID": FlowRouter.getParam("deviceID")}))
});

Template.patient.helpers({
    patient() {
        return patientInformationdb.findOne({"patientInformation.patientID": FlowRouter.getParam("patientID")});
    },
    assignDevice(){
        console.log("assignDevice");
        const patientID = patientInformationdb.findOne({"patientInformation.patientID": FlowRouter.getParam("patientID")}).patientInformation.patientID;
        
        Meteor.call("assignDevices", patientID, deviceID);
    },
    isWithPractitioner() {
        return Template.instance().department.get() === "practitioner";
    },
    isInLab() {
        return Template.instance().department.get() === "lab";
    },
    isInDermatology() {
        return Template.instance().department.get() === "dermatology";
    },
    isInDevices() {
        return Template.instance().department.get() === "devices";
    }
});

Template.patient.events({
    "change #departments": (event, templateInstance) => {
        templateInstance.department.set(event.currentTarget.value);
    },
    "click #assignBtn": (event, templateInstance) => {
      Template.patient.__helpers.get("assignDevice")();
    }
});

//printing yes or no for boolean values with Handlebars
Handlebars.registerHelper("printBool", function (b) {
    return b ? "Yes" : "No";
});

