import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// main page
FlowRouter.route("/", {
    name: "main",
    action() {
        this.render("main")
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
FlowRouter.route("/patientOverview", {
    name: "patientOverview",
    action() {
        this.render("patientOverview");
    }
});
