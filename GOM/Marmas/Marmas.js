var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var db;
var store;
var data;
var update = 0;
var InspectorLoaded = 0;

const AppState = {
	currentMarmaID: null,
	marmaName: null,
	filteredMarmas: [],
	filteredMarmaData: [],
	selects: {
		marmaName: new Set(),
		marmaGRP: new Set(),
		bodyRegion: new Set(),
		bodySide: new Set()
	}
};

//###################################################################################
//colors
//###################################################################################	

const snayu =	"rgba(219, 214, 160, " //#dbd6a0 
const mamsa =	"rgba(222, 176, 214, " //#deb0d6
const sandhi =	"rgba(162, 168, 222, " //#a2a8de
const sira =	"rgba(223, 107, 112, " //#DF6B70
const asthi =	"rgba(194, 179, 190,  " //#C2B3BE
const nutral =	"rgba(108, 122, 137, "

var marmaDesign;
//var marmaName;
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
		//document.documentElement.style.setProperty('--bg-color-2', "rgba(110, 110, 110, 1.00)");
		document.documentElement.style.setProperty('--bg-color-2', 'var(--bg-color-1)');
		document.documentElement.style.setProperty('--textColor', "rgba(0, 0, 0, 1.00)");
	}
}

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
console.log("stateFiltermenue: " + stateFiltermenue);

const filterMenue = document.getElementById('filterMenue');
filterMenue.classList.add('no-transition');

if (stateFiltermenue === 1){
	console.log("show filter menue");
	openFilterMenue(false); // Open without transition
} else if (stateFiltermenue === 0) { 
	console.log("hide filter menue");
	closeFilterMenue(false); // Close without transition
}

let startMarma = getQueryParam('Marma');
setQueryParam('Marma', "")

//###################################################################################
//retrieve temporary values
//###################################################################################	

console.log("Marmas in memory:", AppState.filteredMarmas);

if (!AppState.currentMarmaID) {
	if (AppState.filteredMarmas.length > 0) {
		AppState.currentMarmaID = AppState.filteredMarmas[0];
		console.log("No marmaID set. Defaulting to first filtered marma:", AppState.currentMarmaID);
	} else {
		console.warn("No marmaID set and no filtered marmas available.");
	}
} else {
	console.log("Current marmaID in memory:", AppState.currentMarmaID);
}


//###################################################################################
//Store values , retrieve values, handle color scema
//###################################################################################	
function loadMarmalist(db) {
    return new Promise((resolve, reject) => {
        const marmaStore = getObjectStore(db, "marmaStore", "readonly");
        const keysRequest = marmaStore.getAllKeys();

        keysRequest.onsuccess = function(event) {
            resolve(event.target.result); // All keys as an array
        };

        keysRequest.onerror = function(event) {
            reject(event.target.error);
        };
    });
}


