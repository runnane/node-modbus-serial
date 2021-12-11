/* eslint-disable no-console, spaced-comment */

// create an empty modbus client
//var ModbusRTU = require("modbus-serial");
var ModbusRTU = require("../index");
var client = new ModbusRTU();

// open connection to a serial port
//client.connectRTUBuffered("/dev/ttyUSB0", {baudRate: 9600})
client.connectTCP("172.20.100.4", { port: 502 })
    .then(setClient)
    .then(function() {
        console.log("Connected"); })
    .catch(function(e) {
        console.log(e.message); });

function setClient() {
    // set the client's unit id
    // set a timout for requests default is null (no timeout)
    client.setID(1);
    client.setTimeout(1000);

    // run program
    run();
}

function run() {
    // write to coil
    client.writeCoilDupline(3061, 0x0001)
        .then(function(d) {
            console.log("Write 0x0001 to coil 5", d); })
        .catch(function(e) {
            console.log(e.message); })
        .then(close);
}

function close() {
    client.close();
}
