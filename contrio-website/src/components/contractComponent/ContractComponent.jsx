import React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Dialog } from '@mui/material';
import axios from 'axios';

import ContractDisplay from '../contractSectionDisplay/ContractSectionDisplay'
import ComponentDisplay from '../contractComponentDisplay/ContractComponentDisplay'

import AppContext from '../AppContext';
import ContractContext from '../ContractContext';
import ViewContext from '../ViewContext';

const ContractComponent = ({open, handleClose}) => {
    const [section, setSection] = useState('DEFAULT');
    const [contract, setContract] = useState({});
    const [user, setUser] = useState(null);

    useEffect(() => {
        // set current user id
        Object.keys(localStorage).forEach((key) => {
          const keySplit = key.split('.');
    
          if (keySplit[0] === 'CognitoIdentityServiceProvider' && keySplit[keySplit.length - 1] === 'userData') {
            const userData = JSON.parse(localStorage.getItem(key))
            setUser(userData)
            console.log(userData)
          }
        })

        //TODO
        // check if this is a request to edit a contract rather than create one from scratch.
        // the context ViewContext may or may not contain a contract id (and it will contain a list of all contracts associated with this user)
        // we simply need to check for this contract id and if it is not an empty string, set the ContractContext to hold all values from this contract
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
        // need to figure out the contract json structure here. Can we just copy contract?
        const contractData = {'title': contract.title, 'freelancer': contract.employee_name, 'client': contract.employer_name, 'date': contract.contract_date};
        // console.log(contractData)
        // axios.post(`api/contracts/create`, {'userid': user.Username, 'contract': contractData}).then((response) => {
        axios.post(`http://127.0.0.1:5000/api/contracts/create/${user.Username}`, contractData).then((response) => {
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