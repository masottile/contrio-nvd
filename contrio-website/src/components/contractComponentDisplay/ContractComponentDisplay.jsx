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

    const createSubSection = () => {
        const arr = [];

        Object.entries(defaultSections).map(item => {
            if (context.currSection === item[1].title) {
                console.log(item);
                arr.push(
                    <SubSection className={`ces-${item[0]}`}
                        key={item[1].id}
                        sectionName={item[1].title}
                        sectionTitle={item[1].component_title} 
                        currContext={context} />
                );
            }
        })

        return arr;
    }

    return (
        <Grid container className='ces-container'>
            {createSubSection()}
        </Grid>
    )
};

export default ComponentDisplay;
