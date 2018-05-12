$( document ).ready(function() {
	mapboxgl.accessToken = 'pk.eyJ1IjoiaGV1bXNpIiwiYSI6ImNqYng3ZW0xYTJsZHQycXBhM2F1bm9yMXIifQ.kV_zhG36r5EIXXT__LzlCw';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/heumsi/cjh1fo0ab07p32sqso4qfzjbr',
		center: [126.941667, 37.550901],
		zoom: 17.11,
		bearing: -13.6,
		hash: false
	});

	map.on('load', function () {
		map.addLayer({
	        'id': 'J-building',
	        'type': 'fill',
	        'source': {
	            'type': 'geojson',
	            'data': './asset/J.geojson'
	        },
	        'layout': {},
	        'paint': {
	            'fill-color': '#FE2E2E',
	            'fill-opacity': 1
			}
        })
	})

	$("#all").on("click", function(){
		map.flyTo({
			center: [126.941667, 37.550901],
			zoom: 17.11
		})
	})

	$("#J").on("click", function(){
		map.flyTo({
			center : [126.9432465, 37.5504207],
			zoom : 19.3
		})
	})
});
