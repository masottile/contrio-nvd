import React from 'react';
import PropTypes from 'prop-types'
import contrio_logo from '../../images/contrio_logo.png'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <img src={contrio_logo}
                        alt='Contrio Logo'
                        style={{
                            maxWidth: '100%',
                            maxHeight: 'auto'
                        }} />
                </Grid>
                <Grid item xs={9}>
                    {/* todo:
                    1. sandwich menubar
                    2. quick access to profile page */}
                </Grid>
            </Grid>
        </Box>
    )
};

Header.defaultProps = {
    title: ''
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;
