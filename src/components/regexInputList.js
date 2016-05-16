import React from 'react';
import { RegexInput } from '../components/regexInput';

export class RegexInputList extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            inputs: props.inputs,
            onListItemChange: props.onListItemChange 
        };
    }

    render() {
        let { inputs, onListItemChange } = this.state;

        return (
            <ul>
                {inputs.map(input =>
                    <RegexInput
                        key={input.id}
                        value={input.text}
                        onChange={(e) => onListItemChange(input.id, input.text)}
                    />
                 )}
            </ul>
        );
    }
}