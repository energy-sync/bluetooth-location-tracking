
import { Meteor } from 'meteor/meteor';
import '../lib/database.js';
import { patientInformationdb } from "../lib/database"
import { dummyBeaconDB } from '../lib/database';
import { WebApp } from 'meteor/webapp';

let arrayofdevices = [];

Meteor.startup(() => {
  // code to run on server at startup
  patientInformationdb.remove({});
  dummyBeaconDB.remove({});
  generateRealPatients(6);
  generateDummyPatients(50);
  generateRandomBeaconData(100);
});

//gets beacons from http request
WebApp.connectHandlers.use("/getBLEs", function (req, res, next) {
  res.writeHead(200, { "Content-Type": "application/json" })
  req.on('data', Meteor.bindEnvironment((data) => {
    const body = JSON.parse(data);
    //console.log(body)
    storeInfo(body);


  }));
  res.end(Meteor.release)
})

//update location from http request
WebApp.connectHandlers.use("/update", function (req, res, next) {
  res.writeHead(200, { "Content-Type": "application/json" })
  req.on('data', Meteor.bindEnvironment((data) => {
    const body = JSON.parse(data);
    console.log(body, body.beaconID, body.location)
    updateLocation(body.beaconID, body.location)
  }));
  res.end(Meteor.release)
})

Meteor.methods({
  clearRecords: () => {
    patientInformationdb.remove({});
  },
  //return array of the beacon ids
  getDevices: () => {
    //printArray(arrayofdevices)
    return arrayofdevices.map(ids => ids.beaconID);
  },

  //get number of patients in department
  getPatientNum: (department) => {
    let totalNumOfPatients = dummyBeaconDB.find({ department: department }).count()
    return totalNumOfPatients;
  },

  //get busy time of day in department
  getBusyTime: (department) => {
    let timeOfDayArray = ["0:00","1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00",
    "11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]
    let departmentArray = dummyBeaconDB.find({department:department}).fetch()
    let timesArray = departmentArray.map(times => times.time)
    for(let i =0; i < timesOfDayArray.length; i++){
        if(timesArray[i] > timeOfDayArray[i] && timesArray[i] < timeOfDayArray[i+1]){

        }
      }
  },

  //get the busiest day of each department
  getBusiestDay: (department)=>{
      let sunday = 0;
      let monday = 0;
      let tuesday = 0;
      let wednesday = 0;
      let thursday = 0;
      let friday = 0;
      let saturday = 0;
      let busiestDay;
      let dayArray = ["Sunday", "Monday", "Tuesday",
      "Wednesday", "Thursday", "Friday", "Saturday"]
      let daysWithPatients = []
      for(let i=0;i<dayArray.length;i++){
          if(dayArray[i] === 'Sunday'){
            sunday = dummyBeaconDB.find({department:department, day:dayArray[i]}).count()
            daysWithPatients.push(sunday)
          }else if(dayArray[i] === 'Monday'){
            monday = dummyBeaconDB.find({department:department, day:dayArray[i]}).count()
            daysWithPatients.push(monday)
          }else if(dayArray[i] === 'Tuesday'){
            tuesday = dummyBeaconDB.find({department:department, day:dayArray[i]}).count()
            daysWithPatients.push(tuesday)
          }else if(dayArray[i] === 'Wednesday'){
            wednesday = dummyBeaconDB.find({department:department, day:dayArray[i]}).count()
            daysWithPatients.push(wednesday)
          }else if(dayArray[i] === 'Thursday'){
            thursday = dummyBeaconDB.find({department:department, day:dayArray[i]}).count()
            daysWithPatients.push(thursday)
          }else if(dayArray[i] === 'Friday'){
            friday = dummyBeaconDB.find({department:department, day:dayArray[i]}).count()
            daysWithPatients.push(friday)
          }else if(dayArray[i] === 'Saturday'){
            saturday = dummyBeaconDB.find({department:department, day:dayArray[i]}).count()
            daysWithPatients.push(saturday)
          }
      }
      let largest = Math.max.apply(Math, daysWithPatients);
      
      if(largest === sunday){
        busiestDay = 'Sunday'
      }else if(largest === monday){
        busiestDay = 'Monday'
      }else if(largest === tuesday){
        busiestDay = 'Tuesday'
      }else if(largest === wednesday){
        busiestDay = 'Wednesday'
      }else if(largest === thursday){
        busiestDay = 'Thursday'
      }else if(largest === friday){
        busiestDay = 'Friday'
      }else if(largest === saturday){
        busiestDay = 'Saturday'
      }

      return busiestDay;
  }
})

function printArray(arr) {
  console.log(arr)
}
//functions for randomizing patient db


//array for first and last names
const firstNames = ["Michael", "Christopher", "Jessica", "Matthew", "Ashley", "Jennifer", "Joshua", "Amanda", "Daniel", "David", "James", "Robert", "John",
  "Joseph", "Andrew", "Ryan", "Brandon", "Jason", "Justin", "Sarah", "William", "Jonathan", "Stephanie", "Brian", "Nicole", "Nicholas", "Anthony", "Heather",
  "Eric", "Elizabeth", "Adam", "Megan", "Melissa", "Kevin", "Steven", "Thomas", "Timothy", "Christina", "Kyle", "Rachel", "Laura", "Lauren", "Amber", "Brittany",
  "Danielle", "Richard", "Kimberly", "Jeffrey", "Amy", "Crystal", "Michelle", "Tiffany", "Jeremy", "Benjamin", "Mark", "Emily", "Aaron"];

const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
  "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis",
  "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera",
  "Campbell", "Mitchell", "Carter", "Roberts"];


