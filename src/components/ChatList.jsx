// /src/components/ChatList.jsx

import React from 'react';
import './ChatList.css';

const ChatList = ({ messages }) => {
    return (
        <div className="allClientChatShow">
            {messages.map((msg) => (
                <div key={msg.id} className="message">
                    <span><strong>{msg.senderName}:</strong> {msg.text}</span>
                    <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
