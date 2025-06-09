/**
 *  @license
 * Licensed Materials - Property of IBM
 * 5724-U18, 5737-M66
 * (C) Copyright IBM Corp. 2016,2021 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * Usage: mx-create.js component COMPONENT_NAME
 * eg, node mx-create.js component mybutton
 * will create maximo-mybutton in the maximocomponents directory
 */

let fs = require('fs');
let path = require('path');
let shell = require('shelljs');

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
 * process a template item replacing the 'XXX' with 'component-name'
 * @param item
 */
function processTemplateItem(item) {
    let tp_item = path.join(template_dir, item);
    let new_item = item.replace(/XXX/g, comp_name);
    if (!fs.existsSync(tp_item)) return;
    if (fs.statSync(tp_item).isDirectory()) {
        console.log(`Creating: ${new_dir}/${new_item}`);
        shell.mkdir('-p',path.join(new_dir, new_item));
    } else {
        console.log(`Upgrading ${new_dir}/${new_item}`);
        shell.cat(path.join(tp_item)).sed(/XXX/g,comp_name).to(path.join(new_dir,new_item));
    }
}

// node/npm script adds 2 args to the start of the list, we remove them
let args = process.argv.slice(2);
if (args<1) {
    error(1,"Usage create.js component component-name");
}

let comp_action = args[0];
args = args.slice(1);
if (comp_action !== 'component') {
    error(2, `Only 'component' is implemented.  You passed ${comp_action}`);
}
if (args.length<1) {
    error(3, 'Missing component name');
}


let comp_name = args[0];
args = args.slice(1);
if (comp_name.startsWith('maximo-')) {
    error(4, 'Components name cannot include the "maximo-" prefix');
} else if (comp_name.startsWith('-')) {
    error(5, 'Components name cannot start with "-" prefix');
} else if (comp_name !== comp_name.toLowerCase()) {
    error(6, 'Components must be all lowercase');
}

console.log(`Creating component maximo-${comp_name}`);

let maximo_components = 'script/maximocomponents/';
let template_dir = path.join(maximo_components, '_template');

if (!fs.existsSync(template_dir)) {
    error(7, `Missing Template Dir ${template_dir}`);
}
let mx_base_file_name = 'maximo-' + comp_name;
let new_dir = path.join(maximo_components, mx_base_file_name);

if (fs.existsSync(new_dir)) {
    error(8, `Component directory ${new_dir} already exists!`);
}

// build the component
shell.mkdir('-p', new_dir);
shell.find(template_dir).map(function(it) {
    return it.substring(template_dir.length+1);
}).forEach(processTemplateItem);
