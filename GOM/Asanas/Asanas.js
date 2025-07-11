var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
//var db;
//var data;
var update = 0;
var InspectorLoaded = 0;

const AppState = {
	currentAsanaID: null,
	currentAsanaData: [],
	asanaName: null,
	filteredAsanas: [],
	selects: {
		asanaName: new Set(),
//		marmaGRP: new Set(),
//		bodyRegion: new Set(),
//		bodySide: new Set()
	}
};


const carouselInner = document.querySelector('.carousel-inner');
let startX;
let currentTranslate = 0;
let isDragging = false;
let currentVariant = 0;


//###################################################################################
//fixed values
//###################################################################################	

const positionData = {
    '1': {
        imgSrc: "../resources/asana_icons/white/standing_icon.webp",
        altText: "Stand Asana",
        label: "Stand Asana"
    },
    '2': {
        imgSrc: "../resources/asana_icons/white/sitting_icon.webp",
        altText: "Sitz Asana",
        label: "Sitz Asana"
    },
    '3': {
        imgSrc: "../resources/asana_icons/white/lying_icon.webp",
        altText: "Liege Asana",
        label: "Liege Asana"
    }
};

const levelData = {
    '1': "Anfänger",
    '2': "Geübte",
    '3': "Fortgeschritten"
};


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

let startAsana = getQueryParam('Asana');

//###################################################################################
//retrieve temporary values
//###################################################################################	

console.log("Asanas in memory:", AppState.filteredAsanas);

if (!AppState.currentAsanaID) {
	if (AppState.filteredAsanas.length > 0) {
		AppState.currentAsanaID = AppState.filteredAsanas[0];
		console.log("No asanaID set. Defaulting to first filtered Asana:", AppState.currentAsanaID);
	} else {
		console.warn("No asanaID set and no filtered Asana available.");
	}
} else {
	console.log("Current asanaID in memory:", AppState.currentAsanaID);
}


//###################################################################################
//Store values , retrieve values
//###################################################################################	
function loadAsanaList(db) {
    return new Promise((resolve, reject) => {
        const asanaStore = getObjectStore(db, "asanaStore", "readonly");
        const keysRequest = asanaStore.getAllKeys();

        keysRequest.onsuccess = function(event) {
            resolve(event.target.result); // All keys as an array
        };

        keysRequest.onerror = function(event) {
            reject(event.target.error);
        };
    });
}


