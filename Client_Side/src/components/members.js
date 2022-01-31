import React from 'react'
import Member from './member'

const Members = ({ttname,tdes,tid,onBack,teamMemberInfo}) => {
    return (
      <div>
        <div className="dashboard">
          <div className="team-details">
            <div>{ttname}</div>
            <div className="team-des">{tdes}</div>
          </div>
          <div className="team-members">
            <span className="material-icons-two-tone membersicon">group</span>
            {/* <span class="material-icons-two-tone addmember">person_add</span> */}
          </div>
          {/* Add members and designation and option to removeor send invite */}
        </div>
        <div style={{marginTop: "2%"}}><span className="backing3"onClick={onBack} >Back</span></div>
        <div style={{marginTop: "2%",color: "rgb(219, 170, 8)"}}><span>Team Members</span></div>
        <div className="member-list">
            {teamMemberInfo.map((member, index)=>(
                <Member member={member} key={index} />
            ))}
        </div>
      </div>
    );
}

export default Members
