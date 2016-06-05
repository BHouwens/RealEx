import React from 'react';
import { HotCursorMap } from './hotCursorMap';
import { RegexList } from '../containers/RegexList';
import { TranslatedRegex } from '../containers/TranslatedRegex';

import '../../styles/container.css';

export class App extends React.Component {
    render(){
        return (
            <div className="container">
                <HotCursorMap />
                <RegexList />
                <TranslatedRegex />
            </div>
        );
    }
}

