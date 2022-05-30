import React, { useState, useEffect } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async() => {
        if (currentMessage !== "") {
            // store message data if message is not empty
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: 
                    new Date(Date.now()).getHours() + 
                    ":" + 
                    new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        };
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            // append new message to previous messages
            setMessageList((list) => [...list, data]); 
        });
    }, [socket]);

    
    return (
        <div className="card chat-window">
            <div className="card-header bg-primary">
                <h4 className="text-light mt-1">{room}</h4>
            </div>
            <div className="card-body pt-4 overflow-auto chat">
                    {messageList.map((messageContent) => {
                        return (
                            <div className="row">
                                <div className={username === messageContent.author ? "col-12 d-flex align-items-end flex-column" : "col-12"}>
                                    <div className={username === messageContent.author ? "message-content user-message" : "message-content"}>
                                        <p>{messageContent.message}</p>
                                    </div>

                                    {/* Displays the message data (time and author) */}
                                    <div className="message-meta mx-2 mb-2">
                                        <span className="small text-muted">{messageContent.time}</span>
                                        {/* Show username only if user is not the sender of message */}
                                        {username !== messageContent.author && 
                                            <span className="small fw-bold ms-1">{messageContent.author}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="card-footer">
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control"
                        value={currentMessage} 
                        placeholder="Send a message..."
                        onChange={(event) => { 
                            setCurrentMessage(event.target.value);
                        }} 
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <button 
                        className="btn btn-outline-secondary" 
                        type="button" 
                        onClick={sendMessage}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;