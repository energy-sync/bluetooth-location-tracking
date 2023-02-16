import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { patientInformationdb } from "../lib/database"

const filterRegex = /[^a-z0-9:]/g;



Template.main.helpers({
    patients() {
        console.log(patientInformationdb.find());
        return patientInformationdb.find();
    },
    getSearch() {
        let searchParam = FlowRouter.getQueryParam("search");
        return searchParam ? searchParam : "";
    }
});
