import axios from "axios"


//=============Login==============
const LoginAuth = async (username, password) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login/",
        { username, password },
        { withCredentials: true } // Sends and receives cookies
      );
      console.log("Login Response:", response.data);
      return response.data; // Return meaningful data to the caller
    } catch (error) {
      console.error("Error in Login:", error.response ? error.response.data : error.message);
      return false;
    }
  };
  
// ===========Signup===============

const SignupAuth= async (username,email,password)=>{

    try{

        const response= await axios.post('http://127.0.0.1:8000/signup/',
            {
                "username":username,
                "email":email,
                "password":password
            }
        )
        return response.data;

    }
    catch(error){
        console.log("Error in SignUp",error);


    }
}

// ================Logout=================

const LogoutAuth=async (username)=>{
    try{

    const response= await axios.post('http://127.0.0.1:8000/logout/',
        {
            "username":username
        },
        {
            withCredentials:true
        }

    );
    return response
}
    catch(error){
        console.log("error in Logout",error)
        return false

    }
    
}

export {LoginAuth,LogoutAuth,SignupAuth};