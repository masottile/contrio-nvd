import React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Dialog } from '@mui/material';
import axios from 'axios';

import ContractDisplay from '../contractSectionDisplay/ContractSectionDisplay'
import ComponentDisplay from '../contractComponentDisplay/ContractComponentDisplay'
import { defaultSections, customSections } from '../section/sections';
import { defaultElements, customElements } from '../element/elements';

// App Context keeps track of what section has been selected for a detailed view/edit
import AppContext from '../context/AppContext';
// ContractContext stores the user entered or DB retrieved contract data
import ContractContext from '../context/ContractContext';
// Element Context keeps track of any custom elements or sections
import CustomContext from '../context/CustomContext';

/*
 * Main 'contract-creation' component that creates the contract and component displays 
 */

const ContractComponent = ({ open, handleClose, contractObj }) => {
    const [selectedSection, setSelectedSection] = useState('DEFAULT');
    const [sections, setSections] = useState({});
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

        //Reset current Sections to just be the default sections
        // coping the defaultElements object keeps updates to setElements from affecting the stored value of defaultElements
        const copyDefaultSections = JSON.parse(JSON.stringify(defaultSections));
        setSections(copyDefaultSections);
        
        //Reset current Elements to just be the default elements
        // coping the defaultElements object keeps updates to setElements from affecting the stored value of defaultElements
        const copyDefaultElements = JSON.parse(JSON.stringify(defaultElements));
        setElements(copyDefaultElements);

        // Check if this is Edit Mode or Create Mode
        if (contractObj.id !== undefined && contractObj.id !== null) {
            // We have contract data and need to deal with it
            setContract(contractObj.contract);
            setView(contractObj.signed);

            //TODO: add any stored custom elements/sections to our current elements
        }

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

    const customContext = {
        currentElements: elements,
        currentSections: sections,
        setElements,
        setSections
    }

    // const sectionContext = {
    //     currSection: section,
    //     setSection
    // }

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
                    <CustomContext.Provider value={customContext}>
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
                    </CustomContext.Provider>
                </AppContext.Provider>
            </ContractContext.Provider>
        </Dialog>
    )
}

export default ContractComponent