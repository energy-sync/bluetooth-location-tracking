import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import '../client/main.html';
import '../client/pages/device-list.html';

// main page
FlowRouter.route("/", {
    name: "main",
    action() {
        this.render("insertData")
    }
});

//device list page
FlowRouter.route("/device-list", {
    name: "device-list",
    action() {
        this.render("DeviceList");
    }
});