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
    console.log(context)

    const createSubSection = () => {
        const arr = [];

        Object.entries(defaultSections).forEach(item => {
            if (context.currSelectedSection === item[1].id) {
                arr.push(
                    <SubSection className={`ces-${item[0]}`}
                        key={item[1].id}
                        sectionID={item[1].id}
                        sectionTitle={item[1].title} 
                        currContext={context}
                        allowCustomInputs={false} />
                );
            }
        })

        return arr;
    }

    return (
        <Grid container className='ces-container'>
            {/* {context.currSection === "HEADER" && (
                <SubSection className='ces-header' key={"HEADER"} sectionName={defaultSections.header} sectionTitle={"Header Section"} currContext={context} allowCustomInputs={false}/>
            )}
            {context.currSection === "WORK" && (
                <SubSection className='ces-agreement' key={"WORK"} sectionName={defaultSections.agreement} sectionTitle={"Agreement Section"} currContext={context} allowCustomInputs={false}/>
            )}
            {context.currSection === "COMPENSATION" && (
                <SubSection className='ces-agreement' key={"COMPENSATION"} sectionName={defaultSections.compensation} sectionTitle={"Compensation Section"} currContext={context} allowCustomInputs={false}/>
            )} */}
            {createSubSection()}
        </Grid>
    )
};

export default ComponentDisplay;
