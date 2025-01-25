import axios from "axios"


axios.defaults.baseURL = "http://127.0.0.1:8000";



// ==========Poll questions data================
const poll_question_Alldata = async () => {


    try {
        const response = await axios.get('/polls/poll-question/')
        const data = response.data
        return data;
    }
    catch (error) {

        console.log("Error in fetching poll questions", error);
    }
}

// ============Votes Data of choice=============
const Votes_Data = async () => {
    try {
        const response = await axios.get("/polls/votes-data/")
        const data = response.data
        return data;

    }
    catch (error) {
        console.log("erro in fetching  votes data", error)
    }
}



// =============Post data of poll  to vote (POST method)======
const Create_Votes_POll = (poll_id,choice) => {

    try {
        if (poll_id) {
            const response= axios.post(`/polls/post-vote/${poll_id}/`,
                {
                    choice:choice
                },
                {
                    auth:{
                        "username":"admin",
                        "password":"admin"
                    },
                }
            )
            return response;
        }
        else {
            throw console.log("Poll_id is not set")
        }

    }

    catch (error) {
        console.log("erro in craeting Votes for poll", error)
    }
}

export {poll_question_Alldata, Votes_Data, Create_Votes_POll }