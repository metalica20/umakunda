
 
    $(document).ready(function() {
        var mymap = L.map('mapid').setView([27.608421548604188, 85.3887634444982], 11);
        //  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        //     subdomains: 'abcd',
        //     maxZoom: 19
        // }).addTo(mymap);

        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        //     subdomains: 'abcd',
        //     maxZoom: 19
        // }).addTo(mymap);
                
       var mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/upendraoli/cjuvfcfns1q8r1focd0rdlgqn/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidXBlbmRyYW9saSIsImEiOiJjaWYwcnFnNmYwMGY4dGZseWNwOTVtdW1tIn0.uhY72SyqmMJNTKa0bY-Oyw', {
                attribution: '&copy; <a href="https://www.mapbox.com">Mapbox</a>'
            }).addTo(mymap);
    });

