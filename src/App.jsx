import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserProfile from './pages/UserProfile'
import ChatRoom from './components/ChatRoom'
import Location from './components/Location'
import Setting from './components/Setting'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/userprofile' element={<UserProfile />} />
            <Route path='/chatroom' element={<ChatRoom />} />
            <Route path='/location' element={<Location />} />
            <Route path='/setting' element={<Setting />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
