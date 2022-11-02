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

Template.patient.events({
    "change #departments": (event, templateInstance) => {
        templateInstance.department.set(event.currentTarget.value);
    }
});

//printing yes or no for boolean values with Handlebars
Handlebars.registerHelper("printBool", function (b) {
    return b ? "Yes" : "No";
});