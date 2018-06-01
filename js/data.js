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

var delay = 3000
setInterval(function() {
    
    // depth 1
    buildings.forEach( function (building, index, array) {
        building.getProperty();
        building.updateColor();
        
        // depth 2
        if( currentBuilding != null ){
            
            (currentBuilding.floors).forEach( function (floor, index, array) {
                
                floor.getProperty();
                floor.updateColor();
                
                // depth 3
                if( currentFloor != null ){
                    
                    (currentFloor.rooms).forEach( function (room, index, array) {
                
                        room.getProperty();
                        room.updateColor();
                        
                    });
                }
                
            });
           
        }
        
    })
    
}, delay);


// depth 2
flagFloors = true;







function Building(name) {
    this.name = name;
    
    var color;
    var floors = [];
}
Building.prototype.getProperty = function () {
    
    var self = this;
    
    // before request
    var prm = $.ajax({
        type: "POST",
        url: "",
        data: {
            name: self.name
        }
    });

    // after response
    prm.then(
        function (data) {
            //
        },
        function (error) {
            console.log("ajax error. prm in " + this);
            data = {
                evaluation : 4.3,
                temperature : 25.4,
                humidity : 50,
                co2 : 540,
                dust : 10
            };
            self.property = data;
//            self.property = JSON.parse(data);
//            this.evaluation = data.evaluatuon;
//            this.temperature = data.temperature;
//            this.humidity = data.humidity;
//            this.co2 = data.co2;
//            this.dust = data.dust;
            console.log(self);
        }
    );
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
    
    // before request
    var prm = $.ajax({
        type: "POST",
        url: "",
        data: {
            name: self.name
        }
    });

    // after response
    prm.then(
        function (data) {
            //
        },
        function (error) {
            console.log("ajax error. prm in " + this);
            data = {
                evaluation : 3.5,
                temperature : 25.4,
                humidity : 50,
                co2 : 540,
                dust : 10,
            };
            self.property = data;
//            self.property = JSON.parse(data);
//            this.evaluation = data.evaluatuon;
//            this.temperature = data.temperature;
//            this.humidity = data.humidity;
//            this.co2 = data.co2;
//            this.dust = data.dust;
            console.log(self);
        }
    );
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
    
    // before request
    var prm = $.ajax({
        type: "POST",
        url: "",
        data: {
            name: self.name
        }
    });

    // after response
    prm.then(
        function (data) {
            //
        },
        function (error) {
            console.log("ajax error. prm in " + this);
            data = {
                evaluation : 1.8,
                temperature : 25.4,
                humidity : 50,
                co2 : 540,
                dust : 10
            }; 
            self.property = data;
//            self.property = JSON.parse(data);
//            this.evaluation = data.evaluatuon;
//            this.temperature = data.temperature;
//            this.humidity = data.humidity;
//            this.co2 = data.co2;
//            this.dust = data.dust;
            console.log(self);
        }
    );
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
function returnEvaluatedColor(evluation){
    if( 4.5 <= evluation & evluation <= 5 ){
        return "#006837";
    }else if( 4 <= evluation & evluation < 4.5 ){
        return "#31a354";
    }else if( 3.5 <= evluation & evluation < 4 ){
        return "#78c679";
    }else if( 3 <= evluation & evluation < 3.5 ){
        return "#c2e699";
    }else if( 2.5 <= evluation & evluation < 3 ){
        return "#ffffcc";
    }else if( 2 <= evluation & evluation < 2.5 ){
        return "#fef0d9";
    }else if( 1.5 <= evluation & evluation < 2 ){
        return "#fdcc8a";
    }else if( 1 <= evluation & evluation < 1.5 ){
        return "#fc8d59";
    }else if( 0.5 <= evluation & evluation < 1 ){
        return "#e34a33";
    }else if( 0 <= evluation & evluation < 0.5 ){
        return "#b30000";
    }
}
