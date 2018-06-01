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
//        map.flyTo({
//            center: [126.9432465, 37.5504207],
//            zoom: 19.3
//        })

        //        $(this).css('background-color', '#FE2E2E');
//        $(this).css('color', 'white');
        var id = $(this).attr('id');
        currentBuilding = getObjectByName(id, buildings);
        $("#sidebar_floor").show();
    })


    // floor list(2-depth) clicked.
    $("#sidebar_floor ul").on("click", "li", function () {
        
        var id = $(this).attr('id');
        currentFloor = getObjectByName(id, currentBuilding.floors);
        $("#sidebar_rooms").show();
        //        $(this).css('background-color', '#FE2E2E');
//        $(this).css('color', 'white');
    })

    // room list(3-depth) clicked.
    $("#sidebar_rooms").on("click", "li", function () {
//        $("#side_left").css("margin-left", "-120px");
        $("#sidebar_room_detail").show();
        //        $(this).css('background-color', '#FE2E2E');
        $(this).css('color', 'white');

        map.flyTo({
            center: [126.9433022, 37.5502868],
            zoom: 20.65
        })

    })
});

function init() {
    $("#sidebar_floor").hide();
    $("#sidebar_rooms").hide();
    $("#sidebar_room_detail").hide();
    
    
    var delay = 1000;
//    var J = new building("J");
//    setInterval(function() {
//        J.prm
//    }, delay);
}