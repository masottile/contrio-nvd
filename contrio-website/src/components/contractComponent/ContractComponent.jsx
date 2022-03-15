import React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Dialog } from '@mui/material';
import axios from 'axios';

import ContractDisplay from '../contractSectionDisplay/ContractSectionDisplay'
import ComponentDisplay from '../contractComponentDisplay/ContractComponentDisplay'

import AppContext from '../AppContext';
import ContractContext from '../ContractContext';

const ContractComponent = ({open, handleClose, view, contractObj}) => {
    const [section, setSection] = useState('DEFAULT');
    if (contractObj === undefined || contractObj === null) contractObj = {};
    if (view === undefined || view === null) view = false; 
    const [contract, setContract] = useState(contractObj);
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
        currentContract: contract.contract ?? {},
        disableInput: view,
        setContract
    }

    const appContext = {
        currSection: section,
        setSection
    }

    const handleContractSubmit = (event) => {
        event.preventDefault();
        const contractData = contractContext.currentContract;

        alert('Creating contract ' + contractData.title +  ' between ' + contractData.freelancer + ' and ' + contractData.client);

        if (contract.id !== undefined && contract.id !== null) {
            axios.put(`http://127.0.0.1:5000/api/contracts/edit/${user.Username}/${contract.id}`, contractData).then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                }
            })
        } else {
            axios.post(`http://127.0.0.1:5000/api/contracts/create/${user.Username}`, contractData).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                console.log(response.data);
            }
        })
        }
        handleClose();
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
                        {!view && <form onSubmit={handleContractSubmit}>
                            <input type='submit' value='Submit' />
                        </form>}  
                    </Grid>
                </Grid>
            </AppContext.Provider>
        </ContractContext.Provider>
        </Dialog>

    )
}

export default ContractComponent