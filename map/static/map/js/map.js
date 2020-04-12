
 
    $(document).ready(function() {

       //map intialization start

        map = L.map('mapid', {
            zoomControl: false

        }).setView([28.410728397237914, 84.4024658203125], 8); 

        map.createPane("tilePane").style.zIndex = 200;
        map.createPane("baseLayerPane").style.zIndex = 150;
        map.createPane("topPane").style.zIndex = 701;
       
                
       var mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/upendraoli/cjuvfcfns1q8r1focd0rdlgqn/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidXBlbmRyYW9saSIsImEiOiJjaWYwcnFnNmYwMGY4dGZseWNwOTVtdW1tIn0.uhY72SyqmMJNTKa0bY-Oyw', {
                attribution: '&copy; <a href="https://www.mapbox.com">Mapbox</a>',
                pane:"baseLayerPane"
            }).addTo(map);

            L.control.scale({
                position: 'bottomright',
                metric: true,
                imperial: false,
                maxWidth:200
            }).addTo(map);
            L.control.zoom({
                position: 'bottomright'
            }).addTo(map);

            //map initialization end


            //map load function 
            function LoadMap(layer_name,url,style){
                console.log('function ')

                window[layer_name] = new L.geoJson.ajax(url, {

                    pointToLayer: function (feature, latlng) {

                        var marker = L.circleMarker(latlng, {
                            
                        });
                        return marker;

                    },
    
    
                    onEachFeature: function (feature, layer) {
                        
    
    
                    //     var contentString = createPopup(feature, layername);
                        layer.bindPopup(L.popup({
                            //closeOnClick: true,
                            //closeButton: true,
                            keepInView: true,
                            autoPan: true,
                            maxHeight: 200,
                            minWidth: 250,
                            pane: "topPane"
                        }).setContent(feature.properties.name));
    
                        layer.setStyle(style);
                    }
    
                });
               

                
                
            }


            //loading district nepal layer load
            
            dist_style = ({
                fillColor: "red",
                fillOpacity: 0,
                weight: 1.7,
                opacity: 1,
                color: '#a3b7e3',
                fill: true,

            });
            
            LoadMap('district', 'http://localhost:8022/map/district',dist_style);

            
            
            map.addLayer(district);
            

            

            //municipality layer load map

            mun_style = ({
                fillColor: "#dee2e6",
                fillOpacity: 0.4,
                weight: 1.9,
                opacity: 2,
                color: 'black',
                fill: true,

            }); 

            LoadMap('municipality', 'http://localhost:8022/map/municipality',mun_style);

            // map.addLayer(municipality);

            setTimeout(function(){ 
                map.addLayer(municipality)
                $(".loader_img").css('display','none')
            
            }, 8000);
            
            // river layer load 

            river_url= 'http://localhost:8022/map/river';

            river_style = ({
                fillColor: "green",
                fillOpacity: 0,
                weight: 1.9,
                opacity: 1,
                color: 'blue',
                fill: true,

            });

            LoadMap('river', river_url,river_style);

            //load settlement


            settlement_url= 'http://localhost:8022/map/settlement';

            settlement_style = ({
                fillColor: '#5e7e9a',
                weight: 5,
                opacity: 0.5,
                color: '#152c40',
                radius: '4',
                fillOpacity: 0.9
                                

            });

            LoadMap('settlement', settlement_url,settlement_style);
            // map.addLayer(settlement)

            //loading contour

            con_url= 'http://localhost:8022/map/contour';

            con_style = ({
                fillColor: "green",
                fillOpacity: 0,
                weight: 2,
                opacity: 1,
                color: '#777171',
                fill: true,

            });

            LoadMap('contour', con_url,con_style);
            // map.addLayer(contour)



           


            // loading selected layer of Gis category
        
            $(".gis").on('click', function () {
                
                var parent_id = $(this).attr("id");
                console.log(parent_id)

                if(parent_id=='river'){

                if (map.hasLayer(river)){
                    map.removeLayer(river);
                    map.addLayer(district);

                }else{
                    
                    map.addLayer(river);
                    map.removeLayer(district);
                    map.fitBounds(river.getBounds());
                }
                

                    }else if(parent_id=='settle'){

                        if (map.hasLayer(settlement)){
                            map.removeLayer(settlement);
                            map.addLayer(district);
        
                        }else{
                            
                            map.addLayer(settlement);
                            map.removeLayer(district);
                            map.fitBounds(settlement.getBounds());
                        }

                    
                    }else if(parent_id=='contour'){

                        if (map.hasLayer(contour)){
                            map.removeLayer(contour);
                            map.addLayer(district);
        
                        }else{
                            
                            map.addLayer(contour);
                            map.removeLayer(district);
                            map.fitBounds(contour.getBounds());
                        }
                    
                    
                    }else{

                        
                        console.log('data')
                    }
                


            });
      
            

    }); //end

