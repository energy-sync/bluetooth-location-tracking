const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();

let devices = {};
let oldDevices;

scanner.onadvertisement = ad => {
	if (!devices[ad.address]) {
		oldDevices = devices;
		devices[ad.address] = ad;
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
	}
}, 1000);