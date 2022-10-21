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
        var location = $('#location').val();
        var time = Date.now();

        patientInformationdb.insert({
            "macAddress": macAddress,
            "patientName": patientName,
            "location": location,
            "time": time
        });
        $('#pName').val('');
        $('#location').val('');
    },
    'click .js-clear'(event, instance) {
        console.log("click");
        Meteor.call("clearRecords");
    }
});