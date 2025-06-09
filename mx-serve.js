/**
 *  @license
 * Licensed Materials - Property of IBM
 * 5724-U18, 5737-M66
 * (C) Copyright IBM Corp. 2016,2021 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * Launches a server so you can manually inspect your component's test or demo
 *
 * mx-serve.js test|demo COMPONENT_NAME
 * eg, mx-serve.js test button
 * eg, mx-serve.js demo button
 */

var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var server = require('live-server');

/**
 * Process an error
 * @param code
 * @param msg
 */
function error(code, msg) {
    console.log("ERROR: [" + code + "]: " + msg);
    // prevent node from showing ugly error
    shell.exit(0);
}

// node/npm script adds 2 args to the start of the list, we remove them
var args = process.argv.slice(2);
if (args<2) {
    error(1, "Usage: mx-serve.js demo component-name");
}

var cmd = args[0];
var component=args[1];

var comp_dir =`script/maximocomponents/maximo-${component}`
if (!fs.existsSync(comp_dir)) {
    error(2,`${component} is not a component`);
}

var params = {
    wait: 0, // Waits for all changes, before reloading. Defaults to 0 sec.
    logLevel: 2 // 0 = errors only, 1 = some, 2 = lots
};

if (cmd==='test') {
    var test_comp=`${comp_dir}/test/index.html`;
    if (!fs.existsSync(test_comp)) {
        error(3, `No Test for ${component}`);
    }
    console.log(`Testing ${test_comp}`);
    params.open='/'+test_comp;
} else if (cmd==='demo') {
    var demo=`${comp_dir}/demo/`;
    if (!fs.existsSync(demo)) {
        error(4, `No Demo for ${component}`);
    }
    console.log(`Viewing Demo for ${demo}`);
    params.open=`/demo.html?component=maximo-${component}`;
}

server.start(params);
