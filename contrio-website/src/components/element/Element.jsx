import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { defaultElements, customElements } from './elements';
import './element.css'
import { Type } from '../Type';
import { ElementRender } from './ElementRender';

const Element = ({name, desc, type, enf}) => {
    return (
    <div item className='e-item' xs={12}>
        <div className='e-name' >{name}</div>
        <p className='e-desc'>{desc}</p>
        <ElementRender type={type} enf={enf}/>
    </div>
  )
}

export default Element