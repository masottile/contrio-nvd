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
            if (context.currSelectedSection === item[1].title) {
                arr.push(
                    <SubSection className={`ces-${item[0]}`}
                        key={item[1].id}
                        sectionName={item[1].title}
                        sectionTitle={item[1].component_title} 
                        currContext={context}
                        allowCustomInputs={true} />
                );
            }
        })

        return arr;
    }

    return (
        <Grid container className='ces-container'>
            {/* {context.currSection === defaultSections.header && (
                <SubSection className='ces-header' key={"HEADER"} sectionName={defaultSections.header} sectionTitle={"Header Section"} currContext={context} allowCustomInputs={false}/>
            )}
            {context.currSection === defaultSections.agreement && (
                <SubSection className='ces-agreement' key={"AGREEMENT"} sectionName={defaultSections.agreement} sectionTitle={"Agreement Section"} currContext={context} allowCustomInputs={false}/>
            )}
            {context.currSection === defaultSections.compensation && (
                <SubSection className='ces-agreement' key={"COMPENSATION"} sectionName={defaultSections.compensation} sectionTitle={"Compensation Section"} currContext={context} allowCustomInputs={false}/>
            )} */}
            {createSubSection()}
        </Grid>
    )
};

export default ComponentDisplay;
