const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
dotenv.config();
const POST_URL = `${config.controllerUrl}/testLocation`;
const LOCATIONS = ["Receptionist", "General Practitioner", "Lab", "Dermatology"];

let devices = [];
for (device of config.beacons) {
    devices.push({
        beaconID: device.beaconID,
        location: getRandomLocation(),
        macAddress: device.macAddress,
        distance: 1 //random(10)
    });
}
console.log(devices);

function movePatient() {
    let index = 1; //random(devices.length);
    console.log(devices[index].location);
    devices[index].location = getRandomLocation();
    devices[index].distance = 1 //random(10);
    let device = devices[index];
    console.log(`${device.beaconID} is now at ${device.location}`);
    axios.post(POST_URL, devices[index])
        .then(response => {
            setTimeout(() => {
                movePatient();
            }, random(30000));
        })
        .catch(error => {
            console.error(error);
        });
}

movePatient();

function getRandomLocation() {
    return LOCATIONS[random(LOCATIONS.length)];
}

function random(max) {
    return Math.floor(Math.random() * max);
}