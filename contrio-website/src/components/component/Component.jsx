import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './component.css'

const Component = ({ sectionName, currContext }) => {    
    return <Grid item className='c-item' xs={12}>
        <h2 className='c-title'>{sectionName}</h2>
        <p></p>
    </Grid>
};

export default Component;
