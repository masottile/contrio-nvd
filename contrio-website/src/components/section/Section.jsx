import React, { useState, useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Component from "../component/Component";
import './section.css'
import AppContext from '../AppContext';
import ContractContext from '../ContractContext'

const Section = ({ title }) => {
  // const [values, setValues] = useState({}); <------------ TODO: will most likely need to use state to update values inside section

  const context = useContext(AppContext);
  const contractContext = useContext(ContractContext);

  // todo ----- will need to iterate through the state (javascript object)
  return <Grid item className='s-item' onClick={() => {context.setSection(title)}} xs={12}>
    {contractContext.currentContract.title} 
  </Grid>
}

export default Section