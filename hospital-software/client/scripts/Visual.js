Template.Visual.onRendered(function() {
  const note = this.find('.note');
  const btn1 = this.find('.btn1');
  const btn2 = this.find('.btn2');
  const btn3 = this.find('.btn3');
  const btn4 = this.find('.btn4');
  const currentLocation = this.find('.Locator p:first-child');

  // add event listeners to the buttons
  btn1.addEventListener('click', function() {
    currentLocation.textContent = 'Current location: Button 1';
  });

  btn2.addEventListener('click', function() {
    currentLocation.textContent = 'Current location: Button 2';
  });

  btn3.addEventListener('click', function() {
    currentLocation.textContent = 'Current location: Button 3';
  });

  btn4.addEventListener('click', function() {
    currentLocation.textContent = 'Current location: Button 4';
  });

  note.addEventListener('input', function(e) {
    const target = e.target;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const value = target.value;

    if (value.slice(-1) === '\n') {
      target.value = value + '- ';
      target.setSelectionRange(start + 2, end + 2);
    }
  });
});
