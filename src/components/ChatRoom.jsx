import React, { useEffect, useRef, useState } from 'react';
import './ChatRoom.css';
import userIcon from '../assets/images/userIcon.png';
import { IoCallSharp } from "react-icons/io5";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";
import { TiWeatherSunny } from "react-icons/ti";
import { IoMdAttach } from "react-icons/io";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useLocation } from 'react-router-dom';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure your Firebase is properly initialized here.

const ChatRoom = () => {
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const location = useLocation();
    const lawyerId = new URLSearchParams(location.search).get('lawyerId');
    const currentUser = "User"; // Change this to dynamically get the current logged-in user.
    const messageEndRef = useRef(null);

    // Handle viewport resizing for responsive design
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
    const phoneNumber = '+919838777149'; // Make this dynamic as well if needed.

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleClickCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    // Firebase message fetching and real-time updates
    useEffect(() => {
        const messageRef = collection(db, 'messages');
        const q = query(messageRef, orderBy('timestamp'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messageData = snapshot.docs
                .filter(doc => doc.data().lawyerId === lawyerId)
                .map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(messageData);
            scrollToBottom();
        });

        return () => unsubscribe();
    }, [lawyerId]);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSentMessage = async () => {
        if (messageInput.trim()) {
            const newMessage = {
                text: messageInput,
                timestamp: new Date(),
                sender: currentUser,
                lawyerId,
            };
            await addDoc(collection(db, 'messages'), newMessage);
            setMessageInput('');
        }
    };

    return (
        <div className='chatRoom' style={{ height: viewportHeight }}>
            <div className="AllClientChatShow">
                <div className="allClientChatShowTop">
                    <div className="chatup">
                        <span>Chats</span>
                        <TiWeatherSunny className='darkmode' />
                    </div>
                    <div className="searchLawyer">
                        <MdPersonSearch className='searchLawyerIcon' />
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

                <div className="messageArea">
                    {messages.map((message) => (
                        <div 
                            key={message.id}
                            className={`message ${message.sender === currentUser ? 'sent' : 'received'}`}
                        >
                            <span>{message.sender}: {message.text}</span>
                        </div>
                    ))}
                    <div ref={messageEndRef} />
                </div>

                <div className="inputChat">
                    <IoMdAttach onClick={handleFileClick} className='attachFileIcon' />
                    <input 
                        type="text" 
                        placeholder='Type Your Text Here' 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                    />
                    <button onClick={handleSentMessage}>
                        <RiSendPlane2Fill className='sendChatIcon' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;
