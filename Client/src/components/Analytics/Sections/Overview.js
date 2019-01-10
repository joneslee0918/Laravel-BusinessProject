import React from 'react';

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
                
            </div>
        );
    }
}



export default Overview;
