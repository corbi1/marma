var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var db;
var store;
var data;
var update = 0;

//###################################################################################
//colors
//###################################################################################	

const snayu =	"rgba(168, 222, 213,  "
const mamsa =	"rgba(162, 168, 222, "
const sandhi =	"rgba(222, 176, 214, "
const sira =	"rgba(219, 214, 160, "
const asthi =	"rgba(219, 207, 181, "
const nutral =	"rgba(108, 122, 137, "

var marmaDesign;
var cameraY;
var bgColor;

function setColors(marmaDesign) {
    
    if (marmaDesign === "snayu") {
        bgColor = snayu;
    } else if (marmaDesign === "mamsa") {
        bgColor = mamsa;
    } else if (marmaDesign === "sandhi") {
        bgColor = sandhi;
    } else if (marmaDesign === "sira") {
        bgColor = sira;
    } else if (marmaDesign === "asthi") {
        bgColor = asthi;
    } else {
        bgColor = nutral;
    }
    document.documentElement.style.setProperty('--bg-color-005', bgColor + "0.05)");
    document.documentElement.style.setProperty('--bg-color-010', bgColor + "0.10)");
    document.documentElement.style.setProperty('--bg-color-030', bgColor + "0.30)");
    document.documentElement.style.setProperty('--bg-color-050', bgColor + "0.50)");
    document.documentElement.style.setProperty('--bg-color-090', bgColor + "0.90)");
    document.documentElement.style.setProperty('--bg-color-100', bgColor + "1.00)");
	
	if (stateFiltermenue === 0){
		document.documentElement.style.setProperty('--bg-color-1', bgColor + "0.90)");
	}
}

//var stateFiltermenue
//deleting DB
//indexedDB.deleteDatabase('marmaDB').onsuccess=(function(e){console.log("Delete OK");})

//###################################################################################
//write URL Parameter
//###################################################################################	




//###################################################################################
//read URL Parameter
//###################################################################################	

