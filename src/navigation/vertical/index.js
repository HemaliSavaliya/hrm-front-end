// ** Icon imports
import { AccessIcon, AssignmentsIcon, Award01Icon, Calendar03Icon, CalendarLove02Icon, DashboardCircleEditIcon, DepartementIcon, DocumentValidationIcon, JobSearchIcon, MarketingIcon, MentoringIcon, Projector01Icon, UserIcon } from 'hugeicons-react'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: DashboardCircleEditIcon,
      path: '/'
    },
    {
      title: 'Role',
      icon: MentoringIcon,
      path: '/role'
    },
    {
      title: 'Departments',
      icon: DepartementIcon,
      path: '/departments'
    },
    {
      title: 'Employees',
      icon: UserIcon,
      path: '/employee'
    },
    {
      title: 'Projects',
      icon: Projector01Icon,
      path: '/projects'
    },
    {
      title: 'Permission',
      icon: AccessIcon,
      path: '/permission'
    },
    {
      title: 'Holidays',
      icon: CalendarLove02Icon,
      path: '/holiday'
    },
    {
      title: 'Attendance',
      icon: AssignmentsIcon,
      path: '/attendance'
    },
    {
      title: 'Leave Management',
      icon: DocumentValidationIcon,
      path: '/leave-management'
    },
    {
      title: 'Job',
      icon: JobSearchIcon,
      path: '/jobs'
    },
    {
      title: 'Calendar',
      icon: Calendar03Icon,
      path: '/calendar'
    },
    {
      title: 'Announcement',
      icon: MarketingIcon,
      path: '/announcement'
    },
    {
      title: 'Awards',
      icon: Award01Icon,
      path: '/awards'
    }
  ]
}

export default navigation
