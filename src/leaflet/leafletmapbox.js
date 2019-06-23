import React from 'react';
import { Map,CircleMarker,Tooltip, TileLayer } from 'react-leaflet';
import '../index.css'
import Typography from '@material-ui/core/Typography';
const mapCenter = [12, 78];
const zoomLevel = 4;

class WorldMapLeafletMapbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gdata:[] }
    }
    componentWillMount() {
        //fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
        fetch("/earthquakes.geojson").then(response => response.json()).then(data => { 
            this.setState({ gdata: data.features }); 
            console.log(data); 
        });
    }

    render() {
        return (
            <div><Typography 
            variant="body2" color="textSecondary" align="center" style={{paddingBottom:'5px'}}>Showing earthquake markers and tooltips using Mapbox tiles and Leaflet</Typography>
                <Map
                    center={mapCenter}
                    zoom={zoomLevel}
                    style={{ height: '69.5vh', width:'87.5vw' }}
                >
                    <TileLayer
                        attribution="Mapbox"
                        url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                     { 
                        this.state.gdata.filter(i=> i.properties.mag>5).map(d=>{ 
                            console.log(d);
                            return (<CircleMarker 
                                key={`myspan${d.geometry.coordinates[0]}-${d.geometry.coordinates[1]}`+Math.random()} 
                                id={`myspan${d.geometry.coordinates[0]}-${d.geometry.coordinates[0]}`} 
                                center={[d.geometry.coordinates[1],d.geometry.coordinates[0]]} 
                                radius={d.properties.mag}
                                fillOpacity={1}>
                                    <Tooltip 
                                        direction="top" 
                                        offset={[10, -10]} 
                                        opacity={1}>
                                        {`Magnitude: ${d.properties.mag} \n Time:` + new Date(d.properties.time)}
                                    </Tooltip>
                                </CircleMarker>)
                        })
                    }  
                </Map>
            </div>
        );
    }
}

export default WorldMapLeafletMapbox;