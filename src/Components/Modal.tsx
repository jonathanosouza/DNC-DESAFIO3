import React, { useState } from "react"
import '../Components/ModalStyle.scss'


function Modal ({title, dbItem, modal , modalYes , modalNo, dbId}) {

    if(!modal){
        return null
    }
    
    return(
        <div className="ModalCointainer">
            <div className="ModalProps">
                <h1>{title}</h1>
                <span>{dbItem}</span>
            <div className="buttonProps">
                <button  onClick={() => modalNo(dbId)}>Não</button>
                <button  onClick={() => modalYes(dbId)}>Sim</button>
            </div>
            </div>
        </div>
    )
}

export default Modal 