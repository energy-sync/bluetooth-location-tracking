import { Template } from 'meteor/templating';
import { patientInformationdb } from '../../lib/database.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { ReactiveVar } from 'meteor/reactive-var';

Template.visualizer.onCreated(function(){
    this.ids = new ReactiveVar([]);
    Meteor.call('getDevices', (error, result) => {
        if(error){
            console.error(error);
        }else{
        this.ids.set(result);
        console.log(this.ids);
        }
    })
    console.log(this.ids);

    this.selectedBeacon = new ReactiveVar();
    this.selectedPatient = new ReactiveVar();
    this.selectedPatientID = new ReactiveVar();
    console.log(this.selectedPatientID);
});

Template.visualizer.helpers({
    receptionBeacons(){
        let patients = patientInformationdb.find({}, {limit:6}).fetch();
        filteredBeacons = patients.filter(beacon => beacon.location === "Receptionist").map(beacon => beacon.beaconID);
        reducedBeacons = new Array();
        for(let i=0; i < filteredBeacons.length; i++){
            if(filteredBeacons[i] != undefined && filteredBeacons[i] != ""){
                reducedBeacons.push(filteredBeacons[i]);
            }
        }
        return reducedBeacons;
    },

    labBeacons(){
        let patients = patientInformationdb.find({}, {limit:6}).fetch();
        filteredBeacons = patients.filter(beacon => beacon.location === "Lab").map(beacon => beacon.beaconID);
        reducedBeacons = new Array();
        for(let i=0; i < filteredBeacons.length; i++){
            if(filteredBeacons[i] != undefined && filteredBeacons[i] != ""){
                reducedBeacons.push(filteredBeacons[i]);
            }
        }
        return reducedBeacons;
    },

    generalPractitionerBeacons(){
        let patients = patientInformationdb.find({}, {limit:6}).fetch();
        filteredBeacons = patients.filter(beacon => beacon.location === "General Practitioner").map(beacon => beacon.beaconID);
        reducedBeacons = new Array();
        for(let i=0; i < filteredBeacons.length; i++){
            if(filteredBeacons[i] != undefined && filteredBeacons[i] != ""){
                reducedBeacons.push(filteredBeacons[i]);
            }
        }
        return reducedBeacons;
    },

    dermatologyBeacons(){
        let patients = patientInformationdb.find({}, {limit:6}).fetch();
        filteredBeacons = patients.filter(beacon => beacon.location === "Dermatology").map(beacon => beacon.beaconID);
        reducedBeacons = new Array();
        for(let i=0; i < filteredBeacons.length; i++){
            if(filteredBeacons[i] != undefined && filteredBeacons[i] != ""){
                reducedBeacons.push(filteredBeacons[i]);
            }
        }
        return reducedBeacons;
    },
    
    unassignedBeacons(){
        let patients = patientInformationdb.find({}, {limit:6}).fetch();
        console.log(patients);
        let assignedBeacons = patients.map(beacon => beacon.beaconID);
        let remainingBeacons = new Array();

        console.log(assignedBeacons);

        console.log(remainingBeacons);

        let beacons = new Array();
        beacons = Template.instance().ids.get();
        console.log(Template.instance().ids.get());
        console.log(beacons);

        for(let i=0; i < beacons.length; i++){
            let assigned = false;
            for(let e=0; e < assignedBeacons.length; e++){
                if(beacons[i] === assignedBeacons[e]){
                    assigned = true;
                }
                }
            if(!assigned){
                remainingBeacons.push(beacons[i]);
            }
        }
        console.log(remainingBeacons);
        return remainingBeacons;
    },

    selectedBeacon(){
        return Template.instance().selectedBeacon.get();
    },

    selectedPatient(){
        return Template.instance().selectedPatient.get();
    },

    selected(){
        return Template.instance().selectedPatientID.get() != undefined;
    },

    selectedPatientID(){
        return Template.instance().selectedPatientID.get();
    }
});

Template.visualizer.events({
    "click .beacon-button"(event, templateInstance){
        let clicked = event.target;
        console.log(clicked);
        console.log(clicked.id);

        templateInstance.selectedBeacon.set(clicked.id);
        console.log(templateInstance.selectedBeacon.get());

        this.assignedPatient = new ReactiveVar(patientInformationdb.findOne({ "beaconID": clicked.id}));
        console.log(patientInformationdb.findOne({ "beaconID": clicked.id}));

        templateInstance.selectedPatient.set(this.assignedPatient.get().patientInformation.patientName);
        templateInstance.selectedPatientID.set(this.assignedPatient.get().patientInformation.patientID);
        
       /* let assignedPatient = -1;
        for(let i=0; i < patients.length; i++){

        }
        */
    },

    "click .patient-link"(event, templateInstance){
        console.log(event.target);
        console.log(event.target.id);

        FlowRouter.go(`/patient/${event.target.id}`);
    }
})