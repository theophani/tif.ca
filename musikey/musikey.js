// I took these audio files from
// http://labs.dinahmoe.com/plink/
// which is an AWESOME toy

"use strict";

(function () {

///////

  var goAhead = function (context) {

    var musicbox = document.createElement('div');
    musicbox.style.display = 'none';
    musicbox.innerHTML ='<audio src="" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey1.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey2.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey3.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey4.ogg" /> ' +

                        '<audio src="http://tif.ca/musikey/musikey5.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey6.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey7.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey8.ogg" /> ' +

                        '<audio src="http://tif.ca/musikey/musikey9.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey10.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey11.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey12.ogg" /> ' +

                        '<audio src="http://tif.ca/musikey/musikey13.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey14.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey15.ogg" /> ' +
                        '<audio src="http://tif.ca/musikey/musikey16.ogg" /> ';

    document.body.appendChild(musicbox);

    var sounds = document.getElementsByTagName('audio');

    var playSound =  function (buffer, at) {
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
      90: 13, // y x c v
      88: 14,
      67: 15,
      86: 16
      ,
      53:  5, // 5 6 7 8
      54:  6,
      55:  7,
      56:  8,
      57:  9, // 9 0
      48: 10
      ,
      84:  9, // t y u i
      89: 10,
      85: 11,
      73: 12,
      79: 13, // o p
      80: 14
      ,
      71: 13, // g h j k
      72: 14,
      74: 15,
      75: 16,
      76:  1  // l
      ,

      66:  1, // b n m
      78:  2,
      77:  3
    };

    // requires keyMap, playSound and highlightKey in globel scope
    document.addEventListener('keydown', function (e) {
      if (keyMap[e.keyCode]) {
        sounds[keyMap[e.keyCode]].play();
      }
    });

  };

  function loadMusikey (el) {
    try {
      var context = new AudioContext();
      document.body.removeChild(el);
      goAhead(context);
    } catch (e) {
      el.innerHTML = 'Sorry, musikey isn’t working :/';
    }
  }

  var el = document.createElement('p');
  el.style.position = 'fixed';
  el.style.top = '0';
  el.style.left = '0';
  el.style.backgroundColor = 'white';
  el.style.color = 'black';
  el.style.display = 'block';
  el.style.padding = '10px';
  el.style.textShadow = '#eee 1px 1px 1px';
  el.innerHTML = 'Click here to turn on musikey';
  document.body.appendChild(el);

  el.addEventListener('click', function () {
    loadMusikey(el);
  });

} ());
