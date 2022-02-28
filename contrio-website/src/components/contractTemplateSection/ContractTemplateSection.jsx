// drop section
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Section from '../section/Section';
import './contractTemplateSection.css';

const ContractTemplate = () => {
  return <Box className='cts-box' sx={{ flexGrow: 1 }}>
    <Grid container className='cts-container' spacing={2}>
      <Section
        key={"header"}
        title={"HEADER"}
      />
      {/* <Section
        key={"agreement"}
        title={"AGREEMENT"}
      /> */}
    </Grid>
  </Box>;
};

export default ContractTemplate;
