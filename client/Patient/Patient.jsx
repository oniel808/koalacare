import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { CardCounter } from '../Layouts/CardCounter.jsx'
import { makeStyles, withStyles } from '@mui/styles'
import GetIcon from '../Layouts/GetIcon.jsx'
import moment from 'moment';
import { Paper, Button, Divider, Radio, RadioGroup, InputLabel, FormLabel, 
				FormControl, FormControlLabel, Input, TextField, Typography, Grid, Tab, Tabs,
				Hidden} from '@material-ui/core'
import {
	Scheduler,
	DayView,
	WeekView,
	Appointments,
	AppointmentTooltip,
	DragDropProvider
} from '@devexpress/dx-react-scheduler-material-ui';

import { NameHolder, CustomSchedule } from '../Layouts/Profile.jsx'


export const infoCards = 
	[{
		Goto:'Recommendation',
		icon:'PeopleIcon',
		counter:0,
		subtitle:'',
		link:'/profile/$id$/recommendations'
	},{
		Goto:'Current Caregiver',
		icon:'PeopleIcon',
		counter:0,
		subtitle:'',
		link:'/profile/$id$/todaysCaregiver'
	}]
	let scheduleTabs = ["Caregiver"]
export const PatientToCaregiver = (props) => {
	return (
		<React.Fragment>
			<CustomSchedule tabs={scheduleTabs?scheduleTabs:[]} type={"PatientToCaregiver"}/>
		</React.Fragment>
	)
}