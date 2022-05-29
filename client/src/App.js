import './App.css';
import io from 'socket.io-client';
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if (username !== "" && room !== "") { // checks if username or room is not empty
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {/* if showChat is false, let user login */}
      { !showChat ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value); //set input as username of user
            }}
          />
          <input
            type="text"
            placeholder="Room Name..."
            onChange={(event) => {
              setRoom(event.target.value); //set input as Room ID
            }}
          />
          <button className="btn btn-primary" onClick={joinRoom}>Join a Room</button> { /* call joinRoom function when clicked*/ }
        </div>
      // else if showChat is true, display chat
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
