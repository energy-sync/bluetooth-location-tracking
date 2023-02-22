import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { dummyBeaconDB } from "../../lib/database";

const daysArray = ["Sunday", "Monday", "Tuesday",
"Wednesday", "Thursday", "Friday", "Saturday"]

Template.surgeryTemplate.onCreated(function () {
    this.patientNumSurgery = new ReactiveVar([]);
    this.busiestDaySurgery = new ReactiveVar([]);
    this.busiestTimeSurgery = new ReactiveVar([]);
    this.data = new ReactiveVar([]);

    Meteor.call('getNumberOfPeoplePerDay', 'Surgery', (err,res)=>{
        this.data.set(res)
    })
    Meteor.call('getPatientNum', 'Surgery', (err, res) => {
        this.patientNumSurgery.set(res);
    })

    Meteor.call('getBusiestDay', 'Surgery', (err, res) => {
        this.busiestDaySurgery.set(res);
    })

    Meteor.call('getBusyTime', 'Surgery', (err, res) => {
        this.busiestTimeSurgery.set(res);
    })
})

Template.gynoTemplate.onCreated(function () {
    this.patientNumGynacology = new ReactiveVar([]);
    this.busiestDayGynaecology = new ReactiveVar([]);
    this.busiestTimeGynaecology = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Gynaecology', (err, res) => {
        this.patientNumGynacology.set(res);
    })

    Meteor.call('getBusiestDay', 'Gynaecology', (err, res) => {
        this.busiestDayGynaecology.set(res);
    })
    Meteor.call('getBusyTime', 'Gynaecology', (err, res) => {
        this.busiestTimeGynaecology.set(res);
    })
})
Template.paedsTemplate.onCreated(function () {
    this.patientNumPediatrics = new ReactiveVar([]);
    this.busiestDayPediatrics = new ReactiveVar([]);
    this.busiestTimePediatrics = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Pediatrics', (err, res) => {
        this.patientNumPediatrics.set(res);
    })

    Meteor.call('getBusiestDay', 'Pediatrics', (err, res) => {
        this.busiestDayPediatrics.set(res);
    })

    Meteor.call('getBusyTime', 'Pediatrics', (err, res) => {
        this.busiestTimePediatrics.set(res);
    })
})
Template.eyeTemplate.onCreated(function () {
    this.patientNumEye = new ReactiveVar([]);
    this.busiestDayEye = new ReactiveVar([]);
    this.busiestTimeEye = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Eye', (err, res) => {
        this.patientNumEye.set(res);
    })

    Meteor.call('getBusiestDay', 'Eye', (err, res) => {
        this.busiestDayEye.set(res);
    })
    Meteor.call('getBusyTime', 'Eye', (err, res) => {
        this.busiestTimeEye.set(res);
    })
})
Template.entTemplate.onCreated(function () {
    this.patientNumENT = new ReactiveVar([]);
    this.busiestDayENT = new ReactiveVar([]);
    this.busiestTimeENT = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'ENT', (err, res) => {
        this.patientNumENT.set(res);
    })

    Meteor.call('getBusiestDay', 'ENT', (err, res) => {
        this.busiestDayENT.set(res);
    })
    Meteor.call('getBusyTime', 'ENT', (err, res) => {
        this.busiestTimeENT.set(res);
    })
})
Template.dentalTemplate.onCreated(function () {
    this.patientNumDental = new ReactiveVar([]);
    this.busiestDayDental = new ReactiveVar([]);
    this.busiestTimeDental = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Dental', (err, res) => {
        this.patientNumDental.set(res);
    })

    Meteor.call('getBusiestDay', 'Dental', (err, res) => {
        this.busiestDayDental.set(res);
    })
    Meteor.call('getBusyTime', 'Dental', (err, res) => {
        this.busiestTimeDental.set(res);
    })
})
Template.orthoTemplate.onCreated(function () {
    this.patientNumOrthopaedics = new ReactiveVar([]);
    this.busiestDayOrthopaedics = new ReactiveVar([]);
    this.busiestTimeOrthopaedics = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Orthopaedics', (err, res) => {
        this.patientNumOrthopaedics.set(res);
    })

    Meteor.call('getBusiestDay', 'Orthopaedics', (err, res) => {
        this.busiestDayOrthopaedics.set(res);
    })
    Meteor.call('getBusyTime', 'Orthopaedics', (err, res) => {
        this.busiestTimeOrthopaedics.set(res);
    })
})
Template.neuroTemplate.onCreated(function () {
    this.patientNumNeurology = new ReactiveVar([]);
    this.busiestDayNeurology = new ReactiveVar([]);
    this.busiestTimeNeurology = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Neurology', (err, res) => {
        this.patientNumNeurology.set(res);
    })

    Meteor.call('getBusiestDay', 'Neurology', (err, res) => {
        this.busiestDayNeurology.set(res);
    })
    Meteor.call('getBusyTime', 'Neurology', (err, res) => {
        this.busiestTimeNeurology.set(res);
    })
})
Template.cardioTemplate.onCreated(function () {
    this.patientNumCardiology = new ReactiveVar([]);
    this.busiestDayCardiology = new ReactiveVar([]);
    this.busiestTimeCardiology = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Cardiology', (err, res) => {
        this.patientNumCardiology.set(res);
    })

    Meteor.call('getBusiestDay', 'Cardiology', (err, res) => {
        this.busiestDayCardiology.set(res);
    })
    Meteor.call('getBusyTime', 'Cardiology', (err, res) => {
        this.busiestTimeCardiology.set(res);
    })
})
Template.psychTemplate.onCreated(function () {
    this.patientNumPsychiatry = new ReactiveVar([]);
    this.busiestDayPsychiatry = new ReactiveVar([]);
    this.busiestTimePsychiatry = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Psychiatry', (err, res) => {
        this.patientNumPsychiatry.set(res);
    })

    Meteor.call('getBusiestDay', 'Psychiatry', (err, res) => {
        this.busiestDayPsychiatry.set(res);
    })
    Meteor.call('getBusyTime', 'Psychiatry', (err, res) => {
        this.busiestTimePsychiatry.set(res);
    })
})
Template.skinTemplate.onCreated(function () {
    this.patientNumSkin = new ReactiveVar([]);
    this.busiestDaySkin = new ReactiveVar([]);
    this.busiestTimeSkin = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Skin', (err, res) => {
        this.patientNumSkin.set(res);
    })

    Meteor.call('getBusiestDay', 'Skin', (err, res) => {
        this.busiestDaySkin.set(res);
    })
    Meteor.call('getBusyTime', 'Skin', (err, res) => {
        this.busiestTimeSkin.set(res);
    })
})
Template.plasticSurgeryTemplate.onCreated(function () {
    this.patientNumPlasticSurgery = new ReactiveVar([]);
    this.busiestDayPlasticSurgery = new ReactiveVar([]);
    this.busiestTimePlasticSurgery = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Plastic Surgery', (err, res) => {
        this.patientNumPlasticSurgery.set(res);
    })

    Meteor.call('getBusiestDay', 'Plastic Surgery', (err, res) => {
        this.busiestDayPlasticSurgery.set(res);
    })
    Meteor.call('getBusyTime', 'Plastic Surgery', (err, res) => {
        this.busiestTimePlasticSurgery.set(res);
    })
})

