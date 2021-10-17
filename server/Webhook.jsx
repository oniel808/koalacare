// import { Random } from 'meteor/random'
// import { Meteor } from 'meteor/meteor'
// const paypal = require('paypal-rest-sdk')
// paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': 'AbmT3_SmUV4w9TlhXZGRetVV1AlXiX8wPi6M__TqIPIKKHWTqmNHYj-0uJV8kZpTXVLhE9HJheHMDasJ',
//   'client_secret': 'EENCsML65owgWTV06ikHAAFArJLMYhAt7JfxGz92ClRyEdNenynIT8qs-WeoptGeMDBUP2gqP9mTEUgJ'
// })
// import { ServicePlans, applicantsCollecton, DailyTimeRecord, PayrollRecord, personalGeolocation, tempGeolocation, Payments, clientStat, Social, Messages, HealthCareAgency} from './DB.jsx'
// Router.route( "/PaypalWebhook", { name: 'inbound', where: 'server'})
// .post((res)=>{
// 	// res = this
// 	console.log('Paypal Webhook')
// 	reshead = res.headers
// 	certURL = reshead['paypal-cert-url']
// 	transmissionId = reshead['paypal-transmission-id']
// 	transmissionSignature = reshead['paypal-transmission-sig']
// 	transmissionTimestamp = reshead['paypal-transmission-time']
// 	headers = {
// 		'paypal-auth-algo': 'SHA256withRSA',
// 		'paypal-cert-url': certURL,
// 		'paypal-transmission-id': transmissionId,
// 		'paypal-transmission-sig': transmissionSignature,
// 		'paypal-transmission-time': transmissionTimestamp
// 	}
// 	var webid = ''
// 	paypal.notification.webhook.list(Meteor.bindEnvironment((error, webhooksid) => {
// 		if (error) {
// 			console.error(error)
// 		}else{webid = webhooksid.webhooks[0].id

// 			// paypal.notification.webhookEvent.getAndVerify(JSON.stringify(res.body), Meteor.bindEnvironment((error, response) => {
// 			paypal.notification.webhookEvent.verify(headers, JSON.stringify(res.body), webid,Meteor.bindEnvironment((error, response) => {
// 				if(response){
// 					console.log('response Body')
// 				// }else{
// 					// Verification status must be SUCCESS
// 					if (response.verification_status === "SUCCESS"){
// 						// if (response) {
// 						if(res.event_type == 'BILLING.SUBSCRIPTION.CREATED'){
// 							console.log(res.event_type)
// 							switch (res.resource.state){
// 								case 'Pending':
// 									break
// 								case 'Active':
// 									break
// 								case 'completed':
// 									break
// 								default: break
// 							}
// 						}else if(res.event_type == 'BILLING.SUBSCRIPTION.CANCELLED'){
// 							if(res.resource.state == 'Cancelled'){
// 							agreement_id = res.resource.id
// 								paypal.billingAgreement.get(agreement_id,Meteor.bindEnvironment((error, billingAgreement) => {
// 									if (error) {
// 										throw error;
// 									} else {
// 										billing = {
// 											id:billingAgreement.id,
// 											start:'',
// 											end:billingAgreement.agreement_details.last_payment_date,
// 											state:billingAgreement.state,
// 											type:'BILLING.SUBSCRIPTION.CANCELLED'
// 										}
// 										console.log('paypal.billingAgreement.get')
// 										console.log(billingAgreement)
// 										// recurringPayments(billing)
// 									}
// 								})
// 								)
// 							}
// 						}else if(res.event_type == 'PAYMENT.SALE.COMPLETED'){
// 							if(res.resource.state == 'completed'){
// 								agreement_id = res.resource.billing_agreement_id
// 								// console.log(agreement_id)
// 								paypal.billingAgreement.get(agreement_id,Meteor.bindEnvironment((error, billingAgreement) => {
// 									if (error) {
// 										throw error;
// 									} else {
// 										console.log("Get Billing Agreement")
// 										console.log(res.resource.amount.details)
// 										console.log(billingAgreement)
// 										billing = {
// 											id:agreement_id,
// 											start:billingAgreement.agreement_details.last_payment_date,
// 											end:billingAgreement.agreement_details.next_billing_date,
// 											state:billingAgreement.state,
// 											type:'PAYMENT.SALE.COMPLETED.completed',
// 											body:res
// 										}
// 										console.log(billingAgreement)
// 										// recurringPayments(billing)
// 									}
// 								})
// 								)
// 							}
// 						}
// 					}else{
// 						console.log("It was a failed verification")
// 					}
// 				}
// 			})
// 		)
// 		}
// 	})
// 	)
// })