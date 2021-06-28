import React from 'react'
import { Meteor } from 'meteor/meteor'
import GetIcon from '../Layouts/GetIcon.jsx'

import { AppBar, Toolbar, IconButton, Typography, Button, Container, Hidden, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Popper, Grid, Link, Fade, Badge} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
export default function NavBar(props){
	const {sidebar} = props
	const useStyles = makeStyles((theme) => ({
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	  appBar: {
	    zIndex: theme.zIndex.drawer + 1,
		},
		userSubMenu: {
			paddingRight:10,
		}
		})
	)
	toggleDrawer = (open) => (event) => {
		sidebar(open)
	}
	const classes = useStyles()
	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open)
	return(
		<AppBar position={'fixed'} className={classes.appBar}>
			<Toolbar>
				<UserLoggedin/>
			</Toolbar>
		</AppBar>
	)
	function UserLoggedin(){
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
		const userSubMenu = [{
				name:'Dashboard',
				link:'/dashboard',
				icon:'DashboardIcon',
				f:function(){
					return false
				}
			},{
				name:'Preference',
				link:'/Preferences',
				icon:'SettingsIcon',
				f:function(){
					return false
				}
			},{
				name:'Logout',
				link:false,
				icon:'ExitToAppIcon',
				f:function(){
					Meteor.logout()
					return false
				}
			},
		]
		if(Meteor.userId())
			return(
				<React.Fragment>
					<Hidden mdUp>
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
							<GetIcon icon='MenuIcon'/>
						</IconButton>
					</Hidden>
					<Typography variant="h6" className={classes.title}>
						KoalaCare
					</Typography>
					<Button onClick={handleOpenUser} data="notification">
						<Badge badgeContent={4} color="primary">
							<GetIcon icon="NotificationsIcon" style={{float:'right', position:'relative', marginTop:'auto', color:'#fff'}}/>
						</Badge>
					</Button>
					<Button onClick={handleOpenUser} data="userSubmenu">
						<Grid container justify="space-between" alignItems="center">
							<Grid item>
								<Avatar src="/assets/ico.png" style={{float:'left'}}/>
							</Grid>
							<Grid item>
								<GetIcon icon="ArrowDropDownIcon" style={{float:'right', position:'relative', marginTop:'auto', color:'#fff'}}/>
							</Grid>
						</Grid>
					</Button>
					
					<Popper className={classes.userSubMenuPopper} open={Boolean(openAnchorEl.userSubmenu)} placement="bottom-end" anchorEl={openAnchorEl.userSubmenu} transition>
					{({ TransitionProps }) => (
						<ClickAwayListener onClickAway={handleCloseUserSubmenu}>
							<Fade {...TransitionProps} timeout={350}>
								<Paper>
									<MenuList autoFocusItem={openAnchorEl.userSubmenu} id="menu-list-grow" style={{paddingTop:20}} >
										{
											userSubMenu.map((o,i)=>{
												return (
													<MenuItem onClick={o.f} key={i} href={o.link} component={o.link?Link:''}>
														<Grid container justify="space-between" alignItems="center" spacing={3} className={classes.userSubMenu}>
															<Grid item>
																<Typography >{o.name}</Typography>
															</Grid>
															<Grid>
																<GetIcon icon={o.icon} style={{color:'#b5b5b5'}} align="right"/>
															</Grid>
														</Grid>
													</MenuItem>
												)
											})
										}
									</MenuList>
								</Paper>
							</Fade>
						</ClickAwayListener>
					)}
					</Popper>
					
					<Popper className={classes.userSubMenuPopper} open={Boolean(openAnchorEl.notification)} placement="bottom-end" anchorEl={openAnchorEl.notification} transition>
					{({ TransitionProps }) => (
						<ClickAwayListener onClickAway={handleCloseUserNotification}>
							<Fade {...TransitionProps} timeout={350}>
								<Paper>
									<MenuList autoFocusItem={openAnchorEl.notification} id="menu-list-grow" style={{paddingTop:20}} >
										{
											userSubMenu.map((o,i)=>{
												return (
													<MenuItem onClick={o.f} key={i} href={o.link} component={o.link?Link:''}>
														<Grid container justify="space-between" alignItems="center" spacing={3} className={classes.notification}>
															<Grid item>
																<Typography >{o.name}</Typography>
															</Grid>
															<Grid>
																<GetIcon icon={o.icon} style={{color:'#b5b5b5'}} align="right"/>
															</Grid>
														</Grid>
													</MenuItem>
												)
											})
										}
									</MenuList>
								</Paper>
							</Fade>
						</ClickAwayListener>
					)}
					</Popper>

				</React.Fragment>
			)
		else
			return(
			<React.Fragment>
				<Hidden mdUp>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
						<GetIcon icon='MenuIcon'/>
					</IconButton>
				</Hidden>
				<Typography variant="h6" className={classes.title}>
					KoalaCare 
				</Typography>
				<Hidden mdDown>
					<Button color="inherit">Home</Button>
					<Button color="inherit">What it does</Button>
					<Button color="inherit">About Us</Button>
					<Button color="inherit">Caregiver</Button>
					<Button color="inherit" href="/dashboard">Dashboard</Button>
					<Button color="inherit" href="/Signup">Signup</Button>
				</Hidden>
			</React.Fragment>
			)
	}
}