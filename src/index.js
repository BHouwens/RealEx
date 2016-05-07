import React from 'react';
import { render as renderToDom } from 'react-dom';

/*---- Components ----*/
import { RegexInputList } from './components/regexInputList';
import { TranslatedRegex } from './components/translatedRegex';

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
                <RegexInputList 
                    changeChunks={ inputs => this.setState({ chunks: inputs })}
                    inputs={this.state.chunks} />
                <TranslatedRegex chunks={this.state.chunks} />
            </div>
        );
    }
}

renderToDom(
    <App />,
    document.querySelector('#app')
);