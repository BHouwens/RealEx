import React from 'react';

export class RegexInput extends React.Component {
    constructor(props){
        super(props); 
        
        this.state = {value: props.value};
        this.onInputChange = this.onInputChange.bind(this);
    }
    
    render() {
        let { value } = this.state;
        
        return (
            <div className="input-container">
                <input value={value} className="natural-lang" onChange={this.onInputChange}/>
            </div>
        );
    }
    
    onInputChange(e){
        let self = e.target;
        this.setState({term: self.value});
        console.log('current state', this.state);
    }
}