import React, { useState } from "react";
import { PieChart,Pie,Tooltip, BarChart,ResponsiveContainer,Cell,Bar, XAxis, YAxis, CartesianGrid,Legend} from "recharts"
import Axios from "axios";
import Pollanalyses from './pollAnalyses'
import config from "../config/config";


const Results = ({ onBack, PollInfo, admin, end ,option,qop,op,oop}) => {
  const [ended, setEnded] = useState(end);
  const [viewResults,setViewResults] = useState(false)
  //const [endedPoll, setEndedPoll] = useState();
  const data = [
    {name:"Option1",value:oop[0]},
    {name:"Option2",value:oop[1]},
    {name:"Option3",value:oop[2]},
    {name:"Option4",value:oop[3]},
    {name:"Option5",value:oop[4]},
    {name:"Option6",value:oop[5]},
    {name:"Option7",value:oop[6]},
    {name:"Option8",value:oop[7]},
    {name:"Option9",value:oop[8]},
    {name:"Option10",value:oop[9]},
  ]


  // const handleClick = (data, index) => {
  //   this.setState({
  //     activeIndex: index,
  //   });
  // };


  const ENDPOLL = () => {
    console.log("ENDED");
    setEnded(true);
    Axios.post(config.url + config.port + "/poll/endpoll", {
      pollname: PollInfo.pollname,
      ended: "ended",
    });
  };
  
  const getResult = () => {
    setViewResults(true)
  }
  return (
    <div>
      <div className="pollingAreaHeader">
        <span className="backing3" onClick={onBack}>
          Back
        </span>
        <div className="pollheaderdiv3">
          <span className="pollHeader3">{PollInfo.pollname}</span>
        </div>
      </div>
      {admin == "Admin" ? (
        viewResults ? (
          <div className="resultDiv">
            <div className="pollResultHeader">POLL RESULT</div>
            {qop.map((option, index) => (
              <Pollanalyses
                qop={qop}
                op={op}
                opitonData={option}
                index={index}
                oop={oop}
              />
            ))}
            <div className="pieChart">PIE CHART</div>
            <PieChart width={window.innerWidth*2/5} height={585}>
            
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={180}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          
          </div>
        ) : ended || end ? (
          <div className="pollResults">
            <span className="line1">
              THANKS, you have successfully ended the poll
            </span>

            <span className=" line2 viewResults" onClick={getResult}>
              View Results
            </span>
          </div>
        ) : (
          <div className="pollResults">
            <span className="line1">
              THANKS, you have submitted the poll. CHEERS!!!
            </span>

            <span className=" line2 viewResults" onClick={ENDPOLL}>
              End Poll
            </span>
          </div>
        )
      ) : viewResults ? (
        <div className="resultDiv">
          <div className="pollResultHeader">POLL RESULT</div>
          {qop.map((option, index) => (
            <Pollanalyses
              qop={qop}
              op={op}
              opitonData={option}
              index={index}
              oop={oop}
            />
          ))}
        </div>
      ) : ended || end ? (
        <div className="pollResults">
          <span className="line1">
            THANKS, you have submitted the poll. CHEERS!!!
          </span>
          <span className=" line2 viewResults" onClick={getResult}>
            VIEW RESULTS
          </span>
        </div>
      ) : (
        <div className="pollResults">
          <span className="line1">
            THANKS, you have submitted the poll. CHEERS!!!
          </span>
          <span className="line2">
            You can view the results once the admin ends it.
          </span>
        </div>
      )}
    </div>
  );
};

export default Results;
