import React from 'react';
import '../../styles/input-container.css';

export const RegexInput = ({ value, id, type, onChange, onTypeSelect }) => {
    let defaultVal = !type ? 'Select' : type,
        styleClass = !type ? 'null' : type;
    
    return (
        <li className="input-container">
            <select className={styleClass} defaultValue={defaultVal} onChange={onTypeSelect}>
                <option value="then">then</option>
                <option value="followed">followed by</option>
                <option value="not-followed">not followed by</option>
            </select>
            <input value={value} className={styleClass + " natural-lang"} onChange={onChange}/>
        </li>
    )
}