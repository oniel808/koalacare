import React from 'react'
import { Meteor } from 'meteor/meteor';
import moment from 'moment'
import GetIcon from '../Layouts/GetIcon.jsx'
import { ReactiveVar } from 'meteor/reactive-var'

import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import {Link as MaterialLink} from '@mui/material/'
import InputAdornment from '@mui/material/InputAdornment'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Hidden from '@mui/material/Hidden'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import IconButton from '@mui/material/IconButton'
import Autocomplete from '@mui/lab/Autocomplete'
import red from '@mui/material/colors/red'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useNavigate, BrowserRouter as Router, Routes, Route, Link, Redirect } from 'react-router-dom'
import { Page404 } from '../Layouts/Page404.jsx'
import ToggleButton from '@mui/lab/ToggleButton'
import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup'
import { createTheme } from '@mui/material/styles'
import { UploadImage, UploadCV } from '../Layouts/Upload.jsx'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

imgnumber = Math.floor(Math.random() * 12)
imgstr = `/assets/img/randomImages/${imgnumber}.jpg`
theme = createTheme()
const useStyles = makeStyles(()=>({
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
		paddingTop:'12%',
		transition:'ease-in-out 500ms'
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
		width:'40%'
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
		overflowY:'auto'
	},
	loginFooter:{
		paddingRight:10,
		paddingLeft:10,
		height:"30%"
	},
	errMess:{
		color:red[600]
	},
	slider:{
		transition:'transform 1000ms ease-out',

	},
	slideEnter:{
		transform: 'translateX(100%)',
		opacity:0
	},
	slideEnterActive:{
		transform: 'translateX(0%)',
		opacity:1
	},
	slideExit:{
		transform: 'translateX(0%)',
		opacity:1
	},
	slideExitActive:{
		transform: 'translateX(100%)',
		opacity:0
	},
	stepper:{
		padding:theme.spacing(2)
	},
	uploadInput:{
		display:'none'
	},
	loginSignupTab:{
		paddingTop:theme.spacing(2),
		paddingBottom:theme.spacing(2),
	},
	signupActive:{
		paddingTop:'3%'
	},
	profilePicture:{
		maxHeight:150,
		height:'100%',
		width:'100%',
		aspectRatio: 3/2
	},
}))

export default function LoginAndSignup(props){
	const { param : { purpose = purpose } } = props
	const classes = useStyles()
	const [ loginSignup, setloginSignup ] = React.useState(purpose)
	const navigate = useNavigate()
	const handleTab = (e, input) => {
		if(input == "login")
			navigate('/login');
		if(input == "signup")
			navigate('/signup')
		setloginSignup(input)
	}
	return(
		<Grid container direction='row' className={classes.LoginContainer} >
			{Meteor.userId()?<Redirect to="/Dashboard"/>:""}
			<Hidden smDown>
				<Grid item md={5} lg={5} className={classes.displayimage} >
					<Grid container direction="column" justifyContent="start-flex">
						<Grid item>
							<img src='/assets/img/KoalaCareLogo.svg' className={classes.koalacare} />
						</Grid>
					</Grid>
				</Grid>
			</Hidden>
			<Grid item md={7} xs={12} lg={7} className={classes.formLogin}>
					<Grid container alignItems="center" justifyContent="center" direction="column" className={`${classes.iconContainer} ${purpose=="signup"?classes.signupActive:''}`}>
						<Hidden smUp>
							<Grid item>
								<img src='/assets/img/KoalaCareLogo.svg' className={classes.koalacare} />
							</Grid>
						</Hidden>
					{/* login / suignup */}
						<Grid item md={5}>
							<Tabs
								className={classes.loginSignupTab}
								value={loginSignup}
								onChange={handleTab}
								textColor="secondary"
								indicatorColor="secondary"
								aria-label="secondary tabs example"
							>
								<Tab value="login" label="Login" />
								<Tab value="signup" label="Signup" />						
							</Tabs>
						</Grid>
					</Grid>			
				{loginSignup == 'login'? <LoginForm/>:''}
				{loginSignup == 'signup'? <SignupForm/>:''}
			</Grid>
		</Grid>
	)
}


