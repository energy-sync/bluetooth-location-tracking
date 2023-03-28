const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

const app = express();
app.use(bodyParser.json());

let beacons = {};
for (beacon of config.beacons)
    beacons[beacon.macAddress] = beacon.beaconID;

let radios = {};
for (radio of config.radios)
    radios[radio.macAddress] = radio.location;

app.post("/location", (req, res) => {
    console.log("received");
    let body = req.body;
    console.log(`Beacon "${beacons[body.beaconMacAddress]}" (${body.beaconMacAddress}) is ${body.distance} meters away from ${radios[body.radioMacAddress]} (${body.radioMacAddress}).`);
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end();
});

app.listen(3002);