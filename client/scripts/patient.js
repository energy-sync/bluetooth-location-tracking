import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './patient.html';

Template.patient.onCreated(function patientOnCreated(){
    //Placeholder name assignment
    this.patientName = new ReactiveVar("John Doe");
});

Template.patient.helpers({
    patientName(){
        return Template.instance().patientName.get();
    },
}

);

Template.patientInfo1.onCreated(function patientInfo1OnCreated(){
    //Placeholder info assignment
    this.patientLocation = new ReactiveVar("Not Checked In");
    this.patientPhone = new ReactiveVar("Not registered");
    this.patientEmail = new ReactiveVar("Not registered");
    this.patientAge = new ReactiveVar("Not registered");

    this.patientGender = new ReactiveVar("Not registered");
    this.patientInsurance = new ReactiveVar("Not registered");
    this.patientPolicy = new ReactiveVar("N/A");
    this.patientStatus = new ReactiveVar("Not Enrolled");

    this.patientDevice = new ReactiveVar("Not assigned");
   // patientFamilyHistory: [
        //this.patientFamilyCondition = new ReactiveVar("None"),
    //];
});

Template.patientInfo1.helpers({
    patientLocation(){
        return Template.instance().patientLocation.get();
    },

    patientPhone(){
        return Template.instance().patientPhone.get();
    },

    patientEmail(){
        return Template.instance().patientEmail.get();
    },

    patientAge(){
        return Template.instance().patientAge.get();
    },

    patientGender(){
        return Template.instance().patientGender.get();
    },

    patientInsurance(){
        return Template.instance().patientInsurance.get();
    },

    patientPolicy(){
        return Template.instance().patientPolicy.get();
    },

    patientStatus(){
        return Template.instance().patientStatus.get();
    },

    patientDevice(){
        return Template.instance().patientDevice.get();
    },

    patientFamilyHistory: [
        {patientFamilyCondition: "none"}
    ],

    patientMedication: [
        {currentMed: "none"}
    ]

})