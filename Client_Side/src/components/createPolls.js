import React,{useState} from 'react'
import Axios from "axios";

const CreatePolls = ({onSubmit,name,password,teamData,ttname,tdes,onReload,tid,admin}) => {

    const [pollname,setPollname] = useState("");
    const [question,setQuestion] = useState("")
    const [options,setOption] = useState(['']);

    const polllist = () => {
        const letters = "AaB&*()_+=-?/b1/=CcDd=2/E=eFfGZz!@#$%g0H3hIi/4l=MmN7nOo/PpQqRr=/6S8s=TtU9uV/vWwX=xY/y^?"
          let pollID = "";
          for (let i = 0; i < 19; i++) {
            pollID += letters[Math.floor(Math.random() *86)];
          }
        console.log(" before axios create poll",pollname,question,options[0],options[1],options[2])
            Axios.post("http://localhost:3002/polllist",{
                pollname: pollname,
                question: question,
                option0: options[0],
                option1: options[1],
                option2: options[2],
                option3: options[3],
                option4: options[4],
                option5: options[5],
                option6: options[6],
                option7: options[7],
                option8: options[8],
                option9: options[9],
                teamid:tid,
                pollteamid:pollname+pollID,
              });
              console.log("Axios createPoll",ttname,options)
        onSubmit();
        //onReload(ttname,tdes,tid,admin);
    };

    const removeOption = (index) => {
        const newOption = options.filter((option, optionIndex) => {
            return optionIndex !== index
        })

        setOption(newOption)
       
    }
    const onOptionChange = (index, value) => {
        const newOption = options.map((option, optionIndex) => {
            if (optionIndex === index) {
                return value
            }

            return option
        })

        setOption(newOption)
        
    }

    const addOption = () => {
        console.log("ADD",options)
        setOption([
            ...options,
            ''
        ])
    }
    return (
         <div className="createTeam2">
            <div className="pollheaderdiv"><span className="backing" onClick={onSubmit}>Back</span><span className="pollHeader">Create New Poll in {ttname}</span></div>
            <div className="entries2">
                <label className="teamlabel2">Poll Name</label>
                <input className="teamInput2"type="text"placeholder="Enter Poll Name"onChange={(e) => setPollname(e.target.value)}value={pollname}/>
                <label className="teamlabel2">Question</label>
                <input className="teamInput2 teamDes2"type="paragraph"placeholder="Type the question"onChange={(e)=>setQuestion(e.target.value)}value={question}/>
                <label className="teamlabel2">Options</label>
                { options.map((option,index) => (
                    <div className="pollOptions">
                        <input key={index} className="teamInput2 teamDes2 pollOption" type="paragraph" placeholder="Options..." 
                    onChange={(e) => onOptionChange(index,e.target.value)} value={option}/>
                    <button onClick={() => removeOption(index)} className="removePollOption">Remove</button>
                    </div>
                ))}
                <button onClick={addOption} className="btnOption">Add</button>

                <input className="btnCreateTeams2" type="submit" value="Create" onClick={polllist}/>

            </div>
        </div>
    )
}

export default CreatePolls
