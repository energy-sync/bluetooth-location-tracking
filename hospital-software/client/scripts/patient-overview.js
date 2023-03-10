import { Template } from "meteor/templating";
import { historicalPatientInformationDB } from "../../lib/database";
import '../pages/patient-overview.html';

Template.receptionistTemplate.onCreated(function () {
    initializeSpecialty('Receptionist', this)
    initializeSpecialtyChartDays('Receptionist', this);
    initializeSpecialtyChartHours('Receptionist', this);
});

Template.generalPractitionerTemplate.onCreated(function () {
    initializeSpecialty('General Practitioner', this);
    initializeSpecialtyChartDays('General Practitioner', this);
    initializeSpecialtyChartHours('General Practitioner', this);
});

Template.labTemplate.onCreated(function () {
    initializeSpecialty('Lab', this);
    initializeSpecialtyChartDays('Lab', this);
    initializeSpecialtyChartHours('Lab', this);
});

Template.dermaTemplate.onCreated(function () {
    initializeSpecialty('Dermatology', this);
    initializeSpecialtyChartDays('Dermatology', this);
    initializeSpecialtyChartHours('Dermatology', this);
});


Template.landing.onCreated(function () {
    this.location = new ReactiveVar('General Info');
});

function initializeSpecialty(specialtyName, instance) {
    instance['patientNum' + specialtyName] = new ReactiveVar([]);
    instance['busiestDay' + specialtyName] = new ReactiveVar([]);
    instance['busiestTime' + specialtyName] = new ReactiveVar([]);
    instance['avgWaitTime' + specialtyName] = new ReactiveVar([]);

    Meteor.call('getPatientNum', specialtyName, (err, res) => {
        instance['patientNum' + specialtyName].set(res);
    });

    Meteor.call('getBusiestDay', specialtyName, (err, res) => {
        instance['busiestDay' + specialtyName].set(res);
    });

    Meteor.call('getBusyTime', specialtyName, (err, res) => {
        instance['busiestTime' + specialtyName].set(res);
    });

    Meteor.call('getAvgWaitTime', specialtyName, (err,res) =>{
        instance['avgWaitTime' + specialtyName].set(res);
    })
}

function initializeSpecialtyChartDays(specialty) {
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
        chart.container(specialty + 'Days').draw();
    });
}

function initializeSpecialtyChartHours(specialty) {
    Meteor.call('getNumberOfPeoplePerHour', specialty, (err, res) => {
        let chart = anychart.column(res);
        chart.title('Number of Patients Per Hour in ' + specialty)
        chart.animation(true);
        chart.xAxis().title('Hours')
        chart.yAxis().title('Number Of Patients')
        chart.container(specialty + 'Hours').draw();
    });
}


function createTemplateHelpers(templateName) {
    const helpers = {};
    helpers.patientNum = function () {
        return Template.instance()[`patientNum${templateName}`].get();
    };
    helpers.busiestDay = function () {
        return Template.instance()[`busiestDay${templateName}`].get();
    };
    helpers.busiestTime = function () {
        return Template.instance()[`busiestTime${templateName}`].get();
    };
    helpers.avgWaitTime = function (){
        return Template.instance()[`avgWaitTime${templateName}`].get();
    }
    return helpers;
}

Template.receptionistTemplate.helpers(createTemplateHelpers('Receptionist'));
Template.generalPractitionerTemplate.helpers(createTemplateHelpers('General Practitioner'));
Template.labTemplate.helpers(createTemplateHelpers('Lab'));
Template.dermaTemplate.helpers(createTemplateHelpers('Dermatology'));
