import React,{useEffect} from 'react'
import { Meteor } from 'meteor/meteor';

import NavBar from '../home/NavBar.jsx'
import GetIcon from './GetIcon.jsx'
import { CardCounter } from './CardCounter.jsx'
import ThemeDashboard from './ThemeDashboard.jsx'
import { BrowserRouter as Router, Switch, Route, Link as ReactLink, Redirect } from 'react-router-dom'

// import { MuiThemeProvider } from '@material-ui/core'
import { makeStyles } from '@mui/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import ListItemText from '@material-ui/core/ListItemText'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'
import Fade from '@material-ui/core/Fade'
import Card from '@material-ui/core/Card'
import Popper from '@material-ui/core/Popper'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import { ReactiveVar } from 'meteor/reactive-var'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import MenuList from '@material-ui/core/MenuList'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import CloseIcon from '@material-ui/icons/Close'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { CaregiverDashboardMenu, Caregiver } from '../Caregiver/Caregiver'
import { ClientDashboardMenu } from '../Client/Client'
import { SuperAdminDashboardMenu } from '../admin/superAdmin'
import { useTracker } from 'meteor/react-meteor-data'
import { Page404 } from './Page404'
import { createTheme } from '@mui/material/styles'
import { useHistory } from 'react-router-dom'
const drawerWidth = 260

theme = createTheme()
const useStyles = makeStyles((x)=>({
	root: {
		display: 'flex',
	},
	drawer:{
		minWidth:drawerWidth,
		flexShrink:0,
		border:"none",
		
	},
	drawerPaper:{
		width:drawerWidth,
	},
	drawerContainer:{
		overflow:'auto',
	},
	toolDrawer:{
		width:drawerWidth
	},
	contentMain:{
		flexGrow:1,
		padding:theme.spacing(3),
		// height:'calc(100vh - 64px)',
		overflowY:'auto',
		marginTop:0 // default:64
	},
	swipeableDrawer:{
		width:drawerWidth
	},
	drawerHeader:{
		paddingTop:30,
		paddingLeft:10,
		shadow:0
	},
	drawerHeaderText:{
		paddingTop:10,
		paddingBottom:20
	},
	toolbar:theme.mixins.toolbar,
	rootMain:{
	  flexGrow: 1,
		marginBottom:theme.spacing(10)
	},
}))
function ListDashboard(props){
	itemIndex = new Object()
	let items = []
	// Tracker.autorun(() => {
	// 	console.log('wew')
	// 	console.log(LoadDashboard())
	// if(LoadDashboard())
	// 	console.log(Roles.userIsInRole(Meteor.userId(),'Caregiver'))
	// })
	// console.log(items)

	if(Roles.userIsInRole(Meteor.userId(),'Caregiver'))
		items = CaregiverDashboardMenu()
	if(Roles.userIsInRole(Meteor.userId(),'Owner'))
		items = ClientDashboardMenu()
	if(Roles.userIsInRole(Meteor.userId(), ['SuperAdmin'], 'CareLocation'))
		items = SuperAdminDashboardMenu()
	items.map((o)=>{
		itemIndex = {[o.MenuName]:false, ...itemIndex}
	})
	
	const history = useHistory();
	const [dashState, dashSetState] = React.useState(itemIndex)
	function handleClick (index, link){
		history.push(link)
		dashSetState({[index]:true})
		switch (index){
			case 'Logout':
				Meteor.logout()
				Router.go('/Login')
			break
		}
	}
	return(
		<List>
			{items.map((o,i)=>(
				<React.Fragment key={`i_${i}`}>
					{o.MenuName != 'Divider'?ListItemforDrawer(o,i):<Divider/>}
					{MoreMenu(o,i)}
				</React.Fragment>
			))}
		</List>
	)

	function ListItemforDrawer(o,i){
		return(
			<>
				{/* <Link style={{ textDecoration: 'none' }}> */}
					<ListItem button onClick={()=>handleClick(o.MenuName,o.href)} key={`k-${i}`}>
						<ListItemIcon>
							<GetIcon icon={o.iconTagName}/>
						</ListItemIcon>
						<ListItemText disableTypography
							primary={<Typography type="body2" color="textSecondary">{o.MenuName}</Typography>} />
						{o.Moremenu?dashState[o.MenuName] ? <ExpandLess /> : <ExpandMore />:false}
					</ListItem>
				{/* </Link> */}
			</>
		)
	}

	function MoreMenu(o,i){
		if(o.subMenu)
		return (
			<Collapse in={dashState[o.MenuName]} timeout="auto">
				{o.subMenu.map((k,l)=>(
					<ReactLink to={k.href}>
						<Link style={{ textDecoration: 'none'}} key={`k-${i}-${l}`}>
							<ListItem button style={{paddingLeft:30}}>
								<ListItemIcon>
									<GetIcon icon={k.iconTagName}/>
								</ListItemIcon>
								<ListItemText disableTypography
									primary={<Typography type="body2" color="textSecondary">{k.MenuName}</Typography>} />
							</ListItem>
						</Link>
					</ReactLink>
				))}
			</Collapse>
		)
	}
	
}

