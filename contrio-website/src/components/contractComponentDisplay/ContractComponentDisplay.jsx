// drag section
import { useState, useContext } from 'react';
import SubSection from "../subsection/SubSection"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './contractComponentDisplay.css'
import AppContext from "../context/AppContext";
import CustomContext from '../context/CustomContext';
import { defaultSections, customSections } from '../section/sections';

const ComponentDisplay = () => {
    const context = useContext(AppContext);
    const customContext = useContext(CustomContext);
    console.log(context.currSelectedSection)

    const createSubSection = () => {
        const arr = [];


        Object.entries(customContext.currentSections).forEach(item => {
            if (context.currSelectedSection === item[1].id) {
                arr.push(
                    <SubSection className={`ces-${item[0]}`}
                        key={item[1].id}
                        sectionID={item[1].id}
                        sectionTitle={item[1].title} 
                        currContext={context}
                        allowCustomInputs={item[1].allowCustom} />
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
