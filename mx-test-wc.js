/**
 *  @license
 * Licensed Materials - Property of IBM
 * 5724-U18, 5737-M66
 * (C) Copyright IBM Corp. 2016,2021 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * Test Web Component script
 * <pre>node mx-test-wc.js [PATH_TO_COMPONENTS_TOP_DIR | PATH_TO_SINGLE_COMPONENT]</pre>
 * <pre>eg,</pre>
 * <pre># node mx-test-wc.js script/maximocomponents/maximo-button/</pre>
 */

var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

/**
 * Finds all testable components starting with dir
 * @param dir start directory
 * @returns Array of testable component directories
 */
function getFolders(dir) {
    if (dir.endsWith('test')) return [dir];
    return fs.readdirSync(dir)
        .filter(function(file) {
            return file === 'test' || fs.existsSync(path.join(dir, file, 'test'));
        }).map(function (file) {
            if (file==='test') {
                return path.join(dir, file);
            } else {
                return getFolders(path.join(dir, file, 'test'));
            }
        });
}

function getFolders2(dir, filelist) {
	  var fs = fs || require('fs'),
	      files = fs.readdirSync(dir);
	  filelist = filelist || [];
	  files.forEach(function(file) {
        if (file.startsWith("_") || file === 'demo') return;
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            if (file === 'test') {
                filelist.push(dir + "/" + file);
            } else {
                filelist = getFolders2(dir + '/' + file, filelist);
            }
        }
	  });
	  return filelist;
	};

// node/npm script adds 2 args to the start of the list, we remove them
var args = process.argv.slice(2);
if (args<1) {
    console.log("Need to pass a test folder");
    shell.exit(1);
}

if (args[0] === 'recent') {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }

    // find a list of recently changed maximo components
    var child = shell.exec('git log --pretty=format: --name-only --since="1 days ago" | sort | uniq', function(error, stdout, stderr) {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        if (stdout) {
            var tests = stdout.split("\n").filter((line) => {
                return line.includes('maximo-');
            }).map((file) => {
                return file;
            });

            tests.forEach((file)=> {
                console.log(`TODO: Test This ${file}`);
            });
        }
    });
} else {
    // find all tests
    //var tests = getFolders(args[0]);
	var tests = [];
	tests = getFolders2(args[0], tests);
    if (!tests.length) {
        console.log("No Tests in " + args[0]);
        shell.exit(1);
    }

  
  if(args.includes('batch')){
	  var numTests = tests.length;
	  var totalBatch = Math.ceil(numTests/10);
	  var counter = 0;
	  shell.echo('Batch Processing Enabled...');
	  //execute tests in batches of 10 
		var testList = '';
		var count=0;
		tests.forEach(function(test){
			count++;
			testList = testList.concat(' ',test);
			if(count==10){
				counter++;
				shell.echo('Processing '+counter+' of '+totalBatch+' unit test batches.');
				var cmd = "node node_modules/web-component-tester/bin/wct --expanded --color "+  testList;
				console.log(cmd);
	            shell.exec(cmd, {async: false});
	            testList = '';
	            count = 0;
			}
		});
		
		if(testList!==''){
			counter++;
			shell.echo('Processing '+counter+' of '+totalBatch+' unit test batches.');
			var cmd = "node node_modules/web-component-tester/bin/wct --expanded --color "+  testList;
			console.log(cmd);
	        shell.exec(cmd, {async: false});
	        testList = '';
	        count = 0;
		} 
		
		shell.exit(0);
  } else {
	  // setup the web-component-tester and run
	  var cmd = "node node_modules/web-component-tester/bin/wct --expanded --color " + tests.join(" ");
	  console.log(cmd);
	  shell.exec(cmd, {async: false});
	  shell.exit(0);  
  }  
}
