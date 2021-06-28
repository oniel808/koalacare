import { Meteor } from 'meteor/meteor';
import React from 'react';

export default function(){
	const items=[]
	if(Roles.userIsInRole(Meteor.userId(), ['Admin','SuperAdmin'],'CareLocation'))
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
	else if(Roles.userIsInRole(Meteor.userId(),'Caregiver'))
		items.push({
				MenuName:'Dashboard',
				Moremenu:false,
				iconTagName:'DashboardIcon',
				href:'/Dashboard'
			},{
				MenuName:'Health Care Agency',
				Moremenu:false,
				iconTagName:'DashboardIcon',
				href:'/Dashboard/HealthCareAgency'
			},{
				MenuName:'Friends',
				Moremenu:false,
				iconTagName:'DashboardIcon',
				href:'/Dashboard/Friends'
			},{
				MenuName:'Patients',
				Moremenu:false,
				iconTagName:'DashboardIcon',
				href:'/Dashboard/Patient'
			},{
				MenuName:'Statistics',
				Moremenu:false,
				iconTagName:'DashboardIcon',
				href:'/Dashboard/Statistics'
			},{
				MenuName:'Divider',
			},{
				MenuName:'Logout',
				Moremenu:false,
				iconTagName:'AccessAlarmIcon',
				href:'',
			}
		)
	else if(Roles.userIsInRole(Meteor.userId(),'Owner'))
		items.push({
				MenuName:'Dashboard',
				Moremenu:true,
				iconTagName:'DashboardIcon',
				href:'/Dashboard',
				subMenu:[
					{
						MenuName:'Statistics',
						iconTagName:'AssessmentIcon',
						href:'#statistics'
					}
				]},
				{
				MenuName:'Staff',
				Moremenu:true,
				iconTagName:'DashboardIcon',
				href:'#',
				subMenu:[
					{
						MenuName:'Register Staff',
						iconTagName:'AssessmentIcon',
						href:'/Register/Staff'
					},
					{
						MenuName:'Staff List',
						iconTagName:'AssessmentIcon',
						href:'/Staff/List'
					}
				]},
				{
					MenuName:'Caregivers',
					Moremenu:true,
					iconTagName:'AccessAlarmIcon',
					href:'',
					subMenu:[
						{
							MenuName:'Add Caregiver',
							iconTagName:'AssessmentIcon',
							href:'/Register/Caregiver'
						},
						{
							MenuName:'Caregiver List',
							iconTagName:'AssessmentIcon',
							href:'/Caregiver/List'
						},
						{
							MenuName:'Monitor Caregivers',
							iconTagName:'AssessmentIcon',
							href:'/Caregiver/TimeSheet'
						},
						{
							MenuName:'Archived Caregiver',
							iconTagName:'AssessmentIcon',
							href:'/Caregiver/Archives'
						},
					]
				},{
					MenuName:'Human Resource',
					Moremenu:true,
					iconTagName:'AccessAlarmIcon',
					href:'',
					subMenu:[
						{
							MenuName:'Applicants',
							iconTagName:'AssessmentIcon',
							href:'/Applicants/List'
						},
						{
							MenuName:'Post Applicants',
							iconTagName:'AssessmentIcon',
							href:'/Applicants/PostApplicant'
						},
						{
							MenuName:'Archived Applicants',
							iconTagName:'AssessmentIcon',
							href:'/Applicants/Archives'
						},
					]
				},{
					MenuName:'Patients',
					Moremenu:true,
					iconTagName:'AccessAlarmIcon',
					href:'',
					subMenu:[
						{
							MenuName:'Patient',
							iconTagName:'AssessmentIcon',
							href:'/Patient/List'
						},
						{
							MenuName:'Add Patient',
							iconTagName:'AssessmentIcon',
							href:'/Register/Patient'
						},
						{
							MenuName:'Scheduling Caregivers',
							iconTagName:'AssessmentIcon',
							href:'/Patient/SchedulingCaregivers'
						},
						{
							MenuName:'Scheduling Patient',
							iconTagName:'AssessmentIcon',
							href:'/Patient/SchedulingPatient'
						},
					]
				},{
					MenuName:'Divider',
				},{
					MenuName:'Billing',
					Moremenu:true,
					iconTagName:'AccessAlarmIcon',
					href:'/Billing',
					subMenu:[
						{
							MenuName:'Patient',
							iconTagName:'AssessmentIcon',
							href:'/Billing'
						},
						{
							MenuName:'Receipts',
							iconTagName:'AssessmentIcon',
							href:'/Billing/Receipts'
						},
					]
				},{
					MenuName:'Divider',
				},{
					MenuName:'Feedback',
					Moremenu:false,
					iconTagName:'AccessAlarmIcon',
					href:'',
				}
			)
	return items
}

