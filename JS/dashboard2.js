$(document).ready(function() {

	(new Coveo.Dom("body")).on("afterInitialization", function(){
		//client
		initializeSSClientDashCharts();
		getClientDetails();
		initializeSSKendoGridClientMatters();
		getClientKeyContacts();
		//matter
		initializeSSMatterDashCharts();
		getMatterDetails();
		getMatterKeyContacts();
		}); 

});

var initializeSSClientDashCharts = function()
{
	 if(getParameterByName("clientid")=="")
			   return;
	var query = "clientid:" + getParameterByName("clientid");
	//var query = "clientid:4455";
    query = query + " path:http://demosp2016/sites/legal/lists/clientfinancialdata";
	var fields =["title","excerpt","ContentSource","chartname","chartdata","filetype","date","clientid"];
	
	var searchQuery = { q: query, cq: '{searchboxquery} FederatorBackends:"Legal"', groupBy: [], firstRow: 0, numberOfResults: 10,fieldsToInclude:fields};
	Coveo.SearchEndpoint.endpoints["default"].search(searchQuery, {}, {queryString:""}).then(function(results){
		var results = results.results;
        var chartDataBilledCollected = getChartData("BilledCollectedYTD", results);
		var chartDataTotalHoursWorked = getChartData("TotalHoursWorked", results);
                             
		initializeHoursWorkedYTD(chartDataTotalHoursWorked);
		initializeHoursLifeTime(chartDataTotalHoursWorked);
		initializeDeptCollected(chartDataBilledCollected);
	});
}


var initializeSSMatterDashCharts = function()
{
	 if(getParameterByName("matterid")=="")
			   return;
	var query = "matterid:" + getParameterByName("matterid");
	//var query = "matterid:333056";
    query = query + " path:http://demosp2016/sites/legal/lists/Matterfinancialdata";
	var fields =["title","excerpt","ContentSource","chartname","chartdata","filetype","date","matterid"];
	
	var searchQuery = { q: query, cq: '{searchboxquery} FederatorBackends:"Legal"', groupBy: [], firstRow: 0, numberOfResults: 10,fieldsToInclude:fields};
	Coveo.SearchEndpoint.endpoints["default"].search(searchQuery, {}, {queryString:""}).then(function(results){
		var results = results.results;
        var chartDataMatterFinancials = getChartData("Matter Financials", results);
		var chartDataMatterHoursRole = getChartData("Matter Hours YTD", results);
                             
		initializeMatterFinancialsBarChart(chartDataMatterFinancials);
		initializeMatterHourRoleBarChart(chartDataMatterHoursRole);
		initializePercentBilledVsCollected(chartDataMatterFinancials);
	});
}


var initializeSSKendoGridClientMatters = function()
{
	 if(getParameterByName("clientid")=="")
			   return;
	var query = "clientid:" + getParameterByName("clientid");
	//var query = "clientid:4455";
    query = query + " legalsource:matters ";
	var fields = ["title","matterid","ContentSource","practicearea","matterlocation","legalsource","refinablestring100"];
	
	var searchQuery = { q: query, cq: '{searchboxquery} FederatorBackends:"Legal"', groupBy: [], firstRow: 0, numberOfResults: 10,fieldsToInclude:fields};
	Coveo.SearchEndpoint.endpoints["default"].search(searchQuery, {}, {queryString:""}).then(function(results){
		var results = results.results;
        doKendGrid(results);
	});
}


var getClientDetails = function()
{
	 if(getParameterByName("clientid")=="")
			   return;
	var query = "clientid:" + getParameterByName("clientid");
	//var query = "clientid:4455";
   
	var fields =["title","ContentSource","clientid","clientname","clientcity","legalstatus","legalsource"];
	
	var searchQuery = { q: query, cq: '{searchboxquery} FederatorBackends:"Legal" legalsource:clients', groupBy: [], firstRow: 0, numberOfResults: 1,fieldsToInclude:fields};
	Coveo.SearchEndpoint.endpoints["default"].search(searchQuery, {}, {queryString:""}).then(function(results){
		var results = results.results;
        fillClientDetails(results);
	});
}


var getMatterDetails = function()
{
	 if(getParameterByName("matterid")=="")
			   return;
	var query = "matterid:" + getParameterByName("matterid");
	//var query = "matterid:333056";
   
	var fields =["title","ContentSource","matterid","matterlocation","officesinvolved","legalstatus","legalsource","industry","casesite","city","country","state"];
	
	var searchQuery = { q: query, cq: '{searchboxquery} FederatorBackends:"Legal" legalsource:matters', groupBy: [], firstRow: 0, numberOfResults: 1,fieldsToInclude:fields};
	Coveo.SearchEndpoint.endpoints["default"].search(searchQuery, {}, {queryString:""}).then(function(results){
		var results = results.results;
        fillMatterDetails(results);
	});
}


