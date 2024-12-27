import React from 'react'
import { Link } from 'react-router-dom'

// icon
import { MdGroups2 } from "react-icons/md";
// css
import '../style/chat.css';

function Chat() {
  return (
    <div className='chat-group'>

      <ul>

        <Link to="/chat/Barca-group/">Visca Barca <MdGroups2 /> </Link>
        <Link to="/chat/RealMadrid-group/">Halla Madrid  <MdGroups2 /></Link>
        <Link to="/chat/liverpool-group/">Liverpool Fc <MdGroups2 /></Link>
        <Link to ="/chat/Manchester-united/">Manchester United <MdGroups2 /></Link>
        <Link to ="/chat/Manchester-city/">Manchester city <MdGroups2 /></Link>

      </ul>
    </div>
  )
}

export default Chat