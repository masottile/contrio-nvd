// drag section
import { useState, useContext } from 'react';
import Component from "../component/Component"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './contractComponentSection.css'
import AppContext from "../AppContext";

const ContractComponentSection = ({ sectionName }) => {
    const context = useContext(AppContext);

    return (
        <Grid container className='ces-container'>
            {context.currSection === "HEADER" && (
                <Component className='ces-header' key={"element"} sectionName={"Header Section"} currContext={context} />
            )}
            {context.currSection === "AGREEMENT" && (
                <Component className='ces-agreement' key={"element"} sectionName={"Agreement Section"} currContext={context} />
            )}

        </Grid>
    )
};

export default ContractComponentSection;
