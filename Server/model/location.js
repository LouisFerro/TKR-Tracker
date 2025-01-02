"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
class Location {
    constructor(uuid = "", user_uuid = 0, latitude = 0, longitude = 0, timestamp = new Date()) {
        this.uuid = uuid;
        this.user_uuid = user_uuid;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = timestamp;
    }
}
exports.Location = Location;
