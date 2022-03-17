import React, {useContext} from 'react'
import './element.css'
import { ElementRender } from './ElementRender';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ComponentContext from '../ComponentContext';
import ContractContext from '../ContractContext';
import { containerClasses } from '@mui/material';
import { defaultElements, customElements } from '../element/elements';

const Element = ({ id, dbKey, section, name, desc, type, enf, deletable }) => {
  const componentContext = useContext(ComponentContext);
  const contractContext = useContext(ContractContext)
  
  const handleClick = () => {
    // change the customElements to reflect
    delete customElements[section][id];

    // change the componentContext to reflect this
    const prevElements = { ...componentContext.componentElements};
    delete prevElements[section][id];
    componentContext.setElements(elements => ({ ...prevElements}));

    //change the contractContext to reflect this
    const prevContract = contractContext.currentContract
    delete prevContract[id];
    contractContext.setContract(prevContract);


    console.log(componentContext);
    console.log(contractContext);
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