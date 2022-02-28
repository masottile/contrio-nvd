// drag section
import { ContractComponents } from "../ContractComponents"
import { useState, useContext } from 'react';
import Component from "../component/Component"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './contractComponentSection.css'
import AppContext from "../AppContext";

const ContractComponentSection = ({ sectionName }) => {
    const context = useContext(AppContext);

    console.log(context);

    return <Box className="ces-box" sx={{ flexGrow: 1 }}>
        <Grid container className='ces-container' spacing={2}>
            {context.currSection === "HEADER" && (
                <Component key={"element"} sectionName={"Header"} currContext={context}/>
            )}
            {context.currSection === "AGREEMENT" && (
                <Component key={"element"} sectionName={"AgreementSection"} currContext={context}/>
            )}     

            {/* DEPRECATED - below */}
            {/* {ContractComponents.map((component) => (
                <Component key={component.id} status={component.status} icon={component.icon} name={component.name} desc={component.desc} type={component.type} enf={component.enf} />
            ))} */}
        </Grid>
    </Box>
};

export default ContractComponentSection;
