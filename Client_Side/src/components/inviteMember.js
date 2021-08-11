import React,{useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const InviteMember = ({ ttname, tdes, tid ,onBack}) => {
  const [copy,setCopy]= useState(false);
  return (
    <div className="inviteMembers">
      <div className="dashboard">
        <div className="team-details">
          <div>{ttname}</div>
          <div className="team-des">{tdes}</div>
        </div>
        <div className="team-members">
          {/* <span class="material-icons-two-tone membersicon">group</span> */}
          <span class="material-icons-two-tone addmember" >person_add</span>
        </div>
        {/* Add members and designation and option to removeor send invite */}
      </div>
      <div style={{marginTop: "2%"}}><span className="backing3"onClick={onBack} >Back</span></div>
      <div
        className="inviteArea"
        style={{
          marginTop: "11%",
          border: "1px solid #fff",
          marginLeft: "2%",
         // marginBottom: "100%",
          width: "96%",
          paddingTop: "2.5vh",
          height: "13vh",
          borderRadius: "5px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(60,60,60)",
          color:"violet"
        }}
      >
        <span>Share this code for members to join in the team</span>
        <div className="inviteClipboard">
          <span style={{ color: "#00ff62", marginTop: "2vh" }}>
            CODE : <span style={{ color: "orange" }}>{tid}</span>
          </span>
          <CopyToClipboard text={tid} onCopy={()=>setCopy(true)}>
          <span
            className="material-icons-two-tone copy"
            style={{
              marginLeft: "1.5vw",
              fontSize: "1.4rem",
              marginTop: "2vh",
            }}
          >
            content_copy
          </span>
          </CopyToClipboard>
          {copy? (<span style={{color: "white",fontSize:"0.5rem"}}>Copied</span>):(null)}
        </div>
      </div>
    </div>
  );
};

export default InviteMember
