colours = ["#87984d", // olive green
           "#1F6B63", // sea green
           "#73343A", //dark burgundy
           "#B82A39", // pinkish red
           "#ed6409"]; // orange

function randomColour() {
  return colours[Math.floor(Math.random() * colours.length)];
}

// generate integers in interval (min, max]
function randomRange(min, max) {
  return min + Math.floor(Math.random()*(max-min))+ 1;
}

// generate random symbols

var symbolTypes = d3.symbols;

function randomSymbolType(){
  return d3.symbols[randomRange(1, d3.symbols.length - 1)];}



// tests if point is inside triangle
function isInsideTriangle(x,y){
  return (y <= 130) && (y >= 130 - (130*x/75)) && (y >= -130 + (130*x/75));
}

function allPointsInsideTriangle(coords){
  var allPointsInside = true;
  var i;
  for (i=0; i<coords.length; i++){
    if(!(isInsideTriangle(coords[i].x, coords[i].y))) {
      allPointsInside = allPointsInside && false;
    }
  }  

  return allPointsInside;
}

bigTriangleCoords = [[0,130], [150, 130], [75, 0]];


function xcoord(u,v) {

  return u*bigTriangleCoords[0][0] + v*bigTriangleCoords[1][0] + (1-u-v)*bigTriangleCoords[2][0];

  // return randomRange(0,150);
}

function ycoord(u,v) {

  return (u*bigTriangleCoords[0][1] + v*bigTriangleCoords[1][1] + (1-u-v)*bigTriangleCoords[2][1]);

  // return randomRange(0,130);
}

function randomSymbolData() {
  u = Math.random();
  v = (1-u)*Math.random();
  return {
           x:xcoord(u,v),
           y:ycoord(u,v)
         };
}

var symbols = [];

for(var i=0; i<randomRange(50,60); i++){
  symbols.push(randomSymbolData());
}


function getCoords(path) {
    
  var coordsList = [];

  for (let seg of path.getPathData()) {
    if (seg.type === "M") {
      let [x, y] = seg.values;
      coordsList.push({x:x, y:y});
    }
    else if (seg.type === "L") {
      lastIndex = coordsList.length - 1;
      let [x, y] = seg.values;
      coordsList.push({x:x,y:y});
    }
    else if (seg.type === "h") {
      lastIndex = coordsList.length - 1;  
      let [x, y] = [coordsList[lastIndex].x, coordsList[lastIndex].y];
      let dx = seg.values[0];
      coordsList.push({x:x+dx,y:y});
    }
    else if (seg.type === "v") {
      lastIndex = coordsList.length - 1;
      let [x, y] = [coordsList[lastIndex].x, coordsList[lastIndex].y];
      let dy = seg.values[0];
      coordsList.push({x:x,y:y+dy});
    }

  }

  var transform = path.getAttribute("transform");
  
  var xtranslate = parseFloat(transform.slice(transform.indexOf("(") + 1, transform.indexOf(",")));

  var ytranslate = parseFloat(transform.slice(transform.indexOf(",") + 1, transform.indexOf(")")));

  var rotate = (Math.PI / 180)*parseFloat(transform.slice(transform.indexOf("rotate(") + "rotate(".length, -1));

  for(i=0; i< coordsList.length; i++){

    var x = coordsList[i].x;
    var y = coordsList[i].y;

    coordsList[i].x = x*Math.cos(rotate) - y*Math.sin(rotate);
    coordsList[i].y = x*Math.sin(rotate) + y*Math.cos(rotate);

    coordsList[i].x += xtranslate;
    coordsList[i].y += ytranslate;  

  }

  return coordsList; 

}

var svg = d3.select("#grouped-triangle");

var shapes = svg.selectAll("path")
  .data(symbols)
  .enter()
  .append("path")
  .attr("class", "symbol")
  .attr("d", d3.symbol()
     .size(function(d) { return randomRange(700, 1400); } )
     .type(function(d) { return randomSymbolType(); } )) 
  .attr("fill", function(d) {
    return randomColour();})
  .attr("stroke", "black")
  .attr("stroke-width", 1)
  .attr("opacity", 0)
  .attr("transform", function(d) {
   return "translate(" + d.x + "," + d.y + ") rotate(" + randomRange(0,360) + ")";
  });

var paths = document.getElementsByClassName("symbol");

var pathData = [];

for(var i=0; i<paths.length; i++){
  pathData.push(paths[i].getPathData());
};

for(var j=0; j<paths.length; j++){
  symbols[j]["isInsideTriangle"] = allPointsInsideTriangle(getCoords(paths[j]));
};

var shapesInTriangle = svg.selectAll(".symbol")
  .data(symbols)
  .attr("opacity", function(d) {            
            if (d.isInsideTriangle) {return 0.8} 
            else    { return 0 } 
       ;}
);













