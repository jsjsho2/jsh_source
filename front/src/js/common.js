/*
 * 공통 자바스크립트
 */

function getSearchDate(val,st,ed){
     var date = new Date();
     var y = date.getFullYear();
     var m = date.getMonth();
     var d = date.getDate();
     var today = date.getFullYear()+"-"+getCheckDate(date.getMonth()+1)+"-"+getCheckDate(date.getDate());
     if (val == "today") {
    	 $("#"+st).val(today);
     }else if (val == "1w") {
    	 date = new Date(y, m, d-7);
    	 $("#"+st).val(date.getFullYear()+"-"+getCheckDate(date.getMonth()+1)+"-"+getCheckDate(date.getDate()));
     }else if (val == "1m") {
    	 date = new Date(y, m-1, d);
    	 $("#"+st).val(date.getFullYear()+"-"+getCheckDate(date.getMonth()+1)+"-"+getCheckDate(date.getDate()));
     }else if (val == "3m") {
    	 date = new Date(y, m-3, d);
    	 $("#"+st).val(date.getFullYear()+"-"+getCheckDate(date.getMonth()+1)+"-"+getCheckDate(date.getDate()));
     }else if(val == "all"){
    	 $("#"+st).val("");
     }
     
     if(val != "all"){
    	 $("#"+ed).val(today);
     }else{
    	 $("#"+ed).val("");
     }
} 

function getSearchDocType(val){
    if(val == "Y"){
    	$("#hidApprovalDocType").val("Y");
    }else if(val == "N"){
    	$("#hidApprovalDocType").val("N");
    }

}

function getCheckDate(param){
	if (parseInt(param) < 10) {
		return "0"+param;
	}else {
		return param;
	}
}

/*
 * IP를 정수형으로 변환
 */
function dot2num(dot) 
{
    var d = dot.split('.');
    return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
}

/*
 * 정수형IP를 IP으로 변환
 */
function num2dot(num) 
{
    var d = num%256;
    for (var i = 3; i > 0; i--) 
    { 
        num = Math.floor(num/256);
        d = num%256 + '.' + d;
    }
    return d;
}

