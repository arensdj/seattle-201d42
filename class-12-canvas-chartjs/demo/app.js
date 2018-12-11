'use strict';

Goat.sectionEl = document.getElementById('goat-section');
Goat.leftImgEl = document.getElementById('left-image');
Goat.rightImgEl = document.getElementById('right-image');
Goat.chartContext = document.getElementById('results-chart');

Goat.allGoats = [];

Goat.displayed = [];

Goat.allAltText = [];

Goat.totalVotes = [];

Goat.totalClicks = 0;

function Goat(filepath, altText){
  this.filepath = filepath;
  this.altText = altText;
  this.timesClicked = 0;
  this.timesDisplayed = 0;
  Goat.allGoats.push(this);
  Goat.allAltText.push(this.altText);
}

new Goat('img/cruisin-goat.jpg', 'A goat with special accommodations');
new Goat('img/kissing-goat.jpg', 'Two goats kissing');
new Goat('img/sassy-goat.jpg', 'Goat with an attitude');
new Goat('img/smiling-goat.jpg', 'A smiling goat');
new Goat('img/sweater-goat.jpg', 'Cozy and ready for the winter');
new Goat('img/flower-goat.jpg', 'Flowery goat');
new Goat('img/goatogenic.png', 'A photogenic goat');
new Goat('img/jumping.jpg', 'Jumping goat');
new Goat('img/pushy-goat.jpg', 'He\'s bossy!');
new Goat('img/tongue.jpg', 'Tongue sticking out');
new Goat('img/underbite.jpg', 'Underbite goat');


Goat.random = function() {
  // generate a random number to apply to the index of the array
  // should return us an integer between 0 and the length of the Goat.allGoats array

  // Format #1
  // var random = Math.random() * Goat.allGoats.length;
  // return Math.floor( random );

  // Format #2
  // var random = Math.floor( Math.random() * Goat.allGoats.length );
  // return random;

  // Format #3
  return Math.floor( Math.random() * Goat.allGoats.length );
};

Goat.generateArray = function() {
  var randomIndex = Goat.random();

  while(Goat.displayed.length < 4) {
    if(!Goat.displayed.includes(randomIndex)) {
      Goat.displayed.unshift(randomIndex);
    } else {
      randomIndex = Goat.random();
    }
  }
};

Goat.renderImages = function() {
  Goat.generateArray();

  var firstElement = Goat.displayed[0];
  var secondElement = Goat.displayed[1];
  // console.log('First element in Goat.displayed:', firstElement);
  console.log(`First element in Goat.displayed: ${firstElement}`);

  var leftGoat = Goat.allGoats[firstElement];
  var rightGoat = Goat.allGoats[secondElement];
  // console.log('One random goat from the array of all goats:', leftGoat);
  console.log(`One random goat from the array of all goats: ${leftGoat}`);

  // this is the same:
  // var leftGoat = Goat.allGoats[ Goat.displayed[0] ];

  Goat.leftImgEl.src = leftGoat.filepath;
  Goat.leftImgEl.alt = leftGoat.altText;
  // record which images were displayed
  leftGoat.timesDisplayed++;

  Goat.rightImgEl.src = rightGoat.filepath;
  Goat.rightImgEl.alt = rightGoat.altText;
  // record which images were displayed
  rightGoat.timesDisplayed++;

  console.log(`Goat.displayed before popping: ${Goat.displayed}`);
  // Goat.displayed.pop();
  // Goat.displayed.pop();

  Goat.displayed.splice(2);
};

Goat.handleClick = function(event) {
  // increment a total click counter (Goat.totalClicks)
  Goat.totalClicks++;

  // record which image was selected
  for(var i = 0; i < Goat.allGoats.length; i++) {
    if(event.target.alt === Goat.allGoats[i].altText) {
      Goat.allGoats[i].timesClicked++;
    }
  }

  // get new images
  if(Goat.totalClicks > 9) {
    // stop showing goats
    Goat.sectionEl.removeEventListener('click', Goat.handleClick);
    Goat.updateVotes();
    Goat.displayChart();
  } else {
    // keep showing goats
    Goat.renderImages();
  }
};

Goat.updateVotes = function() {
  // this will populate our array at the end so we can render the chart accurately
  for(var i = 0; i < Goat.allGoats.length; i++) {
    Goat.totalVotes[i] = Goat.allGoats[i].timesClicked;
  }
};


Goat.sectionEl.addEventListener('click', Goat.handleClick);

Goat.renderImages();

Goat.displayChart = function() {
  new Chart(Goat.chartContext, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: Goat.allAltText,  // label for each individual bar
      datasets: [{
        label: 'Votes Per Goat',
        data: Goat.totalVotes, // an array of the number of votes per goat
        backgroundColor: ['red', 'blue', 'green', 'orange', 'pink', 'black', 'red', 'blue', 'green', 'orange', 'pink'],
      }],
    },
    options: {
      scales: {
        yAxes: [{
          tick: {
            beginAtZero: true,
          }
        }]
      }
    }
  });
};
