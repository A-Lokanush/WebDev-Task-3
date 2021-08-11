import Axios from 'axios'
const poll = ({poll,ond,onclick,name,password,tid,isPolled}) => {

    const passData = () => {
        onclick(poll);
    }

    // const Polled = () => {
    //     Axios.post("http://localhost:3002/pollCheck",{
    //         username: name,
    //         password: password,
    //         teamid: tid,
    //         pollname: poll.pollname,
    //       }).then((response)=> {
    //         console.log(response)
    //         console.log("response.data.result",response.data.result)
    //           if(response.data.result.length > 0) {
    //             console.log("No poll Add")
    //             isPolled()  
    //           }  else{
    //             //setPollpage(!pollpage)
    //           }   
    //       })
    //   }

    return (
        <div className="poll-items" onClick={passData}>
            {poll.pollname}
        </div>
    )
}

export default poll
