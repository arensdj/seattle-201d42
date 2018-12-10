'use strict';

// access the img element from the DOM
Goat.imgElement = document.getElementById('goat-pic');

// store our goats in an array
Goat.allGoats = [];

// constructor function to make Goat instances
function Goat(filepath, description) {
  this.url = filepath;
  this.altText = description;
  Goat.allGoats.push(this);
}

// make our Goat instances
new Goat('img/cruisin-goat.jpg', 'A goat with special accommodations');
new Goat('img/kissing-goat.jpg', 'Two goats kissing');
new Goat('img/sassy-goat.jpg', 'Goat with an attitude');
new Goat('img/smiling-goat.jpg', 'A smiling goat');
new Goat('img/sweater-goat.jpg', 'Cozy and ready for the winter');

Goat.randomNum = function() {
  // randomly generate a number
  var random = Math.random() * Goat.allGoats.length;
  var roundedDown = Math.floor(random);
  return roundedDown;
};

Goat.renderGoat = function() {
  var randomIndex = Goat.randomNum();

  var randomGoat = Goat.allGoats[randomIndex];

  // modify the alt attribute of the img element
  Goat.imgElement.alt = randomGoat.altText;

  // modify the src attribute of the img element
  Goat.imgElement.src = randomGoat.url;
};

// render a random goat on page load
Goat.renderGoat();

// listen to the img element
Goat.imgElement.addEventListener('click', Goat.renderGoat);
