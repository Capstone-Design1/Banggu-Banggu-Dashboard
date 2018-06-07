$(document).ready(function () {

    /************** All clicked. /**************/
    $("#all").on("click", function () {
        map.flyTo({
            center: [126.941667, 37.550901],
            zoom: 17.11
        })
    })

    /************** building list(1-depth) clicked. **************/
    $("#sidebar_main_narrow ul").on("click", "li", function () {

        // Get current building object.
        var id = $(this).attr('id');
        currentBuilding = getObjectByName(id, buildings);
        
        // Set current opacity of building from 1 to 0.3. 
        map.setPaintProperty('buildings', 'fill-extrusion-opacity', 0.3);
        
        // Fly to current building location in map.
        map.flyTo({
            center: [currentBuilding.lng, currentBuilding.lat],
            zoom: 19.5
        })

        // Display the currentBuilding information text at left top.
        $("#current > #building").text(currentBuilding.name);
        $("#current > #building").css('background-color', currentBuilding.color);
        $("#current > #building").animate({ "margin-left": "+=80px"}, "slow");
        
        // Hide building nav bar and Show floor nav bar.
        $("#side_left").animate({ "left": "-=80px" }, "slow" );
        $("#sidebar_floor").show();
        
        // Show floor list of current building.
        showFloorList();
    })

    /************** floor list(2-depth) clicked. **************/
    $("#sidebar_floor ul").on("click", "li", function () {

        var id = $(this).attr('id');
        
        // If already currentFloor exists. (This mean that 'if already floor clicked before.)
        if (currentFloor) {
            // Make invisible existing floor layer.
            var layerId = currentBuilding.name + currentFloor.name;
            map.setLayoutProperty(layerId, 'visibility', 'none');

            currentRoom = null;
        }

        // Get current floor object.
        currentFloor = getObjectByName(id, currentBuilding.floors);
        
        // Make visible current floor layer.
        var layerId = currentBuilding.name + currentFloor.name;
        map.setLayoutProperty(layerId, 'visibility', 'visible');
        
        // Fly to current building location in map.
        map.flyTo({
            center: [currentBuilding.lng, currentBuilding.lat],
            zoom: 19.5,
        })
        map.flyTo({
            bearing: 32,
            pitch: 50
        });


        // Display the currentFloor information text at left top.
        $("#current > #floor").text(currentFloor.name);
        $("#current > #floor").css('background-color', currentFloor.color);
        $("#current > #floor").animate({ "margin-left": "+=80px"}, "slow");
        
        // Hide building nav bar and Show floor nav bar.
        $("#side_left").animate({ "left": "-=40px" }, "slow" );
        $("#sidebar_rooms").show();
        $("#sidebar_room_detail").hide();
        
        // Show room list of current building.
        showRoomList();
    })

    /************** room list(3-depth) clicked. **************/
    $("#sidebar_rooms").on("click", "li", function () {
        
        var id = $(this).attr('id');
        
        // If already currentRoom exists. (This mean that 'if already room clicked before.)
        if (currentRoom) {
            
            // Hide current_room_detail and currentRoom information at left top.
            $("#sidebar_room_detail").hide();
            $("#current > #room").css('margin-left', '-80px');
        }

        // Get current floor object.
        currentRoom = getObjectByName(id, currentFloor.rooms);
        
        // Fly to current room location in map.
        map.flyTo({
            center: [currentRoom.lng, currentRoom.lat],
            zoom: 21
        })
        
        

        // Display the currentRoom information text at left top.
        $("#current > #room").text(currentRoom.name[2] + currentRoom.name[3]);
        $("#current > #room").css('background-color', currentRoom.color);
        $("#current > #room").animate({ "margin-left": "+=80px"}, "slow");
        
        // Show floor list of current building.
        showRoomDetail();
    })

    
    $(".back").on("click", function(){
        
        if( currentRoom ){
            
            $("#sidebar_room_detail").hide();
            
            $("#current > #room").animate({ "margin-left": "-=80px" }, "slow" );
            
            // Fly to current building location in map.
            map.flyTo({
                center: [currentBuilding.lng, currentBuilding.lat],
                zoom: 19.5
            })

            currentRoom = null;
            
        } else if ( currentFloor ){
            
            $("#side_left").animate({ "left": "+=40px" }, "slow" );
            $("#sidebar_rooms").hide();
            $("#sidebar_room_detail").hide();
            $("#current > #floor").animate({ "margin-left": "-=80px" }, "slow" );
            
            var layerId = currentBuilding.name + currentFloor.name;
            map.setLayoutProperty(layerId, 'visibility', 'none');
            map.flyTo({
                bearing: -14,
                pitch: -14
            });
            
            currentFloor = null;
            
        } else if ( currentBuilding ){
            
            $("#side_left").animate({ "left": "+=80px" }, "slow" );
            $("#sidebar_floor").hide();
            $("#current > #building").animate({ "margin-left": "-=80px" }, "slow" );
            
            // Fly to initial location in map.
            map.flyTo({
                center: [126.941667, 37.550901],
                zoom: 17
            })
            
            // Set opacity of building from 0.3 to 1. 
            map.setPaintProperty('buildings', 'fill-extrusion-opacity', 1);
            
            currentBuilding = null;
        }
    })
    
    
});