var getClientKeyContacts = function()
{
	 if(getParameterByName("clientid")=="")
			   return;
	//var query = "clientid:" + getParameterByName("clientid");
	var query = 'preferredname:"Tim Carter" preferredname:"Carter Regan" preferredname:"Thomas Hulme"';
    query = query + ' ContentSource:"People Search" ';
	var fields = ["title","jobtitle","ContentSource","pictureurl","preferredname","legalsource","workemail","mobilephone","baseofficelocation"];
	
	var searchQuery = { tab:"b09a7990-05ea-4af9-81ef-edfab16c4e31", q: query, cq: '{searchboxquery} FederatorBackends:"Pharma"', groupBy: [], firstRow: 0, numberOfResults: 10,fieldsToInclude:fields};
	Coveo.SearchEndpoint.endpoints["default"].search(searchQuery, {}, {queryString:""}).then(function(results){
		var results = results.results;
        doKeyContacts(results);
	});
}

var getMatterKeyContacts = function()
{
	 if(getParameterByName("matterid")=="")
			   return;
	//var query = "clientid:" + getParameterByName("clientid");
	var query = 'preferredname:"Tim Carter" preferredname:"Darby Glande"';
    query = query + ' ContentSource:"People Search" ';
	var fields = ["title","jobtitle","ContentSource","pictureurl","preferredname","legalsource","workemail","mobilephone","baseofficelocation"];
	
	var searchQuery = { tab:"b09a7990-05ea-4af9-81ef-edfab16c4e31", q: query, cq: '{searchboxquery} FederatorBackends:"Pharma"', groupBy: [], firstRow: 0, numberOfResults: 10,fieldsToInclude:fields};
	Coveo.SearchEndpoint.endpoints["default"].search(searchQuery, {}, {queryString:""}).then(function(results){
		var results = results.results;
        doKeyContacts(results);
	});
}

var getChartData = function (chartName, results) {
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    var props = result.Properties;
					for(var j=0;j<props.length; j++)
					{
						if (props[j].Name == "chartname" && props[j].Value == chartName)
						{
							return eval(props[j+1].Value);
						}
					}
                }

                return "";
}

var doKendGrid = function(results)
{
	var dSource = new Array();
	for (var i = 0; i < results.length; i++) {
        
		var result = results[i];
		var title="",matterid="",practicearea="",matterlocation="";
		for(var it in result.Properties)
		{
			var fld = result.Properties[it];
			switch(fld.Name)
			{
				case "title":
				title = fld.Value;
				break;
				case "matterid":
				matterid = fld.Value;
				break;
				case "refinablestring100":
				practicearea = fld.Value != null ? fld.Value : "";
				break;
				case "matterlocation":
				matterlocation= fld.Value != null ? fld.Value : ""
				break;
			}
						
		}
	
		dSource[i] = new Object();
		dSource[i].Matter = title;
		dSource[i].MatterNumber = matterid;
		dSource[i].PracticeArea = practicearea;
		dSource[i].MatterLocation = matterlocation;
        
	}		

    $("#ClientMattersGrid").kendoGrid({
								dataSource: {
											data: dSource,
											schema: {
												model: {
													fields: {
														Matter: { type: "string" },
														MatterNumber: { type: "string" },
														PracticeArea: { type: "string" },
														MatterLocation: { type: "string" }
													}
												}
											},
											pageSize: 20
								},
                              
                                height: (results.length*50 + 50),
                                scrollable: true,
                                sortable: true,
                                filterable: true,
                                pageable: {
                                    input: true,
                                    numeric: false
                                },
                               columns: [
                    { field: "Matter", title: "Matter", template: '<a  href="matterdash.html?matterid=#=MatterNumber#\\#q=matterid:#=MatterNumber#">#=Matter#</a>' },
                                        { field: "MatterNumber", title: "Matter Number" },
                                        { field: "PracticeArea", title: "Practice Area" },
                                        { field: "MatterLocation", title: "Matter Location" }
                                ]
    });
	
}

