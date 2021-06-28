import React from 'react'
import { Meteor } from 'meteor/meteor'
import { mount } from 'react-mounter'
import { Main } from './main.jsx'
import { Client } from './Client/Client.jsx'
import SocialWorker from './Client/SocialWorker.jsx'
import { Caregiver } from './Caregiver/Caregiver.jsx'
import { MainLayout } from './MainLayout.jsx'
import Dashboard from './Layouts/Dashboard.jsx'
import { Signup, SignupRole } from './Layouts/Signup.jsx'
import { AboutUs, Contacts } from './home/home.jsx'
import Homepage from './home/homeContent.jsx'
import { Login } from './home/LoginPage.jsx'
import { ReactiveVar } from 'meteor/reactive-var'
import { Billing, Services } from './Layouts/Billing.jsx'
import { SuperAdmin } from './admin/superAdmin.jsx'
import { ViewProfile } from './Layouts/Profile'
import { TableLister, TablewithSearch } from './Layouts/TableLister.jsx'
import Container from '@material-ui/core/Container'

//just to initiate Alanning Role
const initRoles = () => {
	return Roles.subscription.ready()
}
const title = "KoalaCare"
Router.route('/',{
	name:'home',
	action(){
		mount(Main,{
			Content: <Homepage home="home"/>,
			Title:`${title}`
		})
	}
})

Router.route('/Dashboard', {
	name:'dashboard',
	action(){
		Tracker.autorun(function(){
			if(Roles.userIsInRole(Meteor.userId(), ['Admin','SuperAdmin'], 'CareLocation'))
				Router.go('/Admin/Dashboard')
			else if(Meteor.userId()){
				mount(MainLayout, {
					Content: <Dashboard />,
					Title:`${title} - Dashboard`
				})
				mount(Dashboard, {
					DashboardContent:showDashboardOnRole(Meteor.userId())
				})
			}else{
				Router.go('/Login')
			}
		})
		function showDashboardOnRole(id){
			if(Roles.userIsInRole(id, 'Owner'))
				return <Client />
			else if(Roles.userIsInRole(id, 'Caregiver'))
				return <Caregiver />
			// if(Roles.userIsInRole(Meteor.userId(), 'Staff'))
			// if(Roles.userIsInRole(Meteor.userId(), 'Patient'))
		}
	}
})

Router.route('/Services',{
	name:'Services',
	action(){
		mount(Main,{
			Content:<Services/>,
			Title:`${title} - Services`
		})
	}
})
Router.route('/About',{
	name:'About us',
	action(){
		mount(Main,{
			Content:<AboutUs/>,
			Title:`${title} - About`
		})
	}
})
Router.route('/contact',{
	name:'Contact Us',
	action(){
		mount(Main,{
			Content:<Contacts/>,
			Title:`${title} - Contact us`
		})
	}
})

Router.route('/Login',{
	name:'Login Page',
	action(){
		if(!Meteor.userId())
			mount(MainLayout, {
				Content:<Login />,
				Title:`${title} - Login`
			})
		else
			Router.go('/Dashboard')
	}
})
/* Table Lister */
Router.route('/Caregiver/:data',{
	name:'Caregiver',
	action(){
		data = this.params.data
		initRoles
		mount(Dashboard,{
			DashboardContent:<TablewithSearch data={data} name={this.route.options.name} ariaLabel="simple table" />
		})
	}
})
Router.route('/Profile/:id',{
	name:'ViewProfile',
	action(e){
		id = this.params.id
		initRoles
		mount(Dashboard,{
			DashboardContent:<ViewProfile id={id} />
		})
	}
})

Router.route('/Profile/:id/:goTo',{
	name:'MoreProfile',
	action(e){
		id = this.params.id
		goTo = this.params.goTo
		initRoles
		mount(Dashboard,{
			DashboardContent:<SocialWorker id={id} link={goTo}/>
		})
	}
})


Router.route('/Staff/:data',{
	name:'Staff',
	action(){
		data = this.params.data
		initRoles
		mount(Dashboard,{
			DashboardContent:<TablewithSearch data={data} name={this.route.options.name} ariaLabel="simple table" />
		})
	}
})
Router.route('/Applicants/:data', {
	name:'Applicants',
	action(){
		data = this.params.data
		initRoles
		mount(Dashboard,{
			DashboardContent:<TablewithSearch data={data} name={this.route.options.name} ariaLabel="simple table" />
		})
	}
})
Router.route('/Patient/:data',{
	name:'Patient',
	action(){
		data = this.params.data
		mount(Dashboard,{
			DashboardContent:<TablewithSearch data={data} name={this.route.options.name} ariaLabel="simple table" />
		})
	}
})
/* Table Lister */

Router.route('/Billing',{
	name:'Billing',
	action(){
		initRoles
		mount(Dashboard, {
			DashboardContent:<Billing />
			// Content: (<Signup />)
		})
	}
})

Router.route('/Billing/Receipts',{
	action(){
		table={th:[],tr:[]}
		initRoles
		mount(Dashboard, {
			DashboardContent:<TableLister ariaLabel="collapsible table" Content={table} />
			// Content: (<Signup />)
		})
	}
})

Router.route('/Preferences',{
	name:'Preferences',
	action(){
		Tracker.autorun(function(){
			if (Meteor.userId() && Roles.subscription.ready()) {
				mount(Dashboard, {
					DashboardContent:<Preferences />
					// Content: (<Signup />)
				})
			}
		})
	}
})

Router.route('/Signup',{
	name:'Signup',
	action(){
		
		Tracker.autorun(function(){
			if(Meteor.userId())
				Router.go('/Dashboard')
			else
				mount(Main, {
					Content:<SignupRole />,
					Title:`${title} - Sign Up`
					// Content: (<Signup />)
				})
		})
	}
})

Router.route('/Signup/:data',{
	name:'Signup with Role',
	action(){
		x=this.params.data
		mount(Main,{
			Content:
				<Container maxWidth='md'>
					<Signup roleChooser={x} mainSignup={true} />
				</Container>
		})
	}
})

Router.route('/Register/:data',{
	name:'Signup with Role2',
	action(){
		x=this.params.data
		roles = ['Caregiver','Patient','Staff']
		initRoles
		if(Meteor.userId() && roles.includes(x))
			mount(Dashboard, {
				DashboardContent:<Signup roleChooser={x}/>
			})
		else{
			console.error('404')
		}
	}
})

Router.route('/Admin/:data',{
	name:'Admin',
	action(){
		data = this.params.data
		initRoles
		mount(Dashboard, {
			DashboardContent:<SuperAdmin param={data} name={this.route.options.name}/>
		})
	}
})

