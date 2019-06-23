import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import WorldMap from './App';
//import WorldMap from './leaflet/leafletmap';
import WorldMap from './leaflet/leafletmapbox';
import Dashboard from './dashboard';
import WorldMapMapboxAnimatedDot from './Mapbox/mapboxanimateddot';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Dashboard />, document.getElementById('root'));
//ReactDOM.render(<WorldMap />, document.getElementById('root'));
//ReactDOM.render(<WorldMap />, document.getElementById('root'));
//ReactDOM.render(<WorldMapMapBox />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
