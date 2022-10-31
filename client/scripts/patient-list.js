import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { patientInformationdb } from "../../lib/database";

Template.patientList.helpers({
    devices() {
        return patientInformationdb.find();
    }
});

Template.patientRow.events({
    "click .patientRow": event => {
        FlowRouter.go(`/patient/${Template.currentData().device.patientInformation.patientID}`);
    }
});

Template.patientRow.helpers({
    readableDate() {
        let date = new Date();
        return date.toLocaleString();
    }
});