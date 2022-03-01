import React from 'react'
import { Type } from '../Type'
import './element.css'

export const ElementRender = ({ type, enf }) => {
    const RenderElement = () => {
        if (type === Type.tbs) {
            return <input className='er-all er-tbs' placeholder='Enter Here'></input>
        }
        else if (type === Type.tbl) {
            return <input className='er-all er-tbl' placeholder='Enter Here'></input>
        }
        else if (type === Type.btn) {
            // todo
        }
        else if (type === Type.img) {
            // todo
        }
        else {
            return 'ERROR - No Proper Input type Considered'
        }
    }

    return (
        <RenderElement />
    )
}
