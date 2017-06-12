var svg = d3.select("svg");

bigTriangleCoords = [[0,260], [300, 260], [150, 0]];

var ax = 0;
var ay = 260;

var bx = 300;
var by = 260;

var cx = 150;
var cy = 0;

function parametriseTriangle(param) {
  u = param[0];
  v = param[1];
  
  xcoord = u*bigTriangleCoords[0][0] + v*bigTriangleCoords[1][0] + (1-u-v)*bigTriangleCoords[2][0];

  ycoord = u*bigTriangleCoords[0][1] + v*bigTriangleCoords[1][1] + (1-u-v)*bigTriangleCoords[2][1];

  return xcoord + "," + ycoord + " "; 
}

function randomParam() {
  u = Math.random();
  v = (1-u)*Math.random();
  return [u, v];
}

function randomTrianglePoint() {
  return parametriseTriangle(randomParam());
}

var smallTriangleData = [
  {"fill": "green", 
   "stroke": "black", 
   "stroke-width": 2, 
   "points": randomTrianglePoint() + randomTrianglePoint() + randomTrianglePoint()}
];

var smallTriangle = svg.selectAll(".small-triangle")
		     .data(smallTriangleData);

var smallTriangleEnter = smallTriangle.enter().append("polygon");

smallTriangleEnter.attr("points", function(d) { return d.points });
smallTriangleEnter.attr("fill", function(d) {return d.fill });
smallTriangleEnter.attr("stroke", function(d) {return d.stroke });


// next: vary number of triangles, and/or work out how to get nicer shapes







































