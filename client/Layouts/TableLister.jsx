import React, { useState, useEffect } from 'react'
import { Meteor } from 'meteor/meteor'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Search } from '../Client/Client.jsx'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { withTracker } from 'meteor/react-meteor-data'
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	tablecontainer:{
		marginTop:20,
		maxWidth:1125
	}
})

export function TablewithSearch(props){
	const [SearchValue, setSearchValue] = React.useState('')
	const [ dateRangeFilter, setdateRangeFilter] = React.useState()
	const dateRangeFilterHandle=(x)=>{
		setdateRangeFilter(x.target.value)
	}
	const handleSearchQuery = (e) => {
		e.preventDefault()
		if(e.target.search)
			setSearchValue(e.target.search.value)
		else if(e.target.value)
			setSearchValue(e.target.value)
	}
	const dateRange=(e)=>{

	}
	return (
		<React.Fragment>
			<Search dateRangeFilterHandle={dateRangeFilterHandle} dateRangeFilter={dateRangeFilter} props={props} Search={SearchValue} TableDataQuery={handleSearchQuery} />
			<TableLister dateRangeFilter={dateRangeFilter} search={SearchValue} name={props.name} data={props.data} ariaLabel={props.ariaLabel} />
		</React.Fragment>
	)
}

dataListCollection = new Meteor.Collection('TableListData')
export const TableLister = withTracker((props)=>{
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  let currentUser = Meteor.userId()
  let data = props.data
  let name = props.name
  Meteor.subscribe('TableLister', {currentUserId:currentUser, type:`${data}.${name}`})
  dataList = dataListCollection.find().fetch()
  // dataList = dataListCollection.find({"profile.Name":{ $regex: `/${props.search}/`}}).fetch()
  ariaLabel = props.ariaLabel
  return {
    currentUser,
    data,
    name,
    ariaLabel,
    dataList
  }
})(TableListerComponent)

function TableListerComponent(props){
	const classes = useStyles()
	datalist = dataListCollection.find({"profile.Name": { $regex : props.search, $options: 'i'}}).fetch()
	function countPatients(x){
		l = 0
		moment.weekdays().map((o,i)=>{
			l =+ x[o].length
		})
		return l
	}
	const countPatient = () => props.name!="Patient"?countPatients(o.profile.Patient):undefined
	let role
	switch(props.name){
		case 'Caregiver':
			role = 'Patient'
			break;
		case 'Patient':
			role = undefined
			break;
		default:
			role = 'Staff'
			break;
	}

	thead = ['Name', 'Address', 'Phone', role, 'Status']
	trow = []
	datalist.map((o,i)=>{
		trow.push([o.profile.Name,o.profile.address,o.profile.phone,countPatient,{type:'Link',id:o._id}])
	})
	if(props.table)
		thead = props.table.thead
	if(props.table)
		trow = props.table.trow
	return(
		<TableContainer component={Paper} className={classes.tablecontainer}>
			<Table className={classes.table} aria-label={props.ariaLabel}>
				<TableHead>
					<TableRow>
						{thead.map((row)=>(
							<TableCell key={row}>{row}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{trow.map((o,i)=>(
						<TableRow key={i}>
							{o.map((k,l)=>(<HasActionFunction i={i} l={l} key={`${i}_${l}`} data={k} />))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
function HasActionFunction(props){
	if(props.data.type == 'Button')
		return <TableCell><Button variant="contained" color="primary" key={`${props.i}_${props.l}`}>Primary</Button></TableCell>
	else if(props.data.type =='Link')
		return(
			<TableCell>
				<Link href="#" onClick={(e)=>{e.preventDefault()}} href={`/profile/${props.data.id}`} key={`${props.i}_${props.l}`}>
					<Button variant="contained" color="primary">View Profile</Button>
				</Link>
			</TableCell>
		)
	else
		return <TableCell key={`${props.i}_${props.l}`}>{props.data}</TableCell>
}
TableListerComponent.propTypes={
	currentUser:PropTypes.string,
	data:PropTypes.string,
	name:PropTypes.string,
	dataList:PropTypes.array,
}





// export class TablewithSearchComponent extends React.Component{
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			TableData:{}
// 		}
// 		// this.handleSearchQuery.bind(this)
// 	}
// 	componentWillMount(){
// 		console.log('yey')
// 		console.log(this.props)
// 		setTimeout(()=>{
// 			Meteor.call('Profile', {
// 				type:'listDefault', 
// 				find:props.name, 
// 				comp_Id:Meteor.user().profile.Company_Id
// 			},(err,res)=>{
// 				thead = []
// 				trow = []
// 				switch(props.name){
// 					case 'Caregiver':
// 						thead = ['Name', 'Address', 'Phone', 'Patients', 'Status', '']
// 						trow = []
// 						res.map((o,i)=>{
// 							p = o.profile
// 							console.log(moment.weekdays())
// 							trow.push([p.Name,p.address,p.phone])
// 						})
// 						this.setState(()=>{return {TableData:{thead:thead,trow:trow}}})
// 						break
// 				}
// 			})
// 		},1000)
// 	}
// 	handleSearchQuery(e){
// 		e.preventDefault()
// 		Meteor.call('Profile',{type:'FindfromHealthCareAgency', comp_Id:Meteor.user().profile.Company_Id})
// 	}
// 	render(){
// 		return (
// 			<React.Fragment>
// 				<Search props={this.props} TableData={this.state.TableData} TableDataQuery={this.handleSearchQuery} />
// 				<TableLister table={this.state.TableData} />
// 			</React.Fragment>
// 		)}
// }

