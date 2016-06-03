import React from 'react';
import { RegexList } from '../containers/RegexList';
import { hotCursor } from '../utils/hotCursor';
import { TranslatedRegex } from '../containers/TranslatedRegex';

import '../../styles/container.css';

export class App extends React.Component {
    
    constructor(props){
        super(props);
        window.addEventListener('mousemove', this.sendMouseCoordinates);
    }
    
    sendMouseCoordinates(e){
        hotCursor.sendMouseCoordinates(e.layerX, e.layerY);
    }
    
    render(){
        return (
            <div className="container">
                <RegexList />
                <TranslatedRegex />
            </div>
        );
    }
}

