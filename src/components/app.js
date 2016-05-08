import React from 'react';
import { OutputRegexInputList } from '../containers/regexInputList';
import { TranslatedRegex } from '../containers/translatedRegex';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chunks: [
                { id: 0, text: 'test' },
                { id: 1, text: 'another' }
            ]
        }
    }

    render() {
        return (
            <div className="container">
                <OutputRegexInputList 
                    changeChunks={ inputs => this.setState({ chunks: inputs })}
                    inputs={this.state.chunks} />
                <TranslatedRegex chunks={this.state.chunks} />
            </div>
        );
    }
}