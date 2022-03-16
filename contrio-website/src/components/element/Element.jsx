import React, {useContext} from 'react'
import './element.css'
import { ElementRender } from './ElementRender';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ComponentContext from '../ComponentContext';

const Element = ({ id, dbKey, section, name, desc, type, enf, deletable }) => {
  const context = useContext(ComponentContext);
  
  const handleClick = () => {
    delete customElements[section][id];

    const prevElements = context.componentElements;
    delete prevElements[section][id];

    context.setElements(prevElements)
    console.log(context);
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