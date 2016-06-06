import React from 'react';
import { hotCursor } from '../utils/hotCursor';
import { config } from '../utils/config';
import styles from '../../styles/hot-cursor.css';

export class HotCursorMap extends React.Component {
    
    constructor(props){
        super(props);
        this.generateHeatMap = this.generateHeatMap.bind(this);
        
        this.state = {
            classes: styles.overlay
        };
        
        hotCursor.initialise(config, 'RealEx');
        window.addEventListener('mousemove', e => {
            hotCursor.sendMouseCoordinates(e.layerX, e.layerY);
        });
    }
    
    generateHeatMap(){
        this.setState({ classes: styles.overlay + ' ' + styles.visible });
        // hotCursor.generateHeatMap();
    }
    
    render(){
        return (
          <div className={styles.container}>
            <button className={styles.button} onClick={this.generateHeatMap}>Turn On Heatmap</button>
            <div className={this.state.classes}></div>
          </div>  
        );
    }
}