Template.rehabTemplate.onCreated(function () {
    this.patientNumRehab = new ReactiveVar([]);
    this.busiestDayRehab = new ReactiveVar([]);
    this.busiestTimeRehab = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Rehabilitation', (err, res) => {
        this.patientNumRehab.set(res);
    })

    Meteor.call('getBusiestDay', 'Rehabilitation', (err, res) => {
        this.busiestDayRehab.set(res);
    })
    Meteor.call('getBusyTime', 'Rehabilitation', (err, res) => {
        this.busiestTimeRehab.set(res);
    })
})
Template.pharmaTemplate.onCreated(function () {
    this.patientNumPharmacy = new ReactiveVar([]);
    this.busiestDayPharmacy = new ReactiveVar([]);
    this.busiestTimePharmacy = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Pharmacy', (err, res) => {
        this.patientNumPharmacy.set(res);
    })

    Meteor.call('getBusiestDay', 'Pharmacy', (err, res) => {
        this.busiestDayPharmacy.set(res);
    })
    Meteor.call('getBusyTime', 'Pharmacy', (err, res) => {
        this.busiestTimePharmacy.set(res);
    })
})
Template.radioTemplate.onCreated(function () {
    this.patientNumRadiology = new ReactiveVar([]);
    this.busiestDayRadiology = new ReactiveVar([]);
    this.busiestTimeRadiology = new ReactiveVar([]);

    Meteor.call('getPatientNum', 'Radiology', (err, res) => {
        this.patientNumRadiology.set(res);
    })

    Meteor.call('getBusiestDay', 'Radiology', (err, res) => {
        this.busiestDayRadiology.set(res);
    })
    Meteor.call('getBusyTime', 'Radiology', (err, res) => {
        this.busiestTimeRadiology.set(res);
    })
})



Template.landing.onCreated(function () {
    this.department = new ReactiveVar('General Info');
})



