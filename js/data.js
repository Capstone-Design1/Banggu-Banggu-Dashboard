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
    
    
//    // before request
//    var prm = $.ajax({
//        type: "POST",
//        url: "",
//        data: {
//            name: self.name
//        }
//    });
//
//    // after response
//    prm.then(
//        function (data) {
//            self.property = JSON.parse(data);
//        },
//        function (error) {
//            console.log("ajax error. prm in " + this);
//        }
//    );
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
    
//    // before request
//    var prm = $.ajax({
//        type: "POST",
//        url: "",
//        data: {
//            name: self.name
//        }
//    });
//
//    // after response
//    prm.then(
//        function (data) {
//            self.property = JSON.parse(data);
//        },
//        function (error) {
//            console.log("ajax error. prm in " + this);
//        }
//    );
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
//    // before request
//    var prm = $.ajax({
//        type: "POST",
//        url: "",
//        data: {
//            name: self.name
//        }
//    });
//
//    // after response
//    prm.then(
//        function (data) {
//            self.property = JSON.parse(data);
//        },
//        function (error) {
//            console.log("ajax error. prm in " + this);
//        }
//    );
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
    return colorLegend[parseInt(evaluation / (0.5))];
}
//function updateGeoJson(sourceId, name){
//    var obj = map.querySourceFeatures(sourceId, {filter: ["==", "name", name]});
//    console.log(obj);
//}


// make regend
function returnLegend(){
    
    var legend = $("<div class='legend'></div>");
    for( var i in colorLegend){
        var div = $("<div></div>");
        div.css('background-color', colorLegend[9-i]);
        legend.append(div);
    }
    
    return legend;
}