import axios from "axios";

const TEAM_URL = "http://localhost:8001/team";

class TeamService {
  
    listTeamsByContestId(contestId) {
        return axios.get(TEAM_URL + "/listTeamsByContestId/contestId="+contestId, null);
      }

    updateStatus(teamId){
      return axios.put(TEAM_URL + `/updateStatus/teamId=${teamId}/status=CANCELED`, null)
    }
  
}

export default new TeamService();
