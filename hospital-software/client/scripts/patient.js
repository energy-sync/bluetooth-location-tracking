import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function() {
    this.department = new ReactiveVar("reception");
});

Template.patient.onRendered(function() {
    this.patient = new ReactiveVar(patientInformationdb.findOne({"patientInformation.patientID": FlowRouter.getParam("patientID")}))
    
});

Template.patient.helpers({
    patient() {
        return patientInformationdb.findOne({"patientInformation.patientID": FlowRouter.getParam("patientID")});
    },
    assignDevice(){
        console.log("assignDevice");
        const patientID = patientInformationdb.findOne({"patientInformation.patientID": FlowRouter.getParam("patientID")}).patientInformation.patientID;
        let data = {patientID: patientID, deviceID: 3};
        Meteor.call("putPatientID", "http://localhost:3002/assign", data);
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
    isInReception() {
        return Template.instance().department.get() === "reception";
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

