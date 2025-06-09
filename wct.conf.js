module.exports = {
	'plugins': {
		  'local': {
		    'skipSeleniumInstall': true,
		    'disabled': true,
		    'browsers': [
		      'chrome'
		    ]
		  },
		  "wct-xunit": {
		    },
		  'headless': {
	          'browsers': [
	            'chrome'
	          ],
		       'browsersOptions': {
	    	      'chrome': [
	    	        'start-maximized',
	    	        'headless',
	    	        'disable-gpu',
	    	        'no-sandbox'
	    	      ]
	    	    }	       
		  }
	},
	'clientOptions': {
		'mochaOptions': {
			'timeout': 60000
		}
	}
};