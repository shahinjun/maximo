/**
 *  @license
 * Licensed Materials - Property of IBM
 * 5724-U18, 5737-M66
 * (C) Copyright IBM Corp. 2016,2021 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * node mx-report-wc [all|test|demo|good]
 *  if 'all' then a full report is created
 *  if 'test' then ONLY components missing tests are listed
 *  if 'demo' then ONLY components missing demo are lists
 *  if 'ok' then ONLY components that HAVE test and demos are listed
 */

var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

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


/**
 * Finds all testable components starting with dir
 * @param dir start directory
 * @returns Array of testable component directories
 */
function getComponents(dir) {
    if (dir.endsWith('test')) return [dir];
    return fs.readdirSync(dir)
        .filter(function(file) {
            return file.startsWith('maximo-');
        }).map(function (file) {
            return path.join(dir, file);
        });
}

// node/npm script adds 2 args to the start of the list, we remove them
var args = process.argv.slice(2);
if (args<1) {
    error(1, "Need to pass a command all|test|demo|ok");
}

// find all comps
var comps = getComponents('script/maximocomponents/');
if (!comps.length) {
    error(2, `No Components`);
}

let mode='all';
if (args.length>1) {
    mode=args[1];
}

var stats = {comps: 0, tests: 0, missing_tests: 0, demos: 0, missing_demos: 0};
comps.filter(function(it) {
    stats.comps++;
    if (mode==='all') {
        return true;
    }
    let hasTest = fs.existsSync(path.join(it, 'test'));
    let hasDemo = fs.existsSync(path.join(it, 'demo'));
    if (mode==='ok' && hasTest && hasDemo) return true;
    if (mode==='test' && !hasTest) return true;
    if (mode==='demo' && !hasDemo) return true;
    return false;

}).forEach(function(c) {
    let hasTest = fs.existsSync(path.join(c, 'test'));
    let hasDemo = fs.existsSync(path.join(c, 'demo'));

    console.log("Component: " + c);
    if (hasTest) {
        stats.tests++;
        console.log(`     [OK]: ${c} Has Test`);
    } else {
        stats.missing_tests++;
        console.log(`  [ERROR]: ${c} Missing Test`);
    }

    if (hasDemo) {
        stats.demos++;
        console.log(`     [OK]: ${c} Has Demo`);
    } else {
        stats.missing_demos++;
        console.log(`   [WARN]: ${c} Missing Demo`);
    }
    console.log('');
});

console.log(`${stats.comps} Components, ${stats.tests} Tests, ${stats.demos} Demos, ${stats.missing_tests} Missing Tests, ${stats.missing_demos} Missing Demos`);
