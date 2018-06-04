/********* Dedicating current object in each depth) *********/ 
var currentBuilding = null;
var currentFloor = null;
var currentRoom = null;
/************************************************************/
var chartOn = false;

/********* color legend ***********/
var colorLegend = ["#b30000", "#e34a33", "#fc8d59", "#fdcc8a", "#fef0d9", "#ffffcc", "#c2e699", "#78c679", "#31a354", "#006837"];
var colorStep = [
                    [0.5, colorLegend[0]],
                    [1, colorLegend[1]],
                    [1.5, colorLegend[2]],
                    [2, colorLegend[3]],
                    [2.5, colorLegend[4]],
                    [3, colorLegend[5]],
                    [3.5, colorLegend[6]],
                    [4, colorLegend[7]],
                    [4.5, colorLegend[8]],
                    [5, colorLegend[9]],
                ];
/*********************************/

/********* main object ***********/
var buildings = [];
/*********************************/

/********* Init buildings for 'demo' *********/
// original source : json_building in '/asset/demo_data'

for (var i in json_buildings) {
    var building = new Building(json_buildings[i].name);
    building.floors = [];

    for (var j in json_buildings[i].floor) {
        var floor = new Floor(json_buildings[i].floor[j].name);
        floor.rooms = [];

        for (var k in json_buildings[i].floor[j].room) {
            var room = new Room(json_buildings[i].floor[j].room[k].name);
            floor.rooms.push(room);
        }
        
        building.floors.push(floor);
    }
    
    buildings.push(building);
}