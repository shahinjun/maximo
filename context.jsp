<%--
 @license 
 Licensed Materials - Property of IBM
 5724-U18, 5737-M66
 (C) Copyright IBM Corp. 2018,2021 All Rights Reserved.
 US Government Users Restricted Rights - Use, duplication, or disclosure
 restricted by GSA ADP Schedule Contract with IBM Corp.
--%>
<%
	String designMode = request.getParameter("designmode");
	if(designMode != null){
		request.getSession().setAttribute("designmode", Boolean.parseBoolean(designMode));
	}
%>{"designmode": <%= Boolean.parseBoolean(designMode) %>}
