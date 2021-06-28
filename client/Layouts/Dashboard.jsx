import React,{useEffect} from 'react'
import { Meteor } from 'meteor/meteor';

import NavBar from '../home/NavBar.jsx'
import GetIcon from './GetIcon.jsx'
import { CardCounter } from './CardCounter.jsx'
import ThemeDashboard from './ThemeDashboard.jsx'
import dashboardMenu from	'../../imports/js/dashboardMenu.jsx'

import { MuiThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import { ReactiveVar } from 'meteor/reactive-var'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import CloseIcon from '@material-ui/icons/Close'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const drawerWidth = 260
const useStyles = makeStyles((theme)=>({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer:{
		minWidth:drawerWidth,
		flexShrink:0,
		border:"none"
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
		height:'calc(100vh - 64px)',
		overflowY:'auto',
		marginTop:64
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
	const items = dashboardMenu()
	items.map((o)=>{
		itemIndex = {[o.MenuName]:false, ...itemIndex}
	})
	const [dashState, dashSetState] = React.useState(itemIndex)
	function handleClick (index){
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
			<Link href={o.href} style={{ textDecoration: 'none' }}>
				<ListItem button onClick={()=>handleClick(o.MenuName)} key={`k-${i}`}>
					<ListItemIcon>
						<GetIcon icon={o.iconTagName}/>
					</ListItemIcon>
					<ListItemText disableTypography
	      	  primary={<Typography type="body2" color="textSecondary">{o.MenuName}</Typography>} />
					{o.Moremenu?dashState[o.MenuName] ? <ExpandLess /> : <ExpandMore />:false}
				</ListItem>
			</Link>
		)
	}

	function MoreMenu(o,i){
		if(o.subMenu)
		return (
			<Collapse in={dashState[o.MenuName]} timeout="auto">
				{o.subMenu.map((k,l)=>(
					<Link href={k.href} style={{ textDecoration: 'none'}} key={`k-${i}-${l}`}>
						<ListItem button style={{paddingLeft:30}}>
							<ListItemIcon>
								<GetIcon icon={k.iconTagName}/>
							</ListItemIcon>
							<ListItemText disableTypography
	       				primary={<Typography type="body2" color="textSecondary">{k.MenuName}</Typography>} />
						</ListItem>
					</Link>
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


export default function Dashboard({DashboardContent}){
	const classes = useStyles()
	const [state, setState] = React.useState(false)
	Accounts.onLogout(()=>{
		Router.go('/login')
	})
	toggleDrawer = (open) => (event) => {
		setState(open)
	}
	Meteor.subscribe("loadRoles", Meteor.userId())
	var user = Meteor.user()
	return(
		<React.Fragment>
			<MuiThemeProvider theme={ThemeDashboard}>
				<div className={classes.root}>
					<CssBaseline />
					<NavBar sidebar={setState}/>
					<Hidden smDown>
						<Drawer
							className={classes.drawer}
							variant="permanent"
							classes={{
								paper: classes.drawerPaper,
							}}
						>
							<Toolbar />
							<div className={classes.drawerContainer}>
								<Divider />
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
							{DashboardContent}
						</div>
					</main>
				</div>
			</MuiThemeProvider>
		</React.Fragment>
	)
}