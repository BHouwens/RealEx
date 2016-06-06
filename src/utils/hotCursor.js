import moment from 'moment';
const firebase = require('firebase');

class HotCursor {
    constructor() {
        this.config = {};
        this.db = null;
        this.internalRef = null;
        this.uuid = '';
        this.step = 0;
    }

    /**  
     *  Starts HotCursor up. 
     * 
     *  @param {Object} config - You can get this directly from Firebase
     *  @param {string} ref - The Firebase DB child node to attach data to. Optional
     */
    
    initialise(config, ref = null) {
        this.config = config;

        firebase.initializeApp(config);
        this.db = firebase.database();

        this.createUserSession(ref);
    }

    /**
     *  Creates a new session in the DB when a user begins. Only called internally.
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
            throw new Error('You need to initialise hotCursor with a Firebase DB to fetch UUIDs');
        }
    }
    
    /**  
     *  Generate a heatmap of the data for the given UUID. If no UUID is given,
     *  it will use the data from the current user session 
     */
    
    generateHeatMap(uuid = this.uuid){
        if (uuid.indexOf('user-') == -1) uuid = 'user-' + uuid;
        
        if (this.internalRef.child(uuid)){
            this.internalRef.child(uuid).once('value', snap => {
                console.log(snap.val());
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