mapboxgl.accessToken = 'pk.eyJ1IjoiaGV1bXNpIiwiYSI6ImNqYng3ZW0xYTJsZHQycXBhM2F1bm9yMXIifQ.kV_zhG36r5EIXXT__LzlCw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/heumsi/cjh1fo0ab07p32sqso4qfzjbr',
    center: [126.941667, 37.550901],
    zoom: 17.11,
    bearing: -13.6,
    hash: true
});

var buildingLayerNames = [];
var floorLayerNames = [];

map.on('load', function () {
    map.addSource('buildings_source', {
        type: 'geojson',
        data: './asset/buildings.geojson'
    });
    
    map.addSource('J2_source', {
        type: 'geojson',
        data: './asset/j2.geojson'
    });
    
    map.addSource('J3_source', {
        type: 'geojson',
        data: './asset/j3.geojson'
    });
    
    map.addLayer({
        'id': 'buildings',
        'type': 'fill-extrusion',
        'source': 'buildings_source',
        'layout': {},
        'paint': {
            'fill-extrusion-color': {
                property : 'evaluation',
                stops: colorStep
            },
            'fill-extrusion-height': 0
//            'fill-extrusion-height': ["*", 10, ["get", "evaluation"]],
        },
        'minZoom': '3',
        'zoom': '3'
    });
    buildingLayerNames.push("buildings");

    map.addLayer({
        'id': 'J2',
        'type': 'fill-extrusion',
        'source': {
            'type': 'geojson',
            'data': './asset/j2.geojson'
        },
        'layout': {
            'visibility': 'none'
        },
       'paint': {
            'fill-extrusion-color': {
                property : 'evaluation',
                stops: colorStep
            },
            'fill-extrusion-height': 2
        },
        'minzoom': 19.5,
    });
    floorLayerNames.push("J2");

    map.addLayer({
        'id': 'J3',
        'type': 'fill-extrusion',
        'source': {
            'type': 'geojson',
            'data': './asset/j3.geojson'
        },
        'layout': {
            'visibility': 'none'
        },
         'paint': {
            'fill-extrusion-color': {
                property : 'evaluation',
                stops: colorStep
            },
            'fill-extrusion-height': 2
        },
        'minzoom': 19.5,
        'visibility': 'none'
    });
    floorLayerNames.push("J3");
})

map.on('click', 'J-building', function (e) {
    var properties = e.features[0].properties;

    //        tooltip box    
    var description =
        "<p>평가 : <span class='" + properties.evaluation + "'>" +
        properties.evaluation + "</span></p>" +
        "<p>온도 : <span class='" + properties.evaluation + "'>" +
        properties.temperature + " ℃</p>" +
        "<p>습도 : <span class='" + properties.evaluation + "'>" +
        properties.humidity + " %</p>" +
        "<p>미세먼지 : <span class='" + properties.evaluation + "'>" +
        properties.dust + " </p> " +
        "<p>CO2 : <span class='" + properties.evaluation + "'>" +
        properties.co2 + " ppm</p> ";

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'J-building', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', function () {
    map.getCanvas().style.cursor = '';
});