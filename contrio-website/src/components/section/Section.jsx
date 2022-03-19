import React, { useContext } from 'react'
import Grid from '@mui/material/Grid';
import './section.css'
import AppContext from '../context/AppContext';
import ContractContext from '../context/ContractContext'

const Section = ({ title }) => {
  // const [values, setValues] = useState({}); <------------ TODO: will most likely need to use state to update values inside section

  const context = useContext(AppContext);
  const contractContext = useContext(ContractContext);

  // todo ----- will need to iterate through the state (javascript object)
  // console.log("title" in contractContext.currentContract);

  const RenderHeader = () => {
    let sectionTitle = title
    console.log(contractContext)
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
          // <h2 className='s-title'>{title}
          //   {/* {"title" in contractContext.currentContract && contractContext.currentContract.title}
          //   {!("title" in contractContext.currentContract) && title} */}
          // </h2>
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