/*
설명  : 폼 입력값을 정규식패턴을 이용해서 체크함
사용법 : checkForm(조건, 문자열)
결과값 : true/false
조건  : 
 0 = 첫글자 영문, 영문, 숫자, _ 사용가능
 1 = 영문만 사용가능
 2 = 숫자만 사용가능
 3 = 한글만 사용가능
 4 = 영문, 숫자 사용가능
 5 = 영문, 숫자, 한글 사용가능
 6 = 한글, 숫자 사용가능
 7 = 한글, 영문 사용가능
 8 = 한글을 포함하는지 여부
 9 = 파일확장자
 10= message code
 11= IP List
 12= 온라인서비스 포트 예외 
 13= 이메일주소
 14= MAC주소
*/
function checkForm(chkFrm, chkStr){
	 var objPattern;
	 switch(chkFrm){
	  case(0) :
	   objPattern = /^[a-zA-Z]{1}[a-zA-Z0-9_]+$/;
	   break;
	  case(1) :
	   objPattern = /^[a-zA-Z]+$/;
	   break;
	  case(2) :
	   objPattern = /^[0-9]+$/;
	   break;
	  case(3) :
	   objPattern = /^[가-힣]+$/;
	   break;
	  case(4) :
	   objPattern = /^[a-zA-Z0-9]+$/;
	   break;
	  case(5) :
	   objPattern = /^[가-힣a-zA-Z0-9]+$/;
	   break;
	  case(6) :
	   objPattern = /^[가-힣0-9]+$/;
	   break;
	  case(7) :
	   objPattern = /^[가-힣a-zA-Z]+$/;
	   break;
	  case(8) :
	   objPattern = /[가-힣]/;
	   break;
	  case(9) :
	   objPattern = /^[a-zA-Z0-9!@#$%^()\-_=+\[\]{};\',.`~&]+$/;
	   break;
	  case(10) :
	   objPattern = /^[a-zA-Z0-9._]+$/;
	   break;
	  case(11) :
	   objPattern = /[0-9,.-]+$/;
	   break;
	  case(12) :
	   objPattern = /[0-9,-]+$/;
	   break;
	  case(13) :
	   objPattern = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	  break;
	  case(14) :
		  objPattern = /([a-fA-F0-9]+){12}$/;
	   break;
	 }
	 return objPattern.test(chkStr); 
}

function kin4(str, max){ 
    if(!max) max = 3; // 글자수를 지정하지 않으면 4로 지정 
    var i, j, k, x, y; 
    var buff = ["0123456789", "abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"]; 
    var src, src2, ptn=""; 

    for(i=0; i<buff.length; i++){ 
        src = buff[i]; // 0123456789 
        src2 = buff[i] + buff[i]; // 01234567890123456789 
        for(j=0; j<src.length; j++){ 
            x = src.substr(j, 1); // 0 
            y = src2.substr(j, max); // 0123 
            ptn += "["+x+"]{"+max+",}|"; // [0]{4,}|0123|[1]{4,}|1234|... 
            ptn += y+"|"; 
        } 
    } 
    ptn = new RegExp(ptn.replace(/.$/, "")); // 맨마지막의 글자를 하나 없애고 정규식으로 만든다. 

    if(ptn.test(str)) return true; 
    return false; 
} 

function isIP(chkStr){
	var ret = false;
	if(chkStr.search(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/) >= 0)
	{
		var arrIP = chkStr.split('.');
		if(arrIP.length == 4)
		{
			if(arrIP[0] < 256 && arrIP[1] < 256 && arrIP[2] < 256 && arrIP[3] < 256)
			{
				ret = true;
			}
		}
	}
	return ret;
}


function initCap(str) {
  var str = str.substring(0, 1).toUpperCase() + str.substring(1);
  return str;
}


function byteConvertor(bytes) {

	bytes = parseInt(bytes);
	var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	var e = Math.floor(Math.log(bytes)/Math.log(1024));
	var f = (e==0)?0:2;
	
	if(e == "-Infinity") return "0 "+s[0]; 
	else return (bytes/Math.pow(1024, Math.floor(e))).toFixed(f)+" "+s[e];

}

$.ibuttonSwitch = function (ibtnID, onoff){
	 var contentsID = $("div[id='"+ibtnID+"']").attr("target");
	 if(onoff == null && onoff != "")
	 {
		 if($("div[id='"+ibtnID+"'] input:checkbox").is(":checked") == true) {
			$("div[id='"+ibtnID+"'] div[class='ibutton-handle']").attr("style","left:0px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-off'] span").attr("style","margin-right:0px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-on']").attr("style","width:4px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-on'] span").attr("style","margin-left:-56px");
			
			$("div[id='"+ibtnID+"'] input:checkbox").attr("checked", false);
			
			$("#"+contentsID).removeClass('hidden').addClass('hidden');
		} else {
			$("div[id='"+ibtnID+"'] div[class='ibutton-handle']").attr("style","left:37px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-off'] span").attr("style","margin-right:-37px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-on']").attr("style","width:40px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-on'] span").attr("style","margin-left:0px");
			
			$("div[id='"+ibtnID+"'] input:checkbox").attr("checked", true);
			
			$("#"+contentsID).removeClass('hidden');
		}
	 } else if(onoff) {

			$("div[id='"+ibtnID+"'] div[class='ibutton-handle']").attr("style","left:37px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-off'] span").attr("style","margin-right:-37px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-on']").attr("style","width:40px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-on'] span").attr("style","margin-left:0px");
			
			$("div[id='"+ibtnID+"'] input:checkbox").attr("checked", true);
			
			$("#"+contentsID).removeClass('hidden');
		 
	 } else if(!onoff) {

			$("div[id='"+ibtnID+"'] div[class='ibutton-handle']").attr("style","left:0px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-off'] span").attr("style","margin-right:0px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-on']").attr("style","width:4px");
			$("div[id='"+ibtnID+"'] div[class='ibutton-label-on'] span").attr("style","margin-left:-56px");
			
			$("div[id='"+ibtnID+"'] input:checkbox").attr("checked", false);
			$("#"+contentsID).removeClass('hidden').addClass('hidden');
	 }
};


$.returnDatabaseKey = function (key, addkey){

	if(key == ""){ return "";}
	
	if (typeof(key) == 'string'){
		if(addkey != null && addkey != "")
		 {
			key = addkey+key;
		 }
		
		 var changeKey = $.i18n.prop('database.col.'+key.toLowerCase());
		 if(changeKey == '[database.col.'+key.toLowerCase()+']'){
			 return key;
		 } else {
			 return changeKey;
		 }
	 } else if(key.constructor.name == 'Array' || key.constructor == Array){
		 var returnKeyArray = new Array();
		 
		 for(var i=0;i<key.length;i++){
			 returnKeyArray.push($.returnDatabaseKey(key[i], addkey));
		 }
		 return returnKeyArray;
	 } else {
		 //alert(key.constructor.name);
		 return key;
	 }
}

$.returnDatabaseKeyByApprovalReason = function (key, addkey){

	if(key == ""){ return "";}
	try{
	if (typeof(key) == 'string'){
		if(addkey != null && addkey != "")
		 {
			key = addkey+key;
		 }
		
		 var changeKey = $.i18n.prop('approval.reason.'+key.toLowerCase());
		 if(changeKey == '[approval.reason.'+key.toLowerCase()+']'){
			 return key;
		 } else {
			 return changeKey;
		 }
	 } else if(key.constructor.name == 'Array' || key.constructor == Array){
		 var returnKeyArray = new Array();
		 
		 for(var i=0;i<key.length;i++){
			 returnKeyArray.push($.returnDatabaseKeyByApprovalReason(key[i], addkey));
		 }
		 return returnKeyArray;
	 } else {
		 //alert(key.constructor.name);
		 return key;
	 }
	}catch(e){
		return key;
	}
}

$.getReason = function(reason) {
	var htmlReason = "";
	if(reason != "")
	{
		
		if(reason.substring(0,1) == "{") {
			reason = JSON.parse(reason);
	    	var reasonFilters = reason;
	    	var reasonKeys = Object.keys(reasonFilters);
	    	for(var idx in reasonKeys ){
	    		if(htmlReason != "") htmlReason += ",";
	    		htmlReason += $.returnDatabaseKeyByApprovalReason(reasonKeys[idx])+":"+reasonFilters[reasonKeys[idx]];
	    	}
		}else {
			htmlReason = reason;
		}
	}
	return htmlReason;
};

$.returnDatabaseKeyBySynapError = function (key, addkey){

	if(key == ""){ return "";}
	
	if (typeof(key) == 'string'){
		if(addkey != null && addkey != "")
		 {
			key = addkey+key;
		 }
		
		 var changeKey = $.i18n.prop('synap.error.'+key.toLowerCase());
		 if(changeKey == '[synap.error.'+key.toLowerCase()+']'){
			 return key;
		 } else {
			 return changeKey;
		 }
	 } else if(key.constructor.name == 'Array' || key.constructor == Array){
		 var returnKeyArray = new Array();
		 
		 for(var i=0;i<key.length;i++){
			 returnKeyArray.push($.returnDatabaseKeyBySynapError(key[i], addkey));
		 }
		 return returnKeyArray;
	 } else {
		 //alert(key.constructor.name);
		 return key;
	 }
}

$.exportJQGrid = function (btnToolsExcel, sheetTitle, exportTools, columnHeaders, columnNames){
	
	var tableCtrl = "#"+$(btnToolsExcel).attr("target");
	var pageUnit = $(tableCtrl).getGridParam("rowNum");	
	var pageNum = $(tableCtrl).getGridParam("page");
	if($(tableCtrl).getGridParam("reccount") == 0) {
		return false;
	}
	
	/*if($(tableCtrl).jqGrid('getGridParam', 'datatype') == "local")
	{
		//$(tableCtrl).jqGrid('setGridParam',{url:''});
		$(tableCtrl).jqGrid('excelExport', 'xls', $(btnToolsExcel).attr("target"));
		return false;
	}*/
	
	if(columnHeaders == null || columnHeaders == "")
	{
		var allJQGridData = $(tableCtrl).jqGrid('getGridParam', 'data');
		
	    var jqgridRowIDs = $(tableCtrl).getDataIDs();                // Fetch the RowIDs for this grid
	    var headerData = $(tableCtrl).getRowData(jqgridRowIDs[0]);   // Fetch the list of "name" values in our colModel
	
	    //  For each visible column in our jqGrid, fetch it's Name, and it's Header-Text value
	    columnNames = new Array();       //  The "name" values from our jqGrid colModel
	    columnHeaders = new Array();     //  The Header-Text, from the jqGrid "colNames" section
	    
	    var inx = 0;
	    var allColumnNames = $(tableCtrl).jqGrid('getGridParam', 'colNames');
	    var allColModels = $(tableCtrl).jqGrid('getGridParam', 'colModel');
	    
	    var bIsRownumbers = $(tableCtrl).jqGrid('getGridParam', 'rownumbers');
	    if (bIsRownumbers) {
	        allColumnNames.splice(0, 1);
	    }
	    
	    var bIsMultiSelect = $(tableCtrl).jqGrid('getGridParam', 'multiselect');
	    if (bIsMultiSelect) {
	        allColumnNames.splice(0, 1);
	    }
	    
	    for (var headerValue in headerData) {
	    	
	    	
		    
	        //  If this column ISN'T hidden, and DOES have a column-name, then we'll export its data to Excel.
	        var isColumnHidden = $(tableCtrl).jqGrid("getColProp", headerValue).hidden;
	        
	        var isPrintHidden = $(tableCtrl).jqGrid("getColProp", headerValue).printHidden;
	        //alert(isPrintHidden);
	        
	        if (!isColumnHidden && !isPrintHidden && headerValue != null) {
	            columnNames.push(headerValue);
	            columnHeaders.push(allColumnNames[inx]);
	        }
	        
	        inx++;
	    }
	    if (bIsRownumbers) {
	        allColumnNames.unshift("");
	    }
	}
    
    $(tableCtrl).jqGrid('setGridParam',{postData:{'columnHeaders':JSON.stringify(columnHeaders)} });
    $(tableCtrl).jqGrid('setGridParam',{postData:{'columnNames':JSON.stringify(columnNames)} });
	$(tableCtrl).jqGrid('setGridParam',{postData:{'pageUnit':9999999} });
	$(tableCtrl).jqGrid('setGridParam',{postData:{'exportTools':exportTools} });			
	$(tableCtrl).jqGrid('setGridParam',{postData:{'page':1} });
	if(sheetTitle != "") {
		if(sheetTitle.indexOf("/") > -1) sheetTitle = sheetTitle.replace(/\//g,",");
		$(tableCtrl).jqGrid('setGridParam',{postData:{'sheetTitle':sheetTitle} });
	}
	
	$(tableCtrl).jqGrid('setGridParam',{postData:{'rowsRoot':'rows'} });
	$(tableCtrl).jqGrid('excelExport', {url:$(tableCtrl).jqGrid('getGridParam','url')});
	
	$(tableCtrl).jqGrid('setGridParam',{postData:{'exportTools':''} });
	$(tableCtrl).jqGrid('setGridParam',{postData:{'pageUnit':pageUnit} });
	$(tableCtrl).jqGrid('setGridParam',{postData:{'page':pageNum} });
}

$.exportJQGridPrint = function (btnToolsExcel, sheetTitle, exportTools, columnHeaders, columnNames){
	
	$( "<form id='frmPrint' method='post'></form>" ).appendTo( "body" );
	var tableCtrl = "#"+$(btnToolsExcel).attr("target");
	//$(tableCtrl).jqGrid('setGridParam',{postData:{'sheetTitle':'<c:out value="${pageInfo.title}"/>'} });
	if(columnHeaders == null || columnHeaders == "")
	{

		var allJQGridData = $(tableCtrl).jqGrid('getGridParam', 'data');
		
	    var jqgridRowIDs = $(tableCtrl).getDataIDs();                // Fetch the RowIDs for this grid
	    var headerData = $(tableCtrl).getRowData(jqgridRowIDs[0]);   // Fetch the list of "name" values in our colModel
	
	    //  For each visible column in our jqGrid, fetch it's Name, and it's Header-Text value
	    columnNames = new Array();       //  The "name" values from our jqGrid colModel
	    columnHeaders = new Array();     //  The Header-Text, from the jqGrid "colNames" section
	    
	    var inx = 0;
	    var allColumnNames = $(tableCtrl).jqGrid('getGridParam', 'colNames');
	    var allColModels = $(tableCtrl).jqGrid('getGridParam', 'colModel');
	    
	    var bIsMultiSelect = $(tableCtrl).jqGrid('getGridParam', 'multiselect');
	    if (bIsMultiSelect) {
	        allColumnNames.splice(0, 1);
	    }
	    
	    for (var headerValue in headerData) {
	        //  If this column ISN'T hidden, and DOES have a column-name, then we'll export its data to Excel.
	        var isColumnHidden = $(tableCtrl).jqGrid("getColProp", headerValue).hidden;
	        
	        var isPrintHidden = $(tableCtrl).jqGrid("getColProp", headerValue).printHidden;
	        //alert(isPrintHidden);
	        
	        if (!isColumnHidden && !isPrintHidden && headerValue != null) {
	            columnNames.push(headerValue);
	            columnHeaders.push(allColumnNames[inx]);
	        }
	        inx++;
	    }
	}
		
	var postDatas =  $(tableCtrl).jqGrid('getGridParam','postData');
	$( "<input type='hidden' name='postDatas' value='"+JSON.stringify(postDatas)+"' />" ).appendTo( "#frmPrint" );
	$( "<input type='hidden' name='columnHeaders' value='"+JSON.stringify(columnHeaders)+"' />" ).appendTo( "#frmPrint" );
	$( "<input type='hidden' name='columnNames' value='"+JSON.stringify(columnNames)+"' />" ).appendTo( "#frmPrint" );
	$( "<input type='hidden' name='url' value='"+$(tableCtrl).jqGrid('getGridParam','url')+"' />" ).appendTo( "#frmPrint" );
	$( "<input type='hidden' name='pageUnit' value='9999999' />" ).appendTo( "#frmPrint" );
	
	$( "<input type='hidden' name='exportTools' value='print' />" ).appendTo( "#frmPrint" );
	
	
	$( "<input type='hidden' name='sheetTitle' value='"+sheetTitle+"' />" ).appendTo( "#frmPrint" );
	
	$("#frmPrint").attr("target","_blank");
	$("#frmPrint").attr("action", '/kess/jqGridPrint.do').submit();
}




$.ProfileDetailViewPopupProfileSummaryMake = function (profileSummaryJson){
	
	var viewHtml = "";
	var profileType = "";
	
	$.each(profileSummaryJson, function(key, value)
	{
		profileType = key;
		
		if(key == "displaymark")
		{
			viewHtml += "<li><span class='space'><span class='icon iconfa-angle-right'></span> "+$.returnDatabaseKey(key)+"</li>";
			var viewHtml1 = "";
			var viewHtml2 = "";
			var displaymarkType = "";
			
			$.each(value, function(key, value)
			{
				
				if((key == "fontTransparency" 
					|| key == "fontFamily" 
					|| key == "displaymarkText"  
					|| key == "fontBold" 
					|| key == "fontInterval" 
					|| key == "fontAngle" 
					|| key == "fontSize"
					|| key == "displaymarkPolicy"
					|| key == "fontColor"
					) 
						&& value != "") 
				{
					viewHtml1 += "<li><span class='space'><span class='icon iconfa-angle-right'></span> "+$.returnDatabaseKey(key)+" : "+$.returnDatabaseKey(value)+"</li>";
				}
				
				if((key == "displaymarkImageVersion" 
					|| key == "displaymarkImageFileName"
					|| key == "displaymarkImageTransparency"
					) 
						&& value != "") 
				{
					viewHtml2 += "<li><span class='space'><span class='icon iconfa-angle-right'></span> "+$.returnDatabaseKey(key)+" : "+$.returnDatabaseKey(value)+"</li>";
				}
				
				if(key == "displaymarkType" && value != "") 
				{
					displaymarkType = value;
					viewHtml1 += "<li><span class='space'><span class='icon iconfa-angle-right'></span> "+$.returnDatabaseKey(key)+" : "+$.returnDatabaseKey(value)+"</li>";
					viewHtml2 += "<li><span class='space'><span class='icon iconfa-angle-right'></span> "+$.returnDatabaseKey(key)+" : "+$.returnDatabaseKey(value)+"</li>";
				}
			});
			
			if(displaymarkType == "" || displaymarkType == "setting")
			{
				viewHtml += viewHtml1;
			} else {
				viewHtml += viewHtml2;
			}
		} 
		else if(key != "profileType" && key != "profileName" && key != "userID" && key != "profileSetting" && typeof(value) == 'object')
		{
			viewHtml += "<div class='title'><span class='icon iconfugue16-tick'></span> " + $.returnDatabaseKey(key) + "</div>";
			viewHtml += "<ul>";
			
			$.each(value, function(key, value){
				//alert(key.indexOf("Keys"));
				
				if(key == "personarInfoFilter" || key == "patternFilter" || key == "requiredKeyword" || key == "adjacencyKeyword" || key == "riskPatternFilter" || key == "riskKeyword" || key == "threatPatternFilter" || key == "threatKeyword" )
				{
					viewHtml += "<li><span class='space'><span class='icon iconfa-angle-right'></span> "+$.returnDatabaseKey(key)+" : ";
					if(value != null && value != undefined && value != "" && value != "[]")
					{
						$.each(value, function(key, value){
							if(value.count != 0) 
							{
								if(key != 0) viewHtml += ","
								if(value.pattern != undefined && value.count != undefined) viewHtml += $.returnDatabaseKey(value.pattern) + "(" + value.count + ")";
								else if(value.count != undefined) viewHtml += $.returnDatabaseKey(value.key) + "(" + value.count + ")";
								else if(value.use != undefined) viewHtml += $.returnDatabaseKey(value.pattern) + " : " + $.returnDatabaseKey(value.use) + "";
							}
							
						});
					} 
					viewHtml += "</li>";
				}
				else if(key.indexOf("Keys") != -1 || key.indexOf("List") != -1 || key == "searchTime" || key == "mobileDeviceAndroidPolicy" || key == "mobileDeviceIosPolicy" || key == "syncCycleTime")
				{
					viewHtml += "<li><span class='space'><span class='icon iconfa-angle-right'></span> "+$.returnDatabaseKey(key)+"</li>";
					var eachKey = key;
					
					$.each(value, function(key, value){
						viewHtml += "<li><span class='space'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+(key+1)+". ";
						
						var viewHtml1 = "";

						if(value.macssid != undefined) viewHtml1 += ", MAC,SSID : "+value.macssid;
						//if(value.macssid != undefined) viewHtml1 += ", "+$.returnDatabaseKey("macssid")+" : "+value.macssid;
						if(value.outflowType != undefined) viewHtml1 += ", "+$.returnDatabaseKey("outflowtype")+" : "+$.returnDatabaseKey(value.outflowType);
						if(value.processName != undefined) viewHtml1 += ", "+$.returnDatabaseKey("processName")+" : "+value.processName;
						if(value.siteURL != undefined) viewHtml1 += ", "+$.returnDatabaseKey("siteURL")+" : "+value.siteURL;
						if(value.packageName != undefined) viewHtml1 += ", "+$.returnDatabaseKey("packageName")+" : "+value.packageName;

						if(value.summary != undefined) viewHtml1 += ", "+$.returnDatabaseKey("summary")+" : "+value.summary;
						if(value.hostName != undefined) viewHtml1 += ", "+$.returnDatabaseKey("hostname")+" : "+value.hostName+"";
						if(value.startIP != undefined) viewHtml1 += ", "+$.returnDatabaseKey("startip")+" : "+value.startIP+"";
						if(value.endIP != undefined) viewHtml1 += ", "+$.returnDatabaseKey("endip")+" : "+value.endIP+"";
						if(value.port != undefined) viewHtml1 += ", "+$.returnDatabaseKey("port")+" : "+value.port+"";

						if(value.inPort != undefined) viewHtml1 += ", "+$.returnDatabaseKey("inport")+" : "+value.inPort+"";
						if(value.outPort != undefined) viewHtml1 += ", "+$.returnDatabaseKey("outport")+" : "+value.outPort+"";
						if(value.checkTime != undefined) viewHtml1 += ", "+$.returnDatabaseKey("checktime")+" : "+value.checkTime+"";
						if(value.checkWeek != undefined) viewHtml1 += ", "+$.returnDatabaseKey("checkweek")+" : "+$.makeWeekText(value.checkWeek)+"";
						
						if(value.onlineServiceCode != undefined) viewHtml1 += ", "+$.returnDatabaseKey("onlineservice")+" : "+$.returnDatabaseKey(value.onlineServiceCodes)+"";
						
						if(value.fileHash != undefined && value.fileHash != "") viewHtml1 += "("+value.fileHash+")";

						if(value.week != undefined) viewHtml1 += ", "+$.returnDatabaseKey("checkweek")+" : "+value.week;
						if(value.start != undefined) viewHtml1 += ", "+$.returnDatabaseKey("start")+" : "+value.start;
						if(value.end != undefined) viewHtml1 += ", "+$.returnDatabaseKey("end")+" : "+value.end;
						if(value.cpuUsage != undefined) viewHtml1 += ", "+$.returnDatabaseKey("cpupriority")+" : "+value.cpuUsage;
						
						if(value.mobileDeviceCode != undefined) viewHtml1 += ", "+$.returnDatabaseKey("mobiledevice")+" : "+$.returnDatabaseKey("mobiledevice"+value.mobileDeviceCode);
						
						if(value.policy != undefined) viewHtml1 += ", "+$.returnDatabaseKey("policy")+" : "+$.returnDatabaseKey(value.policy);
						if(value.log != undefined) viewHtml1 += ", "+$.returnDatabaseKey("log")+" : "+$.returnDatabaseKey(value.log);

						if(value.etcCode != undefined) viewHtml1 += ", "+$.returnDatabaseKey("etcCode")+" : "+$.returnDatabaseKey(value.etcCode);
						if(value.etcData != undefined) viewHtml1 += ", "+$.returnDatabaseKey("etcData")+" : "+$.returnDatabaseKey(value.etcData);
						
						if(eachKey == "blockKeys" || eachKey == "piblockKeys")
						{
							if(value.blockOverSize != undefined) viewHtml1 += ", "+$.returnDatabaseKey("blockOverSize")+" : "+value.blockOverSize;
						}
						
						/*
						if(value.macssid != undefined) viewHtml += "macssid : "+value.macssid;
						if(value.processName != undefined) viewHtml += "processName : "+value.processName;
						if(value.siteURL != undefined) viewHtml += "siteURL : "+value.siteURL;
						
						if(value.hostName != undefined) viewHtml += " hostName : "+value.hostName+"";
						if(value.startIP != undefined) viewHtml += " startIP : "+value.startIP+"";
						if(value.endIP != undefined) viewHtml += " endIP : "+value.endIP+"";
						if(value.port != undefined) viewHtml += " port : "+value.port+"";

						if(value.inPort != undefined) viewHtml += " inPort : "+value.inPort+"";
						if(value.outPort != undefined) viewHtml += " outPort : "+value.outPort+"";
						if(value.checkTime != undefined) viewHtml += " checkTime : "+value.checkTime+"";
						if(value.checkWeek != undefined) viewHtml += " checkWeek : "+value.checkWeek+"";
						
						if(value.onlineServiceCode != undefined) viewHtml += ", onlineServiceCode : "+value.onlineServiceCodes+"";
						
						if(value.fileHash != undefined && value.fileHash != "") viewHtml += "("+value.fileHash+")";

						if(value.week != undefined) viewHtml += " week : "+value.week;
						if(value.start != undefined) viewHtml += " start : "+value.start;
						if(value.end != undefined) viewHtml += " end : "+value.end;
						if(value.cpuUsage != undefined) viewHtml += " cpuUsage : "+value.cpuUsage;
						
						if(value.policy != undefined) viewHtml += ", policy : "+value.policy;
						if(value.outflowType != undefined) viewHtml += ", outflowType : "+value.outflowType;
						*/
						viewHtml += viewHtml1.substring(1, viewHtml1.length) + "</li>";
					});
				}
				else if(key == "watermarkSummary")
				{
					viewHtml += "<li><span class='space'><span class='icon iconfa-angle-right'></span> "+$.returnDatabaseKey(key)+"</li>";
					$.each(value, function(key, value)
					{
						viewHtml += "<li><span class='space'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+$.returnDatabaseKey(key)+" : "+$.returnDatabaseKey(value)+"</li>";
					});
				} 
				else
				{
					if((key == "rootingType" 
						|| key == "notebookLossPolicy" 
						|| key == "extensionPolicy"  
						|| key == "selfApproveFile" 
						|| key == "searchDirType" 
						|| key == "displaymarkPolicy" 
						|| key == "fontAngle"
						|| key == "fontBold"
						|| key == "fontAngle"
						) 
							&& value != "") 
					{
						value = key+value;
						//alert(key+":"+value);
					}
					
					if((profileType.toLowerCase() == "mobiledevice" || profileType.toLowerCase() == "mobileloss") && value != "")
					{
						//alert(profileType);
						viewHtml += "<li><span class='space'><span class='icon iconfa-angle-right'></span> "+$.returnDatabaseKey(key)+" : "+$.returnDatabaseKey(value, profileType)+"</li>";						
					} else {
						viewHtml += "<li><span class='space'><span class='icon iconfa-angle-right'></span> "+$.returnDatabaseKey(key)+" : "+$.returnDatabaseKey(value)+"</li>";
					}
				}
			});
			
			viewHtml += "</ul>";
		}
	});
	
	
	return viewHtml;
};


$.formatterBlue = function(cellValue,options,rowObject){
	if(cellValue == undefined) cellValue = "";
		return "<span style='color:#1695ef;'>"+cellValue+"</span>";
};

$.formatterRed = function(cellValue,options,rowObject){
	if(cellValue == undefined) cellValue = "";
	return "<span style='color:#bd362f;'>"+cellValue+"</span>";
};

$.makeJQGridDetailView = function (cellValue,options,rowObject){
	return '<div class="tr-action-white"><div class="tr-action-white-inner btn-group"><button type="button" class="btn-noGrad" onClick="javascript:$(this).trigger(\'dblclick\');" >'+cellValue+'</button></div></div>';
};

$("#txtSearchPolicyIP").bind("keydown", function(e) { 
    if (e.keyCode == 13) { 
        $("#btnSearchPolicyIP").trigger("click");
        return false;
    }
});

$.validateDate = function(e){
	var text = e.target.value;
	if(text != ""){
	    text = text.replace(/-/gi,"");
		var id = e.target.id
		
		var pattern_num = /[0-9]/;
		var pattern_eng = /[a-zA-Z]/; 
		var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
		var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
		text = text.substr(0,8);
		if(!text.length < 8 && $.validateDay(text) && !(pattern_eng.test(text)) && !(pattern_spc.test(text)) && !(pattern_kor.test(text))){
			
			var Y = text.substr(0,4);
			var M = text.substr(4,2);
			var D = text.substr(6,2);
			
			var dateString = Y + "-" + M + "-" + D;
			$("#"+id).val(dateString);
		}else{
			$("#"+id).val("");
			return false;
		}		
	}
	return true;
};

$.validateDay = function(dateStr){
	
	var year = Number(dateStr.substr(0,4));
	var month = Number(dateStr.substr(4,2));
	var day = Number(dateStr.substr(6,2));
	var today = new Date();  
	var yearNow = today.getFullYear();
	
	if(dateStr.length <=8) {
		if(1000 > year){
			return false; 
		}else if(month < 1 || month > 12){
			return false; 
		}else if(day < 1 || day > 31){
			return false; 
		}else if((month==4 || month==6 || month==9 || month==11) && day==31){
			return false; 
		}else if(month == 2){ 
			var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)); 
			if(day>29 || (day==29 && !isleap)){
				return false; 
			}else{ 
				return true; 
			}
		}else{ 
			return true; 
		}
	  }else{
		return false; 
	  }
	
}


