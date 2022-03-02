import { React, useContext } from 'react'
import { Type } from '../Type'
import ContractContext from '../ContractContext'
import './element.css'

export const ElementRender = ({ name, type, enf }) => {
    const context = useContext(ContractContext);
    console.log(name);

    // const handleOnChange = (prevState, event) => ({
    //     prevState: {
    //         ...prevState.context,
    //         title: event.target.value
    //     }
    // })

    // console.log(context);

    // this.setState(prevState => {
    //     let jasper = Object.assign({}, prevState.jasper);  // creating copy of state variable jasper
    //     jasper.name = 'someothername';                     // update the name property, assign a new value                 
    //     return { jasper };                                 // return new object jasper object
    //   })

    const handleOnChange = ( event ) => {
        if(context.currentContract.hasOwnProperty({name})) {
            context.setContract(prevState => {
                let currentContract = { ...prevState.currentContract };
                currentContract[name] = event.target.value;
                return {currentContract};
            })
        }
        else {
            context.currentContract[name] = event.target.value;
        }

        console.log(context); 
    }

    const RenderElement = () => {
        if (type === Type.tbs) {
            return <input className='er-all er-tbs' placeholder='Enter Here' onChange={handleOnChange}></input>
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
