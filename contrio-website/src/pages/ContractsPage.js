import { Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
// import Form from '../components/Form'
import ContractComponent from '../components/contractComponent/ContractComponent'
import ViewContractsTable from "../components/viewContracts/ViewContractsTable";

function ContractsPage() {
    const [openCreateForm, setCreateForm] = useState(false);

    const handleCloseForm = () => {
        setCreateForm(false);
    }
    
    return (
        <Paper>
            {openCreateForm && <ContractComponent open={openCreateForm} handleClose={handleCloseForm}/>}
            <Button variant="contained" style={{ margin: '1rem 1.5rem 1rem 1rem', alignSelf: 'right', float: 'right' }} onClick={() => {setCreateForm(true)}}>Create Contract</Button>
            <Typography style={{ textAlign:'left', float: 'left', fontSize: '25px', fontWeight: 'bold', margin :'1rem 0 0 1rem',}}>
                Contracts
            </Typography>
            <ViewContractsTable />
        </Paper>
    );
}

export default ContractsPage;