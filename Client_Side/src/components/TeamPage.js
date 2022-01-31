import React, { useState } from "react";
import Axios from "axios";
import Polls from "./polls";
import Pollpage from "./pollPage"
import Result from "./results"
import Invitemember from "./inviteMember"
import Members from "./members"

const TeamPage = ({
  onCreatePoll,
  pollList,
  ttname,
  tdes,
  tid,
  admin,
  tokens
}) => {
  const [pollpage, setPollpage] = useState(false);
  const [pollInfo, setPollInfo] = useState("");
  const [polled, setPolled] = useState(false);
  const [inviteMember, setInviteMember] = useState(false);
  const [teamMember, setTeamMember] = useState(false);
  const [teamMemberInfo,setTeamMemberInfo]=useState()
  const [end,setEnded]= useState(false)
  //const [admin,setAdmin] = useState("")

  //result calculation
  const [qop, setQop] = useState();
  var op = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [oop,setOop] = useState([""]);
  

  function sendingRes(op){
    setOop(op)
  }

  let QuestionOption
  const analyse = (detail,aop) => {
    QuestionOption = [detail.option0,detail.option1,detail.option2,detail.option3,detail.option4,detail.option5,detail.option6,detail.option7,detail.option8,detail.option9]
    setQop(QuestionOption)
    // eslint-disable-next-line array-callback-return
    aop.map((aop) => {
          QuestionOption.forEach((qop,index) => {
            if(aop.selectedoption === qop){
              op[index] += 1;
            }
          })
    });
    sendingRes(op)
    //setOop(option);
    //console.log("Oop",oop)
  };

  // result data{}
  const [option, setOption] = useState("");
  const pollresults = (detail) => {
    Axios.post("http://localhost:3002/poll/result", {
      pollname: detail.pollname,
    }).then((response) => {
      setOption(response.data.result);
      setTimeout(() => {analyse(detail,response.data.result)},100)
    });
    
  };
  
////////

  const getTeamMemberInfo = () => {
    Axios.post("http://localhost:3002/team/teamMember",{
      teamid:tid,
    }).then((response) => {
      setTeamMemberInfo(response.data.result);
      setTeamMember(!teamMember)
    })
  }

  const endedPoll = (detail) => {
        Axios.post("http://localhost:3002/poll/ended",{
        pollname:detail.pollname,
        ended:"ended",
      }).then((response) => {
        if(response.data.result.length > 0){
          //setOption(response.data.result);
          setEnded(true)
        }
      })
      setTimeout(() => { pollresults(detail)},100);
  }


  const abtPollpage = (detail) => {
    Axios.post("http://localhost:3002/poll/pollCheck", {
      accessToken: tokens.at,
      teamid: tid,
      pollname: detail.pollname,
    }).then((response) => {
      if (response.data.result.length > 0) {
        setPollInfo(detail);
        setPolled(true);
      } else {
        setPollpage(!pollpage);
        setPollInfo(detail);
      }
    });
    setTimeout(()=>{endedPoll(detail)},100)
  };


  const onBack = () => {
    setPolled(false);
  };
  return (
    <div>
      {teamMember ? (
        <Members
          ttname={ttname}
          tdes={tdes}
          tid={tid}
          onBack={() => setTeamMember(!teamMember)}
          teamMemberInfo={teamMemberInfo}
        />
      ) : inviteMember ? (
        <Invitemember
          ttname={ttname}
          tdes={tdes}
          tid={tid}
          onBack={() => setInviteMember(!inviteMember)}
        />
      ) : polled ? (
        <Result
          onBack={onBack}
          PollInfo={pollInfo}
          admin={admin}
          end={end}
          option={option}
          qop={qop}
          op={op}
          oop={oop}
        />
      ) : pollpage ? (
        // end ? (
        //   <div className="inviteMembers">
        //     <div className="pollingAreaHeader">
        //       <span className="backing3" onClick={() => setPollpage(!pollpage)}>
        //         Back
        //       </span>
        //       <div className="pollheaderdiv3">
        //         <span className="pollHeader3">{pollInfo.pollname}</span>
        //       </div>
        //     </div>
        //     {/* <div style={{ marginTop: "2%" }}>
        //       <span className="backing3" onClick={onBack}>
        //         Back
        //       </span>
        //     </div> */}
        //     <div
        //       className="inviteArea"
        //       style={{
        //         marginTop: "11%",
        //         marginLeft: "2%",
        //         // marginBottom: "100%",
        //         width: "96%",
        //         paddingTop: "2.5vh",
        //         height: "8vh",
        //         borderRadius: "5px",
        //         textAlign: "center",
        //         display: "flex",
        //         flexDirection: "column",
        //         backgroundColor: "rgb(60,60,60)",
        //         color: "violet",
        //       }}
        //     >
        //       <span>Uh OH, seems like this poll is ended , :0</span>
        //     </div>
        //   </div>
        // ) : (
          <Pollpage
            isPolled={() => setPolled(!polled)}
            PollInfo={pollInfo}
            tid={tid}
            onBack={() => setPollpage(!pollpage)}
            tokens={tokens}
          />
        //)
      ) : (
        <div>
          <div className="dashboard">
            <div className="team-detail">
              <div>{ttname}</div>
              <div className="team-des">{tdes}</div>
            </div>
            <div className="team-members">
              <span
                className="material-icons-two-tone membersicon"
                onClick={getTeamMemberInfo}
                onBack={() => setTeamMember(!teamMember)}
              >
                group
              </span>
              <span
                className="material-icons-two-tone addmember"
                onClick={() => setInviteMember(!inviteMember)}
              >
                person_add
              </span>
            </div>
            {/* Add members and designation and option to removeor send invite */}
          </div>
          {pollList.length > 0 || pollList ? (
            <Polls pollList={pollList} onclick={abtPollpage} />
          ) : (
            <div className="poll-list">No Polls Yet</div>
          )}

          {admin === "Admin" || admin === "Co-Admin" ? (
            <button className="createBtnPoll" onClick={onCreatePoll}>
              <span className="material-icons-two-tone plusPoll">add</span>
            </button>
          ) : null}
        </div>
      )}
      {}
    </div>
  );
};
export default TeamPage;

