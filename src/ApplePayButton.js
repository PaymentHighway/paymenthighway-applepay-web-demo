import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isApplePayAvailable } from './PaymentApi';

const ApplePayButtonStatus = { UNKNOWN: 0, AVAILABLE: 1, NOT_AVAILABLE: 2 };

class ApplePayButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            applePayButtonStatus: ApplePayButtonStatus.UNKNOWN
        }
    }

    componentWillMount() {
        isApplePayAvailable()
            .then((canMakePayments) => {
                this.setState({
                    applePayButtonStatus: canMakePayments ? ApplePayButtonStatus.AVAILABLE : ApplePayButtonStatus.NOT_AVAILABLE
                })    
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    applePayButtonStatus: ApplePayButtonStatus.NOT_AVAILABLE
                })                
            })
    }

    render() {
        let getButton = () => {
            switch(this.state.applePayButtonStatus) {
                case ApplePayButtonStatus.UNKNOWN:
                    return (
                        <div className="text-muted text-center"> Checking Apple Pay... </div>
                    )
                case ApplePayButtonStatus.AVAILABLE:
                    return (
                        <div className="text-center">
                            <div className="apple-pay-button apple-pay-button-black" id="apple-pay" onClick={ this.props.onClick }></div>
                        </div>
                    )
                case ApplePayButtonStatus.NOT_AVAILABLE:
                    return (
                        <div className="text-muted text-center" id="apple-pay-activation">Apple Pay inactive on your device.</div>
                    )
                default: 
                    return (
                        <div> Invalid status!!! </div>
                    )
            }    
        }
        return (
            <div className="row" id="apple-pay-row">
                {getButton()}
            </div>
        );
    }
}

ApplePayButton.propTypes = {
    merchantIdentifier: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ApplePayButton;
