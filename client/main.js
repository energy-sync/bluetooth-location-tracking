import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../lib/database.js';
import '../lib/routing';
import './pages/main.html';
import './stylesheets/bootstrap.min.css'
import "./pages/device-list.html"

//MongoDB
Template.insertData.events({
    'click .js-save'(event, instance) {
        var patientName = $('#pName').val();
        var location = $('#location').val();
        var time = Date.now();

        patientInformationdb.insert({
            "patientName": patientName,
            "location": location,
            "time": time
        });
        $('#pName').val('');
        $('#location').val('');
    }
});