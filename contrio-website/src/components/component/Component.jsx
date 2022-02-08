import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './component.css'

const Component = ({ status, icon, name, desc, type, enf }) => {
    return <Grid item xs={6}>
        <Grid container spacing={1} className='c-card'>
            <Grid item xs={4} className="c-iconspace">
                {/* <img src={icon} alt="icon" className='c-icon' /> */}
            </Grid>
            <Grid item xs={8} className="c-titlespace">
                {name};
            </Grid>
        </Grid>

    </Grid>;
};

export default Component;
