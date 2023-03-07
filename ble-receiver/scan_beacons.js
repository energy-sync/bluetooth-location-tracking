const fs = require("fs");
const BeaconScanner = require('node-beacon-scanner');
const axios = require("axios");
const dotenv = require("dotenv");
const getMAC = require("getmac").default;

const scanner = new BeaconScanner();
let config;

if (!fs.existsSync("config.json")) {
    config = {
        refreshTime: 1,
        measuredPower: -59,
        environmentalFactor: 3,
        distanceChangeToTransmit: 3,
        controllerUrl: "http://localhost:3002",
        beacons: [],
        radios: []
    };
    saveConfig();
}
else config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
dotenv.config();

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
let scanTimeout = function() {
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
            let distance = Math.round(Math.pow(10, (config.measuredPower - avgRssi) / (10 * config.environmentalFactor)));
            let oldDistance = previousDistances[device] ? previousDistances[device] : -config.distanceChangeToTransmit;
            let movedEnough = Math.abs(distance - oldDistance) >= config.distanceChangeToTransmit
            if (movedEnough)
                previousDistances[device] = distance;

            console.log(`Signal strength: ${avgRssi}\nDistance: ${distance}\nOld distance: ${oldDistance}\n`);
            if (distance && movedEnough) {
                //send update to server
                axios.post(`${config.controllerUrl}/location`, {
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
    setTimeout(scanTimeout, 1000 * config.refreshTime);
}
setTimeout(scanTimeout, 1000 * config.refreshTime);

//fetching config.json from controller server and updating local copy if changed
setInterval(() => {
    console.log("Checking for config update");
    axios.post(`${config.controllerUrl}/config`, {macAddress: getMAC()})
    .then(response => {
        if (JSON.stringify(config) !== JSON.stringify(response.data)) {
            config = response.data;
            saveConfig();
            console.log("Config updated");
        }
    });
}, 5000);

function saveConfig() {
    fs.writeFileSync("config.json", JSON.stringify(config, null, 4));
    fs.chmodSync("config.json", "0777");
}