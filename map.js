// Replace this with your real Mapbox public token from your Mapbox account
mapboxgl.accessToken = 'pk.eyJ1IjoiYXZlcnllam9obnMiLCJhIjoiY21ndGtsNXh5MDVubDJubmFuZGc4bXZkYyJ9.AAcmtIr3_LS5Ej-9AHiJtw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11', // you can change this later
    center: [-77.0369, 38.9072], // Washington, DC
    zoom: 10.5
});

// Zoom + rotation controls
map.addControl(new mapboxgl.NavigationControl());

// When the map has loaded, add your data layer
map.on('load', () => {
    map.addSource('cases', {
        type: 'geojson',
        data: 'data/cases.geojson'
    });

    map.addLayer({
        id: 'cases-layer',
        type: 'circle',
        source: 'cases',
        paint: {
            'circle-radius': 6,
            'circle-color': '#d62728',
            'circle-opacity': 0.85
        }
    });

    // Click popup for each point
    map.on('click', 'cases-layer', (e) => {
        const props = e.features[0].properties;

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                <b>${props.name || 'Unknown Name'}</b><br>
                Status: ${props.status || 'N/A'}<br>
                Year: ${props.year || 'N/A'}
            `)
            .addTo(map);
    });

    // Change cursor on hover
    map.on('mouseenter', 'cases-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'cases-layer', () => {
        map.getCanvas().style.cursor = '';
    });
});