// Show li.
function showBuildingList() {
    var html = "";
    for (var i in buildings) {
        var li = "<li id='" + buildings[i].name + "'>" + buildings[i].name + "</li>";
        html += li;
    }
    $("#building_list").html(html);
}

function showFloorList() {
    var html = "";
    for (var i in currentBuilding.floors) {
        var li = "<li id='" + currentBuilding.floors[i].name + "'>" + currentBuilding.floors[i].name + "</li>";
        html += li;
    }
    $("#floor_list").html(html);
}

function showRoomList() {
    var html = "";
    for (var i in currentFloor.rooms) {
        var li = "<li id='" + currentFloor.rooms[i].name + "'>" + currentFloor.rooms[i].name + "</li>";
        html += li;
    }
    $("#room_list").html(html);
}

function showRoomDetail() {
    $("#sidebar_room_detail").show();
    $("#sidebar_room_detail").css("background-color", currentRoom.color+"aa");
    
    // Legend init.
    var size = $("#evaluation .legend > div").length;
    for( var i=0 ; i<size ; i++  ){
        var div = $($(".legend > div")[i]);
        div.css('opacity', '0.3');
        div.css('border', 'none');
    }
    
    // Set legend div. 
    temperatureScore = returnEvaluatedTemp(currentRoom.property.temperature);
    $($("#temperature > .legend > div")[5 - temperatureScore]).css('opacity', '1');
    $($("#temperature > .legend > div")[5 - temperatureScore]).css('border', '3px solid black');
    
    humidityScore = returnEvaluatedHum(currentRoom.property.humidty);
    $($("#humidity > .legend > div")[5 - humidityScore]).css('opacity', '1');
    $($("#humidity > .legend > div")[5 - humidityScore]).css('border', '3px solid black');
    
    co2Score = returnEvaluatedCo2(currentRoom.property.co2);
    $($("#co2 > .legend > div")[5 - co2Score]).css('opacity', '1');
    $($("#co2 > .legend > div")[5 - co2Score]).css('border', '3px solid black');
    
    dustScore = returnEvaluatedDust(currentRoom.property.dust);
    $($("#dust > .legend > div")[5 - dustScore]).css('opacity', '1');
    $($("#dust > .legend > div")[5 - dustScore]).css('border', '3px solid black');
    
    score = parseInt(currentRoom.property.evaluation);
    $($("#score > .legend > div")[4 - score]).css('opacity', '1');
    $($("#score > .legend > div")[4 - score]).css('border', '3px solid black');
    
    // Set score.
    $(".score").css('color', 'white');
    
    $("#score .score").text(currentRoom.property.evaluation);
//    $("#score .score").css('color', (colorLegend[score - 1]));
    $("#temperature .score").text(currentRoom.property.temperature + " ℃");
//    $("#temperature .score").css('color', colorLegend[temperatureScore - 1]);
    $("#humidity .score").text(currentRoom.property.humidity + " %");
//    $("#humidity .score").css('color', colorLegend[humidityScore - 1]);
    $("#co2 .score").text(currentRoom.property.co2 + " ppm");
//    $("#co2 .score").css('color', colorLegend[co2Score - 1]);
    $("#dust .score").text(currentRoom.property.dust + " ㎍/㎥");
//    $("#dust .score").css('color', colorLegend[dustScore - 1]);
;}

function returnEvaluatedTemp(temperature){
    if( 21 < temperature <= 23 )
        return 5;
    else if( 23 < temperature <= 25 || 19 < temperature <= 21 )
        return 4;
    else if( 25 <= temperature < 27 || 17 <= temperature < 19)
        return 3;
    else if( 27 <= temperature < 29 || 15 <= temperature < 17 )
        return 2;
    else {
        return 1;
    }
}

function returnEvaluatedHum(humidity){
    if( 50 < humidity <= 60 )
        return 5;
    else if( 60 < humidity <= 70 || 40 < humidity <= 50 )
        return 4;
    else if( 70 <= humidity < 80 || 30 <= humidity < 40)
        return 3;
    else if( 80 <= humidity < 90 || 20 <= humidity < 30 )
        return 2;
    else {
        return 1;
    }
}

function returnEvaluatedCo2(co2){
    if( co2 <= 450 )
        return 5;
    else if( co2 <= 700 )
        return 4;
    else if( co2 <= 1000 )
        return 3;
    else if( co2 <= 2000 )
        return 2;
    else {
        return 1;
    }
}

function returnEvaluatedDust(dust){
    if( dust <= 30 )
        return 5;
    else if( dust <= 80 )
        return 4;
    else if( dust <= 120 )
        return 3;
    else if( dust <= 200 )
        return 2;
    else {
        return 1;
    }
}

function returnEvaluation(temperature, humidity, co2, dust){
    score = 0.25 * temperature +
        0.25 * humidity +
        0.25 * co2 +
        0.25 * dust;
    return score;
}