function retrieveDataFromStores() {
	console.log("retrieve: " + AppState.currentMarmaID);

	InspectorLoaded = 0;

	// Access marma and value store in one transaction
	const { transaction, stores } = getStores(db, ["marmaStore", "marmaValueStore"], "readonly");

	const marmaStore = stores["marmaStore"];
	const marmaValueStore = stores["marmaValueStore"];
	
	// Access the second store: "marmaValueStore"
	const marmaInfoRequest = marmaStore.get(AppState.currentMarmaID);
	
	marmaInfoRequest.onsuccess = function(evt) {
		const data = marmaInfoRequest.result;
		if (!data) {
			console.error(`No data found for marmaID: ${AppState.currentMarmaID}`);
			return;
		}
		console.log(AppState.currentMarmaID + " FOUND");
		console.log("load and display INFOS of " + AppState.currentMarmaID);

		// Apply marma design and build the page
		marmaDesign = data.marmaGrp.sanskrit;
		console.log("style: " + marmaDesign);
		setColors(marmaDesign); 
		AppState.marmaName = data.marmaName.sanskrit;
		console.log("name: " + AppState.marmaName);

		// Populate page content using marma information
		updateClassElements('MarmaNameSK', data.marmaName.sanskrit);
		updateClassElements('MarmaGrpSK', data.marmaGrp.sanskrit);
		updateClassElements('MarmaGrpDE', data.marmaGrp.de);
		updateClassElements('BodyRegion', data.location.bodyRegion);
		updateClassElements('Anatomy', data.location.anatomy);

		document.getElementById("BodySide").innerHTML = data.location.bodySide;
		document.getElementById("headline2").innerHTML = data.marmaName.de;
		document.getElementById("visual_img").src = "../resources/marma_icons/" + AppState.currentMarmaID + ".webp";
		document.getElementById("Origin").innerHTML = data.info.origin;
		document.getElementById("Explanation").innerHTML = data.location.explanation;
		document.getElementById("Typography").innerHTML = data.info.typography;
		document.getElementById("MarmaTipp").innerHTML = data.info.tipp;
		
		console.log("display INFOS of " + AppState.currentMarmaID + " DONE");
	};

	marmaInfoRequest.onerror = function(evt) {
		console.error(`Error retrieving data for marmaID: ${AppState.currentMarmaID}`, evt);
	};

	// Access the second store: "marmaValueStore"
	const marmaUserValueRequest = marmaValueStore.get(AppState.currentMarmaID);

	marmaUserValueRequest.onsuccess = function(evt) {
		const userValues = marmaUserValueRequest.result;
		if (!userValues) {
			console.error(`No user values found for marmaID: ${AppState.currentMarmaID}`);
			return;
		}
		console.log("load and display VALUES of " + AppState.currentMarmaID);

		// Populate user input fields with marma values
		document.getElementById('localisation').value = userValues.localisation;
		document.getElementById('awareness').value = userValues.awareness;
		document.getElementById('frequency').value = userValues.frequency;

		locFunctionHide();  // Hide location-related elements (if needed)
		awFunctionHide();    // Hide awareness-related elements (if needed)
		freqFunctionHide();  // Hide frequency-related elements (if needed)

		updateSliderBackground("localisation");
		updateSliderBackground("awareness");
		updateSliderBackground("frequency");

		console.log("display VALUES of " + AppState.currentMarmaID + " DONE");
	};

	marmaUserValueRequest.onerror = function(evt) {
		console.error(`Error retrieving user values for marmaID: ${AppState.currentMarmaID}`, evt);
	};
}



