import axios from "axios"

const Chat_Group_Data =async (room)=>{

    const response=await axios.get(`http://127.0.0.1:8000/chat/messages-list/${room}/`)

    if (response.data){

        console.log("Messsage_data",response.data)
        return response.data;
    }

   
}

export default Chat_Group_Data;