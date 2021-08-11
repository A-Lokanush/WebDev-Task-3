import React,{useState} from 'react'
import poll from './poll';
import Axios from "axios";

const PollPage = ({PollInfo,onBack,name,password,tid,isPolled}) => {

    const [pollingOptions,setPollingOption]=useState([PollInfo.option0,PollInfo.option1,PollInfo.option2,PollInfo.option3,PollInfo.option4,PollInfo.option5,PollInfo.option6,PollInfo.option7,PollInfo.option8,PollInfo.option9])
    const [polled,setPolled] = useState(true);
    const [selectedOption,setSelectedoption]=useState("")

    function checkOption(pollOption,index){
        //
        if(pollOption){
        return (
          <label className="pollingOptionss" onClick={()=>{setSelectedoption(pollOption)
          console.log("/\/",selectedOption)}} >
              <label className="radio-btn"><span className="checker"></span>
              <input
              type="radio" value={pollOption} name="clickedOption" style={{ paddingLeft: "1%" }}/>
            </label>
            {""}
            <label>{pollOption}</label>
          </label>
        );
    }
    }

    
    const vote = () => {
        console.log("working...",selectedOption)
        Axios.post("http://localhost:3002/polling",{
          username: name,
          password: password,
          teamname: PollInfo.teamname,
          teamdes: PollInfo.teamdes,
          pollname: PollInfo.pollname,
          selectedoption: selectedOption
        }).then((response)=> {
          console.log(response)
        })
        onBack()
    }
    const pollAdd = () => {
        console.log("In poll ADd")
        Axios.post("http://localhost:3002/pollAdd",{
          username: name,
          password: password,
          teamid:tid,
          pollname: PollInfo.pollname,
          selectedoption: selectedOption,
          userpollid:name+PollInfo.pollname,
        }).then((response)=> {
          console.log(response)
        })
        onBack()
    }
    const pollCheck = () => {
        Axios.post("http://localhost:3002/pollCheck",{
          username: name,
          password: password,
          teamid: tid,
          pollname: PollInfo.pollname,
        }).then((response)=> {
          console.log(response)
          console.log("response.data.result",response.data.result)
          if(polled){
            if(response.data.result.length > 0) {
              console.log("No poll Add")
              onBack();
              } else {
                  console.log("going to polling add")
                  pollAdd();
              }
              setPolled(false);
          }
          
        })

    }
    
    return (

      <div className="PollingAREA">
        <div className="pollingAreaHeader">
        <span className="backing3" onClick={onBack}>Back</span>
        <div className="pollheaderdiv3"><span className="pollHeader3">{PollInfo.pollname}</span></div>
        </div>
        <div className="pollingArea">
            <div className="questionArea">
               <span style={{ color: "rgb(250, 0, 255)"}}> Question : </span>{PollInfo.question}
            </div>
            <form className="pollOptionsArea">
                <div className="pollingOptions">
                    {pollingOptions.map(checkOption)}
                </div>
                <div className="finalSubmit" onClick={pollCheck}>Submit</div>
            </form>
            
        </div>
        
      </div>
    );
}

export default PollPage

















