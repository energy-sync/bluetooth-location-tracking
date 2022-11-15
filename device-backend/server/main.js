import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import { deviceInformationdb } from "../lib/database.js";

/*WebApp.connectHandlers.use("/", (req, res, next) => {
    console.log(req);
    res.writeHead(200).end("Bruh");
});*/

WebApp.connectHandlers.use("/", (req, res) => {
    console.log(req);
    res.writeHead(200);
    //let data = JSON.parse(req.body);
    //console.log(data);
    /*deviceInformationdb.insert({
        "patientID": data[0],
        "deviceID": data[1]
    });*/
    res.end();
});