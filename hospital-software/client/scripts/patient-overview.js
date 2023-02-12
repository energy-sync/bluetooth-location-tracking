import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { dummyBeaconDB } from "../../lib/database";

Template.patientOverview.helpers({
    beacons(){
        console.log('here')
        console.log(dummyBeaconDB.find())
        return dummyBeaconDB.find();
    }
})