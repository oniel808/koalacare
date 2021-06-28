import React from 'react'
import { Meteor } from 'meteor/meteor'

import GetIcon from './GetIcon.jsx'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'


const useStyles = makeStyles({
	personalDetails:{
		marginTop:30
	},
	spacergrid:{
		marginTop:30
	},
	image:{
		width:'100%'
	},
	iconbutton:{
		textAlign: "center"
	}
})
export function Preferences(props){
	const classes=useStyles()
	rows=[{
		fieldArr:[
			{
			header: {
				type:'image',
				src:'/assets/ico.png'
				},
				value:{
				}
			},{
				header:{
					type:'iconButton',
					value:'',
					text:'Upload',
					color:'primary',
					icon:'PhotoCamera',
				},
				value:{
				}
			},{
				header:{
					text: 'First name:',
					type:'text',
				}, 
					value:{
					type:'text',
					value:'',
					text:'12634',
					color:'primary',
					icon:''
				}
			},{
				header:{
					text: 'Last name:',
					type:'text',
				},value:{
					type:'text',
					value:'',
					text:'12634',
					color:'primary',
					icon:''
				}
			},{
				header:{
					text:'Email Address:',
					type:'text',
				},
				value:{
					type:'text',
					value:'',
					text:'12634',
					color:'primary',
					icon:''
				}
			},{
				header:{
					text:'Birth date:',
					type:'text',
				},value:{
					type:'text',
					value:'',
					text:'12634',
					color:'primary',
					icon:''
				}
			},{
				header:{
					text:'Age:',
					type:'text',
				},
				value:{
					type:'text',
					value:'',
					text:'12634',
					color:'primary',
					icon:''
				}
			},
			],
			title:'Personal Details'
		},{
			fieldArr:[{
					header:{
						text:'Name',
						type:'text',
					},
					value: {
						type:'text',
						value:'',
						text:'CBE Company',
						color:'primary',
						icon:''
					}
				},{
					header:{
						text:'Address',
						type:'text',
					},
					value: {
						type:'text',
						value:'',
						text:'12634',
						color:'primary',
						icon:''
					}
				},{
					header:{
						text:'Telephone',
						type:'text',
					},
					value: {
						type:'text',
						value:'',
						text:'12634',
						color:'primary',
						icon:''
					}
				},{
					header:{
						text:'Phone',
						type:'text',
					},
					value: {
						type:'text',
						value:'',
						text:'12634',
						color:'primary',
						icon:''
					}
				},{
					header:{
						text:'Description',
						type:'text',
					},
					value: {
						type:'text',
						value:'',
						text:'12634',
						color:'primary',
						icon:''
					}
				},
			],
			title:'Company'
		},{
			fieldArr:[{	
					header:{
						text:'Manage blocked friends',
						type:'text',
					},
					value: {
						type:'button',
						value:'',
						text:'Manage',
						color:'primary',
						icon:'',
						href:'#sample'
					}
				},{
					header:{
						text:'Manage your privacy',
						type:'text',
					},
					value: {
						type:'button',
						value:'',
						text:'Manage',
						color:'primary',
						icon:'',
						href:''
					}
				},
			],
			title:'Friends'
		},{
			fieldArr:[{	
					header:{
						text:'Change Username',
						type:'text',
					},
					value: {
						type:'button',
						value:'',
						text:'Change Username',
						color:'primary',
						icon:'',
						href:'#sample'
					}
				},{
					header:{
						text:'Change Email',
						type:'text',
					},
					value: {
						type:'button',
						value:'',
						text:'Change Email',
						color:'primary',
						icon:'',
						href:''
					}
				},{
					header:{
						text:'Change Password',
						type:'text',
					},
					value: {
						type:'button',
						value:'',
						text:'Change Password',
						color:'primary',
						icon:'',
						href:''
					}
				},
			],
			title:'Account Information'
		}
	]
	function actionColumn(x){
		if(typeof x.type !== undefined)
			switch (x.type){
				case 'button' :
					return (<Button variant="contained" color="primary" href={x.href}>{x.text}</Button>)
				break 
				case 'image' :
					return (<img src={x.src} className={classes.image}/>)
				case 'iconButton':
					return (<IconButton aria-label="Upload">{GetIcon(x.icon)}</IconButton>)
				default :
					return (<Typography>{x.text}</Typography>)
				break
			}
	}
	function ifimage(o){
		a ={}
		if(o.type == 'image' || o.type == 'iconButton'){
			a['row']=2
			a['style']='iconbutton'
		}else{
			a['row']=5
		}
		return a
	}
	return (
		<React.Fragment>
		<Grid container direction="column">
			<Grid item >
				<Grid container >
					<Grid item >
						<Typography variant="h3">Preferences</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
		<Divider />
			{
				rows.map((k,l)=>{
					return(
						<Grid container direction="row" className={classes.personalDetails} key={`${k.title}_${k}`}>
							<Grid item xs={12} >
								<Typography variant='h4'>{k.title}</Typography>
								{k.fieldArr.map((o,i)=>{
									return(
										<Grid container spacing={2} key={`${k.title}_${k}${i}`} className={classes[ifimage(o.header).style]}>
											<Grid item xs={7} sm={ifimage(o.header).row} md={ifimage(o.header).row}>
												{actionColumn(o.header)}
											</Grid>
											<Grid item >
												{actionColumn(o.value)}
											</Grid>
										</Grid>
									)
								})}
							</Grid>
						</Grid>
					)
				})
			}
		</React.Fragment>
	)
}