import moment from 'moment';
import * as Rx from 'rx';
import * as h337 from 'heatmap.js';
import * as firebase from 'firebase';

class HotCursor {

    constructor() {
        this.db;
        this.heatmap;
        this.currentProjectRef;
        this.uuid = '';
        this.step = 0;
        this.currentScrollPosition = 0;
        this.lastRecordedTime = moment().format('MMM DD hh:mm:ss');
    }


    /**  
     *  Starts HotCursor up. 
     * 
     *  @param {Object} config - The web initialisation config directly from Firebase
     *  @param {string} ref - The Firebase DB child node to attach data to. 
     *                        Generally the project name. Optional
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
        this.currentProjectRef = passedRef === null ? this.db.ref() : this.db.ref(passedRef);

        this.currentProjectRef.child(this.uuid).set({
            url: window.location.href,
            width: window.innerWidth,
            height: window.innerHeight
        });
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
            scrollPosition = window.pageYOffset,
            coordinateData = { timestamp, scrollPosition, x, y },
            userData = this.currentProjectRef.child(this.uuid);

        userData.child(this.step).set(coordinateData);
        this.step += 1;
    }


    /** 
     *  Returns all the UUIDs for the passed project. If no project is passed
     *  it will return the UUIDs for the current project
     * 
     *  @param {string} project - Project name to fetch UUIDs for. Optional
     *  @param {boolean} logging - Whether to log the UUIDs to console for inspection
     */

    getAllSessionIDs(project = null, logging = false) {
        let uuids = [],
            projectRef = project === null ? this.currentProjectRef : this.db.ref(project);

        if (projectRef) {
            if (logging) {
                console.log('--------');
                console.log('UUIDS FOR PASSED PROJECT:');
                console.log('--------');
            }

            this.currentProjectRef.once('value', snap => {
                Object.keys(snap.val()).map(value => {
                    if (logging) console.log(value);
                    uuids.push(value);
                });

                if (logging) console.log('--------');
                return uuids;
            });
        } else {
            throw new Error(`There is no project ${project} in the Firebase database`);
        }
    }


    /**
     *  Converts object-modelled data from Firebase into an array to be piped
     *  to the Heatmap instance
     * 
     *  @param {Object} dataFromDatabase - The data object to be munged into an array
     */

    mungeDatabaseData(dataFromDatabase) {
        let mungedArray = [];

        for (let entry in dataFromDatabase) {
            if (!isNaN(parseInt(entry))) {
                mungedArray.push({
                    value: 0.2,
                    x: dataFromDatabase[entry].x,
                    y: dataFromDatabase[entry].y,
                    scrollPosition: dataFromDatabase[entry].scrollPosition,
                    timestamp: dataFromDatabase[entry].timestamp
                });
            }
        }

        return mungedArray;
    }


    /**
     *  Create a delayed mapping of database entry for RxJS stream
     * 
     *  @param {Object} entry - Database entry to map delay from and munge
     */

    getDelayAndMap(entry) {
        let { x, y, value, scrollPosition } = entry,
            delayInMilliseconds = moment(entry.timestamp).diff(this.lastRecordedTime),
            delayObservable = Rx.Observable.of({ x, y, value, scrollPosition }),
            finalDelay = delayInMilliseconds > 0 ? delayInMilliseconds : 100,
            finalDelayMapping = delayObservable.delay(finalDelay);

        this.lastRecordedTime = entry.timestamp;
        return finalDelayMapping;
    }


    /**
     *  Gets heatmap data and returns a promise to generate with
     * 
     *  @param {Object} config - Heatmap.js config, consisting of container for heatmap and radius
     *  @param {string} uuid - UUID whose data will be used for heatmap generation. Optional
     */

    getHeatMapData(config, uuid = this.uuid) {
        if (uuid.indexOf('user-') == -1) uuid = 'user-' + uuid;

        if (this.currentProjectRef.child(uuid)) {

            this.heatmap = h337.create(config);
            return this.currentProjectRef
                       .child(uuid)
                       .once('value')
                       .then(data => {
                            const dataFromDatabase = data.val(),
                                  heatmapData = this.mungeDatabaseData(dataFromDatabase);

                            return Rx.Observable
                                     .from(heatmapData)
                                     .concatMap(entry => this.getDelayAndMap(entry));
                        });

        } else {
            throw new Error(
                `The UUID ${uuid} doesn't exist for the current project. 
                 Make sure the UUID you've provided is correct`
            );
        }
    }
}

export const hotCursor = new HotCursor();