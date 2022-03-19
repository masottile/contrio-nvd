// drag section
import { useState, useContext } from 'react';
import SubSection from "../subsection/SubSection"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './contractComponentDisplay.css'
import AppContext from "../context/AppContext";
import { defaultSections, customSections } from '../section/sections';

const ComponentDisplay = () => {
    const context = useContext(AppContext);

    return (
        <Grid container className='ces-container'>
            {context.currSection === defaultSections.header && (
                <SubSection className='ces-header' key={"HEADER"} sectionName={defaultSections.header} sectionTitle={"Header Section"} currContext={context} />
            )}
            {context.currSection === defaultSections.agreement && (
                <SubSection className='ces-agreement' key={"AGREEMENT"} sectionName={defaultSections.agreement} sectionTitle={"Agreement Section"} currContext={context} />
            )}
        </Grid>
    )
};

export default ComponentDisplay;
