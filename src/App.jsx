import { React, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/login/Login'
import './app.scss'
import Home from './pages/home/Home'
import CandidateSearch from './pages/candidateSearch/CandidateSearch'
import PendingCandidates from './pages/pendingCandidates/PendingCandidates'
import ViewClients from './pages/viewClients/ViewClients'
import Reports from './pages/reports/Reports'
import ScheduleCandidate from './pages/scheduleCandidate/ScheduleCandidate'
import ResetPassword from './pages/resetPassword/ResetPassword'
import ForgotPassword from './pages/forgotPassword/ForgotPassword'
import ChangePassword from './pages/changePassword/ChangePassword'
import PrivateRoutes from './components/PrivateRoutes'
import DownloadReportPage from './pages/downloadReport/DownloadReportPage'
import Profile from './pages/profile/Profile'

function App() {
  // let userDetails
  // const user = sessionStorage.getItem('user')
  // const [user, setUser] = useState(sessionStorage.getItem('user'))

  // FUNCTION FOR SETTING USER DETAILS
  // switch (user?.email) {
  //   case 'e@gmail.com':
  //     userDetails = { name: 'Esther', role: 'receptionist' }
  //     break
  //   case 'o@gmail.com':
  //     userDetails = { name: 'Olamide', role: 'phlebotomist' }
  //     console.log('Olamide')
  //     break
  //   case 'ada@gmail.com':
  //     userDetails = { name: 'Ada', role: 'labScientist' }
  //     break
  //   case 'ade@gmail.com':
  //     userDetails = { name: 'Adetola', role: 'reportOfficer' }
  //     break
  //   case 'b@gmail.com':
  //     userDetails = { name: 'Bankole', role: 'qualityAssurance' }
  //     break

  //   case 'client@gmail.com':
  //     userDetails = { name: 'Unity Bank', role: 'qualityAssurance' }
  //     break

  //   default:
  //     break
  // }

  // END OF FUNCTION FOR SETTING USER DETAILS

  return (
    <div className='appWrapper'>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path='/' element={<Home />} />
            <Route path='/candidates' element={<CandidateSearch />} />
            <Route path='/scheduleCandidate' element={<ScheduleCandidate />} />
            {/* <Route path='/pendingCandidates' element={<PendingCandidates />} /> */}
            <Route path='/viewClients' element={<ViewClients />} />
            <Route path='/reports' element={<Reports />} />
            <Route
              path='/labReport/:candidate'
              element={<DownloadReportPage />}
            />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route exact path='/login' element={<Register />} />
          <Route path='/getToken' element={<ForgotPassword />} />
          <Route path='/forgotPassword' element={<ResetPassword />} />
          <Route path='/changePassword' element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
