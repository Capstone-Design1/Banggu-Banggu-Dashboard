// declare class.
function Building(name) {
    this.name = name;
    
    var color;
    var floors = [];
}
Building.prototype.getProperty = function () {
    
    var self = this;
    
    var building = getObjectByName(self.name, json_buildings);
    self.property = building.property;
    self.lat = building.lat;
    self.lng = building.lng;
}
Building.prototype.updateColor = function () {
    this.color = returnEvaluatedColor(this.property.evaluation);
    $("#" + this.name).css("background-color", this.color);
}

function Floor(name) {
    this.name = name

    var color;
    var rooms = [];
}
Floor.prototype.getProperty = function () {
    
    var self = this;
    var building = getObjectByName(currentBuilding.name, json_buildings);
    var floor = getObjectByName(self.name, building.floor);
    self.property = floor.property;
    
}
Floor.prototype.updateColor = function () {
    this.color = returnEvaluatedColor(this.property.evaluation);
    $("#" + this.name).css("background-color", this.color);
}

function Room(name) {
    this.name = name;
    
    var color;
}
Room.prototype.getProperty = function () {
    var self = this;
    
    var building = getObjectByName(currentBuilding.name, json_buildings);
    var floor = getObjectByName(currentFloor.name, building.floor);
    var room = getObjectByName(self.name, floor.room);
    
    self.property = room.property;
    self.lat = room.lat;
    self.lng = room.lng;
}
Room.prototype.updateColor = function () {
    this.color = returnEvaluatedColor(this.property.evaluation);
    $("#" + this.name).css("background-color", this.color);
}

function getObjectByName(name, objectList){
    for(var i in objectList)
        if( objectList[i].name == name )
            return objectList[i]; 
}
function returnEvaluatedColor(evaluation){
    return colorLegend[parseInt(evaluation)];
}
function returnLegend(){
    
    var legend = $("<div class='legend'></div>");
    for( var i in colorLegend){
        var div = $("<div></div>");
        div.css('background-color', colorLegend[4-i]);
        legend.append(div);
    }
    
    return legend;
}