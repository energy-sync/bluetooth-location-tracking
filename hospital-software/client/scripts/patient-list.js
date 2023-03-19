import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { patientInformationdb } from "../../lib/database";

const filterRegex = /[^a-z0-9:]/g;

Template.patientList.events({
    "click #searchButton": event => {
        if (search.value.length > 0)
            FlowRouter.go(`/patient-list?search=${search.value}`);
        else FlowRouter.go("/patient-list");
    },
    "keydown #search": event => {
        if (event.originalEvent.code === "Enter")
            searchButton.click();
    }
})

Template.patientList.helpers({
    patients() {
        console.log(patientInformationdb.find());
        return patientInformationdb.find();
    },
    getSearch() {
        let searchParam = FlowRouter.getQueryParam("search");
        return searchParam ? searchParam : "";
    }
});

Template.patientRow.events({
    "click .patientRow": event => {
        FlowRouter.go(`/patient/${Template.currentData().patient.patientInformation.patientID}`);
    }
});

Template.patientRow.helpers({
    waitTime(patient) {
        if (patient.waitTime === undefined) {
            let time = moment(patient.timeOfUpdate).fromNow();

            if (patient.timeOfUpdate === undefined) {
                return '';
            }
            return time;
        } else {
            return patient.waitTime + ' minute(s) ago';
        }
    },

    readableDate() {
        let date = new Date();
        return date.toLocaleString();
    }
});

Handlebars.registerHelper("isInSearch", function (patient) {
    let searchParam = FlowRouter.getQueryParam("search");
    if (!searchParam)
        return true;

    let searchStr = FlowRouter.getQueryParam("search").toLowerCase().replaceAll(filterRegex, "").trim();
    if (searchStr.length === 0
        || patient.patientInformation.patientName.toLowerCase().replaceAll(filterRegex, "").trim().includes(searchStr)
        || patient.patientInformation.patientID.toLowerCase().replaceAll(filterRegex, "").trim().includes(searchStr)
        || patient.patientInformation.physicianName.toLowerCase().replaceAll(filterRegex, "").trim().includes(searchStr)
        || patient.macAddress.toLowerCase().replaceAll(filterRegex, "").trim().includes(searchStr)) {
        return true;
    }
});