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
    
    map.addSource('J2_source', {
        type: 'geojson',
        data: './asset/j2.geojson'
    });
    
    map.addSource('J3_source', {
        type: 'geojson',
        data: './asset/j3.geojson'
    });
    
    // Add Layers.
    map.addLayer({
        'id': 'buildings',
        'type': 'fill-extrusion',
        'source': 'buildings_source',
        'layout': {},
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
    floorLayerNames.push("J3");
})