function DrawerHeader(props){
	const {user} = props
	const classes = useStyles()
	return(
		<Box className={classes.drawerHeader}>
			<Avatar alt="Cindy Baker" src="/assets/img/aboutUs/ceo.jpg" />
			<Box className={classes.drawerHeaderText}>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					{user.profile.Name}
				</Typography>
				<Typography variant="caption" display="block" gutterBottom>
       		{user.emails[0].address}
      	</Typography>
			</Box>
		</Box>
	)
}

const LoadDashboard = () => useTracker(()=> {
	let roleSubscription = Meteor.subscribe("loadRoles", Meteor.userId())
	return roleSubscription.ready()
},[])

export default function Dashboard({DashboardContent}){
	const classes = useStyles()
	Meteor.subscribe("loadRoles", Meteor.userId())
	const [state, setState] = React.useState(false)
	console.log(Meteor.user())
	Accounts.onLogout(()=>{
		Router.go('/login')
	})
	toggleDrawer = (open) => (event) => {
		setState(open)
	}
	const [openAnchorEl, setOpenUser] = React.useState({userSubmenu:null, notification:null})
	const handleOpenUser = (event) => {
		var anchor = event.currentTarget.getAttribute("data")
		setOpenUser( prevState => (openAnchorEl[anchor] ? {...prevState, [anchor]:null} : {...prevState, [anchor]:event.currentTarget}))
		console.log(openAnchorEl)
	}
	const handleCloseUserSubmenu = (event) => {
		setOpenUser(prevState=>({...prevState, userSubmenu:null}))
	}
	const handleCloseUserNotification = (event) => {
		setOpenUser(prevState=>({...prevState, notification:null}))
	}

	var user = Meteor.user()

	const LoadtoDashboard = ()=>{
		if(LoadDashboard()){
			if(Roles.userIsInRole(Meteor.userId(),'Caregiver'))
				return <Caregiver />
			else if(Roles.userIsInRole(Meteor.userId(),'Owner'))
				return <Client />
		}else
			return null
	// if(Roles.userIsInRole(Meteor.userId(), ['SuperAdmin'], 'CareLocation'))
	}
	if(LoadDashboard())
		return (
			<React.Fragment>
			<Router>
				{Meteor.userId()?"":<Redirect to="/Login"/>}
				<div className={classes.root}>
					<CssBaseline />
					<Hidden smDown>
						<Drawer
							className={classes.drawer}
							variant="permanent"
							color="primary"
						>
							<Toolbar />
							<div className={classes.drawerContainer}>
								{/* <Divider /> */}
									<ListDashboard />
							</div>
						</Drawer>
					</Hidden>
					<Hidden mdUp>
					{['left'].map((anchor,i) => (
						<React.Fragment key={i}>
							<SwipeableDrawer
								anchor='left'
								open={state}
								onClose={toggleDrawer(false)}
								onOpen={toggleDrawer(true)}
								classes={{
									paper: classes.drawerPaper,
								}}>
								<DrawerHeader user={user}/>
								<Divider />
									<ListDashboard />
							</SwipeableDrawer>
						</React.Fragment>
					))}
					</Hidden>
					<main className={classes.contentMain}>
						<div className={classes.rootMain}>
							<Grid container spacing={5} justifyContent="space-between">
								<Grid item md={8} sm={12} lg ={8} xs={12} style={{overflowY:'auto'}}>
									<NavBar sidebar={setState}/>

										<LoadtoDashboard/>
										{/* <Route component={Page404}/> */}
										{/* {DashboardContent} */}
								</Grid>
								<Hidden smDown>
									<Grid item md={4} lg={4} component={Paper} style={{maxWidth:250}}>
										'report side'
									</Grid>
								</Hidden>
							</Grid>
						</div>
					</main>
				</div>
			</Router>
		</React.Fragment>
		)
	else
		return 'Loading...'
}