'use strict';

Goat.sectionEl = document.getElementById('goat-section');
Goat.leftImgEl = document.getElementById('left-image');
Goat.rightImgEl = document.getElementById('right-image');
Goat.chartContext = document.getElementById('results-chart');

Goat.barButton = document.getElementById('bar');
Goat.doughnutButton = document.getElementById('doughnut');
Goat.polarAreaButton = document.getElementById('polarArea');

Goat.allGoats = [];

Goat.displayed = [];

Goat.allAltText = [];

Goat.totalVotes = [];

Goat.totalClicks = 0;

Goat.parsedGoats = JSON.parse( localStorage.getItem('userResults') );

function Goat(filepath, altText){
  this.filepath = filepath;
  this.altText = altText;
  this.timesClicked = 0;
  this.timesDisplayed = 0;
  Goat.allAltText.push(this.altText);
}

Goat.allGoats = Goat.parsedGoats || [
  new Goat('img/cruisin-goat.jpg', 'A goat with special accommodations'),
  new Goat('img/kissing-goat.jpg', 'Two goats kissing'),
  new Goat('img/sassy-goat.jpg', 'Goat with an attitude'),
  new Goat('img/smiling-goat.jpg', 'A smiling goat'),
  new Goat('img/sweater-goat.jpg', 'Cozy and ready for the winter'),
  new Goat('img/flower-goat.jpg', 'Flowery goat'),
  new Goat('img/goatogenic.png', 'A photogenic goat'),
  new Goat('img/jumping.jpg', 'Jumping goat'),
  new Goat('img/pushy-goat.jpg', 'He\'s bossy!'),
  new Goat('img/tongue.jpg', 'Tongue sticking out'),
  new Goat('img/underbite.jpg', 'Underbite goat'),
];


Goat.random = function() {
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

  var leftGoat = Goat.allGoats[firstElement];
  var rightGoat = Goat.allGoats[secondElement];


  Goat.leftImgEl.src = leftGoat.filepath;
  Goat.leftImgEl.alt = leftGoat.altText;
  leftGoat.timesDisplayed++;

  Goat.rightImgEl.src = rightGoat.filepath;
  Goat.rightImgEl.alt = rightGoat.altText;
  rightGoat.timesDisplayed++;

  Goat.displayed.splice(2);
};

Goat.handleClick = function(event) {
  Goat.totalClicks++;

  for(var i = 0; i < Goat.allGoats.length; i++) {
    if(event.target.alt === Goat.allGoats[i].altText) {
      Goat.allGoats[i].timesClicked++;
    }
  }

  if(Goat.totalClicks > 9) {
    Goat.sectionEl.removeEventListener('click', Goat.handleClick);
    Goat.updateVotes();

    // var stringifiedGoats = JSON.stringify(Goat.allGoats);
    // localStorage.setItem('userResults', stringifiedGoats);

    localStorage.setItem('userResults', JSON.stringify(Goat.allGoats));
  } else {
    Goat.renderImages();
  }
};

Goat.updateVotes = function() {
  for(var i = 0; i < Goat.allGoats.length; i++) {
    Goat.totalVotes[i] = Goat.allGoats[i].timesClicked;
  }
};

Goat.renderImages();

Goat.results;

Goat.displayChart = function(event) {
  console.log(event.target);
  var chartType = event.target.id;

  if(Goat.results) Goat.results.destroy();

  Goat.results = new Chart(Goat.chartContext, {
    type: chartType,
    data: {
      labels: Goat.allAltText,
      datasets: [{
        label: 'Votes Per Goat',
        data: Goat.totalVotes,
        backgroundColor: ['red', 'blue', 'green', 'orange', 'pink', 'black', 'red', 'blue', 'green', 'orange', 'pink'],
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          }
        }],
        xAxes: [{
          ticks: {
            stepSize: 1,
            autoskip: false,
            minRotation: 90,
            maxRotation: 90
          }
        }]
      }
    }
  });
};


Goat.sectionEl.addEventListener('click', Goat.handleClick);

Goat.barButton.addEventListener('click', Goat.displayChart);
Goat.doughnutButton.addEventListener('click', Goat.displayChart);
Goat.polarAreaButton.addEventListener('click', Goat.displayChart);
