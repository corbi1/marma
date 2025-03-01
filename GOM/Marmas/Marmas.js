var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var db;
var store;
var data;
var update = 0;

let SelectMarmaName = new Set();
let SelectMarmaGRP = new Set();
let SelectBodyRegion = new Set();
let SelectBodySide = new Set();

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
var marmaName;
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
		document.documentElement.style.setProperty('--fontFilter', "rgba(0, 0, 0, 1.00)");
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
//retrieve temporary values
//###################################################################################	

console.log("Marmas in storage",localStorage.getItem('filteredMarmas'));
var filteredMarmas = JSON.parse(localStorage.getItem('filteredMarmas')) || [];
var filterResults = [];
console.log("Marmas",filteredMarmas);

console.log(sessionStorage.getItem("marmaID"));
if (sessionStorage.getItem("marmaID") == null){
	sessionStorage.setItem("marmaID", filteredMarmas[0]);
}

//###################################################################################
//Store values , retrieve values, handle color scema
//###################################################################################	
function loadMarmalist(db) {
    return new Promise((resolve, reject) => {
        const marmaStore = getObjectStore(db, "marmaStore", "readwrite");
        let cursorRequest = marmaStore.openCursor();
        let resultArray = [];

        cursorRequest.onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                resultArray.push(cursor.key);
                cursor.continue();
            } else {
                resolve(resultArray); // Resolve the Promise with the final array
            }
        };

        cursorRequest.onerror = function(event) {
            reject(event.target.error); // Reject the Promise on error
        };
    });
}


