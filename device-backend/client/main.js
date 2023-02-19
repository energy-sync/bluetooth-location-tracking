import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { deviceInformationdb } from "../lib/database"
import "./bootstrap.min.css";
import { patientInformationdb } from "../lib/database"

const filterRegex = /[^a-z0-9:]/g;



Template.main.helpers({
    patients() {
        console.log(deviceInformationdb.find());
        return deviceInformationdb.find();
    },
   
    getSearch() {
        let searchParam = FlowRouter.getQueryParam("search");
        return searchParam ? searchParam : "";
    }
});
