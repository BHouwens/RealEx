import React from 'react';
import styles from './regexInput.css';

export const RegexInput = ({ value, id, type, amount, onChange, onTypeSelect, onAmountChange }) => {
    let defaultVal = !type ? 'Select' : type,
        styleClass = !type ? 'null' : type;
    
    return (
        <li className={styles.container}>
            <select className={styleClass} defaultValue={defaultVal} onChange={onTypeSelect}>
                <option value="then">then</option>
                <option value="or">or</option>
                <option value="followed">is followed by</option>
                <option value="not-followed">is not followed by</option>
                <option value="starts-with">starts with</option>
                <option value="ends-with">ends with</option>
            </select>
            <select className="amount" defaultValue={amount} onChange={onAmountChange}>
                <option value="a">a</option>
                <option value="one-or-more">one or more</option>
                <option value="optionally-one">optionally one</option>
                <option value="optionally-many">optionally many</option>
                <option value="literally">a literal</option>
            </select>
            <input value={value} className={styleClass + " natural-lang"} onChange={onChange}/>
        </li>
    )
}