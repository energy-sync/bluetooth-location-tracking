var require = meteorInstall({"lib":{"database.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// lib/database.js                                                                                     //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
module.export({
  patientInformationdb: () => patientInformationdb
});
const patientInformationdb = new Mongo.Collection('Patient Information');
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"main.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// server/main.js                                                                                      //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
module.link("../lib/database.js");
let patientInformationdb;
module.link("../lib/database", {
  patientInformationdb(v) {
    patientInformationdb = v;
  }

}, 1);
let get;
module.link("jquery", {
  get(v) {
    get = v;
  }

}, 2);
Meteor.startup(() => {
  // code to run on server at startup
  patientInformationdb.remove({});

  for (let i = 0; i < 50; i++) {
    var patientID = "XXXXXXX".replace(/X/g, function () {
      return "0123456789ABCDEF".charAt(Math.random() * 16);
    });
    var DOB = randomDate(new Date(1970, 0, 1), new Date());
    var age = ageCalculator(DOB);
    var weight = "1XX lbs".replace(/X/g, function () {
      return "123456789".charAt(Math.random() * 9);
    });
    var height = "5ft Xin".replace(/X/g, function () {
      return "1234567891011".charAt(Math.random() * 9);
    });
    var bloodPressure = "1XX/XX mmHg".replace(/X/g, function () {
      return "123456789".charAt(Math.random() * 9);
    });
    var heartRate = "XX BPM".replace(/X/g, function () {
      return "123456789".charAt(Math.random() * 9);
    });
    var RBC = "X.XX M/UL".replace(/X/g, function () {
      return "123456789".charAt(Math.random() * 9);
    });
    var bloodGlucose = "XXX mg/dl".replace(/X/g, function () {
      return "123".charAt(Math.random() * 3);
    });
    var hemoglobin = "1X.X g/dl".replace(/X/g, function () {
      return "0123456789".charAt(Math.random() * 10);
    });
    var hematocrit = "1X.X %".replace(/X/g, function () {
      return "123456789".charAt(Math.random() * 9);
    });
    var MCV = "XX fL".replace(/X/g, function () {
      return "789".charAt(Math.random() * 3);
    });
    var plateletCount = "XXX K/dl".replace(/X/g, function () {
      return "0123456789".charAt(Math.random() * 10);
    });
    var WBC = "XX.X K/uL".replace(/X/g, function () {
      return "0123456789".charAt(Math.random() * 10);
    });
    var sodium = "1XX mEq/L".replace(/X/g, function () {
      return "0123456789".charAt(Math.random() * 10);
    });
    var potassium = "X.X mEq/L".replace(/X/g, function () {
      return "0123456789".charAt(Math.random() * 10);
    });
    var macAddress = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
      return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
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
        "Blood Glucose Level": bloodGlucose,
        "Hemoglobin": hemoglobin,
        "Hematocrit": hematocrit,
        "MCV": MCV,
        "WBC": WBC,
        "Sodium": sodium,
        "Potassium": potassium,
        "Platelet Count": plateletCount
      },
      "prescriptions": prescriptions,
      "dermatology": {
        "acne": getBoolean(),
        "acne scars": getBoolean(),
        "eczema and dermatitis": getBoolean(),
        "hair loss": getBoolean(),
        "nail problems": getBoolean(),
        "warts": getBoolean(),
        "fungal infections": getBoolean(),
        "skin cancer": getBoolean(),
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
  }
}); //array for first and last names

const firstNames = ["Michael", "Christopher", "Jessica", "Matthew", "Ashley", "Jennifer", "Joshua", "Amanda", "Daniel", "David", "James", "Robert", "John", "Joseph", "Andrew", "Ryan", "Brandon", "Jason", "Justin", "Sarah", "William", "Jonathan", "Stephanie", "Brian", "Nicole", "Nicholas", "Anthony", "Heather", "Eric", "Elizabeth", "Adam", "Megan", "Melissa", "Kevin", "Steven", "Thomas", "Timothy", "Christina", "Kyle", "Rachel", "Laura", "Lauren", "Amber", "Brittany", "Danielle", "Richard", "Kimberly", "Jeffrey", "Amy", "Crystal", "Michelle", "Tiffany", "Jeremy", "Benjamin", "Mark", "Emily", "Aaron"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"]; //random number

const getRandomNumber = max => Math.floor(Math.random() * max); //getting random names


function getRandomName(arr1, arr2) {
  let firstName = arr1[getRandomNumber(arr1.length)];
  let lastName = arr2[getRandomNumber(arr2.length)];
  let name = firstName + " " + lastName;
  return name;
} //generate random DoB


function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString();
} //generate age


function ageCalculator(DOB) {
  var dob = new Date(DOB); //calculate month difference from current date in time

  var month_diff = Date.now() - dob.getTime(); //convert the calculated difference in date format

  var age_dt = new Date(month_diff); //extract year from date    

  var year = age_dt.getUTCFullYear(); //now calculate the age of the user

  var age = Math.abs(year - 1970); //display the calculated age

  return age;
} //generate random street address


function generateStreetAddress() {
  //generate random num for address between 1000 and 9000
  var num = Math.floor(1000 + Math.random() * 9000); //list of street names to pick from

  var streetNames = ["Hartford Road", "Devonshire Drive", "Buckingham Drive", "Cemetery Road", "Fulton Street", "Deerfield Drive", "Route 7", "Park Drive", "Williams Street", "Hickory Street", "10th Street", "Brook Lane", "Bayberry Drive", "Canterbury Road", "Maple Lane", "Charles Street", "Court Street", "Country Lane", "Laurel Street", "Eagle Road", "Hilltop Road", "Broadway", "Bay Street", "Cedar Court", "Canal Street", "Race Street", "Fairway Drive", "Shady Lane", "Hamilton Street", "Mill Street", "Cooper Street", "Lakeview Drive", "Cedar Avenue", "Cleveland Avenue", "3rd Street North", "Orchard Street", "Howard Street", "Lilac Lane", "Creek Road", "Eagle Street", "Hillside Drive", "Liberty Street", "Lafayette Avenue", "Lake Street", "Front Street South", "7th Street", "Garfield Avenue", "Sycamore Drive", "New Street", "Clinton Street"]; //list of fort wayne zip codes

  var zipCodes = ["46774", "46802", "46803", "46804", "46805", "46806", "46807", "46808", "46809", "46814", "46815", "46816", "46818", "46819", "46825", "46835", "46845"]; //gets random street name

  var streetName = streetNames[getRandomNumber(streetNames.length)];
  var zip = zipCodes[getRandomNumber(zipCodes.length)]; //assigns address in num street name city state, and random zipcode

  var address = num + " " + streetName + " Fort Wayne, IN " + " " + zip; //return address

  return address;
} //prescriptions


function getPrescriptions() {
  var numOfPrepscriptions = Math.floor(Math.random() * 10);
  var prescriptions = ["Hydrocodone", "Metformin", "Losartan", "Antibiotics", "Albuterol", "Antihistamines", "Gabapentin", "Omeprazole", "Levothyroxine", "Atorvastatin"];
  var actualPrescriptions = []; //loop to determine what prescription they have if any

  for (let i = 0; i < numOfPrepscriptions; i++) {
    let drug = prescriptions[getRandomNumber(prescriptions.length)];

    if (actualPrescriptions.includes(drug)) {
      continue;
    } else {
      actualPrescriptions.push(drug);
    }
  }

  return actualPrescriptions;
} //generate random true false


function getBoolean() {
  var random_boolean_value = Math.random() < .5;
  return random_boolean_value;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".ts"
  ]
});

var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvbGliL2RhdGFiYXNlLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJwYXRpZW50SW5mb3JtYXRpb25kYiIsIk1vbmdvIiwiQ29sbGVjdGlvbiIsIk1ldGVvciIsImxpbmsiLCJ2IiwiZ2V0Iiwic3RhcnR1cCIsInJlbW92ZSIsImkiLCJwYXRpZW50SUQiLCJyZXBsYWNlIiwiY2hhckF0IiwiTWF0aCIsInJhbmRvbSIsIkRPQiIsInJhbmRvbURhdGUiLCJEYXRlIiwiYWdlIiwiYWdlQ2FsY3VsYXRvciIsIndlaWdodCIsImhlaWdodCIsImJsb29kUHJlc3N1cmUiLCJoZWFydFJhdGUiLCJSQkMiLCJibG9vZEdsdWNvc2UiLCJoZW1vZ2xvYmluIiwiaGVtYXRvY3JpdCIsIk1DViIsInBsYXRlbGV0Q291bnQiLCJXQkMiLCJzb2RpdW0iLCJwb3Rhc3NpdW0iLCJtYWNBZGRyZXNzIiwiZmxvb3IiLCJwYXRpZW50TmFtZSIsImdldFJhbmRvbU5hbWUiLCJmaXJzdE5hbWVzIiwibGFzdE5hbWVzIiwiYWRkcmVzcyIsImdlbmVyYXRlU3RyZWV0QWRkcmVzcyIsInBoeXNpY2lhbk5hbWUiLCJwcmVzY3JpcHRpb25zIiwiZ2V0UHJlc2NyaXB0aW9ucyIsImluc2VydCIsImdldEJvb2xlYW4iLCJtZXRob2RzIiwiY2xlYXJSZWNvcmRzIiwiZ2V0UmFuZG9tTnVtYmVyIiwibWF4IiwiYXJyMSIsImFycjIiLCJmaXJzdE5hbWUiLCJsZW5ndGgiLCJsYXN0TmFtZSIsIm5hbWUiLCJzdGFydCIsImVuZCIsImdldFRpbWUiLCJ0b0RhdGVTdHJpbmciLCJkb2IiLCJtb250aF9kaWZmIiwibm93IiwiYWdlX2R0IiwieWVhciIsImdldFVUQ0Z1bGxZZWFyIiwiYWJzIiwibnVtIiwic3RyZWV0TmFtZXMiLCJ6aXBDb2RlcyIsInN0cmVldE5hbWUiLCJ6aXAiLCJudW1PZlByZXBzY3JpcHRpb25zIiwiYWN0dWFsUHJlc2NyaXB0aW9ucyIsImRydWciLCJpbmNsdWRlcyIsInB1c2giLCJyYW5kb21fYm9vbGVhbl92YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFBQ0Msc0JBQW9CLEVBQUMsTUFBSUE7QUFBMUIsQ0FBZDtBQUNPLE1BQU1BLG9CQUFvQixHQUFHLElBQUlDLEtBQUssQ0FBQ0MsVUFBVixDQUFxQixxQkFBckIsQ0FBN0IsQzs7Ozs7Ozs7Ozs7QUNEUCxJQUFJQyxNQUFKO0FBQVdMLE1BQU0sQ0FBQ00sSUFBUCxDQUFZLGVBQVosRUFBNEI7QUFBQ0QsUUFBTSxDQUFDRSxDQUFELEVBQUc7QUFBQ0YsVUFBTSxHQUFDRSxDQUFQO0FBQVM7O0FBQXBCLENBQTVCLEVBQWtELENBQWxEO0FBQXFEUCxNQUFNLENBQUNNLElBQVAsQ0FBWSxvQkFBWjtBQUFrQyxJQUFJSixvQkFBSjtBQUF5QkYsTUFBTSxDQUFDTSxJQUFQLENBQVksaUJBQVosRUFBOEI7QUFBQ0osc0JBQW9CLENBQUNLLENBQUQsRUFBRztBQUFDTCx3QkFBb0IsR0FBQ0ssQ0FBckI7QUFBdUI7O0FBQWhELENBQTlCLEVBQWdGLENBQWhGO0FBQW1GLElBQUlDLEdBQUo7QUFBUVIsTUFBTSxDQUFDTSxJQUFQLENBQVksUUFBWixFQUFxQjtBQUFDRSxLQUFHLENBQUNELENBQUQsRUFBRztBQUFDQyxPQUFHLEdBQUNELENBQUo7QUFBTTs7QUFBZCxDQUFyQixFQUFxQyxDQUFyQztBQUt0TkYsTUFBTSxDQUFDSSxPQUFQLENBQWUsTUFBTTtBQUNuQjtBQUNBUCxzQkFBb0IsQ0FBQ1EsTUFBckIsQ0FBNEIsRUFBNUI7O0FBQ0EsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQzNCLFFBQUlDLFNBQVMsR0FBRyxVQUFVQyxPQUFWLENBQWtCLElBQWxCLEVBQXdCLFlBQVk7QUFDbEQs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QyxRQUFJaUUsSUFBSSxHQUFHaEMsYUFBYSxDQUFDTSxlQUFlLENBQUNOLGFBQWEsQ0FBQ1csTUFBZixDQUFoQixDQUF4Qjs7QUFDQSxRQUFJb0IsbUJBQW1CLENBQUNFLFFBQXBCLENBQTZCRCxJQUE3QixDQUFKLEVBQXdDO0FBQ3RDO0FBQ0QsS0FGRCxNQUVPO0FBQ0xELHlCQUFtQixDQUFDRyxJQUFwQixDQUF5QkYsSUFBekI7QUFDRDtBQUNGOztBQUVELFNBQU9ELG1CQUFQO0FBQ0QsQyxDQUVEOzs7QUFDQSxTQUFTNUIsVUFBVCxHQUFzQjtBQUNwQixNQUFJZ0Msb0JBQW9CLEdBQUdoRSxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsRUFBM0M7QUFDQSxTQUFPK0Qsb0JBQVA7QUFDRCxDIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBkYXRhYmFzZVxyXG5leHBvcnQgY29uc3QgcGF0aWVudEluZm9ybWF0aW9uZGIgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbignUGF0aWVudCBJbmZvcm1hdGlvbicpOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xyXG5pbXBvcnQgJy4uL2xpYi9kYXRhYmFzZS5qcyc7XHJcbmltcG9ydCB7IHBhdGllbnRJbmZvcm1hdGlvbmRiIH0gZnJvbSBcIi4uL2xpYi9kYXRhYmFzZVwiXHJcbmltcG9ydCB7IGdldCB9IGZyb20gJ2pxdWVyeSc7XHJcblxyXG5NZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XHJcbiAgLy8gY29kZSB0byBydW4gb24gc2VydmVyIGF0IHN0YXJ0dXBcclxuICBwYXRpZW50SW5mb3JtYXRpb25kYi5yZW1vdmUoe30pO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTA7IGkrKykge1xyXG4gICAgdmFyIHBhdGllbnRJRCA9IFwiWFhYWFhYWFwiLnJlcGxhY2UoL1gvZywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gXCIwMTIzNDU2Nzg5QUJDREVGXCIuY2hhckF0KChNYXRoLnJhbmRvbSgpICogMTYpKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIERPQiA9IHJhbmRvbURhdGUobmV3IERhdGUoMTk3MCwgMCwgMSksIG5ldyBEYXRlKCkpO1xyXG5cclxuICAgIHZhciBhZ2UgPSBhZ2VDYWxjdWxhdG9yKERPQik7XHJcblxyXG5cclxuICAgIHZhciB3ZWlnaHQgPSBcIjFYWCBsYnNcIi5yZXBsYWNlKC9YL2csIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIFwiMTIzNDU2Nzg5XCIuY2hhckF0KChNYXRoLnJhbmRvbSgpICogOSkpXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgaGVpZ2h0ID0gXCI1ZnQgWGluXCIucmVwbGFjZSgvWC9nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBcIjEyMzQ1Njc4OTEwMTFcIi5jaGFyQXQoKE1hdGgucmFuZG9tKCkgKiA5KSlcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBibG9vZFByZXNzdXJlID0gXCIxWFgvWFggbW1IZ1wiLnJlcGxhY2UoL1gvZywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gXCIxMjM0NTY3ODlcIi5jaGFyQXQoKE1hdGgucmFuZG9tKCkgKiA5KSlcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBoZWFydFJhdGUgPSBcIlhYIEJQTVwiLnJlcGxhY2UoL1gvZywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gXCIxMjM0NTY3ODlcIi5jaGFyQXQoKE1hdGgucmFuZG9tKCkgKiA5KSlcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBSQkMgPSBcIlguWFggTS9VTFwiLnJlcGxhY2UoL1gvZywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gXCIxMjM0NTY3ODlcIi5jaGFyQXQoKE1hdGgucmFuZG9tKCkgKiA5KSlcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBibG9vZEdsdWNvc2UgPSBcIlhYWCBtZy9kbFwiLnJlcGxhY2UoL1gvZywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gXCIxMjNcIi5jaGFyQXQoKE1hdGgucmFuZG9tKCkgKiAzKSlcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBoZW1vZ2xvYmluID0gXCIxWC5YIGcvZGxcIi5yZXBsYWNlKC9YL2csIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIFwiMDEyMzQ1Njc4OVwiLmNoYXJBdCgoTWF0aC5yYW5kb20oKSAqIDEwKSlcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBoZW1hdG9jcml0ID0gXCIxWC5YICVcIi5yZXBsYWNlKC9YL2csIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIFwiMTIzNDU2Nzg5XCIuY2hhckF0KChNYXRoLnJhbmRvbSgpICogOSkpXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgTUNWID0gXCJYWCBmTFwiLnJlcGxhY2UoL1gvZywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gXCI3ODlcIi5jaGFyQXQoKE1hdGgucmFuZG9tKCkgKiAzKSlcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBwbGF0ZWxldENvdW50ID0gXCJYWFggSy9kbFwiLnJlcGxhY2UoL1gvZywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gXCIwMTIzNDU2Nzg5XCIuY2hhckF0KChNYXRoLnJhbmRvbSgpICogMTApKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFdCQyA9IFwiWFguWCBLL3VMXCIucmVwbGFjZSgvWC9nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBcIjAxMjM0NTY3ODlcIi5jaGFyQXQoKE1hdGgucmFuZG9tKCkgKiAxMCkpXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgc29kaXVtID0gXCIxWFggbUVxL0xcIi5yZXBsYWNlKC9YL2csIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIFwiMDEyMzQ1Njc4OVwiLmNoYXJBdCgoTWF0aC5yYW5kb20oKSAqIDEwKSlcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBwb3Rhc3NpdW0gPSBcIlguWCBtRXEvTFwiLnJlcGxhY2UoL1gvZywgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gXCIwMTIzNDU2Nzg5XCIuY2hhckF0KChNYXRoLnJhbmRvbSgpICogMTApKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIG1hY0FkZHJlc3MgPSBcIlhYOlhYOlhYOlhYOlhYOlhYXCIucmVwbGFjZSgvWC9nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBcIjAxMjM0NTY3ODlBQkNERUZcIi5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpKVxyXG5cclxuICAgIH0pO1xyXG4gICAgdmFyIHBhdGllbnROYW1lID0gZ2V0UmFuZG9tTmFtZShmaXJzdE5hbWVzLCBsYXN0TmFtZXMpO1xyXG4gICAgdmFyIGFkZHJlc3MgPSBnZW5lcmF0ZVN0cmVldEFkZHJlc3MoKTtcclxuICAgIHZhciBwaHlzaWNpYW5OYW1lID0gXCJEci4gXCIgKyBnZXRSYW5kb21OYW1lKGZpcnN0TmFtZXMsIGxhc3ROYW1lcyk7XHJcbiAgICB2YXIgcHJlc2NyaXB0aW9ucyA9IGdldFByZXNjcmlwdGlvbnMoKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICBwYXRpZW50SW5mb3JtYXRpb25kYi5pbnNlcnQoe1xyXG5cclxuICAgICAgXCJtYWNBZGRyZXNzXCI6IG1hY0FkZHJlc3MsXHJcbiAgICAgIFwicGF0aWVudEluZm9ybWF0aW9uXCI6IHtcclxuICAgICAgICBcInBhdGllbnROYW1lXCI6IHBhdGllbnROYW1lLFxyXG4gICAgICAgIFwiYWRkcmVzc1wiOiBhZGRyZXNzLFxyXG4gICAgICAgIFwicGF0aWVudElEXCI6IHBhdGllbnRJRCxcclxuICAgICAgICBcIkRPQlwiOiBET0IsXHJcbiAgICAgICAgXCJhZ2VcIjogYWdlLFxyXG4gICAgICAgIFwicGh5c2ljaWFuTmFtZVwiOiBwaHlzaWNpYW5OYW1lXHJcbiAgICAgIH0sXHJcbiAgICAgIFwidml0YWxzXCI6IHtcclxuICAgICAgICBcImJsb29kUHJlc3N1cmVcIjogYmxvb2RQcmVzc3VyZSxcclxuICAgICAgICBcImhlYXJ0UmF0ZVwiOiBoZWFydFJhdGUsXHJcbiAgICAgICAgXCJoZWlnaHRcIjogaGVpZ2h0LFxyXG4gICAgICAgIFwid2VpZ2h0XCI6IHdlaWdodFxyXG4gICAgICB9LFxyXG4gICAgICBcImxhYldvcmtcIjoge1xyXG4gICAgICAgIFwiUkJDXCI6IFJCQyxcclxuICAgICAgICBcIkJsb29kIEdsdWNvc2UgTGV2ZWxcIjogYmxvb2RHbHVjb3NlLFxyXG4gICAgICAgIFwiSGVtb2dsb2JpblwiOiBoZW1vZ2xvYmluLFxyXG4gICAgICAgIFwiSGVtYXRvY3JpdFwiOiBoZW1hdG9jcml0LFxyXG4gICAgICAgIFwiTUNWXCI6IE1DVixcclxuICAgICAgICBcIldCQ1wiOiBXQkMsXHJcbiAgICAgICAgXCJTb2RpdW1cIjogc29kaXVtLFxyXG4gICAgICAgIFwiUG90YXNzaXVtXCI6IHBvdGFzc2l1bSxcclxuICAgICAgICBcIlBsYXRlbGV0IENvdW50XCI6IHBsYXRlbGV0Q291bnRcclxuICAgICAgfSxcclxuICAgICAgXCJwcmVzY3JpcHRpb25zXCI6IHByZXNjcmlwdGlvbnMsXHJcbiAgICAgIFwiZGVybWF0b2xvZ3lcIjoge1xyXG4gICAgICAgIFwiYWNuZVwiOiBnZXRCb29sZWFuKCksXHJcbiAgICAgICAgXCJhY25lIHNjYXJzXCI6IGdldEJvb2xlYW4oKSxcclxuICAgICAgICBcImVjemVtYSBhbmQgZGVybWF0aXRpc1wiOiBnZXRCb29sZWFuKCksXHJcbiAgICAgICAgXCJoYWlyIGxvc3NcIjogZ2V0Qm9vbGVhbigpLFxyXG4gICAgICAgIFwibmFpbCBwcm9ibGVtc1wiOiBnZXRCb29sZWFuKCksXHJcbiAgICAgICAgXCJ3YXJ0c1wiOiBnZXRCb29sZWFuKCksXHJcbiAgICAgICAgXCJmdW5nYWwgaW5mZWN0aW9uc1wiOiBnZXRCb29sZWFuKCksXHJcbiAgICAgICAgXCJza2luIGNhbmNlclwiOiBnZXRCb29sZWFuKCksXHJcbiAgICAgICAgXCJzaGluZ2xlc1wiOiBnZXRCb29sZWFuKCksXHJcbiAgICAgICAgXCJyb3NhY2VhXCI6IGdldEJvb2xlYW4oKSxcclxuICAgICAgICBcInBzb3JpYXNpc1wiOiBnZXRCb29sZWFuKCksXHJcbiAgICAgICAgXCJ2aXRpbGlnb1wiOiBnZXRCb29sZWFuKClcclxuICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuXHJcbk1ldGVvci5tZXRob2RzKHtcclxuICBjbGVhclJlY29yZHM6ICgpID0+IHtcclxuICAgIHBhdGllbnRJbmZvcm1hdGlvbmRiLnJlbW92ZSh7fSk7XHJcbiAgfVxyXG59KVxyXG5cclxuLy9hcnJheSBmb3IgZmlyc3QgYW5kIGxhc3QgbmFtZXNcclxuY29uc3QgZmlyc3ROYW1lcyA9IFtcIk1pY2hhZWxcIiwgXCJDaHJpc3RvcGhlclwiLCBcIkplc3NpY2FcIiwgXCJNYXR0aGV3XCIsIFwiQXNobGV5XCIsIFwiSmVubmlmZXJcIiwgXCJKb3NodWFcIiwgXCJBbWFuZGFcIiwgXCJEYW5pZWxcIiwgXCJEYXZpZFwiLCBcIkphbWVzXCIsIFwiUm9iZXJ0XCIsIFwiSm9oblwiLFxyXG4gIFwiSm9zZXBoXCIsIFwiQW5kcmV3XCIsIFwiUnlhblwiLCBcIkJyYW5kb25cIiwgXCJKYXNvblwiLCBcIkp1c3RpblwiLCBcIlNhcmFoXCIsIFwiV2lsbGlhbVwiLCBcIkpvbmF0aGFuXCIsIFwiU3RlcGhhbmllXCIsIFwiQnJpYW5cIiwgXCJOaWNvbGVcIiwgXCJOaWNob2xhc1wiLCBcIkFudGhvbnlcIiwgXCJIZWF0aGVyXCIsXHJcbiAgXCJFcmljXCIsIFwiRWxpemFiZXRoXCIsIFwiQWRhbVwiLCBcIk1lZ2FuXCIsIFwiTWVsaXNzYVwiLCBcIktldmluXCIsIFwiU3RldmVuXCIsIFwiVGhvbWFzXCIsIFwiVGltb3RoeVwiLCBcIkNocmlzdGluYVwiLCBcIkt5bGVcIiwgXCJSYWNoZWxcIiwgXCJMYXVyYVwiLCBcIkxhdXJlblwiLCBcIkFtYmVyXCIsIFwiQnJpdHRhbnlcIixcclxuICBcIkRhbmllbGxlXCIsIFwiUmljaGFyZFwiLCBcIktpbWJlcmx5XCIsIFwiSmVmZnJleVwiLCBcIkFteVwiLCBcIkNyeXN0YWxcIiwgXCJNaWNoZWxsZVwiLCBcIlRpZmZhbnlcIiwgXCJKZXJlbXlcIiwgXCJCZW5qYW1pblwiLCBcIk1hcmtcIiwgXCJFbWlseVwiLCBcIkFhcm9uXCJdO1xyXG5cclxuY29uc3QgbGFzdE5hbWVzID0gW1wiU21pdGhcIiwgXCJKb2huc29uXCIsIFwiV2lsbGlhbXNcIiwgXCJCcm93blwiLCBcIkpvbmVzXCIsIFwiR2FyY2lhXCIsIFwiTWlsbGVyXCIsIFwiRGF2aXNcIiwgXCJSb2RyaWd1ZXpcIiwgXCJNYXJ0aW5lelwiLCBcIkhlcm5hbmRlelwiLCBcIkxvcGV6XCIsIFwiR29uemFsZXpcIixcclxuICBcIldpbHNvblwiLCBcIkFuZGVyc29uXCIsIFwiVGhvbWFzXCIsIFwiVGF5bG9yXCIsIFwiTW9vcmVcIiwgXCJKYWNrc29uXCIsIFwiTWFydGluXCIsIFwiTGVlXCIsIFwiUGVyZXpcIiwgXCJUaG9tcHNvblwiLCBcIldoaXRlXCIsIFwiSGFycmlzXCIsIFwiU2FuY2hlelwiLCBcIkNsYXJrXCIsIFwiUmFtaXJlelwiLCBcIkxld2lzXCIsXHJcbiAgXCJSb2JpbnNvblwiLCBcIldhbGtlclwiLCBcIllvdW5nXCIsIFwiQWxsZW5cIiwgXCJLaW5nXCIsIFwiV3JpZ2h0XCIsIFwiU2NvdHRcIiwgXCJUb3JyZXNcIiwgXCJOZ3V5ZW5cIiwgXCJIaWxsXCIsIFwiRmxvcmVzXCIsIFwiR3JlZW5cIiwgXCJBZGFtc1wiLCBcIk5lbHNvblwiLCBcIkJha2VyXCIsIFwiSGFsbFwiLCBcIlJpdmVyYVwiLFxyXG4gIFwiQ2FtcGJlbGxcIiwgXCJNaXRjaGVsbFwiLCBcIkNhcnRlclwiLCBcIlJvYmVydHNcIl07XHJcblxyXG5cclxuLy9yYW5kb20gbnVtYmVyXHJcbmNvbnN0IGdldFJhbmRvbU51bWJlciA9IChtYXgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcblxyXG5cclxuLy9nZXR0aW5nIHJhbmRvbSBuYW1lc1xyXG5mdW5jdGlvbiBnZXRSYW5kb21OYW1lKGFycjEsIGFycjIpIHtcclxuXHJcbiAgbGV0IGZpcnN0TmFtZSA9IGFycjFbZ2V0UmFuZG9tTnVtYmVyKGFycjEubGVuZ3RoKV07XHJcbiAgbGV0IGxhc3ROYW1lID0gYXJyMltnZXRSYW5kb21OdW1iZXIoYXJyMi5sZW5ndGgpXTtcclxuXHJcbiAgbGV0IG5hbWUgPSBmaXJzdE5hbWUgKyBcIiBcIiArIGxhc3ROYW1lO1xyXG5cclxuICByZXR1cm4gbmFtZTtcclxufVxyXG5cclxuLy9nZW5lcmF0ZSByYW5kb20gRG9CXHJcbmZ1bmN0aW9uIHJhbmRvbURhdGUoc3RhcnQsIGVuZCkge1xyXG4gIHJldHVybiBuZXcgRGF0ZShzdGFydC5nZXRUaW1lKCkgKyBNYXRoLnJhbmRvbSgpICogKGVuZC5nZXRUaW1lKCkgLSBzdGFydC5nZXRUaW1lKCkpKS50b0RhdGVTdHJpbmcoKTtcclxufVxyXG5cclxuLy9nZW5lcmF0ZSBhZ2VcclxuZnVuY3Rpb24gYWdlQ2FsY3VsYXRvcihET0IpIHtcclxuICB2YXIgZG9iID0gbmV3IERhdGUoRE9CKTtcclxuXHJcbiAgLy9jYWxjdWxhdGUgbW9udGggZGlmZmVyZW5jZSBmcm9tIGN1cnJlbnQgZGF0ZSBpbiB0aW1lXHJcbiAgdmFyIG1vbnRoX2RpZmYgPSBEYXRlLm5vdygpIC0gZG9iLmdldFRpbWUoKTtcclxuXHJcbiAgLy9jb252ZXJ0IHRoZSBjYWxjdWxhdGVkIGRpZmZlcmVuY2UgaW4gZGF0ZSBmb3JtYXRcclxuICB2YXIgYWdlX2R0ID0gbmV3IERhdGUobW9udGhfZGlmZik7XHJcblxyXG4gIC8vZXh0cmFjdCB5ZWFyIGZyb20gZGF0ZSAgICBcclxuICB2YXIgeWVhciA9IGFnZV9kdC5nZXRVVENGdWxsWWVhcigpO1xyXG5cclxuICAvL25vdyBjYWxjdWxhdGUgdGhlIGFnZSBvZiB0aGUgdXNlclxyXG4gIHZhciBhZ2UgPSBNYXRoLmFicyh5ZWFyIC0gMTk3MCk7XHJcblxyXG4gIC8vZGlzcGxheSB0aGUgY2FsY3VsYXRlZCBhZ2VcclxuICByZXR1cm4gYWdlO1xyXG59XHJcblxyXG4vL2dlbmVyYXRlIHJhbmRvbSBzdHJlZXQgYWRkcmVzc1xyXG5mdW5jdGlvbiBnZW5lcmF0ZVN0cmVldEFkZHJlc3MoKSB7XHJcbiAgLy9nZW5lcmF0ZSByYW5kb20gbnVtIGZvciBhZGRyZXNzIGJldHdlZW4gMTAwMCBhbmQgOTAwMFxyXG4gIHZhciBudW0gPSBNYXRoLmZsb29yKDEwMDAgKyBNYXRoLnJhbmRvbSgpICogOTAwMCk7XHJcblxyXG4gIC8vbGlzdCBvZiBzdHJlZXQgbmFtZXMgdG8gcGljayBmcm9tXHJcbiAgdmFyIHN0cmVldE5hbWVzID0gW1wiSGFydGZvcmQgUm9hZFwiLCBcIkRldm9uc2hpcmUgRHJpdmVcIiwgXCJCdWNraW5naGFtIERyaXZlXCIsIFwiQ2VtZXRlcnkgUm9hZFwiLCBcIkZ1bHRvbiBTdHJlZXRcIiwgXCJEZWVyZmllbGQgRHJpdmVcIiwgXCJSb3V0ZSA3XCIsIFwiUGFyayBEcml2ZVwiLFxyXG4gICAgXCJXaWxsaWFtcyBTdHJlZXRcIiwgXCJIaWNrb3J5IFN0cmVldFwiLCBcIjEwdGggU3RyZWV0XCIsIFwiQnJvb2sgTGFuZVwiLCBcIkJheWJlcnJ5IERyaXZlXCIsIFwiQ2FudGVyYnVyeSBSb2FkXCIsIFwiTWFwbGUgTGFuZVwiLCBcIkNoYXJsZXMgU3RyZWV0XCIsIFwiQ291cnQgU3RyZWV0XCIsXHJcbiAgICBcIkNvdW50cnkgTGFuZVwiLCBcIkxhdXJlbCBTdHJlZXRcIiwgXCJFYWdsZSBSb2FkXCIsIFwiSGlsbHRvcCBSb2FkXCIsIFwiQnJvYWR3YXlcIiwgXCJCYXkgU3RyZWV0XCIsIFwiQ2VkYXIgQ291cnRcIiwgXCJDYW5hbCBTdHJlZXRcIiwgXCJSYWNlIFN0cmVldFwiLCBcIkZhaXJ3YXkgRHJpdmVcIixcclxuICAgIFwiU2hhZHkgTGFuZVwiLCBcIkhhbWlsdG9uIFN0cmVldFwiLCBcIk1pbGwgU3RyZWV0XCIsIFwiQ29vcGVyIFN0cmVldFwiLCBcIkxha2V2aWV3IERyaXZlXCIsIFwiQ2VkYXIgQXZlbnVlXCIsIFwiQ2xldmVsYW5kIEF2ZW51ZVwiLCBcIjNyZCBTdHJlZXQgTm9ydGhcIiwgXCJPcmNoYXJkIFN0cmVldFwiLFxyXG4gICAgXCJIb3dhcmQgU3RyZWV0XCIsIFwiTGlsYWMgTGFuZVwiLCBcIkNyZWVrIFJvYWRcIiwgXCJFYWdsZSBTdHJlZXRcIiwgXCJIaWxsc2lkZSBEcml2ZVwiLCBcIkxpYmVydHkgU3RyZWV0XCIsIFwiTGFmYXlldHRlIEF2ZW51ZVwiLCBcIkxha2UgU3RyZWV0XCIsIFwiRnJvbnQgU3RyZWV0IFNvdXRoXCIsXHJcbiAgICBcIjd0aCBTdHJlZXRcIiwgXCJHYXJmaWVsZCBBdmVudWVcIiwgXCJTeWNhbW9yZSBEcml2ZVwiLCBcIk5ldyBTdHJlZXRcIiwgXCJDbGludG9uIFN0cmVldFwiXVxyXG5cclxuICAvL2xpc3Qgb2YgZm9ydCB3YXluZSB6aXAgY29kZXNcclxuICB2YXIgemlwQ29kZXMgPSBbXCI0Njc3NFwiLCBcIjQ2ODAyXCIsIFwiNDY4MDNcIiwgXCI0NjgwNFwiLCBcIjQ2ODA1XCIsIFwiNDY4MDZcIiwgXCI0NjgwN1wiLFxyXG4gICAgXCI0NjgwOFwiLCBcIjQ2ODA5XCIsIFwiNDY4MTRcIiwgXCI0NjgxNVwiLCBcIjQ2ODE2XCIsIFwiNDY4MThcIiwgXCI0NjgxOVwiLCBcIjQ2ODI1XCIsIFwiNDY4MzVcIiwgXCI0Njg0NVwiXTtcclxuICAvL2dldHMgcmFuZG9tIHN0cmVldCBuYW1lXHJcbiAgdmFyIHN0cmVldE5hbWUgPSBzdHJlZXROYW1lc1tnZXRSYW5kb21OdW1iZXIoc3RyZWV0TmFtZXMubGVuZ3RoKV07XHJcblxyXG4gIHZhciB6aXAgPSB6aXBDb2Rlc1tnZXRSYW5kb21OdW1iZXIoemlwQ29kZXMubGVuZ3RoKV07XHJcblxyXG4gIC8vYXNzaWducyBhZGRyZXNzIGluIG51bSBzdHJlZXQgbmFtZSBjaXR5IHN0YXRlLCBhbmQgcmFuZG9tIHppcGNvZGVcclxuICB2YXIgYWRkcmVzcyA9IG51bSArIFwiIFwiICsgc3RyZWV0TmFtZSArIFwiIEZvcnQgV2F5bmUsIElOIFwiICsgXCIgXCIgKyB6aXA7XHJcblxyXG4gIC8vcmV0dXJuIGFkZHJlc3NcclxuICByZXR1cm4gYWRkcmVzcztcclxufVxyXG5cclxuLy9wcmVzY3JpcHRpb25zXHJcbmZ1bmN0aW9uIGdldFByZXNjcmlwdGlvbnMoKSB7XHJcbiAgdmFyIG51bU9mUHJlcHNjcmlwdGlvbnMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcblxyXG4gIHZhciBwcmVzY3JpcHRpb25zID0gW1wiSHlkcm9jb2RvbmVcIiwgXCJNZXRmb3JtaW5cIiwgXCJMb3NhcnRhblwiLCBcIkFudGliaW90aWNzXCIsIFwiQWxidXRlcm9sXCIsXHJcbiAgICBcIkFudGloaXN0YW1pbmVzXCIsIFwiR2FiYXBlbnRpblwiLCBcIk9tZXByYXpvbGVcIiwgXCJMZXZvdGh5cm94aW5lXCIsIFwiQXRvcnZhc3RhdGluXCJdO1xyXG5cclxuICB2YXIgYWN0dWFsUHJlc2NyaXB0aW9ucyA9IFtdO1xyXG4gIC8vbG9vcCB0byBkZXRlcm1pbmUgd2hhdCBwcmVzY3JpcHRpb24gdGhleSBoYXZlIGlmIGFueVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZQcmVwc2NyaXB0aW9uczsgaSsrKSB7XHJcbiAgICBsZXQgZHJ1ZyA9IHByZXNjcmlwdGlvbnNbZ2V0UmFuZG9tTnVtYmVyKHByZXNjcmlwdGlvbnMubGVuZ3RoKV07XHJcbiAgICBpZiAoYWN0dWFsUHJlc2NyaXB0aW9ucy5pbmNsdWRlcyhkcnVnKSkge1xyXG4gICAgICBjb250aW51ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWN0dWFsUHJlc2NyaXB0aW9ucy5wdXNoKGRydWcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGFjdHVhbFByZXNjcmlwdGlvbnM7XHJcbn1cclxuXHJcbi8vZ2VuZXJhdGUgcmFuZG9tIHRydWUgZmFsc2VcclxuZnVuY3Rpb24gZ2V0Qm9vbGVhbigpIHtcclxuICB2YXIgcmFuZG9tX2Jvb2xlYW5fdmFsdWUgPSBNYXRoLnJhbmRvbSgpIDwgLjU7XHJcbiAgcmV0dXJuIHJhbmRvbV9ib29sZWFuX3ZhbHVlO1xyXG59Il19
