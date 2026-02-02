// To be implemented in MongoDB

import { uid } from 'uid';

export default class Exercise {
    /**
     * 
     * @param {string} name
     * @param {Number} reps
     * @param {Number} weight
     * @param {String} unit
     * @param {String} date
     * @param {Object} _id
     */
    constructor(name, reps, weight, unit, date, _id) {
        this.name = name;
        this.reps = reps;
        this.weight = weight;
        this.unit = unit;
        this.date = date;
        this._id = uid(24);
    }
}