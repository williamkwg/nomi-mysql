'use strict';

const assert = require('assert');
const rds = require('ali-rds');

let count = 0;

module.exports = function (config,ctx) {
    assert(config.host && config.port && config.user && config.database,
        `dbhost: ${config.host}', 'port: ${config.port}', 'user: ${config.user}', 'database: ${config.database}' are required`);


    const client = rds(config);
    return client;
}