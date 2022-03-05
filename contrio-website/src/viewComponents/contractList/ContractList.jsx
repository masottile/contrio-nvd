import React from 'react';
import Grid from '@mui/material/Grid';

import './contractList.css'
import ContractPreview from '../contractPreview/ContractPreview'


const ContractList = ({ allContracts, currContext }) => {
    const contractArray = [];
    console.log(allContracts)
    Object.entries(allContracts).map(item => {
        console.log(item)
        let id = item[0]
        contractArray.push(
            <ContractPreview key={id} currContext={currContext} id={id} title={allContracts[id]['contract']['title']} desc={'spacer for short contract description'} />
        )
    });

    return <Grid container className='cl-container' xs={12}>
        {contractArray}
    </Grid>
};

export default ContractList;

