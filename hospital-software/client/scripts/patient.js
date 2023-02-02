import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function () {
    this.department = new ReactiveVar("reception");
    this.ids = new ReactiveVar([])
    Meteor.call('getDevices', (error,result)=>{
        this.ids.set(result);
    })
    this.beaconID = new ReactiveVar();

});

Template.patient.onRendered(function () {
    this.patient = new ReactiveVar(patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") }))
    this.device = new ReactiveVar(patientInformationdb.findOne({ "patientInformation.beaconID": FlowRouter.getParam("beaconID") }))
});

Template.patient.helpers({
    patient() {
        return patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") });
    },
    ids() {
        //returns all the beacon ids
        return Template.instance().ids.get();
    },
    //assign function to assign patients a beacon id
    assignDevice() {
        //get _id of the doucment inside of the the patientInformationDB
        //cannot access db unless using _id of the document
        const idOfDocuement = patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") })._id
        //update the patient with beaconID
        patientInformationdb.update({_id : idOfDocuement}, {$set: { beaconID:Template.instance().beaconID.curValue}})
    },
    unassignDevice() {
        //get _id of the doucment inside of the the patientInformationDB
        //cannot access db unless using _id of the document
        const idOfDocuement = patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") })._id
        //update the patient with beaconID
        patientInformationdb.update({_id : idOfDocuement}, {$set: { beaconID:null}})
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
    //click event to assign patient a beacon
    "click #assignBtn": (event, templateInstance) => {
        Template.patient.__helpers.get("assignDevice")()
        alert('Patient was assigned device '+templateInstance.beaconID.get(event.currentTarget.value)+'!');
    },
    "click #unassignBtn": (event, templateInstance) => {
        Template.patient.__helpers.get("unassignDevice")()
        alert('Patient returned device '+templateInstance.beaconID.get(event.currentTarget.value)+ '!');
    },
    //grab the value of the dropdown #beaconIDs
    "change #beaconIDs": (event,templateInstance) =>{
        templateInstance.beaconID.set(event.currentTarget.value);
    }

});

//printing yes or no for boolean values with Handlebars
Handlebars.registerHelper("printBool", function (b) {
    return b ? "Yes" : "No";
});