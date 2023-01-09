const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const POST_URL = "http://localhost:3000/location";
const NUM_DEVICES = 5;
const LOCATIONS = ["receptionist", "practicioner", "lab", "dermatology"];

let devices = [];
for (let i = 0; i < NUM_DEVICES; i++) {
    devices.push({
        location: getRandomLocation(),
        macAddress: randomMacAddress(),
        distance: random(10)
    });
}
console.log(devices);

function movePatient() {
    let index = random(devices.length - 1);
    devices[index].location = getRandomLocation();
    devices[index].distance = random(10);
    let device = devices[index];
    console.log(`${device.macAddress} is now at ${device.location}`);
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

function randomMacAddress() {
    var macAddress = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
        return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
    });
    return macAddress;
}