import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../assets/images/userIcon.png';
import './Profile.css';
import { MdMessage } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";

const Profile = () => {
    const [showProfile, setShowProfile] = useState(false);
    const popupRef = useRef(null);
    const profileMenuRef = useRef(null);

    // Toggle the profile popup
    const toggleProfile = useCallback(() => {
        setShowProfile(prev => !prev);
    }, []);

    // Handle click outside of the popup and profile menu
    const handleClickOutside = useCallback((e) => {
        if (popupRef.current && !popupRef.current.contains(e.target) &&
            profileMenuRef.current && !profileMenuRef.current.contains(e.target)
        ) {
            setShowProfile(false);
        }
    }, []);

    // Add/remove event listener for outside clicks
    useEffect(() => {
        if (showProfile) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        // Clean up when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfile, handleClickOutside]);



    return (
        <div className='profileLogoContainer'>
            {/* Profile Icon */}
            <div ref={popupRef} onClick={toggleProfile} className="profileLogo" role="button" tabIndex={0}>
                <img src={userIcon} alt="User profile icon" />
            </div>

            {/* Profile Dropdown Menu */}
            {showProfile && (
                <div ref={profileMenuRef} className="profileHoverShow show">
                    <div className="profileLogoCustom">
                        <div className="profileLogo showProfile">
                            <img src={userIcon} alt="User profile" />
                        </div>
                        <span className='username'>Faizan Siddiqui</span>
                        <Link to='/userprofile'><span className='viewProfile'>View Profile</span></Link>
                    </div>
                    <div className="UserDetailsCon">
                        <Link className='profileSetting'  to='/chatroom'> <span><MdMessage /> Message</span></Link>
                        <Link className='profileSetting' to='/location'> <span><CiLocationOn /> Location</span> </Link>
                        <Link className='profileSetting' to='/setting'> <span><IoIosSettings /> Settings</span> </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
