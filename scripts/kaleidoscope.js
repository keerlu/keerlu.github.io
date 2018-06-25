'use strict';

// generate integers in interval (min, max]
function randomRange(min, max) {
  return min + Math.floor(Math.random()*(max-min))+ 1;
}

var colours = [
           "#87b24e", // olive green
           "#1F6B63", // sea green
           "#772837", //dark burgundy
           "#d10c30", // pinkish red
           "#ff5900" // orange
]; 

function randomColour() {
  return colours[randomRange(-1,4)];
}

function randomSymbolType(){
  return d3.symbols[randomRange(1, d3.symbols.length - 1)];
}

var triangleCoords = [[0,130], [150, 130], [75, 0]];

function xcoord(u,v) {

  return u*triangleCoords[0][0] + v*triangleCoords[1][0] + (1-u-v)*triangleCoords[2][0];
}

function ycoord(u,v) {

  return (u*triangleCoords[0][1] + v*triangleCoords[1][1] + (1-u-v)*triangleCoords[2][1]);
}

function randomSymbolData() {
  var u = Math.random();
  var v = (1-u)*Math.random();
  return {
           x:xcoord(u,v),
           y:ycoord(u,v)
         };
}

function getCoords(path) {
    
  var coordsList = [];
  var lastIndex;

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

  for(let i=0; i< coordsList.length; i++){

    var x = coordsList[i].x;
    var y = coordsList[i].y;

    coordsList[i].x = x*Math.cos(rotate) - y*Math.sin(rotate);
    coordsList[i].y = x*Math.sin(rotate) + y*Math.cos(rotate);

    coordsList[i].x += xtranslate;
    coordsList[i].y += ytranslate;  

  }

  return coordsList; 

}

function isInsideTriangle(x,y){
  return (y <= 130) && (y >= 130 - (130*x/75)) && (y >= -130 + (130*x/75));
}

function allPointsInsideTriangle(coords){
  var allPointsInside = true;
  for (var i=0; i<coords.length; i++){
    if(!(isInsideTriangle(coords[i].x, coords[i].y))) {
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
   
  for(var i=0; i<randomRange(40,50); i++){
    symbols.push(randomSymbolData());
  }

  svg.selectAll(".kaleidoscope-shapes").selectAll("path")
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
    .attr("opacity", 0.8)
    .attr("transform", function(d) {
     return "translate(" + d.x + "," + d.y + ") rotate(" + randomRange(0,360) + ")";
    });
    
  paths = document.getElementsByClassName("symbol");

  for(var j=0; j<paths.length; j++){
    pathData.push(paths[j].getPathData());
  }

  for(var k=0; k<paths.length; k++){
    symbols[k]["allPointsInsideTriangle"] = allPointsInsideTriangle(getCoords(paths[k]));
  }

  svg.selectAll(".symbol")
    .data(symbols)
    .attr("display", function(d) {            
              if (!d.allPointsInsideTriangle) {return "none";} 
         })
    .attr("class", function(d) {
       if(!d.allPointsInsideTriangle) {return "to-remove";}
       else{return "symbol";}
         });

  svg.selectAll(".to-remove").remove();      

}

function clone(selector) {
    var node = d3.select(selector).node();
    return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
}

generateKaleidoscope();

function newHexagon(xpos, ypos){
  var x = 0;
  var y = 0;

  if (ypos % 2 === 0){
    x = 260*xpos;
    y = 150 + 225*ypos;
  }
  else if (ypos % 2 === 1){
    x = 130 + 260*xpos;
    y = 375 + 225*(ypos-1);
  }
  
  var transform = "translate(" + x + "," + y + ") rotate(30)";
  return clone("#hexagon").attr("transform", transform);
}

// Centre 1
newHexagon(1,1).attr("fill-opacity","0.2").attr("stroke-opacity", "1");
// Ring 1
newHexagon(1,0).attr("fill-opacity","0.1").attr("stroke-opacity", "0.5");
newHexagon(2,0).attr("fill-opacity","0.1").attr("stroke-opacity", "0.5");
newHexagon(0,1).attr("fill-opacity","0.1").attr("stroke-opacity", "0.5");
newHexagon(2,1).attr("fill-opacity","0.1").attr("stroke-opacity", "0.5");
newHexagon(1,2).attr("fill-opacity","0.1").attr("stroke-opacity", "0.5");
newHexagon(2,2).attr("fill-opacity","0.1").attr("stroke-opacity", "0.5");

// Centre 2
newHexagon(6,2).attr("fill-opacity","0.2").attr("stroke-opacity", "1");
// Ring 2
newHexagon(5,1).attr("fill-opacity","0.1").attr("stroke-opacity", "0.5");
newHexagon(6,1).attr("fill-opacity","0.1").attr("stroke-opacity", "0.5");
newHexagon(5,2).attr("fill-opacity","0.1").attr("stroke-opacity", "0.5");
newHexagon(5,3).attr("fill-opacity","0.1").attr("stroke-opacity", "0.5");
newHexagon(6,3).attr("fill-opacity","0.1").attr("stroke-opacity", "0.5");

// The rest

for (let i=3; i<7; i++){
  newHexagon(i,0);
}

for (let i=3; i<5; i++){
  newHexagon(i,1);
}

newHexagon(0,2);

for (let i=3; i<5; i++){
  newHexagon(i,2);
}

for (let i=0; i<5; i++){
  newHexagon(i,3);
}

for (let i=0; i<7; i++){
  newHexagon(i,4);
}

document.getElementById("kaleidoscope-container").addEventListener("click", function( event ) {
  d3.selectAll(".kaleidoscope-shapes").remove();
  d3.select("#grouped-triangle").append("g")
    .attr("class", "kaleidoscope-shapes");
  generateKaleidoscope();
}, false);








