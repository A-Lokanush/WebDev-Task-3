import React from 'react';
import vote from "../vote.gif"
import stats from "../stats.gif"
import pie from "../statistics.gif"
import lock from "../lock.gif"

const Default = () => {

    return (
      <div className="default">
        <div className="wrap-box13">
          <div className="box1">
            <img src={stats} alt="..." />
            <div className="boxContent">
              <div>- Instant results</div>
              <div>- Reliable and Smart</div> 
            </div>
          </div>
          <div className="box3">
            <img src={pie} alt="..." />
            <div>A clean analyse of the poll</div>
          </div>
        </div>

        <div className="wrap-box24">
          <div className="box2">
            <img src={lock} alt="..." />
            <div>S#cur$t* Gu@r@nte%d</div>
          </div>
          <div className="box4">
            <img src={vote} alt="..." />
            <h3 style={{color:"#38f55e"}}>Safe, Swift and Secure</h3>
          </div>
        </div>
      </div>
    );
}

export default Default
