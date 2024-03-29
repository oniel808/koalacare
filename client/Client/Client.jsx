import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { CardCounter } from '../Layouts/CardCounter.jsx'
import { makeStyles } from '@mui/styles'
import GetIcon from '../Layouts/GetIcon.jsx'
import moment from 'moment';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import { infoCards } from '../Caregiver/Caregiver.jsx'

const useStyles = makeStyles({
	title:{
		marginTop:0
	},
	inputSearch:{
		marginTop:10
	},
	textField:{
		paddingTop:10
	}
})
export function Client(){
	//HR, owner
	cardItems = [{
		Goto:'Go to Employees',
		icon:'PeopleIcon',
		counter:0,
		subtitle:'adad',
		link:'/Caregiver/List'
	},{
		Goto:'Go to Applicants',
		icon:'PeopleIcon',
		counter:0,
		subtitle:'adad',
		link:'/Applicants/List'
	},{
		Goto:'Go to Monitor',
		icon:'PeopleIcon',
		counter:0,
		subtitle:'adad',
		link:'/Caregiver/TimeSheet'
	}]
	return (
		<Grid container spacing={2} justify="flex-start" direction="row" >
			<CardCounter cardItems={cardItems} md={4} sm={4} lg={4} xl={4}/>
		</Grid>
	)
}

export function Search(props){
	var classes = useStyles()
	function title(x){
		y = x.data
		if(x.data == 'List'){
			y = `${x.name}${x.data}`
		}
		return y.replace(/([A-Z])/g, ' $1').trim()
	}
	return (
		<React.Fragment>
			<Grid container className={classes.title} spacing={3} >
				<Grid item>
					<Grid container className={classes.title} >
						<Grid item >
							<Typography variant="h3">
								{title(props.props)}
							</Typography>
						</Grid>
					</Grid>
					<form onSubmit={(val)=>{props.TableDataQuery(val)}}>
						<Grid container alignItems="flex-end" direction="row" spacing={2} className={classes.inputSearch} >
							<Grid item >
								<FormControl>
									<InputLabel htmlFor="search">Search</InputLabel>
									<Input id="search" name="search" aria-describedby="my-helper-text" color="primary" onChange={(val)=>{props.TableDataQuery(val)}}/>
								</FormControl>
							</Grid>
							<Grid item >
								<Button
									variant="contained"
									color="primary"
									endIcon={GetIcon('Search')}
									type="submit"
								>
									Search
								</Button>
							</Grid>
						</Grid>
					</form>
				</Grid>
				{
					props.props.data=='TimeSheet'?
					<Grid item>
						<MonitorDateFilter/>
					</Grid>:
					false
				}

			</Grid>
		</React.Fragment>
	)
	function MonitorDateFilter(){
		const [radioFilter, setRadioFilter] = React.useState('none')
		function switcher(x){
			console.log(x)
			switch (x){
				case 'SpecificDate':
					return <SpecificFilterDatepicker />
				case 'RangedDate':
					return <RangedFilterDatepicker />
			}
		}
		// onChange={dateRangeFilter}
		var classes = useStyles()
		return (
			<Grid container spacing={4}>
				<Grid item>
					<FormControl component="fieldset">
						<FormLabel component="legend">Date Filter</FormLabel>
						<RadioGroup aria-label="Filter" name="filter" value={radioFilter} >
							<FormControlLabel value="none" control={<Radio />} label="none" />
							<FormControlLabel value="SpecificDate" control={<Radio />} label="Specific Date" />
							<FormControlLabel value="RangedDate" control={<Radio />} label="Ranged Date" />
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item>
					{switcher(radioFilter)}
				</Grid>
			</Grid>
			)
		function SpecificFilterDatepicker(){
			return (
				<TextField
			    id="Date"
			    label="Date"
			    type="date"
			    defaultValue="2017-05-24"
			    className={classes.textField}
			    InputLabelProps={{
			      shrink: true,
			    }}
			  />
	  	)
		}
		function RangedFilterDatepicker(){
			var classes = useStyles()
			return (
				<Grid container alignItems="flex-start" direction='column' >
					<Grid item>
						<TextField
					    id="date"
					    label="From"
					    type="date"
					    defaultValue="2017-05-24"
					    className={classes.textField}
					    InputLabelProps={{
					      shrink: true,
					    }}
					  />
				 </Grid>
					<Grid item>
						<TextField
					    id="date"
					    label="To"
					    type="date"
					    defaultValue="2017-05-25"
					    className={classes.textField}
					    InputLabelProps={{
					      shrink: true,
					    }}
					  />
				 </Grid>
			 </Grid>
	  	)
		}
	}
}

