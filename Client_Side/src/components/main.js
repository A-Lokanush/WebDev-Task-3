import React,{useState} from 'react'
import Axios from "axios";

import "./styling/styles.css"
import Navbar from "./navbar"
import Content from "./contentPart"

const Main = ({onLogout,name,password}) => {

    const [createTeam,setCreateTeam]=useState(true);
    const [joinTeam,setJoinTeam]=useState(true);
    const [teamNameList,setTeamNameList]=useState(['']);
    const [disTeam,setdisTeam]=useState(true);
    const [pollList,setPollList]=useState(['']);
    const [pollList2,setPollList2]=useState(['']);
    const [TN,setTtname]=useState("");
    const [TD,setTdes]=useState("");
    const [TID,setID]=useState("");
    const [admin,setAdmin]=useState("");
    
    const reload = () => {
        Axios.post("http://localhost:3002/team/myteams",{
        username: name,
        password: password,
      }).then((response) => {
          setTeamNameList(response.data.result);
          console.log("Inside axios onReload",response,teamNameList);
      })  
    }



    const onPress = (details) => {
      console.log("details check",details);
      Axios.post("http://localhost:3002/poll/mypolls", {
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
    const onPress2 = (ttname,tdes,tid,admin) => {
      //console.log("details check",details);
      Axios.post("http://localhost:3002/poll/mypolls", {
        teamid: tid,
      }).then((response) => {
        //setPollList(response.data.result);
        //console.log(" Onpress ", response.data.result, pollList);
        setTtname(ttname);
        setTdes(tdes);
        setID(tid);
        setAdmin(admin)
        setdisTeam(false);
      });
    };
    return (
        <div className="mainPage">
           <Navbar onLogout={onLogout} name={name} password={password} createTeam={() => setCreateTeam(!createTeam) } onReload={reload} teamData={teamNameList}onPress={onPress} joinTeam={() => setJoinTeam(!joinTeam)}/>
           <Content createTeam={createTeam} joinTeam={joinTeam} name={name} password={password} onReload={reload} teamData={teamNameList} disTeam={disTeam} pollList={pollList} ttname={TN} tdes={TD} tid={TID}onCreate={() => setCreateTeam(!createTeam) } onBack={() => setJoinTeam(!joinTeam) } onJoin={() => setJoinTeam(!joinTeam) } admin={admin}/>
        </div>
    )
}

export default Main
