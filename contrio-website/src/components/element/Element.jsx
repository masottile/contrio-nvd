import React from 'react'
import './element.css'
import { ElementRender } from './ElementRender';

const Element = ({name, desc, type, enf, id}) => {
    return (
    <div className='e-item' xs={12}>
        <div className='e-name' >{name}</div>
        <p className='e-desc'>{desc}</p>
        <ElementRender name={name} id={id} type={type} enf={enf}/>
    </div>
  )
}

export default Element