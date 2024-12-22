import React from 'react'
import { Link } from 'react-router-dom'
import '../style/chat.css'

function Chat() {
  return (
    <div className='chat-group'>

      <ul>

        <Link to="/chat/Barca-group/">Visca Barca</Link>
        <Link to="/chat/RealMadrid-group/">Halla Madrid</Link>
        <Link to="/chat/liverpool-group/">Liverpool Fc</Link>
        <Link to ="/chat/Manchester-united/">Manchester United</Link>
        <Link to ="/chat/Manchester-city/">Manchester city</Link>

      </ul>
    </div>
  )
}

export default Chat