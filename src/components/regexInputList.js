import React from 'react';
import { RegexInput } from '../components/regexInput';
import { AddInputButton } from '../components/addInputButton';
import '../../styles/container__left.css';

export const RegexInputList = ({ inputs, onListItemChange, onListTypeSelect, onAmountSelect, onAddChunk }) => {
    return (
        <div className="container__left">
            <ul>
                {inputs.map(input =>
                    <RegexInput
                        key={input.id}
                        value={input.text}
                        type={input.type}
                        amount={input.amount}
                        onAmountChange={(e) => onAmountSelect(input.id, e.target.value) }
                        onTypeSelect={(e) => onListTypeSelect(input.id, e.target.value) }
                        onChange={(e) => onListItemChange(input.id, e.target.value) }
                        />
                ) }
            </ul>
            <AddInputButton onClick={onAddChunk} />
        </div>
    );
}