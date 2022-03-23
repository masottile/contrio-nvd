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
import SectionContext from '../context/SectionContext';

const ContractDisplay = () => {
  const sectionContext = useContext(SectionContext);
  const [section, setSection] = useState({});
  const defaultSectionTitle = "Section Name";
  const defaultComponentTitle = "Section Description";

  const CustomSectionCreationButton = () => {
    const addToSubsectionArray = () => {
      const newid = newID();

      const newObj = { ...section };
      const newSection = {
        id: newid,
        title: defaultSectionTitle,
        component_title: defaultComponentTitle
      };
      defaultSections[defaultSectionTitle + newid] = newSection;
      newObj[defaultSectionTitle + newid] = newSection;

      setSection(elements => ({ ...newObj }));
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

  // function to create components from current state:
  // const printElements = () => {
  //   const arr = [];

  //   Object.entries(section).map(item => {
  //     arr.push(
  //       <Section
  //         key={item[1].id}
  //         title={item[1].title}
  //       />
  //     )
  //   });

  //   return arr
  // }

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
      {/* {printElements()} */}
      <CustomSectionCreationButton />
    </Grid>
  )
};

export default ContractDisplay;
