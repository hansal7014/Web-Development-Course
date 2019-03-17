/*Name: Hansal Bachkaniwala
  Student Id: 117990176 */

// set a global httpRequest object

var httpRequest;
		
// TODO: when the page (window) has loaded, make a
// request for page 1
window.onload = function()
{
	makeRequest(1);
};
function makeRequest(pageNum) {
	
    // TODO: create a variable "url" to store the request to 
	// the current pageNum, ie:
	//
	// "https://reqres.in/api/users?page=1" // for page 1
	// "https://reqres.in/api/users?page=2" // for page 2
	// etc...
	
   var url = "https://reqres.in/api/users?page=" + pageNum;


	
	// make an HTTP request object
	
	httpRequest = new XMLHttpRequest();

	// execute the "showContents" function when
	// the httprequest.onreadystatechange event is fired
	
	httpRequest.onreadystatechange = showContents;
	
	// open a asynchronous HTTP (GET) request with the specified url
	
	httpRequest.open('GET', url, true);
	
	// send the request
	
	httpRequest.send();
}

// the function that handles the server response

function showContents() {

//  check for response state
//  0      The request is not initialized
//  1      The request has been set up
//  2      The request has been sent
//  3      The request is in process
//  4      The request is complete

	if (httpRequest.readyState === 4) {
		// check the response code
		if (httpRequest.status === 200) { // The request has succeeded
		// Javascript function JSON.parse to parse JSON data
			var jsData = JSON.parse(httpRequest.responseText);
			
			// TODO: use the jsData object to populate the correct
			// table cells, ie <tr><td>...</td></tr>
			// in the <tbody> element with id="data"
			
			var tableBody = document.querySelector("#data");
			tableBody.innerHTML = "";
			
			

			for(var i = 0; i < 3; i++)
			{
				var tableRow = document.createElement("tr");
			    var tableCell1 = document.createElement("td");
				var tableCell2 = document.createElement("td");
				var tableCell3 = document.createElement("td");
				var tableCell4 = document.createElement("td");
				var tableImage = document.createElement("img");	

				var tableData1 = document.createTextNode(jsData.data[i].id);
				tableCell1.appendChild(tableData1);
				tableRow.appendChild(tableCell1);
				
				var tableData2 = document.createTextNode(jsData.data[i].first_name);
				tableCell2.appendChild(tableData2);
				tableRow.appendChild(tableCell2);

				var tableData3 = document.createTextNode(jsData.data[i].last_name);
				tableCell3.appendChild(tableData3);
				tableRow.appendChild(tableCell3);

				tableImage.setAttribute("src", jsData.data[i].avatar);
				tableImage.setAttribute("alt", "useravatar");
				tableCell4.appendChild(tableImage);
				tableRow.appendChild(tableCell4);

				tableBody.appendChild(tableRow);

			}

			// TODO: remove the class "active" from all elements with the class "pgbtn"
			
			var activeClass = document.getElementsByClassName("active");
			for(var i = 0; i < activeClass.length; i++)
			{
				activeClass[i].setAttribute("class", "pgbtn");
			}
			// TODO: add the class "active" to the button corresponding to the active page, ie:
			//
			// if jsData.page is 1, add the class "active" to button element with id pgbtn1
			// if jsData.page is 2, add the class "active" to button element with id pgbtn2
			// etc...
			
			var buttonId = "#pgbtn" + jsData.page ;
			var activeButton = document.querySelector(buttonId);
			activeButton.setAttribute("class", "active");
			

		} else {
			console.log('There was a problem with the request.');
		}
	}
}
	