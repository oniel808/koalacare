import React ,{ useEffect } from 'react'
import { Meteor } from 'meteor/meteor'
import moment from 'moment'
import { CardCounter } from '../Layouts/CardCounter.jsx'
import { TableLister, TablewithSearch } from '../Layouts/TableLister.jsx'
import GetIcon from '../Layouts/GetIcon.jsx'
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import Select from '@mui/material/Select'
import DateFnsUtils from '@date-io/date-fns'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
const useStyles = makeStyles((theme)=>({
	plan:{
		paddingLeft:20,
		paddingRight:20,
	},
	planMinSize:{
		minWidth:285,
		minHeight:295
	},
	plans:{
		paddingTop:10,
		paddingBottom:10
	},
	planTitle:{
		paddingTop:10,
		paddingBottom:10
	},
	planDesc:{
		paddingTop:10,
		paddingBottom:10
	},
	planButton:{
		paddingTop:5,
		paddingBottom:5
	}
}))
export function SuperAdmin(props){
	const [state, setState] = React.useState({name:'',data:[]})
	const [drawer, setDrawer] = React.useState(false)
	const [editPlan,setEditPlan] = React.useState(false)
	const [ToolbarReturn,setToolbarReturn] = React.useState(undefined)
	const handleToolbarReturn = (x) => {
		setToolbarReturn(x)
	}
	function addPlan(x){
		setDrawer(x)
		setEditPlan(x)
	}
	if(props.param != state.name){
		Meteor.call('SuperAdmin',{getData:props.param,type:'table'},(err, res)=>{res?setState({data:res,name:props.param}):false})
	}
	if(!Roles.userIsInRole(Meteor.userId(), ['SuperAdmin'], 'CareLocation'))
		Router.go('/Dashboard')
	arr2=[
		'Dashboard',
		'ServicePlans',
		'Dev',
		'Settings',
	]
	arr1=[
		'Company',
		'Caregivers',
		'Patients',
		'Owner',
		'Disputes',
	]
	if(arr1.includes(props.param)){
		const p = []
		if(state.data)
			state.data.map((o,i)=>{
				p.push([o.companyName, o.compAddress, o.compEmpnumber, o.Applicants.length, o.Caregivers.length, o.Patients.length, o.Staff.length])
			})
		table={
			thead:['Name','Address','compEmpnumber','Applicants','Caregivers','Patients','Staff'],
			trow:p,
			name:'superadmin.companies'
		}
		return(
			<React.Fragment>
				<TablewithSearch data={props.param} name={props.name} table={table} ariaLabel="simple table" />
			</React.Fragment>
		)
	}
	else if(props.param == 'ServicePlans')
		return(
			<React.Fragment>
				<ServicePlansC addplanbutton={addPlan} editPlan={editPlan}  />
				<Drawer
				  style={{Width:280}}
				  anchor="right"
				  variant="persistent"
				  open={drawer}
				>
				  <Toolbar/>
				 	<ToolDrawerContent data={handleToolbarReturn} toolDrawerCollapse={addPlan}/>
				</Drawer>
			</React.Fragment>
		)
	else if(props.param == 'Dev')
		return (
			<React.Fragment>
				{'Dev'}
			</React.Fragment>
		)
	else if(props.param == 'Settings')
		return (
			<React.Fragment>
				{'Settings'}
			</React.Fragment>
		)
	else if(props.param == 'Dashboard')
		return (
			<React.Fragment>
				{'Dashboard'}
			</React.Fragment>
		)
}


