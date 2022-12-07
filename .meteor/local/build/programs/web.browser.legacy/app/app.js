var require = meteorInstall({"client":{"pages":{"patient-list.html":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/pages/patient-list.html                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.link("./template.patient-list.js", { "*": "*+" });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.patient-list.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/pages/template.patient-list.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template._migrateTemplate(
  "patientList",
  new Template("Template.patientList", (function() {
  var view = this;
  return HTML.DIV({
    class: "container pt-3 title"
  }, HTML.Raw('\n        <h1>Patient List</h1>\n        <div class="d-md-flex justify-content-md-end pe-3 gap-2">\n            <input type="text">\n            <button class="btn btn-primary">Search</button>\n        </div>\n        '), HTML.DIV({
    class: "vstack"
  }, "\n            ", HTML.TABLE({
    class: "table"
  }, HTML.Raw('\n                <thead>\n                    <th scope="col">Name</th>\n                    <th scope="col">Patient ID</th> \n                    <th scope="col">Physician Name</th>\n                    <th scope="col">Location</th>\n                    <th scope="col">Device MAC</th>\n                    <th scope="col">Last Updated</th>\n                </thead>\n                '), HTML.TBODY("\n                    ", Blaze.Each(function() {
    return {
      _sequence: Spacebars.call(view.lookup("devices")),
      _variable: "device"
    };
  }, function() {
    return [ "\n                        ", Blaze._TemplateWith(function() {
      return {
        device: Spacebars.call(view.lookup("device"))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("patientRow"));
    }), "\n                    " ];
  }), "\n                "), "\n            "), "\n        "), "\n    ");
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("patientList");
    Template._applyHmrChanges("patientList");
  });
}

Template._migrateTemplate(
  "patientRow",
  new Template("Template.patientRow", (function() {
  var view = this;
  return HTML.TR({
    class: "patientRow"
  }, "\n        ", HTML.TD(Blaze.View("lookup:device.patientInformation.patientName", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("device"), "patientInformation", "patientName"));
  })), "\n        ", HTML.TD(Blaze.View("lookup:device.patientInformation.patientID", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("device"), "patientInformation", "patientID"));
  })), "\n        ", HTML.TD(Blaze.View("lookup:device.patientInformation.physicianName", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("device"), "patientInformation", "physicianName"));
  })), "\n        ", HTML.TD(Blaze.View("lookup:device.patientInformation.location", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("device"), "patientInformation", "location"));
  })), "\n        ", HTML.TD(Blaze.View("lookup:device.macAddress", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("device"), "macAddress"));
  })), "\n        ", HTML.TD(Blaze.View("lookup:readableDate", function() {
    return Spacebars.mustache(view.lookup("readableDate"));
  })), "\n    ");
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("patientRow");
    Template._applyHmrChanges("patientRow");
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"patient.html":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/pages/patient.html                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.link("./template.patient.js", { "*": "*+" });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.patient.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/pages/template.patient.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

(function () {
  var renderFunc = (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("patient")), "\n\n    ", Spacebars.include(view.lookupTemplate("patientInformation")) ];
});
  Template.body.addContent(renderFunc);
  Meteor.startup(Template.body.renderToDocument);
  if (typeof module === "object" && module.hot) {
    module.hot.accept();
    module.hot.dispose(function () {
      var index = Template.body.contentRenderFuncs.indexOf(renderFunc)
      Template.body.contentRenderFuncs.splice(index, 1);
      Template._applyHmrChanges();
    });
  }
})();

Template._migrateTemplate(
  "patient",
  new Template("Template.patient", (function() {
  var view = this;
  return [ HTML.H2("Name: ", Blaze.View("lookup:patient.patientInformation.patientName", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "patientInformation", "patientName"));
  })), "\n    ", HTML.P("Device MAC: ", Blaze.View("lookup:patient.macAddress", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "macAddress"));
  })), HTML.Raw("\n    <h5>Basic Information:</h5>\n    "), HTML.DIV({
    class: "vstack"
  }, "\n        ", HTML.TABLE({
    class: "table"
  }, "\n            ", HTML.TR("\n                ", HTML.TH("Date of Birth: ", Blaze.View("lookup:patient.patientInformation.DOB", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "patientInformation", "DOB"));
  })), "\n                ", HTML.TH("Age: ", Blaze.View("lookup:patient.patientInformation.age", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "patientInformation", "age"));
  })), "\n                ", HTML.TH("Address: ", Blaze.View("lookup:patient.patientInformation.address", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "patientInformation", "address"));
  })), "\n            "), "\n            ", HTML.TR("\n                ", HTML.TH("Patient ID: ", Blaze.View("lookup:patient.patientInformation.patientID", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "patientInformation", "patientID"));
  })), "\n                ", HTML.TH("Assigned Physician: ", Blaze.View("lookup:patient.patientInformation.physicianName", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "patientInformation", "physicianName"));
  })), "\n            "), "\n        "), "\n    ") ];
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("patient");
    Template._applyHmrChanges("patient");
  });
}

