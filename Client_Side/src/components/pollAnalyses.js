import React from 'react'

const PollAnalyses = ({optionData,index,op,qop,oop}) => {
    return (
        <div >
          {(qop[index]!=null)? (<div className="optionList">OPTION  {index + 1} ::  <span style={{color: "rgb(250, 0, 255)",marginLeft: "1%", marginRight: "1%"}}>" {qop[index]} "</span>{""} {"->"} <span style={{color: "rgb(170, 10, 255)",marginLeft: "1%", marginRight: "1%"}}>{oop[index]}</span> votes</div>) : (null)}
        </div>
    )
}

export default PollAnalyses
