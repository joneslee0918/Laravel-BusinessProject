import React from 'react';

class Tabs extends React.Component{

    state = {
        tabs: [
            {
                name: "Tab 1",
                id: "tab_1",
                active: false
            },
            {
                name: "Tab 2",
                id: "tab_2",
                active: false
            },
            {
                name: "Tab 3",
                id: "tab_3",
                active: true
            },
            {
                name: "Tab 4",
                id: "tab_4",
                active: false
            }
        ]
    }

    render(){
        return(
            <div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {this.state.tabs.map( (tab, index) => (
                        <li key={index} className={`nav-item ${tab.active ? 'active' : ''}`}>
                            <a className={`nav-link bordered-tab ${tab.active ? 'active' : ''}`} id={`${tab.id}-tab`} data-toggle="tab" href={`#${tab.id}`} role="tab" aria-controls={tab.id} aria-selected="true">{tab.name}</a>
                        </li>
                    ))}
                    <li className="nav-item">
                        <a className="nav-link bordered-tab" href="#"><i className="fa fa-plus"></i></a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    {this.state.tabs.map( (tab, index) => (
                        <div key={index} className={`tab-pane sky-bg fade ${tab.active ? 'active in' : ''}`} id={tab.id} role="tabpanel" aria-labelledby={`${tab.id}-tab`}>{tab.name}</div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Tabs;