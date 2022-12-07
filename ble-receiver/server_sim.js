const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

const app = express();
app.use(bodyParser.json());

let devices = {};
for (device of config)
    devices[device.macAddress] = device.deviceID;

app.post("/location", (req, res) => {
    let device = req.body;
    if (devices[device.macAddress])
        console.log(`Device "${devices[device.macAddress]}" is ${device.distance} meters away.`);
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end();
});

app.listen(3000);