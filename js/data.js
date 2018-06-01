



// declare class.
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
        return colorLegend[0];
    }else if( 4 <= evluation & evluation < 4.5 ){
        return colorLegend[1];
    }else if( 3.5 <= evluation & evluation < 4 ){
        return colorLegend[2];
    }else if( 3 <= evluation & evluation < 3.5 ){
        return colorLegend[3];
    }else if( 2.5 <= evluation & evluation < 3 ){
        return colorLegend[4];
    }else if( 2 <= evluation & evluation < 2.5 ){
        return colorLegend[5];
    }else if( 1.5 <= evluation & evluation < 2 ){
        return colorLegend[6];
    }else if( 1 <= evluation & evluation < 1.5 ){
        return colorLegend[7];
    }else if( 0.5 <= evluation & evluation < 1 ){
        return colorLegend[8];
    }else if( 0 <= evluation & evluation < 0.5 ){
        return colorLegend[9];
    }
}
