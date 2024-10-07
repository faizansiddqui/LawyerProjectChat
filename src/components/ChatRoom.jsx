import React, { useEffect, useRef, useState } from 'react';
import './ChatRoom.css';
import userIcon from '../assets/images/userIcon.png';
import { IoCallSharp } from "react-icons/io5";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";
import { TiWeatherSunny } from "react-icons/ti";
import { IoMdAttach } from "react-icons/io";
import { RiSendPlane2Fill } from "react-icons/ri";

const ChatRoom = () => {

    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fileInputRef = useRef(null);
    const phoneNumber = '+919838777149';

    const handleFileClick = () => {
        fileInputRef.current.click();
    }
    
    const handleClickCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    }
    return (
            <div className='chatRoom' style={{ height: viewportHeight }}>
            <div className="AllClientChatShow">
                <div className="allClientChatShowTop">
                    <div className="chatup">
                        <span>Chats</span>
                        <TiWeatherSunny className='darkmode' />
                    </div>
                    <div className="searchLawyer">
                        <MdPersonSearch  className='searchLawyerIcon' />
                        <input type="text" placeholder='Search Chat Lawyer' />
                    </div>
                </div>
            </div>

            <div className="chatContainer">
                <div className="chatClientShowProfile">
                    <div className="chatClinetProfileLeft">
                        <img src={userIcon} alt="User Icon" />
                        <div className="textData">
                            <span>Abbas Khatri</span>
                            <span>Last Seen Today 11:35 AM</span>
                        </div>
                    </div>
                    <div className="chatClinetProfileRight">
                        <IoCallSharp className='callIcon' onClick={handleClickCall} />
                        <IoEllipsisVertical />
                    </div>
                </div>
                <div className="inputChat">
                    <IoMdAttach onClick={handleFileClick} className='attachFileIcon' />
                    <input type="text" placeholder='Type Your Text Here' />
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
                    <RiSendPlane2Fill className='sendChatIcon' />
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;