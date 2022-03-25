import { React, useContext } from 'react'
import { Type } from '../Type'
import ContractContext from '../context/ContractContext'
import './element.css'

export const ElementRender = ({ type, sectionID, dbKey }) => {
    const context = useContext(ContractContext);

    const handleOnChange = ( event ) => {
        console.log(event.target.value)
        if (context.currentContract[sectionID] === undefined || context.currentContract[sectionID] === null) {
            context.currentContract[sectionID] = {};
        }
        context.currentContract[sectionID][dbKey] = event.target.value;
    }
    const handleCustomNameChange = ( event ) => {
        if (context.currentContract[sectionID] === undefined || context.currentContract[sectionID] === null) {
            context.currentContract[sectionID] = {};
        }
        if (context.currentContract[sectionID][dbKey] === undefined || context.currentContract[sectionID][dbKey] === null) {
            context.currentContract[sectionID][dbKey] = {};
        }
        context.currentContract[sectionID][dbKey]["name"] = event.target.value;
    }

    const handleCustomValueChange = ( event ) => {
        if (context.currentContract[sectionID] === undefined || context.currentContract[sectionID] === null) {
            context.currentContract[sectionID] = {};
        }
        if (context.currentContract[sectionID][dbKey] === undefined || context.currentContract[sectionID][dbKey] === null) {
            context.currentContract[sectionID][dbKey] = {};
        }
        context.currentContract[sectionID][dbKey]["value"] = event.target.value;
    }

    const RenderElement = () => {
        let defaultVal = undefined;
        if (context.currentContract[sectionID] !== undefined && context.currentContract[sectionID] !== null) {
            defaultVal = context.currentContract[sectionID][dbKey]
        }

        if (type === Type.tbs) {
            return <input className='er-all er-tbs' type="text" placeholder='Enter Here' defaultValue={defaultVal} onChange={handleOnChange} disabled={context.disableInput}></input>
        }
        else if (type === Type.tbl) {
            return <input className='er-all er-tbl' type="text" placeholder='Enter Here' defaultValue={defaultVal} onChange={handleOnChange} disabled={context.disableInput}></input>
        }
        else if (type === Type.cust){
            let elemName = undefined;
            let elemValue = undefined;
            if (defaultVal !== undefined && defaultVal !== null) {
                elemName = defaultVal["name"]
                elemValue = defaultVal["value"]
            }
            return (
                <div>
                    <input className='er-all er-tbs e-name' type="text" placeholder='Element Name' defaultValue={elemName} onChange={handleCustomNameChange} disabled={context.disableInput}></input>
                    <p className='e-desc'>{"customizable element"}</p>
                    <input className='er-all er-tbl' type="text" placeholder='Element Value' defaultValue={elemValue} onChange={handleCustomValueChange} disabled={context.disableInput}></input>
                </div>
            )
        }
        else {
            return 'ERROR - No Proper Input type Considered'
        }
    }

    return (
        <RenderElement />
    )
}
