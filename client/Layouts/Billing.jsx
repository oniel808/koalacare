import React from 'react'
import { Meteor } from 'meteor/meteor'

import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import GetIcon from './GetIcon.jsx'
import TableLister from './TableLister.jsx'

const useStyles = makeStyles({
	spacertop:{
		paddingTop:20
	}
})

export function Billing(){
	const classes = useStyles()
  return(
  <React.Fragment>
  	<Grid container direction="column">
	  	<Grid item>
	  		<Typography variant="h3">Billing</Typography>
	  	</Grid>
	  	<Divider />
	  	<Grid item>
	  		<Grid container className={classes.spacertop}>
			  	<Grid item sm={4} md={3} lg={3}>
	  				<Typography >Your Monthly Billing</Typography>
			  	</Grid>
			  	<Grid item>
	  				<Typography >$4.00/Monthly</Typography>
			  	</Grid>
		  	</Grid>
	  		<Grid container className={classes.spacertop}>
			  	<Grid item sm={4} md={3} lg={3}>
	  				<Typography >Your Subscription will end on:</Typography>
			  	</Grid>
			  	<Grid item>
	  				<Typography >April 18 2020</Typography>
			  	</Grid>
		  	</Grid>
	  		<Grid container className={classes.spacertop}>
			  	<Grid item sm={4} md={3} lg={3}>
	  				<Typography >Your Subscription will end on:</Typography>
			  	</Grid>
			  	<Grid item>
			  		 <Grid container direction="column" className={classes.spacertop}>
					  	<Grid item>
								<Button
									variant="contained"
									color="secondary"
									endIcon={GetIcon('Search')}
								>
									Search
								</Button>
					  	</Grid>
					  	<Grid item md={8} className={classes.spacertop}>
			  				<Typography >this will not cancel immediately upon agreeing to cancel your subscription</Typography>
					  	</Grid>
				  	</Grid>
			  	</Grid>
		  	</Grid>
	  	</Grid>
  	</Grid>
  </React.Fragment>
  )
}
export function Services(){
	return(
		<React.Fragment>
			<Grid container>
				<Grid item>
					Services
				</Grid>
			</Grid>
		</React.Fragment>
	)
}