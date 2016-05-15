import React from 'react';
import { RegexInputList } from '../containers/regexInputList';
import { TranslatedRegex } from '../containers/translatedRegex';

export const App = () => {
    return (
        <div className="container">
            <RegexInputList />
            <TranslatedRegex />
        </div>
    );
}

