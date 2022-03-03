// drop section
import Grid from '@mui/material/Grid';
import Section from '../section/Section';
import './contractSectionDisplay.css';

const ContractDisplay = () => {
  return (
    <Grid container className='cts-container'>
      <Section
        key={"header"}
        title={"HEADER"}
      />
      <Section
        key={"agreement"}
        title={"AGREEMENT"}
      />
    </Grid>
    )
};

export default ContractDisplay;
