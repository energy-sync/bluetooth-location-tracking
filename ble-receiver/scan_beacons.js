const fs = require("fs");
const BeaconScanner = require('node-beacon-scanner');

const scanner = new BeaconScanner();
const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

let devices = {};
for (device of config)
    devices[device.macAddress] = device.deviceID;

let detectedDevices = [];

scanner.onadvertisement = ad => {
    detectedDevices = [];
	if (devices[ad.address])
        detectedDevices.push(devices[ad.address]);
	console.log(JSON.stringify(ad, null, 4));
};

scanner.startScan().then(() => {
	console.log('Scanning for devices');
}).catch(error => {
	console.error(error);
});

setInterval(() => {
    console.clear();
    console.log("DETECTED DEVICES:\n=================\n");
    for (device of detectedDevices)
        console.log(device);
}, 1000);