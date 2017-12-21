// generate integers in interval (min, max]
function randomRange(min, max) {
  return min + Math.floor(Math.random()*(max-min))+ 1;
}

colours = [
           "#87984d", // olive green
           "#1F6B63", // sea green
           "#73343A", //dark burgundy
           "#B82A39", // pinkish red
           "#f2692d" // orange
]; 

function randomColour() {
  return colours[randomRange(-1,4)];
}

function randomSymbolType(){
  return d3.symbols[randomRange(1, d3.symbols.length - 1)];
}

triangleCoords = [[0,130], [150, 130], [75, 0]];


function xcoord(u,v) {

  return u*triangleCoords[0][0] + v*triangleCoords[1][0] + (1-u-v)*triangleCoords[2][0];
}

function ycoord(u,v) {

  return (u*triangleCoords[0][1] + v*triangleCoords[1][1] + (1-u-v)*triangleCoords[2][1]);
}

function randomSymbolData() {
  u = Math.random();
  v = (1-u)*Math.random();
  return {
           x:xcoord(u,v),
           y:ycoord(u,v)
         };
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

function generateKaleidoscope() {

  var symbols = [];
  var svg = d3.select("#grouped-triangle");
  var paths = document.getElementsByClassName("symbol");
  var pathData = [];

  for(var i=0; i<randomRange(50,60); i++){
    symbols.push(randomSymbolData());
  }

  svg.selectAll("path")
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

generateKaleidoscope();

document.getElementById("kaleidoscope-cover").addEventListener("click", function( event ) {
  d3.selectAll(".symbol").remove();
  generateKaleidoscope();
}, false);









