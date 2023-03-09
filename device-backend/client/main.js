import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { deviceInformationdb, deviceHistorydb, radiodb } from "../lib/database"
import "./bootstrap.min.css";
import "./main.css"

Template.main.onCreated(function () {
    this.showBeaconMenu = new ReactiveVar(false);
    this.showRadioMenu = new ReactiveVar(false);
    this.showConfirmApplyAllMenu = new ReactiveVar(false);
    this.showConfirmRestartMenu = new ReactiveVar(false);
    this.currentBeacon = new ReactiveVar();
    this.currentBeaconHistory = new ReactiveVar();
    this.currentRadio = new ReactiveVar();
});

Template.main.helpers({
    beacons() {
        return deviceInformationdb.find();
    },

    isMenuOpen() {
        let isBeaconMenuOpen = Template.instance().showBeaconMenu.get();
        let isRadioMenuOpen = Template.instance().showRadioMenu.get();
        return isBeaconMenuOpen || isRadioMenuOpen;
    },

    isConfirmMenuOpen() {
        let isConfirmApplyAllMenuOpen = Template.instance().showConfirmApplyAllMenu.get();
        let isConfirmRestartMenuOpen = Template.instance().showConfirmRestartMenu.get();
        return isConfirmApplyAllMenuOpen || isConfirmRestartMenuOpen;
    },

    isBeaconMenuOpen() {
        return Template.instance().showBeaconMenu.get();
    },

    isRadioMenuOpen() {
        return Template.instance().showRadioMenu.get();
    },

    isConfirmApplyAllMenuOpen() {
        return Template.instance().showConfirmApplyAllMenu.get();
    },

    isConfirmRestartMenuOpen() {
        return Template.instance().showConfirmRestartMenu.get();
    },

    getLastLocation(beacon) {
        let beaconHistory = deviceHistorydb.findOne({macAddress: beacon.macAddress});
        if (!beaconHistory || beaconHistory.history.length < 2)
            return undefined;
        else {
            return beaconHistory.history[beaconHistory.history.length - 2].location;
        }
    },

    getBeaconName() {
        return Template.instance().currentBeacon.curValue.beaconID;
    },

    getcurrentBeacon() {
        return Template.instance().currentBeacon.curValue;
    },

    getCurrentLocation() {
        let historyLog = Template.instance().currentBeaconHistory.curValue;
        if (!historyLog)
            return "None";
        let history = historyLog.history;
        return history[history.length - 1].location;
    },

    beaconHasHistory() {
        return Template.instance().currentBeaconHistory.curValue !== undefined;
    },

    getcurrentBeaconHistory() {
        return Template.instance().currentBeaconHistory.curValue.history.reverse();
    },

    getReadableTimestamp(date) {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[date.getDay()];
        return `${day} ${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    },

    radios() {
        return radiodb.find();
    },

    radioOnline(radio) {
        return radiodb.findOne({macAddress: radio.macAddress}).online;
    },

    getRadioName() {
        return Template.instance().currentRadio.curValue.location;
    },

    getRefreshTime() {
        return Template.instance().currentRadio.curValue.config.refreshTime;
    },

    getMeasuredPower() {
        return Template.instance().currentRadio.curValue.config.measuredPower;
    },

    getEnvironmentalFactor() {
        return Template.instance().currentRadio.curValue.config.environmentalFactor;
    },

    getDistanceChangeToTransmit() {
        return Template.instance().currentRadio.curValue.config.distanceChangeToTransmit;
    }
});

Template.main.events({
    "click .beacon-row": (event, templateInstance) => {
        templateInstance.showBeaconMenu.set(true);
        let beaconName = event.currentTarget.children[0].innerHTML;
        let beacon = deviceInformationdb.findOne({beaconID: beaconName});
        templateInstance.currentBeacon.set(beacon);
        let beaconHistory = deviceHistorydb.findOne({macAddress: beacon.macAddress});
        if (beaconHistory)
            templateInstance.currentBeaconHistory.set(beaconHistory);
    },

    "click .radio-row": (event, templateInstance) => {
        templateInstance.showRadioMenu.set(true);
        let radioName = event.currentTarget.children[0].innerHTML;
        let radio = radiodb.findOne({location: radioName});
        templateInstance.currentRadio.set(radio);
    },

    "click #xButton": (event, templateInstance) => {
        templateInstance.showBeaconMenu.set(false);
        templateInstance.showRadioMenu.set(false);
        templateInstance.showConfirmApplyAllMenu.set(false);
        templateInstance.showConfirmRestartMenu.set(false);
    },

    "click #confirmXButton": (event, templateInstance) => {
        templateInstance.showConfirmApplyAllMenu.set(false);
        templateInstance.showConfirmRestartMenu.set(false);
    },

    "click #confirmCancelButton": (event, templateInstance) => {
        templateInstance.showConfirmApplyAllMenu.set(false);
        templateInstance.showConfirmRestartMenu.set(false);
    },

    "click #applyButton": (event, templateInstance) => {
        let currentRadio = Template.instance().currentRadio.curValue;
        let radioConfig = radiodb.findOne({macAddress: currentRadio.macAddress}).config;
        radioConfig.refreshTime = refreshTimeInput.value;
        radioConfig.measuredPower = measuredPowerInput.value;
        radioConfig.environmentalFactor = environmentalFactorInput.value;
        radioConfig.distanceChangeToTransmit = distanceChangeToTransmitInput.value;
        templateInstance.showRadioMenu.set(false);
        Meteor.call('updateRadioConfig', currentRadio.macAddress, radioConfig, (error, result) => {
            if (error)
                console.error(error);
        });
    },

    "click #applyAllButton": (event, templateInstance) => {
        templateInstance.showConfirmApplyAllMenu.set(true);
    },

    "click #restartRadioButton": (event, templateInstance) => {
        templateInstance.showConfirmRestartMenu.set(true);
    },

    "click #confirmButton": (event, templateInstance) => {
        let currentRadio = Template.instance().currentRadio.curValue;
        let radioConfig = radiodb.findOne({macAddress: currentRadio.macAddress}).config;
        radioConfig.refreshTime = refreshTimeInput.value;
        radioConfig.measuredPower = measuredPowerInput.value;
        radioConfig.environmentalFactor = environmentalFactorInput.value;
        radioConfig.distanceChangeToTransmit = distanceChangeToTransmitInput.value;
        templateInstance.showBeaconMenu.set(false);
        templateInstance.showRadioMenu.set(false);
        templateInstance.showConfirmApplyAllMenu.set(false);
        templateInstance.showConfirmRestartMenu.set(false);
        if (Template.instance().showConfirmApplyAllMenu.curValue) {
            for (radio of radiodb.find({}).fetch()) {
                Meteor.call('updateRadioConfig', radio.macAddress, radioConfig, (error, result) => {
                    if (error)
                        console.error(error);
                });
            }
        }
        else if (Template.instance().showConfirmRestartMenu.curValue) {
            radioConfig.restart = true;
            Meteor.call('updateRadioConfig', currentRadio.macAddress, radioConfig, (error, result) => {
                if (error)
                    console.error(error);
            });
        }
    }
});