function ServicePlansC(props){
	const [planArray, setPlanArray] = React.useState({call:false,plan:[]})
	if(planArray.call == false)
		Meteor.call('ServicePlans',{ type:'displayServicePlans' },(err,res)=>{err?console.error(err):setPlanArray({call:true,plan:res})})
	console.log(planArray)
	const RecurringfrequencyCapitalized=(x)=>{
		if(x){
			var rec = x.toLowerCase()
			stringCaps =  rec.charAt(0).toUpperCase()+ rec.slice(1)
			if(x == 'DAY')
				stringCaps = `${stringCaps.substring(0,2)}ily`
			else
				stringCaps = `${stringCaps}ly`
			return stringCaps
		}
	}
	const arr = [{
		title:'title',
		description:'Description',
		NumberofEmployees:'30',
		price:'40',
		recurrency:'MONTH',
		init_priceValue:'0',
	}]
	listPaypal={
		paypalObject:{
			'status': 'ACTIVE',
			'page_size': 5,
			'page': 1,
			'total_required': 'yes'
		},
		type:'paypal.BillingPlanlist'
	}
	const classes = useStyles()
	return (
		<Grid container justify="space-evenly" >
			{planArray.plan?
			planArray.plan.map((o,i)=>{
				return (
				<Grid item component={Paper} xs={4} lg={3} xl={2} className={`${classes.plan} ${classes.planMinSize}`} key={`${i}`}>
					<Grid container justify="flex-end" alignItems="flex-end" style={{height:20}}>
						<IconButton aria-label="delete" color="primary" component={Paper} style={{ top: -20, right: -40,backgroundColor:'white' }}>
							{GetIcon('EditIcon')}
						</IconButton>
					</Grid>
					<Grid container justify='center' alignItems='center' direction="column" className={classes.planTitle} >
						<Grid item >
							<Typography variant='h5' >{o.Plan.title}</Typography>
						</Grid>
					</Grid>
					<Divider />		
					<Grid container justify='center' className={classes.planDesc}>
						<Grid item >
							<Typography variant='body1' >{o.Plan.description}</Typography>
						</Grid>
					</Grid>				
					<Divider />	

					<Grid container className={classes.plans}>
						<Grid item md={6}>
							<Typography>Number of Employees</Typography>
						</Grid>
						<Grid item >
							{o.Plan.NumberofEmployees}
						</Grid>
					</Grid>
					<Grid container className={classes.plans}>
						<Grid item md={6}>
							<Typography>Payment</Typography>
						</Grid>
						<Grid item >
							{`${o.Plan.price} /${RecurringfrequencyCapitalized(o.Plan.recurrency)}`}
						</Grid>
					</Grid>
					<Grid container className={classes.plans}>
						<Grid item md={6}>
							<Typography>Initial Payment</Typography>
						</Grid>
						<Grid item >
							{o.Plan.init_price}
						</Grid>
					</Grid>

					<Divider />		
					<Grid container justify='center' alignItems='flex-end' className={classes.planButton}>
						<Grid item >
						{o.Paypal.state == 'ACTIVE'?
							<Button variant="contained" color="primary">
								Subscribe PP
							</Button>:false
						}
						</Grid>
						<Grid item >
							<Button variant="contained" color="primary">
								Subscribe Stripe
							</Button>
						</Grid>
					</Grid>
				</Grid>
				)
			}):false
			}
			{props.editPlan?false:<AddPlanButton classes={classes} plan={props.addplanbutton} />}
		</Grid>
	)
}

function AddPlanButton(props){
	return(
		<Grid item component={Paper} xs={4} lg={3} xl={2} className={props.classes.planMinSize}>
			<Button style={{height:'100%', width:'100%'}} justify="center" onClick={()=>{props.plan(true)}}>{GetIcon('AddIcon')}</Button>
		</Grid>
	)
}

