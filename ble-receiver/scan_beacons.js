const fs = require("fs");
const BeaconScanner = require('node-beacon-scanner');
const axios = require("axios");
const dotenv = require("dotenv");
const getMAC = require("getmac").default;

const scanner = new BeaconScanner();

if (!fs.statSync("config.json")) {
    fs.writeFileSync("config.json", JSON.stringify({
        refreshTime: 1,
        measuredPower: -59,
        environmentalFactor: 3,
        distanceChangeToTransmit: 3,
        controllerUrl: "http://localhost:3002",
        beacons: [],
        radios: []
    }));
}
const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
dotenv.config();

//environment variables
const REFRESH_TIME = config.refreshTime;
const MEASURED_POWER = config.measuredPower;
const ENVIRONMENTAL_FACTOR = config.environmentalFactor;
const DISTANCE_TO_TRANSMIT = config.distanceChangeToTransmit;
const CONTROLLER_URL = config.controllerUrl;

let devices = {};
for (device of config.beacons)
    devices[device.macAddress] = device.beaconID;
let detectedDevices = {};
let previousDistances = {};

//scan for BLE signals
scanner.onadvertisement = ad => {
    if (detectedDevices[ad.address]) {
        detectedDevices[ad.address].push(ad.rssi);
        if (detectedDevices[ad.address].length > 10)
            detectedDevices[ad.address].splice(0, 1);
    }
    else detectedDevices[ad.address] = [];
};

scanner.startScan().then(() => {
	console.log('Scanning for devices');
}).catch(error => {
	console.error(error);
});

//scanning for BLE beacons and sending updates to controller server
setInterval(() => {
    console.log("DETECTED DEVICES:\n=================\n");
    for (device in detectedDevices) {
        if (devices[device]) {
            console.log(`Detected device: ${devices[device]}`);

            //get average signal strength from up to last 10 ticks
            let rssiSum = 0;
            for (rssi of detectedDevices[device])
                rssiSum += rssi;
            let avgRssi = rssiSum / detectedDevices[device].length;

            //get distance and check if the beacon moved enough to send an update to the server
            let distance = Math.round(Math.pow(10, (MEASURED_POWER - avgRssi) / (10 * ENVIRONMENTAL_FACTOR)));
            let oldDistance = previousDistances[device] ? previousDistances[device] : -DISTANCE_TO_TRANSMIT;
            let movedEnough = Math.abs(distance - oldDistance) >= DISTANCE_TO_TRANSMIT
            if (movedEnough)
                previousDistances[device] = distance;

            console.log(`Signal strength: ${avgRssi}\nDistance: ${distance}\nOld distance: ${oldDistance}\n`);
            if (distance && movedEnough) {
                //send update to server
                axios.post(`${CONTROLLER_URL}/location`, {
                    beaconMacAddress: device,
                    radioMacAddress: getMAC(),
                    distance: distance
                })
                .catch(error => {
                    console.error(error);
                });
            }
        }
    }
}, 1000 * REFRESH_TIME);

//fetching config.json from controller server and updating local copy if changed
setInterval(() => {
    console.log("Checking for config update");
    axios.get(`${CONTROLLER_URL}/config`)
    .then(response => {
        console.log(response);
        let configChanged = (config, response)=>{
            keys1 = Object.keys(config);
            keys2 = Object.keys(response);
            return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);
        }
        console.log(`Config changed: ${configChanged}`);
    });
}, 5000);