const LoginForm = () => {
	const classes = useStyles()
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
			}else{
				const history = useHistory()
					history.push('/Dashboard')
			}
				// Router.go('/Dashboard')
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
	<form id="LoginForm" onSubmit={LoginForm} className={classes.paper}>
			<Grid container direction='column' justifyContent="center" className={classes.mainContainer}>
				{errmessage?<Grid item container alignItems="center" justifyContent="center" className={classes.padTop}>
					<Typography className={classes.errMess}>{errmessage}</Typography>
				</Grid>:false}
				<Grid item md={6}>
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
							<Link to='/forgotPassword'><Typography>Forgot Password?</Typography></Link>
						</Grid>
					</Grid>
					<Grid container direction="row" justifyContent="space-between" alignItems="center" className={classes.otherStuff} >
						<Grid item >
							<Link to='/Signup'><Typography>Sign up</Typography></Link>
						</Grid>
						<Grid item >
							<Button variant="outlined" color="primary" type="submit" >Login</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Divider variant="middle" style={{marginTop:20,marginBottom:20}}/>
			<Grid container direction="column" justifyContent="center" alignItems="center"  style={{paddingTop:30}}>
				<Grid item>
					<Typography>Login with Facebook</Typography>
				</Grid>
				<Grid item>
					<Typography>Login with Google</Typography>
				</Grid>
			</Grid>
			<Grid container direction='row' justifyContent="space-between" alignItems="flex-end" className={classes.loginFooter}>
				<Grid item >
					<MaterialLink><Typography variant='body2'>Terms & agreements</Typography></MaterialLink>
				</Grid>
				<Grid item >
					<MaterialLink><Typography variant='body2'>Policy</Typography></MaterialLink>
				</Grid>
			</Grid>
	</form>
	)
}

