import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// main page
FlowRouter.route("/", {
    name: "main",
    action() {
        this.render("landingPage")
    }
});

//device list page
FlowRouter.route("/patient-list", {
    name: "patient-list",
    action() {
        this.render("patientList");
    }
});

//patient page
FlowRouter.route("/patient/:patientID", {
    name: "patient",
    action() {
        this.render("patient");
    }
});

//patient overview page
FlowRouter.route("/patient-overview", {
    name: "patientOverview",
    action() {
        this.render("patientOverview");
    }
});