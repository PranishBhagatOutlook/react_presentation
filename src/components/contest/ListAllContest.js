import React, { useState, useEffect } from "react";
import ContestService from "../../service/contest.service";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ListAllTeams from "./ListAllTeams";

export default function ListAllContest() {
  const [loaded, setLoaded] = useState(false);
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState();
  const [showTeamList, setShowTeamList] = useState(false);

  const getContests = async (props) => {
    const { data } = await ContestService.listContest();
    // console.log(props);
    setContests(data);
    setLoaded(true);
  };
  useEffect(() => {
    getContests();
  }, []);


  function displayTeam(contest){

    setShowTeamList(true)
    setSelectedContest(contest)

  }
  function hideTeams() {
    setShowTeamList(false);
  }

  if (loaded)
    return (
      <div>
        <h3>You can list all the teams here</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <h3> Contest List</h3>
              <TableRow>
                <TableCell>ContestID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Registration Allowed</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contests.map((contest) => (
                <TableRow
                  key={contest.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{contest.id}</TableCell>
                  <TableCell>{contest.name}</TableCell>
                  <TableCell>{contest.capacity}</TableCell>
                  <TableCell>{String(contest.registration_allowed)}</TableCell>
                  <TableCell>
                    {!showTeamList && <div>
                      <button onClick={() => displayTeam(contest)}>
                        Show team list
                      </button>
                    </div>}
                    {showTeamList && <div>
                      <button onClick={() => hideTeams()}>
                        Hide team list
                      </button>
                    </div>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          
        </div>

        {showTeamList && (
          <div>
            <ListAllTeams 
            selectedContest={selectedContest} 
            />
          </div>
        )}
        
      </div>
    );
}
