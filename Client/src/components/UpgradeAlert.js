import React from 'react';
import SweetAlert from "sweetalert2-react";
import { withRouter } from 'react-router';

class UpgradeAlert extends React.Component {

    redirectToBilling = () => {
        return this.props.history.push(`/settings/billing`);
    };

    redirectBack = () => {
        return this.props.history.goBack();
    };

    render(){
        const {isOpen, text = "You need to upgrade to use this feature.", goBack, setForbidden} = this.props;
        return (
            <SweetAlert
                show={isOpen}
                title={`Upgrade required`}
                text={text}
                showCancelButton
                type="info"
                confirmButtonText="Upgrade"
                cancelButtonText="No thanks"
                onConfirm={() => {
                    setForbidden(false);
                    return this.redirectToBilling();
                }}
                onCancel={() => {
                    setForbidden(false);
                    if(goBack) return this.redirectBack();
                    return;
                }}
            />   
        );
    }     
}

export default withRouter(UpgradeAlert);