import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { dummyBeaconDB } from "../../lib/database";


Template.surgeryTemplate.onCreated(function(){
    this.patientNumSurgery = new ReactiveVar([]);
    this.busiestDaySurgery = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Surgery', (err,res) =>{
        this.patientNumSurgery.set(res);
    })
    
    Meteor.call('getBusiestDay', 'Surgery', (err,res)=>{
        this.busiestDaySurgery.set(res);
    })
})

Template.gynoTemplate.onCreated(function(){
    this.patientNumGynacology  = new ReactiveVar([]);
    this.busiestDayGynaecology = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Gynaecology', (err,res) =>{
        this.patientNumGynacology.set(res);
    })

    Meteor.call('getBusiestDay', 'Gynaecology', (err,res)=>{
        this.busiestDayGynaecology.set(res);
    })
})
Template.paedsTemplate.onCreated(function(){
    this.patientNumPaediatrics = new ReactiveVar([]);
    this.busiestDayPaediatrics = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Paediatrics', (err,res) =>{
        this.patientNumPaediatrics.set(res);
    })

    Meteor.call('getBusiestDay', 'Paediatrics', (err,res)=>{
        this.busiestDayPaediatrics.set(res);
    })
})
Template.eyeTemplate.onCreated(function(){
    this.patientNumEye = new ReactiveVar([]);
    this.busiestDayEye  = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Eye', (err,res) =>{
        this.patientNumEye.set(res);
    })

    Meteor.call('getBusiestDay', 'Eye', (err,res)=>{
        this.busiestDayEye.set(res);
    })
})
Template.entTemplate.onCreated(function(){
    this.patientNumENT = new ReactiveVar([]);
    this.busiestDayENT = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'ENT', (err,res) =>{
        this.patientNumENT.set(res);
    })

    Meteor.call('getBusiestDay', 'ENT', (err,res)=>{
        this.busiestDayENT.set(res);
    })
})
Template.dentalTemplate.onCreated(function(){
    this.patientNumDental = new ReactiveVar([]);
    this.busiestDayDental = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Dental', (err,res) =>{
        this.patientNumDental.set(res);
    })

    Meteor.call('getBusiestDay', 'Dental', (err,res)=>{
        this.busiestDayDental.set(res);
    })
})
Template.orthoTemplate.onCreated(function(){
    this.patientNumOrthopaedics = new ReactiveVar([]);
    this.busiestDayOrthopaedics = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Orthopaedics', (err,res) =>{
        this.patientNumOrthopaedics.set(res);
    })

    Meteor.call('getBusiestDay', 'Orthopaedics', (err,res)=>{
        this.busiestDayOrthopaedics.set(res);
    })
})
Template.neuroTemplate.onCreated(function(){
    this.patientNumNeurology = new ReactiveVar([]);
    this.busiestDayNeurology = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Neurology', (err,res) =>{
        this.patientNumNeurology.set(res);
    })

    Meteor.call('getBusiestDay', 'Neurology', (err,res)=>{
        this.busiestDayNeurology.set(res);
    })
})
Template.cardioTemplate.onCreated(function(){
    this.patientNumCardiology = new ReactiveVar([]);
    this.busiestDayCardiology = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Cardiology', (err,res) =>{
        this.patientNumCardiology.set(res);
    })

    Meteor.call('getBusiestDay', 'Cardiology', (err,res)=>{
        this.busiestDayCardiology.set(res);
    })
})
Template.psychTemplate.onCreated(function(){
    this.patientNumPsychiatry = new ReactiveVar([]);
    this.busiestDayPsychiatry = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Psychiatry', (err,res) =>{
        this.patientNumPsychiatry.set(res);
    })

    Meteor.call('getBusiestDay', 'Psychiatry', (err,res)=>{
        this.busiestDayPsychiatry.set(res);
    })
})
Template.skinTemplate.onCreated(function(){
    this.patientNumSkin = new ReactiveVar([]);
    this.busiestDaySurgery = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Skin', (err,res) =>{
        this.patientNumSkin.set(res);
    })

    Meteor.call('getBusiestDay', 'Skin', (err,res)=>{
        this.busiestDaySkin.set(res);
    })
})
Template.plasticSurgeryTemplate.onCreated(function(){
    this.patientNumPlasticSurgery = new ReactiveVar([]);
    this.busiestDayPlasticSurgery = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Plastic Surgery', (err,res) =>{
        this.patientNumPlasticSurgery.set(res);
    })

    Meteor.call('getBusiestDay', 'Plastic Surgery', (err,res)=>{
        this.busiestDayPlasticSurgery.set(res);
    })
})

