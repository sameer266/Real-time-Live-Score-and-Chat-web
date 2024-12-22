import React, { useState, useEffect } from "react";
import "../style/polls.css";
import Slidebar from "../components/Slidebar";  // Import Sidebar component

// Get Polls qns data
import { poll_question_Alldata, Create_Votes_POll } from '../data/AllPollsData';

// Alert Box
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Poll = () => {
  const notify = (msg) => toast.success(msg);

  const [questions, setQuestions] = useState([]);
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch poll questions from Django backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await poll_question_Alldata();
        console.log(response);
        setQuestions(response.questions);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch polls.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Handle vote submission
  const handleVote = (pollId, choice) => {
    try {
      Create_Votes_POll(pollId, choice);

      // Update local vote counts
      setVotes((prevVotes) => ({
        ...prevVotes,
        [pollId]: choice,
      }));

      notify("Vote Success");
    } catch (error) {
      console.error("Failed to submit vote:", error);
      alert("Failed to submit vote.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Slidebar /> {/* Sidebar on the left */}

      <div style={{ marginLeft: "250px", width: "100%" }}>
        <ToastContainer autoClose={2000} theme="dark" transition={Zoom} />

        {loading ? (
          <p>Loading polls...</p>
        ) : error ? (
          <p className="text-red-700 text-center">{error}</p>
        ) : questions.length > 0 ? (
          questions.map((question) => (
            <div className="poll-container" key={question.id}>
              <h3>{question.question}</h3>

              {/* Team A */}
              <div
                className="poll-option"
                onClick={() => handleVote(question.id, "team_A")}
              >
                <div
                  className="poll-bar"
                  style={{
                    width: `50%`, // Placeholder: Replace with real vote percentage from backend
                    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                  }}
                >
                  {votes[question.id] === "team_A" && "Voted"}
                </div>
                <span className="team-name">{question.team_A.name}</span>
              </div>

              {/* Team B */}
              <div
                className="poll-option"
                onClick={() => handleVote(question.id, "team_B")}
              >
                <div
                  className="poll-bar"
                  style={{
                    width: `50%`, // Placeholder: Replace with real vote percentage from backend
                    background: "linear-gradient(to right, #6a11cb, #2575fc)",
                  }}
                >
                  {votes[question.id] === "team_B" && "Voted"}
                </div>
                <span className="team-name">{question.team_B.name}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-700 text-center">No Polls Available</p>
        )}
      </div>
    </div>
  );
};

export default Poll;
