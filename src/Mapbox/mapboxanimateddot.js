import React from 'react';
import mapboxgl from 'mapbox-gl';
import Typography from '@material-ui/core/Typography';
import './style.css'

class WorldMapMapboxAnimatedDot extends React.Component {
    
    constructor() {
        super();
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2F5ZWRtaW5oYWwiLCJhIjoiY2p3eW02bm16MGl2bTN5b3lwZWxsdTV1byJ9.aBW0oWkSp2xhdTM43J3VFg';
    }

    componentDidMount() {
        var map={};
        // objects for caching and keeping track of HTML marker objects (for performance)
        var markers = {};
        var markersOnScreen = {};

        var colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [70,10],
            zoom: 3
        });

        //map.addControl(new mapboxgl.NavigationControl());
        var size = 150;

        var pulsingDot = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),
             
            onAdd: function() {
                var canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                this.context = canvas.getContext('2d');
            },
             
            render: function() {
            var duration = 1000;
            var t = (performance.now() % duration) / duration;
             
            var radius = size / 2 * 0.3;
            //var radius = 5;
            var outerRadius = size / 2 * 0.7 * t + radius;
            //var outerRadius = 15;
            var context = this.context;

             
            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
            context.fill();
             
            // draw inner circle
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();
             
            // update this image's data with data from the canvas
            this.data = context.getImageData(0, 0, this.width, this.height).data;
             
            // keep the map repainting
            map.triggerRepaint();
             
            // return `true` to let the map know that the image was updated
            return true;
            }
        };

        //fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
        fetch("/earthquakes.geojson")
            .then(response => response.json()).then(data => {

                map.on('load', function () {
                    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
                    var geoData={
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": [{
                            "type": "Feature",
                            "geometry": {
                                    "type": "Point",
                                    "coordinates": [100, 35]
                                }
                            }]
                        }
                    };
                    
                    geoData.data={...data}
                    
                    map.addLayer({
                        "id": "points",
                        "type": "symbol",
                        "source": geoData,
                        "layout": {
                            "icon-image": "pulsing-dot"
                        }
                    });
                });
            });


    }

    render() {
        return (
            <div>
                <Typography variant="body2" color="textSecondary" align="center" style={{paddingBottom:'5px'}}>Showing earthquake using Mapbox with animated circle</Typography>
            <div id='map'></div>
            </div>
        );
    }
}

export default WorldMapMapboxAnimatedDot;