function getQueryParam(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function setQueryParam(param, value) {
  let urlParams = new URLSearchParams(window.location.search);
  urlParams.set(param, value);
  window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
}

let stateFiltermenue = getQueryParam('filterWindow');
stateFiltermenue = parseInt(stateFiltermenue);

const filterMenue = document.getElementById('filterMenue');
filterMenue.classList.add('no-transition');

if (stateFiltermenue === 1){
	console.log("show filter menue");
	openFilterMenue(false); // Open without transition
} else if (stateFiltermenue === 0) { 
	console.log("hide filter menue");
	closeFilterMenue(false); // Close without transition
}

//###################################################################################
//Store values , retrieve values, handle color scema
//###################################################################################	

initDB().then(db => {
    console.log("Database initialized for Marma Search");

	function retrieveDataFromStores() {

	  // Access the first store
	  let store = getObjectStore("marmaStore", 'readwrite');
	  let key = sessionStorage.getItem("marmaID");
	  console.log("key " + key );
	  var marmaInfo = store.get(key);
	  marmaInfo.onsuccess = function(evt) {
		console.log(key + " FOUND");
		console.log("load and display infos of " + key);
		data = marmaInfo.result
		//build page
		//apperance
		marmaDesign = data.marmaGrp.sanskrit;
		var bgColor;
		console.log("style: " + marmaDesign);
		setColors(marmaDesign);
		
		// Marma information
		//Multiuse (classes)
		var ClassMarmaNameSK = document.getElementsByClassName('MarmaNameSK');
		Array.prototype.forEach.call(ClassMarmaNameSK, function (element) {
			element.innerHTML = data.marmaName.sanskrit;
			console.log(element);
		});
		var ClassMarmaGrpSK = document.getElementsByClassName('MarmaGrpSK');
		Array.prototype.forEach.call(ClassMarmaGrpSK, function (element) {
			element.innerHTML = data.marmaGrp.sanskrit;
			console.log(element);
		});					
		var ClassMarmaGrpDE = document.getElementsByClassName('MarmaGrpDE');
		Array.prototype.forEach.call(ClassMarmaGrpDE, function (element) {
			element.innerHTML = data.marmaGrp.de;
		});
		var ClassMarmaLoc = document.getElementsByClassName('BodyRegion');
		Array.prototype.forEach.call(ClassMarmaLoc, function (element) {
			element.innerHTML = data.location.bodyRegion;
		});
		var ClassMarmaAnatomy = document.getElementsByClassName('Anatomy');
		Array.prototype.forEach.call(ClassMarmaAnatomy, function (element) {
			element.innerHTML = data.location.anatomy;
		});
		
		document.getElementById("headline2").innerHTML = data.marmaName.de;
		document.getElementById("visual_img").src = "../resources/marma_icons/" + key +".png";
		document.getElementById("Origin").innerHTML = data.info.origin;
		document.getElementById("Explanation").innerHTML = data.location.explanation;
		document.getElementById("Typography").innerHTML = data.info.typography;
		console.log("display infos of " + key + " DONE");
		
		cameraY = data.location.height; //set camaera focus
	  }

	  // Access the User Values 
	  let ValueStore = getObjectStore("marmaValueStore", 'readwrite');
	  var marmaUserValue = ValueStore.get(key);
	  marmaUserValue.onsuccess = function(evt) {
		console.log("load and display values of " + key);
		userValues = marmaUserValue.result;	
		
		// Marma inputfields
		document.getElementById('localisation').value = userValues.localisation;
		document.getElementById('awareness').value = userValues.awareness;
		document.getElementById('frequency').value = userValues.frequency;

		locFunctionHide();
		awFunctionHide();	
		freqFunctionHide();
		
		updateSliderBackground("localisation");
		updateSliderBackground("awareness");
		updateSliderBackground("frequency");
		
		console.log("display values of " + key + " DONE");			  
	  }
	}
	
	retrieveDataFromStores();

//###################################################################################
//Create Filter values
//###################################################################################
	
	function loadSelectOptions() {
	  localStorage.setItem('SelectOptions_Name', JSON.stringify(document.getElementById("filterMarmaNAME").value));
	  console.log("save to storage: ", document.getElementById("filterMarmaNAME").value);
	  localStorage.setItem('SelectOptions_GRP', JSON.stringify(document.getElementById("filterMarmaGRP").value));
	  console.log("save to storage: ", document.getElementById("filterMarmaGRP").value);
	  localStorage.setItem('SelectOptions_Region', JSON.stringify(document.getElementById("filterBodyPart").value));
	  console.log("save to storage: ", document.getElementById("filterBodyPart").value);
	  localStorage.setItem('SelectOptions_Side', JSON.stringify(document.getElementById("filterBodySide").value));
	  console.log("save to storage: ", document.getElementById("filterBodySide").value);

	  document.getElementById("filterMarmaNAME").style.display = "initial"
	  document.getElementById("filterMarmaGRP").style.display = "initial"
	  document.getElementById("filterBodyPart").style.display = "initial"
	  document.getElementById("filterBodySide").style.display = "initial"
	  
	  filterValue_marmaName = document.getElementById("filterMarmaNAME").value
	  filterValue_marmaGRP = document.getElementById("filterMarmaGRP").value
	  filterValue_bodyRegion = document.getElementById("filterBodyPart").value
	  filterValue_bodySide = document.getElementById("filterBodySide").value
	  
	  console.log("values:" + filterValue_marmaName + filterValue_marmaGRP + filterValue_bodyRegion + filterValue_bodySide);
	  var SelectMarmaName = []; // Array to store MarmaName
	  var SelectMarmaGRP = []; // Array to store MarmaGruppe
	  var SelectBodyRegion = []; // Array to store BodyRegion
	  var SelectBodySide = []; // Array to store BodySide

	  store = getObjectStore("marmaStore", 'readwrite');
	  // Open a cursor to iterate over the data
	  console.log("opening cursor...");
	  store.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
		  var DBvalue_MarmaName = cursor.value.marmaName.sanskrit
		  var DBvalue_MarmaGRP = cursor.value.marmaGrp.sanskrit
		  var DBvalue_bodyRegion = cursor.value.location.bodyRegion
		  var DBvalue_bodySide = cursor.value.location.bodySide
					  
		  // Options when at least for MarmaName is set
		  if (filterValue_marmaName !== ""){
			if(filterValue_marmaGRP === "" && filterValue_bodyRegion === "" && filterValue_bodySide === "" && DBvalue_MarmaName === filterValue_marmaName) { //Options when only MarmaName is set
				console.log("Options when only MarmaName is set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}

			} else if (filterValue_bodySide === "" && filterValue_bodyRegion === "" &&DBvalue_MarmaName === filterValue_marmaName && DBvalue_MarmaGRP === filterValue_marmaGRP) { //Options when MarmaName and marmaGRP are set
				console.log("Options when MarmaName and marmaGRP are set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}

			} else if (filterValue_marmaGRP === "" && filterValue_bodySide === "" && DBvalue_MarmaName === filterValue_marmaName && DBvalue_bodyRegion === filterValue_bodyRegion) {	//Options when MarmaName and bodypart are set
				console.log("Options when MarmaName and bodypart are set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}

			} else if (filterValue_marmaGRP === "" && filterValue_bodyRegion === "" && DBvalue_MarmaName === filterValue_marmaName && DBvalue_bodySide === filterValue_bodySide) { //Options when MarmaName and bodyside are set
				console.log("Options when MarmaName and bodyside are set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}

			} else if (filterValue_bodySide === "" && DBvalue_MarmaName === filterValue_marmaName && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodyRegion === filterValue_bodyRegion){ //Options when MarmaName, MarmaGRP and bodyPart are set
				console.log("Options when MarmaName, MarmaGRP and bodyPart are set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				
			} else if (filterValue_bodyRegion === "" && DBvalue_MarmaName === filterValue_marmaName && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodySide === filterValue_bodySide){ //Options when MarmaName, MarmaGRP and bodySide are set
				console.log("Options when MarmaName, MarmaGRP and bodySide are set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				
			} else if (filterValue_marmaGRP === "" && DBvalue_MarmaName === filterValue_marmaName && DBvalue_bodyRegion === filterValue_bodyRegion && DBvalue_bodySide === filterValue_bodySide){ //Options when MarmaName, bodyPart and bodySide are set
				console.log("Options when MarmaName, bodyPart and bodySide are set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}

			} else if (DBvalue_MarmaName === filterValue_marmaName && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodyRegion === filterValue_bodyRegion && DBvalue_bodySide === filterValue_bodySide){ //Options when all options are set
				console.log("Options when all options are set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
			} 
		  
		  // Options when at least marmaGrp is set
		  } else if (filterValue_marmaGRP !== ""){
			if(filterValue_marmaName === "" && filterValue_bodyRegion === "" && filterValue_bodySide === "" && DBvalue_MarmaGRP === filterValue_marmaGRP) { //Options when only marmaGRP is set
				console.log("Options when only marmaGRP is set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}

			} else if (filterValue_marmaName === "" && filterValue_bodySide === "" && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodyRegion === filterValue_bodyRegion) { //Options when MarmaGRP and bodypart are set
				console.log("Options when MarmaGRP and bodypart are set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}

			} else if (filterValue_marmaName === "" && filterValue_bodyRegion === "" && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodySide === filterValue_bodySide) { //Options when MarmaGRP and bodyside are set
				console.log("Options when MarmaGRP and bodyside are set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}

			} else if (filterValue_marmaName === "" && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodyRegion === filterValue_bodyRegion && DBvalue_bodySide === filterValue_bodySide){ //Options when marmaGrp, bodyPart and bodySide are set
				console.log("Options when marmaGrp, bodyPart and bodySide are set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
			}
		
		  // Options when at least bodyPart is set
		  } else if (filterValue_bodyRegion !== ""){
			if(filterValue_marmaName === "" && filterValue_marmaGRP === "" && filterValue_bodySide === "" && DBvalue_bodyRegion == filterValue_bodyRegion) { //Options when only bodyPart is set
				console.log("Options when only bodyPart is set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}			  
		  
			} else if (filterValue_marmaName === "" && filterValue_marmaGRP === "" && DBvalue_bodyRegion === filterValue_bodyRegion && DBvalue_bodySide === filterValue_bodySide) { //Options when bodypart and bodyside are set
				console.log("Options when bodypart and bodyside are set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}			  
			}
		  
		  // Options when at least bodySide is set
		  } else if (filterValue_marmaName === "" && filterValue_marmaGRP === "" && filterValue_bodyRegion === "" && DBvalue_bodySide == filterValue_bodySide) { //Options when only bodyside is set
				console.log("Options when only bodyside is set");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}

		  // Options when all selects are set
		 } else if (filterValue_marmaName === "" && filterValue_bodyRegion === "" && filterValue_bodySide === "" && filterValue_marmaGRP === ""){ //all options
				console.log("all options");
				if (!SelectMarmaName.includes(DBvalue_MarmaName)) {
					SelectMarmaName.push(DBvalue_MarmaName);
				}
				if (!SelectBodyRegion.includes(DBvalue_bodyRegion)) {
					SelectBodyRegion.push(DBvalue_bodyRegion);
				}
				if (!SelectBodySide.includes(DBvalue_bodySide)) {
					SelectBodySide.push(DBvalue_bodySide);
				}
				if (!SelectMarmaGRP.includes(DBvalue_MarmaGRP)) {
					SelectMarmaGRP.push(DBvalue_MarmaGRP);
				}
		  }
		  cursor.continue();
		} else {
			console.log("All options provided.");
			// set options 
			function selectElements(id, SelectArray, StoredOption) {    
				var selectElement = document.getElementById(id);
				if (SelectArray) {
				var select = document.getElementById(id);

				// remove existing options
				   for(let j = selectElement.options.length - 1; j >= 1; j--) {
					  selectElement.remove(j);
				   }

				// Iterate SelectMarmaNames, create a <option> element and append it to the select
					for (let i = 0; i < SelectArray.length; i++) {
						const element = SelectArray[i];
						var option = document.createElement("option");
						option.text = element;
						option.value = element;
						select.appendChild(option);
					}
					if (SelectArray.length === 1){
						console.log("set " + SelectArray);
						document.getElementById(id).options[1].setAttribute('selected', 'selected');
					}
					
				document.getElementById(id).value = JSON.parse(localStorage.getItem(StoredOption));
				}
			}
			selectElements('filterMarmaNAME', SelectMarmaName, 'SelectOptions_Name');
			selectElements('filterMarmaGRP', SelectMarmaGRP, 'SelectOptions_GRP');
			selectElements('filterBodyPart', SelectBodyRegion, 'SelectOptions_Region');
			selectElements('filterBodySide', SelectBodySide, 'SelectOptions_Side');
		}
	  };
	}; //close: load select options

	document.getElementById("filterMarmaNAME").addEventListener("change", loadSelectOptions);
	document.getElementById("filterMarmaGRP").addEventListener("change", loadSelectOptions);
	document.getElementById("filterBodyPart").addEventListener("change", loadSelectOptions);
	document.getElementById("filterBodySide").addEventListener("change", loadSelectOptions);
	document.getElementById("openFilterMenue").addEventListener("click", loadSelectOptions); //button side bar
	document.getElementById("search").addEventListener("click", loadSelectOptions); //button menue bar
	
	function resetSelectOptions() {
	  document.getElementById("filterMarmaNAME").value = ""
	  document.getElementById("filterMarmaGRP").value = ""
	  document.getElementById("filterBodyPart").value = ""
	  document.getElementById("filterBodySide").value = ""
	  console.log("filter reset...");
	  loadSelectOptions()
	}
	if (stateFiltermenue === 1){
		resetSelectOptions();
		//setQueryParam('filterWindow', 0);
		sessionStorage.setItem("marmaID", myArray[0]);
	}
	
	document.getElementById("resetFilter").addEventListener("click", resetSelectOptions);

//###################################################################################
//Filtering
//###################################################################################			

	function filterData() {
	  setQueryParam('filterWindow', 0);
	  stateFiltermenue = 0;
	  console.log("stateFiltermenue :" + stateFiltermenue);
	  document.documentElement.style.setProperty('--bg-color-1', bgColor + "0.90)");
	  // set filter value
	  console.log(document.getElementById("filterBodySide").value);
	  var filterValue_marmaName = document.getElementById("filterMarmaNAME").value
	  var filterValue_marmaGRP = document.getElementById("filterMarmaGRP").value
	  var filterValue_bodyRegion = document.getElementById("filterBodyPart").value
	  var filterValue_bodySide = document.getElementById("filterBodySide").value
	  
	  myArray = []; // Array to store key ids, clear the array before populating it again
	  store = getObjectStore("marmaStore", 'readwrite');
	  // Open a cursor to iterate over the data
	  console.log("start filtering...");
	  store.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
		  var DBvalue_MarmaName = cursor.value.marmaName.sanskrit
		  var DBvalue_MarmaGRP = cursor.value.marmaGrp.sanskrit
		  var DBvalue_bodyRegion = cursor.value.location.bodyRegion
		  var DBvalue_bodySide = cursor.value.location.bodySide
					  
		  //Filter nach marmaName (Filtering GRP not necessary because Name forces GRP)
		  if (filterValue_marmaName !== "" && filterValue_marmaGRP === ""){
			if (DBvalue_MarmaName === filterValue_marmaName && DBvalue_bodyRegion === filterValue_bodyRegion && DBvalue_bodySide === filterValue_bodySide) {	//Filter marmaName + bodypart + bodySide
			myArray.push(cursor.key);
			} else if (filterValue_bodySide === "" && DBvalue_MarmaName === filterValue_marmaName && DBvalue_bodyRegion === filterValue_bodyRegion) {	//Filter marmaName + bodyPart
			myArray.push(cursor.key);
			} else if (filterValue_bodyRegion === "" && DBvalue_MarmaName === filterValue_marmaName && DBvalue_bodySide === filterValue_bodySide) {	//Filter marmaName + bodySide
			myArray.push(cursor.key);
			} else if(filterValue_bodyRegion === "" && filterValue_bodySide === "" && DBvalue_MarmaName == filterValue_marmaName) { //Filter MarmaName
			myArray.push(cursor.key);
			}
		  }
		  
		  //Filter nach marmaGRP
		  if (filterValue_marmaGRP !== ""){
			if (DBvalue_MarmaName === filterValue_marmaName && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodyRegion === filterValue_bodyRegion && DBvalue_bodySide === filterValue_bodySide) {	//Filter MarmaName, marmaGrp, bodypart und Bodyside
			myArray.push(cursor.key);
			} else if (filterValue_marmaName === "" && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodyRegion === filterValue_bodyRegion && DBvalue_bodySide === filterValue_bodySide) {	// marmaGrp, bodypart und Bodyside
			myArray.push(cursor.key);
			} else if (filterValue_bodyRegion === "" && DBvalue_MarmaName === filterValue_marmaName && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodySide === filterValue_bodySide) {	// Filter MarmaName, marmaGrp und Bodyside
			myArray.push(cursor.key);
			} else if (filterValue_bodySide === "" && DBvalue_MarmaName === filterValue_marmaName && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodyRegion === filterValue_bodyRegion ) {	// Filter MarmaName, marmaGrp und bodypart
			myArray.push(cursor.key);
			} else if (filterValue_marmaName === "" && filterValue_bodyRegion === "" && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodySide === filterValue_bodySide) {	// marmaGrp und Bodyside
			myArray.push(cursor.key);
			} else if (filterValue_bodyRegion === "" && filterValue_bodySide === "" && DBvalue_MarmaName === filterValue_marmaName && DBvalue_MarmaGRP === filterValue_marmaGRP ) {	// Filter MarmaName, marmaGrp
			myArray.push(cursor.key);
			} else if (filterValue_marmaName === "" && filterValue_bodySide === "" && DBvalue_MarmaGRP === filterValue_marmaGRP && DBvalue_bodyRegion === filterValue_bodyRegion ) {	// Filter marmaGrp und bodypart
			myArray.push(cursor.key);
			} else if (filterValue_marmaName === "" && filterValue_bodyRegion === "" && filterValue_bodySide === "" && DBvalue_MarmaGRP === filterValue_marmaGRP ) {	// Filter marmaGrp
			myArray.push(cursor.key);
			}
		  //Filter nach bodyPart
		  } else if (filterValue_bodyRegion !== "" && filterValue_marmaGRP === "" && filterValue_marmaName === ""){
			if (DBvalue_bodyRegion === filterValue_bodyRegion && DBvalue_bodySide === filterValue_bodySide) {	//Filter bodypart und bodySide
			myArray.push(cursor.key);
			} else if (filterValue_bodySide === "" && DBvalue_bodyRegion === filterValue_bodyRegion){ //Filter bodypart 
			myArray.push(cursor.key);
			} 
		  //Filter nach bodySide
		  } else if (filterValue_bodySide !== "" && filterValue_marmaGRP === "" && filterValue_marmaName === ""){
			if (DBvalue_bodySide === filterValue_bodySide) {	//Filter bodypart
			myArray.push(cursor.key);
			}
		  //All Marmas
		  } else if (filterValue_marmaName === "" && filterValue_marmaGRP === "" && filterValue_bodyRegion === "" && filterValue_bodySide === "") {
			myArray.push(cursor.key);
		  }  

		  cursor.continue();
		} else {
		  console.log("All data processed.");
		  console.log("Marmas at ", filterValue_bodyRegion, myArray);
		  
		  // jump to first marma
		  if (myArray.length > 0){
			  sessionStorage.setItem("marmaID", myArray[0]);
			  console.log(myArray[0])
			  console.log("load next...")
			  console.log("Saving filtered Marmalist")
		  }
		  localStorage.setItem('myArray', JSON.stringify(myArray));
		  location.reload()
		}
	  };
	};  //close: filterData
	document.getElementById("filter-button").addEventListener("click", filterData);
}).catch(error => {
    console.error(error);
}); // close db retrieval

    function openFilterMenue(withTransition = true) {
      if (withTransition) {
        filterMenue.classList.remove('no-transition');
      }
      console.log("filtermenue opened");
      filterMenue.style.height = "100%";
    }

    function closeFilterMenue(withTransition = true) {
      console.log(marmaDesign);
	  setColors(marmaDesign);
	  if (withTransition) {
        filterMenue.classList.remove('no-transition');
        filterMenue.addEventListener('transitionend', function onTransitionEnd() {
          filterMenue.classList.add('no-transition');
          filterMenue.removeEventListener('transitionend', onTransitionEnd);
        });
      }
      console.log("filtermenue closed");
      filterMenue.style.height = "0%";
	  setQueryParam('filterWindow', 0);
	  stateFiltermenue = 0;
	  console.log("stateFiltermenue :" + stateFiltermenue);
	  document.documentElement.style.setProperty('--bg-color-1', bgColor + "0.90)");
    }
//document.getElementById("openFilterMenue").addEventListener("click", openFilterMenue);	

// Handle errors in opening the database
/*
open.onerror = function(event) {
	console.error("Error opening database:", event.target.error);
};
*/


//###################################################################################
//change slider values
//###################################################################################		
	
function queryMarma(key) {
	console.log("callMarmaData:", arguments);
	console.log("key:", key);
	store = getObjectStore("marmaValueStore", 'readwrite');

	var marmaInfo = store.get(key);
	marmaInfo.onsuccess = function(evt) {
		console.log(key + " FOUND");
		var record = evt.target.result;
		console.log("record:", record);
		if (typeof record == 'undefined') { //within the onsucces function --> should not work
			displayActionFailure("No matching record found");
			return;
		}
		
		// Update the data
		//new values
		console.log("updating " + key + " ...");
		data = marmaInfo.result
		data.localisation = document.getElementById('localisation').value;
		data.awareness = document.getElementById('awareness').value;
		data.frequency = document.getElementById('frequency').value;
		var updateReq = store.put(data);
		
		updateReq.onsuccess = function(evt) {
			console.log("record new:", record);
			console.log("evt.target:", evt.target);
			console.log(key + " UPDATED");
		};
	};
}

// Function to update the slider's background
function updateSliderBackground(id) {
	const slider = document.getElementById(id);
	const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
	slider.style.background = `linear-gradient(to right, var(--bg-color-100) 0%, var(--bg-color-100) ${value}%, var(--bg-color-030) ${value}%, var(--bg-color-030) 100%)`;
}

function editMarma(id) {
	console.log("edit ...");
	var key = sessionStorage.getItem("marmaID");
	updateSliderBackground(id)
	if (key != '') {
		console.log("editing " + key);
		queryMarma(key);
	} else {
		console.log("no key provided");
		return;
	}
};

document.getElementById("localisation").addEventListener("input", function() {
	editMarma("localisation");
});
document.getElementById("awareness").addEventListener("input", function() {
	editMarma("awareness");
});
document.getElementById("frequency").addEventListener("input", function() {
	editMarma("frequency");
});


//###################################################################################
//Sliderinfo
//###################################################################################	

let LOCsliderValue = document.getElementById("localisationPopup");
let LOCinputSlider = document.getElementById("localisation");
let localisationExpl = document.getElementById("localisationExpl");
let localisationLabel = document.getElementById("localisationLabel");	
const LOCarr = ["überhaupt nicht", "ungefähr", "gut", "sehr gut", "genau"] //ich kenne den Ort ...
LOCinputSlider.oninput = function() {locFunctionShow()};
LOCinputSlider.onblur = function() {locFunctionHide()};

function locFunctionShow() {
      let valueLOC = LOCinputSlider.value;
	  localisationLabel.classList.remove("show");
	  localisationExpl.classList.add("show");
	  LOCsliderValue.textContent = LOCarr[valueLOC - 1 ];
      LOCsliderValue.style.left = (valueLOC*20-(8 + valueLOC/2)) + "%";
      LOCsliderValue.classList.add("show");
    }
function locFunctionHide() {
	  LOCsliderValue.classList.remove("show");
	  localisationLabel.classList.add("show");
	  localisationExpl.classList.remove("show");
    }


let AWsliderValue = document.getElementById("awarenessPopup");
let AWinputSlider = document.getElementById("awareness");
let awarenessExpl = document.getElementById("awarenessExpl");
let awarenessLabel = document.getElementById("awarenessLabel");	
const AWarr = ["überhaupt nicht", "kaum", "etwas", "stark", "sehr stark"] //Ich spüre das Marma ...
AWinputSlider.oninput = function() {awFunctionShow()};
AWinputSlider.onblur = function() {awFunctionHide()};

function awFunctionShow() {
      let valueAW = AWinputSlider.value;
	  awarenessLabel.classList.remove("show");
	  awarenessExpl.classList.add("show");
	  AWsliderValue.textContent = AWarr[valueAW - 1 ];
      AWsliderValue.style.left = (valueAW*20-(8 + valueAW/2)) + "%";
      AWsliderValue.classList.add("show");
    }
function awFunctionHide() {
      AWsliderValue.classList.remove("show");
	  awarenessLabel.classList.add("show");
	  awarenessExpl.classList.remove("show");
    }

let FREQsliderValue = document.getElementById("frequencyPopup");
let FREQinputSlider = document.getElementById("frequency");
let frequencyExpl = document.getElementById("frequencyExpl");
let frequencyLabel = document.getElementById("frequencyLabel");
const FREQarr = ["überhaupt nicht", "selten", "manchmal", "oft", "sehr oft", "fast immer"] //Ich spüre das Marma ...
FREQinputSlider.oninput = function() {freqFunctionShow()};
FREQinputSlider.onblur = function() {freqFunctionHide()};

function freqFunctionShow() {
      let valueFREQ = FREQinputSlider.value;
	  frequencyLabel.classList.remove("show");
	  frequencyExpl.classList.add("show");
	  FREQsliderValue.textContent = FREQarr[valueFREQ - 1 ];
      FREQsliderValue.style.left = (valueFREQ*11.5 + (valueFREQ-1)*3.9) + "%";
      FREQsliderValue.classList.add("show");
	}
function freqFunctionHide() {
      FREQsliderValue.classList.remove("show");
	  frequencyLabel.classList.add("show");
	  frequencyExpl.classList.remove("show");
	}

document.addEventListener('click', function (event) {
	if (!event.target.closest('.slidecontainer')) {
		hideAllPopups();
	}
});

function hideAllPopups() {
	document.querySelectorAll('.sExpl').forEach(popup => {
		popup.classList.remove('show');
	});
	document.querySelectorAll('.popuptext').forEach(popup => {
		popup.classList.remove('show');
	});
	document.querySelectorAll('.sLabel').forEach(label => {
		label.classList.add('show');
	});
}


//###################################################################################
//Accordion
//###################################################################################		
	
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
	if( !this.classList.contains('active') ){
	closeAll();
	}
	this.classList.toggle("active");
	var panel = this.nextElementSibling;
	if (panel.style.maxHeight) {
	  panel.style.maxHeight = null;
	} else {
	  panel.style.maxHeight = panel.scrollHeight + "px";
	} 
  });
}
function closeAll(){
	for (i = 0; i < acc.length; i++) {
	acc[i].classList.remove("active");
	acc[i].nextElementSibling.style.maxHeight = null;
	}
}

//###################################################################################
//3d marma inspector
//###################################################################################

var InspectorLoaded = 0;
function openMarmaInspector() {
  console.log("loading marma inspector " + InspectorLoaded)
  console.log("marmaDesign " + marmaDesign)
  console.log("camera height " + cameraY)
  console.log("stateFiltermenue :" + stateFiltermenue);	 
  document.getElementById("3d_marma_Inspector").style.height = "100%";
  if (InspectorLoaded === 0){
	document.getElementById("inspectorFrame").src="../MarmaInspector/MarmaInspector.html?marmaDesign=" + marmaDesign + "&cameraY=" + cameraY + "&cameraR=800"; //
	InspectorLoaded = 1;
	console.log(InspectorLoaded)
  }
  console.log("open 3d Marma inspector")
}
function closeMarmaInspector() {
  document.getElementById("3d_marma_Inspector").style.height = "0%";
}




//###################################################################################
//Navigation
//###################################################################################		

// set old filter value (on page reload)
function selectFilterElement(id, valueToSelect) {    
	var selectElement = document.getElementById(id);
	if (valueToSelect) {
		var optionElement = document.createElement('option');
		optionElement.value = valueToSelect;
		optionElement.textContent = valueToSelect;
		selectElement.appendChild(optionElement);
		selectElement.value = valueToSelect; // Set the newly created option as selected
		console.log("saved Marma: " + selectElement.value);
	}
}

var savedMarmaName = JSON.parse(localStorage.getItem('SelectOptions_Name'));
var savedMarmaGRP = JSON.parse(localStorage.getItem('SelectOptions_GRP'));
var savedBodyRegion = JSON.parse(localStorage.getItem('SelectOptions_Region'));
var savedBodySide = JSON.parse(localStorage.getItem('SelectOptions_Side'));
selectFilterElement('filterMarmaNAME', savedMarmaName);
selectFilterElement('filterMarmaGRP', savedMarmaGRP);
selectFilterElement('filterBodyPart', savedBodyRegion);
selectFilterElement('filterBodySide', savedBodySide);

var myArray
myArray = JSON.parse(localStorage.getItem('myArray'));
//if (document.getElementById("filterMarmaNAME").value == "" && document.getElementById("filterMarmaGRP").value == "" && document.getElementById("filterBodyPart").value == ""){
if (myArray === undefined || myArray === null || myArray.length === 0){
	console.log("navigation: all marmas");
	myArray = ['kurca_ll', 'kurca_rl', 'kurca_la', 'kurca_ra', 'kurcaS_ll', 'kurcaS_rl', 'kurcaS_la', 'kurcaS_ra', 'ani_ll', 'ani_rl', 'ani_la', 'ani_ra', 'kakshadara_l', 'kakshadara_r', 'ksipra_ll', 'ksipra_rl', 'ksipra_la', 'ksipra_ra', 'amsa_la', 'amsa_ra', 'gulpha_ll', 'gulpha_rl', 'manibandha_la', 'manibandha_ra', 'kukundara_l', 'kukundara_r', 'janu_ll', 'janu_rl', 'kurpara_la', 'kurpara_ra', 'indravasti_ll', 'indravasti_rl', 'indravasti_la', 'indravasti_ra', 'talahridaya_ll', 'talahridaya_rl', 'talahridaya_la', 'talahridaya_ra', 'urvi_ll', 'urvi_rl', 'bahvi_la', 'bahvi_ra', 'lohitaksha_ll', 'lohitaksha_rl', 'lohitaksha_la', 'lohitaksha_ra', 'vitapa_ll', 'vitapa_rl', 'nitamba_l', 'nitamba_r', 'amsaphalaka_l', 'amsaphalaka_r'];
} else { 
	console.log("navigation:" + myArray);
	document.getElementsByClassName('circle-badge')[0].style.display = 'flex';
	document.getElementById("filterHits").innerHTML = myArray.length;
}

console.log(sessionStorage.getItem("marmaID"));
if (sessionStorage.getItem("marmaID") == null){
	sessionStorage.setItem("marmaID", myArray[0]);
}

function nextElement() {
	console.log(myArray);
	let setMarma = sessionStorage.getItem("marmaID");
	console.log("Current marmaID from sessionStorage:", setMarma);
	
	let myIndex = myArray.indexOf(setMarma);
	console.log("Current index of marmaID in myArray:", myIndex);
	
	// Increment index by 1
	myIndex += 1;
	console.log("Next index of marmaID in myArray:", myIndex);
	
	if (myIndex >= myArray.length){
		myIndex = 0;
	}
	sessionStorage.setItem("marmaID", myArray[myIndex]);
	console.log("New marmaID set in sessionStorage:", myArray[myIndex]);
	console.log("load next...")
	location.reload()
};
	
function previousElement() {
    let setMarma = sessionStorage.getItem("marmaID");
    console.log("Current marmaID from sessionStorage:", setMarma);
    
	let myIndex = myArray.indexOf(setMarma);
    console.log("Current index of marmaID in myArray:", myIndex);
	
	// Decrement index by 1
    myIndex -= 1;
	
	console.log("previous")

	if (myIndex < 0){
		myIndex = myArray.length -1;
	}
	//document.getElementById('marmaID').value = myArray[myIndex]
	sessionStorage.setItem("marmaID", myArray[myIndex]);
	console.log("New marmaID set in sessionStorage:", myArray[myIndex]);
    console.log("load previous...");
	location.reload()
};

document.getElementById("next").addEventListener("click", nextElement);	
document.getElementById("pervious").addEventListener("click", previousElement);
document.getElementById("pervious2").addEventListener("click", previousElement);




