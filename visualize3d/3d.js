/*
* Author: Tiffany Conroy
* RE: http://twitter.com/#!/smashingmag/status/14792918153830400
*
* Lots of help from here:
* http://24ways.org/2010/intro-to-css-3d-transforms
* http://9elements.com/html5demos/matrix3d/
* http://www.eleqtriq.com/2010/05/css-3d-matrix-transformations/
* ps: thx fronx :)
*/
(function(){

  var doc = document;
  var elem, thea;
  var r = 40; // rotation, in degrees

  var attachButtonHandler = function (button, handler) {

    button.addEventListener('click', function () {
      handler();
    });

    button.addEventListener('keypress', function () {
      handler();
    });

    button.addEventListener('mousedown', function () {
      var buttonDown = setInterval(handler, 40);

      button.addEventListener('mouseup', function () {
        clearInterval(buttonDown);
      });
    });

    button.addEventListener('touchstart', function () {
      var buttonDown = setInterval(handler, 40);

      button.addEventListener('touchend', function () {
        clearInterval(buttonDown);
      });
    });
  };

  // calc max DOM depth of a collection of children
  var plumb = function (children, depth, deepest) {
    deepest = Math.max(depth, deepest);
    Array.prototype.forEach.call(children, function (item, i) {
      deepest = plumb(children[i].childNodes, depth + 1, deepest);
    });
    return deepest;
  };

  // translation, in pixels
  var d = 500 / plumb(document.body.childNodes, 1, 0);

  var insertStyles = function (d, r, skew) {
    // create and insert a style element
    elem = doc.createElement('style');
    elem.title = 'theophani3D';
    elem.innerHTML = (function () {
      var s; // the styles
      s  = 'body { -webkit-transform: rotateY(40deg) skewY(-10deg); -webkit-transform-style: preserve-3d; } ';
      s += 'body > * { opacity: 0.9; } ';
      s += 'body * { -webkit-transform: translate3d(0,0,'+d+'px); -webkit-transform-style: preserve-3d; } ';
      s += 'body div:hover { opacity: 1; background-color: rgba(255, 255, 0, 0.1) !important; } ';
      s += 'body div:hover * { background-color: none; } ';
      s += '#theophani3D { position: fixed; padding: 20px; left: 50%; top: 400px; width: 600px; margin-left: -321px; } ';
      s += '#theophani3D { opacity: 1; background: #fff !important; border: 1px solid #222; } ';
      s += '#theophani3D { -webkit-transform: matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,401,1); z-index: 1000000; -webkit-transform-style: flat; } ';
      s += '#theophani3D span { display: block; line-height: 1.5em; margin: 0; padding: 0; } ';
      s += '#theophani3D span { color: #333 !important; font-size: 18px; text-shadow: none; } ';
      s += '#theophani3D span { font-family: \'Lucida Sans\', \'Lucida Grande\', \'Lucida Sans Unicode\', sans-serif; } ';
      return s;
    }());
    doc.body.appendChild(elem);
  };

  var rotate = (function (r) {

    return function (direction) {
      if (direction === 'left' && r > -90) { r = r - 1; }
      if (direction === 'right'  && r < 90) { r = r + 1; }
      var skew = (r/40) * 10;
      document.body.style.webkitTransform = "rotateY(" + r + "deg) skewY(" + (-1) * skew + "deg)";
      return r;
    };

  }(r));

  var extrude = (function (d) {
    insertStyles(d, r, 10);

    // creates and stores a CSSStyleRule with selector 'body
    var rule = (function () {
      var sheets = document.styleSheets;
      var i = sheets.length - 1;
      var r;

      while (sheets[i].title != 'theophani3D' && i > -1) { i--; }

      r = sheets[i].cssRules.length;

      sheets[i].insertRule('body * {}', r);

      return sheets[i].cssRules[r].style;
    }());

    return function (direction) {
      if (direction === 'in' && d > 0)    { d = d - 1; }
      if (direction === 'out' && d < 500) { d = d + 1; }
      rule.cssText = "-webkit-transform: translate3d(0,0," + d + "px); -moz-transform: translate3d(0,0," + d + "px); ";
      return d;
    };
  }(d));

  // create and insert the div containing instructions
  thea = document.createElement('div');
  thea.id = 'theophani3D';
  thea.innerHTML = (function(){
    var s; // the prompt/instructions
    s  = '<span>Use left and right arrows to rotate</span>';
    s += '<span>Use + and - to increase and decrease the distance between layers</span>';
    return s;
  }());
  doc.body.appendChild(thea);

  doc.addEventListener("keydown", function (e) {
    if (e.keyCode === 37)  { return rotate('left'); }
    if (e.keyCode === 39)  { return rotate('right'); }

    if (e.keyCode === 189) { return extrude('in'); }
    if (e.keyCode === 187) { return extrude('out'); }
    return;
  });

}());
