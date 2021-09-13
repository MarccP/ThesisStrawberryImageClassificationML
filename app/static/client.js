var el = x => document.getElementById(x);

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}


function showRecommendation() {
	var x = document.getElementById("recom");
	if(x.style.display === "none") {
		x.style.display = "block"
	} else {
		x.style.display = "none";
	}
	
	
}







function analyze() {
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {

      var response = JSON.parse(e.target.responseText);
	  
		  el("result-label").innerHTML = `Result = ${response["result"]}`;
      if (response["result"] == `extra_class`) {
        el("result2").innerHTML = `Strawberry Image uploaded is an Excellent Quality Product!`;
		el("recom_customer").innerHTML = `Recommendation : Strawberries are of great quality with ensured taste and vitamins, recommended to be bought at a higher price then average.
Strawberries show only good traits with no blemishes and bruises.
Note: Only buy if needed or if financially stable.`;
		el("recom_vendor").innerHTML = `Recommendation : For Vendor, The Strawberry is a Excellent Quality`;
		el("recom_farmer").innerHTML = `Recommendation : Strawberries are of great quality show few imperfections and should be offered at a greater price than the normal.
Due to the strawberries being great quality the soil, fertilizer and human resources should be noted and kept up to standards.
Note: Weather should always be noted/monitored and added to the results of the strawberries.`;
      } else if (response["result"] == `class1`) {
        el("result2").innerHTML = `Strawberry Image uploaded is an Good Quality Product!`;
		
		el("recom_customer").innerHTML = `Recommendation : Strawberries are of good quality worth buying at an average price.
Strawberries show good traits and characteristics with only small blemishes.`;

		el("recom_vendor").innerHTML = `Recommendation : Strawberries are of good quality worth marketing at a average to semi-high price and recommended to mark-up at a average price.
Strawberries show good traits and characteristics with only little blemishes. Recommended to be sold at a average price and sold medium sized bundle 
or as retail, sales confectioneries with exposed berries.`;

		el("recom_farmer").innerHTML = `Recommendation : Strawberries are of good quality and are ready to be harvested and imported with less supervision. 
With the strawberries being good quality the soil, fertilizer and human resources should be continoued with constant monitoring.
Due to strawberries being of good quality
Note: Weather should always be noted/monitored and added to the results of the strawberries. `;

      } else if (response["result"] == `class2`) {
        el("result2").innerHTML = `Strawberry Image uploaded is an Bad Quality Product!`;
		el("recom_customer").innerHTML = `Recommendation : Strawberries are of low to mediocre quality should avoid buying at a high price.
Strawberries show many signs of abnormality such as bruises and blemishes.`;
		el("recom_vendor").innerHTML = `Recommendation : Strawberries are of low to mediocre quality do not market at a high price and keep mark-up at a low.
Strawberries show many signs of abnormality such as bruises and blemishes. Recommended to be sold at a reasonable price and sold as a large bundle 
or as flavoring agents, baking, jams, cures, wines.`;
		el("recom_farmer").innerHTML = `Recommendation : Strawberries are of low to mediocre quality should either be left to ripen for few more days to a week and added supervision.
Due to strawberries being low to mediocre quality the soil, fertilizer and human resources should be monitored regularly and worked on. 
Note: Weather should always be noted/monitored and added to the results of the strawberries. `;
      }
      
    }
    el("analyze-button").innerHTML = "Analyze";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

