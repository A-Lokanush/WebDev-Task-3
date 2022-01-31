import React from 'react';
import vote from "../vote.gif"
import stats from "../stats.gif"

const Default = () => {

    return (
      <div className="default">
        <div className="wrap-box13">
          <div className="box1">
            <img src={stats} alt="..." />
            <div className="boxContent">
              <div>- A clean analyse of the poll</div>
              <div>- Instant results</div>
              <div>- Reliable and Smart</div> 
            </div>
          </div>
          <div className="box3"></div>
        </div>

        <div className="wrap-box24">
          <div className="box2"></div>
          <div className="box4">
            <img src={vote} alt="..." />
          </div>
        </div>
      </div>
    );
}

export default Default
