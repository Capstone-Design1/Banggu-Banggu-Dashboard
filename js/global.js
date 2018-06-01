var building_names = ['J', ];
var floor_names = [1,2,3,4,5];
var room_names = ["J315", "J316", "J317", "J318", "J319",];
var buildings = [];

var currentBuilding = null;
var currentFloor = null;

var colorLegend = ["#006837", "#31a354", "#78c679", "#c2e699", "#ffffcc", "#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"];

for (var i in building_names) {
    var foo = new Building( building_names[i] );
    foo.floors = [];
    
    for( var j in floor_names ){
        var bar = new Floor( floor_names[j] );
        bar.rooms = [];
        
        for( var k in room_names ){
            var foobar = new Room( room_names[k] );
            (bar.rooms).push(foobar);
        }
        (foo.floors).push(bar);
    }
    buildings.push( foo );
}