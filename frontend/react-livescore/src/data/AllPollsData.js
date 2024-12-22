import axios from "axios"


// ==========Poll questions data================
const poll_question_Alldata = async () => {


    try {
        const response = await axios.get('http://127.0.0.1:8000/polls/poll-question/')
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
        const response = await axios.get("http://127.0.0.1:8000/polls/votes-data/")
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
            const response= axios.post(`http://127.0.0.1:8000/polls/post-vote/${poll_id}/`,
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