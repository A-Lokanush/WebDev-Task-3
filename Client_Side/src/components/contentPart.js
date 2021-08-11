import React,{useState} from 'react'
import CreateTeam from "./createTeam"
import CreatePolls from "./createPolls"
import Teampage from "./TeamPage"
import Default from "./Default"
import JoinTeam from "./joinTeam"

const ContentPart = ({onJoin,createTeam,name,password,admin,tid,onReload,teamData,disTeam,pollList,onLoad,ttname,tdes,onCreate,joinTeam,onBack}) => {

    const [createPoll,setCreatePoll] = useState(false);
    console.log("contentPart",ttname,tdes)
    const onCreatePoll = () =>{
        setCreatePoll(!createPoll)
        onReload()
        
    }
    
    
    return (
      <div className="contentPart">
        {joinTeam ? (
          createTeam ? (
            createPoll ? (
              <CreatePolls
                onSubmit={() => setCreatePoll(!createPoll)}
                name={name}
                tid={tid}
                password={password}
                teamData={teamData}
                ttname={ttname}
                tdes={tdes}
                admin={admin}
                onReload={onReload}
              />
            ) : disTeam ? (
              <Default />
            ) : (
              <Teampage
                onCreatePoll={onCreatePoll}
                pollList={pollList}
                ttname={ttname}
                tdes={tdes}
                name={name}
                tid={tid}
                password={password}
                admin={admin}
              />
            )
          ) : (
            <CreateTeam
              name={name}
              password={password}
              onCreate={onCreate}
              onReload={onReload}
              ttname={ttname}
              tdes={tdes}
            />
          )
        ) : (
          <JoinTeam
            name={name}
            password={password}
            onCreate={onCreate}
            onReload={onReload}
            onBack={onBack}
            onJoin={onJoin}
          />
        )}
      </div>
    );
}

export default ContentPart