function retrieveDataFromStores() {
	console.log("retrieve: " + AppState.currentAsanaID);
	setQueryParam('Asana', AppState.currentAsanaID)
	InspectorLoaded = 0;

	// Access asanaStore
	const asanaStore = getObjectStore(db, "asanaStore", 'readonly');
	const asanaDataRequest = asanaStore.get(AppState.currentAsanaID);
	asanaDataRequest.onsuccess = function(evt) {
		const data = asanaDataRequest.result;
		AppState.currentAsanaData = data;
		console.log(data);
		if (!data) {
			console.error(`No data found for asanaID: ${AppState.currentAsanaID}`);
			return;
		}
		console.log(AppState.currentAsanaID + " FOUND");
		console.log("load and display INFOS of " + AppState.currentAsanaID);

		AppState.asanaName = data.asanaName.sanskrit;
		console.log("name: " + AppState.asanaName);

		// Populate page content
		updateClassElements('AsanaNameSK', AppState.asanaName);
		
		// Populate header
		document.getElementById("headline2").innerHTML = data.asanaName.de;
		document.getElementById("asanaIcon").src = "../resources/asana_icons/asana2d/" + AppState.currentAsanaID + ".webp";
		document.getElementById("description").innerHTML = data.info.description;
		
		// Populate aids
		if (data.aids.block === 0 && data.aids.belt === 0 && data.aids.bolster  === 0 && data.aids.blanket  === 0 && data.aids.chair  === 0 && data.aids.wall  === 0) {
			document.getElementById("aids").style.display = "none";
		} else {
			if (data.aids.block === 0) {document.getElementById("block").style.display = "none" };
			if (data.aids.belt === 0) {document.getElementById("belt").style.display = "none" };
			if (data.aids.bolster === 0) {document.getElementById("bolster").style.display = "none" };
			if (data.aids.blanket === 0) {document.getElementById("blanket").style.display = "none" };
			if (data.aids.chair === 0) {document.getElementById("chair").style.display = "none" };
			if (data.aids.wall === 0) {document.getElementById("wall").style.display = "none" };
		};
		
		// Populate stats
		const position = data.info.position;
		if (positionData[position]) {
			document.getElementById("posIMG").src = positionData[position].imgSrc;
			document.getElementById("posIMG").alt = positionData[position].altText;
			document.getElementById("posLabel").innerHTML = positionData[position].label;
		}
		
		if (data.info.symetric === 1) {
		  document.getElementById("symIMG").src = "../resources/asana_icons/white/noswitch.webp";
		  document.getElementById("symIMG").alt = "kein Seitenwechsel";
		  document.getElementById("symLabel").innerHTML = "kein Seitenwechsel";
		} else {
		  document.getElementById("symIMG").src = "../resources/asana_icons/white/switch.webp";
		  document.getElementById("symIMG").alt = "Seitenwechsel";
		  document.getElementById("symLabel").innerHTML = "Seitenwechsel";
		}

		const level = data.info.level;
		if (levelData[level]) {
			document.getElementById("lvlValue").innerHTML = levelData[level];
		}

		document.getElementById("diffValue").innerHTML = data.info.difficulty;
		
		// Populate instructions
		document.getElementById("instrIn").innerHTML = data.explanation.starting;
		document.getElementById("instrStay").innerHTML = data.explanation.staying;
		document.getElementById("instrOut").innerHTML = data.explanation.ending;
		
		// populate triggers
		const instrTriggerElement = document.getElementById("instrTrigger");
		instrTriggerElement.innerHTML = '';
		const ulElement = document.createElement("ul");
		ulElement.className = "trigger-list";
		const altTextMapping = {
			"feet": "Füße:",
			"legs": "Beine:",
			"pelvis": "Becken:",
			"abdomen torso": "Unterer Rumpf:",
			"chest": "Brustkorb:",
			"back": "Rücken:",
			"shoulders": "Schultern:",
			"arms": "Arme:",
			"hands": "Hände:",
			"neck+head": "Kopf:"
		};

		for (const bodyPart in data.triggers) {
			if (data.triggers[bodyPart] !== "") {
				const liElement = document.createElement("li");

				const imgElement = document.createElement("img");
				imgElement.src = `../resources/asana_icons/white/${bodyPart}.webp`;
				imgElement.alt = altTextMapping[bodyPart];

				liElement.appendChild(imgElement);
				liElement.appendChild(document.createTextNode(` ${data.triggers[bodyPart]}`));
				ulElement.appendChild(liElement);
			}
		}

		instrTriggerElement.appendChild(ulElement);

		// populate additional info
		if (data.relatedAsanas === "" && data.dangers === "" && data.problems === "" && data.info.origin === ""){
			document.getElementById("addInfoSection").style.display = "none";
		}else{
			document.getElementById("addInfoSection").style.display = "initial";
			// populate related Asanas
			if (data.relatedAsanas !== ""){
				document.getElementById("related").innerHTML = data.relatedAsanas;
				document.getElementById("relatedBTN").style.display = "initial";
			} else {
				document.getElementById("relatedBTN").style.display = "none";
			}

			// populate danger
			if (data.dangers !== ""){
				document.getElementById("dangers").innerHTML = data.dangers;
				document.getElementById("dangersBTN").style.display = "initial";
			} else {
				document.getElementById("dangersBTN").style.display = "none";
			}

			// populate problems
			if (data.problems !== ""){
				document.getElementById("problems").innerHTML = data.problems;
				document.getElementById("problemsBTN").style.display = "initial";
			} else {
				console.log (data.problems);
				document.getElementById("problemsBTN").style.display = "none";
			}
			
			// populate name
			if (data.info.origin !== ""){
				document.getElementById("name").innerHTML = data.asanaName.sanskrit + " (" + data.asanaName.de + ")";
				document.getElementById("origin").innerHTML = data.info.origin;
				document.getElementById("synonym").innerHTML = "Synonyme: " + data.asanaName.synonym;
				document.getElementById("nameBTN").style.display = "initial";
			} else {
				console.log (data.problems);
				document.getElementById("nameBTN").style.display = "none";
			}
		}
		// populate variants
		createCarouselItems();
		console.log("display INFOS of " + AppState.currentAsanaID + " DONE");
	};

	asanaDataRequest.onerror = function(evt) {
		console.error(`Error retrieving data for asanaID: ${AppState.currentAsanaID}`, evt);
	};
}



