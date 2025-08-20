var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var update = 0;

document.addEventListener('DOMContentLoaded', function() {
    const variantCheckbox = document.getElementById('variantCheckbox');
    const aidsFilterContainer = document.getElementById('aidsFilter');
    aidsFilterContainer.classList.toggle('hidden', !variantCheckbox.checked);
});


const AppState = {
    currentAsanaID: null,
    currentAsanaData: [],
	positionFilteredAsanas: [], 
    asanaName: null,
    filteredAsanas: [],
    selects: {
        asanaName: new Set(),
        asanaPosition: new Set(),
    },
    filters: {
        variant: false,
        belt: false,
        block: false,
        roll: false,
        blanket: false,
        chair: false,
        wall: false,
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
				retrieveDataFromStores()
			} else {
				console.warn("filteredAsanas is empty, no IDs found.");
				AppState.currentAsanaID = "adhomukhasvanasana_1";
				retrieveDataFromStores()
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
	const filters = ["filterAsanaNAME","variantCheckbox","filterAsanaPOSITION"];
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

// Helper: Update UI after filtering
function updateUI() {
    const filteredData = AppState.filteredAsanas.map(id =>
        AppState.currentAsanaData.find(asana => asana.id === id)
    );
    updateSelectOptions(filteredData);
    populateResultTable(filteredData);
	recalculateFilterResultsHeight();
    updateHitCounter();
}

function filterByAsanaName(db) {
    AppState.asanaName = document.getElementById("filterAsanaNAME").value;
    const asanaStore = getObjectStore(db, "asanaStore", 'readonly');
    if (AppState.asanaName) {
        asanaStore.index("asanaNameSK").getAll(AppState.asanaName).onsuccess = function(event) {
            AppState.currentAsanaData = event.target.result;
            AppState.filteredAsanas = AppState.currentAsanaData.map(asana => asana.id);
            filterByPosition(db); // Proceed to position filter
        };
    } else {
        asanaStore.getAll().onsuccess = function(event) {
            AppState.currentAsanaData = event.target.result;
            AppState.filteredAsanas = AppState.currentAsanaData.map(asana => asana.id);
            filterByPosition(db); // Proceed to position filter
        };
    }
}

function filterByPosition(db) {
    const position = document.getElementById("filterAsanaPOSITION").value;
    if (position) {
        const asanaStore = getObjectStore(db, "asanaStore", 'readonly');
        asanaStore.index("position").getAll(position).onsuccess = function(event) {
            const positionFiltered = event.target.result;
            AppState.positionFilteredAsanas = positionFiltered.map(asana => asana.id);
            AppState.filteredAsanas = [...AppState.positionFilteredAsanas]; // Reset to position-filtered list
            filterByVariant(); // Proceed to variant filter
        };
    } else {
        // No position filter: use all asanas after name filter
        AppState.positionFilteredAsanas = AppState.currentAsanaData.map(asana => asana.id);
        AppState.filteredAsanas = [...AppState.positionFilteredAsanas]; // Reset to all asanas after name filter
        filterByVariant(); // Proceed to variant filter
    }
}

function filterByVariant() {
    if (!AppState.filters.variant) {
        // Apply variant filter to position-filtered list
        AppState.filteredAsanas = AppState.filteredAsanas.filter(id => id.endsWith('_1'));
        updateUI();
    } else {
        // No variant filter: proceed to aids filter
        filterByAids();
    }
}

function filterByAids() {
    // Start with the position-filtered asanas
    let filtered = [...AppState.currentAsanaData].filter(asana =>
        AppState.positionFilteredAsanas.includes(asana.id)
    );

    // Apply aids filters if not variant
    if (AppState.filters.variant) {
        if (!AppState.filters.belt)   filtered = filtered.filter(asana => asana.aids.belt !== 1);
        if (!AppState.filters.block)  filtered = filtered.filter(asana => asana.aids.block !== 1);
        if (!AppState.filters.roll)   filtered = filtered.filter(asana => asana.aids.roll !== 1);
        if (!AppState.filters.blanket) filtered = filtered.filter(asana => asana.aids.blanket !== 1);
        if (!AppState.filters.chair)  filtered = filtered.filter(asana => asana.aids.chair !== 1);
        if (!AppState.filters.wall)   filtered = filtered.filter(asana => asana.aids.wall !== 1);
    }

    // Update the global state and UI
    AppState.filteredAsanas = filtered.map(asana => asana.id);
    updateUI();
}

function filterAsanaData(db) {
    // Set initial filter states from DOM
    AppState.filters.variant = document.getElementById('variantCheckbox').checked;
    AppState.filters.belt = document.getElementById('beltCheckbox').checked;
    AppState.filters.block = document.getElementById('blockCheckbox').checked;
    AppState.filters.roll = document.getElementById('bolsterCheckbox').checked;
    AppState.filters.blanket = document.getElementById('blanketCheckbox').checked;
    AppState.filters.chair = document.getElementById('chairCheckbox').checked;
    AppState.filters.wall = document.getElementById('wallCheckbox').checked;
    // Start filtering

	if (startAsana) {
		const asanaStore = getObjectStore(db, "asanaStore", 'readonly');
		asanaStore.get(startAsana).onsuccess = function(event) {
			const asanaEntry = event.target.result;
			if (asanaEntry) {
				AppState.currentAsanaData = [asanaEntry];
				AppState.filteredAsanas = [asanaEntry.id];
				updateUI();
				startAsana = "";
			} else {
				console.warn("No Asana found for startAsana ID:", startAsana);
				filterByAsanaName(db);
			}
		};
	} else {
		filterByAsanaName(db);
	}
}

// Asana Name Select Change
document.getElementById('filterAsanaNAME').addEventListener('change', function() {
    filterByAsanaName();
});

// Position Select Change
document.getElementById('filterAsanaPOSITION').addEventListener('change', function() {
    filterByPosition();
});

// Variant Checkbox Change
document.getElementById('variantCheckbox').addEventListener('change', function() {
    AppState.filters.variant = this.checked;
	const aidsFilterContainer = document.getElementById('aidsFilter');
    aidsFilterContainer.classList.toggle('hidden', !this.checked);
	
	const label = document.querySelector('label[for="variantCheckbox"]');
    const span = label.querySelector('span');
    const img = label.querySelector('img');

    if (this.checked) {
        span.textContent = "Varianten ausblenden"; // Change text
        img.src = "..\\resources\\icons\\white\\x-icon.webp"; // Change image
    } else {
        span.textContent = "Varianten einblenden"; // Change text
        img.src = "..\\resources\\knowledge\\white\\check-mark-icon.webp"; // Change image
    }
	filterByVariant();
});

// Aids Checkboxes Change
document.getElementById('beltCheckbox').addEventListener('change', function() {
    AppState.filters.belt = this.checked;
    filterByAids();
});
document.getElementById('blockCheckbox').addEventListener('change', function() {
    AppState.filters.block = this.checked;
    filterByAids();
});
document.getElementById('bolsterCheckbox').addEventListener('change', function() {
    AppState.filters.roll = this.checked;
    filterByAids();
});
document.getElementById('blanketCheckbox').addEventListener('change', function() {
    AppState.filters.blanket = this.checked;
    filterByAids();
});
document.getElementById('chairCheckbox').addEventListener('change', function() {
    AppState.filters.chair = this.checked;
    filterByAids();
});
document.getElementById('wallCheckbox').addEventListener('change', function() {
    AppState.filters.wall = this.checked;
    filterByAids();
});


//###################################################################################
//Update Filteroptions
//###################################################################################

// Create the options lists after filtering
function updateSelectOptions(filteredData) {
	const selects = AppState.selects;

	// Clear all sets before adding new values
	selects.asanaName.clear();
	selects.asanaPosition.clear();

	// Populate sets with values from filteredData
	filteredData.forEach(asana => {
		selects.asanaName.add(asana.asanaName.sanskrit);
		selects.asanaPosition.add(asana.info.position);
	});

	// Get current filter values
	const filterValue_asanaName = document.getElementById("filterAsanaNAME").value;
	const filterValue_asanaPosition = document.getElementById("filterAsanaPOSITION").value;

	if (filteredData.length > 0) {
		populateDropdown("filterAsanaNAME", selects.asanaName, filterValue_asanaName);
		populateDropdown("filterAsanaPOSITION", selects.asanaPosition, filterValue_asanaPosition);
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
		"filterAsanaPOSITION": "Position auswählen",
	};

	// If a value is selected, change the default text
	if (storedValue !== "") {
		defaultOptions = {
			"filterAsanaNAME": "Asana zurücksetzen",
			"filterAsanaPOSITION": "Position zurücksetzen",
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
		
		
		if (selectId === "filterAsanaPOSITION" && positionData[option]) { // set labels for position data
			newOption.text = positionData[option].label;
		} else {
			newOption.text = option; // set lable the same as value
		}
		
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

// Function to recalculate height for the filterResults accordion
function recalculateFilterResultsHeight() {
    const filterResultsAccordion = document.getElementById('filterResults');
    if (filterResultsAccordion.classList.contains('active')) {
        const resultPanel = document.getElementById('resultPanel');
        resultPanel.style.maxHeight = resultPanel.scrollHeight + "px";
    }
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
	AppState.selects.asanaPosition.clear();

	document.querySelectorAll("#filterAsanaNAME option").forEach(opt => AppState.selects.asanaName.add(opt.value));
	document.querySelectorAll("#filterAsanaPOSITION option").forEach(opt => AppState.selects.asanaPosition.add(opt.value));

	console.log("Filter values saved in memory.");
}

// Reset filter options
function resetSelectOptions() {
	document.getElementById("filterAsanaNAME").value = "";
	document.getElementById("filterAsanaPOSITION").value = "";
	console.log("Filter reset...");
	filterAsanaData(db);
}

// Apply filter and store selected items
function applyFilter(asanaID) {
	console.log("scroll")
	window.scrollTo(0, 0);
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
function updateButtonVisibility(carouselElement, validSlidesCount) {
    const prevButton = carouselElement.querySelector('.prev-button');
    const nextButton = carouselElement.querySelector('.next-button');
    const currentSlide = parseInt(carouselElement.getAttribute('data-current-slide')) || 0;

    if (currentSlide <= 0) {
        prevButton.style.visibility = 'hidden';
    } else {
        prevButton.style.visibility = 'visible';
    }

    if (currentSlide >= validSlidesCount - 1) {
        nextButton.style.visibility = 'hidden';
    } else {
        nextButton.style.visibility = 'visible';
    }
}

function initCarousel(carouselElement, validSlidesCount) {
	console.log("Valid Asanas;", validSlidesCount);
	const sectionId = carouselElement.closest('section').id;
	if (!carouselElement || validSlidesCount === 0) {
        console.warn("Carousel element not found or no valid slides for section", sectionId);
		document.getElementById(sectionId).style.display = "none";
        return;
    }
	document.getElementById(sectionId).style.display = "block";
	
    const carouselInner = carouselElement.querySelector('.carousel-inner');
    const prevButton = carouselElement.querySelector('.prev-button');
    const nextButton = carouselElement.querySelector('.next-button');

    let isDragging = false;
    let startX;
    let currentTranslate = 0;
    let currentSlide = 0;

    carouselElement.setAttribute('data-current-slide', currentSlide);

    carouselInner.addEventListener('mousedown', dragStart);
    carouselInner.addEventListener('touchstart', dragStart);
    carouselInner.addEventListener('mousemove', drag);
    carouselInner.addEventListener('touchmove', drag);
    carouselInner.addEventListener('mouseup', dragEnd);
    carouselInner.addEventListener('touchend', dragEnd);
    carouselInner.addEventListener('mouseleave', dragEnd);

    prevButton.addEventListener('click', goToPreviousSlide);
    nextButton.addEventListener('click', goToNextSlide);

    updateButtonVisibility(carouselElement, validSlidesCount);

    function dragStart(e) {
        startX = getClientX(e);
        isDragging = true;
        carouselInner.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;
        const x = getClientX(e);
        const walk = (x - startX) * 2;
        currentTranslate = walk;
        carouselInner.style.transform = `translateX(calc(-${currentSlide * 100}% + ${walk}px))`;
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        carouselInner.style.transition = 'transform 0.5s ease';
        if (Math.abs(currentTranslate) > 50) {
            if (currentTranslate > 0 && currentSlide > 0) {
                currentSlide--;
            } else if (currentTranslate < 0 && currentSlide < validSlidesCount - 1) {
                currentSlide++;
            }
        }
        currentTranslate = 0;
        carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
        carouselElement.setAttribute('data-current-slide', currentSlide);
        updateButtonVisibility(carouselElement, validSlidesCount);
    }

    function goToPreviousSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
            carouselElement.setAttribute('data-current-slide', currentSlide);
            updateButtonVisibility(carouselElement, validSlidesCount);
        }
    }

    function goToNextSlide() {
        if (currentSlide < validSlidesCount - 1) {
            currentSlide++;
            carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
            carouselElement.setAttribute('data-current-slide', currentSlide);
            updateButtonVisibility(carouselElement, validSlidesCount);
        }
    }

    function getClientX(e) {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    }
}

function populateCarouselItems(asanas, carouselInnerElement) {
    let validAsanas = [];

    asanas.forEach(asanaId => {
        if (asanaId !== "") {
            const asanaStore = getObjectStore(db, "asanaStore", 'readonly');
            let asanaDataRequest = asanaStore.get(asanaId);

            asanaDataRequest.onsuccess = function(evt) {
                const asana = evt.target.result;
                if (asana) {
                    validAsanas.push(asanaId);
                    const carouselItem = document.createElement('div');
                    carouselItem.className = 'carousel-item';

                    // Create and append elements to carouselItem as before
                    let iconDiv = document.createElement("div");
                    iconDiv.classList.add("variantIcon");
                    let iconIMG = document.createElement("img");
                    iconIMG.setAttribute("src", "../resources/asana_icons/asana2d/" + asanaId + ".webp");
                    iconIMG.setAttribute("alt", "icon of " + asana.asanaName.sanskrit);
                    iconDiv.appendChild(iconIMG);

                    let infoContainer = document.createElement("div");
                    infoContainer.classList.add("variantInfo-container");

                    let titleDiv = document.createElement("h4");
                    titleDiv.classList.add("variantTitle");
                    titleDiv.textContent = asana.asanaName.title;

                    let nestedInfoContainer = document.createElement("div");
                    nestedInfoContainer.classList.add("variantInfo-container");

                    let statsDiv = document.createElement("div");
                    statsDiv.classList.add("resultStats");

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

                    let button = document.createElement("button");
                    button.classList.add("callAsana");
                    button.addEventListener("click", function() {
                        if (typeof asana.id === 'string' && asanaId.trim() !== '') {
                            applyFilter(asanaId);
                            console.log("asanaID:", asanaId);
                        } else {
                            console.log("Invalid asanaID:", asanaId);
                        }
                    });

                    let buttonImage = document.createElement("img");
                    buttonImage.setAttribute("src", "../resources/icons/goto-icon.webp");
                    buttonImage.setAttribute("alt", asana.asanaName.sanskrit + " aufrufen");
                    button.appendChild(buttonImage);

                    carouselItem.appendChild(iconDiv);
                    carouselItem.appendChild(infoContainer);
                    carouselItem.appendChild(button);
                    carouselInnerElement.appendChild(carouselItem);

                    if (validAsanas.length === asanas.length) {
                        initCarousel(carouselInnerElement.closest('.carousel'), validAsanas.length);
						console.log("Valid Asanas;", validAsanas.length);
                    }
                } else {
                    if (validAsanas.length + 1 === asanas.length) {
                        initCarousel(carouselInnerElement.closest('.carousel'), validAsanas.length);
						console.log("Valid Asanas;", validAsanas.length);
                    }
                }
            };

            asanaDataRequest.onerror = function(evt) {
                console.error(`Error fetching asana ${asanaId} from asanaStore:`, evt.target.error);
                if (validAsanas.length + 1 === asanas.length) {
                    initCarousel(carouselInnerElement.closest('.carousel'), validAsanas.length);
					console.log("Valid Asanas;", validAsanas.length);
                }
            };
        } else {
            if (validAsanas.length + 1 === asanas.length) {
                initCarousel(carouselInnerElement.closest('.carousel'), validAsanas.length);
				console.log("Valid Asanas;", validAsanas.length);
            }
        }
    });
}

function createVariantCarouselItems() {
    console.log("Creating variants...");
    const variants = AppState.currentAsanaData.variants.split(',');
    const variantsCarousel = document.getElementById('variants');
    const carouselInner = document.querySelector('#variants .carousel-inner');
	carouselInner.innerHTML = ""; // Clear carousel
	carouselInner.style.transform = `translateX(0%)`;  // focus first slide
    if (variants[0] !== "") {
        console.log(variants);
        populateCarouselItems(variants, carouselInner);
    } else {
        console.log("No asana variants found");
    }
}

function createRelatedAsanasCarouselItems() {
    console.log("Creating related asanas...");
    const relatedAsanas = AppState.currentAsanaData.relatedAsanas.split(',');
    const relatedAsanasCarousel = document.getElementById('relatedAsanas');
    const carouselInner = document.querySelector('#relatedAsanas .carousel-inner');
	carouselInner.innerHTML = ""; // Clear carousel
	carouselInner.style.transform = `translateX(0%)`;  // focus first slide
    if (relatedAsanas[0] !== "") {
        console.log(relatedAsanas);
        populateCarouselItems(relatedAsanas, carouselInner);
    } else {
        console.log("No related asanas found");
    }
}

function createCarouselItems() {
    createVariantCarouselItems();
    createRelatedAsanasCarouselItems();
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
//Navigation
//###################################################################################		

function nextElement() {
	window.scrollTo({top: 0, behavior: 'smooth'});
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
    window.scrollTo({top: 0, behavior: 'smooth'});
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
