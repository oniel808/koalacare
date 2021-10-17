import React from 'react'
import { Typography, Button, Container, Box, Grid, Link, Hidden, AppBar, Toolbar, IconButton, Drawer, List, ListItem,	ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import GetIcon from '../Layouts/GetIcon.jsx'
import { green } from '@material-ui/core/colors'
import { makeStyles } from '@mui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@mui/styles'
import { createTheme } from '@mui/material/styles'


const theme = createTheme()
const useStyles = makeStyles((theme)=>({
	navMenu:{
    color:'#2d3436'
  },
  navRoot:{
    marginRight:'auto',
    boxShadow:'0px 0px 0px transparent'
  },
  menuButton:{
    // marginRight: theme.spacing(2),
    marginRight: 2,
  },
  title:{
    marginRight:'auto',
    [theme.breakpoints.down('sm')]: {
      width:'100% !important',
    },
  },
  drawerPaper:{
    width:'100%',
    backgroundColor:'#FAFAFA'
  },
	Footer:{
		paddingTop:150,
		paddingBottom:100,
		color:"#4c4c4c",
		[theme.breakpoints.down('md')]: {
			paddingBottom:20,
		},
	},
	footerLocationCompany:{
		[theme.breakpoints.down('md')]: {
			paddingBottom:50
		},
	},
	footerAboutCompany:{
		"& .title":{
			paddingBottom:20,
			"& h5":{
				[theme.breakpoints.down('sm')]: {
					textAlign:'center',
				},
			}
		},
		"& .body":{
			paddingBottom:20,
			"& p":{
				[theme.breakpoints.down('sm')]: {
					textAlign:'center',
				},
			}
		},
	},
	socialMedia:{
		[theme.breakpoints.down('sm')]: {
			textAlign:'center',
			paddingTop:30
		},
		"& div div svg":{
			paddingLeft:10,
			paddingRight:10,
		},
	}
}))
export function Header(){
	let dashboardLink = Meteor.userId()?'/Dashboard':'/Login'
	nav = [
		{title:'Home', href:'/', icon:"HomeIcon"},
		{title:'Dashboard', href:dashboardLink, icon:"DashboardIcon"},
		{title:'Signup', href:'/Signup', icon:"PersonAddIcon"},
		{title:'Services', href:'/Services', icon:"AmpStoriesIcon"},
		{title:'About', href:'/About', icon:"InfoIcon"},
		{title:'Contact us', href:'/contact', icon:"MailIcon"},
	]
	{/* <Grid container justify={'space-between'} alignItems="flex-end" style={{paddingLeft:20,paddingRight:20, paddingTop:50,}}>
	<Grid item>
		<Typography align="center" style={{fontSize:40}}>KoalaCare</Typography>
	</Grid>
	<Grid item>
		<Grid container spacing={1}>
				{nav.map((o,i)=>{
					return(
						<Grid item>
							<Button>
								<Link href={o.href} align="center" style={{fontSize:40, padding:10}} key={i}>
									<Typography className={classes.navMenu}>
										{o.title}
									</Typography>
								</Link>
							</Button>
						</Grid>)
				})}
		</Grid>
	</Grid>
	</Grid> */}
	const classes= useStyles()
	const [drawerStatus, setDrawerStatus] = React.useState(false)
	const openDrawer = () =>{
		setDrawerStatus(true)
	}
	const closeDrawer = () =>{
		setDrawerStatus(false)
	}
	return(
		<React.Fragment>
			<AppBar position="static" color="transparent" className={classes.navRoot}>
				<Toolbar style={{paddingLeft:20,paddingRight:20, paddingTop:50}}>
					<Hidden mdUp>
						<IconButton edge="start" className={classes.menuButton} onClick={openDrawer} color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>
					</Hidden>
					<Typography align="center" style={{fontSize:35}} className={classes.title}>KoalaCare</Typography>
					<Hidden smDown>
						{nav.map((o,i)=>{
							return(
								<Button key={i}>
									<Link href={o.href} align="center" style={{fontSize:40, padding:10}} key={i}>
										<Typography className={classes.navMenu}>
											{o.title}
										</Typography>
									</Link>
								</Button>)
						})}
					</Hidden>
				</Toolbar>
			</AppBar>
			{/* drawer for Appbar */}
			<Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerStatus}
        classes={{
          paper: classes.drawerPaper,
        }}>
				<Grid container justify="center" alignItems="center" style={{height:'100%'}}>
					<Grid item>
					<List>
						{nav.map((o, i)=>(
							<Link href={o.href}>
								<ListItem button key={i}>
									<ListItemIcon><GetIcon icon={o.icon}/></ListItemIcon>
									<ListItemText primary={o.title} />
								</ListItem>
							</Link>
						))}
						<ListItem button onClick={closeDrawer} style={{marginTop:30}}>
								<ListItemIcon><GetIcon icon='CloseIcon'/></ListItemIcon>
								<ListItemText primary={'close'} />
							</ListItem>
					</List>
					</Grid>
				</Grid>
			</Drawer>
		</React.Fragment>
	)
}
export function Footer(){
	const sm = SocialMedias()
	const classes = useStyles()
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	console.log(matches)
	return (
		<React.Fragment>
			<Grid container className={classes.Footer} style={{backgroundColor:'rgb(159 185 181)'}}>
				<Container>
					<Grid container>
						<Grid item md={6} sm={12}>
							<Grid container justify={matches?"center":"flex-start"}  className={classes.footerLocationCompany}>
								<Grid item md={1}>
									<GetIcon icon="LocationOnIcon"/>
								</Grid>
								<Grid item>
									<Typography>Cavite, Philippines</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item md={6} sm={12}>
							<Grid container direction="column" className={classes.footerAboutCompany} >
								<Grid item className='title'>
									<Typography variant="h5">About the company</Typography>
								</Grid>
								<Grid item className='body'>
									<Typography variant="body1" >
										This is Koalacare based on Philippines,
										there's only one developer present on the project making things work together.
										with the help of your feedback it may improve its capabilities.
									</Typography>
								</Grid>
								<Grid item className={classes.socialMedia}>
									<Typography variant="h6" color="initial" align={matches?"center":"left"}>Follow us on </Typography>
									<Grid container justify={matches?"center":"flex-start"}>
										{sm.map((o,i)=>{
										return(
											<Grid item className={o.sm} key={i}>
												<GetIcon icon={o.logo}/>
											</Grid>
											)
										})}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</Grid>
		</React.Fragment>
	)
}
function SocialMedias(){
	//icons are depend on GetIcon 
	return socialmedia = [
		{
			sm:'Facebook',
			url:'#',
			logo:'FacebookIcon',
		},
		{
			sm:'instagram',
			url:'#',
			logo:'InstagramIcon',
		},
		{
			sm:'twitter',
			url:'#',
			logo:'TwitterIcon',
		}
	]
}
// export function Homepage(){
// 	const classes= useStyles()
// 	return(
// 		<React.Fragment>
// 			<Container maxWidth='lg'>
// 				<Grid container className={classes.s1}>
// 					<Grid item lg={4} md={4} sm={12} xs={12}>
// 						<Typography variant="h6">Koalacare lets you to automate your Timesheet for your health care Agency</Typography>
// 						<Button variant="outlined" align="center">Learn more</Button>
// 					</Grid>
// 					<Grid item lg={8} md={8} sm={12} xs={12} className={classes.imgContainer}>
// 						<img src="assets/img/homeImages/elderly nurse.png" style={{marginLeft:'auto', marginRight:'0px', display:'block', transform:'translate(-10px, 25px)'}} />
// 					</Grid>
// 				</Grid>
// 			</Container>

