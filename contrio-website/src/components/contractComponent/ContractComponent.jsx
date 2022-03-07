import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';

import Header from '../header/Header';
import ContractDisplay from '../contractSectionDisplay/ContractSectionDisplay'
import ComponentDisplay from '../contractComponentDisplay/ContractComponentDisplay'

import AppContext from '../AppContext';
import ContractContext from '../ContractContext';
import { Dialog } from '@mui/material';

const ContractComponent = ({open, handleClose}) => {
    const [section, setSection] = useState('DEFAULT');
    const [contract, setContract] = useState({});

    const styles = {
        dialogPaper: {
            minHeight: '80vh',
            maxHeight: '80vh',
            minWidth: '1000px',
        },
    };

    const contractContext = {
        currentContract: contract,
        setContract
    }

    const appContext = {
        currSection: section,
        setSection
    }

    const handleContractSubmit = (event) => {
        event.preventDefault();
        alert('Creating contract ' + contract.title +  ' between ' + contract.employer_name + ' and ' + contract.employee_name);
        axios.post(`api/contracts/create`, {'f_name': contract.employee_name, 'c_name': contract.employer_name, 'title': contract.title}).then((response) => {
            console.log("submitted post request and got a response");
            console.log(response.status);
            if (response.status === 200) {
                console.log(response.data);
            }
        })
    }


    return (
        <Dialog fullWidth maxWidth='xl' open={open} onClose={handleClose}>
            <ContractContext.Provider value={contractContext}>
            <AppContext.Provider value={appContext}>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                    <Grid className='cc-template' item xs={8}>
                        <ContractDisplay />
                    </Grid>
                    <Grid className='cc-component' item xs={4}>
                        <ComponentDisplay />
                    </Grid>
                    <Grid className='cc-button' item xs={2}>
                        <form onSubmit={handleContractSubmit}>
                            <input type='submit' value='Submit' />
                        </form>    
                    </Grid>
                </Grid>
            </AppContext.Provider>
        </ContractContext.Provider>
        </Dialog>

    )
}

export default ContractComponent