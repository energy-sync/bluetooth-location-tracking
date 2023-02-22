import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// main page
FlowRouter.route("/", {
    name: "main",
    action() {
        this.render("main")
    }
});