initDB().then(db => {
    console.log("Database initialized for Marma Search");

	if (startMarma) {
		console.log("Parsed Marma:", startMarma);
		AppState.currentMarmaID = startMarma;
		retrieveDataFromStores();
	} else if (!AppState.currentMarmaID || AppState.currentMarmaID === "undefined") {
		console.warn("No marmaID found in memory or it's invalid. Starting up...");

		loadMarmalist(db).then(array => {
			AppState.filteredMarmas = array;
			console.log("All Marmas:", AppState.filteredMarmas);

			document.getElementById("filterHits").innerHTML = AppState.filteredMarmas.length;

			if (AppState.filteredMarmas.length > 0) {
				AppState.currentMarmaID = AppState.filteredMarmas[0];
				console.log("Defaulting to first Marma:", AppState.currentMarmaID);
				retrieveDataFromStores();
			} else {
				console.warn("filteredMarmas is empty, no IDs found.");
				AppState.currentMarmaID = "amsa_la";
				retrieveDataFromStores();
			}
		}).catch(error => {
			console.error("Error loading data from DB:", error);
		});
	} else {
		console.log("Using existing marmaID from memory:", AppState.currentMarmaID);
		retrieveDataFromStores(AppState.currentMarmaID);
	}

	//###################################################################################
	//Filtering
	//###################################################################################

	function filterMarmaData(db) {
		store = getObjectStore(db, "marmaStore", 'readonly');

		// get parsed marma
		if (startMarma) {
			console.log("startMarma from URL:", startMarma);
			let request = store.get(startMarma); // Assuming 'id' is the keyPath
			request.onsuccess = function (event) {
				let marmaEntry = event.target.result;
				if (marmaEntry) {
					let filteredData = [marmaEntry]; // Wrap it in an array for compatibility
					console.log("Found Marma by ID:", marmaEntry);
					AppState.filteredMarmas  = filteredData.map(marma => marma.id);
					console.log("Filtered IDs:", AppState.filteredMarmas);
					updateSelectOptions(filteredData);
					populateResultTable(filteredData);
					updateHitCounter();
					startMarma = "";
				} else {
					console.warn("No Marma found for startMarma ID:", startMarma);
					applyNextFilters([]); // Proceed with empty data
				}
			};
			return; // Skip the rest of the function
		}

		//get the userinput
		let filterValue_marmaName = document.getElementById("filterMarmaNAME").value;
		let filterValue_marmaGRP = document.getElementById("filterMarmaGRP").value;
		let filterValue_bodyRegion = document.getElementById("filterBodyPart").value;
		let filterValue_bodySide = document.getElementById("filterBodySide").value;

		/** Get Initial Data Based on First Available Filter */
		if (filterValue_marmaName) {
			console.log("Marma selected:",filterValue_marmaName);
			let index = store.index("marmaName");
			let request = index.getAll(filterValue_marmaName);
			request.onsuccess = function (event) {
				let filteredData = event.target.result;
				applyNextFilters(filteredData);
			};
		} else {
			console.log("No Marma selected");
			let request = store.getAll();
			request.onsuccess = function (event) {
				let allData = event.target.result;
				applyNextFilters(allData);
			};
		}

		/** Apply Additional Filters in Sequence */
		function applyNextFilters(filteredData) {
			console.log("Marma Group:",filterValue_marmaGRP);
			if (filterValue_marmaGRP) {
				filteredData = filteredData.filter(marma => marma.marmaGrp.de === filterValue_marmaGRP);
			}

			console.log("Body Region:",filterValue_bodyRegion);
			if (filterValue_bodyRegion) {
				filteredData = filteredData.filter(marma => marma.location.bodyRegion === filterValue_bodyRegion);
			}

			console.log("Body Side:",filterValue_bodySide);
			if (filterValue_bodySide) {
				filteredData = filteredData.filter(marma => marma.location.bodySide === filterValue_bodySide);
			}
			
			AppState.filteredMarmas  = filteredData.map(marma => marma.id);
			console.log("Filtered IDs:", AppState.filteredMarmas );
			
			// Save filter results
			localStorage.setItem("filteredMarmaData", JSON.stringify(filteredData));
			
			updateSelectOptions(filteredData); // Final result after all filters applied
			populateResultTable(filteredData);
			updateHitCounter();
		}
	}

	//###################################################################################
	//Update Filteroptions
	//###################################################################################

	// Create the options lists after filtering
	function updateSelectOptions(filteredData) {
		const selects = AppState.selects;

		// Clear all sets before adding new values
		selects.marmaName.clear();
		selects.marmaGRP.clear();
		selects.bodyRegion.clear();
		selects.bodySide.clear();

		// Populate sets with values from filteredData
		filteredData.forEach(marma => {
			selects.marmaName.add(marma.marmaName.sanskrit);
			selects.marmaGRP.add(marma.marmaGrp.de);
			selects.bodyRegion.add(marma.location.bodyRegion);
			selects.bodySide.add(marma.location.bodySide);
		});

		// Get current filter values
		const filterValue_marmaName = document.getElementById("filterMarmaNAME").value;
		const filterValue_marmaGRP = document.getElementById("filterMarmaGRP").value;
		const filterValue_bodyRegion = document.getElementById("filterBodyPart").value;
		const filterValue_bodySide = document.getElementById("filterBodySide").value;

		if (filteredData.length > 0) {
			populateDropdown("filterMarmaNAME", selects.marmaName, filterValue_marmaName);
			populateDropdown("filterMarmaGRP", selects.marmaGRP, filterValue_marmaGRP);
			populateDropdown("filterBodyPart", selects.bodyRegion, filterValue_bodyRegion);
			populateDropdown("filterBodySide", selects.bodySide, filterValue_bodySide);
		} else {
			console.warn("Skipping dropdown update – No results!");
		}
	}

	//populate the selection elemnts with the options, either from filter or restored
	function populateDropdown(selectId, optionsSet, storedValue) {
		let selectElement = document.getElementById(selectId);

		selectElement.innerHTML = ""; // Clear existing options

		// Default option text for each select
		let defaultOptions = {
			"filterMarmaNAME": "Marma auswählen",
			"filterMarmaGRP": "Marma Gruppe auswählen",
			"filterBodyPart": "Körperteil auswählen",
			"filterBodySide": "Bereich auswählen"
		};

		// If a value is selected, change the default text
		if (storedValue !== "") {
			defaultOptions = {
				"filterMarmaNAME": "Marma zurücksetzen",
				"filterMarmaGRP": "Marma Gruppe zurücksetzen",
				"filterBodyPart": "Körperteil zurücksetzen",
				"filterBodySide": "Seite zurücksetzen"
			};
		}

		// Add default option
		let defaultOption = document.createElement("option");
		defaultOption.value = "";
		defaultOption.text = defaultOptions[selectId] || "Select an option";
		selectElement.appendChild(defaultOption);

		// Add actual options
		optionsSet.forEach(option => {
			let newOption = document.createElement("option");
			newOption.value = option;
			newOption.text = option;
			selectElement.appendChild(newOption);
		});

		// Restore selection if it exists in the new dataset
		if (optionsSet.has(storedValue)) {
			selectElement.value = storedValue;
		} else {
			selectElement.value = ""; // Reset if not found
		}
	}
	
	function populateResultTable(filteredData){
		
		// Update resultlist with hit count
		let accordionHeader = document.getElementById("filterResults");
		if (filteredData.length == 1){
			accordionHeader.textContent = `${filteredData.length} Marma gefunden`;
		} else{
			accordionHeader.textContent = `${filteredData.length} Marmas gefunden`;
		}
	
		// Clear results container
		let resultsContainer = document.getElementById("resultsContainer");
		resultsContainer.innerHTML = "";

		let filteredStorageData = [];

		// Gather all options and create results overview
		filteredData.forEach(marma => {
			const selects = AppState.selects;
			selects.marmaName.add(marma.marmaName.sanskrit);
			selects.marmaGRP.add(marma.marmaGrp.de);
			selects.bodyRegion.add(marma.location.bodyRegion);
			selects.bodySide.add(marma.location.bodySide);
			
			// Store only necessary values
			filteredStorageData.push({
				id: marma.id,
				marmaName: { sanskrit: marma.marmaName.sanskrit },
				marmaGrp: { de: marma.marmaGrp.de }, 
				location: {  
					bodyRegion: marma.location.bodyRegion,
					bodySide: marma.location.bodySide
				}
			});
			
			// Create a div for each result
			let marmaDiv = document.createElement("div");
			marmaDiv.classList.add("marma-result");

			let infoContainer = document.createElement("div");
			infoContainer.classList.add("resultInfo-container");

			let nameDiv = document.createElement("div");
			nameDiv.classList.add("resultMain");
			nameDiv.textContent = "Name: " + marma.marmaName.sanskrit;
			
			let addInfoContainer = document.createElement("div");
			addInfoContainer.classList.add("resultAddInfo-container");

			let groupDiv = document.createElement("div");
			groupDiv.classList.add("resultAddInfo");
			groupDiv.textContent = marma.marmaGrp.de;
			
			let regionDiv = document.createElement("div");
			regionDiv.classList.add("resultAddInfo");
			regionDiv.textContent = marma.location.bodyRegion + " " + marma.location.bodySide;
			
			let button = document.createElement("button");
			button.classList.add("callMarma");
			button.addEventListener("click", function() {
				if (typeof marma.id === 'string' && marma.id.trim() !== '') {
					applyFilter(marma.id);
					console.log("marmaID:", marma.id);
				} else {
					console.log("Invalid marmaID:", marma.id);
				}
				//applyFilter(marma.id);
			});
			
			let buttonImage = document.createElement("img");
			buttonImage.setAttribute("src", "../resources/icons/goto-icon.webp");
			buttonImage.setAttribute("alt", "Marma aufrufen");
			
			button.appendChild(buttonImage);

			addInfoContainer.appendChild(groupDiv);
			addInfoContainer.appendChild(regionDiv);

			infoContainer.appendChild(nameDiv);
			infoContainer.appendChild(addInfoContainer);

			marmaDiv.appendChild(infoContainer);
			marmaDiv.appendChild(button);
			resultsContainer.appendChild(marmaDiv);
		});	
	}

	function updateHitCounter(){
		document.getElementById("filterHits").innerHTML = AppState.filteredMarmas .length;
		console.log("Number Hits:", AppState.filteredMarmas .length);
		if (AppState.filteredMarmas .length === 1) {
			document.getElementById("pervious").classList.add("hidden");
			document.getElementById("pervious2").classList.add("hidden");
			document.getElementById("next").classList.add("hidden");
		} else {
			document.getElementById("pervious").classList.remove("hidden");
			document.getElementById("pervious2").classList.remove("hidden");
			document.getElementById("next").classList.remove("hidden");
		}
	}

	// Save selected values
	function saveSelection() {
		AppState.selects.marmaName.clear();
		AppState.selects.marmaGRP.clear();
		AppState.selects.bodyRegion.clear();
		AppState.selects.bodySide.clear();

		document.querySelectorAll("#filterMarmaNAME option").forEach(opt => AppState.selects.marmaName.add(opt.value));
		document.querySelectorAll("#filterMarmaGRP option").forEach(opt => AppState.selects.marmaGRP.add(opt.value));
		document.querySelectorAll("#filterBodyPart option").forEach(opt => AppState.selects.bodyRegion.add(opt.value));
		document.querySelectorAll("#filterBodySide option").forEach(opt => AppState.selects.bodySide.add(opt.value));

		console.log("Filter values saved in memory.");
	}

	// Restore selected values and update dropdowns
	function restoreSelection() {
		const savedMarmaName = document.getElementById("filterMarmaNAME").value || "";
		const savedMarmaGRP = document.getElementById("filterMarmaGRP").value || "";
		const savedBodyRegion = document.getElementById("filterBodyPart").value || "";
		const savedBodySide = document.getElementById("filterBodySide").value || "";

		populateDropdown("filterMarmaNAME", AppState.selects.marmaName, savedMarmaName);
		populateDropdown("filterMarmaGRP", AppState.selects.marmaGRP, savedMarmaGRP);
		populateDropdown("filterBodyPart", AppState.selects.bodyRegion, savedBodyRegion);
		populateDropdown("filterBodySide", AppState.selects.bodySide, savedBodySide);

		updateHitCounter();
		populateResultTable(AppState.filteredMarmaData);
	}

	// Reset filter options
	function resetSelectOptions() {
		document.getElementById("filterMarmaNAME").value = "";
		document.getElementById("filterMarmaGRP").value = "";
		document.getElementById("filterBodyPart").value = "";
		document.getElementById("filterBodySide").value = "";
		console.log("Filter reset...");
		filterMarmaData(db);
	}

	// Apply filter and store selected items
	function applyFilter(marmaID) {
		setQueryParam("filterWindow", 0);
		closeFilterMenue(true);
		saveSelection();
		console.log("Filter applied:", AppState.filteredMarmas);

		if (AppState.filteredMarmas.length > 0) {
			AppState.currentMarmaID = AppState.filteredMarmas[0];
			if (typeof marmaID === 'string' && marmaID.trim() !== '') {
				AppState.currentMarmaID = marmaID;
			}
			console.log("Filtered Marmalist saved to memory");
		}

		// Update UI without reload
		retrieveDataFromStores(AppState.currentMarmaID);
	}

	console.log("Filter menu:", stateFiltermenue);
	if (stateFiltermenue === 0 && startMarma) {
		resetSelectOptions();
	} else	if (stateFiltermenue === 0) {
		restoreSelection();

	} else {
		resetSelectOptions();
	}

	// Event Listeners
	const filters = ["filterMarmaNAME", "filterMarmaGRP", "filterBodyPart", "filterBodySide"];
	filters.forEach(id => {
		document.getElementById(id).addEventListener("change", () => {
			filterMarmaData(db);
			showCircle(1,"filter-button", "shrink", "");
		});
	});

	document.getElementById("resetFilter").addEventListener("click", () => {
		resetSelectOptions();
		closeAll();
	});
	document.getElementById("filter-button").addEventListener("click", applyFilter);

}).catch(error => {
    console.error('Error initializing the database:', error);
});

