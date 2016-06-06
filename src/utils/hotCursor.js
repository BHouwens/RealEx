import moment from 'moment';
import * as h337 from 'heatmap.js';
const firebase = require('firebase');

class HotCursor {
    constructor() {
        this.db = null;
        this.internalRef = null;
        this.uuid = '';
        this.step = 0;
        this.heatmap = null;
    }
    

    /**  
     *  Starts HotCursor up. 
     * 
     *  @param {Object} config - You can get this directly from Firebase
     *  @param {string} ref - The Firebase DB child node to attach data to. Optional
     */
    
    initialise(config, ref = null) {
        firebase.initializeApp(config);
        this.db = firebase.database();

        this.createUserSession(ref);
    }
    

    /**
     *  Creates a new session in the DB when a user begins. Only called internally.
     * 
     *  @param {string} passedRef - The DB to set the internal data reference to
     */
    
    createUserSession(passedRef) {
        this.uuid = 'user-' + this.generateUuid();
        this.internalRef = passedRef === null ? this.db.ref() : this.db.ref(passedRef);
        
        this.internalRef.child(this.uuid).set({});
    }
    

    /** 
     *  Generates a UUID 
     */
    
    generateUuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    

    /** 
     *  Sends mouse coordinates and timestamp to the Firebase DB
     * 
     *  @param {number} x - Mouse's x-axis coordinate
     *  @param {number} y - Mouse's y-axis coordinate
     */
    
    sendMouseCoordinates(x, y) {
        let timestamp = moment().format('MMM DD hh:mm:ss'),
            postObj = { timestamp, x, y },
            mouseCoordinateData = this.internalRef.child(this.uuid);
            
        mouseCoordinateData.child(this.step).set(postObj);
        this.step += 1;
    }
    
    
    /** 
     *  Logs all the UUIDs for the current project so they can
     *  be viewed or logged for data retrieval
     */
    
    logAllSessionIDs(){
        if (this.internalRef){
            console.log('--------');
            console.log('UUIDS FOR CURRENT PROJECT:');
            console.log('--------');
            
            this.internalRef.once('value', snap => {
               Object.keys(snap.val()).map(value => {
                   console.log(value);
               });
               
               console.log('--------');
            });
        }else{
            throw new Error('You need to initialise HotCursor with a Firebase DB to fetch UUIDs');
        }
    }
    
    
    /**  
     *  Generate a heatmap of the data for the given UUID. If no UUID is given,
     *  it will use the data from the current user session 
     * 
     *  @param {Object} config - Heatmap.js config, consisting of container for heatmap and radius
     *  @param {string} uuid - UUID whose data will be used for heatmap generation. Optional
     */
    
    generateHeatMap(config, uuid = this.uuid){
        if (uuid.indexOf('user-') == -1) uuid = 'user-' + uuid;
        
        if (this.internalRef.child(uuid)){
            this.heatmap = h337.create(config);
            
            this.internalRef.child(uuid).once('value', snap => {
                let dataFromDatabase = snap.val(),
                    heatmapData = dataFromDatabase.map(entry => {
                        return {
                            x: entry.x,
                            y: entry.y,
                            value: 80
                        };
                    });
                
                this.heatmap.setData({ max: 2000, data: heatmapData });
            }); 
        }else{
            throw new Error(
                `The UUID ${uuid} doesn't exist for the current project. 
                 Make sure the UUID you've provided is correct`
            );
        }
    }
}

export const hotCursor = new HotCursor();