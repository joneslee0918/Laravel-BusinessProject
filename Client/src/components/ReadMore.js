import React, { Component } from 'react';
import {truncate} from '../utils/helpers';

class ReadMore extends Component {

    state = {
      expanded: false //begin with box closed
    }

    //function that takes in expanded and makes it the opposite of what it currently is
    toggleExpand = () => { 
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        const { expanded } = this.state;
        const {children, characters} = this.props;
        const length = characters ? characters : 200;
        return (
            <div>            
                <div>
                    {expanded ? children : truncate(children, length)}
                </div>
                {children.length > length ?
                    <p className="linkify-text" onClick={this.toggleExpand}>{!expanded ? "Read more" : "Read less"}</p> : ""
                }
                
            </div>
        )
    }
}

export default ReadMore;