import React from 'react';
import '../../styles/regex-input.css';

export const RegexInput = ({ value, id, onChange, onListTypeSelect }) => {
    return (
        <li className="input-container">
            <select onChange={onListTypeSelect}>
                <option value="then" defaultValue>then</option>
                <option value="followed">followed by</option>
                <option value="not-followed">not followed by</option>
            </select>
            <input value={value} className="natural-lang" onChange={onChange}/>
        </li>
    )
}