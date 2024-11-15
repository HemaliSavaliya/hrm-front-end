// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Account from 'mdi-material-ui/Account'
import Project from 'mdi-material-ui/Briefcase'
import Attendance from 'mdi-material-ui/Calendar'
import Leave from 'mdi-material-ui/Clipboard'
import Layers from 'mdi-material-ui/Layers'
import AppleKeyboardCommand from 'mdi-material-ui/AppleKeyboardCommand'
import Microphone from 'mdi-material-ui/Microphone'
import CalendarMonthOutline from 'mdi-material-ui/CalendarMonthOutline'
import TrophyAward from 'mdi-material-ui/TrophyAward'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import FormatListBulleted from 'mdi-material-ui/FormatListBulleted'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Employees',
      icon: Account,
      path: '/employee'
    },
    {
      title: 'Projects',
      icon: Project,
      path: '/projects'
    },
    {
      title: 'Role',
      icon: AccountCogOutline,
      path: '/role'
    },
    {
      title: 'Permission',
      icon: FormatListBulleted,
      path: '/permission'
    },
    {
      title: 'Holidays',
      icon: AccountCogOutline,
      path: '/holiday'
    },
    {
      title: 'Attendance',
      icon: Attendance,
      path: '/attendance'
    },
    {
      title: 'Leave Management',
      icon: Leave,
      path: '/leave-management'
    },
    {
      title: 'Departments',
      icon: Layers,
      path: '/departments'
    },
    {
      title: 'Job',
      icon: AppleKeyboardCommand,
      path: '/jobs'
    },
    {
      title: 'Calendar',
      icon: CalendarMonthOutline,
      path: '/calendar'
    },
    {
      title: 'Announcement',
      icon: Microphone,
      path: '/announcement'
    },
    {
      title: 'Awards',
      icon: TrophyAward,
      path: '/awards'
    }
  ]
}

export default navigation
