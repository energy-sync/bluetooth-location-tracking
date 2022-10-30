import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import '../client/pages/patient-list.html';
import '../client/main.html';

// main page
FlowRouter.route("/", {
    name: "main",
    action() {
        this.render("insertData")
    }
});

//device list page
FlowRouter.route("/patient-list", {
    name: "patient-list",
    action() {
        this.render("patientList");
    }
});