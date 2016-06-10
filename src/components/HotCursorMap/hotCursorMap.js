import React from 'react';
import * as Rx from 'rx';
import { hotCursor } from '../../utils/hotCursor';
import { config } from '../../utils/config';
import styles from './HotCursorMap.css';

export class HotCursorMap extends React.Component {

    constructor(props) {
        super(props);

        this.generateHeatMap = this.generateHeatMap.bind(this);
        this.state = {
            overlayClasses: styles.overlay,
            buttonClasses: styles.button_container,
            bgClasses: styles.background
        };

        hotCursor.initialise(config, 'RealEx');
        window.addEventListener('mousemove', this.sendMouseCoordinates, true);
    }


    sendMouseCoordinates(e) {
        hotCursor.sendMouseCoordinates(e.layerX, e.layerY);
    }


    /**
     *  Subscribes to the data feed and pipes it to the heatmap
     * 
     *  @param {Rx.Observable} dataFeed - Data feed to subscribe to
     */

    subscribeAndGenerate(dataFeed) {
        dataFeed.subscribe(
            entry => {
                hotCursor.heatmap.addData({
                    x: entry.x,
                    y: entry.y,
                    value: entry.value
                });
            },

            error => {
                throw new Error(
                    `Error processing subscription data 
                     from Firebase: ${error}`
                );
            },

            () => {
                console.log('Heatmap complete');
            }
        );
    }


    /**
     *  Generates heatmap on button click. Removes event listener and 
     */

    generateHeatMap() {
        let config = { container: document.querySelector('.' + styles.overlay), radius: 50 };

        this.setState({
            overlayClasses: styles.overlay + ' ' + styles.visible,
            buttonClasses: styles.button_container + ' ' + styles.hidden,
            bgClasses: styles.background + ' ' + styles.visible
        });

        window.removeEventListener('mousemove', this.sendMouseCoordinates, true);

        hotCursor.getHeatMapData(config).then(dataFeed => {
            this.subscribeAndGenerate(dataFeed);
        });
    }

    render() {
        return (
            <div>
                <div className={this.state.buttonClasses}>
                    <button id="clicker" className={styles.button} onClick={this.generateHeatMap}>Start Heatmap</button>
                </div>
                <div className={this.state.overlayClasses}></div>
                <div className={this.state.bgClasses}></div>
            </div>
        );
    }
}