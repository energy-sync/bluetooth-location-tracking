const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

const app = express();
app.use(bodyParser.json());

let devices = {};
for (device of config)
    devices[device.macAddress] = device.beaconID;

app.post("/location", (req, res) => {
    console.log("received");
    let device = req.body;
    //if (devices[device.macAddress])
        //console.log(`Device "${devices[device.macAddress]}" is ${device.distance} meters away.`);
    console.log(`Device "${device.beaconID}" is ${device.distance} meters away from ${device.location}.`);
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end();
});

app.listen(3002);