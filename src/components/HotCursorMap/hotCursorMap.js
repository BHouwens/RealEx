import React from 'react';
import * as Rx from 'rx';
import { hotCursor } from '../../utils/hotCursor';
import { config } from '../../utils/config';
import { scrollToPosition } from '../../utils/scroll';
import styles from './HotCursorMap.css';

export class HotCursorMap extends React.Component {

    constructor(props) {
        super(props);

        this.generateHeatMap = this.generateHeatMap.bind(this);
        this.acknowledgeComplete = this.acknowledgeComplete.bind(this);

        this.state = {
            overlayClasses: styles.overlay,
            buttonClasses: styles.button_container,
            bgClasses: styles.background,
            completeClasses: styles.complete,
            loaderClasses: styles.loader + ' ' + styles.hidden
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
        this.setState({ loaderClasses: styles.loader + ' ' + styles.hidden });

        dataFeed.subscribe(
            entry => {
                hotCursor.heatmap.addData({
                    x: entry.x,
                    y: entry.y,
                    value: entry.value
                });

                if (entry.scrollPosition != hotCursor.currentScrollPosition){
                    scrollToPosition(entry.scrollPosition);
                    hotCursor.currentScrollPosition = entry.scrollPosition;
                }
            },

            error => {
                throw new Error(
                    `Error processing subscription data 
                     from Firebase: ${error}`
                );
            },

            () => {
                this.setState({ completeClasses: styles.complete + ' ' + styles.visible });
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
            bgClasses: styles.background + ' ' + styles.visible,
            loaderClasses: styles.loader
        });

        window.removeEventListener('mousemove', this.sendMouseCoordinates, true);

        hotCursor.getHeatMapData(config).then(dataFeed => {
            this.subscribeAndGenerate(dataFeed);
        });
    }


    /**
     *  Closes the "complete" notifier bar
     */

    acknowledgeComplete(e) {
        this.setState({ completeClasses: styles.complete });
    }


    render() {
        return (
            <div>
                <div className={this.state.loaderClasses}></div>

                <div className={this.state.buttonClasses}>
                    <button id="clicker" className={styles.button} onClick={this.generateHeatMap}>Start Heatmap</button>
                </div>
                <div onClick={this.acknowledgeComplete} className={this.state.completeClasses}>heatmap complete!</div>

                <div className={this.state.overlayClasses}></div>
                <div className={this.state.bgClasses}></div>
            </div>
        );
    }
}