import { Button, Paper, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
// import Form from '../components/Form'
import ContractComponent from '../components/contractComponent/ContractComponent'
import ViewContractsTable from "../components/viewContracts/ViewContractsTable";
import ViewContext from '../components/context/ViewContext';
import axios from 'axios';

function ContractsPage() {
    const [user, setUser] = useState();
    const [openCreateForm, setCreateForm] = useState(false);
    const [contract, setContract] = useState({});
    const [allContracts, setAllContracts] = useState([]);

    const handleCloseForm = () => {
        setCreateForm(false);
    }

    const viewContext = {
        currContract: contract,
        setContract,
        listContracts: allContracts,
        setAllContracts,
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
        // retrieve all of that user's contracts
        // axios.get(`api/contracts/retrieve/${userData.Username}`).then((response) => {
        axios.get(`http://127.0.0.1:5000/api/contracts/retrieve/${userData.Username}`).then((response) => {
            console.log(response)
            if (response.status === 200) {
                setAllContracts(response.data['items'])
            }
        })
    }, []);

    console.log(allContracts)
    
    return (
        <ViewContext.Provider value={viewContext}>
        <Paper>
            {openCreateForm && <ContractComponent open={openCreateForm} handleClose={handleCloseForm} contractObj={{}}/>}
            <Button variant="contained" style={{ margin: '1rem 1.5rem 1rem 1rem', alignSelf: 'right', float: 'right' }} onClick={() => {setCreateForm(true)}}>Create Contract</Button>
            <Typography style={{ textAlign:'left', float: 'left', fontSize: '25px', fontWeight: 'bold', margin :'1rem 0 0 1rem',}}>
                Contracts
            </Typography>
            <ViewContractsTable user={user}/>
        </Paper>
        </ViewContext.Provider>
    );
}

export default ContractsPage;