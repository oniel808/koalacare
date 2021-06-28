import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import './router.jsx'
import { MuiThemeProvider } from '@material-ui/core'
import  NavBar  from './home/NavBar.jsx'
import HomeTheme from './home/HomeTheme.jsx'
import { makeStyles } from '@material-ui/core/styles'
import { Header, Footer } from './home/home.jsx'
import { Helmet } from 'react-helmet'
const useStyles = makeStyles((g)=>({
	toolbar: g.mixins.toolbar,
	})
)
export function Main(props){
	Meteor.subscribe("dashboardMenu")
	const classes = useStyles()
	const { Content, Title } = props
	console.log(Content)
	return (
		<React.StrictMode>
			<Helmet><title>{Title?Title:"KoalaCare"}</title></Helmet>
			<MuiThemeProvider theme={HomeTheme}>
				{Content?Content.props?"":Content.props.home == "home"?<navWToolbar/>:'':false}
				<Header/>
				{Content}
				<Footer/>
			</MuiThemeProvider>
		</React.StrictMode>
	)
}
function navWToolbar(){
	return(<React.Fragment><NavBar /><div className={classes.toolbar} /></React.Fragment>)
}