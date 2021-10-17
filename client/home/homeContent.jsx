import React from 'react'
import { Typography, Button, Container, Box, Grid, Link, Hidden, AppBar, Toolbar, IconButton, Drawer, List, ListItem,	ListItemIcon, ListItemText } from '@mui/material'
import MenuIcon from '@material-ui/icons/Menu'
import GetIcon from '../Layouts/GetIcon.jsx'
import { green } from '@material-ui/core/colors'
import { makeStyles } from '@mui/styles'
// import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth'
import Fade from '@material-ui/core/Fade'
import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme()
const useStyles = makeStyles((theme)=>({
  s1:{
    position:'relative',
    "& div h6":{
      marginTop:280,
      marginBottom:20,
      position:'relative',
      [theme.breakpoints.down('sm')]: {
        marginTop:150,
      }
    },
    "& Button":{
      color:'#74b9ff',
      border: '1px solid #74b9ff',
      marginTop:50,
      marginBottom:100,
    }
  },
  imgContainer:{
    "& img":{
      position:'relative',
      zIndex:1,
      filter: 'drop-shadow(7px 7px 7px rgba(0,0,0,0.1))',
      marginTop:300,
      display:'block',
      width:450,
      transform:'translate(-10px, 25px)',
      [theme.breakpoints.down('sm')]:{
        marginTop:50,
        width:350
      },
      [theme.breakpoints.down('xs')]:{
        marginTop:50,
        width:350
      },
      [theme.breakpoints.down('md')]:{
        marginLeft:'auto !important',
        marginRight:'auto !important',
      }
    },
    "& .mobileTimeSheet":{
      marginLeft:'0px', 
      marginRight:'auto',
      [theme.breakpoints.down('sm')]:{
        marginTop:250,
      },
    },
    "& .smartWatchLogin":{
      marginLeft:'auto',
      marginRight:'0px',
    }
  },
  imgContainer150Margin:{
    "& img":{
      marginTop:'150px !important'
    }
  }
}))
export default Homepage = (props)=>{
  const classes= useStyles()
  const { width } = props
  // console.log(isWidthUp('md',width))
	return(
		<React.Fragment>
			<Container maxWidth='lg'>
				<Grid container className={classes.s1} alignItems={/*isWidthUp('md',width)?"flex-start":*/"center"}>
					<Grid item lg={4} md={4} sm={12} xs={12}>
						<Typography variant="h6">Koalacare lets you to automate your Timesheet for your health care Agency</Typography>
						<Button variant="outlined" align="center">Learn more</Button>
					</Grid>
					<Grid item lg={8} md={8} sm={12} xs={12} className={classes.imgContainer}>
						<img src="assets/img/homeImages/elderly nurse.png" style={{marginLeft:'auto', marginRight:'0px', display:'block', transform:'translate(-10px, 25px)'}} />
					</Grid>
				</Grid>
			</Container>

			<Grid container style={{backgroundColor:'#BDE0DA'}}>
				<Container maxWidth='lg' style={{backgroundColor:'#BDE0DA'}}>
					<Grid container className={classes.s1}>
						<Grid item lg={8} md={8} sm={12} xs={12} className={classes.imgContainer}>
							<img src="assets/img/homeImages/phonetimein.png" className="mobileTimeSheet" />
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<Grid container direction="column" alignItems={/*isWidthUp('md',width)?"flex-start":*/"center"}>
								<Grid item>
									<Typography variant="h6" align={/*isWidthUp('md',width)?"left":*/"center"}>Log your time in with your Mobile Phone</Typography>
								</Grid>
								<Grid item>
									<Typography variant="caption"> your device lets you time in upon your arrival on your patient and keep on track on your record</Typography>
								</Grid>
								<Grid item>
									<Button variant="outlined" align="center">Learn more</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</Grid>

			<Grid container >
				<Container maxWidth='lg'>
					<Grid container className={classes.s1} direction={/*isWidthUp('md',width)?"row":*/"column-reverse"} >
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<Grid container direction="column" alignItems={/*isWidthUp('md',width)?"flex-start":*/"center"}>
								<Grid item>
									<Typography variant="h6" align={/*isWidthUp('md',width)?"left":*/"center"}>It can easily track your time at ease to your smart watch</Typography>
								</Grid>
								<Grid item>
									<Typography variant="caption">soon be available on both apple watch and android watch</Typography>
								</Grid>
								<Grid item>
									<Button variant="outlined" align="center">Learn more</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid item lg={8} md={8} sm={12} xs={12} className={classes.imgContainer}>
							<img src="assets/img/homeImages/timein.png" className="smartWatchLogin"/>
						</Grid>
					</Grid>
				</Container>
			</Grid>
		</React.Fragment>
	)
}


// export { Homepage }
// export default withWidth()(Homepage)