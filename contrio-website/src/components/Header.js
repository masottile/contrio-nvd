import React from 'react';
import PropTypes from 'prop-types'
import contrio_logo from '../images/contrio_logo.png'

const Header = ({ title }) => {
    return (
        <img src={contrio_logo}
        alt='Contrio Logo'
        style={{
            maxWidth: '100%',
            maxHeight: 'auto'
        }}/>
    )
};

Header.defaultProps = {
    title: ''
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;
