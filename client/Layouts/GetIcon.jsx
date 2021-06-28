import React from 'react'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import CloseIcon from '@material-ui/icons/Close'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import AssessmentIcon from '@material-ui/icons/Assessment'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import PeopleIcon from '@material-ui/icons/People'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import SaveIcon from '@material-ui/icons/Save'
import BackupIcon from '@material-ui/icons/Backup'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import AddIcon from '@material-ui/icons/Add'
import Send from '@material-ui/icons/Send'
import Search from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import EditIcon from '@material-ui/icons/Edit'
import RemoveIcon from '@material-ui/icons/Remove'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import SettingsIcon from '@material-ui/icons/Settings'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import AmpStoriesIcon from '@material-ui/icons/AmpStories'
import InfoIcon from '@material-ui/icons/Info'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import HomeIcon from '@material-ui/icons/Home'
// <GetIcon icon='MenuIcon' style={}>
export default function GetIcon(props){

	switch(props.icon){
		case 'DashboardIcon':
			return <DashboardIcon style={props.style} />
		case 'AssessmentIcon':
			return <AssessmentIcon style={props.style} />
		case 'AccessAlarmIcon':
			return <AccessAlarmIcon style={props.style} />
		case 'PeopleIcon':
			return <PeopleIcon style={props.style} />
		case 'ArrowForwardIosIcon':
			return <ArrowForwardIosIcon style={props.style} />
		case 'SaveIcon':
			return <SaveIcon style={props.style} />
		case 'BackupIcon':
			return <BackupIcon style={props.style} />
		case 'PhotoCamera':
			return <PhotoCamera style={props.style} />
		case 'AddIcon':
			return <AddIcon style={props.style} />
		case 'Send':
			return <Send style={props.style} />
		case 'Search':
			return <Search style={props.style} />
		case 'MenuIcon':
			return <MenuIcon style={props.style} />
		case 'EditIcon':
			return <EditIcon style={props.style} />
		case 'RemoveIcon':
			return <RemoveIcon style={props.style} />
		case 'ArrowForwardIcon':
			return <ArrowForwardIcon style={props.style} />
		case 'ExitToAppIcon':
			return <ExitToAppIcon style={props.style} />
		case 'ArrowDropDownIcon':
			return <ArrowDropDownIcon style={props.style} />
		case 'SettingsIcon':
			return <SettingsIcon style={props.style} />
		case 'NotificationsIcon':
			return <NotificationsIcon style={props.style} />
		case 'PersonAddIcon':
			return <PersonAddIcon style={props.style} />
		case 'AmpStoriesIcon':
			return <AmpStoriesIcon style={props.style} />
		case 'InfoIcon':
			return <InfoIcon style={props.style} />
		case 'MailIcon':
			return <MailIcon style={props.style} />
		case 'CloseIcon':
			return <CloseIcon style={props.style} />
		case 'LocationOnIcon':
			return <LocationOnIcon style={props.style} />
		case 'FacebookIcon':
			return <FacebookIcon style={props.style} />
		case 'InstagramIcon':
			return <InstagramIcon style={props.style} />
		case 'TwitterIcon':
			return <TwitterIcon style={props.style} />
		case 'HomeIcon':
			return <HomeIcon style={props.style} />
	}
}