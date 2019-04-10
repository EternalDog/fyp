//r00137275
let tick = [];
let player = {};

//let state = 0;

$(document).ready(function() {
  //getStateFromServer();
});

var svg;
var projection;
var speed = 2800;//km/sec
var tooltip = d3.select('#map').append('div')
    .attr('class', 'tooltipDestination')
    .style('opacity', 0);

function ProvincePressEventHandler(dog){
  /*
  if (jQuery.inArray(dog, tick) == -1) {
    tick.push(dog);
    console.log(tick);
  }
  console.log(dog);
  $("#" + dog).css("fill", "black"); */
  console.log(dog);
  changeElement(dog);
}

function changeElement(dog) {
  $("#name").html(state.provinces[dog].name);
  $("#id").html("DEBUG: " + dog);
  $("#owner").html(state.provinces[dog].owner);
  $("#pop").html(state.provinces[dog].pop);
}

function RightClickEventHandler(dog){
  //var el = $("#" + dog); 
  //console.log("right click event at: " + dog);
  //console.log(el);
  console.log(d3.mouse(svg.node));

  hover.transition().duration(200).style("opacity", .9);
  hover.html(new Date(d.creationDate)+": "+d.reactionTime).style("left", d3.event.pageX+"px").style("top", (d3.event.pageY - 28)+"px");



  return false;
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
    .attr('cy', '865')
    .attr('r', '25px')
    .attr('class', 'london')
    .attr('id', '160')
    .attr('onclick', 'nationPressEventHandler(this.id)')
    .attr('onclick', 'ProvincePressEventHandler(this.id);return false;')
    .lower();
  
  $("#160").bind("contextmenu", function (e) {
    RightClickEventHandler(160)
    e.preventDefault();
  }); 


  //add map
  d3.json('static/json/uk.json', function(data) {
    console.log(topojson.feature(data, data.objects.UK));
    countries.selectAll('.country')
    .data(topojson.feature(data, data.objects.UK).features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('data-name', 'dog')
    .attr('onclick', 'ProvincePressEventHandler(this.id)')
    .attr('d', path);
    EditObject();
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
          //console.log(this)
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

function EditObject(){
  $(".country").each(function(i, a) {
    //console.log("i: " + i + "a: " + a)
    //console.log(a)
    $(a).attr('id', i);

  $("#" + i).bind("contextmenu", function (e) {
    RightClickEventHandler(i)
    e.preventDefault();
    });
  });

  d3.selectAll(".country path")
  .each(function (d, i) {
     var centroid = path.centroid(d);
     console.log('Centroid at: ' + centroid[0] + ', ' + centroid[1]);
  });

}

function test(){console.log("dog"); return "dog";}
