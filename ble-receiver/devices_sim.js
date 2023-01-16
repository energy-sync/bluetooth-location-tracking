const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

const POST_URL = "http://localhost:3002/testLocation";
const LOCATIONS = ["receptionist", "practicioner", "lab", "dermatology"];

let devices = [];
for (let i = 0; i < config.length; i++) {
    devices.push({
        beaconID: config[i].beaconID,
        location: getRandomLocation(),
        macAddress: config[i].macAddress,
        distance: random(10)
    });
}
console.log(devices);

function movePatient() {
    let index = random(devices.length - 1);
    devices[index].location = getRandomLocation();
    devices[index].distance = random(10);
    let device = devices[index];
    console.log(`${device.beaconID} is now at ${device.location}`);
    axios.post(POST_URL, devices[index])
    .then(response => {
        setTimeout(() => {
            movePatient();
        }, random(60000)); //0 to 60 seconds
    })
    .catch(error => {
        console.error(error);
    });
}

movePatient();

function getRandomLocation() {
    return LOCATIONS[random(LOCATIONS.length - 1)];
}

function random(max) {
    return Math.floor(Math.random() * max);
}