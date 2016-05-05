import React from 'react';
import { render } from 'react-dom';
import { Regex } from './components';

const dummyRegex = [
    {text: '[0-9]'},
    {text: 'ab'}
];

render(
    <Regex chunks={dummyRegex}/>,
    document.getElementById('app')
);