import React from 'react';
import Myteams from "./myTeams"

const Navbar = ({onLogout,tokens,createTeam,onReload,teamData,onPress,joinTeam}) => {

    return (
        <div className="navbar">

            <div>
            <div className="userDashboard">
                <div className="userInfo"><h3>{tokens.name}</h3></div>
            </div>
            <Myteams onReload={onReload} teamData={teamData} onPress={onPress}/>
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
