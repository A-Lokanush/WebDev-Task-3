import config from "../config/config";
import React,{useState} from 'react'
import Axios from "axios";

import "./styling/styles.css"
import Navbar from "./navbar"
import Content from "./contentPart"

const Main = ({onLogout,tokens}) => {

    const [createTeam,setCreateTeam]=useState(true);
    const [joinTeam,setJoinTeam]=useState(true);
    const [teamNameList,setTeamNameList]=useState(['']);
    const [disTeam,setdisTeam]=useState(true);
    const [pollList,setPollList]=useState(['']);
    const [TN,setTtname]=useState("");
    const [TD,setTdes]=useState("");
    const [TID,setID]=useState("");
    const [admin,setAdmin]=useState("");
    
    const reload = () => {
        Axios.post(config.url + config.port + "/team/myteams",{
        accessToken: tokens.at,
      }).then((response) => {
        if(response.message !== "No Token Provided" || response.message !== "Invalid Token")
          setTeamNameList(response.data.result);
          console.log("Inside axios onReload",response,teamNameList);
      })  
    }



    const onPress = (details) => {
      console.log("details check",details);
      Axios.post(config.url + config.port + "/poll/mypolls", {
        teamid: details.teamid,
      }).then((response) => {
        setPollList(response.data.result);
        console.log(" Onpress ", response.data.result, pollList);
        setTtname(details.teamname);
        setTdes(details.teamdes);
        setID(details.teamid);
        setAdmin(details.admin)
        setdisTeam(false);
      });
    };
    return (
        <div className="mainPage">
           <Navbar onLogout={onLogout} tokens={tokens} createTeam={() => setCreateTeam(!createTeam) } onReload={reload} teamData={teamNameList} onPress={onPress} joinTeam={() => setJoinTeam(!joinTeam)}/>
           <Content createTeam={createTeam} joinTeam={joinTeam} tokens={tokens} onPress={onPress} onReload={reload} teamData={teamNameList} disTeam={disTeam} pollList={pollList} ttname={TN} tdes={TD} tid={TID}onCreate={() => setCreateTeam(!createTeam) } onBack={() => setJoinTeam(!joinTeam) } onJoin={() => setJoinTeam(!joinTeam) } admin={admin}/>
        </div>
    )
}

export default Main
