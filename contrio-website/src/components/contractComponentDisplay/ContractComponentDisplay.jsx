// drag section
import { useState, useContext } from 'react';
import SubSection from "../subsection/SubSection"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './contractComponentDisplay.css'
import AppContext from "../AppContext";
import { sections } from '../section/sections';

const ComponentDisplay = () => {
    const context = useContext(AppContext);

    return (
        <Grid container className='ces-container'>
            {context.currSection === sections.header && (
                <SubSection className='ces-header' key={"HEADER"} sectionName={sections.header} sectionTitle={"Header Section"} currContext={context} />
            )}
            {context.currSection === sections.agreement && (
                <SubSection className='ces-agreement' key={"AGREEMENT"} sectionName={sections.agreement} sectionTitle={"Agreement Section"} currContext={context} />
            )}
        </Grid>
    )
};

export default ComponentDisplay;
