import config from "../config/config";
import React,{useState} from 'react'
import Axios from "axios";

const JoinTeam = ({tokens,onReload,onJoin,onBack}) => {
    const [joinInfo,setJoinInfo] = useState("")
    //to register the new  team in database and 

    //random string generator for team id
    const makeId = () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;  
    }

    
    const addJoinTeam = (tn,td)=> {
      const userTeamID = makeId();
      Axios.post(config.url + config.port + "/team/teamlist",{
        accessToken:tokens.at,
        teamname:tn,
        teamdes:td,
        teamid: joinInfo,
        userteamid:userTeamID,
      }).then((response)=> {
          console.log("victory")
      })
      onReload()
      onJoin()
    }
    const jointeam = () => {
          Axios.post(config.url + config.port + "/team/jointeamlist",{
          teamid: joinInfo,
        }).then((response)=> {
          addJoinTeam(response.data.result[0].teamname,response.data.result[0].teamdes)
        })
        
      };
    //   var noKey = false;
    //   const registerCheck = () => {
    //   if(teamInfo.tname.length > 0){ noKey=true;}
    //   if(noKey){ registerTeam()}
    //}
    return (
        <div className="createTeam3">
            <div className="pollheaderdiv"><span className="backing" onClick={onBack}>Back</span><span className="pollHeader">Join Team</span></div>
            <div className="entries3">
                <label className="teamlabel3">Join Team with Code</label>
                <input className="teamInput3" type="text" placeholder="Enter the code..." onChange={e => setJoinInfo(e.target.value)} value={joinInfo}/>
                <input className="btnCreateTeams3" type="submit" value="Join" onClick={jointeam}/>
            </div>
        </div>
    )
}

export default JoinTeam
