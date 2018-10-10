import React from 'react';
import Modal from "react-modal";
import GeoSuggest from "react-geosuggest";
import TimezoneSelectOptions from '../Fixtures/TimezoneOptions';

class Profile extends React.Component{

    state = {
        topics: [],
        topic: "",
        locations: [],
        location: "",
        isTopicsModalOpen: false,
        isLocationsModalOpen: false,
    };

    toggleTopicsModal = () => {
        this.setState(() => ({
            isTopicsModalOpen: !this.state.isTopicsModalOpen
        }));
    };

    onTopicsFieldChange = (topic) => {
        this.setState(() => ({
            topic
        }));
    };

    onLocationsFieldChange = (location) => {
        console.log(location);
        this.setState(() => ({
            location
        }));
    };

    toggleLocationsModal = () => {
        this.setState(() => ({
            isLocationsModalOpen: !this.state.isLocationsModalOpen
        }));
    };

    addTopic = (e) => {
        e.preventDefault();
        if(this.state.topic){
            this.setState((prevState) => {
                return {
                    topics: [
                        ...prevState.topics.filter(topic => topic !== prevState.topic),
                        prevState.topic
                    ],
                    topic: ""}
            });
        }
    };

    addLocation = (e) => {
        e.preventDefault();
        if(this.state.location){
            this.setState((prevState) => {
                return {
                    locations: [
                        ...prevState.locations.filter(location => JSON.stringify(location) !== JSON.stringify(prevState.location)),
                        prevState.location
                    ],
                    location: ""}
            });
        }
    };

    removeTopic = (index) => {
        let topics = [...this.state.topics];
        topics.splice(index, 1);

        this.setState(() => ({
            topics
        }));
    };

    removeLocation = (index) => {
        let locations = [...this.state.locations];
        locations.splice(index, 1);

        this.setState(() => ({
            locations
        }));
    };

    render(){
        return (
            <div>

                <Modal
                    isOpen={this.state.isTopicsModalOpen}
                    ariaHideApp={false}
                >       
                    <form onSubmit={(e) => this.addTopic(e)}>  
                        <div className="form-group flex_container-center">
                            <div>
                                {this.state.topics.length >= 15 ?
                                    <input disabled type="text" className="form-control" onChange={(e) => this.onTopicsFieldChange(e.target.value)} value={this.state.topic} placeholder="food, pets, fashion..." /> 
                                :
                                    <input type="text" className="form-control" onChange={(e) => this.onTopicsFieldChange(e.target.value)} value={this.state.topic} placeholder="food, pets, fashion..." /> 
                                }
                                
                            </div>
                            <div>
                                <button className="btn btn-default right-radius">Add</button>
                            </div>
                        </div>
                    </form>

                        
                        {!!this.state.topics.length && this.state.topics.map((topic, index) => (
                          <div key={index} className="addedItemLabels">{topic} <span className="fa fa-times link-cursor" onClick={() => this.removeTopic(index)}></span></div>  
                        ))}
                        
                        <div className="center-inline top-border p10 m10-top">
                            <button className="upgrade-btn" onClick={this.toggleTopicsModal}>Save</button>
                        </div>
                </Modal>


                <Modal
                    isOpen={this.state.isLocationsModalOpen}
                    ariaHideApp={false}
                >       
                    <form onSubmit={(e) => this.addLocation(e)}>  
                        <div className="form-group flex_container-center">
                            <div>
                                <GeoSuggest 
                                    onSuggestSelect={this.onLocationsFieldChange}
                                    initialValue={this.state.location && this.state.location.label}
                                    disabled={this.state.locations.length >= 5 ? true : false}
                                />
                            </div>
                            <div>
                                <button className="btn btn-default right-radius">Add</button>
                            </div>
                        </div>
                    </form>

                        
                        {!!this.state.locations.length && this.state.locations.map((location, index) => (
                        <div key={index} className="addedItemLabels">{location.label} <span className="fa fa-times link-cursor" onClick={() => this.removeLocation(index)}></span></div>  
                        ))}
                        
                        <div className="center-inline top-border p10 m10-top">
                            <button className="upgrade-btn" onClick={this.toggleLocationsModal}>Save</button>
                        </div>
                </Modal>

                <h2>PROFILE</h2>
        
                <form className="profile-form">
                    <div className="form-group shadow-box">
    
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="name">NAME</label>
                            <input type="text" className="form-control" id="name" placeholder="johndoe" />
                        </div>
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="email">EMAIL</label>
                            <input type="email" className="form-control" id="email" placeholder="johndoe@example.com" />
                        </div>
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="website">WEBSITE</label>
                            <input type="text" className="form-control" id="website" placeholder="www.example.com" />
                        </div>
        
                    </div>
        
        
                    <div className="form-group shadow-box">
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="name">I AM USING UNICLIX FOR</label>
                            <select type="text" className="form-control" id="reason">
                                <option>Myself</option>
                                <option>My Business</option>
                                <option>My Clients</option>
                            </select>
                        </div>
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="topics">MY TOPICS</label>
                            <input type="text" className="form-control whiteBg" id="topics" readOnly={true} onClick={this.toggleTopicsModal} value={this.state.topics.map(topic => ` ${topic}`)} placeholder="food, pets, fashion..." />
                        </div>
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="website">WEBSITE</label>
                            <input type="text" className="form-control" id="website" placeholder="www.example.com" />
                        </div>
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="website">MY LOCATIONS</label>
                            <input type="text" className="form-control whiteBg" id="website" readOnly={true} value={this.state.locations.map(location => ` ${location.label}`)} onClick={this.toggleLocationsModal} placeholder="New York City, Amsterdam, Venice..." />
                        </div>
        
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="name">TIMEZONE</label>
                            <select type="text" className="form-control" id="timezone">
                                {TimezoneSelectOptions.map((timezone, index) => (
                                    <option key={index} value={timezone.value}>{timezone.name}</option>
                                ))}
                            </select>
                        </div>
                        
                    </div>
        
                    <div>
                        <button className="upgrade-btn pull-right">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;