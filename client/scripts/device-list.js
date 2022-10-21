import { Template } from "meteor/templating";
import { patientInformationdb } from "../../lib/database";
import "../pages/device-list.html";

Template.deviceList.helpers({
    devices() {
        return patientInformationdb.find();
    }
});

Template.deviceRow.helpers({
    readableDate() {
        unixTime = patientInformationdb.findOne({_id: this.device._id}).time;
        let date = new Date(unixTime);
        return date.toLocaleString();
    }
});