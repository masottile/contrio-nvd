// drop section
import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Section from '../section/Section';
import './contractSectionDisplay.css';
import { defaultSections, customSections } from '../section/sections';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import newID from '../idGenerator/getID';

const ContractDisplay = () => {
  const [section, setSection] = useState({});
  const defaultSectionTitle = "Component Name";
  const defaultComponentTitle = "Component Description";

  const CustomSectionCreationButton = () => {
    const addToSubsectionArray = () => {
      // const newid = newID();

      // const newObj = {...elementContext.currentElements}; 
      // const newSection = {
      //   id: newid,
      //   title: defaultSectionTitle,
      //   component_title: defaultComponentTitle
      // };

      // newObj[sectionName][newid] = newElement

      // elementContext.setElements(elements => ({ ...newObj }));
      // console.log(elementContext.currentElements);
    }

    return (
      <>
        <Tooltip title="Create New Section">
          <IconButton
            onClick={addToSubsectionArray()}
            size="small"
            sx={{ ml: 2 }}
          >
            <AddIcon sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </>
    )
  }

  const createSections = () => {
    const arr = [];

    Object.entries(defaultSections).map(item => {
      arr.push(
        <Section
          key={item[1].id}
          title={item[1].title}
        />
      );
    });
    
    return arr
  }

  return (
    <Grid container className='cts-container'>
      {createSections()}
      <CustomSectionCreationButton />
    </Grid>
  )
};

export default ContractDisplay;
