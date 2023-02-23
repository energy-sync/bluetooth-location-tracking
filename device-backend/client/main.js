import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { deviceInformationdb, deviceHistorydb } from "../lib/database"
import "./bootstrap.min.css";
import "./main.css"

Template.main.onCreated(function () {
    this.showDeviceMenu = new ReactiveVar(false);
    this.currentDevice = new ReactiveVar();
    this.currentDeviceHistory = new ReactiveVar();
    this.radios = new ReactiveVar();
});

Template.main.onRendered(function() {
    Meteor.call("getConfig", (error, result) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(result.radios);
        this.radios.set(result.radios);
    })
});

Template.main.helpers({
    beacons() {
        return deviceInformationdb.find();
    },

    isMenuOpen() {
        return Template.instance().showDeviceMenu.get();
    },

    getLastLocation(device) {
        let deviceHistory = deviceHistorydb.findOne({macAddress: device.macAddress});
        if (!deviceHistory || deviceHistory.history.length < 2)
            return undefined;
        else {
            return deviceHistory.history[deviceHistory.history.length - 2].location;
        }
    },

    getDeviceName() {
        return Template.instance().currentDevice.curValue.beaconID;
    },

    getCurrentDevice() {
        return Template.instance().currentDevice.curValue;
    },

    getCurrentLocation() {
        let historyLog = Template.instance().currentDeviceHistory.curValue;
        if (!historyLog)
            return "None";
        let history = historyLog.history;
        return history[history.length - 1].location;
    },

    deviceHasHistory() {
        return Template.instance().currentDeviceHistory.curValue !== undefined;
    },

    getCurrentDeviceHistory() {
        return Template.instance().currentDeviceHistory.curValue.history.reverse();
    },

    getReadableTimestamp(date) {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[date.getDay()];
        return `${day} ${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    },

    radios() {
        return this.radios;
    },

    radioStatus(radio) {
        let r = radiodb.findOne({macAddress: radio.macAddress});
        console.log(r);
    }
});

Template.main.events({
    "click .device-row": (event, templateInstance) => {
        templateInstance.showDeviceMenu.set(true);
        let deviceName = event.currentTarget.children[0].innerHTML;
        let device = deviceInformationdb.findOne({beaconID: deviceName});
        templateInstance.currentDevice.set(device);
        let deviceHistory = deviceHistorydb.findOne({macAddress: device.macAddress});
        if (deviceHistory)
            templateInstance.currentDeviceHistory.set(deviceHistory);
    },

    "click #closeMenu": (event, templateInstance) => {
        templateInstance.showDeviceMenu.set(false);
    }
});