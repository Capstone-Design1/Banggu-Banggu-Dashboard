$(document).ready(function () {
    init();
    loop();
});

function init() {
    $("#sidebar_floor").hide();
    $("#sidebar_rooms").hide();
    $("#sidebar_room_detail").hide();
    $("#plot-graph").hide();
    $("#realtime-chart").hide();
    $("#legend").append(returnLegend());

    showBuildingList();
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
                            
                            if( currentBuilding.name == 'K' )
                                updateJsonData_rooms();
                            room.getProperty();
                            room.updateColor();

                        });
                    }

                });

            }

        })

    }, delay);
}

function updateJsonData_rooms() {
    
    var url = "http://ec2-13-209-35-182.ap-northeast-2.compute.amazonaws.com:8000/api/k/5";
    $.ajax({
        url: url
    }).done(function (data) {
        features = data.features;
        
        for( var i in features ){
            var feature = features[i];
            var properties  = feature.properties;
            var property = {
                evaluation: properties.evaluation,
                temperature: properties.temperature,
                humidity: properties.humidity,
                co2: properties.co2,
                dust: properties.dust
            };
            
            // update json_buidling
            // 1. Find the room object in json_building
            var jsonBuildingIndex = getObjectIndexByName(currentBuilding.name, json_buildings);
            var jsonFloorIndex = getObjectIndexByName(currentFloor.name, json_buildings[jsonBuildingIndex].floor);
            var jsonRoomIndex = getObjectIndexByName(properties.name, json_buildings[jsonBuildingIndex].floor[jsonFloorIndex].room);
            
            // 2. Update property of the object.
            json_buildings[jsonBuildingIndex].floor[jsonFloorIndex].room[jsonRoomIndex].property = property;

        }
        
    });
}