function ToolDrawerContent(props){
	const classes = useStyles()
	plans=['Number of Employees','Price','Initial Payment']
	Recurringfrequency = ['Day','Week','Month','Year']
	const [recurring, setRecurring] = React.useState('')
	console.log(props)
	const PlanSubmit = (e) => {
		e.preventDefault()
		data = {
			Paypal:{
				"name": e.target.header.value,
				"description":  e.target.i_desc.value,
				"type": "INFINITE",
				"payment_definitions": [{
					"name": "Regular payment definition",
					"type": "REGULAR",
					"frequency": recurring.toUpperCase(),
					"frequency_interval": "1",
					"amount": {
						"value": e.target.Price.value,
						"currency": "USD"
					},
				}],
				"merchant_preferences": {
					"return_url": "http://localhost:3000/Billing/Paypal",
					"cancel_url": "http://localhost:3000/Billing/",
					"auto_bill_amount": "YES",
					"initial_fail_amount_action": "CONTINUE",
					"max_fail_attempts": "1",
					"setup_fee": {
						"currency": "USD",
						"value": e.target.InitialPayment.value
					}
				}
			},
			data:{
				description: e.target.i_desc.value,
				NumberofEmployees:e.target.NumberofEmployees.value,
				title:e.target.header.value,
				recurrency:recurring,
				price: e.target.Price.value,
				init_price:e.target.InitialPayment.value
			},
			Stripe:{

			}
		}
		Meteor.call('ServicePlans',{type:'AddPlan', data:data},(err,res)=>{err?console.log(err):console.log(res)})
	}
	function handleRecurring(x){
		setRecurring(x.target.value)
	}
	return (
		<form onSubmit={PlanSubmit}>
			<Grid item xs={4} lg={3} xl={2} className={classes.planMinSize}>
				<Grid container direction="row" alignItems="center">
					<Grid item>
						<IconButton aria-label="delete" color="secondary" onClick={()=>{props.toolDrawerCollapse(false)}}>
							{GetIcon('ArrowForwardIcon')}
						</IconButton>
					</Grid>
					<Grid item>
						<Typography>Add Plan</Typography>
					</Grid>
				</Grid>
				<Divider />
				<Grid container justify='center' alignItems='center' direction="column" className={classes.planTitle}>
					<Grid item >
						<TextField required id="header" name='header' label="Plan Title" />
					</Grid>
				</Grid>
				<Divider />	
				<Grid container justify='center' className={classes.planDesc}>
					<Grid item >
						<TextField
							id="i_desc"
							name="i_desc"
							label="Plan Description"
							multiline
							rows={4}
						/>
					</Grid>
				</Grid>
				<Divider />
				{plans.map((k,l)=>{
					nspace = k.replace(/\s/g, '');
					return (
						<React.Fragment key={`${l}`}>
							<Grid container className={classes.plans} justify='center' alignItems='flex-end'>
								<Grid item>
									{nspace=='Price'?
										<Grid container style={{height:80}}>
											<Grid item xs={6}>
												<TextField required id={nspace} name={nspace} label={k} />
											</Grid>
											<Grid item xs={6}>
												<FormControl style={{width:'100%',height:'100%'}}>
													<InputLabel id={`${nspace}label`}>Reccuring Subscription</InputLabel>
													<Select
														labelId={`${nspace}label`}
														id={nspace}
														value={recurring}
														onChange={(recur)=>{handleRecurring(recur)}}
													>
													{Recurringfrequency.map((o,i)=>{
														return <MenuItem value={o.toUpperCase()} key={`${l}_${i}`}>{o}</MenuItem>
													})}
													</Select>
												</FormControl>
											</Grid>
										</Grid>
									:<TextField required id={nspace} name={nspace} label={k} />
									}
								</Grid>
							</Grid>
						</React.Fragment>
					)
				})}
				<Divider />
				<Grid container justify='center' alignItems='flex-end' className={classes.planButton}>
					<Grid item >
						<Button variant="contained" color="primary" type="submit" >Save</Button>
					</Grid>
				</Grid>
			</Grid>
		</form>)
}




export const SuperAdminDashboardMenu = () => {
	const items = new Array()
	items.push(
		{
			MenuName:'Dashboard',
			Moremenu:false,
			iconTagName:'DashboardIcon',
			href:'/Admin/Dashboard'
		},{
			MenuName:'Company',
			Moremenu:false,
			iconTagName:'DashboardIcon',
			href:'/Admin/Company'
		},{
			MenuName:'Owner',
			Moremenu:false,
			iconTagName:'DashboardIcon',
			href:'/Admin/Owner'
		},{
			MenuName:'Caregivers',
			Moremenu:false,
			iconTagName:'DashboardIcon',
			href:'/Admin/Caregivers'
		},{
			MenuName:'Patients',
			Moremenu:false,
			iconTagName:'DashboardIcon',
			href:'/Admin/Patients'
		},{
			MenuName:'Divider',
		},{
			MenuName:'Service Plans',
			Moremenu:false,
			iconTagName:'DashboardIcon',
			href:'/Admin/ServicePlans'
		},{
			MenuName:'Disputes',
			Moremenu:false,
			iconTagName:'DashboardIcon',
			href:'/Admin/Disputes'
		},{
			MenuName:'Divider',
		},{
			MenuName:'Developer',
			Moremenu:false,
			iconTagName:'DashboardIcon',
			href:'/Admin/Dev'
		},{
			MenuName:'Settings',
			Moremenu:false,
			iconTagName:'DashboardIcon',
			href:'/Admin/Settings'
		},{
			MenuName:'Logout',
			Moremenu:false,
			iconTagName:'AccessAlarmIcon',
			href:'',
		}
	)
	return items
}