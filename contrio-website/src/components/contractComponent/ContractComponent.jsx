import { useState } from 'react';
import Header from '../header/Header';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ContractTemplateSection from '../contractTemplateSection/ContractTemplateSection'
import ContractComponentSection from '../contractComponentSection/ContractComponentSection'
import AppContext from '../AppContext';
import React from 'react';
import ContractContext from '../ContractContext';

const ContractComponent = () => {
    const [section, setSection] = useState('DEFAULT');
    const [contract, setContract] = useState({});

    const contractContext = {
        currentContract: contract,
        setContract
    }

    const appContext = {
        currSection: section,
        setSection
    }

    return (
        <ContractContext.Provider value={contractContext}>
            <AppContext.Provider value={appContext}>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                    <Grid className='cc-header' item xs={12}>
                        <Header />
                    </Grid>
                    <Grid className='cc-template' item xs={8}>
                        <ContractTemplateSection />
                    </Grid>
                    <Grid className='cc-component' item xs={4}>
                        <ContractComponentSection />
                    </Grid>
                </Grid>
            </AppContext.Provider>
        </ContractContext.Provider>

    )
}

export default ContractComponent