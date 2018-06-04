$(document).ready(function () {
    
    /************** graph button clicked. **************/
    $("#graph-icon").on("click", function () {

        if (chartOn) {
            
            // Set background color of this button.
            $(this).css('background-color', 'rgba(255, 255, 255, 0.8');
            
            // Set bearing and pitch of map.
            map.flyTo({
                bearing: -14,
                pitch: -14
            });
            
            // Set Height of floor layers in map.
            for (var i in floorLayerNames) {
                map.setPaintProperty(floorLayerNames[i], 'fill-extrusion-height', 2);
            }
            
            // Hide graph at right bottom.
            $("#plot-graph").hide();
            
            chartOn = false;

        } else {
            
            // Set background color of this button.
            $(this).css('background-color', 'rgba(153, 204, 255, 0.8');
            
            // Set bearing and pitch of map.
            map.flyTo({
                bearing: 32,
                pitch: 50
            });
            
            // Set Height of floor layers in map.
            for (var i in floorLayerNames) {
                map.setPaintProperty(floorLayerNames[i], 'fill-extrusion-height', ["*", 3, ["get", "evaluation"]]);
            }
            
            // Show graph at right bottom.
            $("#plot-graph").show();
            showChart();

            chartOn = true;

        }
    })
});

function showChart() {
    
    if ( currentFloor ) {
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