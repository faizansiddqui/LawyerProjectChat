import React, { useRef } from 'react'
import './ChatRoom.css'
import userIcon from '../assets/images/userIcon.png';
import { IoCallSharp } from "react-icons/io5";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { TiWeatherSunny } from "react-icons/ti";
import { IoMdAttach } from "react-icons/io";
import { RiSendPlane2Fill } from "react-icons/ri";

const ChatRoom = () => {

    const fileInputRef = useRef(null);
    const phoneNumber = '+919838717149';

    const handleFileClick = () => {
        fileInputRef.current.click();
    }
    const handleClickCall = ()=>{
        window.location.href = `tel:${phoneNumber}`;
    }

    return (
        <div className='chatRoom'>
            <div className="AllClientChatShow">
                <div className="allClientChatShowTop">
                    <div className="chatup">
                        <span>Chats</span>
                        <TiWeatherSunny className='darkmode' />
                    </div>
                    <div className="searchLawyer">
                        <FaSearch className='searchLawyerIcon' />
                        <input type="text" placeholder='Search Chat Lawyer' />
                    </div>
                </div>
            </div>

            <div className="chatContainer">
                <div className="chatClientShowProfile">
                    <div className="chatClinetProfileLeft">
                        <img src={userIcon} alt="" />
                        <div className="textData">
                            <span>Abbas Khatri</span>
                            <span> Last Seen Today 11:35 AM</span>
                        </div>
                    </div>
                    <div className="chatClinetProfileRight">
                        <IoCallSharp onClick={handleClickCall}/>
                        <IoEllipsisVertical />
                    </div>
                </div>
                <div className="inputChat">
                    <IoMdAttach onClick={handleFileClick} className='attachFileIcon' />
                    <input type="text" placeholder='Type Your Text Here' />
                    <input type="file"style={{ display: 'none' }} 
                        ref={fileInputRef}
                    />
                    <div>
                        <RiSendPlane2Fill className='sendChatIcon' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom