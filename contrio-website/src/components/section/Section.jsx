import React, { useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Component from "../component/Component";
import './section.css'
import AppContext from '../AppContext';

const Section = ({ title }) => {
  const context = useContext(AppContext);

  // const handleOnClick = useEffect(() => {  }, []);

  return <Grid item className='s-item' onClick={() => {context.setSection(title)}} xs={12}>
  </Grid>
}

export default Section