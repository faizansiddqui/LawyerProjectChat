import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import Profile from './Profile'


const Navbar = () => {
  return (
    <div className="container">
    <div className='navbarContainer'>
        <div className="logoCon">
           <Link to='/'> Logo </Link> 
        </div>
        <div className="right">
        <div className="btnCon">
            <Link to='/login'> <button>Login</button> </Link>
            <Link to='/signup'> <button>Signup</button> </Link>
        </div>
        <div className="ProfileCon">
           <Profile />
        </div>
        </div>
    </div>
    </div>

  )
}

export default Navbar