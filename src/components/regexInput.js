import React from 'react';

export class RegexInput extends React.Component {
    constructor(props){
        super(props); 
        
        this.state = {
            value: props.value,
            id: props.id,
            onListItemChange: props.onListItemChange
        };
    }
    
    render() {
        let { value, id, onListItemChange } = this.state;
        return <input value={value} className="natural-lang" onChange={onListItemChange}/>;
    }
}