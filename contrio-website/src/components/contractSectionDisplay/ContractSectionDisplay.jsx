// drop section
import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Section from '../section/Section';
import './contractSectionDisplay.css';
// import { defaultSections, customSections } from '../section/sections';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
// import newID from '../idGenerator/getID';
import { v4 as uuidv4 } from 'uuid';
import CustomContext from '../context/CustomContext';

const ContractDisplay = () => {
  const customContext = useContext(CustomContext);
  const [section, setSection] = useState({});
  const defaultSectionTitle = "Section Name";
  const defaultComponentTitle = "Section Description";

  const CustomSectionCreationButton = () => {

    const addToSubsectionArray = () => {
      const newid = uuidv4();

      const newObj = { ...customContext.currentSections };
      const newSection = {
        id: newid,
        title: defaultSectionTitle,
        allowCustom: true
      };
      // defaultSections[defaultSectionTitle + newid] = newSection;
      newObj[defaultSectionTitle + newid] = newSection;
      customContext.setSections(elements => ({ ...newObj }));
      setSection(newObj)
      console.log(customContext.currentSections);
    }

    return (
      <>
        <Tooltip title="Create New Section">
          <IconButton
            onClick={() => addToSubsectionArray()}
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

    // console.log(customContext.currentSections)
    Object.entries(customContext.currentSections).forEach(item => {
      arr.push(
        <Section
          key={item[1].id}
          id={item[1].id}
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
