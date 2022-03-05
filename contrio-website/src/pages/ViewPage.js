import React from "react";
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';

import ViewContext from '../viewComponents/ViewContext';


const ViewPage = () => {
    const [user, setUser] = useState(null);
    const [contractID, setContractID] = useState("");
    const [allContracts, setAllContracts] = useState({});

    useEffect(() => {
        // figure out the user
        let userData = null;
        Object.keys(localStorage).forEach((key) => {
          const keySplit = key.split('.');
    
          if (keySplit[0] === 'CognitoIdentityServiceProvider' && keySplit[keySplit.length - 1] === 'userData') {
            userData = JSON.parse(localStorage.getItem(key))
            setUser(userData)
            // console.log(userData)
          }
        })

        // console.log(userData)

        // retrieve all of that user's contracts
        axios.get(`api/contracts/retrieve/${userData.Username}`).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                let items = response.data['items']
                let contractObj = {}
                items.forEach(function (contract, index, arr){
                    console.log(contract);
                    contractObj[contract.id] = contract
                })
                setAllContracts(contractObj)
            }
        })
    }, [])

    const viewContext = {
        currContractID: contractID,
        setContractID
    }

    return (
        <ViewContext.Provider value={viewContext}>
            <Grid container spacing={2} sx={{ padding: 4 }}>
                <Grid className='vp-list' item xs={4}>
                    {'will list all contracts'}
                </Grid>
                <Grid className='vp-contract' item xs={8}>
                    {'will display details and options for each contract'}
                </Grid>
            </Grid>
        </ViewContext.Provider>
    );
}

export default ViewPage;