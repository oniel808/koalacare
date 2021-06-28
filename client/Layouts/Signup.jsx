import React from 'react'
import { Meteor } from 'meteor/meteor'
import ReactDOM from "react-dom"
import moment from 'moment'
import { Roles } from 'meteor/alanning:roles'
import { UploadImage, UploadCV } from './Upload.jsx'
import GetIcon from './GetIcon.jsx'
// import countries from './Countries.jsx'
import { Transition } from 'react-transition-group'
import { PrivacyPolicy, TermsOfAgreement } from './Termsandprivacy.jsx'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import Select from '@material-ui/core/Select'
import DateFnsUtils from '@date-io/date-fns'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Slide from '@material-ui/core/Slide'
import Grow from "@material-ui/core/Grow"
import Box from '@material-ui/core/Box'
import Zoom from '@material-ui/core/Zoom'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Header from '../home/home.jsx'

import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers'

const styles = {
	root: {
		background: "black"
	},
	input: {
		color: "white"
	},
}

const useStyles = makeStyles((theme)=>({
	heightWeight:{'marginTop':10},
	option: {
		fontSize: 15,
		'& > span': {
			marginRight: 10,
			fontSize: 18,
		},
	},
	hideComponent:{
		display:'none'
	},
	mainForm:{
		paddingTop:80,
		paddingBottom:40
	},
	reactiveInputs:{
		marginLeft:20,
		marginRight:20
	},
	setSpaceTop:{
		paddingTop:50
	},
	setSpaceTopinput:{
		paddingTop:10
	},
	formControl: {
		marginTop: 10,
		minWidth: 250,
	},
	profilePicture:{
		maxHeight:150,
		aspectRatio: 3/2
	},
	agePicker:{
		paddingTop:5
	},
	submitButton:{
		paddingTop:20,
		paddingBottom:50
	},
	uploadInput: {
		display: 'none',
	},
	uploadCV:{
		paddingTop:20
	},
	uploadButton:{
		paddingTop:10
	},
	rolechooserimg:{
			width:'100%'
	},
	RoleVariants:{
		paddingTop:150,
		paddingBottom:100
	},
	rolechooserheader:{
		paddingBottom:100
	},
	rolechoosertextBottom:{
		paddingBottom:10,
		paddingTop:5,
	}
}))
export function Signup(param){
	const classes = useStyles()
	const [age, setAge] = React.useState(0)
	const [comPP, setComPP] = React.useState()
	const [CV, setCV] = React.useState('')

	function handleAgeChange(age){
		setAge(age)
	}
	 const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	function uploadCV (x){
		o = UploadCV(x.currentTarget.files[0])
		// setProfilePicture()
		console.log(o)
		setCV({
			id:o.config.fileId,
			ext:o.config.fileData.extensionWithDot,
			origName:o.file.name
		})
	}
	function uploadCompanyProfilePicture (x){
		o = UploadImage(x.currentTarget.files[0])
		// setProfilePicture()
		setTimeout(()=>{
			setComPP({
				id:o.config.fileId,
				ext:o.config.fileData.extensionWithDot,
				origName:o.file.name,
				x:true
			})
		},1000)
	}
	const [birthDate, setbirthDate] = React.useState(moment('06/27/1990'))
	const handleDateChange = (date) => {
		setbirthDate(date.currentTarget.value)
		ageCal = moment.duration(moment()).subtract(moment(date.currentTarget.value))
		console.log(ageCal)
		handleAgeChange(Math.abs(ageCal._data.years))
	}
	const [ProfilePicture, setProfilePicture] = React.useState('')
	const handleProfilePictureChange = (ProfilePicture) => {
		ProfPic = UploadImage(ProfilePicture.currentTarget.files[0])
		// setProfilePicture()
		setTimeout(()=>{
			setProfilePicture(ProfPic)
		},1000)
	}
	const signupForm = (e) => {
		e.preventDefault()
		x = e.target
		IdPicture = ''
		if(ProfilePicture)
			IdPicture = {idData:ProfilePicture.config.fileData, id:ProfilePicture.config.fileId}
		var company_id
		if(Meteor.userId() || Roles.userIsInRole(Meteor.userId(), ['Owner','HRAdmin']))
			company_id = Meteor.user().profile.Company_Id
		o={
			fName:x.fName.value,
			lName:x.lName.value,
			Bdate:x.Bdate.value,
			gender:x.gender.value,
			height:x.height.value,
			weight:x.weight.value,

			address:x.address.value,
			Phone:x.Phone.value,
			tel:x.tel.value,

			role:x.rolePicker.value,
			email:x.email.value,
			username:x.username.value,
			password:x.password.value,
			cpassword:x.cpassword.value,

			IdPicture:IdPicture,
			compLogo:comPP,
			resume:CV,
			company_id:company_id
		}
		if(param.roleChooser == 'Company')
			o={...o, 
				companyName:x.compName.value,
				compAddress:x.compAddress.value,
				compDescription:x.compDesc.value,
				compPhone:x.Pnumber.value,
				compTel:x.telno.value,
			}
		if(activeStep == steps.length-1)
			Meteor.call('Signup',o,(err,res)=>{
				console.log(res)
			})
		if(!param.mainSignup)
			Meteor.call('Signup',o,(err,res)=>{
				console.log(res)
			})
	}
	function renderSwitch(param){
		switch(param.roleChooser){
			case 'HealthCareAgency':
				return <CompanyDescriptor uploadCompanyProfilePicture={uploadCompanyProfilePicture} comPp={comPP}/>
			case 'Caregiver':
				return <UploadCVButton uploadCV={uploadCV} cv={CV}/>
			case 'Staff':
				return <UploadCVButton uploadCV={uploadCV} cv={CV}/>
			case 'Patient':
				return false
		}
	}
	function handleSignupPanel(x,e){
		switch(x){
			case 'next':
				arr = signupPanel
				if(activeStep == signupPanel.length-1)
					arr[activeStep]={slide:true,zoom:true,hide:false}
				else
					arr[activeStep+1]={slide:true,zoom:true,hide:false}
				arr[activeStep]={slide:true,zoom:false,hide:true}
				setSignupPanel(arr)
				setActiveStep((activeStep)=> activeStep+1)
			break
			case 'prev':
				arr = signupPanel
				arr[activeStep]={slide:false,zoom:false,hide:true}
				if(activeStep > 0)
					arr[activeStep-1]={slide:true,zoom:true,hide:false}
				setSignupPanel(arr)
				setActiveStep((activeStep)=> activeStep-1)
			break
		}
	}

	console.log(getSteps(param.roleChooser))
	function getSteps(x){
		arr = [{
			header:'Personal Details',
			icon:GetIcon('PhotoCamera'),
			showcomp:'PD'
		},{
			header:'Contact Details',
			icon:GetIcon('PhotoCamera'),
			showcomp:'CD'
		},{
			header:'Account Details',
			icon:GetIcon('PhotoCamera'),
			showcomp:'AD'
		}]
		if(x=='HealthCareAgency')
			arr.splice(1,0,{
				header:'Health Care Agency Information',
				icon:GetIcon('PhotoCamera'),
				showcomp:'AI'
			})
		else if(x=='Caregiver')
			arr.splice(1,0,{
				header:'Upload CV',
				icon:GetIcon('PhotoCamera'),
				showcomp:'CV'
			})
		return arr
	}

	const steps = getSteps(param.roleChooser)
	const panelArr = []
	var iwhile = 0
	while (iwhile != steps.length) {
		if(iwhile == 0)
			panelArr.push({slide:true,zoom:true,hide:false})
		else
			panelArr.push({slide:false,zoom:false,hide:true})
		iwhile++
	}
	const [ activeStep, setActiveStep ] = React.useState(0)
	const [ signupPanel, setSignupPanel ] = React.useState(panelArr)
	const [ reactiveInputs, setReactiveInputs] = React.useState({})
	console.log(`${steps.length-1} == ${activeStep}`)
	const signupFormRactive = (e)=>{
		e.preventDefault()
		x = e.target
			switch(activeStep){
				case 1:
					setReactiveInputs({
						...reactiveInputs,
						fName:x.fName.value,
						lName:x.lName.value,
						Bdate:x.Bdate.value,
						gender:x.gender.value,
						height:x.height.value,
						weight:x.weight.value,
					})
				break
				case 2:
					setReactiveInputs({
						...reactiveInputs,
						address:x.address.value,
						Phone:x.Phone.value,
						tel:x.tel.value,
					})
				break
				case 3:
					setReactiveInputs({
						...reactiveInputs,
						role:x.rolePicker.value,
						email:x.email.value,
						username:x.username.value,
						password:x.password.value,
						cpassword:x.cpassword.value,
					})
				break
				default:
				break
			}
		console.log(`${steps.length-1} == ${activeStep}`)
	}
	var handleAgreement = () => {}
	if(!param.mainSignup)
		return(
				<form id='formSignup' onSubmit={signupForm}>
					<PersonalDetails classes={classes} data={{ProfilePicture:ProfilePicture,profilePictureChange:handleProfilePictureChange, datechange:handleDateChange,age:age}} />
					<Contacts />
					{renderSwitch(param)}
					{AccountDetails(param)}
					<Grid container className={classes.submitButton} direction="column">
						<Grid item md={6} style={{marginTop:10,marginBottom:30}}>
							<Checkbox onChange={handleAgreement} id="agreement"/>
							<label for="agreement">by checking this youre hereby agreeing to our </label> <TermsOfAgreement /> and <PrivacyPolicy />
						</Grid>
						<Grid item md={6}>
							<Button variant="contained" color="primary" type="submit" >Submit</Button>
						</Grid>
					</Grid>
				</form>
		)
	else
		return(
			<form id='formSignup' className={classes.mainForm} onSubmit={signupForm}>
				<Grid container component={Paper} direction="column" >
					<Grid item>
						<Stepper alternativeLabel activeStep={activeStep}>
							{steps.map((o) => (
								<Step key={o.header}>
									<StepLabel StepIconProps={o.icon}>{o.header}</StepLabel>
								</Step>
							))}
						</Stepper>
					</Grid>
					<Grid item className={classes.reactiveInputs} style={{minHeight:405}}>
						<div>
			 				<Zoom in={signupPanel[0].zoom} className={signupPanel[0].hide?classes.hideComponent:''}>
			 					<Box>
									<PersonalDetails classes={classes} data={{ProfilePicture:ProfilePicture,profilePictureChange:handleProfilePictureChange, datechange:handleDateChange,age:age}} />
								</Box>
							</Zoom>
						</div>
						<div>
			 				<Zoom in={signupPanel[1].zoom} className={signupPanel[1].hide?classes.hideComponent:''}>
								<Box>
									{renderSwitch(param)}
								</Box>
							</Zoom>
						</div>
						<div>
			 				<Zoom in={signupPanel[2].zoom} className={signupPanel[2].hide?classes.hideComponent:''}>
				 				<Box>
									<Contacts />
								</Box>
							</Zoom>
						</div>
						<div>
			 				<Zoom in={signupPanel[3].zoom} className={signupPanel[3].hide?classes.hideComponent:''}>
			 					<div>
									{AccountDetails(param)}
								</div>
							</Zoom>
						</div>
					</Grid>
					<Button color="primary" disabled={0===activeStep} onClick={()=>{handleSignupPanel('prev')}}>Back</Button>
					<Button variant="contained" color="primary" className={signupPanel[3].hide?classes.hideComponent:''} type="submit">Finish</Button>
					<Button variant="contained" color="primary" className={signupPanel[3].hide?'':classes.hideComponent} onClick={(e)=>{handleSignupPanel('next',e)}}>Next</Button>
				</Grid>
			</form>
		)
					// <Button 
					// 	variant="contained" 
					// 	color="primary" 
					// 	type={steps.length-1 == activeStep?'submit':'button'} 
					// 	onClick={steps.length-1 == activeStep?()=>{}:(e)=>{handleSignupPanel('next',e)}}>
					// 		{steps.length-1 == activeStep?'Finish':'Next'}
					// </Button>


		 				// <Slide direction="left" in={signupPanel[1].slide}>
		 				// 	<div>
}
// <WorkExperience />