// Utility function to update multiple elements with the same class
function updateClassElements(className, value) {
    const elements = document.getElementsByClassName(className);
    Array.prototype.forEach.call(elements, function(element) {
        element.innerHTML = value;
    });
}

function openFilterMenue(withTransition = true) {
	if (withTransition) {
		filterMenue.classList.remove('no-transition');
	}
	console.log("filtermenue opened");
	filterMenue.style.height = "100%";
	if (stateFiltermenue == 1){
		showCircle(3,"helpTWO","radiate","Hilfe");
	}
}

function closeFilterMenue(withTransition = true) {
  console.log("marma Design: " + marmaDesign);
  if (stateFiltermenue == 1){
	  showCircle(3,"help","radiate","Hilfe")
  }
  setQueryParam('filterWindow', 0);
  stateFiltermenue = 0;
  console.log("stateFiltermenue: " + stateFiltermenue);
  setColors(marmaDesign);
  if (withTransition) {
	filterMenue.classList.remove('no-transition');
	filterMenue.addEventListener('transitionend', function onTransitionEnd() {
	  filterMenue.classList.add('no-transition');
	  filterMenue.removeEventListener('transitionend', onTransitionEnd);
	});
  }
  filterMenue.style.height = "0%";
  console.log("filtermenue closed");
}