//random number
const getRandomNumber = (max) => Math.floor(Math.random() * max);


//getting random names
function getRandomName(arr1, arr2) {

  let firstName = arr1[getRandomNumber(arr1.length)];
  let lastName = arr2[getRandomNumber(arr2.length)];

  let name = firstName + " " + lastName;

  return name;
}

//generate random DoB
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString();
}

//generate age
function ageCalculator(DOB) {
  var dob = new Date(DOB);

  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();

  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);

  //extract year from date    
  var year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  var age = Math.abs(year - 1970);

  //display the calculated age
  return age;
}

//generate random street address
function generateStreetAddress() {
  //generate random num for address between 1000 and 9000
  var num = Math.floor(1000 + Math.random() * 9000);

  //list of street names to pick from
  var streetNames = ["Hartford Road", "Devonshire Drive", "Buckingham Drive", "Cemetery Road", "Fulton Street", "Deerfield Drive", "Route 7", "Park Drive",
    "Williams Street", "Hickory Street", "10th Street", "Brook Lane", "Bayberry Drive", "Canterbury Road", "Maple Lane", "Charles Street", "Court Street",
    "Country Lane", "Laurel Street", "Eagle Road", "Hilltop Road", "Broadway", "Bay Street", "Cedar Court", "Canal Street", "Race Street", "Fairway Drive",
    "Shady Lane", "Hamilton Street", "Mill Street", "Cooper Street", "Lakeview Drive", "Cedar Avenue", "Cleveland Avenue", "3rd Street North", "Orchard Street",
    "Howard Street", "Lilac Lane", "Creek Road", "Eagle Street", "Hillside Drive", "Liberty Street", "Lafayette Avenue", "Lake Street", "Front Street South",
    "7th Street", "Garfield Avenue", "Sycamore Drive", "New Street", "Clinton Street"]

  //list of fort wayne zip codes
  var zipCodes = ["46774", "46802", "46803", "46804", "46805", "46806", "46807",
    "46808", "46809", "46814", "46815", "46816", "46818", "46819", "46825", "46835", "46845"];
  //gets random street name
  var streetName = streetNames[getRandomNumber(streetNames.length)];

  var zip = zipCodes[getRandomNumber(zipCodes.length)];

  //assigns address in num street name city state, and random zipcode
  var address = num + " " + streetName + " Fort Wayne, IN " + " " + zip;

  //return address
  return address;
}

//prescriptions
function getPrescriptions() {
  var numOfPrepscriptions = Math.floor(Math.random() * 10);

  var prescriptions = ["Hydrocodone", "Metformin", "Losartan", "Antibiotics", "Albuterol",
    "Antihistamines", "Gabapentin", "Omeprazole", "Levothyroxine", "Atorvastatin"];

  var actualPrescriptions = [];
  //loop to determine what prescription they have if any
  for (let i = 0; i < numOfPrepscriptions; i++) {
    let drug = prescriptions[getRandomNumber(prescriptions.length)];
    if (actualPrescriptions.includes(drug)) {
      continue
    } else {
      actualPrescriptions.push(drug);
    }
  }

  return actualPrescriptions;
}

//generate random true false
function getBoolean() {
  var random_boolean_value = Math.random() < .5;
  return random_boolean_value;
}

//function to store body sent from devicedb into arrayofdevices
function storeInfo(body) {
  //reset array to stop duplicate beaconIDs being stored
  arrayofdevices.length = 0;
  for (let i = 0; i < body.length; i++) {
    //arrayofdevices.push(body[i])
    arrayofdevices.push(body[i])
  }

  // printArray(arrayofdevices)
}

//function to update location
function updateLocation(beaconID, location) {
  patientInformationdb.update({ beaconID: beaconID }, { $set: { location: location, timeOfUpdate: getCurrentTime(), waitTime: waitTime() } })
}

