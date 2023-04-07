import { Template } from "meteor/templating";
import { historicalPatientInformationDB } from "../../lib/database";



Template.receptionistTemplate.onCreated(function () {
    initializeSpecialty('Receptionist', this)

});

Template.receptionistTemplate.onRendered(function () {
    initializeSpecialtyChartDays('Receptionist', this);
    initializeSpecialtyChartHours('Receptionist', this);
})

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
    this.currentTab = new ReactiveVar("overview");
})

Template.landing.helpers({
    currentTab: function () {
        return Template.instance().currentTab.get();
    }
});

Template.overview.onCreated(function(){
   Meteor.call('getNumberOfPeoplePerDepartment', (err,res)=>{
        let chart = anychart.column()
        chart.animation(true)
        chart.padding([10, 40, 5, 20])
        chart.title('Number of People in Each Department')

        let series = chart.column(res)
        series
        .tooltip()
        .position('right')
        .anchor('left-center')
        .offsetX(5)
        .offsetY(0)
        .titleFormat('{%X}')
        .format('{%Value}');

        chart.yAxis().labels().format('{%Value}{groupsSeparator: }');

        chart.xAxis().title('Departments');
        chart.yAxis().title('Number of People');
        chart.interactivity().hoverMode('by-x');
        chart.tooltip().positionMode('point');
        // set scale minimum
        chart.yScale().minimum(0);
  
        // set container id for the chart
        chart.container('numberOfPeopleInHospital');
        // initiate chart drawing
        chart.draw();
   })

   Meteor.call('getWaitTimesPerDepartment', (err,res)=>{
    let chart = anychart.column()
    chart.animation(true)
    chart.padding([10, 40, 5, 20])
    chart.title('Average Waiting Time of Each Department')

    let series = chart.column(res)
    series
    .tooltip()
    .position('right')
    .anchor('left-center')
    .offsetX(5)
    .offsetY(0)
    .titleFormat('{%X}')
    .format('{%Value}');

    chart.yAxis().labels().format('{%Value}{groupsSeparator: }');

    chart.xAxis().title('Departments');
    chart.yAxis().title('Wait Time in Minutes');
    chart.interactivity().hoverMode('by-x');
    chart.tooltip().positionMode('point');
    // set scale minimum
    chart.yScale().minimum(0);

    // set container id for the chart
    chart.container('waitTimesOfDepartments');
    // initiate chart drawing
    chart.draw();
})
    
})

Template.overview.helpers({
    currentNumberOfPeople(){
        return historicalPatientInformationDB.find().count()
    }
})
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

    Meteor.call('getAvgWaitTime', specialtyName, (err, res) => {
        instance['avgWaitTime' + specialtyName].set(res);
    })
}

function initializeSpecialtyChartDays(specialty) {
    Meteor.call('getNumberOfPeoplePerDay', specialty, (err, res) => {
        let pieChart = anychart.pie(res);
        pieChart.title('Number of Patients Per Day in ' + specialty)
            .radius('43%')
        pieChart.legend()
            .position('bottom')
            .itemsLayout('horizontal')
            .align('center')
            .title('Days Of Week');
        pieChart.labels().position('outside')
        pieChart.animation(true);
        pieChart.container(specialty + 'Days').draw();

        pieChart.listen('pointClick', function (e) {
            if (specialty === 'General Practitioner') {
                specialty = 'GeneralPractitioner';
                $('#peoplePerDayPerHour' + specialty).empty()
                let selectedSlice = e.iterator.get('x');
                Meteor.call('getNumberOfPeoplePerDayPerHour', specialty, selectedSlice, (err, res) => {
                    data = res;
                    clearData = [];
                    let chart = anychart.column(res);
                    chart.title('Number of Patients Per Hour in General Practitioner on ' + selectedSlice)
                    chart.animation(true);
                    chart.xAxis().title('Hours (In 24 standard)')
                    chart.yAxis().title('Number Of Patients')
                    chart.container('peoplePerDayPerHour' + specialty).draw();
                });
            } else {
                $('#peoplePerDayPerHour' + specialty).empty()
                let selectedSlice = e.iterator.get('x');
                Meteor.call('getNumberOfPeoplePerDayPerHour', specialty, selectedSlice, (err, res) => {
                    data = res;
                    let chart = anychart.column(res);
                    chart.title('Number of Patients Per Hour in ' + specialty + ' on ' + selectedSlice)
                    chart.animation(true);
                    chart.xAxis().title('Hours (In 24 standard)')
                    chart.yAxis().title('Number Of Patients')
                    chart.container('peoplePerDayPerHour' + specialty).draw();
                });
            }
        });



    });
}



function initializeSpecialtyChartHours(specialty) {
    Meteor.call('getNumberOfPeoplePerHour', specialty, (err, res) => {
        let chart = anychart.column(res);
        chart.title('Number of Patients Per Hour in ' + specialty)
        chart.animation(true);
        chart.xAxis().title('Hours (In 24 standard)')
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
    helpers.avgWaitTime = function () {
        return Template.instance()[`avgWaitTime${templateName}`].get();
    }
    return helpers;
}

Template.receptionistTemplate.helpers(createTemplateHelpers('Receptionist'));
Template.generalPractitionerTemplate.helpers(createTemplateHelpers('General Practitioner'));
Template.labTemplate.helpers(createTemplateHelpers('Lab'));
Template.dermaTemplate.helpers(createTemplateHelpers('Dermatology'));


Template.tabbedInterface.helpers({
    isActiveTab(tabName) {
        const currentTab = window.location.hash.slice(1);
        return currentTab === tabName ? 'active' : '';
    },
});


Template.tabbedInterface.events({
    'click .nav-link': function (event) {
        event.preventDefault();

        const targetTabId = event.currentTarget.hash;

        $('.nav-item').removeClass('active');
        $(event.currentTarget).parent().addClass('active');

        $('.tab-pane').removeClass('show active');
        $(targetTabId).addClass('show active');


    }
});