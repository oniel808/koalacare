import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Grid, Avatar, Typography, Divider, Paper, Tab, Tabs, Button } from '@mui/material' 
import { makeStyles, withStyles } from '@mui/styles'
import { withTracker } from 'meteor/react-meteor-data'
import { CardCounter } from './CardCounter.jsx'
import { infoCards as CaregiverCards, 
				 CaregiverPatientSchedule, CaregiverCustomSchedule, scheduleTabs as CaregiverTabs
} from '../Caregiver/Caregiver.jsx'
import { infoCards as PatientCards, 
				 PatientToCaregiver as PatientContent} from '../Patient/Patient.jsx'
import Moment from 'react-moment'
import { lightBlue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles'
import {
	Scheduler,
	DayView,
	WeekView,
	Appointments,
	AppointmentTooltip,
	DragDropProvider
} from '@devexpress/dx-react-scheduler-material-ui';
import { Timestamp } from 'bson'
const ProfileColl = new Meteor.Collection('ProfileColl');
const theme = createTheme()
const useStyles = makeStyles((theme) =>({
	agencyButton:{
		marginLeft:50
	},
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
	profileHolder:{
		paddingTop:30,
		paddingBottom:theme.spacing(5),
		paddingLeft:30
	},
	targetProfileHolder:{
		paddingBottom:theme.spacing(1),
		paddingLeft:theme.spacing(5)
	},
	profileWrapper:{
		paddingLeft:10,
		paddingBottom:theme.spacing(3),
	},
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
	spacingTop:{
		marginTop:theme.spacing(3),
	},
	spacingBottom:{
		marginBottom:theme.spacing(3),
	},
	dateToday:{
		"div .day":{
			backgroundColor:"#FF3D3D",
			borderTopRadius:20,
			fontSize:50
		}
	},
	nameHolder:{
		paddingTop:theme.spacing(3),
	},
	Call:{
		backgroundColor:`${theme.palette.success.light} !important`,
	},
	Message:{
		backgroundColor:`${theme.palette.info.light} !important`,
	},
	Apply:{
		backgroundColor:`${theme.palette.success.light} !important`,
	},
	viewProfileButton:{
		width:'100%',
		backgroundColor:`${lightBlue[300]} !important`
	},
	lightFont:{
		color:'#fff !important'
	},
	darkFont:{
		color:'#000 !important'
	}
}))

export const ViewProfile = withTracker((props) => {
	const { id } = props
	Meteor.subscribe('Profile', id)
	const prof = ProfileColl.findOne()
	return prof
})(ProfileContent)
function ProfileContent(props){
	const classes = useStyles()
	let { _id, profile } = props
	let currentLoggedinNameHolder
	let x
	if(_id){
		let profilePicture = profile.IdPicture
		x = {
			name:profile.Name,
			subtitle:'',
			profilePicture:`/cdn/storage/Images/${profilePicture.id}/original/${profilePicture.id}${profilePicture.extensionWithDot}`,
			// action:[{call}, {video call}, {message}],
			// date:
		}
		if(Roles.userIsInRole(_id,'Caregiver'))
			currentLoggedinNameHolder = { ...x, CompanyName:profile.Job.companyName }
		else
			currentLoggedinNameHolder = { ...x }
	}
	let cardItem
	const ChangeToId = (x, id) => {
		return x.map((i)=>{
			i.link = i.link.replace('$id$',id)
			return i
		})
	}
	if(Roles.userIsInRole(_id,'Caregiver')){8
		cardItem = ChangeToId(CaregiverCards,_id)
	}
	else if(Roles.userIsInRole(_id,'Patient')){
		cardItem = ChangeToId(PatientCards,_id)
	}
	return(
		<React.Fragment>
			<Grid component={Paper} container className={classes.profileWrapper}>
				<Grid item sm={12} md={12} lg={12}>
					{_id?<ProfileNameHolder classes={classes} data={_id?currentLoggedinNameHolder:''}/>:false}
					<Grid container>
						<CardCounter cardItems={cardItem?cardItem:[]} md={3} sm={5} lg={3} xl={3}/>
					</Grid>
				</Grid>
			</Grid>
			<ProfileDivider />
			<Grid component={Paper} container >
				{
					Roles.userIsInRole(_id,'Caregiver')?<CaregiverContent id={_id} />:
					Roles.userIsInRole(_id,'Patient')?<PatientContent id={_id} />:false/* next for Staffs */
				}
			</Grid>
		</React.Fragment>
	)
}
const CaregiverContent = () => {
	return (
		<React.Fragment>
			<CaregiverCustomSchedule tabs={CaregiverTabs?CaregiverTabs:[]}/>
		</React.Fragment>
	)
}

export const ProfileNameHolder = (props) =>{
		let classes = useStyles()
		const { data } = props
	/*{
		name:
		subtitle:
		CompanyName:
		profilePicture:url
		action:[{call}, {video call}, {message}],
		date:
	}*/
		return (
		<Grid container className={classes.profileHolder}>
			{/* <Grid item md={2} sm={2} >
				<Avatar className={classes.large} src={data.profilePicture}/>
			</Grid> */}
			<Grid item md={12} sm={12} lg={8} >
				<Grid container direction="column" className={classes.nameHolder}>
					<Grid item>
						<Typography><Moment interval={1000} format="LLL"/></Typography>
					</Grid>
					<Grid item>
						<Typography variant="h5" style={{paddingLeft:10}}>Hi, {data.name?data.name:'Name'}</Typography>
					</Grid>
					{/* <Grid item>
						<Typography>{data.CompanyName?data.CompanyName:"Company Name"}</Typography>
					</Grid> */}
				</Grid>
			</Grid>
		</Grid>
	)
}


export const TargetNameHolder = (props) => {
	let classes = useStyles()
	const { data } = props
	/*{
		name:
		subtitle:
		CompanyName:
		profilePicture:url
		action:[{call}, {video call}, {message}],
		date:
	}*/
	return (
		<Grid container className={classes.targetProfileHolder}>
			{/* <Grid item md={2} sm={2} >
				<Avatar className={classes.large} src={data.profilePicture}/>
			</Grid> */}
			<Grid item md={12} lg={12} sm={12} >
				<Grid container direction="column" className={classes.nameHolder}>
					<Grid item>
						<Typography variant="body1">{data.name?data.name:'Name'}</Typography>
					</Grid>
					{
					/* <Grid item>
						<Typography>{data.CompanyName?data.CompanyName:"Company Name"}</Typography>
					</Grid> */
					}
				</Grid>
			</Grid>
		</Grid>
	)
}

export const DateCard = (props) => {
	// const { } = props
	const classes = useStyles()
	return (
		<React.Fragment>
			<Grid container direction="column" className={classes.dateToday}>
				<Grid item>
					<Typography align="center" className="day">Teu</Typography>
				</Grid>
				<Grid item>
					Feb, 05, 2021
				</Grid>
			</Grid>
		</React.Fragment>
	)
}
export const ProfileDivider = () => <Divider style={{marginTop:10,marginBottom:10,}}/>
export const ProfileCard = () => {
	return (
		<React.Fragment>
			<Grid container direction="row" >
				<Grid item md={4}>
					<ProfileImage id={id}/>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}
export const ProfileImage = () => {
	return (
		<React.Fragment>
			
		</React.Fragment>
	)
}

export const ActionButtons=(props)=>{
	const { size='medium', buttons } = props
	const classes = useStyles()
	console.log(theme)
	if(buttons == "viewProfile")
		return (<Button className={`${classes.agencyButton} ${classes.viewProfileButton} ${classes.lightFont}`} size={size} variant="contained">View Profile</Button>)
	else if(typeof buttons === Array)
	return(
	<>
		<Button className={`${classes.agencyButton} ${classes.Call} ${classes.lightFont}`} size={size} variant="contained">Call</Button>
		<Button className={`${classes.agencyButton} ${classes.Message} ${classes.lightFont}`} size={size} variant="contained">Message</Button>
		<Button className={`${classes.agencyButton} ${classes.Apply} ${classes.lightFont}`} size={size} variant="contained">Apply</Button>
	</>
	)
	else
	return 'sdsa'
}