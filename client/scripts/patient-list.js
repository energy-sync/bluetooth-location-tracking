import { Template } from "meteor/templating";
import { patientInformationdb } from "../../lib/database";
import "../pages/patient-list.html";

Template.patientList.helpers({
    devices() {
        return patientInformationdb.find();
    }
});

Template.patientRow.helpers({
    readableDate() {
        //unixTime = patientInformationdb.findOne({_id: this.device._id}).time;
        let date = new Date();
        return date.toLocaleString();
    }
});