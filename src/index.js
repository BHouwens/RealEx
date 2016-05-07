import React from 'react';
import { render as renderToDom } from 'react-dom';

/*---- Components ----*/
import { RegexInputList } from './components/regexInputList';
import { RegexOutput } from './components/regexOutput';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dummyRegex: [
                { id: 0, text: '[0-9]' },
                { id: 1, text: 'ab' }
            ]
        }
    }

    render() {
        return (
            <div className="container">
                <RegexInputList inputs={this.state.dummyRegex} />
                <RegexOutput chunks={this.state.dummyRegex} />
            </div>
        );
    }
}

renderToDom(
    <App />,
    document.querySelector('#app')
);