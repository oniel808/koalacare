import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Grid, Avatar, Typography, Divider, Paper, Tab, Tabs,} from '@material-ui/core' 
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { withTracker } from 'meteor/react-meteor-data'
import { CardCounter } from './CardCounter.jsx'
import { infoCards as CaregiverCards, 
				 CaregiverPatientSchedule, scheduleTabs as CaregiverTabs
} from '../Caregiver/Caregiver.jsx'
import { infoCards as PatientCards, 
				 PatientToCaregiver as PatientContent} from '../Patient/Patient.jsx'
import {
	Scheduler,
	DayView,
	WeekView,
	Appointments,
	AppointmentTooltip,
	DragDropProvider
} from '@devexpress/dx-react-scheduler-material-ui';
const ProfileColl = new Meteor.Collection('ProfileColl');
const useStyles = makeStyles((theme) =>({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
	profileHolder:{
		paddingTop:30,
		paddingBottom:theme.spacing(5),
		paddingLeft:30
	},
	profileWrapper:{
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
			<Grid container>
				<Grid item sm={12} md={10} lg={8}>
					<Grid component={Paper} className={classes.profileWrapper}>
						{_id?<NameHolder classes={classes} data={_id?currentLoggedinNameHolder:''}/>:false}
						<Grid container>
							<CardCounter cardItems={cardItem?cardItem:[]} md={4} sm={4} lg={4} xl={4}/>
						</Grid>
					</Grid>
					<ProfileDivider />
					<Grid component={Paper}>
						{
						Roles.userIsInRole(_id,'Caregiver')?<CaregiverContent id={_id} />:
						Roles.userIsInRole(_id,'Patient')?<PatientContent id={_id} />:false/* next for Staffs */
						}
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}
const CaregiverContent = () => {
	return (
		<React.Fragment>
			<CustomSchedule tabs={CaregiverTabs?CaregiverTabs:[]}/>
		</React.Fragment>
	)
}

export const NameHolder = (props) => {
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
			<Grid item md={2} sm={2} >
				<Avatar className={classes.large} src={data.profilePicture}/>
			</Grid>
			<Grid item md={7} sm={6} >
				<Grid container direction="column" className={classes.nameHolder}>
					<Grid item>
						<Typography>{data.name?data.name:'Name'}</Typography>
					</Grid>
					<Grid item>
						<Typography>{data.CompanyName?data.CompanyName:"Company Name"}</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<DateCard />
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
				<Grid md={4}>
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

export const CustomSchedule = (props) => {
	let classes = useStyles()
	const {type} = props
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
		<CustomScheduler Tab={tabHandler} type={type} />
	</React.Fragment>
	)
}

export const CustomScheduler = (props) =>{
	let classes = useStyles()
	const { Tab } = props
	return (
		<React.Fragment>
			<Grid container justify={Tab?"center":"flex-start"} className={classes.calendarWrapper}>
				<Grid component={Paper} item md={Tab?11:6} className={classes.calendar} >
					<Typography align="center" variant="h6" className={classes.calendarHeader}>
						{Tab == 0?"Reminders":"Patient List"}
						</Typography>
					<Scheduler height={660}>
						{Tab == 0?
						<DayView startDayHour={0} endDayHour={24} />:
						<WeekView startDayHour={0} endDayHour={24} />
						}
						<Appointments />
					</Scheduler>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}