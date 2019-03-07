import React, { Component } from "react";
import _ from 'lodash';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Dialog, FlatButton, Menu, MenuItem, TextField} from 'material-ui';
import {Tabs, Tab} from "react-draggable-tab";
import {getStreams, updateTabs} from "../../requests/streams";
import StreamItems from "./StreamItems";

const tabsClassNames = {
    tabWrapper: 'dndWrapper',
    tabBar: 'dndTabBar',
    tabBarAfter: 'dndTabBarAfter',
    tab:      'dndTab',
    tabTitle: 'dndTabTitle',
    tabCloseIcon: 'tabCloseIcon',
    tabBefore: 'dndTabBefore',
    tabAfter: 'dndTabAfter'
  };
  
  const tabsStyles = {
    tabWrapper: {marginTop: '10px'},
    tabBar: {},
    tab:{},
    tabTitle: {},
    tabCloseIcon: {},
    tabBefore: {},
    tabAfter: {}
  };

class StreamTabs extends Component {

    state = {
      tabs:[],                                                                                                                                                                                                                                                                  
      badgeCount: 0,
      menuPosition: {},
      showMenu: false,
      dialogOpen: false,
      selectedTab: "tab0"
    };

    componentDidMount(){
       this.fetchStreamTabs();
    }
    
    componentDidUpdate(){
        console.log("sda");
    }

    getChildContext(){
        return { muiTheme: getMuiTheme() };
    }

    makeListeners(key) {
        return {
          //onClick: (e) => { console.log('onClick', key, e);}, // never called
          onContextMenu: (e) => { console.log('onContextMeun', key, e); this.handleTabContextMenu(key, e)},
          onDoubleClick: (e) => { console.log('onDoubleClick', key, e); this.handleTabDoubleClick(key, e)},
        }
    }

    handleTabSelect(e, key, currentTabs) {
        this.setState({selectedTab: key, tabs: currentTabs});
    }
    
    handleTabClose(e, key, currentTabs) {
       // console.log('tabClosed key:', key);
        this.setState({tabs: currentTabs});
    }

    handleTabPositionChange(e, key, currentTabs) {
       console.log('tabPositionChanged key:', key);
        this.setState({tabs: currentTabs});
    }

    handleTabAddButtonClick(e, currentTabs) {
    // key must be unique
        const key = 'newTab_' + Date.now();

        if(currentTabs.length > 10){
            alert("You have reached the tab limit");
            return;
        }

        let newTab = (<Tab key={key} title='untitled' {...this.makeListeners(key)}>
                        <div>
                            <StreamItems/>
                        </div>
                        </Tab>);
        let newTabs = currentTabs.concat([newTab]);
        console.log(currentTabs);

        this.setState({
            tabs: newTabs,
            selectedTab: key
        });
    }

    handleTabDoubleClick(key) {
        this.setState({
            editTabKey: key,
            dialogOpen: true
        });
    }
    
    handleTabContextMenu(key, e) {
        e.preventDefault();
        this.setState({
            showMenu: true,
            contextTarget: key,
            menuPosition: {
            top:`${e.pageY}px`,
            left:`${e.pageX}px`
            }
        });
    }

    cancelContextMenu(){
        this.setState({
            showMenu: false,
            contextTarget: null
        });
    }

    renameFromContextMenu(){
        this.setState({
            showMenu: false,
            contextTarget: null,
            editTabKey: this.state.contextTarget,
            dialogOpen: true
        });
    }

    closeFromContextMenu(){
        let newTabs = _.filter(this.state.tabs, (t) => {return t.key !== this.state.contextTarget;});
        this.setState({
            showMenu: false,
            contextTarget: null,
            selectedTab: 'tab0',
            tabs: newTabs
        });
    }

    _onDialogSubmit() {
        const replaceFunc = _.bind((tab) => {
            if (tab.key === this.state.editTabKey) {
                return React.cloneElement(tab, {title: this.refs.input.getValue()});
            }
            return tab;
            }, this),
            newTabs = _.map(this.state.tabs, replaceFunc);
        this.setState({
            tabs: newTabs,
            dialogOpen: false
        });
    }

    _onDialogCancel() {
        this.setState({
            dialogOpen: false
        });
    }

    _onDialogShow() {
        let tab = _.find(this.state.tabs, (t) => {
            return t.key === this.state.editTabKey;
        });
        this.refs.input.setValue(tab.props.title);
    }

    shouldTabClose(e, key){
        console.log('should tab close', e, key);
        return window.confirm('close?');
    }
    
    fetchStreamTabs = () => {
        getStreams().then((response) => {
           let selectedTab = response.filter(tab => tab.selected === 1);
           selectedTab = !!selectedTab.length ? selectedTab[0].key : "tab0";
           
            if(!!response.length){
                 this.setState(() => ({
                     tabs: response.map(tab => 
                         (
                             <Tab key={tab.key} title={tab.title} {...this.makeListeners(tab.key)}>
                                 <div>
                                     <h1>New Empty Tab</h1>
                                 </div>
                             </Tab>
                         )
                       ),
                    selectedTab: selectedTab
                 }));
            }
        });
    }

    render() {
        
        let standardActions = [
            <FlatButton
              label="Cancel"
              secondary={true}
              onClick={this._onDialogCancel.bind(this)}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this._onDialogSubmit.bind(this)}
            />
          ];
      
          let menuStyle = {
            display: this.state.showMenu ? 'block': 'none',
            position: 'absolute',
            top: this.state.menuPosition.top,
            left: this.state.menuPosition.left,
            backgroundColor: '#F0F0F0'
          };
          
        return (

            <div>
                {!!this.state.tabs.length &&             
                    <div>
                        <Tabs
                        tabsClassNames={tabsClassNames}
                        tabsStyles={tabsStyles}
                        selectedTab={this.state.selectedTab ? this.state.selectedTab : 'tab2'}
                        onTabSelect={this.handleTabSelect.bind(this)}
                        onTabClose={this.handleTabClose.bind(this)}
                        onTabAddButtonClick={this.handleTabAddButtonClick.bind(this)}
                        onTabPositionChange={this.handleTabPositionChange.bind(this)}
                        shouldTabClose={this.shouldTabClose.bind(this)}
                        tabs={this.state.tabs}
                        shortCutKeys={
                            {
                            'close': ['alt+command+w', 'alt+ctrl+w'],
                            'create': ['alt+command+t', 'alt+ctrl+t'],
                            'moveRight': ['alt+command+tab', 'alt+ctrl+tab'],
                            'moveLeft': ['shift+alt+command+tab', 'shift+alt+ctrl+tab']
                            }
                        }
                        keepSelectedTab={true}
                        />
        
                        <div style={menuStyle}>
                            <Menu>
                                {this.state.contextTarget === 'tab0' ? '' : <MenuItem primaryText="Close" onClick={this.closeFromContextMenu.bind(this)}/>}
                                <MenuItem primaryText="Rename" onClick={this.renameFromContextMenu.bind(this)}/>
                                <MenuItem primaryText="Cancel" onClick={this.cancelContextMenu.bind(this)}/>
                            </Menu>
                        </div>
                        <Dialog
                        title="Change tab name"
                        ref="dialog"
                        actions={standardActions}
                        modal={true}
                        open={this.state.dialogOpen}
                        onShow={this._onDialogShow.bind(this)}>
                        <TextField
                            ref='input' id="rename-input" style={{width: '90%'}}/>
                        </Dialog>
                </div>}
               
            </div>
        );
  }
}

StreamTabs.childContextTypes = {
    muiTheme: PropTypes.object
};

export default StreamTabs;
