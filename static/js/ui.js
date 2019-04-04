
function PaintMap(){
    for (var i = 0; i < state.provinces.length; i++) {
      $("#" + i).removeClass();
      $("#" + i).addClass("country " + state.provinces[i].owner);
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
        else if (state.provinces[i].pop < (dog * 5)){
            $("#" + i).addClass("country " + 'pop_num_5');
        }
    }
  
  }
  
  