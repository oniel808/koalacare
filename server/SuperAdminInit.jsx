import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Mongo } from 'meteor/mongo'
import moment from 'moment'
import { Random } from 'meteor/random'

export function SuperAdminInit(){
	if(Meteor.isServer){
		id = Random.id()
		g = Meteor.users.findOne({username:'oniel808'})
		console.log(g)
		if(!g){
			Accounts.createUser({
				_id:id,
				username:'oniel808',
				email:'oniel808@gmail.com',
				password:'oniel2012',
				profile:{
					Name:'Cornello B. Engreso',
					fName:'Cornello',
					lName:'Engreso',
					address:'33b Guiraray St Brgy 12 Amadeo, Cavite',
					email:'oniel808@gmail.com',
					tel : '09194594931',
					agencyPriceList:[
					//{
					//  desc: "Add your Description here",
					//  features: [],
					//  header: "Service Plan Title",
					//  numEmployee: "10",
					//  paypal_id: "P-7B572104DW738963UFWL4MPQ",
					//  price: "1",
					//  recurrency: "Month",
					//  _id: "ketM3D4cgBJ4eApKv",
					//  paypalFormid:'RBF2K3ZYM47YE'
					// }
					],
					paypal_id:''
				},
			})
			h = Meteor.users.findOne({username:'oniel808'})
			// sendVerification(h._id, 'oniel808@gmail.com')
			Roles.addUsersToRoles(h._id, ['Admin','SuperAdmin'], 'CareLocation')
	  }	
	}
}