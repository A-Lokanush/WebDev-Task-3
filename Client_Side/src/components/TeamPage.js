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
  name,
  password,
  tid,
  admin,
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
  

  function countingVote(Option, index) {
    //console.log(index,op[index-1])
    // if (Option == option.selectedoption) {
    //   op[index] += 1;
    // }
    qop.forEach((qop)=>{
      if(Option.selectedoption === qop[index]){
        op[index] += 1;
     }
   })
  }

  function sendingRes(op){
    setOop(op)
    console.log("Oopps",oop,op)
  }

  let QuestionOption
  const analyse = (detail,aop) => {
    QuestionOption = [detail.option0,detail.option1,detail.option2,detail.option3,detail.option4,detail.option5,detail.option6,detail.option7,detail.option8,detail.option9]
    setQop(QuestionOption)
    console.log("ANALyse",QuestionOption,qop);
    aop.map((aop) => {
          QuestionOption.forEach((qop,index) => {
            if(aop.selectedoption === qop){
              op[index] += 1;
            }
          })
    });
    console.log("qop", qop);
    console.log("options", option);
    console.log("opopop",op);
    sendingRes(op)
    //setOop(option);
    //console.log("Oop",oop)
  };

  // result data{}
  const [option, setOption] = useState("");
  const pollresults = (detail) => {
    console.log("before pollresults", detail.pollname);
    Axios.post("http://localhost:3002/result", {
      pollname: detail.pollname,
    }).then((response) => {
      console.log("response", response.data.result);
      setOption(response.data.result);
      console.log("after pollresults", option);
      setTimeout(() => {analyse(detail,response.data.result)},100)
    });
    
  };
  
////////

  const getTeamMemberInfo = () => {
    Axios.post("http://localhost:3002/teamMember",{
      teamid:tid,
    }).then((response) => {
      console.log(response)
      setTeamMemberInfo(response.data.result);
      setTeamMember(!teamMember)
    })
  }

  const isPolled = () => {
    Axios.post("http://localhost:3002/pollCheck", {
      username: name,
      password: password,
      teamid: tid,
      pollname: pollInfo.pollname,
    }).then((response) => {
      console.log(response);
      console.log("response.data.result", response.data.result);
      if (response.data.result.length > 0) {
        console.log("No poll Add");
        setPolled(true);
      }
      
    });
  };

  const endedPoll = (detail) => {
    console.log("ended poll detail",detail);
        Axios.post("http://localhost:3002/ended",{
        pollname:detail.pollname,
        ended:"ended",
      }).then((response) => {
        console.log("ADMIN ROCKZZ",response.data.result);
        if(response.data.result.length > 0){
          console.log("ggggggg",response.data.result)
          //setOption(response.data.result);
          setEnded(true)
        }
      })
      setTimeout(() => { pollresults(detail)},100);
  }


  const abtPollpage = (detail) => {
    console.log(detail);
    console.log(pollInfo);
    Axios.post("http://localhost:3002/pollCheck", {
      username: name,
      password: password,
      teamid: tid,
      pollname: detail.pollname,
    }).then((response) => {
      console.log(response);
      console.log("response.data.result", response.data.result);
      if (response.data.result.length > 0) {
        setPollInfo(detail);
        setPolled(true);
        console.log("Already polled",pollInfo);
      } else {
        setPollpage(!pollpage);
        setPollInfo(detail);
        console.log("hmm",pollInfo);
      }
      console.log("before ended",detail.pollname)
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
            name={name}
            password={password}
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
                class="material-icons-two-tone membersicon"
                onClick={getTeamMemberInfo}
                onBack={() => setTeamMember(!teamMember)}
              >
                group
              </span>
              <span
                class="material-icons-two-tone addmember"
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

          {admin == "Admin" || admin == "Co-Admin" ? (
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

