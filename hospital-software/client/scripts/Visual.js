import { Template } from 'meteor/templating';
import './Visual.html';
import './Visual.css';

Template.Visual.events({
  'click .btn1': function() {
    const currentLocation = document.querySelector('.Locator p:first-child');
    currentLocation.textContent = 'Current location: Reception';
    showQuestions();
  },

  'click .btn2': function() {
    const currentLocation = document.querySelector('.Locator p:first-child');
    currentLocation.textContent = 'Current location: Lab';
  },

  'click .btn3': function() {
    const currentLocation = document.querySelector('.Locator p:first-child');
    currentLocation.textContent = 'Current location: Practioner';
  },

  'click .btn4': function() {
    const currentLocation = document.querySelector('.Locator p:first-child');
    currentLocation.textContent = 'Current location: Dermatology';
  }
});

function showQuestions() {
  const questions = ['What is your name?', 
  'What is your date of birth?', 
  'What is your address?',
  'What is the reason for your visit?'
  ];
  
  const popup = document.createElement('div');
  popup.className = 'popup';

  const header = document.createElement('h2');
  header.textContent = 'Questions';

  const list = document.createElement('ul');
  questions.forEach(function(question) {
    const listItem = document.createElement('li');
    listItem.textContent = question;
    list.appendChild(listItem);
  });

  popup.appendChild(header);
  popup.appendChild(list);
  document.body.appendChild(popup);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  popup.appendChild(closeButton);

  closeButton.addEventListener('click', function() {
    document.body.removeChild(popup);
  });
}

