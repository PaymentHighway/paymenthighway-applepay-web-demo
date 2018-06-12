import React from 'react';
import PropTypes from 'prop-types';

const cartItemStyle = {
    marginBottom: "0.5em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}

const CartItem = ({ id, name, url, amount, currency }) => {
    return (
        <div style={cartItemStyle}>
            <div>
                <img src={url} className="img-thumbnail"  style={{width:"100px", height:"auto"}} alt={name}/>
                <span style={{marginLeft:"1em", verticalAlign:"middle"}}>{name}</span>
            </div>
            <div style={{fontWeight: "bold"}}>
                {Number(amount).toFixed(2)} {currency
            }</div>
        </div>
    );
}

CartItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired
}

export default CartItem
