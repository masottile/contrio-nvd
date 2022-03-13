import React, { useCallback } from 'react';
import Grid from '@mui/material/Grid';
import './subsection.css'
import { defaultElements, customElements } from '../element/elements';
import { Status } from '../Status';
import Element from '../element/Element';

const SubSection = ({ sectionName, currContext }) => {
    const subsectionArray = [];
    
    const Defaults = Object.entries(defaultElements).map(item => {
        if (item[0] === currContext.currSection) {
            Object.entries(item[1]).map(e => {
                const name = e[0];
                const element = e[1];
                if (element.status === Status.active) {
                    
                    subsectionArray.push(
                        <Element className='c-element' key={element.id} name={element.name} id={name} desc={element.desc} type={element.type} enf={element.enf} />)
                }
            });
        }
    });

    return <Grid item className='c-item' xs={12}>
        <h2 className='c-title'>{sectionName}</h2>
        {subsectionArray}
    </Grid>
};

export default SubSection;
