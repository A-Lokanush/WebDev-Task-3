import React,{useState} from 'react';
import Myteams from "./myTeams"

const Navbar = ({onLogout,name,password,createTeam,onReload,teamData,onPress,joinTeam}) => {

    const [addTeam,setAddTeam]=useState("");

    return (
        <div className="navbar">

            <div>
            <div className="userDashboard">
                <div className="userInfo"><h3>{name}</h3></div>
            </div>
            <Myteams name={name} password={password} onCreate={createTeam} onReload={onReload} teamData={teamData} onPress={onPress}/>
            <div className="buttonss">
               <button className="buttonNav" onClick={joinTeam}>Join Team</button>
               <button className="buttonNav" onClick={createTeam}>Create Team</button>
               <button onClick={onLogout} className="buttonNav">Logout</button>
            </div>
            </div>
        </div>
    )
}

export default Navbar
