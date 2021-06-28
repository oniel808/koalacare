import React from 'react'
import { Grid } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme)=>({
	footerSpacer:{
		paddingBottom:theme.spacing(20),
		maxWidth:"100vh"
	}
}))
export function MainLayout(props){
  const classes = useStyles()
  const { Content, Title } = props
  return(
		<React.Fragment>
      <Helmet><title>{Title?Title:"KoalaCare"}</title></Helmet>
      {Content}
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