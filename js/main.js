$(document).ready(function () {
    init();
    loop();
});

function init() {
    $("#sidebar_floor").hide();
    $("#sidebar_rooms").hide();
    $("#sidebar_room_detail").hide();
    $("#plot-graph").hide();
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

                            room.getProperty();
                            room.updateColor();

                        });
                    }

                });

            }

        })

    }, delay);
}