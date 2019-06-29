import React from 'react';
import {Link} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LanguageIcon from '@material-ui/icons/Language';
import MapIcon from '@material-ui/icons/Map';
import SatelliteIcon from '@material-ui/icons/Satellite'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

function ListItemLink(props) {
  return (
  <Link {...props} className="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button">
		{ 
			props.icon=="LanguageIcon" ? (
				<ListItemIcon>
					<LanguageIcon fontSize="large" />
				</ListItemIcon>
				
			): ''
		} {
			props.icon=="BarChartIcon" ? (
				<ListItemIcon>
					<BarChartIcon fontSize="large" />
				</ListItemIcon>
				
			): ''
		}
		
		{
			props.icon=="MapIcon" ? (
				<ListItemIcon>
					<MapIcon fontSize="large"/>
				</ListItemIcon>
				
			): ''
		}
		
		{
			props.icon=="SatelliteIcon" ? (
				<ListItemIcon>
					<SatelliteIcon fontSize="large"/>
				</ListItemIcon>
				
			): ''
		}
		
		{
			props.icon=="DashboardIcon" ? (
				<ListItemIcon>
					<DashboardIcon fontSize="large"/>
				</ListItemIcon>
				
			): ''
		}
		<ListItemText primary={props.text} />
  </Link>
  );
}

export const mainListItems = (
  <div>
	<ListItemLink to="/" text="Spherical Map - D3" icon="LanguageIcon" />
	<ListItemLink to="/map" text="Tiles - Marker & Tooltip" icon="MapIcon" />
	<ListItemLink to="/mapanimatedmarker" text="Animated Markers" icon="SatelliteIcon" />
	<ListItemLink to="/othermaps" text="Other - D3-SVG-Ink" icon="DashboardIcon" />
	
	{/* <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem> 
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>*/}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
	{/*<ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />*/}
    </ListItem>
  </div>
);