Template._migrateTemplate(
  "vitals",
  new Template("Template.vitals", (function() {
  var view = this;
  return [ HTML.Raw("<h5>Vitals:</h5>\n    "), HTML.DIV({
    class: "vstack"
  }, "\n        ", HTML.TABLE({
    class: "table"
  }, "\n            ", HTML.TR("\n                ", HTML.TH("Blood Pressure: ", Blaze.View("lookup:patient.vitals.bloodPressure", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "vitals", "bloodPressure"));
  })), "\n                ", HTML.TH("Heart Rate: ", Blaze.View("lookup:patient.vitals.heartRate", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "vitals", "heartRate"));
  })), "\n                ", HTML.TH("Height: ", Blaze.View("lookup:patient.vitals.height", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "vitals", "height"));
  })), "\n                ", HTML.TH("Weight: ", Blaze.View("lookup:patient.vitals.weight", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "vitals", "weight"));
  })), "\n            "), "\n        "), "\n    ") ];
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("vitals");
    Template._applyHmrChanges("vitals");
  });
}

Template._migrateTemplate(
  "labWork",
  new Template("Template.labWork", (function() {
  var view = this;
  return [ HTML.Raw("<h5>Lab Work:</h5>\n    "), HTML.DIV({
    class: "vstack"
  }, "\n        ", HTML.TABLE({
    class: "table"
  }, "\n            ", HTML.TR("\n                ", HTML.TH("RBC: ", Blaze.View("lookup:patient.labWork.RBC", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "labWork", "RBC"));
  })), "\n                ", HTML.TH("Blood Glucose Level: ", Blaze.View("lookup:patient.labWork.bloodGlucose", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "labWork", "bloodGlucose"));
  })), "\n                ", HTML.TH("Hemoglobin: ", Blaze.View("lookup:patient.labWork.hemoglobin", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "labWork", "hemoglobin"));
  })), "\n            "), "\n            ", HTML.TR("\n                ", HTML.TH("Hematocrit: ", Blaze.View("lookup:patient.labWork.hematocrit", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "labWork", "hematocrit"));
  })), "\n                ", HTML.TH("MCV: ", Blaze.View("lookup:patient.labWork.MCV", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "labWork", "MCV"));
  })), "\n                ", HTML.TH("WBC: ", Blaze.View("lookup:patient.labWork.WBC", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "labWork", "WBC"));
  })), "\n            "), "\n            ", HTML.TR("\n                ", HTML.TH("Sodium: ", Blaze.View("lookup:patient.labWork.sodium", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "labWork", "sodium"));
  })), "\n                ", HTML.TH("Potassium: ", Blaze.View("lookup:patient.labWork.potassium", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "labWork", "potassium"));
  })), "\n                ", HTML.TH("Platelet Count: ", Blaze.View("lookup:patient.labWork.PlateletCount", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("patient"), "labWork", "PlateletCount"));
  })), "\n            "), "\n        "), "\n    ") ];
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("labWork");
    Template._applyHmrChanges("labWork");
  });
}

Template._migrateTemplate(
  "prescriptions",
  new Template("Template.prescriptions", (function() {
  var view = this;
  return [ HTML.Raw("<h5>Prescriptions:</h5>\n    "), HTML.getTag("list")("\n        ", Blaze.Each(function() {
    return {
      _sequence: Spacebars.call(view.lookup("prescriptions")),
      _variable: "prescription"
    };
  }, function() {
    return [ "\n            ", HTML.LI(Blaze.View("lookup:prescription", function() {
      return Spacebars.mustache(view.lookup("prescription"));
    })), "\n        " ];
  }), "\n    ") ];
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("prescriptions");
    Template._applyHmrChanges("prescriptions");
  });
}

Template._migrateTemplate(
  "reception",
  new Template("Template.reception", (function() {
  var view = this;
  return "";
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("reception");
    Template._applyHmrChanges("reception");
  });
}

Template._migrateTemplate(
  "practitioner",
  new Template("Template.practitioner", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("vitals")), "\n    ", Spacebars.include(view.lookupTemplate("labWork")), "\n    ", Spacebars.include(view.lookupTemplate("prescriptions")) ];
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("practitioner");
    Template._applyHmrChanges("practitioner");
  });
}

