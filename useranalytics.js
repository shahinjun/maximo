/*
 * @license
 * Licensed Materials - Property of IBM
 * 5724-U18, 5737-M66
 * (C) Copyright IBM Corp. 2017,2021 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * NOTE: THE API in this file should be for internal use only and should not be used
 * by customers.
 */

/**
 * A function to track analytics related a user accessing a particular workcenter or sub pages 
 * of a work center. 
 */
function trackAnalyticsPageview(pageName, description, path, parentPageName)
{
	if (!$M.isAnalyticsEnabled())
		return;
	
	console.log('# trackAnalyticsPageview: pageName: ' + pageName + ', description: ' + description);
}


/**
 * A function to track analytics related an object created by a user using application. 
 * An objectType can be any object type that we would like to track. 
 * For ex: A user creating an asset
 */
function trackAnalyticsCreatedObject(objectType, milestoneName)
{
	if (!$M.isAnalyticsEnabled())
		return;

	console.log('# trackAnalyticsCreatedObject: objectType: ' + objectType);
}


/**
 * A function to track analytics related an action performed by a user using application. 
 * An action can be any action that we would like to track. 
 * For ex: A user selecting owner for a work order
 */
function trackAnalyticsPerformedAction(objectType, action, milestoneName)
{
	if (!$M.isAnalyticsEnabled())
		return;

	console.log('# trackAnalyticsPerformedAction: action: ' + action);
}
/**
 * A function to track analytics related a user login.
 */
function trackAnalyticsLogin()
{
	if (!$M.isAnalyticsEnabled())
		return;

	console.log('# trackAnalyticsLogin');
}

/**
 * A function to track analytics related a user logout.
 */
function trackAnalyticsLogout()
{
	if (!$M.isAnalyticsEnabled())
		return;

	console.log('# trackAnalyticsLogout');
}

/**
 * A function to track analytics related to event fired by the application. 
 * An eventName can be anything that we would like to track. 
 * For ex: A user changing the status of a work and the eventName can be CHANGESTATUS
 */
function trackAnalyticsEvent(objectType, object, actionName, milestoneName)
{
	if (!$M.isAnalyticsEnabled())
		return;

	console.log('# trackAnalyticsEvent: objectType: ' + objectType);
}

/**
 * A function to track analytics related to process started by the application. 
 * A processName can be anything that we would like to track. 
 * For ex: A user navigating through creating a service request 
 *          and the processName can be CREATESERVICEREQUEST
 */
function trackAnalyticsProcessStart(processName, milestoneName)
{
	if (!$M.isAnalyticsEnabled())
		return;

	console.log('# trackAnalyticsProcessStart: processName: ' + processName);
}

/**
 * A function to track analytics related to process finished by the application. 
 * A processName can be anything that we would like to track. 
 * For ex: A user navigating through creating a service request 
 *          and the processName can be CREATESERVICEREQUEST
 */
function trackAnalyticsProcessEnd(processName, milestoneName)
{
	if (!$M.isAnalyticsEnabled())
		return;

	console.log('# trackAnalyticsProcessEnd: processName: ' + processName);
}


