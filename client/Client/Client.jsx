import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { CardCounter } from '../Layouts/CardCounter.jsx'
import { makeStyles } from '@material-ui/core/styles'
import GetIcon from '../Layouts/GetIcon.jsx'
import moment from 'moment';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import InputLabel from '@material-ui/core/InputLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
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
export const hrtocaregiver = [
	...infoCards,
]
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