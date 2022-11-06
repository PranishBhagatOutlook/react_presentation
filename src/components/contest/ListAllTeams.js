import React, { useState, useEffect } from "react";

import teamService from "../../service/team.service";
import TeamTable from "./Tables/TeamTable";

export default function ListAllTeams(props) {
  const [teams, setTeams] = useState([]);
  const [loaded, setLoaded] = useState("false");

  useEffect(() => {
    getTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedContest]);

  async function getTeams() {
    // eslint-disable-next-line no-unused-vars
    const teamData = await teamService
      .listTeamsByContestId(props.selectedContest.id)
      .then((res) => setTeams(res.data));
    setLoaded(true);
  }
  if (loaded)
    return (
      <div className="teamTable">
        <TeamTable teams={teams} selectedContest={props.selectedContest} />
      </div>
    );
}
