
bigTriangleCoords = [[0,130], [150, 130], [75, 0]];

// Small triangle coords

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

// Small triangle colours

colours = ["#8A9663", // olive green
           "#1F6B63", // sea green
           "#73343A", //dark burgundy
           "#B82A39", // pinkish red
           "#ed6409"]; // orange

function randomColour() {
  return colours[Math.floor(Math.random() * colours.length)];
}

function smallTriangleData() {

  return {"fill": randomColour(), 
          "opacity": 0.8, 
          "points": randomTrianglePoint() + randomTrianglePoint() + randomTrianglePoint()};

}

// add 7 to 9 triangles

var allSmallTrianglesData = [];

for(var i=0; i<(10 - (Math.floor(Math.random()*3))); i++){
  allSmallTrianglesData.push(smallTriangleData());
}

var smallTriangles = d3.select("#grouped-triangle").selectAll(".small-triangle")
		     .data(allSmallTrianglesData);

var smallTrianglesEnter = smallTriangles.enter().append("polygon");

smallTrianglesEnter.attr("points", function(d) { return d.points });
smallTrianglesEnter.attr("fill", function(d) {return d.fill });
smallTrianglesEnter.attr("opacity", function(d) {return d.opacity });








































