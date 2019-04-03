let state = {};

let tick = [];
let seaxe = [20,26,1,34,39,7,49,21,78,25,150,152,157,58,57,16,52,77,67,0,43,6,2,66,75,5,19];
let mierce = [45,73,74,56,68,13,62,31,32,64,14,48,47,59,55,50,33,42,41];
let northanhymbre = [76,44,18,79,54,38,63,24,12,17,71,46,131,115,124,117];
let welsh = [153,143,156,151,140,158,142,155,141,149,139,154,144,148,145,138,146,159,147,56,68,25,9,22,37,72,35,3,30,11];


$(document).ready(function() {
  getStateFromServer();
});




var svg;
var projection;
var speed = 2800;//km/sec
var tooltip = d3.select('#map').append('div')
    .attr('class', 'tooltipDestination')
    .style('opacity', 0);


function nationPressEventHandler(dog){
  /*
  if (jQuery.inArray(dog.properties.Province_ID, tick) == -1) {
    tick.push(dog.properties.Province_ID);
    console.log(tick);
  }

  console.log(dog);

  $("#" + dog.properties.Province_ID).css("fill", "#1c9b00");
  */

  //var input = dog.__data__.id;
    //testArr.push(input);
    //console.log(input);

  console.log(dog.properties.Province_ID);

  changeElement(dog.properties);

}

function dogs(dog){
  console.log(dog);
}

function changeElement(data) {
    $("#name").html(data.NAME_2);
    $("#region").html(data.NAME_1);
    $("#id").html(data.Province_ID);
}



function drawMap() {
  var countries, height, path, projection, scale, svg, width;
  var width = 1200;
  var height = 1200;
  var center = [0, 60.6];
  //var center = [6, 68.6];
  var scale = 3000;
  projection = (d3.geoMercator().scale(scale).translate([width / 2, 0]).center(center));
  path = (d3.geoPath().projection(projection));
  svg = (d3.select('#map').append('svg').attr('height', height).attr('width', width).style('background', '#71d1f2'));
  countries = svg.append("g");


    //add london
  svg.append('circle')
    .attr('cx', '810')
    .attr('cy', '870')
    .attr('r', '40px')
    //.attr('fill', 'black')
    .attr('class', 'london')
    .attr('id', (state.config.nations)+1)
    //.attr('onclick', 'nationPressEventHandler(this.__data__)');
    .attr('onclick', 'dogs(this)');
  d3.select((state.config.nations)+1).lower();



  d3.json('static/json/uk.json', function(data) {
    console.log(topojson.feature(data, data.objects.UK));
    countries.selectAll('.country')
    .data(topojson.feature(data, data.objects.UK).features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('data-name', 'dog')
    //.attr('onclick', 'console.log(this.__data__)')
    .attr('onclick', 'nationPressEventHandler(this.__data__)')
    .attr('d', path);
    addID();

    PaintMap();

    return;
  });




    
  var dog = [width - 100, height - 100]

  while (dog[0] > 0 || dog[1] > 0){
    for (let i = 0; i < 11; i++) {
      svg.append('circle')
      .attr('cx', dog[0])
      .attr('cy', height - ( i * 100) - 100)
      .attr('r', '2px')
      .attr('fill', 'black')
      .attr('class', ("c"+i))
      .on('mouseover', function (d) {
          console.log(this)
      });
      
    }
    svg.append('line')
    .attr('x1', dog[0])
    .attr('y1', 0)
    .attr('x2', dog[0])
    .attr('y2', height)
    .attr('style', 'stroke:rgb(255,0,0);stroke-width:1');

    svg.append('line')
    .attr('x1', 0)
    .attr('y1', dog[1])
    .attr('x2', width)
    .attr('y2', dog[1])
    .attr('style', 'stroke:rgb(255,0,0);stroke-width:1');

    //console.log(dog)
    dog[0] -= 100;
    dog[1] -= 100;
  }

    this.svg = svg;
    this.projection = projection;
  };

  this.drawMap();
    $(document).ready(function() {
      $("#test").click(function(){
      //console.log("dog");
          addMarkers();
        });
});
 
function UI_Controller(el){
 
  $(el).toggleClass("UI_Item_hide");

  if ($(el).css("visibility") == 'hidden'){
    $(el).css("visibility", "visible");
   
  }
  else {
    $(el).css("visibility", "hidden");
  }
}

function addID(){
  $(".country").each(function(i, a) {
    //console.log("i: " + i + "a: " + a)
    //console.log(a)
    $(a).attr('id', i);
  });

}

function test(){console.log("dog"); return "dog";}

function PaintMap(dog){
  /*
  $.each(seaxe, function( index, value ) {
    $("#" + value).css("fill", "#5b0000");
  });
  $.each(mierce, function( index, value ) {
    $("#" + value).css("fill", "#06005b");
  });
  $.each(northanhymbre, function( index, value ) {
    $("#" + value).css("fill", "#ff9900");
  });
  $.each(welsh, function( index, value ) {
    $("#" + value).css("fill", "#1c9b00");
  });
  */
}

