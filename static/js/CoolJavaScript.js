var testArr = [];
var testArr2 = [];



function test(){console.log("dog"); return "dog";}


  var svg;
  var projection;
  var speed = 2800;//km/sec
  var tooltip = d3.select('#map').append('div')
      .attr('class', 'tooltipDestination')
      .style('opacity', 0);

  function nationPressEventHandler(dog){

    console.log(dog);
    $(dog).css("stroke", "#5b0000");


    //var input = dog.__data__.id;
    //testArr.push(input);
    //console.log(input);
    changeElement(dog.properties)

  }

  function changeElement(data) {
    $("#name").html(data.NAME_2);
    $("#region").html(data.NAME_1);
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

    d3.json('static/json/uk.json', function(data) {
      countries.selectAll('.country')
      .data(topojson.feature(data, data.objects.UK).features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('data-name', 'dog')
      .attr('onclick', 'console.log(this.__data__)')
      .attr('onclick', 'nationPressEventHandler(this.__data__)')
      .attr('d', path)
      return;


        
    });
    
/*
    $.each(capitals, function(index, element){
      if (element.ContinentName == "Europe") {

    test();
      svg.append('circle')
      //.attr('cx', function (element.CapitalLongitude) { return projection(element.CapitalLongitude)[0]; })
      //.attr('cy', function (element.CapitalLatitude) { return projection(element.CapitalLatitude)[1]; })
      //.attr('cx', function (d) { return projection(d)[0]; })
      //.attr('cy', function (d) { return projection(d)[1]; })
      .attr('cx', function (d) { return projection(element.CapitalLatitude)[0]; })
      .attr('cy', function (d) { return projection(element.CapitalLatitude)[1]; })
      .attr('r', '3px')
      .style('opacity', 0.8)
      .attr('fill', 'green')
      .attr('class', 'circleOrigin')
      .on('mouseover', function (d) {
        console.log(element.CapitalName);
        console.log(this);
        });

      }
    }  );

*/

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

    function addMarkers() {

      $.each(capitals, function(index, element){
        if (element.ContinentName == "Europe") {

      test();
        svg.append('circle')

        .attr('cx', element.CapitalLongitude)
        .attr('cy', element.CapitalLatitude)
        .attr('r', '3px')
        .style('opacity', 1)
        .attr('fill', 'green')
        .attr('class', 'circleOrigin')
        .on('mouseover', function (d) {
          console.log(element.CapitalName);
          console.log(this);
          });

        }
      }  );
    }


      /*
              tooltip.html('<span style="color:white">' + element.capitalName + '</span>')
                .attr('class', 'tooltipOrigin')
                .style('left', projection(d)[0] + 12 + 'px')
                .style('top', projection(d)[1] - 20 + 'px')
                .transition()
                .duration(700)
                .style('opacity', 1)

    */

/*
  .on('mouseover', function (d) {
    tooltip.html('<span style="color:white">' + element.capitalName + '</span>')
      .attr('class', 'tooltipOrigin')
      .style('left', projection(d)[0] + 12 + 'px')
      .style('top', projection(d)[1] - 20 + 'px')
      .transition()
      .duration(700)
      .style('opacity', 1)

      */
