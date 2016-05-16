import React from 'react';
import { RegexInput } from '../components/regexInput';
import '../../styles/container__left.css';

export const RegexInputList = ({ inputs, onListItemChange, onListTypeSelect }) => {
    return (
        <div className="container__left">
            <ul>
                {inputs.map(input =>
                    <RegexInput
                        key={input.id}
                        value={input.text}
                        onTypeSelect={(e) => {
                            console.log(e.target.value);
                            onListTypeSelect(input.id, e.target.value)
                        } }
                        onChange={(e) => onListItemChange(input.id, e.target.value) }
                        />
                ) }
            </ul>
        </div>
    );
}