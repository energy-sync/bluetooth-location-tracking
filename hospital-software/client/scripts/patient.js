import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function () {
    this.department = new ReactiveVar();
    this.ids = new ReactiveVar([])
    this.location = new ReactiveVar();
    Meteor.call('getDevices', (error, result) => {
        this.ids.set(result);
    })
    this.beaconID = new ReactiveVar();
    this.specialAssistance= new ReactiveVar();

});

Template.patient.onRendered(function () {
    this.patient = new ReactiveVar(patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") }))
    this.device = new ReactiveVar(patientInformationdb.findOne({ "patientInformation.beaconID": FlowRouter.getParam("beaconID") }))
    const select = this.$("#beaconIDs");
    select.val("").trigger("change");

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
        //specialAssitance radio button value
        const specialAssistance = $('input[name="specialAssistance"]:checked').val();

//get _id of the document inside of the the patientInformationDB
//cannot access db unless using _id of the document
const idOfDocuement = patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") })._id

//update the patient with beaconID and specialAssistance
patientInformationdb.update({ _id: idOfDocuement },{ $set: {
    "beaconID": Template.instance().beaconID.curValue, 
    "patientInformation.specialAssistance": specialAssistance 
    }}
  );
  Template.instance().specialAssistance.set(specialAssistance);

    },
    inLab() {
        console.log("inLab")
        let patient = patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") });
        console.log(patient.location === 'Lab')
        if (patient.location == 'Lab') {
            return true;
        }
    }, inDerma() {
        console.log("inDerma")
        let patient = patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") });
        console.log(patient.location === 'Dermatology')
        if (patient.location == 'Dermatology') {
            return true;
        }
    },
    inReception() {
        console.log("inReception")
        let patient = patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") });
        console.log(patient.location === 'Receptionist')
        if (patient.location == 'Receptionist') {
            return true;
        }
    },
    inPractitioner() {
        console.log("inPractitioner")
        let patient = patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") });
        console.log(patient.location === 'General Practitioner')
        if (patient.location == 'General Practitioner') {
            return true;
        }
    },
});

Template.patient.events({
    "change #departments": (event, templateInstance) => {
        templateInstance.department.set(event.currentTarget.value);
    },
    //click event to assign patient a beacon
    "click #assignBtn": (event, templateInstance) => {
        Template.patient.__helpers.get("assignDevice")()
        var selectedBeacon = $('#beaconIDs').val()
         if (!selectedBeacon) {
             alert('Patient beacon was unassigned');
         }
         else {
             alert('Patient was assigned beacon ' + templateInstance.beaconID.get(event.currentTarget.value) + '!');
         }
    },
    //grab the value of the dropdown #beaconIDs
    "change #beaconIDs": (event, templateInstance) => {
        templateInstance.beaconID.set(event.currentTarget.value);

    }

});

//printing yes or no for boolean values with Handlebars
Handlebars.registerHelper("printBool", function (b) {
    return b ? "Yes" : "No";
});