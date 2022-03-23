import React, { useContext } from 'react'
import Grid from '@mui/material/Grid';
import './section.css'
import AppContext from '../context/AppContext';
import ContractContext from '../context/ContractContext'
import { defaultSections, customSections } from '../section/sections';
import SectionRender from './SectionRender';

const Section = ({ id, title }) => {
  // const [values, setValues] = useState({}); <------------ TODO: will most likely need to use state to update values inside section

  const context = useContext(AppContext);
  const contractContext = useContext(ContractContext);

  const isDefault = () => {
    // is this section one of the default sections?
    Object.entries(defaultSections).forEach(item => {
      if (id === item[1].id){
        return true;
      }
    })
    return false;
  }

  const RenderHeader = () => {
    let sectionTitle = title
    if ("title" in contractContext.currentContract) {
      sectionTitle = contractContext.currentContract.title
    }
    return <div className='s-subitem' xs={12}>
      <h2 className='s-title'>{sectionTitle}</h2>
      <p>This Freelance Contract (this "Agreement") is made as of {contractContext.currentContract.date} (the "Effective Date") by and between {contractContext.currentContract.client} (Client) and {contractContext.currentContract.freelancer} (Independent Contractor).
      Client and Independent Contractor may each be referred to in this Agreement as a "Party" and collectively as the "Parties".
      </p>
    </div>
  }

  const createCustomSections = () => {
    return (
      <div>
        <h2 className='s-title'>{title}</h2>
        {/* <p>{contractContext.currentContract.title ? `${contractContext.currentContract.title}` : ""} </p> */}
      </div>
    )
  }

  // const handleClick = () => {
  //   // change the elementContext to reflect this
  //   const prevElements = { ...elementContext.currentElements};
  //   delete prevElements[section][id];
  //   elementContext.setElements(elements => ({ ...prevElements}));

  //   //change the contractContext to reflect this
  //   const prevContract = contractContext.currentContract
  //   delete prevContract[id];
  //   contractContext.setContract(prevContract);
  // };

  // const RenderDeleteButton = () => {
  //   if (deletable) {
  //     return (
  //       <IconButton
  //         onClick={handleClick}
  //         size="small"
  //         sx={{ ml: 2 }}
  //       >
  //         <DeleteIcon sx={{ width: 32, height: 32 }} />
  //       </IconButton>
  //     )
  //   }
  //   else return null;
  // }

  return (
    <Grid item className='s-item' onClick={() => { context.setSelectedSection(title) }} xs={12}>
      {isDefault && (
        <SectionRender id={id} />
      )}

      
      {!isDefault() ? createCustomSections() : null}
    </Grid>

  )
}

export default Section