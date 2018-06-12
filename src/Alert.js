import React from 'react';
import PropTypes from 'prop-types';

export const AlertType = { SUCCESS: 'alert-success', INFO: 'alert-info', WARNING: 'alert-warning', ERROR: 'alert-danger' };

const Alert = ({ text, type, spinner }) => {
    return (
        <div className={`alert ${type}`}>
            {spinner && (
                <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
            )}
            <p>{text}</p>
        </div>
    );
}

Alert.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    spinner: PropTypes.bool
}

export default Alert
