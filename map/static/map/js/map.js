
 
    $(document).ready(function() {

       //map intialization start
       
        map = L.map('mapid', {
            zoomControl: false,
            

        }).setView([28.410728397237914, 84.4024658203125], 8);
        
        L.easyPrint({
            title: 'My awesome print button',
            position: 'bottomright',
            sizeModes: ['A4Portrait', 'A4Landscape']
        }).addTo(map);

        map.createPane("tilePane").style.zIndex = 200;
        map.createPane("baseLayerPane").style.zIndex = 150;
        map.createPane("topPane").style.zIndex = 430;
        map.createPane("wmsPane").style.zIndex = 400;

        var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3'],
                        pane:"baseLayerPane"
                    });
                              
        var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3'],
                        pane:"baseLayerPane"
                    });   
                
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


            //slope data 
            geo_url = 'http://139.59.67.104:8080/geoserver/Naxa/wms';
            slope = L.tileLayer.betterWms(geo_url, {
                layers: "Naxa:umakunda_slope",
                transparent: true,
                format: 'image/png',
                pane: "wmsPane"
            });

           //land residental load map 

           land_residental_url= 'http://localhost:8022/map/land-residental';

            res_style = ({
                fillColor: "green",
                fillOpacity: 0.5,
                weight: 2,
                opacity: 1,
                color: '#777171',
                fill: true,

            });

            LoadMap('land_residental', land_residental_url,res_style);
            // map.addLayer(land_residental)

            //land use load map

            land_use_url= 'http://localhost:8022/map/land-use';

            use_style = ({
                fillColor: "#4f677d",
                fillOpacity: 0.5,
                weight: 2,
                opacity: 1,
                color: '#777171',
                fill: true,

            });

            LoadMap('land_use', land_use_url,use_style);
            // map.addLayer(land_use)


            // road layer load 

            roadr_url= 'http://localhost:8022/map/road';

            road_style = ({
                fillColor: "green",
                fillOpacity: 0,
                weight: 1.9,
                opacity: 1,
                color: '#6b1a31',
                fill: true,

            });

            LoadMap('road', roadr_url,road_style);
            // map.addLayer(road)


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
                    }else if(parent_id=='slope'){

                        if (map.hasLayer(slope)){
                            map.removeLayer(slope);
                            map.addLayer(district);
        
                        }else{
                            
                            map.addLayer(slope);
                            map.removeLayer(district);
                            map.fitBounds(municipality.getBounds());
                        }

                    }else if(parent_id=='land_residental'){

                        if (map.hasLayer(land_residental)){
                            map.removeLayer(land_residental);
                            map.addLayer(district);
        
                        }else{
                            
                            map.addLayer(land_residental);
                            map.removeLayer(district);
                            map.fitBounds(land_residental.getBounds());
                        }

                    }else if(parent_id=='land'){

                        if (map.hasLayer(land_use)){
                            map.removeLayer(land_use);
                            map.addLayer(district);
        
                        }else{
                            
                            map.addLayer(land_use);
                            map.removeLayer(district);
                            map.fitBounds(land_use.getBounds());
                        }
                    }else if(parent_id=='road'){

                        if (map.hasLayer(road)){
                            map.removeLayer(road);
                            map.addLayer(district);
        
                        }else{
                            
                            map.addLayer(road);
                            map.removeLayer(district);
                            map.fitBounds(road.getBounds());
                        }    
                    
                    }else{

                        
                        console.log('data')
                    }
                


            });


            $(".layer").on('click', function () {
                
                var parent_id = $(this).attr("id");
                console.log(parent_id)

                if(parent_id=='district'){

                    if (map.hasLayer(district)){
                        map.removeLayer(district);
    
                    }else{
                        
                        map.addLayer(district);
                        map.fitBounds(district.getBounds());
                    }
                }else if(parent_id=='municipal'){

                    if (map.hasLayer(municipality)){
                        map.removeLayer(municipality);
    
                    }else{
                        
                        map.addLayer(municipality);
                        map.fitBounds(municipality.getBounds());
                    }    
                }else if(parent_id=='grey_scale'){

                    if (map.hasLayer(mapboxTiles)){
                        map.removeLayer(mapboxTiles);
    
                    }else{
                        
                        map.addLayer(mapboxTiles);
                        // map.fitBounds(municipality.getBounds());
                    }    
                }else if(parent_id=='street'){

                    if (map.hasLayer(googleStreets)){
                        map.removeLayer(googleStreets);
    
                    }else{
                        
                        map.addLayer(googleStreets);
                        // map.fitBounds(municipality.getBounds());
                    }    
                
                }else if(parent_id=='satellite'){

                    if (map.hasLayer(googleSat)){
                        map.removeLayer(googleSat);
    
                    }else{
                        
                        map.addLayer(googleSat);
                        // map.fitBounds(municipality.getBounds());
                    }        
                    
                }else{


                }

            });

            
      
            

    }); //end

