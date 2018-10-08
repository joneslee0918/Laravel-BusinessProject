import React from 'react';
import TimezoneSelectOptions from '../Fixtures/TimezoneOptions';

const Profile = () => (
    <div>

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
                    <input type="text" className="form-control" id="email" placeholder="food, pets, fashion..." />
                </div>

                <div className="col-6 col-md-6 form-field">
                    <label htmlFor="website">WEBSITE</label>
                    <input type="text" className="form-control" id="website" placeholder="www.example.com" />
                </div>

                <div className="col-6 col-md-6 form-field">
                    <label htmlFor="website">MY LOCATIONS</label>
                    <input type="text" className="form-control" id="website" placeholder="New York City, Amsterdam, Venice..." />
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
        </form>
    </div>
);

export default Profile;