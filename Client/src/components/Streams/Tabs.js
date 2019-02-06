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

    newTab = () => {
        
        const tabs = this.state.tabs.map( tab => ({...tab, active: false}) );

        this.setState(() => ({
            tabs: [
                ...tabs,
                {
                    name: `Tab ${(tabs.length + 1)}`,
                    id: `tab_${(tabs.length + 1)}`,
                    active: true
                }
            ]
        }));
    };

    removeTab = (id) => {

        const tabs = this.state.tabs.filter( tab => tab.id !== id );

        this.setState(() => ({
            tabs
        }));
    };

    selectTab = (id) => {

        const tabs = this.state.tabs.map( tab => ({...tab, active: id === tab.id ? true: false}) );
        console.log(tabs);
        this.setState(() => ({
            tabs
        }));

    };

    

    render(){
        return(
            <div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {this.state.tabs.map( (tab, index) => (
                        <li key={index} className={`nav-item pos-relative ${tab.active ? 'active' : ''}`}>
                            <a className={`nav-link bordered-tab ${tab.active ? 'active' : ''}`} onClick={() => this.selectTab(tab.id)} id={`${tab.id}-tab`} data-toggle="tab" href={`#${tab.id}`} role="tab" aria-controls={tab.id} aria-selected="true">{tab.name} 
                            </a><i onClick={ () => this.removeTab(tab.id)} className="fa tab-close-btn fa-close pull-right"></i>
                        </li>
                    ))}
                    <li className="nav-item">
                        <a className="nav-link bordered-tab link-cursor" onClick={this.newTab}><i className="fa fa-plus"></i></a>
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