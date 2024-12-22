import React, { useEffect, useState } from "react";
import { Get_Match_ALldata } from "../../data/AllMatchesData";
import "../../style/allmatches.css";

function Allmatches() {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("all"); // To filter live, upcoming, and finished matches

  //========= Fetch match data==============
  useEffect(() => {
    const matchesData = async () => {
      const data = await Get_Match_ALldata();
      setMatches(data.matches_data);
    };
    matchesData();
  }, []);

  // ======Filter matches based on selected status ======
  const filteredMatches = matches.filter((match) =>
    filter === "all" ? true : match.status === filter
  );

  return (
    <div className="container">
      {/* Title */}
      <h1 className="title">All Matches</h1>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["all", "upcoming", "live", "finished"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`filter-button ${filter === category ? "active" : ""}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div className="matches-grid">
        {filteredMatches.map((match) => (
          <div key={match.id} className="match-card">
            {/* Tournament Name */}
            <h2 className="tournament-name">{match.tournament.name}</h2>

            {/* Teams */}
            <div className="teams">
              <span className="team-name">{match.home_team.name}</span>
              <span className="team-name">vs</span>
              <span className="team-name">{match.away_team.name}</span>
            </div>

            {/* Scores */}
            <div className="teams">
              <span>
                {match.home_score} - {match.away_score}
              </span>
            </div>

            {/* Match Status */}
            <div className={`match-status ${match.status}`}>
              {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
            </div>

            {/* Start Time */}
            <p className="start-time">
              Start Time: {new Date(match.start_time).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Allmatches;
