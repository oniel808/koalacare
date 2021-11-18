import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import './router.jsx'
import { MuiThemeProvider } from '@material-ui/core'

import  NavBar  from './home/NavBar.jsx'
import HomeTheme from './home/HomeTheme.jsx'
import ThemeDashboard from './Layouts/ThemeDashboard'
import { makeStyles } from '@mui/styles'
import { Header, Footer } from './home/home.jsx'
import { Helmet } from 'react-helmet'
import Homepage from './home/homeContent.jsx'
import Login from './home/LoginPage'
import Dashboard from './Layouts/Dashboard'
import { useTracker } from 'meteor/react-meteor-data'
import CssBaseline from "@mui/material/CssBaseline"
import { grey } from '@mui/material/colors'

import { Signup, SignupRole, SignupContainerMain } from './Layouts/Signup'

import { browserHistory, IndexRoute } from 'react-router'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import { Page404 } from './Layouts/Page404'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const Main = (props)=> {
	const { Content, Title, children } = props
	return (
		<>
			<ThemeProvider theme={HomeTheme}>
				<CssBaseline />
				<Header/>
				<Homepage />
				<Footer/>
			</ThemeProvider >
		</>
	)
}
Meteor.startup(()=>{
	render(
		<Router>
			<Helmet>
				<title>KoalaCare</title>
				<style>
					{`body{ background-color: ${grey[100]} !important }`}
				</style>
			</Helmet>
			<Switch>
					<Route exact path="/" component={Main}/>
					{
						Meteor.userId()?
						<Route path="/Dashboard" component={LoadtoRoute}/>:
						<Route path="/login" component={Login}/>
					}
					<Route path="/Signup/" component={SignupContainerMain}/>
					<Route path="*" component={Page404}/>
				</Switch>
		</Router>,
		document.getElementById("react-target")
	)
})


const LoadtoRoute = () =>{
	if(LoadDashboard()){
		return (
		<>
			<ThemeProvider theme={ThemeDashboard}>
				<Dashboard/>
			</ThemeProvider >
		</>
		)
	}else
	return 'loading!!!!!!!!!!!!!!!!!'
}

const LoadDashboard = () => useTracker(()=> {
	let roleSubscription = Meteor.subscribe("loadRoles", Meteor.userId())
	return roleSubscription.ready()
},[])
