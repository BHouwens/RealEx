import React from 'react';
import { RegexInput } from './regexInput';

export class RegexInputList extends React.Component {
    constructor(props){
        super(props)
        
        this.state = { inputs: props.inputs };
        this.changeChunks = props.changeChunks;
        this.createNewChunks = this.createNewChunks.bind(this);
    }
    
    createNewChunks(id, text){
        let { inputs } = this.state;
        
        inputs[id] = { id, text };
        this.changeChunks(inputs);
    }
    
    render(){
        let { inputs } = this.state;
        
        return (
            <ul>
                {inputs.map(input => {
                    return <RegexInput 
                               onOverallChange={this.createNewChunks}
                               key={input.id} 
                               id={input.id} 
                               value={input.text} 
                           />
                })}
            </ul>    
        );
    }
}