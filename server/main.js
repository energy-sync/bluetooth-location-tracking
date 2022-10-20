import { Meteor } from 'meteor/meteor';
import '../lib/database.js';
import { patientInformationdb } from "../lib/database"

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  clearRecords: () => {
    patientInformationdb.remove({});
  }
})
