import { Template } from "meteor/templating";
import { dummyBeaconDB } from "../../lib/database";
import '../pages/patient-overview.html';

Template.surgeryTemplate.onCreated(function () {
    initializeSpecialty('Surgery', this)
    initializeSpecialtyChart('Surgery', this);
});

Template.gynoTemplate.onCreated(function () {
    initializeSpecialty('Gynaecology', this);
    initializeSpecialtyChart('Gynaecology', this);
});

Template.paedsTemplate.onCreated(function () {
    initializeSpecialty('Pediatrics', this);
    initializeSpecialtyChart('Pediatrics', this);
});

Template.eyeTemplate.onCreated(function () {
    initializeSpecialty('Eye', this);
    initializeSpecialtyChart('Eye', this);
});

Template.entTemplate.onCreated(function () {
    initializeSpecialty('ENT', this);
    initializeSpecialtyChart('ENT', this);
});

Template.dentalTemplate.onCreated(function () {
    initializeSpecialty('Dental', this);
    initializeSpecialtyChart('Dental', this);
});

Template.orthoTemplate.onCreated(function () {
    initializeSpecialty('Orthopaedics', this);
    initializeSpecialtyChart('Orthopaedics', this);
});

Template.neuroTemplate.onCreated(function () {
    initializeSpecialty('Neurology', this);
    initializeSpecialtyChart('Neurology', this);
});
Template.cardioTemplate.onCreated(function () {
    initializeSpecialty('Cardiology', this);
    initializeSpecialtyChart('Cardiology', this);
});
Template.psychTemplate.onCreated(function () {
    initializeSpecialty('Psychiatry', this);
    initializeSpecialtyChart('Psychiatry', this);
});
Template.skinTemplate.onCreated(function () {
    initializeSpecialty('Skin', this);
    initializeSpecialtyChart('Skin', this);
});
Template.plasticSurgeryTemplate.onCreated(function () {
    initializeSpecialty('Plastic Surgery', this);
    initializeSpecialtyChart('Plastic Surgery', this);
});
Template.rehabTemplate.onCreated(function () {
    initializeSpecialty('Rehabilitation', this);
    initializeSpecialtyChart('Rehabilitation', this);
});
Template.pharmaTemplate.onCreated(function () {
    initializeSpecialty('Pharmacy', this);
    initializeSpecialtyChart('Pharmacy', this);
});
Template.radioTemplate.onCreated(function () {
    initializeSpecialty('Radiology', this);
    initializeSpecialtyChart('Radiology', this);
});



Template.landing.onCreated(function () {
    this.department = new ReactiveVar('General Info');
});

function initializeSpecialty(specialtyName, instance) {
    instance['patientNum' + specialtyName] = new ReactiveVar([]);
    instance['busiestDay' + specialtyName] = new ReactiveVar([]);
    instance['busiestTime' + specialtyName] = new ReactiveVar([]);

    Meteor.call('getPatientNum', specialtyName, (err, res) => {
        instance['patientNum' + specialtyName].set(res);
    });

    Meteor.call('getBusiestDay', specialtyName, (err, res) => {
        instance['busiestDay' + specialtyName].set(res);
    });

    Meteor.call('getBusyTime', specialtyName, (err, res) => {
        instance['busiestTime' + specialtyName].set(res);
    });
}

function initializeSpecialtyChart(specialty) {

        Meteor.call('getNumberOfPeoplePerDay', specialty, (err, res) => {
            let chart = anychart.pie(res);
            chart.title('Number of Patients Per Day')
                 .radius('43%')
                 .innerRadius('30%');
            chart.legend()
                .position('bottom')
                .itemsLayout('horizontal')
                .align('center')
                .title('Days Of Week');
            chart.animation(true);
            chart.container("container").draw();
        });
    }





//all the helpers for landing page
Template.landing.helpers({
    departments: ["Surgery", "Gynaecology", "Pediatrics", "Eye", "ENT", "Dental", "Orthopaedics", "Neurology", "Cardiology", "Psychiatry", "Skin", "Plastic Surgery", "Rehabilitation", "Pharmacy", "Radiology"],
    generalInfo: () => Template.instance().department.get() === 'General Info',
    surgery: () => Template.instance().department.get() === 'Surgery',
    gyno: () => Template.instance().department.get() === 'Gynaecology',
    paeds: () => Template.instance().department.get() === 'Pediatrics',
    eye: () => Template.instance().department.get() === 'Eye',
    ent: () => Template.instance().department.get() === 'ENT',
    dental: () => Template.instance().department.get() === 'Dental',
    ortho: () => Template.instance().department.get() === 'Orthopaedics',
    neuro: () => Template.instance().department.get() === 'Neurology',
    cardio: () => Template.instance().department.get() === 'Cardiology',
    psych: () => Template.instance().department.get() === 'Psychiatry',
    skin: () => Template.instance().department.get() === 'Skin',
    plasticSurgery: () => Template.instance().department.get() === 'Plastic Surgery',
    rehab: () => Template.instance().department.get() === 'Rehabilitation',
    pharma: () => Template.instance().department.get() === 'Pharmacy',
    radio: () => Template.instance().department.get() === 'Radiology',
  });

function createTemplateHelpers(templateName) {
    const helpers = {};
    helpers.patientNum = function() {
      return Template.instance()[`patientNum${templateName}`].get();
    };
    helpers.busiestDay = function() {
      return Template.instance()[`busiestDay${templateName}`].get();
    };
    helpers.busiestTime = function() {
      return Template.instance()[`busiestTime${templateName}`].get();
    };
    return helpers;
  }
  
  Template.surgeryTemplate.helpers(createTemplateHelpers('Surgery'));
  Template.gynoTemplate.helpers(createTemplateHelpers('Gynaecology'));
  Template.paedsTemplate.helpers(createTemplateHelpers('Pediatrics'));
  Template.eyeTemplate.helpers(createTemplateHelpers('Eye'));
  Template.entTemplate.helpers(createTemplateHelpers('ENT'));
  Template.dentalTemplate.helpers(createTemplateHelpers('Dental'));
  Template.orthoTemplate.helpers(createTemplateHelpers('Orthopaedics'));
  Template.cardioTemplate.helpers(createTemplateHelpers('Cardiology'));
  Template.psychTemplate.helpers(createTemplateHelpers('Psychiatry'));
  Template.skinTemplate.helpers(createTemplateHelpers('Skin'));
  Template.plasticSurgeryTemplate.helpers(createTemplateHelpers('Plastic Surgery'));
  Template.rehabTemplate.helpers(createTemplateHelpers('Rehabilitation'));
  Template.pharmaTemplate.helpers(createTemplateHelpers('Pharmacy'));
  Template.radioTemplate.helpers(createTemplateHelpers('Radiology'));
  Template.neuroTemplate.helpers(createTemplateHelpers('Neurology'));
  

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