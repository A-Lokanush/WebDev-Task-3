import React,{useState} from 'react'
import config from "../config/config";
import Axios from "axios";

const CreateTeam = ({tokens,onCreate,onReload}) => {

    const [teamInfo,setTeamInfo] = useState({tname:"",tdescription:"",teamid:""})
    //to register the new  team in database and 
    
    const registerTeam = () => {
          const letters = "AaB&*()_+=-?/b1/=CcDd=2/E=eFfGZz!@#$%g0H3hIi/4l=MmN7nOo/PpQqRr=/6S8s=TtU9uV/vWwX=xY/y^?"
          let TeamID = "";
          for (let i = 0; i < 49; i++) {
            TeamID += letters[Math.floor(Math.random() *86)];
          }
          const makeId = () => {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 10; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;  
          } 
          const userTeamId = makeId();
          Axios.post(config.url + config.port + "/team/teamlist",{
          accessToken: tokens.at,
          teamname: teamInfo.tname,
          teamdes:  teamInfo.tdescription,
          teamid: TeamID,
          admin:"Admin",
          userteamid:userTeamId,
        }).then((response)=> {
          
          console.log(response)
        })
        setTeamInfo({tname:"",tdescription:"",})
        onReload()
        onCreate()
      };
      var noKey = false;
      const registerCheck = () => {
      if(teamInfo.tname.length > 0){ noKey=true;}
      if(noKey){ registerTeam()}
    }
    return (
        <div className="createTeam">
            <div className="pollheaderdiv"><span className="backing" onClick={onCreate}>Back</span><span className="pollHeader">Create New Team</span></div>
            <div className="entries">
                <label className="teamlabel">Team Name</label>
                <input className="teamInput" type="text" placeholder="Enter Team Name" onChange={e => setTeamInfo({...teamInfo,tname:e.target.value})} value={teamInfo.tname}/>
                <label className="teamlabel">Team Description</label>
                <input className="teamInput teamDes" type="paragraph" placeholder="Enter Team Description" onChange={e => setTeamInfo({...teamInfo,tdescription:e.target.value})} value={teamInfo.tdescription}/>
                {/* <label className="teamlabel">Team Id</label> */}
                {/* <input className="teamInput" type="text" placeholder="Enter Team Id" onChange={e => setTeamInfo({...teamInfo,teamid:e.target.value})} value={teamInfo.teamid}/> */}
                <input className="btnCreateTeams" type="submit" value="Create" onClick={registerCheck}/>
            </div>
        </div>
    )
}

export default CreateTeam
