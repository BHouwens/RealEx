import React from 'react';
import { RegexList } from '../containers/RegexList';
import { TranslatedRegex } from '../containers/TranslatedRegex';

export const App = () => {
    return (
        <div className="container">
            <RegexList />
            <TranslatedRegex />
        </div>
    );
}

