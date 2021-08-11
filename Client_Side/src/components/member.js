import React from 'react'

const Member = ({member}) => {
    return (
        <div className="member-items">
            {member.username}
        </div>
    )
}

export default Member
