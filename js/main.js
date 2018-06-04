$(document).ready(function () {

    init();

    // All clicked.
    $("#all").on("click", function () {
        map.flyTo({
            center: [126.941667, 37.550901],
            zoom: 17.11
        })
    })

    // building list(1-depth) clicked.
    $("#sidebar_main_narrow ul").on("click", "li", function () {

        //        $(this).css('background-color', '#FE2E2E');
        //        $(this).css('color', 'white');
        var id = $(this).attr('id');

        currentBuilding = getObjectByName(id, buildings);

        map.flyTo({
            center: [currentBuilding.lng, currentBuilding.lat],
            zoom: 19.5
        })
        map.setPaintProperty('buildings', 'fill-extrusion-opacity', 0.3);

        $("#current > #building").text(currentBuilding.name);
        $("#current > #building").css('background-color', currentBuilding.color);
        $("#current > #building").animate({ "margin-left": "+=80px"}, "slow");
        
        $("#side_left").animate({ "left": "-=80px" }, "slow" );
        $("#sidebar_floor").show();
        showFloorList();
    })


    // floor list(2-depth) clicked.
    $("#sidebar_floor ul").on("click", "li", function () {

        var id = $(this).attr('id');

        if (currentFloor) {
            var layerId = currentBuilding.name + currentFloor.name;
            map.setLayoutProperty(layerId, 'visibility', 'none');

            currentRoom = null;
        }

        currentFloor = getObjectByName(id, currentBuilding.floors);

        map.flyTo({
            center: [currentBuilding.lng, currentBuilding.lat],
            zoom: 19.5
        })

        var layerId = currentBuilding.name + currentFloor.name;
        map.setLayoutProperty(layerId, 'visibility', 'visible');

        
        $("#current > #floor").text(currentFloor.name);
        $("#current > #floor").css('background-color', currentFloor.color);
        $("#current > #floor").animate({ "margin-left": "+=80px"}, "slow");
        
        $("#side_left").animate({ "left": "-=40px" }, "slow" );
        $("#sidebar_rooms").show();
        $("#sidebar_room_detail").hide();
        showRoomList();
        //        $(this).css('background-color', '#FE2E2E');
        //        $(this).css('color', 'white');
    })

    // room list(3-depth) clicked.
    $("#sidebar_rooms").on("click", "li", function () {

        if (currentRoom) {
            $("#sidebar_room_detail").hide();
            $("#current > #room").css('margin-left', '-80px');
        }

        var id = $(this).attr('id');
        currentRoom = getObjectByName(id, currentFloor.rooms);

        //        $("#side_left").css("margin-left", "-120px");

        map.flyTo({
            center: [currentRoom.lng, currentRoom.lat],
            zoom: 21
        })

        $("#current > #room").text(currentRoom.name[2] + currentRoom.name[3]);
        $("#current > #room").css('background-color', currentFloor.color);
        $("#current > #room").animate({ "margin-left": "+=80px"}, "slow");
        
        showRoomDetail();
        //        $(this).css('background-color', '#FE2E2E');
        //        $(this).css('color', 'white');

        //        map.flyTo({
        //            center: [126.9433022, 37.5502868],
        //            zoom: 20.65
        //        })

    })

    $("#graph-icon").on("click", function () {

        if (chartOn) {

            $(this).css('background-color', 'rgba(255, 255, 255, 0.8');
            map.flyTo({
                bearing: -14,
                pitch: -14
            });
            for (var i in floorLayerNames) {
                map.setPaintProperty(floorLayerNames[i], 'fill-extrusion-height', 2);
            }
            $("#plot-graph").hide();
            chartOn = false;

        } else {
            $(this).css('background-color', 'rgba(153, 204, 255, 0.8');
            map.flyTo({
                bearing: 32,
                pitch: 50
            });
            for (var i in floorLayerNames) {
                map.setPaintProperty(floorLayerNames[i], 'fill-extrusion-height', ["*", 3, ["get", "evaluation"]]);
            }
            map.setPaint
            $("#plot-graph").show();
            showChart();
            chartOn = true;

        }
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

function init() {
    $("#sidebar_floor").hide();
    $("#sidebar_rooms").hide();
    $("#sidebar_room_detail").hide();
    $("#plot-graph").hide();
    $("#legend").append(returnLegend());
    
    showBuildingList();

    loop();
}

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

function showChart() {
    if (currentFloor) {
        var values = [];
        for (var i in currentFloor.rooms) {
            values.push({
                x: currentFloor.rooms[i].name,
                y: currentFloor.rooms[i].property.evaluation
            });
        }
        var datass = [{
            values: values
        }];
    }


    $('#plot-graph > .epoch').epoch({
        type: 'bar',
        data: datass,
    });
}


// Real-time request.
function loop() {
    var delay = 1000;

    setInterval(function () {

        // depth 1
        buildings.forEach(function (building, index, array) {
            building.getProperty();
            building.updateColor();
            //            updateGeoJson();

            // depth 2
            if (currentBuilding != null) {

                (currentBuilding.floors).forEach(function (floor, index, array) {

                    floor.getProperty();
                    floor.updateColor();

                    // depth 3
                    if (currentFloor != null) {

                        (currentFloor.rooms).forEach(function (room, index, array) {

                            room.getProperty();
                            room.updateColor();

                        });
                    }

                });

            }

        })

    }, delay);
}