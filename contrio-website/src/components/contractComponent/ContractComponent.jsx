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

/*
 * Main 'contract-creation' component that creates the contract and component displays 
 */



const ContractComponent = ({open, handleClose, contractObj}) => {
    const [section, setSection] = useState('DEFAULT');
    const [contract, setContract] = useState({});
    const [view, setView] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // set current user id
        Object.keys(localStorage).forEach((key) => {
          const keySplit = key.split('.');
    
          if (keySplit[0] === 'CognitoIdentityServiceProvider' && keySplit[keySplit.length - 1] === 'userData') {
            const userData = JSON.parse(localStorage.getItem(key))
            setUser(userData)
          }
        })

        // Check if this is Edit Mode or Create Mode
        if (contractObj.id !== undefined && contractObj.id !== null){
            setContract(contractObj.contract);
            setView(contractObj.signed);
        }

    }, [])

    const contractContext = {
        currentContract: contract,
        disableInput: view,
        setContract
    }

    const appContext = {
        currSection: section,
        setSection
    }

    const handleContractSubmit = (event) => {
        event.preventDefault();
        console.log(contract);
        console.log(contractContext.currentContract)
        const contractData = contractContext.currentContract;

        alert('Creating contract ' + contractData.title +  ' between ' + contractData.freelancer + ' and ' + contractData.client);

        if (contractObj.id !== undefined && contractObj.id !== null) {
            axios.put(`http://127.0.0.1:5000/api/contracts/edit/${user.Username}/${contractObj.id}`, contractData).then((response) => {
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