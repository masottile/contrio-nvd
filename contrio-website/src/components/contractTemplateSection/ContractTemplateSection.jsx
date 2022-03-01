// drop section
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Section from '../section/Section';
import './contractTemplateSection.css';

const ContractTemplate = () => {
  return (
    <Grid container className='cts-container'>
      <Section
        key={"header"}
        title={"HEADER"}
      />
      <Section
        key={"agreement"}
        title={"AGREEMENT"}
      />
    </Grid>
    )
};

export default ContractTemplate;