var doKeyContacts = function (results)
{
	if(results == null || results.length == 0)
		return;
	var html = 	'<div class="dashbottomkeydetails">';
	
		
	for(var i = 0; i < results.length; i++)
	{
		var result = results[i];
		var role = (i == 0) ? "Resposible Attorney" : (i == 1) ? "Billing Attorney" : "Originating Attorney";
		var attypicurl="",attyname="",attyjobtitle="",attylocation="",attyphone="",attyemail="";
		html = html + '<div class="kdheader">' + role + '</div>';
		for(var it in result.Properties)
		{
			var fld = result.Properties[it];
			switch(fld.Name)
			{
				case "pictureurl":
				attypicurl = fld.Value;
				break;
				case "preferredname":
				attyname = fld.Value;
				break;
				case "jobtitle":
				attyjobtitle = fld.Value != null ? fld.Value : "";
				break;
				case "baseofficelocation":
				attylocation= fld.Value != null ? fld.Value : ""
				break;
				case "mobilephone":
				attyphone = fld.Value != null ? fld.Value : "";
				break;
				case "workemail":
				attyemail= fld.Value != null ? fld.Value : ""
				break;
			}	
		}
		//fix for pictures. the pic url returned from index are not accessible from the site.
		attypicurl = "/modules/DemoCustom/legal/images/" + attyname + ".jpg";
		html = html + '	<div class="billingattorney">'+
				'<div class="attorneypic">'+
					'<img class="attorneypicImg" src="' + attypicurl + '" alt="' + attyname + '">'+
				'</div>' + 
				'<div class="attorneydetails">' +
					'<div class="attorneyname">' + attyname + '</div>' +
					'<div class="attorneyjobtitle">' + attyjobtitle + '</div>'+
					'<div class="attorneylocation"> ' + attylocation + '</div>' + 
					'<div class="attorneyphone"> ' + attyphone + '</div>' +
				'</div>' +
			'</div>';
	}
	html = html + '</div>';
	$('#KeyContacts').html(html);
}

var fillClientDetails = function (results)
{
	if(results==null || results.length==0) return;
	var result = results[0];
	var clientid="",clientname="",clientcity="",clientstatus="";
	for(var it in result.Properties)
	{
		var fld = result.Properties[it];
		switch(fld.Name)
		{
			case "clientid":
			clientid = fld.Value;
			break;
			case "title":
			clientname = fld.Value;
			break;
			case "clientcity":
			clientcity = fld.Value != null ? fld.Value : "";
			break;
			case "legalstatus":
			clientstatus= fld.Value != null ? fld.Value : ""
			break;
		}
		
	}
	
	var html = '<div class="dash-item-header">' +
			'<div class="dashtopheader">' + clientname + ':' + clientid + '<span class="dashtopdetails">' +
			' Status:' + clientstatus + ' City:' + clientcity +  '</span><div onclick="' + '$(\'.dashbottomheader\').toggle();'+
			'" class="dashtoggledetails"> ' +
			'<img class="coveo-sprites-expand" ' + 'src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" title="Expand list">' +
			'</div></div>'+  
			'<div class="dashbottomheader"> </div>'+
			'</div>';
	$('#ClientDetails').html(html);
}

var fillMatterDetails = function (results)
{
	if(results==null || results.length==0) return;
	var result = results[0];
	var matterid="",mattername="",mattercity="",matterstatus="";
	var matterlocation="",officesinvolved="",industry="",country="",state="";
	for(var it in result.Properties)
	{
		var fld = result.Properties[it];
		switch(fld.Name)
		{
			case "matterid":
			matterid = fld.Value;
			break;
			case "title":
			mattername = fld.Value;
			break;
			case "city":
			mattercity = fld.Value != null ? fld.Value : "";
			break;
			case "legalstatus":
			matterstatus= fld.Value != null ? fld.Value : ""
			break;
			case "matterlocation":
			matterlocation = fld.Value;
			break;
			case "officesinvolved":
			officesinvolved = fld.Value;
			break;
			case "industry":
			industry = fld.Value != null ? fld.Value : "";
			break;
			case "country":
			country= fld.Value != null ? fld.Value : ""
			break;
			case "state":
			state= fld.Value != null ? fld.Value : ""
			break;
		}
		
	}
	
	var html = '<div class="dash-item-header">' +
			'<div class="dashtopheader">' + mattername + ':' + matterid + '<span class="dashtopdetails">' +
			' Status:' + matterstatus + ' City:' + mattercity +  '</span><div title="Expand" onclick="' + '$(\'.dashbottomheader\').slideToggle();'+'" class="dashtoggledetails"> ' +
			'<img class="coveo-sprites-expand" ' + 'src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" title="Expand list">' +
			'</div></div>'+  
			'<div class="dashbottomheader"><span class="dashbottomdetails">' +
			' <b>Location:</b> ' + matterlocation + ' <b>Offices: </b>' + officesinvolved +  '</span><br/><br/><span class="dashtopdetails">' +
			' <b>Industry:</b> ' + industry + ' <b>State:</b> ' + state +  '</span> </div>'+
			'</div>';
	$('#MatterDetails').html(html);
}

