import React,{useState} from 'react'
import CreateTeam from "./createTeam"
import CreatePolls from "./createPolls"
import Teampage from "./TeamPage"
import Default from "./Default"
import JoinTeam from "./joinTeam"

const ContentPart = ({onJoin,createTeam,tokens,admin,tid,onPress,onReload,teamData,disTeam,pollList,onLoad,ttname,tdes,onCreate,joinTeam,onBack}) => {

    const [createPoll,setCreatePoll] = useState(false);
    const onCreatePoll = () =>{
        setCreatePoll(!createPoll)
        onReload()
    }
    const onsSubmitCreatePoll = () =>{
      setCreatePoll(!createPoll)
      onPress({tid})
  }
    return (
      <div className="contentPart">
        {joinTeam ? (
          createTeam ? (
            createPoll ? (
              <CreatePolls
                onSubmit={onsSubmitCreatePoll}
                tid={tid}
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
                tid={tid}
                tokens={tokens}
                admin={admin}
              />
            )
          ) : (
            <CreateTeam
              onCreate={onCreate}
              onReload={onReload}
              ttname={ttname}
              tokens={tokens}
              tdes={tdes}
            />
          )
        ) : (
          <JoinTeam
            onCreate={onCreate}
            onReload={onReload}
            onBack={onBack}
            tokens={tokens}
            onJoin={onJoin}
          />
        )}  
      </div>
    );
}

export default ContentPart

