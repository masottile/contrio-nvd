import Header from './components/header/Header'
import Form from './components/Form'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ContractTemplateSection from './components/contractTemplateSection/ContractTemplateSection'
import ContractElementSection from './components/contractElementSection/ContractElementSection'

function App() {
  return (
    <div className="App">
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ padding: 4 }}>
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={8}>
              <ContractTemplateSection />
            </Grid>
            <Grid item xs={4}>
              <ContractElementSection />
            </Grid>
          </Grid>
        </Box>

        {/* <Form type={'input'}/>
        <Form type={'output'}/> */}
      </>
    </div>
  );
}

export default App;
