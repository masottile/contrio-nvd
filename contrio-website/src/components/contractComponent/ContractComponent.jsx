import React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Dialog } from '@mui/material';
import axios from 'axios';

import ContractDisplay from '../contractSectionDisplay/ContractSectionDisplay'
import ComponentDisplay from '../contractComponentDisplay/ContractComponentDisplay'
import { defaultElements, customElements } from '../element/elements';

import AppContext from '../context/AppContext';
import ContractContext from '../context/ContractContext';
import ElementContext from '../context/ElementContext';
import SectionContext from '../context/SectionContext';

/*
 * Main 'contract-creation' component that creates the contract and component displays 
 */

const ContractComponent = ({ open, handleClose, contractObj }) => {
    const [selectedSection, setSelectedSection] = useState('DEFAULT');
    const [section, setSection] = useState({});
    const [contract, setContract] = useState({});
    const [elements, setElements] = useState({});
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
        if (contractObj.id !== undefined && contractObj.id !== null) {
            setContract(contractObj.contract);
            setView(contractObj.signed);
        }

        //TODO: reset the current elements to reflect either the default or what is part of this contract
        // coping the defaultElements object keeps updates to setElements from affecting the stored value of defaultElements
        const copyDefault = JSON.parse(JSON.stringify(defaultElements));
        setElements(copyDefault);

    }, []);

    const contractContext = {
        currentContract: contract,
        disableInput: view,
        setContract
    }

    const appContext = {
        currSelectedSection: selectedSection,
        setSelectedSection
    }

    const elementContext = {
        currentElements: elements,
        setElements
    }

    const sectionContext = {
        currSection: section,
        setSection
    }

    // submit contract details to backend
    const handleContractSubmit = (event) => {
        event.preventDefault();
        const contractData = contractContext.currentContract;

        alert('Creating contract ' + contractData.title + ' between ' + contractData.freelancer + ' and ' + contractData.client);

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
                    <SectionContext.Provider value={sectionContext}>
                        <ElementContext.Provider value={elementContext}>
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
                        </ElementContext.Provider>
                    </SectionContext.Provider>
                </AppContext.Provider>
            </ContractContext.Provider>
        </Dialog>
    )
}

export default ContractComponent