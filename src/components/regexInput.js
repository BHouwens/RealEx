import React from 'react';

export default class RegexInput extends React.Component {
    constructor(props){
        super(props); 
        
        this.state = {
            value: props.value,
            id: props.id
        };
        
        this.onOverallChange = props.onOverallChange;
        this.onInputChange = this.onInputChange.bind(this);
    }
    
    render() {
        let { value, id } = this.state;
        
        return <input value={value} className="natural-lang" onChange={this.onInputChange}/>;
    }
    
    onInputChange(e){
        let value = e.target.value;
        
        this.setState({value});
        this.onOverallChange(this.state.id, value);
    }
}