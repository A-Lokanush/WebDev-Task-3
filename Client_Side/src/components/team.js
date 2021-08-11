const team = ({teamData,onPress}) => {
    const passData = () => {
        const details ={
            teamname: teamData.teamname,
            teamdes: teamData.teamdes,
            teamid: teamData.teamid,
            admin: teamData.admin,
        }
        onPress(details)
        console.log('.',teamData)
    }
    return (
        <>
            <div className="team" onClick={passData}>{teamData.teamname}</div>
        </>
    )
}

export default team
