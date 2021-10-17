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
				Hidden } from '@material-ui/core'
import { ProfileNameHolder, TargetNameHolder, ProfileDivider, CustomSchedule} from '../Layouts/Profile.jsx'
import {
	Scheduler,
	DayView,
	WeekView,
	Appointments,
	AppointmentTooltip,
	DragDropProvider
} from '@devexpress/dx-react-scheduler-material-ui';
const theme = createTheme()
console.log(theme)
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
	}
}))

export const Caregiver=()=>{
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
		name:'sample Name',
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
		<Grid container justify="center">
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

export const CaregiverCustomScheduler = (props) =>{
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
			<Grid container justify={Tab?"center":"flex-start"} className={classes.calendarWrapper}>
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
		href:'/Dashboard'
	},{
		MenuName:'Health Care Agency',
		Moremenu:false,
		iconTagName:'DashboardIcon',
		href:'/Dashboard/HealthCareAgency'
	},{
		MenuName:'Friends',
		Moremenu:false,
		iconTagName:'DashboardIcon',
		href:'/Dashboard/Friends'
	},{
		MenuName:'Patients',
		Moremenu:false,
		iconTagName:'DashboardIcon',
		href:'/Dashboard/Patient'
	},{
		MenuName:'Statistics',
		Moremenu:false,
		iconTagName:'DashboardIcon',
		href:'/Dashboard/Statistics'
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

class Friends extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<>
				<Grid container>
					<Grid md={12}>
						<Grid container justify="space-between">
							<Grid md={5}>
								<Button>Add friend</Button>
							</Grid>
							<Grid md={3}>
								<TextField id="outlined-basic" label="Outlined" variant="outlined" />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</>
		)
	}
}

export { Friends }


// export default function(){
// 	const items=[]
// 	if(Roles.userIsInRole(Meteor.userId(), ['Admin','SuperAdmin'],'CareLocation'))
// 	else if(Roles.userIsInRole(Meteor.userId(),'Caregiver'))
// 	else if(Roles.userIsInRole(Meteor.userId(),'Owner'))
// 	return items
// }