//###################################################################################
//change slider values
//###################################################################################		
	
function changeSliderValue() {

	const store = getObjectStore(db, "marmaValueStore", 'readwrite');
	const marmaInfoRequest = store.get(AppState.currentMarmaID);

	marmaInfoRequest.onsuccess = function(evt) {
		const record = evt.target.result;
		if (!record) {
			console.error(`No matching record found for marma_id: ${AppState.currentMarmaID}`);
			displayActionFailure("No matching record found");
			return;
		}

		// Log the record found
		console.log(AppState.currentMarmaID + " FOUND");
		console.log("record:", record);

		// Update the data with new values
		console.log("updating " + AppState.currentMarmaID + " ...");
		record.localisation = document.getElementById('localisation').value;
		record.awareness = document.getElementById('awareness').value;
		record.frequency = document.getElementById('frequency').value;

		// Update the record in the store
		const updateReq = store.put(record);

		updateReq.onsuccess = function(evt) {
			console.log("Updated record:", record);
			console.log(AppState.currentMarmaID + " UPDATED");
		};

		updateReq.onerror = function(evt) {
			console.error(`Error updating record for marma_id: ${AppState.currentMarmaID}`, evt);
		};
	};

	marmaInfoRequest.onerror = function(evt) {
		console.error(`Error retrieving data for marma_id: ${AppState.currentMarmaID}`, evt);
	};
}

