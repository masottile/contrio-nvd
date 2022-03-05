import React from 'react'

import './contractPreview.css'

const ContractPreview = ({currContext, id, title, desc}) => {
    return (
    <div className='cp-item' onClick={() => {currContext.setContractID(id)}} xs={12}>
        <h2 className='cp-title' >{title}</h2>
        {/* <div className='e-desc'>{desc}</div> */}
        <p>{desc}</p>
    </div>
  )
}

export default ContractPreview