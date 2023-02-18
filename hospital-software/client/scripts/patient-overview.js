import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { dummyBeaconDB } from "../../lib/database";

Template.landing.onCreated(function () {
    this.department = new ReactiveVar('General Info');
    this.patientNumSurgery = new ReactiveVar();
    this.patientNumGynacology = new ReactiveVar();
    this.patientNumPaediatrics = new ReactiveVar();
    this.patientNumEye = new ReactiveVar();
    this.patientNumENT = new ReactiveVar();
    this.patientNumDental = new ReactiveVar();
    this.patientNumOrthopaedics = new ReactiveVar();
    this.patientNumNeurology = new ReactiveVar();
    this.patientNumCardiology = new ReactiveVar();
    this.patientNumPsychiatry = new ReactiveVar();
    this.patientNumSkin = new ReactiveVar();
    this.patientNumPlasticSurgery = new ReactiveVar();
    this.patientNumRehabilitation = new ReactiveVar();
    this.patientNumPharmacy = new ReactiveVar();
    this.patientNumRadiology = new ReactiveVar();

    const arrayOfDeparments = ["Surgery", "Gynaecology", "Paediatrics", "Eye", "ENT", "Dental", "Orthopaedics", "Neurology", "Cardiology",
    "Psychiatry", "Skin", "Plastic Surgery", "Rehabilitation", "Pharmacy", "Radiology"]
    for (let i = 0; i < arrayOfDeparments.length; i++) {
        Meteor.call('getPatientNum', arrayOfDeparments[i], (err, res) => {
            switch (arrayOfDeparments[i]) {
                case 'Surgery':
                    console.log('here')
                    console.log(this.patientNumSurgery)
                    this.patientNumSurgery.set(res);
                    console.log(this.patientNumSurgery)
                    break;
                case 'Gynacology':
                    this.patientNumGynacology.set(res);
                    break;
                case 'Paediatrics':
                    this.patientNumPaediatrics.set(res);
                    break;
                case 'Eye':
                    this.patientNumEye.set(res);
                    break;
                case 'ENT':
                    this.patientNumENT.set(res);
                    break;
                case 'Dental':
                    this.patientNumDental.set(res);
                    break;
                case 'Orthopaedics':
                    this.patientNumOrthopaedics.set(res);
                    break;
                case 'Neurology':
                    this.patientNumNeurology.set(res);
                    break;
                case 'Cardiology':
                    this.patientNumCardiology.set(res);
                    break;
                case 'Pyschiatry':
                    this.patientNumPyschiatry.set(res);
                    break;
                case 'Skin':
                    this.patientNumSkin.set(res);
                    break;
                case 'Plastic Surgery':
                    this.patientNumPlasticSurgery.set(res);
                    break;
                case 'Rehabilitation':
                    this.patientNumRehabilitation.set(res);
                    break;
                case 'Pharmacy':
                    this.patientNumPharmacy.set(res);
                    break;
                case 'Radiology':
                    this.patientNumRadiology.set(res);
                    break;
            }
        })
    }

})

Template.landing.helpers({
    departments() {
        let departmentArray = ["Surgery", "Gynaecology", "Paediatrics", "Eye", "ENT", "Dental", "Orthopaedics", "Neurology", "Cardiology",
            "Psychiatry", "Skin", "Plastic Surgery", "Rehabilitation", "Pharmacy", "Radiology"];
        return departmentArray;
    },
    generalInfo(){
        return Template.instance().department.get() === 'General Info'
    },
    surgery(){
        return Template.instance().department.get() === 'Surgery'
    },
    gyno(){
        return Template.instance().department.get() === 'Gynaecology'
    },
    paeds(){
        return Template.instance().department.get() === 'Paediatrics'
    },
    eye(){
        return Template.instance().department.get() === 'Eye'
    },
    ent(){
        return Template.instance().department.get() === 'ENT'
    },
    dental(){
        return Template.instance().department.get() === 'Dental'
    },
    ortho(){
        return Template.instance().department.get() === 'Orthopaedics'
    },
    neuro(){
        return Template.instance().department.get() === 'Neurology'
    },
    cardio(){
        return Template.instance().department.get() === 'Cardiology'
    },
    psych(){
        return Template.instance().department.get() === 'Psychiatry'
    },
    skin(){
        return Template.instance().department.get() === 'Skin'
    },
    plasticSurgery(){
        return Template.instance().department.get() === 'Plastic Surgery'
    },
    rehab(){
        return Template.instance().department.get() === 'Rehabilitation'
    },
    pharma(){
        return Template.instance().department.get() === 'Pharmacy'
    },
    radio(){
        return Template.instance().department.get() === 'Radiology'
    }
})
Template.patientOverview.helpers({
    beacons() {
        return dummyBeaconDB.find();
    }
})

Template.landing.events({
    "change #selectedDepartment": (event, templateInstance) => {
        templateInstance.department.set(event.currentTarget.value);
    }
})