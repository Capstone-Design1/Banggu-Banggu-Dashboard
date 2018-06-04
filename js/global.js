/********* Dedicating current object in each depth) *********/ 
var currentBuilding = null;
var currentFloor = null;
var currentRoom = null;
/************************************************************/
var chartOn = false;

/********* color legend ***********/
var colorLegend = ["#e34a33", "#fdcc8a", "#fef0d9", "#78c679", "#31a354"];
var colorStep = [
                    [0, colorLegend[0]],
                    [1, colorLegend[1]],
                    [2, colorLegend[2]],
                    [3, colorLegend[3]],
                    [4, colorLegend[4]],
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