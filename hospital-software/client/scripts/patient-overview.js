import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { patientInformationdb } from "../../lib/database";
import { ReactiveVar } from "meteor/reactive-var";
//import { Chart } from "chart.js/auto"
//import { anychart } from "anychart"

Template.patientOverview.onCreated(function() {

    this.receptionAverageWait = new ReactiveVar([]);
    this.receptionPatientCount = new ReactiveVar([]);
    this.receptionBusiest = new ReactiveVar([]);

    this.generalAverageWait = new ReactiveVar([]);
    this.generalPatientCount = new ReactiveVar([]);
    this.generalBusiest = new ReactiveVar([]);

    this.dermatologyAverageWait = new ReactiveVar([]);
    this.dermatologyPatientCount = new ReactiveVar([]);
    this.dermatologyBusiest = new ReactiveVar([]);

    this.labAverageWait = new ReactiveVar([]);
    this.labPatientCount = new ReactiveVar([]);
    this.labBusiest = new ReactiveVar([]);

    Meteor.call('getWaitTimes', 'Receptionist', (error, result) => {
        if (error) {
            console.error(error);
            return;
          }
          this.receptionAverageWait.set(result);
    });

    Meteor.call('getPatientCountAt', 'Receptionist', (error, result) =>{
        if(error){
            console.error(error);
            return;
        }
        this.receptionPatientCount.set(result);
    });

    Meteor.call('getBusyTime', 'Receptionist', (error, result) =>{
        if(error){
            console.error(error);
            return;
        }
        this.receptionBusiest.set(result);
    });

    Meteor.call('getWaitTimes', 'General Practitioner', (error, result) => {
        if (error) {
            console.error(error);
            return;
          }
          this.generalAverageWait.set(result);
    });

    Meteor.call('getPatientCountAt', 'General Practitioner', (error, result) =>{
        if(error){
            console.error(error);
            return;
        }
        this.generalPatientCount.set(result);
    });

    Meteor.call('getBusyTime', 'General Practitioner', (error, result) =>{
        if(error){
            console.error(error);
            return;
        }
        this.generalBusiest.set(result);
    });

    Meteor.call('getWaitTimes', 'Dermatology', (error, result) => {
        if (error) {
            console.error(error);
            return;
          }
          this.dermatologyAverageWait.set(result);
    });

    Meteor.call('getPatientCountAt', 'Dermatology', (error, result) =>{
        if(error){
            console.error(error);
            return;
        }
        this.dermatologyPatientCount.set(result);
    });

    Meteor.call('getBusyTime', 'Dermatology', (error, result) =>{
        if(error){
            console.error(error);
            return;
        }
        this.dermatologyBusiest.set(result);
    });

    Meteor.call('getWaitTimes', 'Lab', (error, result) => {
        if (error) {
            console.error(error);
            return;
          }
          this.labAverageWait.set(result);
    });

    Meteor.call('getPatientCountAt', 'Lab', (error, result) =>{
        if(error){
            console.error(error);
            return;
        }
        this.labPatientCount.set(result);
    });

    Meteor.call('getBusyTime', 'Lab', (error, result) =>{
        if(error){
            console.error(error);
            return;
        }
        this.labBusiest.set(result);
    });
});

Template.patientOverview.onRendered(function() {
    Meteor.call('getWaitTimes', 'Receptionist', (error, result) => {
        if (error) {
            console.error(error);
            return;
          }else{
          var receptionAverageWait = result;
    }

    Meteor.call('getWaitTimes', 'General Practitioner', (error, result) => {
        if (error) {
            console.error(error);
            return;
          }else{
          var generalAverageWait = result;
    }

    Meteor.call('getWaitTimes', 'Dermatology', (error, result) => {
        if (error) {
            console.error(error);
            return;
          }else{
          var dermatologyAverageWait = result;
    }

    Meteor.call('getWaitTimes', 'Lab', (error, result) => {
        if (error) {
            console.error(error);
            return;
          }else{
          var labAverageWait = result;
    }

    /*
    Meteor.call('getBusyTime', 'Receptionist', (error, result) =>{
        if(error){
            console.error(error);
            return;
        }
        var receptionBusiest= result;
    }); */


    const departments = ['Receptionist', 'General Practioner', 'Dermatology', 'Lab'];

    
    var data = [
        {x:'Receptionist', value: receptionAverageWait},
        {x: 'General Practioner', value : generalAverageWait},
        {x: 'Dermatology', value : dermatologyAverageWait},
        {x: 'Lab', value : labAverageWait}
    ];
    
    var chart = anychart.column(data);
    
    chart.title("Average Wait Time in Each Department");
    
    chart.container("averageWait");
    
    chart.draw();
});
    });
});
    });

});


    Template.patientOverview.helpers({
        receptionAverageWait() {
            return Template.instance().receptionAverageWait.get();
        },
        generalAverageWait() {
          return Template.instance().generalAverageWait.get();
        },
        dermatologyAverageWait() {
          return Template.instance().dermatologyAverageWait.get();
        },
        labAverageWait() {
        return Template.instance().labAverageWait.get();
        },
        receptionPatientCount() {
            return Template.instance().receptionPatientCount.get();
        },
        generalPatientCount() {
            return Template.instance().generalPatientCount.get();
        },
        dermatologyPatientCount() {
            return Template.instance().dermatologyPatientCount.get();
        },
        labPatientCount(){
            return Template.instance().labPatientCount.get();
        },
        receptionBusiest(){
            return Template.instance().receptionBusiest.get();
        },
        generalBusiest(){
            return Template.instance().generalBusiest.get();
        },
        dermatologyBusiest(){
            return Template.instance().dermatologyBusiest.get();
        },
        labBusiest(){
            return Template.instance().labBusiest.get();
        }
    })