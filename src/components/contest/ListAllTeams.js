import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import teamService from "../../service/team.service";

export default function ListAllTeams(props) {
  const [loaded, setLoaded] = useState(false);
  const [teams, setTeams] = useState([]);

  function updateStatus(teamId) {
    teamService.updateStatus(teamId);
  }

  useEffect(() => {
    getTeams();
  }, []);

  async function getTeams() {
    const teamData = await teamService
      .listTeamsByContestId(props.selectedContest.id)
      .then((res) => setTeams(res.data));
    setLoaded(true);
  }

  useEffect(() => {
    getTeams();
  }, []);
  
  return (
    <div>
      <div>
        <h3>The list of teams in contest: {props.selectedContest.name} </h3>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>TeamID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team) => (
              <TableRow
                key={team.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{team.id}</TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.rank}</TableCell>
                <TableCell>{team.state}</TableCell>
                <TableCell>
                  {team.state === "PENDING" && (
                    <button onClick={() => updateStatus(team.id)}>
                      Update Status to Canceled
                    </button>
                  )}
                  {team.state === "CANCELED" && (
                    <h4> Cannot perform any action</h4>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
