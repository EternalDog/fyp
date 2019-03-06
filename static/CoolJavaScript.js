var testArr = [];
var testArr2 = [];

var ids = [  "RU",  "UA",  "BY",  "LT",  "LV",  "EE",  "FI",  "SE",  "NO",  "DK",  "DE",  "PL", "CZ",
      "SK",  "HU",  "RO",  "MD",  "BG",  "TR",  "GR",  "MK",  "AL",  "RS",  "ME",  "BA",  "HR",
      "SI",  "AT",  "IT",  "CH",  "FR",  "ES",  "BE",  "NL",  "LU",  "PT",  "GB",  "IE",  "IS"
];

var nations = [ "Russia", "Ukraine", "Belarus", "Lithuania" , "Latvia", "Estonia", "Finland", "Sweden", "Norway", "Denmark", "Germany", "Poland", "Czech",
          "Slovakia", "Hungary", "Romania", "Moldova", "Bulgaria", "Turkey", "Greece", "Macedonia", "Albania", "Serbia", "Montenegro", "Bosnia", "Croatia",
          "Slovenia", "Austria", "Italy", "Switzerland", "France", "Spain", "Belgium", "Netherlands", "Luxembourg", "Portugal", "Great Britain", "Ireland", "Iceland"
 ];

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


    var input = dog.__data__.id;
    testArr.push(input);
    console.log(input);

    var nation;
    $.each(ids, function(index, element){
      if(input == element){
        nation = nations[index];

      }
    });

    var request = "https://restcountries.eu/rest/v2/name/" + nation;
    var response;
    $.get(request, function(data, status){
      console.log(data);
      console.log("pop: " + data[0].population);
      response = data;
      $("#name").html("Name: " + data[0].name);
      $("#capital").html("Capital: " + data[0].capital);
      $("#region").html("Region: " + data[0].subregion);
      if (data[0].population > 1000000){$("#population").html("Population: " + Math.round(data[0].population / 1000000) + "m");}
      else {$("#population").html("Population: " + (data[0].population));}
      $("#language").html("Language: " + data[0].languages[0].name);
      $("#flag").attr("src", data[0].flag);
    });

  //  changeElement(response);


  }

  function changeElement(data) {
    $("#name").html(data[0].name);
    $("#capital").html(data[0].capital);
    $("#region").html(data[0].subregion);
    $("#population").html(data[0].population);
    $("#language").html(data[0].languages[0].name);



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
    d3.json('uk.json', function(data) {
      countries.selectAll('.country')
      .data(topojson.feature(data, data.objects.GBR_adm2).features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('onclick' , 'nationPressEventHandler(this)')
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
