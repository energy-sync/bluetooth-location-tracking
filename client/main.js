import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/database.js';

Template.insertData.events({
  'click .js-save'(event,instance){
    var patientName = $('#pName').val();
    var location = $('#location').val();
    var time = Date.now();

    patientInformationdb.insert({
      "patientName": patientName,
      "location" : location,
      "time" : time
    });
    $('#pName').val('');
    $('#location').val('');
  }
});