initDB().then(db => {
    console.log("Database initialized for Asana Search");

	if (startAsana) {
		console.log("Parsed Asanas:", startAsana);
		AppState.currentAsanaID = startAsana;
	} else if (!AppState.currentAsanaID || AppState.currentAsanaID === "undefined") {
		console.warn("No asanaID found in memory or it's invalid. Starting up...");

		loadAsanaList(db).then(array => {
			AppState.filteredAsanas = array;
			console.log("All Asanas:", AppState.filteredAsanas);

			document.getElementById("filterHits").innerHTML = AppState.filteredAsanas.length;

			if (AppState.filteredAsanas.length > 0) {
				AppState.currentAsanaID = AppState.filteredAsanas[0];
				console.log("Defaulting to first Asana:", AppState.currentAsanaID);
			} else {
				console.warn("filteredAsanas is empty, no IDs found.");
				AppState.currentAsanaID = "tadasana1";
			}
		}).catch(error => {
			console.error("Error loading data from DB:", error);
		});
	} else {
		console.log("Using existing asanaID from memory:", AppState.currentAsanaID);
	}



	console.log("Filter menu:", stateFiltermenue);
	if (stateFiltermenue === 0 && startAsana) {
		resetSelectOptions();
	} else	if (stateFiltermenue === 0) {
//		restoreSelection();

	} else {
		resetSelectOptions();
	}

	// Event Listeners
	const filters = ["filterAsanaNAME"];
	filters.forEach(id => {
		document.getElementById(id).addEventListener("change", () => {
			filterAsanaData(db);
			showCircle(1,"filter-button", "shrink", "");
		});
	});

	document.getElementById("resetFilter").addEventListener("click", () => {
		resetSelectOptions();
		closeAll();
	});
	document.getElementById("filter-button").addEventListener("click", applyFilter);



	retrieveDataFromStores();




}).catch(error => {
    console.error('Error initializing the database:', error);
});

	//###################################################################################
	//Filtering
	//###################################################################################

	function filterAsanaData(db) {
		asanaStore = getObjectStore(db, "asanaStore", 'readonly');

		// get parsed asana
		if (startAsana) {
			console.log("startAsana from URL:", startAsana);
			let request = asanaStore.get(startAsana);
			request.onsuccess = function (event) {
				let asanaEntry = event.target.result;
				if (asanaEntry) {
					let filteredData = [asanaEntry];
					console.log("Found Asana by ID:", asanaEntry);
					AppState.filteredAsanas  = filteredData.map(asana => asana.id);
					console.log("Filtered IDs:", AppState.filteredAsanas);
					updateSelectOptions(filteredData);
					populateResultTable(filteredData);
					updateHitCounter();
					startAsana = "";
				} else {
					console.warn("No Asana found for startAsana ID:", startAsana);
					applyNextFilters([]); // Proceed with empty data
				}
			};
			return; // Skip the rest of the function
		}

		//get the userinput
		let filterValue_asanaName = document.getElementById("filterAsanaNAME").value;
//		let filterValue_marmaGRP = document.getElementById("filterMarmaGRP").value;
//		let filterValue_bodyRegion = document.getElementById("filterBodyPart").value;
//		let filterValue_bodySide = document.getElementById("filterBodySide").value;

		/** Get Initial Data Based on First Available Filter */
		if (filterValue_asanaName) {
			console.log("Asana selected:",filterValue_asanaName);
			let index = asanaStore.index("asanaNameSK");
			let request = index.getAll(filterValue_asanaName);
			request.onsuccess = function (event) {
				let filteredData = event.target.result;
				applyNextFilters(filteredData);
			};
		} else {
			console.log("No Asana selected");
			let request = asanaStore.getAll();
			request.onsuccess = function (event) {
				let allData = event.target.result;
				applyNextFilters(allData);
			};
		}

		/** Apply Additional Filters in Sequence */
		function applyNextFilters(filteredData) {
/*			console.log("Marma Group:",filterValue_marmaGRP);
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
*/			
			AppState.filteredAsanas = filteredData.map(asana => asana.id);
			console.log("Filtered IDs:", AppState.filteredAsanas );
			
			updateSelectOptions(filteredData); // Final result after all filters applied
			populateResultTable(filteredData);
			updateHitCounter(filteredData);
		}
	}

	//###################################################################################
	//Update Filteroptions
	//###################################################################################

	// Create the options lists after filtering
	function updateSelectOptions(filteredData) {
		const selects = AppState.selects;

		// Clear all sets before adding new values
		selects.asanaName.clear();
//		selects.marmaGRP.clear();
//		selects.bodyRegion.clear();
//		selects.bodySide.clear();

		// Populate sets with values from filteredData
		filteredData.forEach(asana => {
			selects.asanaName.add(asana.asanaName.sanskrit);
//			selects.marmaGRP.add(marma.marmaGrp.de);
//			selects.bodyRegion.add(marma.location.bodyRegion);
//			selects.bodySide.add(marma.location.bodySide);
		});

		// Get current filter values
		const filterValue_asanaName = document.getElementById("filterAsanaNAME").value;
//		const filterValue_marmaGRP = document.getElementById("filterMarmaGRP").value;
//		const filterValue_bodyRegion = document.getElementById("filterBodyPart").value;
//		const filterValue_bodySide = document.getElementById("filterBodySide").value;

		if (filteredData.length > 0) {
			populateDropdown("filterAsanaNAME", selects.asanaName, filterValue_asanaName);
//			populateDropdown("filterMarmaGRP", selects.marmaGRP, filterValue_marmaGRP);
//			populateDropdown("filterBodyPart", selects.bodyRegion, filterValue_bodyRegion);
//			populateDropdown("filterBodySide", selects.bodySide, filterValue_bodySide);
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
			"filterAsanaNAME": "Asana auswählen",
//			"filterMarmaGRP": "Marma Gruppe auswählen",
//			"filterBodyPart": "Körperteil auswählen",
//			"filterBodySide": "Bereich auswählen"
		};

		// If a value is selected, change the default text
		if (storedValue !== "") {
			defaultOptions = {
				"filterAsanaNAME": "Asana zurücksetzen",
//				"filterMarmaGRP": "Marma Gruppe zurücksetzen",
//				"filterBodyPart": "Körperteil zurücksetzen",
//				"filterBodySide": "Seite zurücksetzen"
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
			accordionHeader.textContent = `${filteredData.length} Asana gefunden`;
		} else{
			accordionHeader.textContent = `${filteredData.length} Asanas gefunden`;
		}
	
		// Clear results container
		let resultsContainer = document.getElementById("resultsContainer");
		resultsContainer.innerHTML = "";

		let filteredStorageData = [];

		// Gather all options and create results overview
		filteredData.forEach(asana => {
			// Create a div for each result
			let resultDiv = document.createElement("div");
			resultDiv.classList.add("asana-result");

			// Create icon div
			let iconDiv = document.createElement("div");
			iconDiv.classList.add("resultIcon");
			let iconIMG = document.createElement("img");
			iconIMG.setAttribute("src", "../resources/asana_icons/asana2d/" + asana.id + ".webp");
			iconIMG.setAttribute("alt", "icon of " + asana.asanaName.sanskrit);
			iconDiv.appendChild(iconIMG);

			// Create info container
			let infoContainer = document.createElement("div");
			infoContainer.classList.add("resultInfo-container");

			// Create title div
			let titleDiv = document.createElement("div");
			titleDiv.classList.add("resultTitle");
			titleDiv.textContent = asana.asanaName.title;

			// Create nested info container
			let nestedInfoContainer = document.createElement("div");
			nestedInfoContainer.classList.add("resultInfo-container");

			// Create name div
			let nameDiv = document.createElement("div");
			nameDiv.classList.add("resultName");
			nameDiv.textContent = asana.asanaName.sanskrit;

			// Create stats div
			let statsDiv = document.createElement("div");
			statsDiv.classList.add("resultStats");

			if (positionData[asana.info.position]) {
				let posDiv = document.createElement("div");
				posDiv.classList.add("resultPOS");
				posDiv.textContent = positionData[asana.info.position].label
				statsDiv.appendChild(posDiv);
			}else {
				console.error("Invalid position value: " + asana.asanaName.sanskrit);
			}

			if (levelData[asana.info.level]) {
				let lvlDiv = document.createElement("div");
				lvlDiv.classList.add("resultLVL");
				lvlDiv.textContent = levelData[asana.info.level];
				statsDiv.appendChild(lvlDiv);
			}else {
				console.error("Invalid Level value: " + asana.asanaName.sanskrit);
			}

			// Create aids div
			let aidsDiv = document.createElement("div");
			aidsDiv.classList.add("resultAids");

			// Create belt div with image
			if (asana.aids.belt) {
				let beltDiv = document.createElement("div");
				beltDiv.classList.add("resultBelt");
				let beltIMG = document.createElement("img");
				beltIMG.setAttribute("src", "../resources/asana_icons/white/yoga_belt.webp");
				beltIMG.setAttribute("alt", "Gürtel");
				beltDiv.appendChild(beltIMG);
				aidsDiv.appendChild(beltDiv);
			}

			// Create block div with image
			if (asana.aids.block) {
				let blockDiv = document.createElement("div");
				blockDiv.classList.add("resultBlock");
				let blockIMG = document.createElement("img");
				blockIMG.setAttribute("src", "../resources/asana_icons/white/yoga_blocks.webp");
				blockIMG.setAttribute("alt", "Block");
				blockDiv.appendChild(blockIMG);
				aidsDiv.appendChild(blockDiv);
			}

			// Create blanket div with image
			if (asana.aids.blanket) {
				let blanketDiv = document.createElement("div");
				blanketDiv.classList.add("resultBlanket");
				let blanketIMG = document.createElement("img");
				blanketIMG.setAttribute("src", "../resources/asana_icons/white/yoga_blanket.webp");
				blanketIMG.setAttribute("alt", "Decke");
				blanketDiv.appendChild(blanketIMG);
				aidsDiv.appendChild(blanketDiv);
			}

			// Create chair div with image
			if (asana.aids.chair) {
				let chairDiv = document.createElement("div");
				chairDiv.classList.add("resultChair");
				let chairIMG = document.createElement("img");
				chairIMG.setAttribute("src", "../resources/asana_icons/white/yoga_chair.webp");
				chairIMG.setAttribute("alt", "Stuhl");
				chairDiv.appendChild(chairIMG);
				aidsDiv.appendChild(chairDiv);
			}

			// Create bolster div with image
			if (asana.aids.bolster) {
				let bolsterDiv = document.createElement("div");
				bolsterDiv.classList.add("resultBolster");
				let bolsterIMG = document.createElement("img");
				bolsterIMG.setAttribute("src", "../resources/asana_icons/white/yoga_bolster.webp");
				bolsterIMG.setAttribute("alt", "Rolle");
				bolsterDiv.appendChild(bolsterIMG);
				aidsDiv.appendChild(bolsterDiv);
			}

			// Create wall div with image
			if (asana.aids.wall) {
				let wallDiv = document.createElement("div");
				wallDiv.classList.add("resultWall");
				let wallIMG = document.createElement("img");
				wallIMG.setAttribute("src", "../resources/asana_icons/white/yoga_wall.webp");
				wallIMG.setAttribute("alt", "Wand");
				wallDiv.appendChild(wallIMG);
				aidsDiv.appendChild(wallDiv);
			}

			nestedInfoContainer.appendChild(nameDiv);
			nestedInfoContainer.appendChild(statsDiv);
			nestedInfoContainer.appendChild(aidsDiv);

			infoContainer.appendChild(titleDiv);
			infoContainer.appendChild(nestedInfoContainer);

			// Create button
			let button = document.createElement("button");
			button.classList.add("callAsana");
			button.addEventListener("click", function() {
				if (typeof asana.id === 'string' && asana.id.trim() !== '') {
					applyFilter(asana.id);
					console.log("asanaID:", asana.id);
				} else {
					console.log("Invalid asanaID:", asana.id);
				}
			});

			let buttonImage = document.createElement("img");
			buttonImage.setAttribute("src", "../resources/icons/goto-icon.webp");
			buttonImage.setAttribute("alt", asana.asanaName.sanskrit + " aufrufen");

			button.appendChild(buttonImage);

			resultDiv.appendChild(iconDiv);
			resultDiv.appendChild(infoContainer);
			resultDiv.appendChild(button);

			resultsContainer.appendChild(resultDiv);
		});

	}

	function updateHitCounter(){
		document.getElementById("filterHits").innerHTML = AppState.filteredAsanas .length;
		console.log("Number Hits:", AppState.filteredAsanas .length);
		if (AppState.filteredAsanas .length === 1) {
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
		AppState.selects.asanaName.clear();
//		AppState.selects.marmaGRP.clear();
//		AppState.selects.bodyRegion.clear();
//		AppState.selects.bodySide.clear();

		document.querySelectorAll("#filterAsanaNAME option").forEach(opt => AppState.selects.asanaName.add(opt.value));
//		document.querySelectorAll("#filterMarmaGRP option").forEach(opt => AppState.selects.marmaGRP.add(opt.value));
//		document.querySelectorAll("#filterBodyPart option").forEach(opt => AppState.selects.bodyRegion.add(opt.value));
//		document.querySelectorAll("#filterBodySide option").forEach(opt => AppState.selects.bodySide.add(opt.value));

		console.log("Filter values saved in memory.");
	}

	// Restore selected values and update dropdowns
/*	function restoreSelection() {
		const savedAsanaName = document.getElementById("filterAsanaNAME").value || "";
//		const savedMarmaGRP = document.getElementById("filterMarmaGRP").value || "";
//		const savedBodyRegion = document.getElementById("filterBodyPart").value || "";
//		const savedBodySide = document.getElementById("filterBodySide").value || "";

		populateDropdown("filterAsanaNAME", AppState.selects.asanaName, savedAsanaName);
//		populateDropdown("filterMarmaGRP", AppState.selects.marmaGRP, savedMarmaGRP);
//		populateDropdown("filterBodyPart", AppState.selects.bodyRegion, savedBodyRegion);
//		populateDropdown("filterBodySide", AppState.selects.bodySide, savedBodySide);

		updateHitCounter();
		populateResultTable();
	}
*/
	// Reset filter options
	function resetSelectOptions() {
		document.getElementById("filterAsanaNAME").value = "";
//		document.getElementById("filterMarmaGRP").value = "";
//		document.getElementById("filterBodyPart").value = "";
//		document.getElementById("filterBodySide").value = "";
		console.log("Filter reset...");
		filterAsanaData(db);
	}

	// Apply filter and store selected items
	function applyFilter(asanaID) {
		setQueryParam("filterWindow", 0);
		closeFilterMenue(true);
		saveSelection();
		console.log("Filter applied:", AppState.filteredAsanas);

		if (AppState.filteredAsanas.length > 0) {
			AppState.currentAsanaID = AppState.filteredAsanas[0];
			if (typeof asanaID === 'string' && asanaID.trim() !== '') {
				AppState.currentAsanaID = asanaID;
			}
			console.log("Filtered Asanalist saved to memory");
		}

		// Update UI without reload
		retrieveDataFromStores();
	}



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
  if (stateFiltermenue == 1){
	  showCircle(3,"help","radiate","Hilfe")
  }
  setQueryParam('filterWindow', 0);
  stateFiltermenue = 0;
  console.log("stateFiltermenue: " + stateFiltermenue);
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
//Carousel
//###################################################################################

// Function to update button visibility
function updateButtonVisibility() {
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const carouselItems = document.querySelectorAll('.carousel-item');

    if (currentVariant <= 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
    }

    if (currentVariant >= carouselItems.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
}

// Function to initialize or reinitialize the carousel
function initCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
	
    carouselInner.addEventListener('mousedown', dragStart);
    carouselInner.addEventListener('touchstart', dragStart);

    carouselInner.addEventListener('mousemove', drag);
    carouselInner.addEventListener('touchmove', drag);

    carouselInner.addEventListener('mouseup', dragEnd);
    carouselInner.addEventListener('touchend', dragEnd);

    carouselInner.addEventListener('mouseleave', dragEnd);
	
	prevButton.addEventListener('click', goToPreviousSlide);
    nextButton.addEventListener('click', goToNextSlide);
	
    updateButtonVisibility();

    function dragStart(e) {
        startX = getClientX(e);
        isDragging = true;
        carouselInner.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;
        const x = getClientX(e);
        const walk = (x - startX) * 2; // Adjust the multiplier for sensitivity
        currentTranslate = walk;
        carouselInner.style.transform = `translateX(calc(-${currentVariant * 100}% + ${walk}px))`;
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        carouselInner.style.transition = 'transform 0.5s ease';

        // Determine if the swipe was significant enough to change the slide
        if (Math.abs(currentTranslate) > 50) {
            if (currentTranslate > 0 && currentVariant > 0) {
                // Swipe right: move to the previous slide
                currentVariant--;
            } else if (currentTranslate < 0 && currentVariant < carouselItems.length - 1) {
                // Swipe left: move to the next slide
                currentVariant++;
            }
        }

        // Reset the translate value and snap to the current slide
        currentTranslate = 0;
        carouselInner.style.transform = `translateX(-${currentVariant * 100}%)`;
		updateButtonVisibility();
    }
	
    function goToPreviousSlide() {
        if (currentVariant > 0) {
            currentVariant--;
            carouselInner.style.transform = `translateX(-${currentVariant * 100}%)`;
			updateButtonVisibility();
        }
    }

    function goToNextSlide() {
        if (currentVariant < carouselItems.length - 1) {
            currentVariant++;
            carouselInner.style.transform = `translateX(-${currentVariant * 100}%)`;
			updateButtonVisibility();
        }
    }
	
    function getClientX(e) {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    }
}

// Populate carousel items
function createCarouselItems() {
	// Clear carousel
	carouselInner.innerHTML = "";
	
    const variants = AppState.currentAsanaData.variants.split(','); // Split variants by comma
    console.log("Variants of " + AppState.currentAsanaID + ": ", variants);

    let completedRequests = 0;
    const totalRequests = variants.length;

	if (variants[0] !== ""){
		variants.forEach(variant => {
			try {
				const asanaStore = getObjectStore(db, "asanaStore", 'readonly');
				let asanaDataRequest = asanaStore.get(variant);

				asanaDataRequest.onsuccess = function(evt) {
					const asana = evt.target.result;

					if (!asana) {
						console.error(`Variant not found in asanaStore: ${variant}`);
						return; // Skip the rest of the code for this variant
					}

					console.log(variant);

					// Create a div for each variant
					const carouselItem = document.createElement('div');
					carouselItem.className = 'carousel-item';

					// Create icon div
					let iconDiv = document.createElement("div");
					iconDiv.classList.add("variantIcon");
					let iconIMG = document.createElement("img");
					iconIMG.setAttribute("src", "../resources/asana_icons/asana2d/" + variant + ".webp");
					iconIMG.setAttribute("alt", "icon of " + asana.asanaName.sanskrit);
					iconDiv.appendChild(iconIMG);

					// Create info container
					let infoContainer = document.createElement("div");
					infoContainer.classList.add("variantInfo-container");

					// Create title div
					let titleDiv = document.createElement("h4");
					titleDiv.classList.add("variantTitle");
					titleDiv.textContent = asana.asanaName.title;

					// Create nested info container
					let nestedInfoContainer = document.createElement("div");
					nestedInfoContainer.classList.add("variantInfo-container");

					// Create stats div
					let statsDiv = document.createElement("div");
					statsDiv.classList.add("resultStats");

					// Assuming positionData and levelData are defined somewhere in your code
					if (positionData[asana.info.position]) {
						let posDiv = document.createElement("div");
						posDiv.classList.add("variantPOS");
						posDiv.textContent = positionData[asana.info.position].label;
						statsDiv.appendChild(posDiv);
					} else {
						console.error("Invalid position value: " + asana.asanaName.sanskrit);
					}

					if (levelData[asana.info.level]) {
						let lvlDiv = document.createElement("div");
						lvlDiv.classList.add("variantLVL");
						lvlDiv.textContent = levelData[asana.info.level];
						statsDiv.appendChild(lvlDiv);
					} else {
						console.error("Invalid Level value: " + asana.asanaName.sanskrit);
					}

					// Create aids div
					let aidsDiv = document.createElement("div");
					aidsDiv.classList.add("variantAids");

					// Create belt div with image
					if (asana.aids.belt) {
						let beltDiv = document.createElement("div");
						beltDiv.classList.add("variantBelt");
						let beltIMG = document.createElement("img");
						beltIMG.setAttribute("src", "../resources/asana_icons/white/yoga_belt.webp");
						beltIMG.setAttribute("alt", "Gürtel");
						beltDiv.appendChild(beltIMG);
						aidsDiv.appendChild(beltDiv);
					}

					// Create block div with image
					if (asana.aids.block) {
						let blockDiv = document.createElement("div");
						blockDiv.classList.add("variantBlock");
						let blockIMG = document.createElement("img");
						blockIMG.setAttribute("src", "../resources/asana_icons/white/yoga_blocks.webp");
						blockIMG.setAttribute("alt", "Block");
						blockDiv.appendChild(blockIMG);
						aidsDiv.appendChild(blockDiv);
					}

					// Create blanket div with image
					if (asana.aids.blanket) {
						let blanketDiv = document.createElement("div");
						blanketDiv.classList.add("variantBlanket");
						let blanketIMG = document.createElement("img");
						blanketIMG.setAttribute("src", "../resources/asana_icons/white/yoga_blanket.webp");
						blanketIMG.setAttribute("alt", "Decke");
						blanketDiv.appendChild(blanketIMG);
						aidsDiv.appendChild(blanketDiv);
					}

					// Create chair div with image
					if (asana.aids.chair) {
						let chairDiv = document.createElement("div");
						chairDiv.classList.add("variantChair");
						let chairIMG = document.createElement("img");
						chairIMG.setAttribute("src", "../resources/asana_icons/white/yoga_chair.webp");
						chairIMG.setAttribute("alt", "Stuhl");
						chairDiv.appendChild(chairIMG);
						aidsDiv.appendChild(chairDiv);
					}

					// Create bolster div with image
					if (asana.aids.bolster) {
						let bolsterDiv = document.createElement("div");
						bolsterDiv.classList.add("variantBolster");
						let bolsterIMG = document.createElement("img");
						bolsterIMG.setAttribute("src", "../resources/asana_icons/white/yoga_bolster.webp");
						bolsterIMG.setAttribute("alt", "Rolle");
						bolsterDiv.appendChild(bolsterIMG);
						aidsDiv.appendChild(bolsterDiv);
					}

					// Create wall div with image
					if (asana.aids.wall) {
						let wallDiv = document.createElement("div");
						wallDiv.classList.add("variantWall");
						let wallIMG = document.createElement("img");
						wallIMG.setAttribute("src", "../resources/asana_icons/white/yoga_wall.webp");
						wallIMG.setAttribute("alt", "Wand");
						wallDiv.appendChild(wallIMG);
						aidsDiv.appendChild(wallDiv);
					}

					nestedInfoContainer.appendChild(statsDiv);
					nestedInfoContainer.appendChild(aidsDiv);

					infoContainer.appendChild(titleDiv);
					infoContainer.appendChild(nestedInfoContainer);

					// Create button
					let button = document.createElement("button");
					button.classList.add("callAsana");
					button.addEventListener("click", function() {
						if (typeof asana.id === 'string' && variant.trim() !== '') {
							applyFilter(variant);
							console.log("asanaID:", variant);
						} else {
							console.log("Invalid asanaID:", variant);
						}
					});

					let buttonImage = document.createElement("img");
					buttonImage.setAttribute("src", "../resources/icons/goto-icon.webp");
					buttonImage.setAttribute("alt", asana.asanaName.sanskrit + " aufrufen");

					button.appendChild(buttonImage);

					carouselItem.appendChild(iconDiv);
					carouselItem.appendChild(infoContainer);
					carouselItem.appendChild(button);

					carouselInner.appendChild(carouselItem);

					completedRequests++;
					if (completedRequests === totalRequests) {
						initCarousel();
					}
				};

				asanaDataRequest.onerror = function(evt) {
					console.error(`Error fetching variant ${variant} from asanaStore:`, evt.target.error);
					completedRequests++;
					if (completedRequests === totalRequests) {
						initCarousel();
					}
				};
			} catch (error) {
				console.error(`Error processing variant ${variant}:`, error);
				completedRequests++;
				if (completedRequests === totalRequests) {
					initCarousel();
				}
			}
		});
	}else{
		document.getElementById("variants").style.display = "none";
	};
};



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
  document.getElementById("3d_Body_Inspector").style.height = "100%";
  if (InspectorLoaded === 0){
	document.getElementById("inspectorFrame").src="../Body/body.html"; 
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
	console.log("Current filteredAsanas:", AppState.filteredAsanas);
	let currentAsanaID = AppState.currentAsanaID;
	console.log("Current asanaID in AppState:", currentAsanaID);
	
	let currentIndex = AppState.filteredAsanas.indexOf(currentAsanaID);
	console.log("Current index:", currentIndex);
	
	// Increment index by 1
	currentIndex += 1;
	if (currentIndex >= AppState.filteredAsanas.length) {
		currentIndex = 0; // loop to start
	}
	
	let nextAsanaID = AppState.filteredAsanas[currentIndex];
	AppState.currentAsanaID = nextAsanaID;
	
	console.log("Switched to next asanaID:", nextAsanaID);
	retrieveDataFromStores(); // no reload needed
}

function previousElement() {
    const currentID = AppState.currentAsanaID;
    console.log("Current asanaID from AppState:", currentID);

    const currentIndex = AppState.filteredAsanas.indexOf(currentID);
    console.log("Current index of asanaID in filteredAsanas:", currentIndex);

    // Decrement index
    let newIndex = currentIndex - 1;

    // Wrap around if needed
    if (newIndex < 0) {
        newIndex = AppState.filteredAsanas.length - 1;
    }

    const newAsanaID = AppState.filteredAsanas[newIndex];
    AppState.currentAsanaID = newAsanaID;
    console.log("New asanaID set in AppState:", newAsanaID);

    console.log("Load previous...");
    retrieveDataFromStores();
}


document.getElementById("next").addEventListener("click", nextElement);	
document.getElementById("pervious").addEventListener("click", previousElement);
document.getElementById("pervious2").addEventListener("click", previousElement);
