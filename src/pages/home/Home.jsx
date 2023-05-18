/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import DashboardCard from '../../components/dashboardCard/DashboardCard'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'

import './home.scss'
import { clientDashboardData } from '../../utils/data/dashboardCardData'
import Homedatagrid from '../../components/homeDatagrid/Homedatagrid'

const Home = (props) => {
  // eslint-disable-next-line react/prop-types
  const loggedInUserRole = props.userDetails?.role

  let data = clientDashboardData
  // HANDLE CARD INFO
  // switch (loggedInUserRole && loggedInUserRole) {
  //   case 'receptionist':
  //     data = receptionistDashboardData

  //     break
  //   case 'phlebotomist':
  //     data = phlebotomistDashboardData

  //     break
  //   case 'labScientist':
  //     data = labScientistDashboardData

  //     break
  //   case 'qualityAssurance':
  //     data = qualityAssuranceDashboardData
  //     break
  //   case 'reportOfficer':
  //     data = reportOfficerDashboardData

  //     break

  //   default:
  //     break
  // }

  // UPDATES LOGGEDINUSER ROLE
  useEffect(() => {
    console.log(loggedInUserRole)
  }, [loggedInUserRole])

  return (
    <div className='homeWrapper'>
      <Sidebar loggedInUserRole={loggedInUserRole} />
      <div className='homepageRight'>
        <Topber userName={props.userDetails?.name} />
        <div className='homeMainWrapper'>
          <div className='homeMainTop'>
            {data.map((singleItem, index) => {
              return (
                <DashboardCard
                  type='manageClients'
                  data={singleItem}
                  key={index}
                  userName={props.userDetails?.name}
                />
              )
            })}
          </div>

          <div className='homeMainBottom'>
            <Homedatagrid />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
