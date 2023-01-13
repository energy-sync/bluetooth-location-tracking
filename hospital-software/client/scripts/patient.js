import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function () {
    this.department = new ReactiveVar("reception");
    this.ids = new ReactiveVar([])
    Meteor.call('getDevices', (error,result)=>{
        this.ids.set(result);
    })
    this.deviceID = new ReactiveVar();

});

Template.patient.onRendered(function () {
    this.patient = new ReactiveVar(patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") }))
    this.device = new ReactiveVar(patientInformationdb.findOne({ "patientInformation.deviceID": FlowRouter.getParam("deviceID") }))
});

Template.patient.helpers({
    patient() {
        return patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") });
    },
    ids() {
        return Template.instance().ids.get();
    },
    assignDevice() {
        console.log("assignDevice");
        console.log(Template.instance().deviceID.curValue)
        const idOfDocuement = patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") })._id
        console.log(idOfDocuement)
        patientInformationdb.update({_id : idOfDocuement}, {$set: { deviceID:Template.instance().deviceID.curValue}})
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
    },
    "change #deviceIDs": (event,templateInstance) =>{
        templateInstance.deviceID.set(event.currentTarget.value);
    }

});

//printing yes or no for boolean values with Handlebars
Handlebars.registerHelper("printBool", function (b) {
    return b ? "Yes" : "No";
});