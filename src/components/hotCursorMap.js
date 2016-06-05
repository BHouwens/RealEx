import React from 'react';
import { hotCursor } from '../utils/hotCursor';
import { config } from '../utils/config';

export class HotCursorMap extends React.Component {
    
    constructor(props){
        super(props);
        this.classes = 'overlay-map';
        
        hotCursor.initialise(config, 'RealEx');
        window.addEventListener('mousemove', this.sendMouseCoordinates);
        
        this.generateHeatMap = this.generateHeatMap.bind(this);
    }
    
    sendMouseCoordinates(e){
        hotCursor.sendMouseCoordinates(e.layerX, e.layerY);
    }
    
    generateHeatMap(){
        this.classes += ' visible';
        hotCursor.generateHeatMap();
    }
    
    showAllSessionIDs(){
        hotCursor.showAllSessionIDs();
    }
    
    render(){
        return (
          <div className="hot-cursor-map">
            <button onClick={this.generateHeatMap}>Turn On Heatmap</button>
            <div className={this.classes}></div>
          </div>  
        );
    }
}