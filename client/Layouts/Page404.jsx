import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { makeStyles, withStyles } from '@mui/styles'
import { Paper, Button, Divider, Radio, RadioGroup, InputLabel, FormLabel, 
				FormControl, FormControlLabel, Input, TextField, Typography, Grid, Tab, Tabs,
				Hidden} from '@material-ui/core'

class Page404 extends React.Component{
	render(){
		return (
		<>
			<Typography align="center" variant="h4" style={{opacity:0.4}}>(Page 404)</Typography>
			<br/>
			<Typography align="center" variant="h3">Page Not found</Typography>
		</>)
	}
}
export { Page404 }