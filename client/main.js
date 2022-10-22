import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating';
import { patientInformationdb } from '../lib/database.js';
import '../lib/routing';
import './main.html';
import './stylesheets/bootstrap.min.css';
import "./pages/device-list.html";
import "./scripts/device-list";

//MongoDB
Template.insertData.events({
    'click .js-save'(event, instance) {
        var macAddress = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
            return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
        });
        var patientName = $('#pName').val();
        var address = $('#address').val();
        var patientID = $('#patientID').val();
        var age = $('#age').val();
        var DOB = $('#DOB').val();
        var physicanName = $('#physicanName').val();
        var bloodPressure=$('#bloodPressure').val();
        var heartRate=$('#heartRate').val();
        var labInfo=$('#labInfo').val();
        var prescriptions=$('#prescriptions').val();

        patientInformationdb.insert({
            "macAddress": macAddress,
            "patientName": patientName,
            "address": address,
            "patientID":patientID,
            "age":age,
            "DOB":DOB,
            "physicanName":physicanName,
            "bloodPressure":bloodPressure,
            "heartRate":heartRate,
            "labInfo":labInfo,
            "prescriptions":prescriptions,
            
        });
        $('#pName').val('');
        $('#address').val('');
        $('#patientID').val('');
        $('#age').val('');
        $('#DOB').val('');
        $('#physicanName').val('');
        $('#bloodPressure').val('');
        $('#heartRate').val('');
        $('#labInfo').val('');
        $('#prescriptions').val('');
    },
    'click .js-clear'(event, instance) {
        console.log("click");
        Meteor.call("clearRecords");
    }
});