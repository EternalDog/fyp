//r00137275
let tick = [];
let player = {};
let playerNation = "none";
let cursor_lc; //pos
let cursor_rc; //pos
let lc_select; //prov id
let rc_select; //prov id
let movementDistance = 120;
let movement = [];



$(document).ready(function() {
  //getStateFromServer();
});

var line_itr;
var svg;
var projection;
var speed = 2800;//km/sec
var tooltip = d3.select('#map').append('div')
    .attr('class', 'tooltipDestination')
    .style('opacity', 0);

function ProvincePressEventHandler(dog){
  /*
  if (jQuery.inArray(dog, tick) == -1) {
    tick.push(parseInt(dog));
    console.log(tick);
  }
  console.log(dog);
  $("#" + dog).css("fill", "black"); */

  lc_select = parseInt(dog);
  console.log(dog);
  changeElement(dog);
}

function changeElement(dog) {
  $("#name").text("Name: " + state.provinces[dog].name);
  $("#owner").text("Owner: " + state.provinces[dog].owner);
  $("#pop").text("Population: " + state.provinces[dog].pop);
  $("#army").text("Army size: " + state.provinces[dog].army);
}

function RightClickEventHandler(dog){

  rc_select = dog;
  if (lc_select === undefined || state.provinces[lc_select].owner != playerNation || state.provinces[lc_select].army == 0){return false;}
  for (var i = 0; i < movement.length; i++) {
    if (lc_select == movement[i][0]){return false;}
  }
  state.movement.push([lc_select, rc_select]);

  console.log("hunden uber alles");
  return false;
}


var svg;
function drawMap() {
  var countries, height, path, projection, scale, width;
  var width = 1500;
  var height = 1500;
  var center = [1, 59.5];
  //var center = [6, 68.6];
  var scale = 5000;
  projection = (d3.geoMercator().scale(scale).translate([width / 2, 0]).center(center));
  path = (d3.geoPath().projection(projection));
  svg = (d3.select('#map').append('svg').attr('height', height).attr('width', width).style('background', '#71d1f2'));
  countries = svg.append("g");

  svg.on("click", function() {
    try {
      svg.selectAll('#rangeCircle').remove();
    } catch (error) {
      
    }
    cursor_lc = d3.mouse(this);
    console.log("left click coordinates, x,y : " + cursor_lc );
    svg.append('circle')
    .attr('cx', cursor_lc[0])
    .attr('cy', cursor_lc[1])
    .attr('r', movementDistance + "px")
    .attr('id', 'rangeCircle')
  })


  svg.on("contextmenu", function() {
    cursor_rc = d3.mouse(this);
    console.log("right click coordinates, x,y : " + cursor_rc );
    d3.event.preventDefault();
    
    if ( lc_select === undefined || state.provinces[lc_select].owner != playerNation || state.provinces[lc_select].army == 0){return}
    for (var i = 0; i < movement.length; i++) {
      if (lc_select == movement[i][0]){return false;}
    }
    
    svg.append('line')
    .attr('x1', cursor_lc[0])
    .attr('y1', cursor_lc[1])
    .attr('x2', cursor_rc[0])
    .attr('y2', cursor_rc[1])
    .attr('class', 'distance_line')
    .attr('style', 'stroke:rgb(255,0,0);stroke-width:2');

    console.log("dist: " + distance(cursor_lc[0], cursor_lc[1], cursor_rc[0], cursor_rc[1]));
    if (distance(cursor_lc[0], cursor_lc[1], cursor_rc[0], cursor_rc[1]) > movementDistance) {
      
      svg.selectAll('.distance_line').remove();

      //d3.select("distance_line").remove();
      alert("too far");
    }
    else (console.log(distance(cursor_lc[0], cursor_lc[1], cursor_rc[0], cursor_rc[1])))


  })

  //add london
  svg.append('circle')
    .attr('cx', '1009')
    .attr('cy', '1243')
    .attr('r', '45px')
    .attr('class', 'london')
    .attr('id', '160')
    .attr('onclick', 'nationPressEventHandler(this.id)')
    .attr('onclick', 'ProvincePressEventHandler(this.id);return false;')
    .lower();
  
  $("#160").bind("contextmenu", function (e) {
    RightClickEventHandler(160)
    e.preventDefault();
  }); 

  //hide northern ireland
  svg.append('circle')
    .attr('cx', '405')
    .attr('cy', '804')
    .attr('r', '142px')
    .attr('class', 'hidden_map_element')

  //hadrians wall
  svg.append('line')
  .attr('x1', '751')
  .attr('y1', '742')
  .attr('x2', '896')
  .attr('y2', '738')
  .attr('style', 'stroke:rgb(163, 78, 0);stroke-width:3');  


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

    svg.append('line')
    .attr('x1', dog[0])
    .attr('y1', 0)
    .attr('x2', dog[0])
    .attr('y2', height)
    .attr('style', 'stroke:rgb(255,0,0);stroke-width:0.5');

    svg.append('line')
    .attr('x1', 0)
    .attr('y1', dog[1])
    .attr('x2', width)
    .attr('y2', dog[1])
    .attr('style', 'stroke:rgb(255,0,0);stroke-width:0.5');

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

function distance(x1, y1, x2, y2){
  return Math.round(
          Math.sqrt(
            (Math.pow((x1-x2), 2)) + 
            (Math.pow((y1-y2), 2))
          )
        );
}

function test(){console.log("dog"); return "dog";}