initDB().then(db => {
    console.log("Database initialized for Marma Search");
	
	if (sessionStorage.getItem("marmaID") === "undefined" || sessionStorage.getItem("marmaID") === null) { // Starting up for the first time or error
		console.warn('No marmaID found in sessionStorage');
		sessionStorage.removeItem("marmaID"); // Remove bad data
		loadMarmalist(db).then(array => { // create list of all marmas
			filteredMarmas = array;
			console.log("All Marmas:", filteredMarmas);
			sessionStorage.setItem("marmaID", filteredMarmas[0] || null);
			localStorage.setItem('filteredMarmas', JSON.stringify(filteredMarmas));
			document.getElementById("filterHits").innerHTML = filteredMarmas.length;
			if (filteredMarmas.length > 0) {
				retrieveDataFromStores();
			} else {
				console.warn("filteredMarmas is empty, no IDs found.");
				sessionStorage.setItem("marmaID", "amsa_la");
			}
		}).catch(error => {
			console.error("Error loading data from DB:", error);
		});
		
	} else {
		retrieveDataFromStores();
	}

    function retrieveDataFromStores() {
        console.log("Marma default: " + filteredMarmas[0]);
		console.log("storage: " + sessionStorage.getItem("marmaID"));
		
		let key = sessionStorage.getItem("marmaID");
        console.log("key: " + key);

        // Access the first store: "marmaStore"
        const marmaStore = getObjectStore(db, "marmaStore", 'readwrite');
        const marmaInfoRequest = marmaStore.get(key);
		
        marmaInfoRequest.onsuccess = function(evt) {
            const data = marmaInfoRequest.result;
            if (!data) {
                console.error(`No data found for marmaID: ${key}`);
                return;
            }
            console.log(key + " FOUND");
            console.log("load and display infos of " + key);

            // Apply marma design and build the page
            marmaDesign = data.marmaGrp.sanskrit;
            console.log("style: " + marmaDesign);
            setColors(marmaDesign); 
			marmaName = data.marmaName.sanskrit;
			console.log("name: " + marmaName);

            // Populate page content using marma information
            updateClassElements('MarmaNameSK', data.marmaName.sanskrit);
            updateClassElements('MarmaGrpSK', data.marmaGrp.sanskrit);
            updateClassElements('MarmaGrpDE', data.marmaGrp.de);
            updateClassElements('BodyRegion', data.location.bodyRegion);
            updateClassElements('Anatomy', data.location.anatomy);

			document.getElementById("BodySide").innerHTML = data.location.bodySide;
            document.getElementById("headline2").innerHTML = data.marmaName.de;
            document.getElementById("visual_img").src = "../resources/marma_icons/" + key + ".webp";
            document.getElementById("Origin").innerHTML = data.info.origin;
            document.getElementById("Explanation").innerHTML = data.location.explanation;
            document.getElementById("Typography").innerHTML = data.info.typography;
			document.getElementById("MarmaTipp").innerHTML = data.info.tipp;
			
            console.log("display infos of " + key + " DONE");
        };

        marmaInfoRequest.onerror = function(evt) {
            console.error(`Error retrieving data for marmaID: ${key}`, evt);
        };

        // Access the second store: "marmaValueStore"
        const marmaValueStore = getObjectStore(db, "marmaValueStore", 'readwrite');
        const marmaUserValueRequest = marmaValueStore.get(key);

        marmaUserValueRequest.onsuccess = function(evt) {
            const userValues = marmaUserValueRequest.result;
            if (!userValues) {
                console.error(`No user values found for marmaID: ${key}`);
                return;
            }
            console.log("load and display values of " + key);

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

            console.log("display values of " + key + " DONE");
        };

        marmaUserValueRequest.onerror = function(evt) {
            console.error(`Error retrieving user values for marmaID: ${key}`, evt);
        };
    }

	//###################################################################################
	//Filtering new
	//###################################################################################

	function filterMarmaData(db) {
		store = getObjectStore(db, "marmaStore", 'readonly');

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
			
			filterResults = filteredData.map(marma => marma.id);
			console.log("Filtered IDs:", filterResults);
			updateSelectOptions(filteredData); // Final result after all filters applied
		}
	}

	//###################################################################################
	//Update Filteroptions
	//###################################################################################

	// Create the options lists after filtering
	function updateSelectOptions(filteredData) {
		// Clear previous options to prevent empty or stale options
		SelectMarmaName.clear();
		SelectMarmaGRP.clear();
		SelectBodyRegion.clear();
		SelectBodySide.clear();
		
		// Update resultlist with hit count
		let accordionHeader = document.getElementById("filterResults");
		accordionHeader.textContent = `${filteredData.length} Marmas gefunden`;
	
		// Clear results container
		let resultsContainer = document.getElementById("resultsContainer");
		resultsContainer.innerHTML = "";

		// Gather all options and create results overview
		filteredData.forEach(marma => {
			SelectMarmaName.add(marma.marmaName.sanskrit);
			SelectMarmaGRP.add(marma.marmaGrp.de);
			SelectBodyRegion.add(marma.location.bodyRegion);
			SelectBodySide.add(marma.location.bodySide);

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
			regionDiv.textContent = marma.location.bodyRegion;
			
			let sideDiv = document.createElement("div");
			sideDiv.classList.add("resultAddInfo");
			sideDiv.textContent = marma.location.bodySide;
			
			let button = document.createElement("button");
			button.classList.add("callMarma");
			button.addEventListener("click", function() {
				applyFilter(marma.id);
			});
			
			let buttonImage = document.createElement("img");
			buttonImage.setAttribute("src", "../resources/icons/next-icon.webp");
			buttonImage.setAttribute("alt", "Marma aufrufen");
			
			button.appendChild(buttonImage);

			addInfoContainer.appendChild(groupDiv);
			addInfoContainer.appendChild(regionDiv);
			addInfoContainer.appendChild(sideDiv);

			infoContainer.appendChild(nameDiv);
			infoContainer.appendChild(addInfoContainer);

			marmaDiv.appendChild(infoContainer);
			marmaDiv.appendChild(button);
			resultsContainer.appendChild(marmaDiv);
		});

			let filterValue_marmaName = document.getElementById("filterMarmaNAME").value;
			let filterValue_marmaGRP = document.getElementById("filterMarmaGRP").value;
			let filterValue_bodyRegion = document.getElementById("filterBodyPart").value;
			let filterValue_bodySide = document.getElementById("filterBodySide").value;

		if (filteredData.length > 0) {
			populateDropdown("filterMarmaNAME", SelectMarmaName, filterValue_marmaName);
			populateDropdown("filterMarmaGRP", SelectMarmaGRP, filterValue_marmaGRP);
			populateDropdown("filterBodyPart", SelectBodyRegion, filterValue_bodyRegion);
			populateDropdown("filterBodySide", SelectBodySide, filterValue_bodySide);
		} else {
			console.warn("Skipping dropdown update – No results!");
		}
	}

	//populate the selcetion elemnts with the options, either from filter or restored
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

	// Save selected values to localStorage
	function saveSelection() {
		document.querySelectorAll("#filterMarmaNAME option").forEach(opt => SelectMarmaName.add(opt.value));
		document.querySelectorAll("#filterMarmaGRP option").forEach(opt => SelectMarmaGRP.add(opt.value));
		document.querySelectorAll("#filterBodyPart option").forEach(opt => SelectBodyRegion.add(opt.value));
		document.querySelectorAll("#filterBodySide option").forEach(opt => SelectBodySide.add(opt.value));

		// Save option sets
		localStorage.setItem("SelectOptions_Name", JSON.stringify([...SelectMarmaName]));
		localStorage.setItem("SelectOptions_GRP", JSON.stringify([...SelectMarmaGRP]));
		localStorage.setItem("SelectOptions_Region", JSON.stringify([...SelectBodyRegion]));
		localStorage.setItem("SelectOptions_Side", JSON.stringify([...SelectBodySide]));

		// Save selected values
		localStorage.setItem("Selected_MarmaName", document.getElementById("filterMarmaNAME").value);
		localStorage.setItem("Selected_MarmaGRP", document.getElementById("filterMarmaGRP").value);
		localStorage.setItem("Selected_BodyRegion", document.getElementById("filterBodyPart").value);
		localStorage.setItem("Selected_BodySide", document.getElementById("filterBodySide").value);

		console.log("Filter values & option sets saved.");
	}

	// Restore selected values and update dropdowns
	function restoreSelection(SelectMarmaName, SelectMarmaGRP, SelectBodyRegion, SelectBodySide) {
		function removeEmptyValues(arr) {
			return arr.filter(option => option && option.trim() !== ""); // Remove empty and whitespace-only values
		}

		var savedOptions_Name = removeEmptyValues(JSON.parse(localStorage.getItem("SelectOptions_Name")) || []);
		var savedOptions_GRP = removeEmptyValues(JSON.parse(localStorage.getItem("SelectOptions_GRP")) || []);
		var savedOptions_Region = removeEmptyValues(JSON.parse(localStorage.getItem("SelectOptions_Region")) || []);
		var savedOptions_Side = removeEmptyValues(JSON.parse(localStorage.getItem("SelectOptions_Side")) || []);

		var savedMarmaName = localStorage.getItem("Selected_MarmaName") || "";
		var savedMarmaGRP = localStorage.getItem("Selected_MarmaGRP") || "";
		var savedBodyRegion = localStorage.getItem("Selected_BodyRegion") || "";
		var savedBodySide = localStorage.getItem("Selected_BodySide") || "";

		populateDropdown("filterMarmaNAME", new Set(savedOptions_Name), savedMarmaName);
		populateDropdown("filterMarmaGRP", new Set(savedOptions_GRP), savedMarmaGRP);
		populateDropdown("filterBodyPart", new Set(savedOptions_Region), savedBodyRegion);
		populateDropdown("filterBodySide", new Set(savedOptions_Side), savedBodySide);
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

	console.log("Filter menu:", stateFiltermenue);
	if (stateFiltermenue === 0) {
		//Fetch previously saved options from localStorage
		var savedMarmaName = new Set(JSON.parse(localStorage.getItem("SelectOptions_Name")) || []);
		var savedMarmaGRP = new Set(JSON.parse(localStorage.getItem("SelectOptions_GRP")) || []);
		var savedBodyRegion = new Set(JSON.parse(localStorage.getItem("SelectOptions_Region")) || []);
		var savedBodySide = new Set(JSON.parse(localStorage.getItem("SelectOptions_Side")) || []);

		restoreSelection(savedMarmaName, savedMarmaGRP, savedBodyRegion, savedBodySide);

	} else {
		resetSelectOptions();
	}

	// Apply filter and store selected items
	function applyFilter(marmaID) {
		setQueryParam("filterWindow", 0);
		saveSelection();
		filteredMarmas = filterResults;
		console.log("Filter applied:", filteredMarmas);

		if (filteredMarmas.length > 0) {
			sessionStorage.setItem("marmaID", filteredMarmas[0]);
			if (marmaID){
				sessionStorage.setItem("marmaID", marmaID);
			}
			console.log("Saving filtered Marmalist");
		}
		localStorage.setItem("filteredMarmas", JSON.stringify(filteredMarmas));
		location.reload();
	}

	// Event Listeners
	const filters = ["filterMarmaNAME", "filterMarmaGRP", "filterBodyPart", "filterBodySide"];

	filters.forEach(id => {
		document.getElementById(id).addEventListener("change", () => {
			filterMarmaData(db);
			showCircle(1,"filter-button");
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
  showHintTWO();
}

function closeFilterMenue(withTransition = true) {
  console.log("marma Design: " + marmaDesign);
  if (stateFiltermenue = 1){
	  showHint();
  }
  setQueryParam('filterWindow', 0);
  stateFiltermenue = 0;
  console.log("stateFiltermenue :" + stateFiltermenue);
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
  //document.documentElement.style.setProperty('--bg-color-1', bgColor + "0.90)");
}

//###################################################################################
//change slider values
//###################################################################################		
	
function queryMarma(key) {
    console.log("callMarmaData:", arguments);
    console.log("key:", key);

    // Initialize the database first
    initDB().then(db => {
        // Access the "marmaValueStore" after the database is initialized
        const store = getObjectStore(db, "marmaValueStore", 'readwrite');
        const marmaInfoRequest = store.get(key);

        marmaInfoRequest.onsuccess = function(evt) {
            const record = evt.target.result;
            if (!record) {
                console.error(`No matching record found for key: ${key}`);
                displayActionFailure("No matching record found");
                return;
            }

            // Log the record found
            console.log(key + " FOUND");
            console.log("record:", record);

            // Update the data with new values
            console.log("updating " + key + " ...");
            record.localisation = document.getElementById('localisation').value;
            record.awareness = document.getElementById('awareness').value;
            record.frequency = document.getElementById('frequency').value;

            // Update the record in the store
            const updateReq = store.put(record);

            updateReq.onsuccess = function(evt) {
                console.log("Updated record:", record);
                console.log(key + " UPDATED");
            };

            updateReq.onerror = function(evt) {
                console.error(`Error updating record for key: ${key}`, evt);
            };
        };

        marmaInfoRequest.onerror = function(evt) {
            console.error(`Error retrieving data for key: ${key}`, evt);
        };

    }).catch(error => {
        console.error('Error initializing the database:', error);
    });
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

var InspectorLoaded = 0;
function openBodyInspector() {
  console.log("loading body inspector " + InspectorLoaded)
  console.log("marmaDesign " + marmaDesign)
  console.log("stateFiltermenue :" + stateFiltermenue);
  var key = sessionStorage.getItem("marmaID");
  document.getElementById("3d_Body_Inspector").style.height = "100%";
  if (InspectorLoaded === 0){
	document.getElementById("inspectorFrame").src="../Body/body.html?marmaDesign=" + marmaDesign + "&cameraR=800" + "&key="+ key + "&marmaName=" + marmaName; //
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

document.getElementsByClassName('circle-badge')[0].style.display = 'flex';
document.getElementById("filterHits").innerHTML = filteredMarmas.length;
if (filteredMarmas.length === 1) {
    document.getElementById("pervious").classList.add("hidden");
    document.getElementById("pervious2").classList.add("hidden");
    document.getElementById("next").classList.add("hidden");
}

function nextElement() {
	console.log(filteredMarmas);
	let setMarma = sessionStorage.getItem("marmaID");
	console.log("Current marmaID from sessionStorage:", setMarma);
	
	let myIndex = filteredMarmas.indexOf(setMarma);
	console.log("Current index of marmaID in filteredMarmas:", myIndex);
	
	// Increment index by 1
	myIndex += 1;
	console.log("Next index of marmaID in filteredMarmas:", myIndex);
	
	if (myIndex >= filteredMarmas.length){
		myIndex = 0;
	}
	sessionStorage.setItem("marmaID", filteredMarmas[myIndex]);
	console.log("New marmaID set in sessionStorage:", filteredMarmas[myIndex]);
	console.log("load next...")
	location.reload()
};
	
function previousElement() {
    let setMarma = sessionStorage.getItem("marmaID");
    console.log("Current marmaID from sessionStorage:", setMarma);
    
	let myIndex = filteredMarmas.indexOf(setMarma);
    console.log("Current index of marmaID in filteredMarmas:", myIndex);
	
	// Decrement index by 1
    myIndex -= 1;
	
	console.log("previous")

	if (myIndex < 0){
		myIndex = filteredMarmas.length -1;
	}
	sessionStorage.setItem("marmaID", filteredMarmas[myIndex]);
	console.log("New marmaID set in sessionStorage:", filteredMarmas[myIndex]);
    console.log("load previous...");
	location.reload()
};

document.getElementById("next").addEventListener("click", nextElement);	
document.getElementById("pervious").addEventListener("click", previousElement);
document.getElementById("pervious2").addEventListener("click", previousElement);