// Function to update the slider's background
function updateSliderBackground(sliderID) {
	const slider = document.getElementById(sliderID);
	const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
	slider.style.background = `linear-gradient(to right, var(--bg-color-100) 0%, var(--bg-color-100) ${value}%, var(--bg-color-030) ${value}%, var(--bg-color-030) 100%)`;
}

function editMarma(sliderID) {
	console.log("edit ...");
	updateSliderBackground(sliderID)
	if (AppState.currentMarmaID != '') {
		changeSliderValue();
	} else {
		console.log("no marma_id provided");
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
      //LOCsliderValue.style.left = (valueLOC*20-(8 + valueLOC/2)) + "%";
	  //LOCsliderValue.style.left = "calc(20% + " + (valueLOC-1)*15 + "% + " + (12.5/valueLOC)+ "px)";
	  LOCsliderValue.style.left = "calc(20% + " + (valueLOC-1)*15 + "% )";
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
      AWsliderValue.style.left = "calc(20% + " + (valueAW-1)*15 + "% )";
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
      FREQsliderValue.style.left = "calc(20% + " + (valueFREQ-1)*12 + "% )";
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
//3d Body inspector
//###################################################################################


function openBodyInspector() {
  console.log("loading body inspector " + InspectorLoaded)
  console.log("marmaDesign " + marmaDesign)
  document.getElementById("3d_Body_Inspector").style.height = "100%";
  if (InspectorLoaded === 0){
	document.getElementById("inspectorFrame").src="../Body/body.html?marmaDesign=" + marmaDesign + "&cameraR=800" + "&key="+ AppState.currentMarmaID + "&marmaName=" + AppState.marmaName; //
	InspectorLoaded = 1;
	console.log(InspectorLoaded)
  }
  console.log("open 3d Body inspector")
}
function closeBodyInspector() {
  document.getElementById("3d_Body_Inspector").style.height = "0%";
}

//###################################################################################
//Navigation
//###################################################################################		

function nextElement() {
	console.log("Current filteredMarmas:", AppState.filteredMarmas);
	let currentMarmaID = AppState.currentMarmaID;
	console.log("Current marmaID in AppState:", currentMarmaID);
	
	let currentIndex = AppState.filteredMarmas.indexOf(currentMarmaID);
	console.log("Current index:", currentIndex);
	
	// Increment index by 1
	currentIndex += 1;
	if (currentIndex >= AppState.filteredMarmas.length) {
		currentIndex = 0; // loop to start
	}
	
	let nextMarmaID = AppState.filteredMarmas[currentIndex];
	AppState.currentMarmaID = nextMarmaID;
	sessionStorage.setItem("marmaID", nextMarmaID);
	
	console.log("Switched to next marmaID:", nextMarmaID);
	retrieveDataFromStores(nextMarmaID); // no reload needed
}

function previousElement() {
    const currentID = AppState.currentMarmaID;
    console.log("Current marmaID from AppState:", currentID);

    const currentIndex = AppState.filteredMarmas.indexOf(currentID);
    console.log("Current index of marmaID in filteredMarmas:", currentIndex);

    // Decrement index
    let newIndex = currentIndex - 1;

    // Wrap around if needed
    if (newIndex < 0) {
        newIndex = AppState.filteredMarmas.length - 1;
    }

    const newMarmaID = AppState.filteredMarmas[newIndex];
    AppState.currentMarmaID = newMarmaID;
    console.log("New marmaID set in AppState:", newMarmaID);

    console.log("Load previous...");
    retrieveDataFromStores(newMarmaID);
}


document.getElementById("next").addEventListener("click", nextElement);	
document.getElementById("pervious").addEventListener("click", previousElement);
document.getElementById("pervious2").addEventListener("click", previousElement);




