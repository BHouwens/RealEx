import React from 'react';
import { render as renderToDom } from 'react-dom';

/*---- Components ----*/
import { RegexInput } from './components/regexInput';
import { RegexOutput } from './components/regexOutput';

const dummyRegex = [
    {text: '[0-9]'},
    {text: 'ab'}
];

const App = () => {
    return (
      <div className="container">
        <RegexInput />
        <RegexOutput chunks={dummyRegex} />
      </div>  
    );
}

renderToDom(
    <App />,
    document.querySelector('#app')
);