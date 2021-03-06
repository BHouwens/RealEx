import React from 'react';
import { RegexInput } from '../RegexInput/regexInput';
import { AddInputButton } from '../AddInputButton/addInputButton';
import styles from './regexInputList.css';

export const RegexInputList = ({ inputs, onListItemChange, onListTypeSelect, onAmountSelect, onAddChunk }) => {
    return (
        <div className={styles.container__left}>
            <h1>I want to match text if it</h1>
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