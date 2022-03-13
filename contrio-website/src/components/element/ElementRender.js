import { React, useContext } from 'react'
import { Type } from '../Type'
import ContractContext from '../ContractContext'
import './element.css'

export const ElementRender = ({ type, id }) => {
    const context = useContext(ContractContext);
    console.log(context);

    const handleOnChange = ( event ) => {
        context.currentContract[id] = event.target.value;
        console.log(context); 
    }

    const RenderElement = () => {
        if (type === Type.tbs) {
            return <input className='er-all er-tbs' placeholder='Enter Here' defaultValue={context.currentContract[id]} onChange={handleOnChange} disabled={context.disableInput}></input>
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
