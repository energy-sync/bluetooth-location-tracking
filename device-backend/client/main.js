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
    this.showConfirmDeleteBeaconMenu = new ReactiveVar(false);
    this.showConfirmDeleteRadioMenu = new ReactiveVar(false);
    this.showAddBeaconMenu = new ReactiveVar(false);
    this.showAddRadioMenu = new ReactiveVar(false);
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
        let isConfirmDeleteBeaconMenuOpen = Template.instance().showConfirmDeleteBeaconMenu.get();
        let isConfirmDeleteRadioMenuOpen = Template.instance().showConfirmDeleteRadioMenu.get();
        return isConfirmApplyAllMenuOpen || isConfirmRestartMenuOpen || isConfirmDeleteBeaconMenuOpen || isConfirmDeleteRadioMenuOpen;
    },

    isAddMenuOpen() {
        let isAddBeaconMenuOpen = Template.instance().showAddBeaconMenu.get();
        let isAddRadioMenuOpen = Template.instance().showAddRadioMenu.get();
        return isAddBeaconMenuOpen || isAddRadioMenuOpen;
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

    isConfirmDeleteBeaconMenuOpen() {
        return Template.instance().showConfirmDeleteBeaconMenu.get();
    },

    isConfirmDeleteRadioMenuOpen() {
        return Template.instance().showConfirmDeleteRadioMenu.get();
    },

    isAddBeaconMenuOpen() {
        return Template.instance().showAddBeaconMenu.get();
    },

    isAddRadioMenuOpen() {
        return Template.instance().showAddRadioMenu.get();
    },

    getLastLocation(beacon) {
        let beaconHistory = deviceHistorydb.findOne({macAddress: beacon.macAddress});
        if (!beaconHistory)
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
        if (radio)
            return radiodb.findOne({macAddress: radio.macAddress}).online;
        else {
            let device = radiodb.findOne({macAddress: Template.instance().currentRadio.curValue.macAddress});
            return Date.now() - device.lastPing < 10000;
        }
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

    "click #addBeaconButton": (event, templateInstance) => {
        templateInstance.showAddBeaconMenu.set(true);
    },

    "click #addRadioButton": (event, templateInstance) => {
        templateInstance.showAddRadioMenu.set(true);
    },

    "click #xButton": (event, templateInstance) => {
        templateInstance.showBeaconMenu.set(false);
        templateInstance.showRadioMenu.set(false);
        templateInstance.showConfirmApplyAllMenu.set(false);
        templateInstance.showConfirmRestartMenu.set(false);
        templateInstance.showConfirmDeleteBeaconMenu.set(false);
        templateInstance.showConfirmDeleteRadioMenu.set(false);
    },

    "click #confirmXButton": (event, templateInstance) => {
        templateInstance.showConfirmApplyAllMenu.set(false);
        templateInstance.showConfirmRestartMenu.set(false);
        templateInstance.showConfirmDeleteBeaconMenu.set(false);
        templateInstance.showConfirmDeleteRadioMenu.set(false);
    },

    "click #addXButton": (event, templateInstance) => {
        templateInstance.showAddBeaconMenu.set(false);
        templateInstance.showAddRadioMenu.set(false);
    },

    "click #confirmCancelButton": (event, templateInstance) => {
        templateInstance.showConfirmApplyAllMenu.set(false);
        templateInstance.showConfirmRestartMenu.set(false);
        templateInstance.showConfirmDeleteBeaconMenu.set(false);
        templateInstance.showConfirmDeleteRadioMenu.set(false);
    },

    "click #addCancelButton": (event, templateInstance) => {
        templateInstance.showAddBeaconMenu.set(false);
        templateInstance.showAddRadioMenu.set(false);
    },

    "click #beaconApplyButton": (event, templateInstance) => {
        let currentBeacon = Template.instance().currentBeacon.curValue;
        Meteor.call('updateBeaconName', currentBeacon.macAddress, beaconNameInput.value, (error, result) => {
            if (error)
                console.error(error);
        });
        templateInstance.showBeaconMenu.set(false);
    },

    "click #radioApplyButton": (event, templateInstance) => {
        let currentRadio = Template.instance().currentRadio.curValue;
        let radioConfig = radiodb.findOne({macAddress: currentRadio.macAddress}).config;
        Meteor.call('updateRadioLocation', currentRadio.macAddress, radioNameInput.value, (error, result) => {
            if (error)
                console.error(error);
        });
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
        let currentBeacon;
        let currentRadio;
        let radioConfig;
        if (templateInstance.showConfirmDeleteBeaconMenu.curValue)
            currentBeacon = Template.instance().currentBeacon.curValue;
        else {
            currentRadio = Template.instance().currentRadio.curValue;
            radioConfig = radiodb.findOne({macAddress: currentRadio.macAddress}).config;
            radioConfig.refreshTime = refreshTimeInput.value;
            radioConfig.measuredPower = measuredPowerInput.value;
            radioConfig.environmentalFactor = environmentalFactorInput.value;
            radioConfig.distanceChangeToTransmit = distanceChangeToTransmitInput.value;
        }
        templateInstance.showBeaconMenu.set(false);
        templateInstance.showRadioMenu.set(false);
        if (templateInstance.showConfirmApplyAllMenu.curValue) {
            for (radio of radiodb.find({}).fetch()) {
                Meteor.call('updateRadioConfig', radio.macAddress, radioConfig, (error, result) => {
                    if (error)
                        console.error(error);
                });
            }
        }
        else if (templateInstance.showConfirmRestartMenu.curValue) {
            radioConfig.restart = true;
            Meteor.call('updateRadioConfig', currentRadio.macAddress, radioConfig, (error, result) => {
                if (error)
                    console.error(error);
            });
        }
        else if (templateInstance.showConfirmDeleteBeaconMenu.curValue) {
            Meteor.call('deleteBeacon', currentBeacon.macAddress, (error, result) => {
                if (error)
                    console.error(error);
            });
        }
        else if (templateInstance.showConfirmDeleteRadioMenu.curValue) {
            Meteor.call('deleteRadio', currentRadio.macAddress, (error, result) => {
                if (error)
                    console.error(error);
            });
        }
        templateInstance.showConfirmApplyAllMenu.set(false);
        templateInstance.showConfirmRestartMenu.set(false);
        templateInstance.showConfirmDeleteBeaconMenu.set(false);
        templateInstance.showConfirmDeleteRadioMenu.set(false);
    },

    "click #addButton": (event, templateInstance) => {
        if (templateInstance.showAddBeaconMenu.curValue) {
            Meteor.call('addBeacon', newNameInput.value, newMacAddressInput.value, (error, result) => {
                if (error)
                    console.error(error);
            });
        }
        else if (templateInstance.showAddRadioMenu.curValue) {
            Meteor.call('addRadio', newNameInput.value, newMacAddressInput.value, (error, result) => {
                if (error)
                    console.error(error);
            });
        }
        templateInstance.showAddBeaconMenu.set(false);
        templateInstance.showAddRadioMenu.set(false);
    },

    "click #deleteBeaconButton": (event, templateInstance) => {
        templateInstance.showConfirmDeleteBeaconMenu.set(true);
    },

    "click #deleteRadioButton": (event, templateInstance) => {
        templateInstance.showConfirmDeleteRadioMenu.set(true);
    }
});