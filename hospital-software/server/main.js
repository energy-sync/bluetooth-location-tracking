import { Meteor } from 'meteor/meteor';
import '../lib/database.js';
import { patientInformationdb } from "../lib/database"
import { get } from 'jquery';
import axios from 'axios'

Meteor.startup(() => {
  // code to run on server at startup
  patientInformationdb.remove({});

  for (let i = 0; i < 50; i++) {
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
      }

    });
  }
});



Meteor.methods({
  clearRecords: () => {
    patientInformationdb.remove({});
  },

  //a way to assign patients beacons
  assignDevices(patientID){
    //http get request to device backend to recieve all information on devices
    axios.get('http://localhost:3002/getBLEs',{headders:{
      Accept:'application/json',
      'Accept-Endcoing':'identity'}
    })
    .then((response)=>{
        //patientInformationdb.update({patientID:patientID}, {$set:{macAddress:response.macAddress}})
        console.log(response.data)
    })
    .catch(function (error){
      console.log(error)
    })
  }
})


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

//fetch method to add patientID to device db
