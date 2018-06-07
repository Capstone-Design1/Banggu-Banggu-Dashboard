mapboxgl.accessToken = 'pk.eyJ1IjoiaGV1bXNpIiwiYSI6ImNqYng3ZW0xYTJsZHQycXBhM2F1bm9yMXIifQ.kV_zhG36r5EIXXT__LzlCw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/heumsi/cjh0r8to2000x2rmwg74mkww1',
    center: [126.941667, 37.550901],
    zoom: 17.11,
    bearing: -13.6,
    hash: true
});

// Variables saving each layer name.
// These are used for accessing each layers by name. (using map.getSource(name, ...))
var buildingLayerNames = [];
var floorLayerNames = [];

map.on('load', function () {

    // Add Sources.
    map.addSource('buildings_source', {
        type: 'geojson',
        data: './asset/buildings.geojson'
    });

    // Add Layers.
    
    // 1. buildings (1-depth)
    // 1-1. polygon layer.
    // 1-2. label layer.
    
    map.addLayer({
        'id': 'buildings',
        'type': 'fill-extrusion',
        'source': 'buildings_source',
        'paint': {
            'fill-extrusion-color': ["step",
                    ["get", "evaluation"],
                    colorStep[0][1],
                    colorStep[1][0], colorStep[1][1],
                    colorStep[2][0], colorStep[2][1],
                    colorStep[3][0], colorStep[3][1],
                    colorStep[4][0], colorStep[4][1]
                ],
            'fill-extrusion-height': 0
        },
        'minZoom': '3',
        'zoom': '3'
    });
    
    map.addLayer({
        "id": "buildings_labels",
        "type": "symbol",
        'source': {
            'type': 'geojson',
            'data': './asset/buildings_labels.geojson'
        },
        "layout": {
            "symbol-placement": "point",
            "text-font": ["Open Sans Regular"],
            "text-field": '{name}',
            "text-size": 16
        }
    });

    buildingLayerNames.push("buildings");

    // 2. rooms (2-depth)
    // 2-1. room polygon layer.
    // 2-2. existnece polygon layer.
    // 2-3. label layer.
    
    // J2
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
            'fill-extrusion-color': ["step",
                    ["get", "evaluation"],
                    colorStep[0][1],
                    colorStep[1][0], colorStep[1][1],
                    colorStep[2][0], colorStep[2][1],
                    colorStep[3][0], colorStep[3][1],
                    colorStep[4][0], colorStep[4][1]
                ],
            'fill-extrusion-height': 2
        },
        'minzoom': 19.4,
    });
    
    map.addLayer({
        'id': 'J2_existence',
        'type': 'fill-extrusion',
        'source': {
            'type': 'geojson',
            'data': './asset/j2_existence.geojson'
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-extrusion-color': '#99ccff',
            'fill-extrusion-height': ["*", ["get", "existence"], 4]
        },
        'minzoom': 19.4,
    });
    map.addLayer({
        "id": "J2_labels",
        "type": "symbol",
        'source': {
            'type': 'geojson',
            'data': './asset/j2_labels.geojson'
        },
        "layout": {
            "symbol-placement": "point",
            "text-font": ["Open Sans Regular"],
            "text-field": '{name}',
            "text-size": 16,
            'visibility': 'none'
        }
    });
    floorLayerNames.push("J2");

    // J3
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
            'fill-extrusion-color': ["step",
                    ["get", "evaluation"],
                    colorStep[0][1],
                    colorStep[1][0], colorStep[1][1],
                    colorStep[2][0], colorStep[2][1],
                    colorStep[3][0], colorStep[3][1],
                    colorStep[4][0], colorStep[4][1]
                ],
            'fill-extrusion-height': 2
        },
        'minzoom': 19.4,
        'visibility': 'none'
    });
    map.addLayer({
        'id': 'J3_existence',
        'type': 'fill-extrusion',
        'source': {
            'type': 'geojson',
            'data': './asset/j3_existence.geojson'
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-extrusion-color': '#99ccff',
            'fill-extrusion-height': ["*", ["get", "existence"], 4]
        },
        'minzoom': 19.4,
    });
    map.addLayer({
        "id": "J3_labels",
        "type": "symbol",
        'source': {
            'type': 'geojson',
            'data': './asset/j3_labels.geojson'
        },
        "layout": {
            "symbol-placement": "point",
            "text-font": ["Open Sans Regular"],
            "text-field": '{name}',
            "text-size": 16,
            'visibility': 'none'
        }
    });
    floorLayerNames.push("J3");
    
    // K5
    var url = 'http://ec2-13-209-35-182.ap-northeast-2.compute.amazonaws.com:8000/api/k/5';
    window.setInterval(function() {
        map.getSource('K5_src').setData(url);
    }, 2000);
    map.addSource('K5_src', { type: 'geojson', data: url });
    map.addLayer({
        'id': 'K5',
        'type': 'fill-extrusion',
        'source': 'k5_src',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-extrusion-color': ["step",
                    ["get", "evaluation"],
                    colorStep[0][1],
                    colorStep[1][0], colorStep[1][1],
                    colorStep[2][0], colorStep[2][1],
                    colorStep[3][0], colorStep[3][1],
                    colorStep[4][0], colorStep[4][1]
                ],
            'fill-extrusion-height': 2
        },
        'minzoom': 19.4,
        'visibility': 'none'
    });
    map.addLayer({
        'id': 'K5_existence',
        'type': 'fill-extrusion',
        'source': {
            'type': 'geojson',
            'data': './asset/k5_existence.geojson'
        },
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-extrusion-color': '#99ccff',
            'fill-extrusion-height': ["*", ["get", "existence"], 4]
        },
        'minzoom': 19.4,
    });
    map.addLayer({
        "id": "K5_labels",
        "type": "symbol",
        'source': {
            'type': 'geojson',
            'data': './asset/k5_labels.geojson'
        },
        "layout": {
            "symbol-placement": "point",
            "text-font": ["Open Sans Regular"],
            "text-field": '{name}',
            "text-size": 16,
            'visibility': 'none'
        }
    });
    floorLayerNames.push("K5");
})