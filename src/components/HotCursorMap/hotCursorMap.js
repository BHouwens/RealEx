import React from 'react';
import { hotCursor } from '../../utils/hotCursor';
import { config } from '../../utils/config';
import styles from './HotCursorMap.css';

export class HotCursorMap extends React.Component {
    
    constructor(props){
        super(props);

        this.generateHeatMap = this.generateHeatMap.bind(this);
        this.state = {
            overlayClasses: styles.overlay,
            buttonClasses: styles.button_container,
            bgClasses: styles.background
        };
        
        hotCursor.initialise(config, 'RealEx');

        window.addEventListener('mousemove', e => {
            hotCursor.sendMouseCoordinates(e.layerX, e.layerY);
        });
    }
    
    generateHeatMap(){
        let config = { container: document.querySelector('.' + styles.overlay), radius: 90 };
        
        this.setState({ 
            overlayClasses: styles.overlay + ' ' + styles.visible,
            buttonClasses: styles.button_container + ' ' + styles.hidden,
            bgClasses: styles.background + ' ' + styles.visible
         });
        
        hotCursor.generateHeatMap(config);
    }
    
    render(){
        return (
          <div>
            <div className={this.state.buttonClasses}>
                <button id="clicker" className={styles.button} onClick={this.generateHeatMap}>Turn On Heatmap</button>
            </div>
            <div className={this.state.overlayClasses}></div>
            <div className={this.state.bgClasses}></div>
          </div>  
        );
    }
}