function PersonalDetails(props){
	classes = props.classes
	console.log(props)
	return(
		<React.Fragment>
			<Grid container direction="column">
				<Grid item md={5}>
					<Typography variant="h5">Register Staff</Typography>
					<Divider />
					<Typography variant="h6">Personal Details</Typography>
				</Grid>
			</Grid>
			<Grid container direction="row">
				{props.data.ProfilePicture?
					<Grid item md={4}>
						<img className={classes.profilePicture} src={`/cdn/storage/Images/${props.data.ProfilePicture.config.fileId}/original/${props.data.ProfilePicture.config.fileId}${props.data.ProfilePicture.config.fileData.extensionWithDot}`} htmlFor='uploadProfilePicture'/>
					</Grid>
				:<img className={classes.profilePicture} src={'/assets/img/KoalaCareLogo.svg'} htmlFor='uploadProfilePicture'/>}
				<Grid item md={1}>
					<Grid container justify="center" alignItems="center" style={{height:'100%'}}>
						<Grid item>
							<input accept="image/*" className={classes.uploadInput} id="uploadProfilePicture" type="file" onChange={props.data.profilePictureChange}/>
							<label htmlFor="uploadProfilePicture">
								<Tooltip title="Upload Photo">
									<IconButton color="primary" aria-label="upload picture" component="span">
										<GetIcon icon='PhotoCamera'/>
									</IconButton>
								</Tooltip>
							</label>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid container direction="column">
				<Grid item md={6}>
					<FormControl>
						<InputLabel htmlFor="fName">First Name</InputLabel>
						<Input id="fName" aria-describedby="my-helper-text" color="primary"/>
					</FormControl>
				</Grid>
				<Grid item md={6}>
					<FormControl>
						<InputLabel htmlFor="lName">Last Name</InputLabel>
						<Input id="lName" aria-describedby="my-helper-text" color="primary"/>
					</FormControl>
				</Grid>
				<Grid item md={6}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid container alignItems="flex-end" spacing={2}>
							<Grid item md={5}>
								<TextField
									id="Bdate"
									label="Birthday"
									type="date"
									defaultValue="1990-06-27"
									onChange={props.data.datechange}
									className={classes.agePicker}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Grid>
							<Grid item>
								<Typography>{props.data.age} age</Typography>
							</Grid>
						</Grid>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item md={4}>
					<Autocomplete
						id="gender"
						options={[{gender:'Male'},{gender:'Female'}]}
						getOptionLabel={(option) => option.gender}
						style={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label="Gender" />}
					/>
				</Grid>
			</Grid>
			<Grid container direction="row" className={classes.heightWeight}>
				<Grid item md={1} style={{paddingRight:10}}>
					<FormControl>
					<Input
						id="height"
						endAdornment={<InputAdornment position="end">cm</InputAdornment>}
						aria-describedby="standard-height-helper-text"
						inputProps={{
							'aria-label': 'height',
						}}
					/>
						<FormHelperText id="height">Height</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item md={1}>
					<FormControl>
					<Input
						id="weight"
						endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
						aria-describedby="standard-weight-helper-text"
						inputProps={{
							'aria-label': 'weight',
						}}
					/>
						<FormHelperText id="width">Weight</FormHelperText>
					</FormControl>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}
function Contacts(){
	const classes = useStyles()
	return (
		<Grid container className={classes.setSpaceTop} direction='column'>
			<Grid item md={5}>
				<Typography variant="h6">Contact Details</Typography>
				<Divider />
			</Grid>
			<Grid item md={6}>
				<FormControl>
					<InputLabel htmlFor="address">Address</InputLabel>
					<Input id="address" aria-describedby="my-helper-text" color="primary" form="formSignup"/>
				</FormControl>
			</Grid>
			<Grid item md={6}>
				<FormControl>
					<InputLabel htmlFor="Phone">Phone Number</InputLabel>
					<Input id="Phone" color="primary" form="formSignup"/>
				</FormControl>
			</Grid>
			<Grid item md={6}>
				<FormControl>
					<InputLabel htmlFor="tel">Telephone</InputLabel>
					<Input id="tel"color="primary" form="formSignup"/>
				</FormControl>
			</Grid>
		</Grid>
	)
}

function WorkExperience(){
	const classes = useStyles()
	const [selectedDate, setSelectedDate] = React.useState(
		{selectedToDate:new Date() ,selectedFromDate:new Date()}
	)
	const handleDateChange = (x) => {
		console.log(x.date)
		console.log(x.index)
		setSelectedDate({[x.index]:x.date})
	}
	const [recentWork, setRecentWork] = React.useState('')
	function handleRecentWork(e){
		e.preventDefault()
		x = e.target
		setRecentWork({recentWork:e.target.recentComp.value,from:x.selectedFromDate.value,to:x.selectedToDate.value})
	}
	expArr=[]
	return (
		<div>
			<Grid container className={classes.setSpaceTop} direction="row">
				<Grid item md={4}>
					<Typography >Work Experience</Typography>
					<Divider />
				</Grid>
			</Grid>
			<form id='workexp' onSubmit={handleRecentWork}>
				<Grid container direction="column">
					<Grid item md={4}>
						<FormControl>
							<InputLabel htmlFor="recentComp">Recent Company</InputLabel>
							<Input id="recentComp" aria-describedby="my-helper-text" color="primary"/>
						</FormControl>
					</Grid>
					<Grid item md={4}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="MM/dd/yyyy"
								margin="normal"
								id="fromDate"
								label="From"
								value={selectedDate.selectedToDate}
								onChange={(date)=>{handleDateChange({date:date,index:'selectedToDate'})}}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
						</MuiPickersUtilsProvider>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="To"
							value={selectedDate.selectedFromDate}
							onChange={(date)=>{handleDateChange({date:date,index:'selectedFromDate'})}}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item>
						<Button color="primary" aria-label="upload picture" type='submit'>
							{GetIcon('AddIcon')}<Typography> Add </Typography>
						</Button>
					</Grid>
					<Grid item md={6}>
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Recent Company</TableCell>
										<TableCell align="right">From</TableCell>
										<TableCell align="right">To</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{expArr.map((row) => (
										<TableRow key={row.name}>
											<TableCell></TableCell>
											<TableCell align="right">{row.calories}</TableCell>
											<TableCell align="right">{row.fat}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item md={4}>
						<FormControl>
							<InputLabel htmlFor="recentComp">Objective</InputLabel>
							<Input id="objective" aria-describedby="my-helper-text" color="primary"/>
						</FormControl>
					</Grid>
				</Grid>
			</form>
			<UploadCVButton/>
		</div>
	)
}

function UploadCVButton(props){
	const classes = useStyles()
	return(
		<Grid container className={classes.uploadCV} direction="column">
			<Grid item md={4}>
				<Typography> Upload CV </Typography>
				<Divider/>
			</Grid>
			<Grid item md={4} className={classes.uploadButton}>
				<input type="file" className={classes.uploadInput} id="uploadCVs" value={props.CV} onChange={props.uploadCV}/>
				<label htmlFor="uploadCVs">
					<Button 
					variant="contained"
					color="primary"
					component="span"
					startIcon={GetIcon('BackupIcon')}
					>
						Upload
					</Button>
				</label>
				{props.cv?<Typography>{props.cv.origName}</Typography>:false}
			</Grid>
		</Grid>
	)
}

function AccountDetails(props){
	const classes = useStyles()
	const roles = []
	var defaultRole = ''
	switch(props.roleChooser){
		case 'HealthCareAgency' :
			roles.push(...[
				{val:'Owner',text:'Owner'}
			])
			defaultRole = 'Owner'
			break
		case 'Caregiver' :
			roles.push(...[{val:'Caregiver',text:'Caregiver', selected:true}])
			defaultRole = 'Caregiver'
			break
		case 'Patient' :
			roles.push(...[{val:'Patient',text:'Patient', selected:true}])
			defaultRole = 'Patient'
			break
		case 'Staff' :
			roles.push(...[
				{val:'HRAdmin',text:'HR Department'},
				{val:'SocialWorker',text:'Social Worker'},
				{val:'Coordinator',text:'Coordinator'},
				{val:'TimeKeeper',text:'Time Keeper'},
				{val:'Accounting',text:'Accounting'}
			])
			break
	}
	const [role, setRole] = React.useState(defaultRole)
	const handleChange = (event) => {
		setRole(event.target.value)
	}
	return(
		<Grid container className={classes.setSpaceTop} direction="column">
			<Grid item md={6}>
				<Typography variant="h6">Account Details</Typography>
				<Divider />
			</Grid>
			<Grid item>
				<FormControl className={classes.formControl}>
					<InputLabel id="Role">Role</InputLabel>
					<Select
						labelId="Role"
						id="rolePicker"
						name="rolePicker"
						value={role}
						onChange={handleChange}
						label="rolepicker"
						form="formSignup"
						disabled={defaultRole?true:false}
					>
						{roles.map((o)=>{return(<MenuItem value={o.val} key={o.val}>{o.text}</MenuItem>)})}
					</Select>
				</FormControl>
			</Grid>
			<Grid item md={6} className={classes.setSpaceTopinput}>
				<FormControl>	
					<InputLabel htmlFor="email">Email address</InputLabel>
					<Input id="email" aria-describedby="my-helper-text" color="primary" form="formSignup"/>
				</FormControl>
			</Grid>
			<Grid item md={6} className={classes.setSpaceTopinput}>
				<FormControl>
					<InputLabel htmlFor="username">Username</InputLabel>
					<Input id="username" aria-describedby="my-helper-text" color="primary" form="formSignup"/>
				</FormControl>
			</Grid>
			<Grid item md={6} className={classes.setSpaceTopinput}>
				<FormControl>
					<InputLabel htmlFor="password">Password</InputLabel>
					<Input id="password" aria-describedby="my-helper-text" color="primary" form="formSignup"/>
				</FormControl>
			</Grid>
			<Grid item md={6} className={classes.setSpaceTopinput}>
				<FormControl>
					<InputLabel htmlFor="cpassword">Confirm Password</InputLabel>
					<Input id="cpassword" aria-describedby="my-helper-text" color="primary" form="formSignup"/>
				</FormControl>
			</Grid>
		</Grid>
	)
}

export function SignupRole(){
	const classes = useStyles()
	const [raiser, setRaiser] = React.useState([])
	function handleHover(i,x){
		setRaiser({...raiser, [i]:x})
	}
	chooser=[{
			img:'/assets/img/agency.png',
			text:'Signup as Health Care Agency',
			href:"/Signup/HealthCareAgency"
		},{
			img:'/assets/img/caregiver.png',
			text:'Signup as Caregiver',
			href:"/Signup/Caregiver"
		},{
			img:'/assets/img/househeart.png',
			text:'Signup as Patient',
			href:"/Signup/Patient"
		}
	]
	return(
		<React.Fragment>
			<Container maxWidth="lg" className={classes.RoleVariants}>
				<Grid container justify="center">
					<Grid item md={4} className={classes.rolechooserheader}>
						<Typography variant="h3"> Let us know you. </Typography>
					</Grid>
				</Grid>
				<Grid container spacing={3} justify="center">
					{chooser.map((o,i)=>(
						<Grid item lg={3} md={4} sm={3}>
							<Link href={o.href}>
								<Paper elevation={raiser[`i_${i}`]} onMouseEnter={()=>handleHover(`i_${i}`,5)} onMouseLeave={()=>handleHover(`i_${i}`,1)}>
									<img src={o.img} className={classes.rolechooserimg}/>
									<Typography align="center" className={classes.rolechoosertextBottom}>{o.text}</Typography>
								</Paper>					
							</Link>
						</Grid>
					))}
				</Grid>
			</Container>
		</React.Fragment>
	)
}

function CompanyDescriptor(props){
	const classes	= useStyles()
	return(
		<div>
			<Grid container className={classes.setSpaceTop} direction='column'>
				<Grid item md={5}>
					<Typography variant="h6">Company Description</Typography>
					<Divider />
				</Grid>
			</Grid>
			<Grid container direction="column">
				<Grid item md={4}>
					{props.comPp?<img className={classes.profilePicture} src={`/cdn/storage/Images/${props.comPp.id}/original/${props.comPp.id}${props.comPp.ext}`} htmlFor='uploadCompanyProfilePicture'/>:false}
				</Grid>
				<Grid item md={4}>
					<input accept="image/*" className={classes.uploadInput} id="uploadCompanyProfilePicture" type="file" value={props.uploadCompanyProfilePictureValue} onChange={props.uploadCompanyProfilePicture}/>
					<label htmlFor="uploadCompanyProfilePicture">
						<IconButton color="primary" aria-label="upload picture" component="span">
							{GetIcon('PhotoCamera')}
						</IconButton>
					</label>
				</Grid>
				<Grid item>
					<FormControl>
						<InputLabel htmlFor="compName">Company Name</InputLabel>
						<Input id="compName" aria-describedby="my-helper-text" color="primary" form="formSignup"/>
					</FormControl>
				</Grid>
				<Grid item>
					<FormControl>
						<InputLabel htmlFor="compAddress">Company address</InputLabel>
						<Input id="compAddress" aria-describedby="my-helper-text" color="primary" form="formSignup"/>
					</FormControl>
				</Grid>
				<Grid item>
					<FormControl>
						<InputLabel htmlFor="compDesc">Company Description</InputLabel>
						<Input id="compDesc" aria-describedby="my-helper-text" color="primary" form="formSignup"/>
					</FormControl>
				</Grid>
				<Grid item>
					<FormControl>
						<InputLabel htmlFor="Pnumber">Mobile Number</InputLabel>
						<Input id="Pnumber" aria-describedby="my-helper-text" color="primary" form="formSignup"/>
					</FormControl>
				</Grid>
				<Grid item>
					<FormControl>
						<InputLabel htmlFor="telno">Telephone</InputLabel>
						<Input id="telno" aria-describedby="my-helper-text" color="primary" form="formSignup"/>
					</FormControl>
				</Grid>
			</Grid>
		</div>
	)
}