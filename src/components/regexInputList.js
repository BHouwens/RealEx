import React from 'react';
import { RegexInput } from './regexInput';

export class RegexInputList extends React.Component {
    constructor(props){
        super(props)
        
        this.state = { inputs: props.inputs };
    }
    
    render(){
        let { inputs } = this.state;
        
        return (
            <ul>
                {inputs.map(input => {
                    return <RegexInput key={input.id} value={input.text} />
                })}
                <RegexInput value="" />
            </ul>    
        );
    }
}