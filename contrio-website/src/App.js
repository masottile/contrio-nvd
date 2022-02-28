import { useState } from 'react';
import Header from './components/header/Header'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ContractTemplateSection from './components/contractTemplateSection/ContractTemplateSection'
import ContractComponentSection from './components/contractComponentSection/ContractComponentSection'
import AppContext from './components/AppContext';
import { sections } from './components/section/sections';
import React from 'react';

function App() {
  const [section, setSection] = useState('DEFAULT');

  const appContext = {
    currSection: section,
    setSection
  }

  return (
    <div className="App">
      <AppContext.Provider value={appContext}>
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ padding: 4 }}>
              <Grid item xs={12}>
                <Header />
              </Grid>
              <Grid item xs={8}>
                <ContractTemplateSection />
              </Grid>
              <Grid item xs={4}>
                <ContractComponentSection />
              </Grid>
            </Grid>
          </Box>
        </>
      </AppContext.Provider>
    </div>
  );
}

export default App;
