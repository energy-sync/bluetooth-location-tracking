import { Template } from "meteor/templating";
import { historicalPatientInformationDB } from "../../lib/database";
import '../pages/patient-overview.html';

Template.receptionistTemplate.onCreated(function () {
    initializeSpecialty('Receptionist', this)
    initializeSpecialtyChart('Receptionist', this);
});

Template.generalPractitionerTemplate.onCreated(function () {
    initializeSpecialty('General Practitioner', this);
    initializeSpecialtyChart('General Practitioner', this);
});

Template.labTemplate.onCreated(function () {
    initializeSpecialty('Lab', this);
    initializeSpecialtyChart('Lab', this);
});

Template.dermaTemplate.onCreated(function () {
    initializeSpecialty('Dermatology', this);
    initializeSpecialtyChart('Dermatology', this);
});


Template.landing.onCreated(function () {
    this.location = new ReactiveVar('General Info');
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
    console.log(specialty)
        Meteor.call('getNumberOfPeoplePerDay', specialty, (err, res) => {
            let chart = anychart.pie(res);
            chart.title('Number of Patients Per Day in ' + specialty)
                 .radius('43%')
                 .innerRadius('30%');
            chart.legend()
                .position('bottom')
                .itemsLayout('horizontal')
                .align('center')
                .title('Days Of Week');
            chart.animation(true);
            chart.container(specialty).draw();
        });
    }





//all the helpers for landing page
Template.landing.helpers({

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
  
  Template.receptionistTemplate.helpers(createTemplateHelpers('Receptionist'));
  Template.generalPractitionerTemplate.helpers(createTemplateHelpers('General Practitioner'));
  Template.labTemplate.helpers(createTemplateHelpers('Lab'));
  Template.dermaTemplate.helpers(createTemplateHelpers('Dermatology'));
