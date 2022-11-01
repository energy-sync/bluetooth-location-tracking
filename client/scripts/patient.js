import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function() {
    this.showVitals = new ReactiveVar(false);
});

Template.patient.helpers({
    patient() {
        return patientInformationdb.findOne({"patientInformation.patientID": FlowRouter.getParam("patientID")});
    },
    isShowingVitals() {
        return Template.instance().showVitals.get();
    }
});

Template.patient.events({
    "change #departments": (event, templateInstance) => {
        switch (event.currentTarget.value) {
            case "reception":
                templateInstance.showVitals.set(false);
                break;
            case "practitioner":
                templateInstance.showVitals.set(true);
                break;
            
        }
    }
});