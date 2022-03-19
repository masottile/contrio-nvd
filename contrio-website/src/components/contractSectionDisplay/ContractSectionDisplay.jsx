// drop section
import Grid from '@mui/material/Grid';
import Section from '../section/Section';
import './contractSectionDisplay.css';
import { sections } from '../section/sections';

const ContractDisplay = () => {
  return (
    <Grid container className='cts-container'>
      <Section
        key={"header"}
        title={sections.header}
      />
      <Section
        key={"agreement"}
        title={sections.agreement}
      />
    </Grid>
    )
};

export default ContractDisplay;
