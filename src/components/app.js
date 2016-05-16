import React from 'react';
import { RegexList } from '../containers/RegexList';
import { TranslatedRegex } from '../containers/TranslatedRegex';
import '../../styles/container.css';

export const App = () => {
    return (
        <div className="container">
            <RegexList />
            <TranslatedRegex />
        </div>
    );
}

