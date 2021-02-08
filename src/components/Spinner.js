import React from 'react'
import '../CSS/spinner.css'

export const Spinner = ({estado}) => {
    return(
        <div className="cont-snipper">
            <h3>{estado}</h3>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
} 