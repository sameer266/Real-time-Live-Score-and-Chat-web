import axios from "axios"

// ===========Get all matches data==============

const Get_Match_ALldata=async ()=>{
    
    try{
    const response=await axios.get('http://127.0.0.1:8000/matches/all-matches/')
    const data=response.data
    return data    


    }
    catch(error){
        console.log("error in fetching matches",error);

    }
}



// ==============Get all live matches data===========
const  Get_Live_matches=async ()=>{


    try{
    const response=await axios.get('http://127.0.0.1:8000/matches/live-matches/')
    const data=response.data
    return data
}

catch(error){
    console.log("Error in fetching live matches",error)
}
}


// ==============Get all Upcoming matches data=============

const Get_Upcomming_matches= async ()=>{

    try{
        const response=await axios.get('http://127.0.0.1:8000/matches/upcomming-matches/')
        const data=response.data
        return data;

    }

    catch(error){
        console.log("error in fetching upcoming matches");

    }
}



export {Get_Live_matches,Get_Match_ALldata,Get_Upcomming_matches}