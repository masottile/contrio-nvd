// drop section
import Grid from '@mui/material/Grid';
import Section from '../section/Section';
import './contractSectionDisplay.css';
import { defaultSections, customSections } from '../section/sections';

const ContractDisplay = () => {

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
    </Grid>
  )
};

export default ContractDisplay;