// 			<Grid container style={{backgroundColor:'#BDE0DA'}}>
// 				<Container maxWidth='lg' style={{backgroundColor:'#BDE0DA'}}>
// 					<Grid container className={classes.s1} >
// 						<Grid item lg={8} md={8} sm={12} xs={12} className={classes.imgContainer}>
// 							<img src="assets/img/homeImages/phonetimein.png" className="mobileTimeSheet" />
// 						</Grid>
// 						<Grid item lg={4} md={4} sm={12} xs={12}>
// 							<Grid container direction="column">
// 								<Grid item>
// 									<Typography variant="h6">Log your time in with your Mobile Phone</Typography>
// 								</Grid>
// 								<Grid item>
// 									<Typography variant="caption"> your device lets you time in upon your arrival on your patient and keep on track on your record</Typography>
// 								</Grid>
// 								<Grid item>
// 									<Button variant="outlined" align="center">Learn more</Button>
// 								</Grid>
// 							</Grid>
// 						</Grid>
// 					</Grid>
// 				</Container>
// 			</Grid>

// 			<Grid container >
// 				<Container maxWidth='lg' >
// 					<Grid container className={classes.s1}>
// 						<Grid item lg={4} md={4} sm={12} xs={12}>
// 							<Grid container direction="column">
// 								<Grid item>
// 									<Typography variant="h6">It can easily track your time at ease to your smart watch</Typography>
// 								</Grid>
// 								<Grid item>
// 									<Typography variant="caption"> - soon be available on both apple watch and android watch</Typography>
// 								</Grid>
// 								<Grid item>
// 									<Button variant="outlined" align="center">Learn more</Button>
// 								</Grid>
// 							</Grid>
// 						</Grid>
// 						<Grid item lg={8} md={8} sm={12} xs={12} className={classes.imgContainer}>
// 							<img src="assets/img/homeImages/timein.png" style={{marginLeft:'auto', marginRight:'0px', marginTop:150, display:'block', transform:'translate(-10px, 25px)'}} />
// 						</Grid>
// 					</Grid>
// 				</Container>
// 			</Grid>
// 		</React.Fragment>
// 	)
// }
export function AboutUs(){
	return(
		<React.Fragment>
			<Container>
				<Typography>
					
				</Typography>
			</Container>
		</React.Fragment>
	)
}
export function Contacts(){
	return (
		<React.Fragment>
			<Typography>
				Contact Us
			</Typography>
		</React.Fragment>
	)
}