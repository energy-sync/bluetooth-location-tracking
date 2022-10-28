import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating';
import { patientInformationdb } from '../lib/database.js';
import '../lib/routing';
import './main.html';
import './stylesheets/bootstrap.min.css';
import "./pages/device-list.html";
import "./scripts/device-list";
import "isomorphic-fetch";

//MongoDB
Template.insertData.events({
    'click .js-save'(event, instance) {
        var patientID = "XXXXXXX".replace(/X/g, function () {
            return "0123456789ABCDEF".charAt((Math.random()*16))}) ;
       
            var age = "XX".replace(/X/g, function () {
                return "0123456789".charAt((Math.random()*10))}) ;

                var DOB = "0X/2X/19XX".replace(/X/g, function () {
                return "123456789".charAt((Math.random()*9))}) ;

                var bloodPressure = "1XX/XX".replace(/X/g, function () {
                return "123456789".charAt((Math.random()*9))}) ;

                var heartRate = "XX".replace(/X/g, function () {
                return "123456789".charAt((Math.random()*9))}) ;

                var RBC = "X.XX M/UL".replace(/X/g, function () {
                return "123456789".charAt((Math.random()*9))}) ;

                var bloodGlucose = "XXX mg/dl".replace(/X/g, function () {
                return "123".charAt((Math.random()*3))}) ;

                var hemoglobin = "1X.X g/dl".replace(/X/g, function () {
                return "0123456789".charAt((Math.random()*10))}) ;

                var hematocrit = "1X.X %".replace(/X/g, function () {
                return "123456789".charAt((Math.random()*9))}) ;

                var MCV = "XX fL".replace(/X/g, function () {
                return "789".charAt((Math.random()*3))}) ;

                var plateletCount = "XXX K/dl".replace(/X/g, function () {
                return "0123456789".charAt((Math.random()*10))}) ;

                var WBC = "XX.X K/uL".replace(/X/g, function () {
                return "0123456789".charAt((Math.random()*10))}) ;

                var sodium = "1XX mEq/L".replace(/X/g, function () {
                return "0123456789".charAt((Math.random()*10))}) ;

                var potassium = "X.X mEq/L".replace(/X/g, function () {
                return "0123456789".charAt((Math.random()*10))}) ;
                        
                    
                
            
        
    

              




                   
               
               
                   
       
        var macAddress = "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
            return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
            
        });
        var patientName = $('#pName').val();
        var address = $('#address').val();
        var physicanName = $('#physicanName').val();
        var prescriptions=$('#prescriptions').val();

       
        patientInformationdb.insert({
         
            "macAddress": macAddress,
            "patientName": patientName,
            "address": address,
            "patientID":patientID,
            "age":age,
            "DOB":DOB,
            "physicanName":physicanName,
            "bloodPressure":bloodPressure,
            "heartRate":heartRate,
            "RBC":RBC,
            "Blood Glucose Level":bloodGlucose,
            "Hemoglobin": hemoglobin,
            "Hematocrit": hematocrit,
            "MCV": MCV,
            "WBC": WBC,
            "Sodium":sodium,
            "Potassium":potassium,
            "Platelet Count":plateletCount,
            "prescriptions":prescriptions,
            
        });
        $('#pName').val('');
        $('#address').val('');
        $('#physicanName').val('');
        $('#labInfo').val('');
        $('#prescriptions').val('');
    },
    'click .js-clear'(event, instance) {
        console.log("click");
        Meteor.call("clearRecords");
    }
});