Template._migrateTemplate(
  "lab",
  new Template("Template.lab", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("vitals")), "\n    ", Spacebars.include(view.lookupTemplate("labWork")) ];
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("lab");
    Template._applyHmrChanges("lab");
  });
}

Template._migrateTemplate(
  "dermatology",
  new Template("Template.dermatology", (function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("vitals"));
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("dermatology");
    Template._applyHmrChanges("dermatology");
  });
}

Template._migrateTemplate(
  "patientInformation",
  new Template("Template.patientInformation", (function() {
  var view = this;
  return [ HTML.Raw('<p>Select Department:</p>\n    <select name="departments" id="departments">\n        <option value="reception">Reception</option>\n        <option value="practitioner">General Practitioner</option>\n        <option value="lab">Lab</option>\n        <option value="dermatology">Dermatology</option>\n    </select>\n\n    '), Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("infoSelect"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }) ];
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("patientInformation");
    Template._applyHmrChanges("patientInformation");
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.html":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.html                                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.link("./template.main.js", { "*": "*+" });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.main.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/template.main.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

(function () {
  var renderFunc = (function() {
  var view = this;
  return "";
});
  Template.body.addContent(renderFunc);
  Meteor.startup(Template.body.renderToDocument);
  if (typeof module === "object" && module.hot) {
    module.hot.accept();
    module.hot.dispose(function () {
      var index = Template.body.contentRenderFuncs.indexOf(renderFunc)
      Template.body.contentRenderFuncs.splice(index, 1);
      Template._applyHmrChanges();
    });
  }
})();

Template._migrateTemplate(
  "landingPage",
  new Template("Template.landingPage", (function() {
  var view = this;
  return HTML.Raw('<h1>Location Based Bluetooth System</h1>\n  <div>\n    <a>\n      <button class="btn btn-info btn-lg">Overview</button>\n    </a>\n    <a href="/patient-list">\n      <button class="btn btn-primary btn-lg">Patient List</button>\n    </a>\n  </div>');
})),
);
if (typeof module === "object" && module.hot) {
  module.hot.accept();
  module.hot.dispose(function () {
    Template.__pendingReplacement.push("landingPage");
    Template._applyHmrChanges("landingPage");
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"scripts":{"patient-list.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/scripts/patient-list.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
!function (module1) {
  var Template;
  module1.link("meteor/templating", {
    Template: function (v) {
      Template = v;
    }
  }, 0);
  var FlowRouter;
  module1.link("meteor/ostrio:flow-router-extra", {
    FlowRouter: function (v) {
      FlowRouter = v;
    }
  }, 1);
  var patientInformationdb;
  module1.link("../../lib/database", {
    patientInformationdb: function (v) {
      patientInformationdb = v;
    }
  }, 2);

  ___INIT_METEOR_FAST_REFRESH(module);

  Template.patientList.helpers({
    devices: function () {
      return patientInformationdb.find();
    }
  });
  Template.patientRow.events({
    "click .patientRow": function (event) {
      FlowRouter.go("/patient/" + Template.currentData().device.patientInformation.patientID);
    }
  });
  Template.patientRow.helpers({
    readableDate: function () {
      var date = new Date();
      return date.toLocaleString();
    }
  });
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"patient.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/scripts/patient.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
!function (module1) {
  var Template;
  module1.link("meteor/templating", {
    Template: function (v) {
      Template = v;
    }
  }, 0);
  var ReactiveVar;
  module1.link("meteor/reactive-var", {
    ReactiveVar: function (v) {
      ReactiveVar = v;
    }
  }, 1);
  module1.link("./patient.html");

  ___INIT_METEOR_FAST_REFRESH(module);

  //Template.patient.onCreated(function patientOnCreated(){
  //Placeholder name assignment
  //this.patientName = new ReactiveVar("John Doe");
  //});
  Template.patient.helpers({
    patientName: function () {
      return Template.instance().patientName.get();
    }
  });
  Template.patientInformation.onCreated(function () {
    function patinentInformationCreated() {
      selectedDepartment = new ReactiveVar("reception");
    }

    return patinentInformationCreated;
  }());
  Template.patientInformation.helpers({
    infoSelect: function () {
      return selectedDepartment;
    }
  });
  departments.onchange(function () {
    function departmentsChanged() {
      selectedDepartment.set(departments.value);
    }

    return departmentsChanged;
  }());
  /*
  Template.patientInfo1.onCreated(function patientInfo1OnCreated(){
      //Placeholder info assignment
      this.patientLocation = new ReactiveVar("Not Checked In");
      this.patientPhone = new ReactiveVar("Not registered");
      this.patientEmail = new ReactiveVar("Not registered");
      this.patientAge = new ReactiveVar("Not registered");
  
      this.patientGender = new ReactiveVar("Not registered");
      this.patientInsurance = new ReactiveVar("Not registered");
      this.patientPolicy = new ReactiveVar("N/A");
      this.patientStatus = new ReactiveVar("Not Enrolled");
  
      this.patientDevice = new ReactiveVar("Not assigned");
     // patientFamilyHistory: [
          //this.patientFamilyCondition = new ReactiveVar("None"),
      //];
  });
  
  Template.patientInfo1.helpers({
      patientLocation(){
          return Template.instance().patientLocation.get();
      },
  
      patientPhone(){
          return Template.instance().patientPhone.get();
      },
  
      patientEmail(){
          return Template.instance().patientEmail.get();
      },
  
      patientAge(){
          return Template.instance().patientAge.get();
      },
  
      patientGender(){
          return Template.instance().patientGender.get();
      },
  
      patientInsurance(){
          return Template.instance().patientInsurance.get();
      },
  
      patientPolicy(){
          return Template.instance().patientPolicy.get();
      },
  
      patientStatus(){
          return Template.instance().patientStatus.get();
      },
  
      patientDevice(){
          return Template.instance().patientDevice.get();
      },
  
      patientFamilyHistory: [
          {patientFamilyCondition: "none"}
      ],
  
      patientMedication: [
          {currentMed: "none"}
      ]
  
  
  
  })
  */
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"stylesheets":{"bootstrap.min.css":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/stylesheets/bootstrap.min.css                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// These styles have already been applied to the document.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"main.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
!function (module1) {
  var Meteor;
  module1.link("meteor/meteor", {
    Meteor: function (v) {
      Meteor = v;
    }
  }, 0);
  var Template;
  module1.link("meteor/templating", {
    Template: function (v) {
      Template = v;
    }
  }, 1);
  var patientInformationdb;
  module1.link("../lib/database.js", {
    patientInformationdb: function (v) {
      patientInformationdb = v;
    }
  }, 2);
  module1.link("../lib/routing");
  module1.link("./main.html");
  module1.link("./stylesheets/bootstrap.min.css");
  module1.link("./pages/patient-list.html");
  module1.link("./scripts/patient-list.js");
  module1.link("./pages/patient.html");
  module1.link("./scripts/patient.js");
  module1.link(".stylesheets/main.css");
  module1.link(".stylesheets/bootstrap.min.css");
  module1.link(".stylesheets/device-list.css");

  ___INIT_METEOR_FAST_REFRESH(module);
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"lib":{"database.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/database.js                                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
!function (module1) {
  module1.export({
    patientInformationdb: function () {
      return patientInformationdb;
    }
  });

  ___INIT_METEOR_FAST_REFRESH(module); // database


  var patientInformationdb = new Mongo.Collection('Patient Information');
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routing.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/routing.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
!function (module1) {
  var FlowRouter;
  module1.link("meteor/ostrio:flow-router-extra", {
    FlowRouter: function (v) {
      FlowRouter = v;
    }
  }, 0);
  module1.link("../client/pages/patient-list.html");
  module1.link("../client/main.html");

  ___INIT_METEOR_FAST_REFRESH(module);

  // main page
  FlowRouter.route("/", {
    name: "main",
    action: function () {
      this.render("landingPage");
    }
  }); //device list page

  FlowRouter.route("/patient-list", {
    name: "patient-list",
    action: function () {
      this.render("patientList");
    }
  }); //patient page

  FlowRouter.route("/patient/:patientID", {
    name: "patient",
    action: function () {
      this.render("patient");
    }
  });
}.call(this, module);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".ts",
    ".css"
  ]
});

var exports = require("/client/main.js");