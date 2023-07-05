/* eslint-disable react/prop-types */
import React from 'react'

import { Link } from 'react-router-dom'
import './dashboardCard.scss'

const DashboardCard = (props) => {
  const cardInfo = props.data

  return (
    // <div
    //   className='dashboardCardWrapper'
    //   style={{ backgroundColor: cardInfo.backgroundColor }}
    // >
    //   <p>{cardInfo.title}</p>
    //   {cardInfo.isMoney ? <h1>{props.userName} </h1> : <h1>{cardInfo.name}</h1>}
    //   <div className='cardBottom'>
    //     <Link to={cardInfo.link} className='cardBottomText'>
    //       {cardInfo.linkText}
    //     </Link>
    //     {cardInfo.icon}
    //   </div>
    // </div>
    <div
      className='dashboardCardWrapper'
      style={{ backgroundColor: cardInfo.backgroundColor }}
    >
      <p className='title'>{cardInfo.title}</p>

      <div className='imgWrapper'>
        {cardInfo.isProfile && <h1>{props.userName}</h1>}
        {cardInfo.isScheduleCandidate && (
          <img
            src='https://cdn4.iconfinder.com/data/icons/halloween-2476/64/calendar-time-event-day-schedule-halloween-128.png'
            alt='schedule'
            className='candidateSearch'
          />
        )}
        {cardInfo.isCandidateSearch && (
          <img
            src='https://cdn4.iconfinder.com/data/icons/general08/png/128/binoculars.png'
            alt='binoculars'
            className='candidateSearch'
          />
        )}
      </div>
      <div className='cardBottom'>
        <Link to={cardInfo.link} className='cardBottomText'>
          {cardInfo.linkText}
        </Link>
        {cardInfo.icon}
      </div>
    </div>
  )
}

export default DashboardCard
