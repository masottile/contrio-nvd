// drop section
import Grid from '@mui/material/Grid';
import Section from '../section/Section';
import './contractSectionDisplay.css';
import { defaultSections, customSections } from '../section/sections';

const ContractDisplay = () => {
  return (
    <Grid container className='cts-container'>
      <Section
        key={"header"}
        title={defaultSections.header}
      />
      <Section
        key={"agreement"}
        title={defaultSections.agreement}
      />
    </Grid>
    )
};

export default ContractDisplay;
