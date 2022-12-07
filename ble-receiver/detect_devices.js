const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();
import axiox from "axios";

let devices = {};
let oldDevices;

scanner.onadvertisement = ad => {
	if (!devices[ad.address]) {
		oldDevices = devices;
		devices[ad.address] = ad.rssi;
	}
	//console.log(JSON.stringify(ad, null, 4));
};

scanner.startScan().then(() => {
	console.log('Started to scan');
}).catch(error => {
	console.error(error);
});

setInterval(() => {
	if (Object.keys(devices).length > 0) {
		console.log("\nDEVICES\n=======\n");
		console.log(devices);

		if (oldDevices) {
			for (mac in devices) {
				if (oldDevices[mac] && oldDevices[mac] !== devices[mac]) {
					
				}
			}
		}
		oldDevices = Object.assign(oldDevices, devices);
	}
}, 1000);