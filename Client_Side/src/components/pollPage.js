import React,{useState} from 'react'
import config from "../config/config";
import Axios from "axios";

const PollPage = ({PollInfo,onBack,tokens,tid,isPolled}) => {

    const [pollingOptions,setPollingOption]=useState([PollInfo.option0,PollInfo.option1,PollInfo.option2,PollInfo.option3,PollInfo.option4,PollInfo.option5,PollInfo.option6,PollInfo.option7,PollInfo.option8,PollInfo.option9])
    const [polled,setPolled] = useState(true);
    const [selectedOption,setSelectedoption]=useState("")

    function checkOption(pollOption,index){
        //
        if(pollOption){
        return (
          <label className="pollingOptionss" onClick={()=>{setSelectedoption(pollOption)}} >
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

    const makeId = () => {
      //generate a random string from the
      //set of alphanumeric characters
      let text = "";
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
    
    const pollAdd = () => {
        console.log("In poll ADd")
        Axios.post(config.url + config.port + "/poll/pollAdd",{
          accessToken: tokens.at,
          teamid:tid,
          pollname: PollInfo.pollname,
          selectedoption: selectedOption,
          userpollid:makeId(),
        }).then((response)=> {
          console.log(response)
        })
        onBack()
    }
    const pollCheck = () => {
        Axios.post(config.url + config.port + "/poll/pollCheck",{
          accessToken: tokens.at,
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

















