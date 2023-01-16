const fs = require("fs");
const BeaconScanner = require('node-beacon-scanner');
const axios = require("axios");
const dotenv = require("dotenv");

const scanner = new BeaconScanner();
const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
dotenv.config();

//environment variables
const REFRESH_TIME = process.env.REFRESH_TIME;
const MEASURED_POWER = process.env.MEASURED_POWER;
const ENVIRONMENTAL_FACTOR = process.env.ENVIRONMENTAL_FACTOR;
const DISTANCE_TO_TRANSMIT = process.env.DISTANCE_TO_TRANSMIT;
const POST_URL = process.env.POST_URL;

let devices = {};
for (device of config)
    devices[device.macAddress] = device.deviceID;
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

setInterval(() => {
    console.log("DETECTED DEVICES:\n=================\n");
    for (device in detectedDevices) {
        if (devices[device])
            console.log(`Detected device: ${devices[device]}`);
        else console.log(`Detected unknown device: ${device}`);

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
            axios.put(POST_URL, {
                macAddress: device,
                distance: distance
            })
            .catch(error => {
                console.error(error);
            });
        }
    }
}, 1000 * REFRESH_TIME);