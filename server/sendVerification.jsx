import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'
export default  function sendVerification(Id,newEmail){
	user = Meteor.users.findOne(Id)
	// prefix = user.profile.prefix
	prefix = 'Mr.'
	emailVerify = {
		companyName:"Carelocation",
		HeaderText:'One Step Ahead!',
		recipient:'Hi '+prefix+' '+user.profile.lName,
		body:"You're almost ready to start enjoying our web app. simply click the big green button below to verify your email address",
		buttons:[{
			type:'button1',
			text:'Verify',
			// href:''
			// },{
			//  type:'button2',
			//  text:'info',
			// },{
			//  type:'button3',
			//  text:'danger',
			// },{
			//  type:'button4',
			//  text:'gray',
			// },{
			//  type:'button5',
			//  text:'black',
			// }]
		}]
	}
	// Accounts.removeEmail(user._id, user.emails[0].address)
	Accounts.addEmail(user._id, newEmail)
	Accounts.sendVerificationEmail(user._id, newEmail)
	Meteor.users.update(user._id,{
		$set:{
			'profile.email':newEmail
		}
	})
}