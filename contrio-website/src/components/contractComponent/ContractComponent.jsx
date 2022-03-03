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

    const handleContractSubmit = (event) => {
        event.preventDefault();
        alert('Creating contract ' + contract.title +  ' between ' + contract.employer_name + ' and ' + contract.employee_name);
        axios.post(`http://127.0.0.1:5000/api/contracts/create`, {'f_name': contract.employee_name, 'c_name': contract.employer_name, 'title': contract.title}).then((response) => {
            console.log("submitted post request and got a response");
            console.log(response.status);
            if (response.status === 200) {
                console.log(response.data);
            }
        })
        // axios.post(`api/contracts/create`, contract).then((response) => {
        //     console.log("submitted post request and got a response");
        //     console.log(response.status);
        //     if (response.status === 200) {
        //         console.log(response.data);
        //     }
        // })
        // would also be good to figure out how to display and returned data (e.g. get backend to return the id of the contract just created)
    }


    return (
        <ContractContext.Provider value={contractContext}>
            <AppContext.Provider value={appContext}>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                    <Grid className='cc-header' item xs={12}>
                        <Header />
                    </Grid>
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

    )
}

export default ContractComponent