const SignupForm = () => {
	const classes = useStyles()
	// all input should be stored here on use state
	const [ signUpForm, setSignupForm ] = React.useState({
		stepper:0,
		skipped:null,
		profile:{
			fName:null,
			lName:null,
			Bdate:null,
			gender:null,
			height:null,
			weight:null,

			address:null,
			Phone:null,
			tel:null,

			role:null,
			email:null,
			username:null,
			password:null,
			cpassword:null,

			IdPicture:null,
			compLogo:null,
			resume:null,
			company_id:null
		}
	})
	// role
	const [ roleChosen, setRoleChosen ] = React.useState()
	const roleChooser = (e, i) => {
		setRoleChosen(i)
	}
	const handleNextStep = (e,i) => {
		if(signUpForm.stepper < steps.length)
			setSignupForm({...signUpForm, stepper:signUpForm.stepper+1})
  }
	const handleBackStep = (e,i) => {
		if(signUpForm.stepper != 0)
			setSignupForm({...signUpForm, stepper:signUpForm.stepper-1})
  }
	// Personal Details data gather
		const handleProfilePictureChange = (ProfilePicture) => {
			ProfPic = UploadImage(ProfilePicture.currentTarget.files[0])
			// setProfilePicture()
			setTimeout(()=>{
				setProfilePicture(ProfPic)
			},1000)
		}

	const steps = [{
		name:"choose a role"
	},{
		name:"Basic Details"
	},{
		name:"Account"
	},{
		name:"Terms of Service Agreement"
	},{
		name:"Done"
	}]
	return (
		<>
			<Grid container justifyContent="space-evenly" alignItems="center" direction="column">
				<Grid item>
					<Typography variant="h4" color="initial">Signup to Koalacare</Typography>
				</Grid>
				<Grid item>
					<Stepper activeStep={signUpForm.stepper} alternativeLabel className={classes.stepper}>
						{steps.map((o, i)=>{
							return (
							<Step key={i}>
								<StepLabel>{o.name}</StepLabel>
							</Step>
							)
						})}
					</Stepper>
					{/* signup Container */}
					
					{/* <RoleChooser roleChosen={roleChosen} roleChooser={roleChooser}/> */}
					<PersonalDetails profile={signUpForm.profile} profilePictureChange={handleProfilePictureChange} />
					
				</Grid>
				<Grid item>
					<Grid container justifyContent="space-evenly" alignItems="center" direction="row">
						<Grid item>
							<Button onClick={handleBackStep}>Back</Button>
						</Grid>
						<Grid item>
							<Button onClick={handleNextStep}>Next</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}


const RoleChooser = (props) => {
	chooser=[{
		img:'/assets/img/agency.png',
		text:'Signup as Health Care Agency',
		href:"/Signup/HealthCareAgency",
		value:"HealthCareAgency",
	},{
		img:'/assets/img/caregiver.png',
		text:'Signup as Caregiver',
		href:"/Signup/Caregiver",
		value:"Caregiver",
	},{
		img:'/assets/img/househeart.png',
		text:'Signup as Patient',
		href:"/Signup/Patient",
		value:"Patient",
	}]
	const {roleChosen, roleChooser} = props
	return (
		<ToggleButtonGroup
		color="primary"
		value={roleChosen}
		exclusive
		size="small"
		onChange={roleChooser}
	>{chooser.map((o,i)=>(
		<ToggleButton value={o.value} key={i}>{o.text}</ToggleButton>
		))}
	</ToggleButtonGroup>
	)
}

const PersonalDetails = (props) => {
	console.log(props)
	const {profile, profilePictureChange} = props
	const classes = useStyles()
	return(
		<React.Fragment>
			<Grid container direction="column" alignItems="center" >
				{profile.ProfilePicture?
					<Grid item>
						<img className={classes.profilePicture} src={`/cdn/storage/Images/${profile.ProfilePicture.config.fileId}/original/${profile.ProfilePicture.config.fileId}${profile.ProfilePicture.config.fileData.extensionWithDot}`} htmlFor='uploadProfilePicture'/>
					</Grid>
				:<Grid item><img className={classes.profilePicture} src={'/assets/img/KoalaCareLogo.svg'} htmlFor='uploadProfilePicture'/></Grid>}
				<Grid item>
					<label htmlFor="uploadProfilePicture">
						<input accept="image/*" className={classes.uploadInput} id="uploadProfilePicture" type="file" onChange={profilePictureChange}/>
						<Button variant="contained" component="span">
							Upload
						</Button>
					</label>
				</Grid>
			</Grid>
			<Grid container direction="column">
				<Grid item className={`${classes.inputs} ${classes.padTop}`}>
					<TextField id="fName" variant="outlined" label="First Name" color="primary" size="small" fullWidth/>
				</Grid>
				<Grid item className={`${classes.inputs} ${classes.padTop}`}>
					<TextField id="lName" variant="outlined" label="Last Name" color="primary" size="small" fullWidth/>
				</Grid>
				<Grid item >

					{/* Date Picker */}
					{/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid container alignItems="flex-end" spacing={2}>
							<Grid item md={5}>
								<TextField
									id="Bdate"
									label="Birthday"
									type="date"
									defaultValue="1990-06-27"
									onChange={profile.datechange}
									className={classes.agePicker}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Grid>
							<Grid item>
								<Typography>{profile.age} age</Typography>
							</Grid>
						</Grid>
					</MuiPickersUtilsProvider> */}
				</Grid>
				<Grid item className={`${classes.inputs} ${classes.padTop}`}>
					<Autocomplete
						id="gender"
						size="small"
						options={[{gender:'Male'},{gender:'Female'}]}
						getOptionLabel={(option) => option.gender}
						style={{ width: 300 }}
						fullWidth
						renderInput={(params) => <TextField {...params} label="Gender" />}
					/>
				</Grid>
				<Grid item className={`${classes.inputs} ${classes.padTop}`}>
					<TextField id="lName" variant="outlined" label="Last Name" color="primary" size="small" fullWidth/>
				</Grid>
				<Grid item className={`${classes.inputs} ${classes.padTop}`}>
					<TextField id="lName" variant="outlined" label="Last Name" color="primary" size="small" fullWidth/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}