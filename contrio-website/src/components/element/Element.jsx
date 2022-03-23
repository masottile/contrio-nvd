import React, {useContext} from 'react'
import './element.css'
import { ElementRender } from './ElementRender';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CustomContext from '../context/CustomContext';
import ContractContext from '../context/ContractContext';
import { containerClasses } from '@mui/material';
import { defaultElements, customElements } from '../element/elements';

const Element = ({ id, dbKey, section, name, desc, type, enf, deletable }) => {
  const customContext = useContext(CustomContext);
  const contractContext = useContext(ContractContext)
  
  const handleClick = () => {
    // change the elementContext to reflect this
    const prevElements = { ...customContext.currentElements};
    delete prevElements[section][id];
    customContext.setElements(elements => ({ ...prevElements}));

    //change the contractContext to reflect this
    const prevContract = contractContext.currentContract
    delete prevContract[id];
    contractContext.setContract(prevContract);
  };

  const RenderDeleteButton = () => {
    if (deletable) {
      return (
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
        >
          <DeleteIcon sx={{ width: 32, height: 32 }} />
        </IconButton>
      )
    }
    else return null;
  }

  return (
    <div className='e-item' xs={12}>
      <div className='e-name' >{name}</div>
      <p className='e-desc'>{desc}</p>
      <ElementRender dbKey={dbKey} type={type} enf={enf}/>
      <RenderDeleteButton />
    </div>
  )
}

export default Element