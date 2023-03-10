import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

const filterRegex = /[^a-z0-9:]/g;

Template.patient.onCreated(function () {
    this.department = new ReactiveVar();
    this.ids = new ReactiveVar([])
    this.location = new ReactiveVar();
    Meteor.call('getDevices', (error, result) => {
        this.ids.set(result);
    })
    this.beaconID = new ReactiveVar();

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
        //get _id of the doucment inside of the the patientInformationDB
        //cannot access db unless using _id of the document
        const idOfDocuement = patientInformationdb.findOne({ "patientInformation.patientID": FlowRouter.getParam("patientID") })._id
        //update the patient with beaconID
        patientInformationdb.update({ _id: idOfDocuement }, { $set: { beaconID: Template.instance().beaconID.curValue } })
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

Template.patientListSide.events({
    "click #searchButton": event => {
        var filterDepartments = document.getElementById("filterDepartments");
        var filterPhysicians = document.getElementById("filterPhysicians");
        if (search.value.length > 0){
            FlowRouter.go(`/patient/`+ FlowRouter.getParam("patientID") +`?search=${search.value}` + `&department=${filterDepartments.value}` + `&physician=${filterPhysicians.value}`);
        }
        else FlowRouter.go("/patient/" + FlowRouter.getParam("patientID") + `?department=${filterDepartments.value}` + `&physician=${filterPhysicians.value}`);
    },
    "keydown #search": event => {
        if (event.originalEvent.code === "Enter")
            searchButton.click();
    }
});

Template.patientListSide.helpers({
    patients() {
        console.log(patientInformationdb.find());
        return patientInformationdb.find();
    },
    getSearch() {
        let searchParam = FlowRouter.getQueryParam("search");
        return searchParam ? searchParam : "";
    },
    physicians(){
        let physiciansArray = new Array();

        patientInformationdb.find().forEach((patient) =>{
            if(physiciansArray.length == 0){
                physiciansArray.push(patient.patientInformation.physicianName);
            }else{
                let uniquePhysician = true;
                for(let i = 0; i < physiciansArray.length; i++){
                    if(physiciansArray[i] === patient.patientInformation.physicianName){
                        uniquePhysician = false;
                    }
                }
                if(uniquePhysician){
                    physiciansArray.push(patient.patientInformation.physicianName);
                }
            }
        });
        console.log(physiciansArray);
        return physiciansArray;

    }
});

Template.patientRowSide.events({
    "click .patientRowSide": event => {
        let searchParam = FlowRouter.getQueryParam("search");
        let departmentParam = FlowRouter.getQueryParam("department");
        let physicianParam = FlowRouter.getQueryParam("physician");
        if(!searchParam){
            
            if(!departmentParam){
                if(!physicianParam){
                FlowRouter.go(`/patient/${Template.currentData().patient.patientInformation.patientID}`);
                return;
                }
            }
            if(!physicianParam){
                FlowRouter.go(`/patient/${Template.currentData().patient.patientInformation.patientID}` + "?department=" + FlowRouter.getQueryParam("department"));
                return;
            }

            FlowRouter.go(`/patient/${Template.currentData().patient.patientInformation.patientID}` + "?department=" + FlowRouter.getQueryParam("department") + "&physician=" + FlowRouter.getQueryParam("physician"));
            return;
        }
        if(!departmentParam){
            if(!physicianParam){
            FlowRouter.go(`/patient/${Template.currentData().patient.patientInformation.patientID}` + `?search=${FlowRouter.getQueryParam("search")}`);
            return;
            }
            FlowRouter.go(`/patient/${Template.currentData().patient.patientInformation.patientID}` + `?search=${FlowRouter.getQueryParam("search")}` + `&physician=${FlowRouter.getQueryParam("physician")}`);
            return;
        }
        if(!physicianParam){
            FlowRouter.go(`/patient/${Template.currentData().patient.patientInformation.patientID}` + `?search=${FlowRouter.getQueryParam("search")}` + "&department=" + FlowRouter.getQueryParam("department"));
            return;
        }
        FlowRouter.go(`/patient/${Template.currentData().patient.patientInformation.patientID}` + `?search=${FlowRouter.getQueryParam("search")}` + "&department=" + FlowRouter.getQueryParam("department")  + `&physician=${FlowRouter.getQueryParam("physician")}`);
    }
});

Template.patientRowSide.helpers({
    readableDate() {
        let date = new Date();
        return date.toLocaleString();
    }
});

Handlebars.registerHelper("isInSearch", function(patient) {
    let searchParam = FlowRouter.getQueryParam("search");
    let filterDepartments = document.getElementById("filterDepartments");
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

Handlebars.registerHelper("isInDepartment", function(patient) {
    let departmentParam = FlowRouter.getQueryParam("department");
    if(!departmentParam){
        return true;
    }else if(departmentParam == "allDepartments"){
        return true;
    }

    if(patient.location == departmentParam){
        return true;
    }
});

Handlebars.registerHelper("hasPhysician", function(patient) {
    let physicianParam = FlowRouter.getQueryParam("physician");

    if(!physicianParam){
        return true;
    }else if(physicianParam == "allPhysicians"){
        return true;
    }

    if(patient.patientInformation.physicianName == physicianParam){
        return true;
    }
});