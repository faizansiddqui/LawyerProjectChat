import React, { useEffect, useRef, useState } from 'react';
import './ChatRoom.css';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const location = useLocation();
    const lawyerId = new URLSearchParams(location.search).get('lawyerId');
    const currentUser = "User"; // Replace with actual user identification logic
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, orderBy('timestamp'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs
                .filter(doc => doc.data().lawyerId === lawyerId)
                .map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(messagesData);
            scrollToBottom(); // Scroll to bottom on new messages
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [lawyerId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        if (messageInput.trim()) {
            const newMessage = {
                text: messageInput,
                timestamp: new Date(),
                sender: currentUser,
                lawyerId,
            };

            await addDoc(collection(db, 'messages'), newMessage);
            setMessageInput(''); // Clear input after sending
        }
    };

    return (
        <div className="chatRoom">
            {/* Messages List */}
            <div className="messages">
                {messages.map((message) => (
                    <div 
                        key={message.id} 
                        className={`message ${message.sender === currentUser ? 'sent' : 'received'}`}
                    >
                        <span>{message.sender}: {message.text}</span>
                    </div>
                ))}
                {/* Reference to scroll to the bottom */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input to send message */}
            <div className="inputChat">
                <input 
                    type="text" 
                    placeholder="Type Your Text Here" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
