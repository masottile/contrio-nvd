import React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';

import ContractDisplay from '../contractSectionDisplay/ContractSectionDisplay'
import ComponentDisplay from '../contractComponentDisplay/ContractComponentDisplay'

import AppContext from '../AppContext';
import ContractContext from '../ContractContext';

const ContractComponent = () => {
    const [section, setSection] = useState('DEFAULT');
    const [contract, setContract] = useState({});
    const [user, setUser] = useState(null);

    useEffect(() => {
        Object.keys(localStorage).forEach((key) => {
          const keySplit = key.split('.');
    
          if (keySplit[0] === 'CognitoIdentityServiceProvider' && keySplit[keySplit.length - 1] === 'userData') {
            const userData = JSON.parse(localStorage.getItem(key))
            setUser(userData)
            console.log(userData)
          }
        })
    }, [])

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
        // console.log(user.Username)
        const contractData = {'title': contract.title, 'freelancer': {'name' : contract.employee_name, 'id': user.Username}, 'c_name': contract.employer_name};
        // console.log(contractData)
        axios.post(`api/contracts/create`, {'userid': user.Username, 'contract': contractData}).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                console.log(response.data);
            }
        })
    }


    return (
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

    )
}

export default ContractComponent