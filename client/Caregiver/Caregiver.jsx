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
import { NameHolder, ProfileDivider, CustomSchedule} from '../Layouts/Profile.jsx'

const useStyles = makeStyles((theme)=>({
	profilePicture:{
		maxWidth: 150,
		borderRadius: 500,
	},
	cardCounterContainer:{
		paddingTop:50,
		paddingBottom:30
	},
	nameHolder:{
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
	const caregiverNameHolder = {
		name:profile.Name,
		subtitle:'',
		CompanyName:profile.Job.companyName,
		profilePicture:`/cdn/storage/Images/${profilePicture.id}/original/${profilePicture.id}${profilePicture.extensionWithDot}`,
		// action:[{call}, {video call}, {message}],
		// date:
	}
	const PatientsNameHolder = {
		name:'sample Name',
		subtitle:'',
		// profilePicture:url,
		// action:[{call}, {video call}, {message}],
		// date:
	}
	export const scheduleTabs = ["Current Patient", "Patient List"]
	return (
		<React.Fragment>
			<Grid component={Paper}>
				<NameHolder classes={classes} data={caregiverNameHolder}/>
				<Grid container>
					<CardCounter cardItems={infoCards} md={4} sm={4} lg={4} xl={4}/>
				</Grid>
			</Grid>
			<ProfileDivider />
			<Grid component={Paper}>
				<NameHolder classes={classes} data={PatientsNameHolder}/>
				<CustomSchedule tabs={scheduleTabs}/>
			</Grid>
		</React.Fragment>
	)
}
