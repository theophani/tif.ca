"use strict";

var context;

var ready = function (sounds) {
  // allow the user to see the interface, indicating that they can play now
  document.body.className = 'loaded';
  playSound(sounds['woody1']);
};

var soundHash = (function () {
  var hash = {};
  for (var i = 1; i < 17; i++) {
    hash['woody'+i] = 'woody_'+i+'.ogg';
  }
  return hash;
}());

// requires context to exist in global scope
var playSound = function (buffer, at) {
  at = at || 0;
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(at);                          // play the source at time 'a'
};

var keyMap = {
  49:  1, // 1 2 3 4
  50:  2,
  51:  3,
  52:  4,
  81:  5, // q w e r
  87:  6,
  69:  7,
  82:  8,
  65:  9, // a s d f
  83: 10,
  68: 11,
  70: 12,
  89: 13, // y x c v
  90: 13, // z
  88: 14,
  67: 15,
  86: 16
};

// requires context and playSound to exist in global scope
var playSequence = function (sequence, tempo, bars, beats) {
  tempo = tempo || 180; // BPM (beats per minute)
  bars = bars || 1;
  beats = beats || 8;

  var eighthNoteTime = (60 / tempo) / 2;

  // delayed start
  var startTime = context.currentTime + 0.100;

  // Play x bars of the sequence:
  for (var bar = 0; bar < bars; bar++) {
    var time = startTime + bar * beats * eighthNoteTime;
    sequence.forEach(function (track) {
      track.beats.forEach( function (hit, i) {
        if (hit) {
          playSound(track.sound, i * eighthNoteTime + time);
        }
      });
    });
  }
};

var sequentialize = function (tracks, samples) {
  var sequence = [];
  for (instrument in tracks) {
    sequence.push({
      sound: samples[instrument],
      beats: tracks[instrument]
     });
  }
  return sequence;
};

// requires playSequence and sequentialize to exist in global scope
var play = function (tracks, samples, tempo, bars, beats) {
  var maxBeats = 0;
  if (!beats) {
    for (track in tracks) {
      if (tracks[track].length > maxBeats) {
        maxBeats = tracks[track].length;
      }
    }
    beats = maxBeats;
  }
  playSequence(sequentialize(tracks, samples), tempo, bars, beats);
};

var colours = [
  '',
  'yellow',
  'green',
  'blue',
  'red',
  'pink',
  'orange'
];

var nextColour =  function (colours, colour) {
  colour = colour || '';
  var index = colours.indexOf(colour) + 1;
  if (index < colours.length)
    return colours[index];
  else
   return colours[0];
};

// requires nextColour to exist in global scope
var highlightKey = function (key) {
  var el = document.getElementById('key'+key);
  var currentColour = el.style.backgroundColor;
  el.style.backgroundColor =  nextColour(colours, currentColour);
};

var loadMarimba = function (e) {
  e.stopPropagation();

  var AudioContext = window.AudioContext || window.webkitAudioContext;

  try {
    context = new AudioContext();

    var sounds = loadSounds(soundHash, ready);

    var playAndHighlight = function (key) {
      if (key) {
        playSound(sounds['woody'+ key]);
        highlightKey(key);
      }
    };

    document.addEventListener('keydown', function (e) {
      var key = keyMap[e.keyCode];
      playAndHighlight(key);
    });

    document.addEventListener('touchstart', function (e) {
      var key = e.target.id.replace(/key/, '');
      playAndHighlight(key);
    });
  } catch (e) {
    var el = document.createElement('p');
    el.innerHTML = 'Sorry, this isn’t working :/';
    el.innerHTML += `<pre>${e}</pre>`;

    document.body.appendChild(el);
  }

  document.body.removeChild(instructions);
};

instructions.ontouchstart = loadMarimba;
instructions.onclick = loadMarimba;
