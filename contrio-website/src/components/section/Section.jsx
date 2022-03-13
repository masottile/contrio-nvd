import React, { useState, useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import './section.css'
import AppContext from '../AppContext';
import ContractContext from '../ContractContext'

const Section = ({ title }) => {
  // const [values, setValues] = useState({}); <------------ TODO: will most likely need to use state to update values inside section

  const context = useContext(AppContext);
  const contractContext = useContext(ContractContext);

  // todo ----- will need to iterate through the state (javascript object)
  // console.log("title" in contractContext.currentContract);

  const RenderHeader = ({}) => {
    let sectionTitle = "Header Section"
    if ("title" in contractContext.currentContract) {
      sectionTitle = contractContext.currentContract.title
    }
    let client = "___________"
    if ("employer_name" in contractContext.currentContract) {
      client = contractContext.currentContract.employer_name
    }
    let freelancer = "___________"
    if ("employee_name" in contractContext.currentContract) {
      freelancer = contractContext.currentContract.employee_name
    }
    return <div className='s-subitem' xs={12}>
      <h2 className='s-title'>{sectionTitle}</h2>
      <p>This Contract, is entered into as of ___________, and outlines the agreement between {client} (hereafter referred to as the "Client") and {freelancer} (hereafter referred to as the "Freelancer"), collectively referred to as the "Parties".</p>
    </div>
  }

  return (
    
    <Grid item className='s-item' onClick={() => {context.setSection(title)}} xs={12}>
      {title === "HEADER" && (
          <RenderHeader />
          // <h2 className='s-title'>{title}
          //   {/* {"title" in contractContext.currentContract && contractContext.currentContract.title}
          //   {!("title" in contractContext.currentContract) && title} */}
          // </h2>
      )}
      {title === "AGREEMENT" && (
        <div className='s-subitem' xs={12}>
          <h2 className='s-title'>{"Scope of the Project and Copyright"}</h2>
          <p> In consideration of the mutual covenants made herin, the Parties agree as follows: </p>
          <p>The Freelancer agrees to produce materials such as ________________________________________________________________________ __________________________________________________________________________________________ (hereinafter referred to as the "Work") at the request of the Client for the fees agreed upon in advance and turn in or deliver the Work by the agreed upon deadline. The Freelancer agress that they will be the sole owner of the Work, which will be original Work by the Freelancer, free of plagiarism.</p>
        </div>
      )}
    </Grid>
    
  )
}


// return <Grid item className='c-item' xs={12}>
//         <h2 className='s-title'>{sectionName}</h2>
//         {subsectionArray}
//     </Grid>

// return (
//   <Grid container className='ces-container'>
//       {context.currSection === "HEADER" && (
//           <SubSection className='ces-header' key={"element"} sectionName={"Header Section"} currContext={context} />
//       )}
//       {context.currSection === "AGREEMENT" && (
//           <SubSection className='ces-agreement' key={"element"} sectionName={"Agreement Section"} currContext={context} />
//       )}

//   </Grid>
// )

export default Section