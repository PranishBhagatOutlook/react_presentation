import React, { useState, useEffect } from "react";
import ContestService from "../../service/contest.service";
import ListAllTeams from "./ListAllTeams";
import ContestTable from "./Tables/ContestTable";

export default function ListAllContest() {
  const [loaded, setLoaded] = useState(false);
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState("");
  const [showTable, setShowTable] = useState(false);

  const getContests = async (props) => {
    const { data } = await ContestService.listContest();
    setContests(data);
    setLoaded(true);
  };

  useEffect(() => {
    getContests();
  }, []);

  function displayTeam(contest) {
    setSelectedContest(contest);
    setShowTable(true);
  }

  if (loaded)
    return (
      <div className="contestTable">
        <ContestTable contests={contests} displayTeam={displayTeam} />
        <div className="displayTeams">
          {showTable && (
            <div className="listAllTeams">
              <ListAllTeams selectedContest={selectedContest} />
            </div>
          )}
        </div>
      </div>
    );
}
