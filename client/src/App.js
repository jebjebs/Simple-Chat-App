import 'bootstrap/dist/css/bootstrap.css';
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
    <div className="Apppp">
      <div className="container">
        <div className="row d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <div className="col-11 col-sm-10 col-md-6 col-lg-4">
            {/* if showChat is false, let user login */}
            { !showChat ? (
                <div className="card">
                  <div className="card-body">
                    <h1 className="card-title text-center mb-4">Let's Chat!</h1>
                    <input
                      className="form-control form-control-lg mb-3"
                      type="text"
                      placeholder="Username"
                      onChange={(event) => {
                        setUsername(event.target.value); //set input as username of user
                      }}
                    />
                    <input
                      className="form-control form-control-lg mb-4"
                      type="text"
                      placeholder="Room Name"
                      onChange={(event) => {
                        setRoom(event.target.value); //set input as Room ID
                      }}
                      onKeyPress={(event) => {
                        event.key === "Enter" && joinRoom();
                      }}
                    />
                    <div className="d-grid">
                      <button className="btn btn-primary btn-lg fw-bold" onClick={joinRoom}>Join Room</button> { /* call joinRoom function when clicked*/ }
                    </div>
                  </div>
                </div>
            // else if showChat is true, display chat
            ) : (
              <Chat socket={socket} username={username} room={room} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
