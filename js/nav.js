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

        // Fly to current building location in map.
        map.flyTo({
            center: [currentBuilding.lng, currentBuilding.lat],
            zoom: 19.5
        })
        
        // Set current opacity of building from 1 to 0.3. 
        map.setPaintProperty('buildings', 'fill-extrusion-opacity', 0.3);

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
        
        // Fly to current building location in map.
        map.flyTo({
            center: [currentBuilding.lng, currentBuilding.lat],
            zoom: 19.5
        })
        
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
        
        // Fly to current room location in map.
        map.flyTo({
            center: [currentRoom.lng, currentRoom.lat],
            zoom: 21
        })
        
        // If already currentRoom exists. (This mean that 'if already room clicked before.)
        if (currentRoom) {
            
            // Hide current_room_detail and currentRoom information at left top.
            $("#sidebar_room_detail").hide();
            $("#current > #room").css('margin-left', '-80px');
        }

        // Get current floor object.
        currentRoom = getObjectByName(id, currentFloor.rooms);

        // Display the currentRoom information text at left top.
        $("#current > #room").text(currentRoom.name[2] + currentRoom.name[3]);
        $("#current > #room").css('background-color', currentFloor.color);
        $("#current > #room").animate({ "margin-left": "+=80px"}, "slow");
        
        // Show floor list of current building.
        showRoomDetail();
    })

    
    $(".back").on("click", function(){
        
        if( currentRoom ){
            
            $("#side_left").animate({ "left": "+=40px" }, "slow" );
            $("#sidebar_rooms").hide();
            $("#sidebar_room_detail").hide();
            
            $("#current > #room").animate({ "margin-left": "-=80px" }, "slow" );
            
            currentRoom = null;
            
        } else if ( currentFloor ){
            
            $("#side_left").animate({ "left": "+=40px" }, "slow" );
            $("#sidebar_rooms").hide();
            $("#sidebar_room_detail").hide();
            
            currentFloor = null;
            
        } else if ( currentBuilding ){
            
            $("#side_left").animate({ "left": "+=80px" }, "slow" );
            $("#sidebar_floor").hide();
            $("#current > #floor").animate({ "margin-left": "-=80px" }, "slow" );
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
    $("#sidebar_room_detail").find("h5").text(currentRoom.name);
    $("#rating").text(currentRoom.property.evaluation);
}