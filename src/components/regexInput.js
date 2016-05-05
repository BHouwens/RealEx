import React from 'react';

export class RegexInput extends React.Component {
    constructor(props){
        super(props); 
        this.state = {term: ''}; 
        this.onInputChange = this.onInputChange.bind(this);
    }
    
    render() {
        return (
            <div className="input-container">
                <input className="natural-lang" onChange={this.onInputChange}/>
            </div>
        );
    }
    
    onInputChange(e){
        let self = e.target;
        this.setState({term: self.value});
    }
}