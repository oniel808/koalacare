import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { CardCounter } from '../Layouts/CardCounter.jsx'
import { makeStyles } from '@mui/styles'
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


class FriendList extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<>
				<Typography variant="h1" color="initial">
					FrienList
				</Typography>
			</>
		)
	}

}
export default FriendsList