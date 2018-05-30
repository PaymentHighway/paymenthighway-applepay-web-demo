import React, { Component } from 'react';
import CartItem from './CartItem';
import PropTypes from 'prop-types';
import ApplePayButton from './ApplePayButton';
import Alert, { AlertType } from './Alert';
import { merchantIdentifier } from './PaymentConf';
import { performPayment, PaymentStatus } from './PaymentApi';

const ShoppingCartStatus = { READY: 0, PAYMENT_IN_PROGRESS: 1, PAYMENT_SUCCESS: 2 , PAYMENT_FAILURE: 3, PAYMENT_CANCEL: 4 };

const totalStyle = {
    fontWeight: "bold",
    fontSize: "1.4em",  
    lineHeight: "1.1em",
    textAlign: "right"
  }

class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.onCick = this.onCick.bind(this);
        this.state = {
            shoppingCardStatus: ShoppingCartStatus.READY
        }
        this.total = Number(this.props.products.reduce((total, item) => total+item.amount,0)).toFixed(2);
    }

    onCick() {
        this.setState({
            shoppingCardStatus: ShoppingCartStatus.PAYMENT_IN_PROGRESS
        });

        performPayment(
            this.props.currencyCode,
            this.props.products.map((item) => { return { label: item.name, amount: item.amount}}),
            "Payment Highway (Won't be charged)",
            this.total
        )
        .then( (paymentStatus) => {
            switch (paymentStatus) {
                case PaymentStatus.CANCEL:
                    this.setState({shoppingCardStatus: ShoppingCartStatus.PAYMENT_CANCEL});
                    break;
                case PaymentStatus.SUCCESS:
                    this.setState({shoppingCardStatus: ShoppingCartStatus.PAYMENT_SUCCESS});
                    break;
                default:
                    this.setState({shoppingCardStatus: ShoppingCartStatus.PAYMENT_FAILURE});
            }
        })
        .catch( (err) => {
            this.setState({shoppingCardStatus: ShoppingCartStatus.PAYMENT_FAILURE});
        })
    }

    render() {

        const alertMessage = () => {
            switch (this.state.shoppingCardStatus) {
                case ShoppingCartStatus.PAYMENT_IN_PROGRESS:
                    return (
                        <Alert text="Payment in progress..." type={AlertType.INFO} spinner={true}/>
                    )
                case ShoppingCartStatus.PAYMENT_SUCCESS:
                    return (
                        <Alert text="Payment successful" type={AlertType.SUCCESS}/>
                    )
                case ShoppingCartStatus.PAYMENT_CANCEL:
                    return (
                        <Alert text="Payment cancelled" type={AlertType.WARNING}/>
                    )
                case ShoppingCartStatus.PAYMENT_FAILURE:
                    return (
                        <Alert text="Payment failed" type={AlertType.ERROR}/>
                    )
                default:
                    return null;
            }    
        };

        const basket = this.state.shoppingCardStatus !== ShoppingCartStatus.PAYMENT_SUCCESS ? (
            <div>
                <div className="page-header" style={{marginTop: "0px"}}>
                    <h3>Shopping Cart</h3>
                </div>   
                <div className="panel panel-default">
                    <div className="panel-body">
                        {this.props.products.length > 0 && (
                            <div style={{marginBottom:"0.8em"}}>
                                {this.props.products.map(item => (
                                    <CartItem key={item.id} {...item} currency={this.props.currency} />
                                ))}
                            </div>
                        )}
                        {this.props.products.length === 0 && (
                            <div className="alert alert-info" role="alert">Cart is empty</div>
                        )}
                        <div style={totalStyle}>
                            Total: {this.total} {this.props.currency}
                        </div>
                    </div>
                </div>
                {this.state.shoppingCardStatus === ShoppingCartStatus.READY && (
                    <ApplePayButton merchantIdentifier={merchantIdentifier} onClick={this.onCick}/>                       
                )}
            </div>
        ) : (<div/>);

        return (  
            <div className="container theme-showcase" role="main">
                {alertMessage()}
                {basket}
            </div>
        );
    }
}

ShoppingCart.propTypes = {
    currency: PropTypes.string.isRequired,
    currencyCode: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired
};

export default ShoppingCart;