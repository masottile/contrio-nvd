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
import ContractComponent from './components/contractComponent/ContractComponent'

function App() {
  return (
    <div className="App">
      <ContractComponent/>
    </div>
  );
}

export default App;