Template.rehabTemplate.onCreated(function(){
    this.patientNumRehab  = new ReactiveVar([]);
    this.busiestDayRehab = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Rehabilitation', (err,res) =>{
        this.patientNumRehab.set(res);
    })

    Meteor.call('getBusiestDay', 'Rehabilitation', (err,res)=>{
        this.busiestDayRehab.set(res);
    })
})
Template.pharmaTemplate.onCreated(function(){
    this.patientNumPharmacy = new ReactiveVar([]);
    this.busiestDayPharmacy = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Pharmacy', (err,res) =>{
        this.patientNumPharmacy.set(res);
    })

    Meteor.call('getBusiestDay', 'Pharmacy', (err,res)=>{
        this.busiestDayPharmacy.set(res);
    })
})
Template.radioTemplate.onCreated(function(){
    this.patientNumRadiology = new ReactiveVar([]);
    this.busiestDayRadiology = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Radiology', (err,res) =>{
        this.patientNumRadiology.set(res);
    })

    Meteor.call('getBusiestDay', 'Radiology', (err,res)=>{
        this.busiestDayRadiology.set(res);
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
    },
    busiestDay(){
        return Template.instance().busiestDaySurgery.get()
    }
})

Template.gynoTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumGynacology.get()
    },
       busiestDay(){
        return Template.instance().busiestDayGynaecology.get()
    }
})
Template.paedsTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumPaediatrics.get()
    },
    busiestDay(){
        return Template.instance().busiestDayPaediatrics.get()
    }
})
Template.eyeTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumEye.get()
    },
    busiestDay(){
        return Template.instance().busiestDayEye.get()
    }
})
Template.entTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumENT.get()
    },
    busiestDay(){
        return Template.instance().busiestDayENT.get()
    }
})
Template.dentalTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumDental.get()
    },
    busiestDay(){
        return Template.instance().busiestDayDental.get()
    }
})
Template.orthoTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumOrthopaedics.get()
    },
    busiestDay(){
        return Template.instance().busiestDayOrthopaedics.get()
    }
})
Template.cardioTemplate.helpers({
    patientNum(){
        console.log('here')
        return Template.instance().patientNumCardiology.get()
    },
    busiestDay(){
        return Template.instance().busiestDayCardiology.get()
    }
})
Template.psychTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumPsychiatry.get()
    },
    busiestDay(){
        return Template.instance().busiestDayPsychiatry.get()
    }
})
Template.skinTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumSkin.get()
    },
    busiestDay(){
        return Template.instance().busiestDaySkin.get()
    }
})
Template.plasticSurgeryTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumPlasticSurgery.get()
    },
    busiestDay(){
        return Template.instance().busiestDayPlasticSurgery.get()
    }
})
Template.rehabTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumRehab.get()
    },
    busiestDay(){
        return Template.instance().busiestDayRehab.get()
    }
})
Template.pharmaTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumPharmacy.get()
    },
    busiestDay(){
        return Template.instance().busiestDayPharmacy.get()
    }
})
Template.radioTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumRadiology.get()
    },
    busiestDay(){
        return Template.instance().busiestDayRadiology.get()
    }
})
Template.neuroTemplate.helpers({
    patientNum(){
        return Template.instance().patientNumNeurology.get()
    },
    busiestDay(){
        return Template.instance().busiestDayNeurology.get()
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