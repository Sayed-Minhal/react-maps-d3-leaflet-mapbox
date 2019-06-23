import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Typography from '@material-ui/core/Typography';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
//const mapCenter = [39.9528, -75.1638];
//const zoomLevel = 2;

const mapCenter = [20,70];
const zoomLevel = 4;

class WorldMapMapbox extends React.Component {

  render() {
    return (
        <div>
            <Typography 
                variant="body2" 
                color="textSecondary" 
                align="center" 
                style={{paddingBottom:'15px'}}>Showing world map using Mapbox tiles</Typography>
            <Map
                center={mapCenter}
                zoom={zoomLevel}
                style={{ height: '69.5vh', width:'87.5vw' }}
            >
                <TileLayer
                    attribution={stamenTonerAttr}
                    url={stamenTonerTiles}
                />
            </Map>
        </div>
    );
  }
}

export default WorldMapMapbox;