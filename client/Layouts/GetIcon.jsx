import React from 'react'

import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import CloseIcon from '@mui/icons-material/Close'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import AssessmentIcon from '@mui/icons-material/Assessment'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import PeopleIcon from '@mui/icons-material/People'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import SaveIcon from '@mui/icons-material/Save'
import BackupIcon from '@mui/icons-material/Backup'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import AddIcon from '@mui/icons-material/Add'
import Send from '@mui/icons-material/Send'
import Search from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import EditIcon from '@mui/icons-material/Edit'
import RemoveIcon from '@mui/icons-material/Remove'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import InfoIcon from '@mui/icons-material/Info'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import HomeIcon from '@mui/icons-material/Home'
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