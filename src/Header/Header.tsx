import React from 'react'
import '../Header/HeaderStyle.scss'
import { Link } from 'react-router-dom'


export function Header() {

    return (
        <header className="headerContainer">
            <ul>
                <li>
                    <Link to= '#'><a>Organizações</a></Link>
                    <Link to= 'task'><a>Tarefas</a></Link>
                    
                </li>
            </ul>
        </header>
    )

}