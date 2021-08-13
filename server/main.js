import { ReactiveVar } from 'meteor/reactive-var'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'
import { Mongo } from 'meteor/mongo'
import { FilesCollection } from 'meteor/ostrio:files'
import moment from 'moment'
import notification from	'../imports/js/notification.jsx'
import dashboardMenu from	'../imports/js/dashboardMenu.jsx'
import sendVerification from './sendVerification.jsx'
import { SuperAdminInit } from './SuperAdminInit.jsx'
import { roleInit } from './Roles/Roles.jsx'
import { Random } from 'meteor/random'

const paypal = require('paypal-rest-sdk')
import './Webhook.jsx'


import { ServicePlans, applicantsCollecton, TempList, DailyTimeRecord, PayrollRecord, personalGeolocation, tempGeolocation, Payments, clientStat, Social, Messages, HealthCareAgency} from './DB.jsx'
if(Meteor.isServer){
	paypal.configure({
		'mode': 'sandbox', //sandbox or live
		'client_id': 'AbmT3_SmUV4w9TlhXZGRetVV1AlXiX8wPi6M__TqIPIKKHWTqmNHYj-0uJV8kZpTXVLhE9HJheHMDasJ',
		'client_secret': 'EENCsML65owgWTV06ikHAAFArJLMYhAt7JfxGz92ClRyEdNenynIT8qs-WeoptGeMDBUP2gqP9mTEUgJ'
	})
	const os = require('os')
	const platform = os.platform()
	ostrioDirectory = ''
	if(platform == 'osx')
		ostrioDirectory = "/Users/admin/Desktop/koalacare"
	else if(platform == 'win32')
		ostrioDirectory = "C:/Users/Cornello/koalacare"
	else
		ostrioDirectory ="/home/oniel808/koalacare"
	const Images = new FilesCollection({
		collectionName: 'Images',
		storagePath : ostrioDirectory+"/programs/server/Images",
		allowClientCode: true, // Disallow remove files from Client
	 onBeforeUpload(file) {
		if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
			return true;
		} else {
			return 'Please upload image, with size equal or less than 10MB';
		}
	 }
	});
	const CV = new FilesCollection({
		collectionName: 'CV',
		storagePath : ostrioDirectory+"/programs/server/CV",
		allowClientCode: true, // Disallow remove files from Client
	 onBeforeUpload(file) {
			if (file.size <= 10485760 && /doc|docx|pdf/i.test(file.extension)) {
				return true;
			} else {
				return 'Please upload CV, with size equal or less than 10MB';
			}
		}
	})
	const Features = new FilesCollection({
		collectionName: 'features',
		storagePath : ostrioDirectory+"/programs/server/features",
		allowClientCode: true, // Disallow remove files from Client
	 onBeforeUpload(file) {
			if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
				return true;
			} else {	
				return 'Please upload CV, with size equal or less than 10MB';
			}
		}
	})

	Meteor.publish('files.images.all', function () {
		return Images.find().cursor
	})
	Meteor.publish('files.videos.all', function () {
		return Videos.find().cursor
	})
	Meteor.publish(null, function () {
		let id
		if(Roles.userIsInRole(this.userId, 'Owner')){
			p = Meteor.users.findOne(this.userId,{fields:{'profile.Company_Id':1}}).profile.Company_Id
			hcg = HealthCareAgency.findOne(p)
			id = {$in:[this.userId, ...hcg.Caregiver, ...hcg.Patients]}
		}else
			id = this.userId
		if(this.userId){
			return Meteor.roleAssignment.find({'user._id':id})
		}else{
			this.ready()
		}
	})
	Meteor.startup(() => {
		roleInit()
		// ServicePlans.remove({})
		// Meteor.users.remove({_id:"RaPSfLScqZGa6Btv6"})
		console.log(HealthCareAgency.find().fetch())
		console.log(Meteor.users.find().fetch())
		SuperAdminInit()
	})
	if (Meteor.isServer) {
		process.env.MAIL_URL="smtps://oniel808@gmail.com:iqkkdoerxmfcjbvk@smtp.gmail.com:465/"
	}
	Meteor.methods({
		Signup:function(x){
			email = x['email']
			User = x['username']
			Pass = x['password']
			ifUserExist = (Meteor.users.findOne({username:User},{fields:{_id:1}}))?true:false
			ifEmailExist = (Meteor.users.findOne({'emails.address':email},{fields:{_id:1}}))?true:false
			if(!ifUserExist && !ifEmailExist){
				comp = undefined
				ready = false
				staff = ["HRAdmin","SocialWorker","Coordinator","TimeKeeper","Accounting"]
				application_id = x['_id']
				fName = x['fName']
				lName = x['lName']
				bdate = x['Bdate']
				gender = x['gender']
				height = x['height']
				weight = x['weight']
				address = x['address']
				phone = x['Phone']
				tel = x['tel']
				role = x['rolePicker']
				IdPicture = x['IdPicture']
				role = x['role']
				objective = x['objective']
				radius = x['radius']
				companyName = ''
				companyId = x.company_id
				compAddress = ''
			
				resume = undefined
				if(x['resume'])
					resume = x['resume']
				if(x['role'] == 'Owner'){
					companyName = x['companyName']
					compAddress = x['compAddress']
					cl_company_compDescription = x['compDescription']
					cl_company_phone = x['compPhone']
					cl_company_tel = x['compTel']
					services = x['services']
					notify = undefined
				}
				Workexperience = x['Workexperience']
				cg_rate = x['cg_rate']
				dateCreated = moment().format('MM/DD/YYYY HH:mm:ss')
				toAdd = {}
				o={
					username:User,
					password:Pass,
					role:role,
					email:email,
					profile:{
						Name:`${fName} ${lName}`,
						fName:fName,
						lName:lName,
						bdate:bdate, 
						height:height,
						weight:weight,
						address:address,
						IdPicture:IdPicture,
						phone:phone,
						tel:tel,
						notification:[],
						createdBy: Meteor.userId(),
					},
				}
				Job={
					dateCreated:dateCreated,
					Workexperience : Workexperience,
					companyName : companyName,
					companyId : companyId,
					compAddress : compAddress,
					TimeIn:'',
					TimeKeepId:'',
					Resumes:[resume],
					employed:false,
					jobHistory:[
						// {
						// 	companyId:'',
						// 	companyExperience:{
						// 		from:'',
						// 		to:'',
						// 	},
						// }
					]
				}
				if(x['role'] == 'Caregiver'){
					toAdd = {
						colorIdentifier:randomColor(),
						Patient:{
							Monday:[],
							Tuesday :[],
							Wednesday:[],
							Thursday:[],
							Friday:[],
							Saturday:[],
							Sunday:[],
						},
						objective:objective,
						PatientRequest:[],
						Job:Job,
						preferences:{
							autoTimeIn:0,
							autoTimeOut:0,
							Gps:0,
						},
					}
					o['profile'] = {...o.profile, ...toAdd}
					createAccount(o)
				}else if(staff.includes(x['role'])){
					toAdd = {
						colorIdentifier:randomColor(),
						objective:objective,
						Job:Job,
						preferences:{
							autoTimeIn:0,
							autoTimeOut:0,
							Gps:0,
						},
					}
					o['profile'] = {...o.profile, ...toAdd}
					return createAccount(o)
				}else if(role == 'Patient'){
					toAdd={
						companyId : companyId,
						createdBy: Meteor.userId(),
						preferences:{
							Gps:0,
						},
						colorIdentifier:randomColor(),
						verified:false
					}
					return createAccount(o)
				}else if(role == 'Owner'){
					toAdd={
						Company:{
							companyName : companyName,
							compAddress : compAddress,
							compDescription : cl_company_compDescription,
							compEmpnumber : 0,
							compLogo : x['companyPicture'],
							compPhone : cl_company_phone,
							compTel : cl_company_tel,
							PatientRequest: [],
							patientRateperHour:0,
							Applicants:[],
							Caregivers:[],
							Staff:[],
							Patients:[]
						}
					}
					ready = true
					o['profile'] = {...o.profile, ...toAdd}
					return createAccount(o)
				}
				function createAccount(o,owner) {
					user = Meteor.user()
					console.log(o)
					let role = o.role
					var temp, user, id
					if(o.role == 'Owner'){
						temp = o.profile.Company
						o.profile['Company_Id'] = Random.id()
						delete o.profile.Company
					}
					try{
						Accounts.createUser(o)
						user = Meteor.users.findOne({username:o.username})
						id = user._id
						Roles.addUsersToRoles(id, o.role)
						console.log('success Sign up')
					}catch(err){console.log(err)}
					if(companyId && o.role != 'Owner'){
						if(role == "Patient")
							role += "s"
						registerToCompany({
							companyId:companyId,
							_id:id,
							role:role
						})
					}
					notify={
						_id:Random.id(),
						typeOfNotification:'Verify your account',
						alertTitle:'',
						alertBody:"Check your email and verify your account to have fully access onto your profile",
						read:false,
						alertType:'orange lighten-2',
						link:'/Dashboard/preferences',
						priority:2
					}
					notification({_id:id,type:'add',notif:notify})
					// company
					if(o.role == 'Owner'){
						Roles.addUsersToRoles(id, "Owner")
						notify={
							_id:Random.id(),
							typeOfNotification:'subscription',
							alertTitle:'Welcome to KoalaCare',
							alertBody:"Subscribe to plan to use our Service",
							read:false,
							activity:'Info',
							colorIdentifier:'#42a5f5',
							alertType:'blue lighten-3',
							link:'/Dashboard/Billing',
							priority:1
						}
						PayrollRecord.insert({
							'Company_Id':o.profile.Company_Id,
							'Caregivers':[],
							'Staff':[],
							'preferences':{
								'bi_weekly':{'nextCutOff':moment().format('MM/DD/YYYY')},
								'semi_monthly':{'nextCutOff':moment().format('MM/DD/YYYY')},
								'monthly':{'nextCutOff':moment().format('MM/DD/YYYY')},
								'weekly':{'nextCutOff':moment().format('MM/DD/YYYY')},
							}
						})
							// typeOfSubscription = services.recurrency
							// endOfSubscription = ''
							// if(services.recurrency == 'Month')
							// 	endOfSubscription = moment().add(moment().endOf('month').format('DD'),'days')
							// else if(services.recurrency == 'Year')
							// 	endOfSubscription = moment().add(365,'days')
						DailyTimeRecord.insert({
							'Company_Id':o.profile.Company_Id,
							'TimeRecord':{
								'Record':[]
							}
						})
						notification({_id:o.profile.Company_Id,type:'add',notif:notify})
						Payments.insert({
							_id:id,
							startOfSubscription:moment().toISOString(),
							endOfSubscription:'',
							typeOfSubscription:'none',// annual, monthly, weekly
							rate:'0',
							amount:'0',
							currency:'USD',
							transaction:[],
							receipt:[],
							paypal_id:'',
							status:'unpaid',
						})
						console.log({...temp, _id:o.profile.Company_Id,owner_id:id})
						HealthCareAgency.insert({...temp, _id:o.profile.Company_Id,owner_id:id})
					}
					Social.insert({
						_id:id,
						Friend:[],
						FriendRequest:[],
						FriendRequestFrom:[],
						Followers:[],
						Blocked:[],
						Unfriended:[],
						MessageBlock:[],
						Messages:[]
					})
					try{
						Accounts.addEmail(id, o.email)
						sendVerification(id, o.email)
					}catch(err){
						console.log(err)	
					}
					return true
				}
			}else{
				return {text:'the account is already existed',action:'click here to Login', errorFields:{username:ifUserExist,email:ifEmailExist}}
			}
		},
		SuperAdmin:(x)=>{
			// 'Company',
			// 'Caregivers',
			// 'Patients',
			// 'Disputes',
			switch (x.getData){
				case 'Company':
					return HealthCareAgency.find().fetch()
				break
				case 'Owner':
					return HealthCareAgency.find().fetch()
				break
				case 'Caregivers':
					return Meteor.users.find({roles:x.getData}).fetch()
				break
				case 'Patients':
					return Meteor.users.find({roles:x.getData}).fetch()
				break
				case 'Disputes':
					throw 'no disputes yet'
				break
				default :
					throw 'no specified table target'
				break
			}
		},
		Profile:(x)=>{
			if(x.type=='FindfromHealthCareAgency'){
				ids = HealthCareAgency.findOne(x.comp_Id)
				console.log(ids)
				// return Meteor.users.find({_id:x},{fields:{profile:1}}).fetch()
			}if(x.type=='listDefault'){
				console.log(x)
				ids = HealthCareAgency.findOne(x.comp_Id)
				return Meteor.users.find({_id:{$in:ids[x.find]}},{fields:{'profile.preferences':0,'profile.notification':0}}).fetch()
			}if(x.type=='display.specific')
				return Meteor.users.find({_id:id},{fields:{'profile.preferences':0,'profile.notification':0}}).fetch()
		},
		ServicePlans:(x)=>{
			var obj = {}
			switch(x.type){
				case 'AddPlan':
					console.log(x.data)
					_id = Random.id()
					try{
						ServicePlans.insert({
							_id:_id,...x.data.data
						})
					}catch(err){console.error(err)}
					paypal.billingPlan.create(x.data.Paypal, Meteor.bindEnvironment((error, billingPlan)=>{
						if(error){
							try{
								ServicePlans.remove(_id)
								console.error(error)
							}catch(error){console.error(error)}
						}else{
							obj = {...obj, ...billingPlan}
							console.log(billingPlan)
							ServicePlans.update(_id,{
								$set:{
									Paypal:{
										id:billingPlan.id,
									}
								}
							})
							var billing_plan_update_attributes = [{"op": "replace","path": "/","value": {"state": "ACTIVE"}}]
							paypal.billingPlan.update(billingPlan.id, billing_plan_update_attributes, Meteor.bindEnvironment((error, response) =>{
								paypal.billingPlan.get(billingPlan.id, Meteor.bindEnvironment((error, billingPlan)=>{
									if (error) {
										console.error(error.response)
									} else {
										obj ={...obj, ...billingPlan}
										ServicePlans.update(_id,{
											$set:{
												'Paypal.state':billingPlan.state,
											}
										})
										// Meteor.call('prices',{type:'addServicePlan',data:sp},function(err,res){console.log(err);console.log(res)})
									}
								}))
							}))
						}
					}))
					break
				default:
					
					// var list_billing_plan = {
					//     'status': 'ACTIVE',
					//     'page_size': 5,
					//     'page': 1,
					//     'total_required': 'yes'
					// };
					// paypal.billingPlan.list(list_billing_plan, function (error, billingPlan) {
					//     if (error) {
					//         throw error;
					//     } else {
					//         console.log("List Billing Plans Response");
					//         console.log(JSON.stringify(billingPlan));
					//     }
					// });
					return plansAsync()
					async function plansAsync(){
						const plans = ServicePlans.find().fetch()
						arr = []
						planss = []
						for(x=0; x<plans.length; x++){
							console.log(plans[x])
							if(plans[x].Paypal && plans[x].Paypal.id){
								// delete plans[x].Paypal
								arr.push({Paypal:await PaypalServicePlans(plans[x].Paypal.id), Plan:plans[x]})
								planss=[]
							}
						}
						if(!arr.length)
							return false
						return arr
						function PaypalServicePlans(x){
							return new Promise((resolve,reject)=>{
								paypal.billingPlan.get(x, function (error, billingPlan){
									if(error){
										console.error(error.response.details)
									}else{
										resolve(billingPlan)
									}
								})
							})
						}
					}
					break
			}
			return obj
		}
	})
	Meteor.publish('TableLister', function(data){
		var self = this;
		compId = Meteor.users.findOne(data.currentUserId).profile.Company_Id
		hcg = HealthCareAgency.findOne(compId)
		dataType = data.type.split(".")
		let [ type, roleAssignment ] = dataType
		if(roleAssignment == "Patient")
			roleAssignment += "s"
		console.log(roleAssignment)
		let ids = hcg[roleAssignment]
		let obj
		console.log(ids)
		if(data.type == 'List.Caregiver'){
			obj = {_id:{$in:ids}}
		}else if(data.type =='List.Patient'){
			obj = {_id:{$in:ids}}
		}
		var handle = Meteor.users.find(obj, {fields:{services:0,createdAt:0,username:0,password:0}})
			.observeChanges({
				added: function (id, fields) {
					self.added('TableListData', id, fields);
				},
				changed: function (id, fields) {
					self.changed('TableListData', id, fields);
				},
				removed: function (id) {
					self.removed('TableListData', id);
				}
			})

		
		self.ready()
		self.onStop(function () {
			handle.stop()
		})

	})
	Meteor.publish('Profile', function(data){
		var self = this
		let o
		if(Array.isArray(data))
			o = {_id:{$in:data}}
		else
			o = data
		if(data)
			Meteor.users.find(o,{fields:{services:0,createdAt:0,username:0}}).observeChanges({
				added: function (id, fields) {
					self.added('ProfileColl', id, fields)
				}})
		else
			self.ready()
	})
	Meteor.publish('loadRoles', function(data){
		var self = this;
		if(data){
			// console.log(Meteor.roleAssignment.find({ '_id': data }))
			Meteor.roleAssignment.find({ '_id': data })
		}
		else
			self.ready()
	})
	function registerToCompany(arr){
		console.log(arr)
		comp = HealthCareAgency.findOne(arr.companyId)
		console.log(comp)
		companyName = comp.companyName
		companyId = comp._id
		compAddress = comp.compAddress
		HealthCareAgency.update(arr.companyId, {
			$addToSet: {
				[arr.role]:arr._id
			},
		})
		let profile = Meteor.users.findOne(arr._id)
		let a
		if(profile && Roles.userIsInRole(arr._id,"Caregiver")){
			profile1 = profile.profile.Job.companyId
			if(profile1 != '' || typeof profile1 != undefined){
				a = {
					$set:{
						'profile.Job.companyId':comp._id,
						'profile.Job.compAddress':comp.companyAddress,
						'profile.Job.companyName':comp.companyName,
						'profile.Job.employed':true,
					}
				}
			}
		}else if(profile && Roles.userIsInRole(arr._id,"Patient")){
			profile1 = profile.profile.companyId
			if(profile1 != '' || typeof profile1 != undefined){
				a = {
					$set:{
						'profile.companyId':comp._id,
					}
				}
			}
		}
		Meteor.users.update(arr._id, a)
		PayrollRecord.update({
			'Company_Id':companyId
		},
		{
			$addToSet:{
				Caregivers:{
					caregiverId:arr._id,
					rate:0,
					salaryFrequency:'Unsettled',
					amount:0
				}
			}
		})
	}
	async function asyncPaypal(x) {
		return new Promise(resolve=>{resolve(200)})
		// return await PaypalResponse(x)
	}
	// function PaypalResponse(x){
	// 	const arr = []
	// 	return new Promise(resolve=>{
	// 		switch (x.type){
	// 			case 'paypal.BillingPlanlist':
	// 				paypal.billingPlan.list(x.paypalObject, function (error, res) {
	// 					if(error){
	// 						throw error
	// 					}else{
	// 						var response = res
	// 						const plans = []
	// 						res.plans.map((o,i) => {
	// 							paypal.billingPlan.get(o.id, function (error2, billingPlan) {
	// 								if (error2) {
	// 									console.log(error2)
	// 									throw error2
	// 								}else{
	// 									console.log(o)
	// 									plans.push({...o, ...billingPlan})
	// 									response.plans[i] = {o, ...billingPlan}
	// 									console.log(plans)
	// 								}
	// 							})
	// 						})
	// 						console.log(plans)
	// 						resolve(response)
	// 					}
	// 				})
	// 				break
	// 			default:
	// 				resolve(401)
	// 				break
	// 		}
	// 	})
	// }

	// Router.route( "/PaypalWebhook", { name: 'inbound', where: 'server'})
	// .post(()=>{
	// 	console.log(this)
	// })
}