import { React, useContext } from 'react'
import { Type } from '../Type'
import ContractContext from '../context/ContractContext'
import './element.css'

export const ElementRender = ({ type, dbKey }) => {
    const context = useContext(ContractContext);

    const handleOnChange = ( event ) => {
        context.currentContract[dbKey] = event.target.value;
        console.log(context.currentContract)
    }

    const RenderElement = () => {
        if (type === Type.tbs) {
            return <input className='er-all er-tbs' placeholder='Enter Here' defaultValue={context.currentContract[dbKey]} onChange={handleOnChange} disabled={context.disableInput}></input>
        }
        else if (type === Type.tbl) {
            return <input className='er-all er-tbl' placeholder='Enter Here' defaultValue={context.currentContract[dbKey]} onChange={handleOnChange} disabled={context.disableInput}></input>
        }
        else {
            return 'ERROR - No Proper Input type Considered'
        }
    }

    return (
        <RenderElement />
    )
}
