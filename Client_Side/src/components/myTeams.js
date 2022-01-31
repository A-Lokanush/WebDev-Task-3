import React,{useState} from 'react';
import Teams from "./team";

const MyTeams = ({onReload,teamData,onPress}) => {

    const [myTeams,setMyTeam] = useState(true);
    var first = true;

    const change = () =>{
        if(first){onReload();first = false;}
        setMyTeam(!myTeams);
    }

    return (
      <div>
        {myTeams ? (
          <div className="pollOptions">
            <h5 className="myTeams">My Teams</h5>
            <span className="material-icons-two-tone plusTeam" onClick={change}>
              add
            </span>
          </div>
        ) : (
          <div>
            <div className="pollOptions">
              <h5 className="myTeams">My Teams</h5>
              <span className="material-icons-two-tone plusTeam" onClick={change}>
                remove
              </span>
            </div>
            {(teamData.length > 0)?(<div className="teamList">
              {teamData.map((team, index) => (
                <Teams key={index} teamData={team} onPress={onPress}/>
              ))}
            </div>):(<div>No Teams</div>)}
            
          </div>
        )}
      </div>
    );
}

export default MyTeams
