import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import './Visual.html';
import './Visual.css';

Template.Visual.events({
  'click .reception-btn'(event) {
    event.preventDefault();
    BlazeLayout.render('patient', {department: 'reception'});
  }
});
