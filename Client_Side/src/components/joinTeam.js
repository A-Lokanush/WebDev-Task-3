import React,{useState} from 'react'
import Axios from "axios";

const JoinTeam = ({name,password,onReload,onJoin,onBack}) => {
    const [joinInfo,setJoinInfo] = useState("")
    //to register the new  team in database and 
    
    const addJoinTeam = (tn,td)=> {
      Axios.post("http://localhost:3002/teamlist",{
        username:name,
        password:password,
        teamname:tn,
        teamdes:td,
        teamid: joinInfo,
        userteamid:name+td,
      }).then((response)=> {
          console.log("victory")
      })
      onReload()
      onJoin()
    }
    const jointeam = () => {
          Axios.post("http://localhost:3002/jointeamlist",{
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
