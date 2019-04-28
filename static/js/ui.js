function UI_Controller(el){
 
    $(el).toggleClass("UI_Item_hide");
  
    if ($(el).css("visibility") == 'hidden'){
      $(el).css("visibility", "visible");
    }
    else {
      $(el).css("visibility", "hidden");
    }
  }

function PaintMap(){
    for (var i = 0; i < state.provinces.length; i++) {
      $("#" + i).removeClass();
      $("#" + i).addClass("country " + state.provinces[i].owner);

    }
    //console.log("adding capital borders");
    for (var i2 = 0; i2 < state.config.capital_provinces.length; i2++){
      console.log("adding capital borders");
      $("#" + state.config.capital_provinces[i2]).addClass("capital");
    }
  }
//PaintMap();

function PaintMapPop(){
    let dog = (state.config.population_range/5);
    console.log("population_range: " + dog);
    for (var i = 0; i < state.provinces.length; i++) {
        $("#" + i).removeClass();      
        if (state.provinces[i].pop < (dog)){
            $("#" + i).addClass("country " + 'pop_num_1');
        }
        else if (state.provinces[i].pop < (dog * 2)){
            $("#" + i).addClass("country " + 'pop_num_2');
        }
        else if (state.provinces[i].pop < (dog * 3)){
            $("#" + i).addClass("country " + 'pop_num_3');
        }
        else if (state.provinces[i].pop < (dog * 4)){
            $("#" + i).addClass("country " + 'pop_num_4');
        }
        else{
            $("#" + i).addClass("country " + 'pop_num_5');
        }
    }
}

function PaintMapArmies(){
  let dog = (state.config.population_range/5);
  console.log("population_range: " + dog);
  for (var i = 0; i < state.provinces.length; i++) {
      $("#" + i).removeClass();      
      if (state.provinces[i].army == 0){
          $("#" + i).addClass("country " + 'no_army');
      }
      else if (state.provinces[i].army < 1500){
          $("#" + i).addClass("country " + 'small_army');
      }
      else if (state.provinces[i].army < 5000){
          $("#" + i).addClass("country " + 'medium_army');
      }
      else if (state.provinces[i].army >= 5000){
          $("#" + i).addClass("country " + 'large_army');
      }
  }
}
 
function refreshUI(){
  PaintMap();
  $("#funds").text("Funds:" + state.nations[playerNation].funds);
  svg.selectAll('.distance_line').remove();
  $("#turn").text("Turn:" + state.turn);
  $("#end_turn").prop("disabled", false);
}


function selectionBox(){

	$( "#dialog" ).dialog({
		minWidth: 560,
		minHeight: 400,
		modal: true,
	});

}

function setPlayerNation(dog){
  playerNation = dog;
 
  console.log(state.player_nations);

  if(jQuery.inArray(dog, state.player_nations) !== -1) {
    $("select[alt=" + dog +"]").css("opacity", "0.6");
    alert("Nation already picked, try another one.");
    return false;
  }
  state.player_nations.push(dog);
  //sendStateToServer();
  try {$('#dialog').dialog('close');}
  catch {}

  $('#Player_nation_left_box_name').text(dog);
  $('#Player_nation_left_box_flag').attr("src", "static/img/icon/" + dog + ".png");
  $("#funds").text("Funds:" + state.nations[playerNation].funds);


}
selectionBox();

function recruitArmy(){
  if (state.nations[playerNation].funds < 3000) {
    alert("Not enough funds to recruit an army");
    return;
  }
  else {
    state.nations[playerNation].funds -= 3000;
    state.provinces[state.nations[playerNation].capital].army += 3000;
    $("#funds").text("Funds:" + state.nations[playerNation].funds);
  }


}
  