import React from 'react'
import TeamMenu from './TeamMenu'

export default function Homeview(props) {
    return (
        <div className="project-view home-view">
            <div style={{width:"70%", height:"75%", backgroundColor:"black", overflow:"hidden"}}>
            <TeamMenu />
            </div>
        </div>
    )
}