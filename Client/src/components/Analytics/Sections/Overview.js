import React from 'react';
import TwitterAnalytics from '../TwitterAnalytics';

class Overview extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        data: false
    }
    

    render(){
        const data = this.state.data;
        return (
            <div>
                <h2>ANALYTICS OVERVIEW</h2>  
                <ul className="analytics-filter">
                    <li className="analytics-filter-li"><a>Today</a></li>
                    <li className="analytics-filter-li"><a>Last 7 Days</a></li>
                    <li className="analytics-filter-li"><a>Last 30 Days</a></li>
                </ul>           
                <TwitterAnalytics />
            </div>
        );
    }
}



export default Overview;
