import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { CardCounter } from '../Layouts/CardCounter.jsx'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import GetIcon from '../Layouts/GetIcon.jsx'
import moment from 'moment';
import { Paper, Button, Divider, Radio, RadioGroup, InputLabel, FormLabel, 
				FormControl, FormControlLabel, Input, TextField, Typography, Grid, Tab, Tabs,
				Hidden} from '@material-ui/core'
import { ProfileNameHolder, TargetNameHolder, ProfileDivider, CustomSchedule} from '../Layouts/Profile.jsx'

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
}))

export const infoCards = 
	[{
		Goto:'Patients counter',
		icon:'PeopleIcon',
		counter:0,
		subtitle:'',
		link:'/profile/$id$/patient_list'
	},{
		Goto:'Patients Today',
		icon:'PeopleIcon',
		counter:0,
		subtitle:'',
		link:'/profile/$id$/patient_Today'
	}]

export function Caregiver(){
	var classes = useStyles()
	cardItems = [{
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
	export const scheduleTabs = ["Current Patient", "Patient List"]
	return (
		<React.Fragment>
			<Grid container>
				<Grid item md={12} sm={12} lg ={8}>
					<ProfileNameHolder classes={classes} data={caregiverProfileNameHolder}/>
					<Grid container style={{marginLeft:20,marginBottom:10}}>
						<CardCounter cardItems={infoCards} md={5} sm={5} lg={4} xl={3}/>
					</Grid>
				</Grid>
			</Grid>
			<Grid container style={{padding:'10px 0px'}}>
				<Grid item md={8} sm={12} lg ={7}>
					<ProfileDivider />
				</Grid>
			</Grid>
			<Grid item component={Paper} md={10} sm={12} lg ={8}>
				<TargetNameHolder classes={classes} data={PatientsProfileNameHolder}/>
				<CustomSchedule tabs={scheduleTabs}/>
			</Grid>
		</React.Fragment>
	)
}
