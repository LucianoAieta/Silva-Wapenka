"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mysql_1 = __importDefault(require("mysql"));
const util_1 = require("util");
const database = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'escribania_sw',
};
const pool = mysql_1.default.createPool(database);
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if (connection) {
        connection.release();
    }
});
const query = util_1.promisify(pool.query).bind(pool);
module.exports = { pool, query };