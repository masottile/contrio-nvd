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

  // is this a default section or a custom section? (for rendering purposes)
  const isDefault = Object.entries(defaultSections).reduce((prev, curr) => {return (prev || (id===curr[1].id))}, false)

  const createCustomSections = () => {
    // If there are no elements, or the elements don't have stored values, then there is nothing to display
    if (contractContext.currentContract[id] === undefined || contractContext.currentContract[id] === null) {
      return (
        <div className='s-subitem' xs={12}>
          <h2 className='s-title'>{title}</h2>
        </div>
      )
    }
    // If there are elements, then we can display them
    else {
      let arr = [];
      let sectionTitle = ("sectionTitle" in contractContext.currentContract[id] ? contractContext.currentContract[id]["sectionTitle"]: title);

      // console.log(contractContext.currentContract[id])
      Object.entries(contractContext.currentContract[id]).forEach(item => {
        if (item[0] !== "sectionTitle"){
          arr.push(
            <p key={item[0]}>{item[1].name}: {item[1].value}</p>
          )
        }
      })
      
      return (
        <div className='s-subitem' xs={12}>
          <h2 className='s-title'>{sectionTitle}</h2>
          {arr}
        </div>
      )
      
    }
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
    <Grid item className='s-item' onClick={() => { context.setSelectedSection(id) }} xs={12}>
      {isDefault && (
        <SectionRender id={id} />
      )}
      {!isDefault && createCustomSections() }
    </Grid>

  )
}

export default Section