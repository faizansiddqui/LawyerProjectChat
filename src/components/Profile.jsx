import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../assets/images/userIcon.png';
import './Profile.css';
import { MdMessage } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";

const Profile = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState('');
  const profileRef = useRef();

  // Handle click on profile icon
  const handleClick = () => {
    setShowProfile((prev) => !prev);
  };

  // Handle clicks outside the dropdown
  const handleClickOutside = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'));
    const loggedInUser = localStorage.getItem('loggedInUserEmail');

    if (loggedInUser && users) {
      const user = users.find((allUser) => allUser.email === loggedInUser);
      if (user) {
        setUserName(user.userName);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='profileLogoContainer'>
      {/* Profile Icon */}
      <div onClick={handleClick} className="profileLogo" role="button">
        <img src={userIcon} alt="User profile icon" />
      </div>

      {/* Profile Dropdown Menu */}
      {showProfile && (
        <div ref={profileRef} className="profileHoverShow show">
          <div className="profileLogoCustom">
            <div className="profileLogo showProfile">
              <img src={userIcon} alt="User profile" />
            </div>
            <span className='username'>{userName}</span>
            <Link to='viewProfile'><span className='viewProfile'> View Profile </span></Link>
          </div>
          <div className="UserDetailsCon">
            <Link to='/chatroom' className='profileSetting'> <span><MdMessage /> Message</span></Link>
            <Link className='profileSetting' to='/location'> <span><CiLocationOn /> Location</span> </Link>
            <Link className='profileSetting' to='/setting'> <span><IoIosSettings /> Settings</span> </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