//function to get current time
function getCurrentTime() {
  return Date(Date.now().toLocaleString())
}

//generate random locations for dummy data
function generateRandomLocation() {
  let locationArray = ['Receptionist', 'General Practitioner', 'Lab', 'Dermatology']
  let location = locationArray[getRandomNumber(locationArray.length)]
  return location;
}

function generateDummyPatients(numberToGenerate) {
  for (let i = 0; i < numberToGenerate; i++) {
    var patientID = "XXXXXXX".replace(/X/g, function () {
      return "0123456789ABCDEF".charAt((Math.random() * 16))
    });

    let beaconID = "XXXXXXX".replace(/X/g, function () {
      return "0123456789ABCDEF".charAt((Math.random() * 16))
    });

    var DOB = randomDate(new Date(1970, 0, 1), new Date());

    var age = ageCalculator(DOB);


    var weight = "1XX lbs".replace(/X/g, function () {
      return "123456789".charAt((Math.random() * 9))
    });

    var height = "5ft Xin".replace(/X/g, function () {
      return "1234567891011".charAt((Math.random() * 9))
    });

    var bloodPressure = "1XX/XX mmHg".replace(/X/g, function () {
      return "123456789".charAt((Math.random() * 9))
    });

    var heartRate = "XX BPM".replace(/X/g, function () {
      return "123456789".charAt((Math.random() * 9))
    });

    var RBC = "X.XX M/UL".replace(/X/g, function () {
      return "123456789".charAt((Math.random() * 9))
    });

    var bloodGlucose = "XXX mg/dl".replace(/X/g, function () {
      return "123".charAt((Math.random() * 3))
    });

    var hemoglobin = "1X.X g/dl".replace(/X/g, function () {
      return "0123456789".charAt((Math.random() * 10))
    });

    var hematocrit = "1X.X %".replace(/X/g, function () {
      return "123456789".charAt((Math.random() * 9))
    });

    var MCV = "XX fL".replace(/X/g, function () {
      return "789".charAt((Math.random() * 3))
    });

    var plateletCount = "XXX K/dl".replace(/X/g, function () {
      return "0123456789".charAt((Math.random() * 10))
    });

    var WBC = "XX.X K/uL".replace(/X/g, function () {
      return "0123456789".charAt((Math.random() * 10))
    });

    var sodium = "1XX mEq/L".replace(/X/g, function () {
      return "0123456789".charAt((Math.random() * 10))
    });

    var potassium = "X.X mEq/L".replace(/X/g, function () {
      return "0123456789".charAt((Math.random() * 10))
    });

    var macAddress = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
      return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))

    });
    var patientName = getRandomName(firstNames, lastNames);
    var address = generateStreetAddress();
    var physicianName = "Dr. " + getRandomName(firstNames, lastNames);
    var prescriptions = getPrescriptions();


    patientInformationdb.insert({

      "macAddress": macAddress,
      "patientInformation": {
        "patientName": patientName,
        "address": address,
        "patientID": patientID,
        "DOB": DOB,
        "age": age,
        "physicianName": physicianName
      },
      "vitals": {
        "bloodPressure": bloodPressure,
        "heartRate": heartRate,
        "height": height,
        "weight": weight
      },
      "labWork": {
        "RBC": RBC,
        "bloodGlucose": bloodGlucose,
        "hemoglobin": hemoglobin,
        "hematocrit": hematocrit,
        "MCV": MCV,
        "WBC": WBC,
        "sodium": sodium,
        "potassium": potassium,
        "plateletCount": plateletCount
      },
      "prescriptions": prescriptions,
      "dermatology": {
        "acne": getBoolean(),
        "acneScars": getBoolean(),
        "eczemaAndDermatitis": getBoolean(),
        "hairLoss": getBoolean(),
        "nailProblems": getBoolean(),
        "warts": getBoolean(),
        "fungalInfections": getBoolean(),
        "skinCancer": getBoolean(),
        "shingles": getBoolean(),
        "rosacea": getBoolean(),
        "psoriasis": getBoolean(),
        "vitiligo": getBoolean()
      },
      "location": generateRandomLocation(),
      'beaconID': beaconID,
      'waitTime': generateWaitTime() + ' minute(s)'

    });

  }
}
function generateRealPatients(numberToGenerate) {
  for (let i = 0; i < numberToGenerate; i++) {
    var patientID = "XXXXXXX".replace(/X/g, function () {
      return "0123456789ABCDEF".charAt((Math.random() * 16))
    });

    var DOB = randomDate(new Date(1970, 0, 1), new Date());

    var age = ageCalculator(DOB);


    var weight = "1XX lbs".replace(/X/g, function () {
      return "123456789".charAt((Math.random() * 9))
    });

    var height = "5ft Xin".replace(/X/g, function () {
      return "1234567891011".charAt((Math.random() * 9))
    });

    var bloodPressure = "1XX/XX mmHg".replace(/X/g, function () {
      return "123456789".charAt((Math.random() * 9))
    });

    var heartRate = "XX BPM".replace(/X/g, function () {
      return "123456789".charAt((Math.random() * 9))
    });

    var RBC = "X.XX M/UL".replace(/X/g, function () {
      return "123456789".charAt((Math.random() * 9))
    });

    var bloodGlucose = "XXX mg/dl".replace(/X/g, function () {
      return "123".charAt((Math.random() * 3))
    });

    var hemoglobin = "1X.X g/dl".replace(/X/g, function () {
      return "0123456789".charAt((Math.random() * 10))
    });

    var hematocrit = "1X.X %".replace(/X/g, function () {
      return "123456789".charAt((Math.random() * 9))
    });

    var MCV = "XX fL".replace(/X/g, function () {
      return "789".charAt((Math.random() * 3))
    });

    var plateletCount = "XXX K/dl".replace(/X/g, function () {
      return "0123456789".charAt((Math.random() * 10))
    });

    var WBC = "XX.X K/uL".replace(/X/g, function () {
      return "0123456789".charAt((Math.random() * 10))
    });

    var sodium = "1XX mEq/L".replace(/X/g, function () {
      return "0123456789".charAt((Math.random() * 10))
    });

    var potassium = "X.X mEq/L".replace(/X/g, function () {
      return "0123456789".charAt((Math.random() * 10))
    });

    var macAddress = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
      return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))

    });
    var patientName = getRandomName(firstNames, lastNames);
    var address = generateStreetAddress();
    var physicianName = "Dr. " + getRandomName(firstNames, lastNames);
    var prescriptions = getPrescriptions();


    patientInformationdb.insert({

      "macAddress": macAddress,
      "patientInformation": {
        "patientName": patientName,
        "address": address,
        "patientID": patientID,
        "DOB": DOB,
        "age": age,
        "physicianName": physicianName
      },
      "vitals": {
        "bloodPressure": bloodPressure,
        "heartRate": heartRate,
        "height": height,
        "weight": weight
      },
      "labWork": {
        "RBC": RBC,
        "bloodGlucose": bloodGlucose,
        "hemoglobin": hemoglobin,
        "hematocrit": hematocrit,
        "MCV": MCV,
        "WBC": WBC,
        "sodium": sodium,
        "potassium": potassium,
        "plateletCount": plateletCount
      },
      "prescriptions": prescriptions,
      "dermatology": {
        "acne": getBoolean(),
        "acneScars": getBoolean(),
        "eczemaAndDermatitis": getBoolean(),
        "hairLoss": getBoolean(),
        "nailProblems": getBoolean(),
        "warts": getBoolean(),
        "fungalInfections": getBoolean(),
        "skinCancer": getBoolean(),
        "shingles": getBoolean(),
        "rosacea": getBoolean(),
        "psoriasis": getBoolean(),
        "vitiligo": getBoolean()
      },
      "location": 'Receptionist'

    });

  }
}

