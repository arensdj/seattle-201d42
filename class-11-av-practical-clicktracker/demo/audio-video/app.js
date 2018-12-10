'use strict';

var seinfeldButton = document.getElementById('seinfeld-button');
var seinfeldPlayer = document.getElementById('seinfeld-player');

console.log(seinfeldPlayer);

seinfeldButton.addEventListener('click', function() {
  seinfeldPlayer.volume = Math.random();
});

// audio {
//   src: 'assets/seinfeld.mp3',
//   autoplay: true,
//   controls: true,
//   volume: Math.random()
// }
