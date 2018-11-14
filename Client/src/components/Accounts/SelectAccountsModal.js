import React from 'react';
import Modal from 'react-modal';

const SelectAccountsModal = ({isOpen}) => (
    <Modal
    isOpen={isOpen}
    ariaHideApp={false}
    className="account-select-modal"
    >       

        <div className="center-inline p10 m10-top">
            Select Accounts
        </div>
        <div className="form-group center-inline account-items-wrapper">
            <div className="account-item-container">
                <div>
                    <img src="https://uniclix.test/images/uniclix.png"></img>
                </div>
                <h5 className="ps10">Name Lastname</h5>
                <div className="add-btn action-btn">
                    <i className="fa fa-plus-circle"></i>
                </div>
            </div>
        </div>
        <div className="center-inline p10 m10-top">
        
        </div>

    </Modal>
);

export default SelectAccountsModal;