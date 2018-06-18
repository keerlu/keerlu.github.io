'use strict';

// generate integers in interval (min, max]

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function randomRange(min, max) {
  return min + Math.floor(Math.random() * (max - min)) + 1;
}

var colours = ["#87b24e", // olive green
"#1F6B63", // sea green
"#772837", //dark burgundy
"#d10c30", // pinkish red
"#ff5900" // orange
];

function randomColour() {
  return colours[randomRange(-1, 4)];
}

function randomSymbolType() {
  return d3.symbols[randomRange(1, d3.symbols.length - 1)];
}

var triangleCoords = [[0, 130], [150, 130], [75, 0]];

function xcoord(u, v) {

  return u * triangleCoords[0][0] + v * triangleCoords[1][0] + (1 - u - v) * triangleCoords[2][0];
}

function ycoord(u, v) {

  return u * triangleCoords[0][1] + v * triangleCoords[1][1] + (1 - u - v) * triangleCoords[2][1];
}

function randomSymbolData() {
  var u = Math.random();
  var v = (1 - u) * Math.random();
  return {
    x: xcoord(u, v),
    y: ycoord(u, v)
  };
}

function getCoords(path) {

  var coordsList = [];
  var lastIndex;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = path.getPathData()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var seg = _step.value;

      if (seg.type === "M") {
        var _seg$values = _slicedToArray(seg.values, 2),
            _x = _seg$values[0],
            _y = _seg$values[1];

        coordsList.push({ x: _x, y: _y });
      } else if (seg.type === "L") {
        lastIndex = coordsList.length - 1;

        var _seg$values2 = _slicedToArray(seg.values, 2),
            _x2 = _seg$values2[0],
            _y2 = _seg$values2[1];

        coordsList.push({ x: _x2, y: _y2 });
      } else if (seg.type === "h") {
        lastIndex = coordsList.length - 1;
        var _ref = [coordsList[lastIndex].x, coordsList[lastIndex].y],
            _x3 = _ref[0],
            _y3 = _ref[1];

        var dx = seg.values[0];
        coordsList.push({ x: _x3 + dx, y: _y3 });
      } else if (seg.type === "v") {
        lastIndex = coordsList.length - 1;
        var _ref2 = [coordsList[lastIndex].x, coordsList[lastIndex].y],
            _x4 = _ref2[0],
            _y4 = _ref2[1];

        var dy = seg.values[0];
        coordsList.push({ x: _x4, y: _y4 + dy });
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var transform = path.getAttribute("transform");

  var xtranslate = parseFloat(transform.slice(transform.indexOf("(") + 1, transform.indexOf(",")));

  var ytranslate = parseFloat(transform.slice(transform.indexOf(",") + 1, transform.indexOf(")")));

  var rotate = Math.PI / 180 * parseFloat(transform.slice(transform.indexOf("rotate(") + "rotate(".length, -1));

  for (var i = 0; i < coordsList.length; i++) {

    var x = coordsList[i].x;
    var y = coordsList[i].y;

    coordsList[i].x = x * Math.cos(rotate) - y * Math.sin(rotate);
    coordsList[i].y = x * Math.sin(rotate) + y * Math.cos(rotate);

    coordsList[i].x += xtranslate;
    coordsList[i].y += ytranslate;
  }

  return coordsList;
}

function isInsideTriangle(x, y) {
  return y <= 130 && y >= 130 - 130 * x / 75 && y >= -130 + 130 * x / 75;
}

function allPointsInsideTriangle(coords) {
  var allPointsInside = true;
  for (var i = 0; i < coords.length; i++) {
    if (!isInsideTriangle(coords[i].x, coords[i].y)) {
      allPointsInside = allPointsInside && false;
    }
  }

  return allPointsInside;
}

function generateKaleidoscope() {

  var symbols = [];
  var pathData = [];
  var paths;
  var svg = d3.select("#grouped-triangle");

  //  svg.append("g")
  //     .attr("class", "kaleidoscope-shapes");

  for (var i = 0; i < randomRange(40, 50); i++) {
    symbols.push(randomSymbolData());
  }

  svg.selectAll(".kaleidoscope-shapes").selectAll("path").data(symbols).enter().append("path").attr("class", "symbol").attr("d", d3.symbol().size(function (d) {
    return randomRange(700, 1400);
  }).type(function (d) {
    return randomSymbolType();
  })).attr("fill", function (d) {
    return randomColour();
  }).attr("stroke", "black").attr("stroke-width", 1).attr("opacity", 0.8).attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ") rotate(" + randomRange(0, 360) + ")";
  });

  paths = document.getElementsByClassName("symbol");

  for (var j = 0; j < paths.length; j++) {
    pathData.push(paths[j].getPathData());
  }

  for (var k = 0; k < paths.length; k++) {
    symbols[k]["allPointsInsideTriangle"] = allPointsInsideTriangle(getCoords(paths[k]));
  }

  svg.selectAll(".symbol").data(symbols).attr("display", function (d) {
    if (!d.allPointsInsideTriangle) {
      return "none";
    }
  }).attr("class", function (d) {
    if (!d.allPointsInsideTriangle) {
      return "to-remove";
    } else {
      return "symbol";
    }
  });

  svg.selectAll(".to-remove").remove();
}

generateKaleidoscope();

document.getElementById("kaleidoscope-container").addEventListener("click", function (event) {
  d3.selectAll(".kaleidoscope-shapes").remove();
  d3.select("#grouped-triangle").append("g").attr("class", "kaleidoscope-shapes");
  generateKaleidoscope();
}, false);