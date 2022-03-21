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
      <Section
        key={"projectScope"}
        title={defaultSections.projectScope}
      />
      <Section
        key={"compensation"}
        title={defaultSections.compensation}
      />
    </Grid>
    )
};

export default ContractDisplay;