var initializeHoursWorkedYTD = function(chartData)
{
	var settings = {
    showBorderLine: false,
    backgroundColor: 'transparent',
    source: chartData,
    colorScheme: 'scheme07',
    title: '',
    description: '',
    seriesGroups:
    [{
        //toolTipFormatFunction: toolTipCustomFormatFn,
        type: 'pie',
        showLabels: false,
        useGradient: false,
        series: [{
            dataField: 'YeartoDate', displayText: 'Role',
            labelRadius: 30,
            initialAngle: 90,
            radius: 60,
            centerOffset: 3
        }]
    }]
};

$('#PieChartHoursYTD').jqxChart(settings);
	
}

var initializeHoursLifeTime = function(chartData)
{
	var settings = {
    showBorderLine: false,
    backgroundColor: 'transparent',
    source: chartData,
    colorScheme: 'scheme09',
    title: '',
    description: '',
    seriesGroups:
    [{
        //toolTipFormatFunction: toolTipCustomFormatFn,
        type: 'pie',
        showLabels: false,
        useGradient: false,
        series: [{
            dataField: 'LifeTime', displayText: 'Role',
            labelRadius: 30,
            initialAngle: 90,
            radius: 60,
            centerOffset: 3
        }]
    }]
};

$('#PiechartHoursLifeTime').jqxChart(settings);
	
}

var initializeDeptCollected = function(chartData)
{
	var settings = {
    showBorderLine: false,
    backgroundColor: 'transparent',
    source: chartData,
    colorScheme: 'scheme11',
    title: '',
    description: '',
    seriesGroups:
    [{
        //toolTipFormatFunction: toolTipCustomFormatFn,
        type: 'pie',
        showLabels: false,
        useGradient: false,
        series: [{
            dataField: 'Collected', displayText: 'Dept',
            labelRadius: 30,
            initialAngle: 90,
            radius: 60,
            centerOffset: 3
        }]
    }]
};

$('#PieChartDeptCollected').jqxChart(settings);
	
}


            
var getParameterByName = function(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



var initializePercentBilledVsCollected = function(chartData)
{
	var percent = "";
	for(var i in chartData)
	{
		var row = chartData[i];
		if(row.Period == "Life Time")
		{
			percent = (row.Collected/row.Billed)*100;
			break;
		}
	}
	
	$('#MatterCollectionLifeTime').text(percent.toFixed(2) + "%");
	
}

var initializeMatterHourRoleBarChart = function(chartData)
{
		
               // prepare jqxChart settings
                var settings = {
                    title: "",
                    description:"Type of engagement:discount flat",
                    padding: { left: 5, top: 5, right: 5, bottom: 5 },
                    titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
                    source: chartData,
                    xAxis:
                        {
                            dataField: 'Role',
                            gridLines: { visible: false }
                        },
                    colorScheme: 'scheme10',
                    seriesGroups:
                        [
                            {
                                type: 'column',
                                columnsGapPercent: 30,
                                seriesGapPercent: 0,
                                valueAxis:
                                {
                                    /*minValue: 0,
                                    maxValue: 700,*/
									axisSize: 'auto',
                                    /*unitInterval: 200,*/
                                    description: 'Hours'
                                },
                                series: [
                                        { dataField: 'Billed', displayText: 'Billed' },
                                        { dataField: 'Collected', displayText: 'Collected' }

                                ]
                            }
                        ]
                };

                // setup the chart
                $('#HoursByRole').jqxChart(settings);
	
}

var initializeMatterFinancialsBarChart = function(chartData)
{
	
	
                // prepare jqxChart settings
                var settings = {
                    title: "",
                    description: "Type of engagement:discount flat",
                    padding: { left: 5, top: 5, right: 5, bottom: 5 },
                    titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
                    source: chartData,
                    xAxis:
                        {
                            dataField: 'Period',
                            gridLines: { visible: false }
                        },
                    colorScheme: 'scheme09',
                    seriesGroups:
                        [
                            {
                                type: 'column',
                                columnsGapPercent: 30,
                                seriesGapPercent: 0,
                                valueAxis:
                                {
                                    /*minValue: 0,
                                    maxValue: 2500,*/
									axisSize: 'auto',
                                    /*unitInterval: 800,*/
                                    description: 'Amount in $ (k)'
                                },
                                series: [
                                        { dataField: 'Billed', displayText: 'Billed' },
                                        { dataField: 'Collected', displayText: 'Collected' }
                                       
                                ]
                            }
                        ]
                };

                $('#FinancialChart').jqxChart(settings);
	
}

