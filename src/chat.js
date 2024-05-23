import './chat.css';
import { React, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Chat = ({ seller, onclose }) => {
  const [messages, setMessages] = useState([{ text: "Hey there!", sender: "seller" }]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "buyer" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <button className="close-button" onClick={onclose}>X</button>
        <span>Chat with {seller.name}</span>
      </div>
      <div className="chat-body">
        <TransitionGroup>
          {messages.map((message, index) => (
            <CSSTransition key={index} timeout={500} classNames="message-animation">
              <div className={`message ${message.sender}`}>
                {message.text}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
