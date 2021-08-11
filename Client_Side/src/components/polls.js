import Poll from './poll'



const polls = ({pollList,onclick,name,password,tid}) => {

    

    return (
        <div className="poll-list">
            { pollList.map((poll, index) => (
                <Poll key={index} poll={poll} ond={pollList} onclick={onclick} name={name} password={password} tid={tid} />
              ))}
        </div>
    )
}

export default polls
