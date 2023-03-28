import{Template} from 'meteor/templating'
import {ReactiveVar} from 'meteor/reactive-var'


Template.Visual.onCreated(function() {
  this.reception=new ReactiveVar([])
  this.dermatology=new ReactiveVar([])
  this.lab=new ReactiveVar([])
  this.practitioner=new ReactiveVar([])

  Meteor.call("getLocationPatient", "Receptionist",(err, res) =>{
    this.reception.set(res)
  })

  Meteor.call("getLocationPatient", "Dermatology",(err, res) =>{
    this.dermatology.set(res)
  })
  Meteor.call("getLocationPatient", "Lab",(err, res) =>{
    this.lab.set(res)
  })
  Meteor.call("getLocationPatient", "General Practitioner",(err, res) =>{
    this.practitioner.set(res)
  })
})

Template.Visual.helpers({
  deviceLab() {
    return Template.instance().lab.get();
  },
  deviceReception() {
    return Template.instance().reception.get();
  },
  deviceGP() {
    return Template.instance().practitioner.get();
  },
  deviceDermatology() {
    return Template.instance().dermatology.get();
  }
  
});

