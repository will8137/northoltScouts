var events = require("events");

var EventEmitter = require("events").EventEmitter;
 
var hub = new EventEmitter();

module.exports = hub;