import { React } from 'react'
import { MdPendingActions, MdSchedule } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'

export const clientDashboardData = [
  {
    title: 'Schedule Candidate',
    isMoney: false,
    link: 'scheduleCandidate',
    linkText: 'Schedule Candidate',
    backgroundColor: '#33a23e24',
    name: '2',
    icon: (
      <MdSchedule
        className='icon'
        style={{ color: '#33A23E', backgroundColor: '#33A23E36' }}
      />
    ),
  },
  {
    title: 'Candidate Search',
    isMoney: false,
    link: 'candidateSearch',
    linkText: 'See all laboratories',
    backgroundColor: '#ece8ff7b',
    name: '50',
    icon: (
      <AiOutlineSearch
        className='icon'
        style={{ color: '#7451f8', backgroundColor: '#e1dbfd' }}
      />
    ),
  },
  {
    title: 'Pending Candidates',
    isMoney: false,
    link: 'pendingCandidates',
    linkText: 'View pending candidates',
    backgroundColor: '#33a23e24',
    name: '5',

    icon: (
      <MdPendingActions
        className='icon'
        style={{ color: '#33A23E', backgroundColor: '#33A23E36' }}
      />
    ),
  },

  {
    title: 'Profile',
    isMoney: true,
    link: '/profile',
    linkText: 'View profile',
    backgroundColor: '#3971ff24',
    name: 'Unity Bank',

    icon: (
      <BsFillPersonFill
        className='icon'
        style={{ color: '#3970FF', backgroundColor: '#3970FF36' }}
      />
    ),
  },
]
