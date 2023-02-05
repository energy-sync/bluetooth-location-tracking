import { Template } from 'meteor/templating';

Template.tracking.helpers({
  currentLocation() {
    return Session.get('currentLocation');
  },
  locations() {
    return Session.get('locations');
  },
});