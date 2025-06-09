/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2021 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

const XunitViewerCli = require('xunit-viewer/cli')
XunitViewerCli({
    results: 'build/test-results/',
    ignore: [],
    output: 'build/test-results/index.html',
    title: 'Lightning Unit Tests',
    port: false,
    watch: false,
    color: true,
    filter: {}
})
