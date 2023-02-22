import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';


Template.Visual.helpers({
  dot1: function() {
    return Session.get('dot1');
  },
  dot2: function() {
    return Session.get('dot2');
  },
  dot3: function() {
    return Session.get('dot3');
  },
  dot4: function() {
    return Session.get('dot4');
  },
  note: function() {
    return Session.get('note');
  }
});

Template.Visual.events({
  'click #btn1': function(event) {
    event.preventDefault();
    Session.set('dot1', !Session.get('dot1'));
  },
  'click #btn2': function(event) {
    event.preventDefault();
    Session.set('dot2', !Session.get('dot2'));
  },
  'click #btn3': function(event) {
    event.preventDefault();
    Session.set('dot3', !Session.get('dot3'));
  },
  'click #btn4': function(event) {
    event.preventDefault();
    Session.set('dot4', !Session.get('dot4'));
  },
  'change .note': function(event) {
    event.preventDefault();
    Session.set('note', event.target.value);
  }
});

