# Location-Based Bluetooth System

This project was made for our Purdue University Fort Wayne Senior Capstone project. The team members include Dawson Vilamaa, Ive Brigimana, Trevor Pickelheimer, Brandon Pruitt, and Michael Trotter. This is sponsored by Medical Informatics Engineering and advised by Dr. Beomjin Kim.

## Abstract

Currently, medical professionals must manually update their records of where patients are located within the hospital. The proposed solution involves a Bluetooth device, called a beacon, carried by the patient and multiple Bluetooth receivers placed around the building. The carried beacons will interact with the hospital’s database and automatically update their records of where the patient is located within the hospital. The system would then allow medical practitioners to quickly view the relevant information for the patient depending on which department they are in. This system will decrease the chance of user error in entering the patient’s location and make record keeping easier.

## System Design

This project was created using the Meteor full stack JavaScript framework that has built-in MongoDB for the database. The equipment for this project consists of the Bluetooth beacons and computer boards acting as receivers. These receivers are placed around the building and assigned locations, and they send an update via HTTP requests to the controller server which stores the location for each beacon. The controller server then pushes location updates to the hospital software to use for patient records. For testing, we set up computer boards in multiple rooms and moved the beacons around to make sure the signal was being picked up correctly and that the database was being properly updated. To automate testing, we used a script that simulated the random movement of beacons to different locations.

## Use Case and Limitations

This system can determine the distance of beacons from receivers within 5-10 meters. This allows for knowing the room a beacon is in, but it is not accurate enough to have multiple receivers in one room since the signal ranges overlap. However, we implemented options that can be configured for each computer board receiver to fine tune signal detection to help with this.

---

# Usage

There are three components in the system: BLE receivers, the device coordinator, and the client software.

## BLE Receivers

A BLE receiver can be any computer that has Bluetooth and local internet capabilities. During development, the library we used for detecting BLE signals stopped working on Windows, so it is recommended to use a device with a Unix-based OS. Receivers can only determine the distance of a BLE beacon with an accuracy of 5-10 meters, so if they are placed too close to each other, then the system may give an incorrect location for a beacon. It is recommended to use [pm2](https://www.npmjs.com/package/pm2) to run the program on the receiver since it is used for remote restarts.

### Configuration
Initially, the `controllerUrl` field in `ble-receiver/config.json` will need to be edited to match the IP for the device controller server in order to send beacon location updates and fetch config updates. Ex: `http://127.0.0.1:3002`. Other settings can be changed manually or through the device controller server web page.

### Starting

To run the program for detecting BLE signals, run the following commands (Unix):
```
cd ble-receiver
npm i
pm2 start scan_beacons.js --name BLE
```

## Device Coordinator

The device coordinator receives beacon location updates from the BLE receivers and stores their current and past locations. It also hosts a web page to manage beacons and BLE receivers.

**Note:** Meteor does not support ARM CPU architecture.

### Starting
If the global npm package for Meteor is not installed, run the following command:
```
npm i -g meteor
```

To run the program for receiving BLE beacon location updates and forwarding it to client software, run the following commands:
```
cd device-backend
npm install
meteor npm install
meteor --port 3002
```

**Note:** The default Meteor ports used are 3000 and 3001. You can specify a port with the `--port` flag, but keep in mind that it will use an additional port for the database.

### Configuration
Initially, the `clientSoftwareUrl` field in `device-backend/config.json` will need to be edited to match the IP for the client software that will receive location updates. Ex: `http://127.0.0.1:3000`. Navigating to the device controller server's IP in a browser will open the device management page. Changing settings for the BLE receivers will send out configuration updates to the corresponding devices.

## Client Software
The client software can be any software that includes functionality to receive HTTP requests from the device coordinator server with location updates. We created our own web app with mock patient data to simulate a hospital environment. Our software includes patient pages, analytics of the time patients spend at each department, and a visualization of the beacons at their current locations.

### Starting
If the global npm package for Meteor is not installed, run the following command:
```
npm i -g meteor
```

To run the program for receiving beacon location updates from the device coordinator server, run the following commands:
```
cd hospital-software
npm install
meteor npm install
meteor
```

**Note:** The default Meteor ports used are 3000 and 3001. You can specify a port with the `--port` flag, but keep in mind that it will use an additional port for the database.