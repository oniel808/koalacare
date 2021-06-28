import { Meteor } from 'meteor/meteor'
export function roleInit(){
  staff=["HRAdmin","SocialWorker","Coordinator","TimeKeeper","Accounting",'Caregiver','Patient','Owner','Admin','SuperAdmin']
  staff.map((o,i)=>{
    if(!Meteor.roles.findOne({_id: o}))
      Roles.createRole(o)
  })
}