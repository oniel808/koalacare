import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { CardCounter } from '../Layouts/CardCounter.jsx'
import { makeStyles, withStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles'
import GetIcon from '../Layouts/GetIcon.jsx'
import moment from 'moment';
import { Paper, Button, Divider, Radio, RadioGroup, InputLabel, FormLabel, 
				FormControl, FormControlLabel, Input, TextField, Typography, Grid, Tab, Tabs,
				Hidden, Card,CardMedia, CardContent, CardActions } from '@material-ui/core'
import { ProfileNameHolder, TargetNameHolder, ProfileDivider, CustomSchedule} from '../Layouts/Profile.jsx'
import {
	Scheduler,
	DayView,
	WeekView,
	Appointments,
	AppointmentTooltip,
	DragDropProvider
	
} from '@devexpress/dx-react-scheduler-material-ui';
import { BrowserRouter as Router, Switch, Route, Link as ReactLink, Redirect } from 'react-router-dom'

import { ActionButtons } from '../Layouts/Profile'
const theme = createTheme()
const useStyles = makeStyles((theme)=>({
	profilePicture:{
		maxWidth: 150,
		borderRadius: 500,
	},
	cardCounterContainer:{
		paddingTop:50,
		paddingBottom:30
	},
	ProfileNameHolder:{
		paddingTop:theme.spacing(3),
	},
	calendarHeader:{
		paddingTop:theme.spacing(1),
		paddingBottom:theme.spacing(1),
	},
	calendarWrapper:{
		paddingTop:theme.spacing(3),
		paddingBottom:theme.spacing(3)
	},
	calendar:{
		marginRight:30,
		marginLeft:30,
	},
	Patientscounter:{
		backgroundImage:'linear-gradient(to bottom right, #F1F1F1, #FF8C73)'
	},
	Patientstoday:{
		backgroundImage:'linear-gradient(to bottom right, #F1F1F1, #73BBFF)'
	},
	friendlistContainer:{
		paddingBottom:100,
		paddingtop:100
	},
}))

export const CaregiverDashboard =()=>{
	console.log(theme)
	var classes = useStyles()
	const infoCards = 
	[{
		Goto:'Patients counter',
		icon:'PeopleIcon',
		counter:0,
		subtitle:'',
		link:'/profile/$id$/patient_list',
		style:classes.Patientscounter
	},{
		Goto:'Patients Today',
		icon:'PeopleIcon',
		counter:0,
		subtitle:'',
		link:'/profile/$id$/patient_Today',
		style:classes.Patientstoday
	}]
	const cardItems = [{
		Goto:'Patients',
		icon:'PeopleIcon',
		counter:0,
		subtitle:'your current patients',
	}]
	profile = Meteor.user().profile
	profilePicture = profile.IdPicture
	const caregiverProfileNameHolder = {
		name:profile.Name,
		subtitle:'',
		CompanyName:profile.Job.companyName,
		profilePicture:`/cdn/storage/Images/${profilePicture.id}/original/${profilePicture.id}${profilePicture.extensionWithDot}`,
		// action:[{call}, {video call}, {message}],
		// date:
	}
	const PatientsProfileNameHolder = {
		name:"Patient's Sample Name",
		subtitle:'',
		// profilePicture:url,
		// action:[{call}, {video call}, {message}],
		// date:
	}
	export const scheduleTabs = ["Patient Details", "Current Patient" ,"Patient List"]
	return (
		<React.Fragment>
			<Grid container direction='row'>
				<Grid item md={12} sm={12} lg ={12} xs={12}>
					<ProfileNameHolder classes={classes} data={caregiverProfileNameHolder}/>
					<Grid container style={{marginBottom:10}}>
						<CardCounter cardItems={infoCards} md={6} sm={6} lg={6} xl={4} xs={6}/>
					</Grid>
					<ProfileDivider style={{padding:'10px 0px'}}/>
					<Grid item component={Paper}>
						<TargetNameHolder classes={classes} data={PatientsProfileNameHolder}/>
						<CaregiverCustomSchedule tabs={scheduleTabs}/>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export const Caregiver = () => {
	return(
		<React.Fragment>
			<Route exact path="/Dashboard" component={ CaregiverDashboard } />
			<Route path="/Dashboard/friends" component={ FriendList } />
			<Route path="/Dashboard/company" component={ Agency } />
		</React.Fragment>
	)
}

export const CaregiverCustomSchedule = (props) => {
	let classes = useStyles()
	const { type } = props
	const StyledTabs = withStyles({
		indicator: {
			display: 'flex',
			justifyContent: 'center',
			backgroundColor: 'transparent',
			'& > span': {
				maxWidth: 40,
				width: '100%',
				backgroundColor: '#635ee7',
			},
		},
	})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)
	const StyledTab = withStyles((theme) => ({
		root: {
			textTransform: 'none',
			color: '#000',
			fontWeight: theme.typography.fontWeightRegular,
			fontSize: theme.typography.pxToRem(15),
			marginRight: theme.spacing(1),
			'&:focus': {
				opacity: 1,
			},
		},
	}))((props) => <Tab disableRipple {...props} />)
	const data = {
		name:'sample Name',
		subtitle:'',
		// profilePicture:url,
		// action:[{call}, {video call}, {message}],
		// date:
	}
	//scheduleTabs = ["tab 1", "tab 2"]
	const { tabs } = props
	const [tabHandler, setTabHandler] = React.useState(0)
	const handleChange = (e,newValue) => setTabHandler(newValue)
	return (
	<React.Fragment>
		<Grid container justifyContent="center">
			<Grid item>
				<StyledTabs value={tabHandler} onChange={handleChange} aria-label="styled tabs example">
					{tabs.map((o,i)=>{return (<StyledTab label={o} key={i} />)})}
				</StyledTabs>
			</Grid>
		</Grid>
		<CaregiverCustomScheduler Tab={tabHandler} type={type} />
	</React.Fragment>
	)
}

export const CaregiverCustomScheduler = (props) => {
	let classes = useStyles()
	const { Tab } = props
	const TargetProfileDetails =()=>{
		return (
			<React.Fragment>
				profile details
			</React.Fragment>
		)
	}
	return (
		<React.Fragment>
			<Grid container justifyContent={Tab?"center":"flex-start"} className={classes.calendarWrapper}>
				<Grid item md={Tab?11:6} className={classes.calendar} >
					{Tab==0?<TargetProfileDetails />:
					<React.Fragment>
						<Scheduler height={660}>
							{Tab==1?
								<DayView startDayHour={0} endDayHour={24} />:
								<WeekView startDayHour={0} endDayHour={24} />
							}
							<Appointments />
						</Scheduler>
					</React.Fragment>
					}
				</Grid>
			</Grid>
		</React.Fragment>
	)
}




export const CaregiverDashboardMenu = () => {
	const items = new Array()
	items.push({
		MenuName:'Dashboard',
		Moremenu:false,
		iconTagName:'DashboardIcon',
		href:'/dashboard'
	},{
		MenuName:'Health Care Agency',
		Moremenu:false,
		iconTagName:'DashboardIcon',
		href:'/dashboard/company'
	},{
		MenuName:'Friends',
		Moremenu:false,
		iconTagName:'DashboardIcon',
		href:'/dashboard/Friends'
	},{
		MenuName:'Patients',
		Moremenu:false,
		iconTagName:'DashboardIcon',
		href:'/dashboard/Patient'
	},{
		MenuName:'Statistics',
		Moremenu:false,
		iconTagName:'DashboardIcon',
		href:'/dashboard/Statistics'
	},{
		MenuName:'Divider',
	},{
		MenuName:'Logout',
		Moremenu:false,
		iconTagName:'AccessAlarmIcon',
		href:'',
	}
	)
	return items
}	

export const FriendList = (props) =>{

	const classes = useStyles()
	return(
		<>
			<Grid container component={Paper} className={classes.friendlistContainer} direction="column" >
				<Typography variant="h5" style={{marginTop:15,paddingLeft:15, marginBottom:15}}>Friends</Typography>
				<Grid container justifyContent="space-between" spacing={2}>
					<Grid item md={5}>
						<Button color="primary">Add friend</Button>
					</Grid>
					<Grid item md={4}>
					<TextField id="standard-basic" label="Search" variant="standard" />
					</Grid>
				</Grid>

				{/* FriendList Wrapper */}
					<Grid container alignItems="center" spacing={3}>

						<Grid item lg={3} md={5} sm={5} xs={6} >
							<Card>
								{/* show cover photo */}
								<CardMedia component="img" image={`${window.location.origin}/assets/img/dummyCoverPhoto.png`}/>
								<CardContent>
									<Grid container>
										<img src={`${window.location.origin}/assets/img/irys.png`} style={{width:'50%', borderRadius:500, position:'absolute', left:"50%", transform:'transform(-50%, 0px)'}} />
									</Grid>
									<Typography gutterBottom variant="h5">
										Name
									</Typography>
									<Typography variant="h6">
										About
									</Typography>
									<Typography variant="body2" color="textSecondary" noWrap style={{textOverflow: '-o-ellipsis-lastline'}}>
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
									</Typography>
								</CardContent>
								<CardActions>	
									<ActionButtons size="small"/>
								</CardActions>
							</Card>
						</Grid>

					</Grid>
				{/* FriendList end Wrapper */}
			</Grid>
		</>
	)
}

const Agency = () => {
	const classes=useStyles()
	return (
		<>
			<Grid container direction="column" component={Paper} style={{paddingBottom:100, marginBottom:150}}>
				{/* agency header, cover photo */}
				<Grid item md={12} style={{paddingBottom:180, marginBottom:40, backgroundColor:"#EFEFEF", position:'relative', borderBottomLeftRadius:0, borderBottomRightRadius:0}} component={Paper}>
				</Grid>
				{/* agency body  profile picture, prefference button */}
				<Grid item md={12}>
					<Grid container>
						<Grid item md={3}>
							{/* profile picture */}

						</Grid>
						<Grid item md={9}>
							<Grid container>
								<Grid item md={9}>
									<Typography>Name</Typography>
								</Grid>
								<Grid item md={3}>
									<Typography>2020-Active</Typography>
								</Grid>
							</Grid> 
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={12}>
					<ActionButtons/>
				</Grid>
				<Grid item md={12}>
					<Typography variant="h4" style={{paddingLeft:40,paddingRight:40,paddingTop:10}}>Company Description</Typography>
					<Typography style={{paddingLeft:40,paddingRight:40, paddingTop:10, paddingBottom:40}}>
						company descriptionx
					</Typography>
				</Grid>
			</Grid>
		</>
	)
}




// export default function(){
// 	const items=[]
// 	if(Roles.userIsInRole(Meteor.userId(), ['Admin','SuperAdmin'],'CareLocation'))
// 	else if(Roles.userIsInRole(Meteor.userId(),'Caregiver'))
// 	else if(Roles.userIsInRole(Meteor.userId(),'Owner'))
// 	return items
// }

