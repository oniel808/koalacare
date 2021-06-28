//Databases
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
exports.applicantsCollecton = new Mongo.Collection('Applicants')
exports.DailyTimeRecord = new Mongo.Collection('DailyTimeRecord')
exports.PayrollRecord = new Mongo.Collection('PayrollRecord')
exports.personalGeolocation = new Mongo.Collection('Geolocation')
exports.tempGeolocation = new Mongo.Collection('tempGeolocation')
exports.Payments = new Mongo.Collection('Payments')
exports.clientStat = new Mongo.Collection('Statistics')
exports.Social = new Mongo.Collection('Social')
exports.HealthCareAgency = new Mongo.Collection('HealthCareAgency')
exports.ServicePlans = new Mongo.Collection('ServicePlans')
