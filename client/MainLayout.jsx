import React from 'react'
import { Grid } from '@material-ui/core'

import { makeStyles } from '@mui/styles'
import { Helmet } from 'react-helmet'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { BrowserRouter as Router, Switch, Route, Link,  } from 'react-router-dom'

import Homepage from '/home/homeContent.jsx'
const useStyles = makeStyles((theme)=>({
	footerSpacer:{
		paddingBottom:theme.spacing(20),
		maxWidth:"100vh"
	},
}))
export function MainLayout(props){
  const classes = useStyles()
  const { Content, Title } = props
  return(
		<React.Fragment>
      <Helmet><title>{Title?Title:"KoalaCare"}</title></Helmet>
      {/* {Content} */}
      sample
      <Homepage home="home"/>
    </React.Fragment>
	)
}


/*
export const MainLayout = ({Content}) => (
  <React.Fragment>
    {Content}
  </React.Fragment>
)
*/