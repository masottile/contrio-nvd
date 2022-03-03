// drag section
import { useState, useContext } from 'react';
import SubSection from "../subsection/SubSection"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './contractComponentDisplay.css'
import AppContext from "../AppContext";

const ComponentDisplay = ({ sectionName }) => {
    const context = useContext(AppContext);

    return (
        <Grid container className='ces-container'>
            {context.currSection === "HEADER" && (
                <SubSection className='ces-header' key={"element"} sectionName={"Header Section"} currContext={context} />
            )}
            {context.currSection === "AGREEMENT" && (
                <SubSection className='ces-agreement' key={"element"} sectionName={"Agreement Section"} currContext={context} />
            )}

        </Grid>
    )
};

export default ComponentDisplay;
