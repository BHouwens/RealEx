import * as moment from 'moment';

const firebase = require('firebase');

class HotCursor {
    constructor() {
        this.config = {};
        this.db = null;
        this.internalRef = null;
        this.uuid = '';
        this.step = 0;
    }

    /* Start HotCursor up. The config will be that provided by Firebase */
    initialise(config, ref = null) {
        this.config = config;

        firebase.initializeApp(config);
        this.db = firebase.database();

        this.createUserSession(ref);
    }

    createUserSession(passedRef) {
        this.uuid = 'user-' + this.generateUuid();
        this.internalRef = passedRef === null ? this.db.ref() : this.db.ref(passedRef);
        
        this.internalRef.child(this.uuid).set({});
    }

    generateUuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    sendMouseCoordinates(x, y) {
        let timestamp = 'yes',
            postObj = { timestamp, x, y },
            mouseCoordinateData = this.internalRef.child(this.uuid);
            
        mouseCoordinateData.child(this.step).set(postObj);
        this.step += 1;
    }
}

export const hotCursor = new HotCursor();