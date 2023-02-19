import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { dummyBeaconDB } from "../../lib/database";


Template.surgeryTemplate.onCreated(function(){
    this.patientNumSurgery = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Surgery', (err,res) =>{
        this.patientNumSurgery.set(res);
    })
})

Template.gynoTemplate.onCreated(function(){
    this.patientNumGynacology  = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Gynaecology', (err,res) =>{
        this.patientNumGynacology.set(res);
    })
})
Template.paedsTemplate.onCreated(function(){
    this.patientNumPaediatrics = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Paediatrics', (err,res) =>{
        this.patientNumPaediatrics.set(res);
    })
})
Template.eyeTemplate.onCreated(function(){
    this.patientNumEye = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Eye', (err,res) =>{
        this.patientNumEye.set(res);
    })
})
Template.entTemplate.onCreated(function(){
    this.patientNumENT = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'ENT', (err,res) =>{
        this.patientNumENT.set(res);
    })
})
Template.dentalTemplate.onCreated(function(){
    this.patientNumDental = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Dental', (err,res) =>{
        this.patientNumDental.set(res);
    })
})
Template.orthoTemplate.onCreated(function(){
    this.patientNumOrthopaedics = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Orthopaedics', (err,res) =>{
        this.patientNumOrthopaedics.set(res);
    })
})
Template.neuroTemplate.onCreated(function(){
    this.patientNumNeurology = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Neurology', (err,res) =>{
        this.patientNumNeurology.set(res);
    })
})
Template.cardioTemplate.onCreated(function(){
    this.patientNumCardiology = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Cardiology', (err,res) =>{
        this.patientNumCardiology.set(res);
    })
})
Template.psychTemplate.onCreated(function(){
    this.patientNumPsychiatry = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Psychiatry', (err,res) =>{
        this.patientNumPsychiatry.set(res);
    })
})
Template.skinTemplate.onCreated(function(){
    this.patientNumSkin = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Skin', (err,res) =>{
        this.patientNumSkin.set(res);
    })
})
Template.plasticSurgeryTemplate.onCreated(function(){
    this.patientNumPlasticSurgery = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Plastic Surgery', (err,res) =>{
        this.patientNumPlasticSurgery.set(res);
    })
})

Template.rehabTemplate.onCreated(function(){
    this.patientNumRehab  = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Rehabilitation', (err,res) =>{
        this.patientNumRehab.set(res);
    })
})
Template.pharmaTemplate.onCreated(function(){
    this.patientNumPharmacy = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Pharmacy', (err,res) =>{
        this.patientNumPharmacy.set(res);
    })
})
Template.radioTemplate.onCreated(function(){
    this.patientNumRadiology = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Radiology', (err,res) =>{
        this.patientNumRadiology.set(res);
    })
})



Template.landing.onCreated(function () {
    this.department = new ReactiveVar('General Info');
})



//all the helpers for landing page
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
    },
    
})

//all the helpers for each different template

Template.surgeryTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumSurgery.get()
    }
})

Template.gynoTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumGynacology.get()
    }
})
Template.paedsTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumPaediatrics.get()
    }
})
Template.eyeTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumEye.get()
    }
})
Template.entTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumENT.get()
    }
})
Template.dentalTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumDental.get()
    }
})
Template.orthoTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumOrthopaedics.get()
    }
})
Template.cardioTemplate.helpers({
    patientNum(){
        console.log('here')
        return Template.instance().patientNumCardiology.get()
    }
})
Template.psychTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumPsychiatry.get()
    }
})
Template.skinTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumSkin.get()
    }
})
Template.plasticSurgeryTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumPlasticSurgery.get()
    }
})
Template.rehabTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumRehab.get()
    }
})
Template.pharmaTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumPharmacy.get()
    }
})
Template.radioTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumRadiology .get()
    }
})
Template.neuroTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumNeurology.get()
    }
})

Template.patientOverview.helpers({
    beacons() {
        return dummyBeaconDB.find();
    }
})


//event for dropdown changing
Template.landing.events({
    "change #selectedDepartment": (event, templateInstance) => {
        templateInstance.department.set(event.currentTarget.value);
    }
})