export const ClientDashboardMenu = () =>{
	const items = new Array()
	items.push({
		MenuName:'Dashboard',
		Moremenu:true,
		iconTagName:'DashboardIcon',
		href:'/Dashboard',
		subMenu:[
			{
				MenuName:'Statistics',
				iconTagName:'AssessmentIcon',
				href:'#statistics'
			}
		]},
		{
		MenuName:'Staff',
		Moremenu:true,
		iconTagName:'DashboardIcon',
		href:'#',
		subMenu:[
			{
				MenuName:'Register Staff',
				iconTagName:'AssessmentIcon',
				href:'/Register/Staff'
			},
			{
				MenuName:'Staff List',
				iconTagName:'AssessmentIcon',
				href:'/Staff/List'
			}
		]},
		{
			MenuName:'Caregivers',
			Moremenu:true,
			iconTagName:'AccessAlarmIcon',
			href:'',
			subMenu:[
				{
					MenuName:'Add Caregiver',
					iconTagName:'AssessmentIcon',
					href:'/Register/Caregiver'
				},
				{
					MenuName:'Caregiver List',
					iconTagName:'AssessmentIcon',
					href:'/Caregiver/List'
				},
				{
					MenuName:'Monitor Caregivers',
					iconTagName:'AssessmentIcon',
					href:'/Caregiver/TimeSheet'
				},
				{
					MenuName:'Archived Caregiver',
					iconTagName:'AssessmentIcon',
					href:'/Caregiver/Archives'
				},
			]
		},{
			MenuName:'Human Resource',
			Moremenu:true,
			iconTagName:'AccessAlarmIcon',
			href:'',
			subMenu:[
				{
					MenuName:'Applicants',
					iconTagName:'AssessmentIcon',
					href:'/Applicants/List'
				},
				{
					MenuName:'Post Applicants',
					iconTagName:'AssessmentIcon',
					href:'/Applicants/PostApplicant'
				},
				{
					MenuName:'Archived Applicants',
					iconTagName:'AssessmentIcon',
					href:'/Applicants/Archives'
				},
			]
		},{
			MenuName:'Patients',
			Moremenu:true,
			iconTagName:'AccessAlarmIcon',
			href:'',
			subMenu:[
				{
					MenuName:'Patient',
					iconTagName:'AssessmentIcon',
					href:'/Patient/List'
				},
				{
					MenuName:'Add Patient',
					iconTagName:'AssessmentIcon',
					href:'/Register/Patient'
				},
				{
					MenuName:'Scheduling Caregivers',
					iconTagName:'AssessmentIcon',
					href:'/Patient/SchedulingCaregivers'
				},
				{
					MenuName:'Scheduling Patient',
					iconTagName:'AssessmentIcon',
					href:'/Patient/SchedulingPatient'
				},
			]
		},{
			MenuName:'Divider',
		},{
			MenuName:'Billing',
			Moremenu:true,
			iconTagName:'AccessAlarmIcon',
			href:'/Billing',
			subMenu:[
				{
					MenuName:'Patient',
					iconTagName:'AssessmentIcon',
					href:'/Billing'
				},
				{
					MenuName:'Receipts',
					iconTagName:'AssessmentIcon',
					href:'/Billing/Receipts'
				},
			]
		},{
			MenuName:'Divider',
		},{
			MenuName:'Feedback',
			Moremenu:false,
			iconTagName:'AccessAlarmIcon',
			href:'',
		}
	)
	return items
}