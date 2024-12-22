import { Routes,Route } from "react-router-dom";



import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Poll from "./pages/Polls";
import LiveMatch from "./pages/matches/LiveMatch";
import UpcommingMatch from "./pages/matches/UpcommingMatch";
import FinishedMatch from "./pages/matches/FinishedMatch";
import Allmatches from "./pages/matches/Allmatches";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";



function App(){

  
  return(
  <>
  <Navbar/>

  <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/polls/" element={<Poll/>}/>
    <Route path="/matches/" element={<Allmatches/>}/>
    <Route path="/matches/live/" element={<LiveMatch/>} />
    <Route path="/matches/upcoming" element={<UpcommingMatch/>}/>
    <Route path="/matches/finished/" element={<FinishedMatch/>}/>


    <Route path="/signup/" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard"  element={<Dashboard/>}/>

    <Route path="/chat/" element={<Chat/>} />
    <Route path="/chat/:room" element={<ChatRoom/>}/>    

   

  



    
  </Routes>
  <Footer/>





  </>
  );


}
 export default App