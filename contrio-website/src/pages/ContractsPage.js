import { Button, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
// import Form from '../components/Form'
import ContractComponent from '../components/contractComponent/ContractComponent'
import ViewContractsTable from "../components/viewContracts/ViewContractsTable";
import ViewContext from '../components/ViewContext';
import axios from 'axios';

// const ViewPage = () => 
function ContractsPage() {
    const [openCreateForm, setCreateForm] = useState(false);
    const [user, setUser] = useState(null);
    const [contractID, setContractID] = useState("");
    const [allContracts, setAllContracts] = useState([]);

    const handleCloseForm = () => {
        setCreateForm(false);
    }

    const viewContext = {
        currContractID: contractID,
        setContractID,
        listContracts: allContracts
    }

    useEffect(() => {
        // figure out the user
        let userData = null;
        Object.keys(localStorage).forEach((key) => {
          const keySplit = key.split('.');
    
          if (keySplit[0] === 'CognitoIdentityServiceProvider' && keySplit[keySplit.length - 1] === 'userData') {
            userData = JSON.parse(localStorage.getItem(key));
            setUser(userData);
          }
        })
        // console.log(userData)

        // retrieve all of that user's contracts
        // axios.get(`api/contracts/retrieve/${userData.Username}`).then((response) => {
        axios.get(`http://127.0.0.1:5000/api/contracts/retrieve/${userData.Username}`).then((response) => {
            console.log(response)
            if (response.status === 200) {
                // console.log(response.data);
                setAllContracts(response.data['items'])
            }
        })
    }, []);

    console.log(allContracts)
    
    return (
        <ViewContext.Provider value={viewContext}>
        <Paper>
            {openCreateForm && <ContractComponent open={openCreateForm} handleClose={handleCloseForm}/>}
            <Button variant="contained" style={{ margin: '1rem 1.5rem 1rem 1rem', alignSelf: 'right', float: 'right' }} onClick={() => {setCreateForm(true)}}>Create Contract</Button>
            <Typography style={{ textAlign:'left', float: 'left', fontSize: '25px', fontWeight: 'bold', margin :'1rem 0 0 1rem',}}>
                Contracts
            </Typography>
            <ViewContractsTable />
        </Paper>
        </ViewContext.Provider>
    );
}

export default ContractsPage;