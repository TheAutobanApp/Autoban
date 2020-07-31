import React from 'react';
import { FaPlus } from 'react-icons/fa';

export default function AddColumn(props) {
    return (
        <div className="flex-column column add-column" onClick={props.onclick}>
            <FaPlus size={20}/>
            <h5>Add Column</h5>
        </div>
    )
}