//all the helpers for landing page
Template.landing.helpers({
    departments() {
        let departmentArray = ["Surgery", "Gynaecology", "Pediatrics", "Eye", "ENT", "Dental", "Orthopaedics", "Neurology", "Cardiology",
            "Psychiatry", "Skin", "Plastic Surgery", "Rehabilitation", "Pharmacy", "Radiology"];
        return departmentArray;
    },
    generalInfo() {
        return Template.instance().department.get() === 'General Info'
    },
    surgery() {
        return Template.instance().department.get() === 'Surgery'
    },
    gyno() {
        return Template.instance().department.get() === 'Gynaecology'
    },
    paeds() {
        return Template.instance().department.get() === 'Pediatrics'
    },
    eye() {
        return Template.instance().department.get() === 'Eye'
    },
    ent() {
        return Template.instance().department.get() === 'ENT'
    },
    dental() {
        return Template.instance().department.get() === 'Dental'
    },
    ortho() {
        return Template.instance().department.get() === 'Orthopaedics'
    },
    neuro() {
        return Template.instance().department.get() === 'Neurology'
    },
    cardio() {
        return Template.instance().department.get() === 'Cardiology'
    },
    psych() {
        return Template.instance().department.get() === 'Psychiatry'
    },
    skin() {
        return Template.instance().department.get() === 'Skin'
    },
    plasticSurgery() {
        return Template.instance().department.get() === 'Plastic Surgery'
    },
    rehab() {
        return Template.instance().department.get() === 'Rehabilitation'
    },
    pharma() {
        return Template.instance().department.get() === 'Pharmacy'
    },
    radio() {
        return Template.instance().department.get() === 'Radiology'
    },

})

//all the helpers for each different template

Template.surgeryTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumSurgery.get()
    },
    busiestDay() {
        return Template.instance().busiestDaySurgery.get()
    },
    busiestTime() {
        return Template.instance().busiestTimeSurgery.get()
    }
})

Template.gynoTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumGynacology.get()
    },
    busiestDay() {
        return Template.instance().busiestDayGynaecology.get()
    },
    busiestTime() {
        return Template.instance().busiestTimeGynaecology.get()
    }
})
Template.paedsTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumPediatrics.get()
    },
    busiestDay() {
        return Template.instance().busiestDayPediatrics.get()
    },
    busiestTime() {
        return Template.instance().busiestTimePediatrics.get()
    }
})
Template.eyeTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumEye.get()
    },
    busiestDay() {
        return Template.instance().busiestDayEye.get()
    },
    busiestTime() {
        return Template.instance().busiestTimeEye.get()
    }
})
Template.entTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumENT.get()
    },
    busiestDay() {
        return Template.instance().busiestDayENT.get()
    },
    busiestTime() {
        return Template.instance().busiestTimeENT.get()
    }
})
Template.dentalTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumDental.get()
    },
    busiestDay() {
        return Template.instance().busiestDayDental.get()
    },
    busiestTime() {
        return Template.instance().busiestTimeDental.get()
    }
})
Template.orthoTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumOrthopaedics.get()
    },
    busiestDay() {
        return Template.instance().busiestDayOrthopaedics.get()
    },
    busiestTime() {
        return Template.instance().busiestTimeOrthopaedics.get()
    }
})
Template.cardioTemplate.helpers({
    patientNum() {
        console.log('here')
        return Template.instance().patientNumCardiology.get()
    },
    busiestDay() {
        return Template.instance().busiestDayCardiology.get()
    },
    busiestTime() {
        return Template.instance().busiestTimeCardiology.get()
    }
})
Template.psychTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumPsychiatry.get()
    },
    busiestDay() {
        return Template.instance().busiestDayPsychiatry.get()
    },
    busiestTime() {
        return Template.instance().busiestTimePsychiatry.get()
    }
})
Template.skinTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumSkin.get()
    },
    busiestDay() {
        return Template.instance().busiestDaySkin.get()
    },
    busiestTime() {
        return Template.instance().busiestTimeSkin.get()
    }
})
Template.plasticSurgeryTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumPlasticSurgery.get()
    },
    busiestDay() {
        return Template.instance().busiestDayPlasticSurgery.get()
    },
    busiestTime() {
        return Template.instance().busiestTimePlasticSurgery.get()
    }
})
Template.rehabTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumRehab.get()
    },
    busiestDay() {
        return Template.instance().busiestDayRehab.get()
    },
    busiestTime() {
        return Template.instance().busiestTimeRehab.get()
    }
})
Template.pharmaTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumPharmacy.get()
    },
    busiestDay() {
        return Template.instance().busiestDayPharmacy.get()
    },
    busiestTime() {
        return Template.instance().busiestTimePharmacy.get()
    }
})
Template.radioTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumRadiology.get()
    },
    busiestDay() {
        return Template.instance().busiestDayRadiology.get()
    },
    busiestTime() {
        return Template.instance().busiestTimeRadiology.get()
    }
})
Template.neuroTemplate.helpers({
    patientNum() {
        return Template.instance().patientNumNeurology.get()
    },
    busiestDay() {
        return Template.instance().busiestDayNeurology.get()
    },
    busiestTime() {
        return Template.instance().busiestTimeNeurology.get()
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