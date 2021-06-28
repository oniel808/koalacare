import React from 'react';
import { Meteor } from 'meteor/meteor';

import GetIcon from './GetIcon.jsx'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button, Link } from '@material-ui/core';

var useStyles = makeStyles((theme)=>({
	cardCounter:{
		margin:5,
		backgroundColor:'rgb(2, 136, 209) !important'
	},
	cardCounterNav:{
		paddingBottom:4,
		color:'white'
	},
	cardCounterMiddle:{
		paddingBottom:15,
		color:'white',
		paddingTop:15
	},
	cardCounterBottom:{
		paddingTop:5,	
		color:'white',
		paddingBottom:0,
	}
}))
// sample of this Card Counter
// export const cardItems = [{
// 	Goto:'Go to Employees',
// 	icon:'PeopleIcon',
// 	counter:0,
// 	subtitle:'adad',
// 	link:'/Caregiver/List'
// }]
// <CardCounter cardItems={<array>} xs, sm, md, lg, xl={num} />
export function CardCounter(props){
	var classes = useStyles()
	const { xs, sm, md, lg, xl } = props
	return(
		<React.Fragment>
			{props.cardItems.map((o,i)=>{
				return (
					<Grid item xs={xs?xs:12} sm={sm?sm:12} md={md?md:12} lg={lg?lg:12} xl={xl?xl:12} key={i}>
						<Cards classes={classes} o={o} />
					</Grid>
				)
			})}
		</React.Fragment>
	)
}
function Cards(props){
	const { classes, o } = props
	const [raiser, setRaiser] = React.useState(false)
	function handleHover(x){
		setRaiser(x)
	}
	return(
		<Card raised={raiser} onMouseEnter={()=>handleHover(true)} onMouseLeave={()=>handleHover(false)} className={classes.cardCounter} >
			<CardContent>
				<Grid className={classes.cardCounterNav} container justify="flex-end" direction="row" >
					<Grid item >
						<Grid container justify="space-between" alignItems="flex-start">
							<Grid item>
								<Typography component={o.link?Link:''} href={o.link} style={{textDecoration:'none', color:'#fff'}}>{o.Goto}</Typography>
							</Grid>
							<Grid item>
								<GetIcon icon='ArrowForwardIosIcon' />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid className={classes.cardCounterMiddle} container spacing={0} justify="space-between" direction="row">
					<Grid item ><GetIcon icon={o.icon} /></Grid>
					<Grid item ><Typography>{o.counter}</Typography></Grid>
				</Grid>
				<Grid className={classes.cardCounterBottom} container spacing={0} justify="flex-start" direction="row">
					<Grid item ><Typography>{o.subtitle}</Typography></Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}