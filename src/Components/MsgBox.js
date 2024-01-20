import React from "react";
import axios from "axios";
import { BASE_URL } from "../myEnv";

function MsgBox({ setMsgs, currFriend, socket, isLive, sessionToken }) {
  const [text, setText] = React.useState("")

  function handleSendMsg(event) {
    event?.preventDefault();
    if (!text) return;
    setMsgs(oldVal => [...oldVal, {
      author: 'me',
      timestamp: 1,
      text: text
    }])

    const dataToPost = {
      friend: currFriend,
      text: text
    }
    if (isLive.current) {
      socket.current.emit('send-msg', dataToPost);
    }
    else {
      axios.post(BASE_URL + "/exchMsg", dataToPost, {
        headers: {
          Authorization: 'Bearer ' + sessionToken
        }
      })
    }
    setText('')
    return;
  }

  return (
    <div className="msg-outer-container">
      <form onSubmit={handleSendMsg} className="msg-form">
        <input
          id="someInput"
          className="msg-input"
          placeholder="Type your message here"
          type="text"
          value={text}
          onChange={(event) => { setText(event.target.value) }}
        />
        <div onClick={handleSendMsg} className="send-button">
          <div className="send-button-bar-1"></div>
          <div className="send-button-bar-2"></div>
        </div>
      </form>
    </div>
  )
}

export default MsgBox