function generateWaitTime() {
  let waitTime = getRandomNumber(20);
  if (waitTime === 0) {
    waitTime++;
  }
  return waitTime;
}

function generateRandomBeaconData(numberToGenerate) {
  for (let i = 0; i < numberToGenerate; i++) {
    dummyBeaconDB.insert({
      'beaconNumber': i,
      'department': getDummyDepartment(),
      'time': getRandomHourMin(),
      'day': getRandomDayOfWeek()
    })

  }
}

function getDummyDepartment() {
  let departmentArray = ["Surgery", "Gynaecology", "Paediatrics", "Eye", "ENT", "Dental", "Orthopaedics", "Neurology", "Cardiology",
    "Psychiatry", "Skin", "Plastic Surgery", "Rehabilitation", "Pharmacy", "Radiology"];
  let department = departmentArray[(getRandomNumber(departmentArray.length))];
  return department;
}

function getRandomHourMin() {
  let hour = getRandomNumber(24);
  let minute = getRandomNumber(59);

  if (minute < 10) {
    minute = '0' + minute;
  }
  let timeString = hour + ':' + minute;
  return timeString;
}

function getRandomDayOfWeek() {
  let dayArray = ["Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = dayArray[getRandomNumber(dayArray.length)]

  return day;
}

function waitTime(){
  let time = moment.updateLocale('en',{
    relativeTime: {
      future: "in %s",
      past: "%s ",
      s: 'a second',
      ss: '%d seconds',
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
  }
  })
  let waitTime = moment().fromNow();
  console.log(waitTime)
  return waitTime
}