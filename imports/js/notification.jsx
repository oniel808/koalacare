// notification({_id:id,type:'add',notif:notify})
//  {
//    _id:Random.id(),
//    typeOfNotification:'subscription',
//    alertTitle:'Subscription Inactive',
//    alertBody:"to continue our services, please pay your (monthly,annual) Plan with the amount of (price)",
//    read:false,
//    link:'/Dashboard/preferences',
//    priority: // 1 important, 2 info, 3 warning, 4 error,
//    category: // hr, social, admin,
//  }
export default function notification(arr){
  if(arr.type == 'add'){
    Meteor.users.update(arr._id,{$addToSet:{'profile.notification':arr.notif}})
  }
}