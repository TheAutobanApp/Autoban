import React from 'react'

export default function ProjectCard(props) {
    return (
        <div style={{height: "100px", width:"175px", backgroundColor:"purple", borderRadius:"5px", boxShadow:"1px 1px 5px grey"}}>
            {props.title}
        </div>
    )

}