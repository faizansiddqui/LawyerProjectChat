import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import ChatRoom from './components/ChatRoom'
import Location from './components/Location'
import Setting from './components/Setting'
import AddData from './pages/adminPanel/page/AddData'
import LawyerProfile from './components/LawyerProfile'
import LawyerProfileStructure from './pages/lawyerProfileStructure/LawyerProfileStructure'
import LawyerFeelds from './components/lawyerFeeld/LawyerFeelds'
import UserProfile from './components/profile/UserProfile'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/viewProfile' element={<UserProfile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/lawyerfeelds' element={<LawyerFeelds />} />
          <Route path='/chatroom' element={<ChatRoom />} />
          <Route path='/location' element={<Location />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/adddata' element={<AddData />} />
          <Route path='lawyerprofile' element={<LawyerProfile />} />
          <Route path='/lawyerprofile/:lawyerId' element={<LawyerProfileStructure />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
