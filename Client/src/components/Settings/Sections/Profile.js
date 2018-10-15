import React from 'react';
import Modal from "react-modal";
import GeoSuggest from "react-geosuggest";
import {updateProfile} from "../../../requests/profile";
import TimezoneSelectOptions from '../Fixtures/TimezoneOptions';
import {validateEmail, validateUrl} from "../../../utils/validator";

class Profile extends React.Component{

    state = {
        name: "",
        email: "",
        website: "",
        reason: "",
        topics: [],
        topic: "",
        locations: [],
        location: "",
        timezone: "",
        isTopicsModalOpen: false,
        isLocationsModalOpen: false,
        error: false,
        success: false
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

    onFieldChange = (e) => {
        const id = e.target.id;
        let state = Object.assign({}, this.state);
        state[id] = e.target.value;
        this.setState(() => (state));
    };

    onSubmit = (e) => {
        e.preventDefault();

        this.setState(() => ({
            error: false
        }));

        if(!validateEmail(this.state.email) || this.state.email === ""){
            this.setState(() => ({
                error: "Please fix the email!"
            }));

            return;
        }

        if(this.state.website !== "" && !validateUrl(this.state.website)){
            this.setState(() => ({
                error: "Please fix the website!"
            }));

            return;
        }

        if(this.state.name === ""){
            this.setState(() => ({
                error: "Name can't be empty!"
            }));

            return;
        }

        updateProfile({
            name: this.state.name,
            email: this.state.email,
            website: this.state.website,
            topics: this.state.topics,
            locations: this.state.locations,
            timezone: this.state.timezone,
            reason: this.state.reason
        }).then((response) => {
            this.setState(() => ({
                success: "Your profile information has been updated."
            }));
        }).catch((error) => {
            this.setState(() => ({
                error: "Something went wrong."
            }));
        });
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
                {this.state.error && 
                    <div className="alert alert-danger">{this.state.error}</div>
                }

                {this.state.success && 
                    <div className="alert alert-success">{this.state.success}</div>
                }
                <form onSubmit={(e) => this.onSubmit(e)} className="profile-form">
                    <div className="form-group shadow-box">
    
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="name">NAME</label>
                            <input type="text" className="form-control" onChange={(e) => this.onFieldChange(e)} id="name" value={this.state.name} placeholder="johndoe" />
                        </div>
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="email">EMAIL</label>
                            <input type="email" className="form-control" id="email" onChange={(e) => this.onFieldChange(e)} value={this.state.email} placeholder="johndoe@example.com" />
                        </div>
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="website">WEBSITE</label>
                            <input type="text" className="form-control" value={this.state.website} onChange={(e) => this.onFieldChange(e)} id="website" placeholder="www.example.com" />
                        </div>
        
                    </div>
        
        
                    <div className="form-group shadow-box">
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="name">I AM USING UNICLIX FOR</label>
                            <select type="text" value={this.state.reason} onChange={(e) => this.onFieldChange(e)} className="form-control" id="reason">
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
                            <label htmlFor="website">MY LOCATIONS</label>
                            <input type="text" className="form-control whiteBg" id="website" readOnly={true} value={this.state.locations.map(location => ` ${location.label}`)} onClick={this.toggleLocationsModal} placeholder="New York City, Amsterdam, Venice..." />
                        </div>
        
        
                        <div className="col-6 col-md-6 form-field">
                            <label htmlFor="name">TIMEZONE</label>
                            <select type="text" className="form-control" onChange={(e) => this.onFieldChange(e)} value={this.state.timezone} id="timezone">
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