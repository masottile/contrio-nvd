import React, { useContext } from 'react'
import Grid from '@mui/material/Grid';
import './section.css'
import AppContext from '../context/AppContext';
import ContractContext from '../context/ContractContext'

const Section = ({ title }) => {
  // const [values, setValues] = useState({}); <------------ TODO: will most likely need to use state to update values inside section

  const context = useContext(AppContext);
  const contractContext = useContext(ContractContext);

  const RenderHeader = () => {
    let sectionTitle = title
    if ("title" in contractContext.currentContract) {
      sectionTitle = contractContext.currentContract.title
    }
    return <div className='s-subitem' xs={12}>
      <h2 className='s-title'>{sectionTitle}</h2>
      <p>Contract between {contractContext.currentContract.client} (Client) and {contractContext.currentContract.freelancer} (Freelancer)</p>
    </div>
  }

  return (
    <Grid item className='s-item' onClick={() => {context.setSection(title)}} xs={12}>
      {title === "HEADER" && (
          <RenderHeader />
      )}
      {title === "AGREEMENT" && (
        <div>
          <h2 className='s-title'>{"agreement section"}</h2>
          <p>{contractContext.currentContract.title ? `${contractContext.currentContract.title}` : ""} </p>
        </div>
      )}
      
    </Grid>
    
  )
}

export default Section