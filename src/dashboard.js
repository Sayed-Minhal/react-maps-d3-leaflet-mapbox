import React, {Fragment} from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './Menu/listItems';
import WorldMapMapboxAnimatedDot from './Mapbox/mapboxanimateddot'
import WorldMapLeafletMapbox from './leaflet/leafletmapbox' 
import WorldMapMapbox from './Mapbox/mapboxtiles' //Included
import WorldMapD3 from './App' //Included
import WorldMapCities from './D3/d3globalcities'



function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" to="https://material-ui.com/">
        Material-UI 
      </Link>
      {' team and used delightfully by Sayed Minhal.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(0.5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: '75vh',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
  <BrowserRouter>
  <Fragment>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        
        <Grid container spacing={2}>
            <Route exact path="/" render={()=> 
				<Grid item xs={12} md={8} lg={12}>
				  <Paper className={fixedHeightPaper}>
					<WorldMapCities />
				  </Paper>
				</Grid>
			} />
			<Route exact path="/map" render={()=>
				<Grid item xs={12} md={8} lg={12}>
				  <Paper className={fixedHeightPaper}>
					<WorldMapLeafletMapbox />
				  </Paper>
				</Grid> 
			}  />
			<Route exact path="/mapanimatedmarker" render={()=>
				 <Grid item xs={12} md={8} lg={12}>
				  <Paper className={fixedHeightPaper}>
					<WorldMapMapboxAnimatedDot id='mapboxroot'/>
				  </Paper>
				</Grid> 
			} />
            <Route exact path="/othermaps" render={()=> 
				<Grid container spacing={2}>
					<Grid item xs={12} md={8} lg={12}>
					  <Paper className={fixedHeightPaper}>
						<WorldMapMapbox />
					  </Paper>
					</Grid> 
					<Grid item xs={12} md={8} lg={12}>
					  <Paper className={fixedHeightPaper}>
						<WorldMapD3 />
					  </Paper>
					</Grid> 
				</Grid>
			} />
			
          </Grid>
        </Container>
        <MadeWithLove />
      </main>
    </div>
	</Fragment>
	</BrowserRouter>
  );
}