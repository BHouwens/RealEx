import React from 'react';
import { HotCursorMap } from '../HotCursorMap/hotCursorMap';
import { RegexList } from '../../containers/RegexList';
import { TranslatedRegex } from '../../containers/TranslatedRegex';

import styles from './app.css';

export class App extends React.Component {
    render(){
        return (
            <div>
                <HotCursorMap />
                <div className={styles.container}>
                    <RegexList />
                    <TranslatedRegex />
                </div>
            </div>
        );
    }
}

