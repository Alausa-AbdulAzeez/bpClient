import { RxDashboard } from 'react-icons/rx'
import { React } from 'react'
import { MdPendingActions, MdSchedule } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { TbReportAnalytics } from 'react-icons/tb'

export const clientData = [
  {
    ulTitle: 'MAIN',
    listItems: [
      {
        title: 'Dashboard',
        link: '/',
        icon: <RxDashboard className='sidebarIcon' />,
      },
    ],
  },
  {
    ulTitle: 'LIST',
    listItems: [
      {
        title: 'Schedule Candidate',
        link: '/scheduleCandidate',
        icon: <MdSchedule className='sidebarIcon' />,
      },
      {
        title: 'Candidates',
        link: '/candidates',
        icon: <AiOutlineSearch className='sidebarIcon' />,
      },
      {
        title: 'Pending Candidates',
        link: '/pendingCandidates',
        icon: <MdPendingActions className='sidebarIcon' />,
      },
      {
        title: 'Reports',
        link: '/reports',
        icon: <TbReportAnalytics className='sidebarIcon' />,
      },
    ],
  },
]
