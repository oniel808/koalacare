import React from 'react'
import { Meteor } from 'meteor/meteor';
import moment from 'moment'
import GetIcon from '../Layouts/GetIcon.jsx'
import { ReactiveVar } from 'meteor/reactive-var'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import { shadows } from '@material-ui/system';
import red from '@material-ui/core/colors/red';

imgnumber = Math.floor(Math.random() * 12)
imgstr = `/assets/img/randomImages/${imgnumber}.jpg`
const useStyles = makeStyles((theme)=>({
	displayimage:{
		backgroundSize: 'cover',
    backgroundColor: '#212121',
    backgroundImage: `url(${imgstr})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
	},
	paper:{
		height:'100%',
		width:'100%',
		overflowY:'auto'
	},
	LoginContainer:{
		height:'100vh'
	},
	koalacare:{
		height:110
	},
	iconContainer:{
		paddingTop:'12%'
	},
	mainContainer:{
		paddingTop:'5%',
		paddingLeft:50,
		paddingRight:50,
	},
	inputContainer:{
		width:'100%'
	},
	inputs:{
		maxWidth:540,
		width:'100%'
	},
	otherStuff:{
		paddingTop:30,
		maxWidth:540,
		margin:'auto',
	},
	padTop:{
		paddingTop:20
	},
	formLogin:{
		height:'100%',
	},
	loginFooter:{
		paddingRight:10,
		paddingLeft:10,
		height:"30%"
	},
	errMess:{
		color:red[600]
	}
}))

export function Login(){
	const classes = useStyles()
	hrefs={
		forgotPass:'/forgotPassword',
		signup:'/Signup',
	}
	Meteor.subscribe("loadRoles", Meteor.userId())
	console.log(Meteor.userId())
	const[errmessage, setErrmessage] = React.useState('')
	const LoginForm = (e) => {
		e.preventDefault()
		user=e.target.username.value
		pass=e.target.password.value
		Meteor.loginWithPassword(user, pass, 
			function(err){
			if(err){
				setErrmessage(err.reason)
			}else
				Router.go('/Dashboard')
			// else{
			// 	if(Meteor.isCordova){
			// 		MobileDB.remove({})
			// 		MobileDB.insert({
			// 			_id:Meteor.userId(),
			// 			profile:Meteor.user().profile,
			// 			settings:{
			// 				backgroundMode:0,
			// 			},
			// 			coord:[]
			// 		})
			// 		mobileBackgroundMode()
			// 		geofence()
			// 	}
			// 	delete Session.keys['loginFailure']
			// 	Router.go('/Dashboard')
			// }
		})
	}
	return(
		<Grid container direction='row' className={classes.LoginContainer} >
			<Hidden smDown>
				<Grid item md={7} lg={8} className={classes.displayimage} >
				</Grid>
			</Hidden>
			<Grid item md={5} xs={12} lg={4} className={classes.formLogin}>
				<form id="LoginForm" onSubmit={LoginForm} className={classes.paper}>
					<Paper elevation={24} className={classes.paper}>
						<Grid container alignItems="center" justify="center" direction="column" className={classes.iconContainer}>
							<Grid item>
								<img src='/assets/img/KoalaCareLogo.svg' className={classes.koalacare} />
							</Grid>
							<Grid item className={classes.padTop}>
								<Typography>Hello there!</Typography>
							</Grid>
						</Grid>
						<Grid container direction='column' justify="center" className={classes.mainContainer}>
							{errmessage?<Grid item container alignItems="center" justify="center" className={classes.padTop}>
								<Typography className={classes.errMess}>{errmessage}</Typography>
							</Grid>:false}
							<Grid item >
								<Grid container direction='column' alignItems="center" >
									<Grid item className={`${classes.inputs} ${classes.padTop}`} >
										<TextField id="username" label="Username" variant="outlined" fullWidth/>
									</Grid>
									<Grid item className={`${classes.inputs} ${classes.padTop}`} >
										<TextField id="password" label="Password" type="password" variant="outlined" fullWidth/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item >
								<Grid container direction="row" alignItems="center" className={classes.otherStuff} >
									<Grid item >
										<Link href={hrefs.forgotPassword} ><Typography>Forgot Password?</Typography></Link>
									</Grid>
								</Grid>
								<Grid container direction="row" justify="space-between" alignItems="center" className={classes.otherStuff} >
									<Grid item >
										<Link href={hrefs.signup}><Typography>Sign up</Typography></Link>
									</Grid>
									<Grid item >
										<Button variant="outlined" color="primary" type="submit" >Login</Button>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Divider variant="middle" style={{marginTop:20,marginBottom:20}}/>
						<Grid container direction="column" justify="center" alignItems="center"  style={{paddingTop:30}}>
							<Grid item>
								<Typography>Login with Facebook</Typography>
							</Grid>
							<Grid item>
								<Typography>Login with Google</Typography>
							</Grid>
						</Grid>
						<Grid container direction='row' justify="space-between" alignItems="flex-end" className={classes.loginFooter}>
							<Grid item >
								<Link><Typography variant='body2'>Terms & agreements</Typography></Link>
							</Grid>
							<Grid item >
								<Link><Typography variant='body2'>Policy</Typography></Link>
							</Grid>
						</Grid>
					</Paper>
				</form>
			</Grid>
		</Grid>
	)
}