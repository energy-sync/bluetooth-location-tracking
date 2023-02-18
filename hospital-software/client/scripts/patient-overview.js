import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { dummyBeaconDB } from "../../lib/database";

Template.departments.onCreated(function(){
    this.department = new ReactiveVar("patientOverview");
})

Template.patientOverview.helpers({
    beacons(){
        return dummyBeaconDB.find();
    }
})

Template.departments.helpers({
    departments(){
        let departmentArray = ["Surgery","Gynaecology","Paediatrics","Eye", "ENT","Dental","Orthopaedics","Neurology","Cardiology",
        "Psychiatry", "Skin", "Plastic Surgery","Rehabilitation", "Pharmacy", "Radiology"];
        return departmentArray;
    }
})

Template.derpartments.events({
    "change #selectedDepartment":(event,templateInstance) =>{
        templateInstance.department.set(event.currentTarget.value);
    }
})