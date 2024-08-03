var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var db;
var store;
var storeUsaerValue; 
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


// Open (or create) the database
var open = indexedDB.open("marmaDB", 1);
console.log("open Db ...");

//###################################################################################
//Create DB shema
//###################################################################################	
open.onupgradeneeded = function(event) {
	console.log("creating schema ...");
	db = open.result;
	// Check if 'marmaStore' exists
	if (db.objectStoreNames.contains("marmaStore")) {
		console.log("Object store 'marmaStore' already exists!");
		var marmaStore = event.currentTarget.transaction.objectStore("marmaStore");
		//deleting or creating indexes
/*			
		// Display existing indexes before update
		console.log("Existing indexes before update:");
		Array.from(marmaStore.indexNames).forEach(function(indexName) {
			console.log(indexName);
		});

		// remove an index named 'oldIndex'
		if (marmaStore.indexNames.contains("oldIndex")) {
			marmaStore.deleteIndex("oldIndex");
			console.log("Index 'oldIndex' deleted.");
		}

		// Create a new index if it doesn't exist
		if (!marmaStore.indexNames.contains("newIndex")) {
			marmaStore.createIndex("newIndex", "newIndexProperty", { unique: false });
			console.log("Index 'newIndex' created.");
		}

		// Display existing indexes after update
		console.log("Existing indexes after update:");
		Array.from(marmaStore.indexNames).forEach(function(indexName) {
			console.log(indexName);
		});			
*/
		// set update = 1 to update marmaInfo always
		update = 1
	} else {
		console.log("Creating object store 'marmaStore' ...");
		var marmaStore = db.createObjectStore("marmaStore", {keyPath: "id"});
		marmaStore.createIndex('marmaName', ["sanskrit", "de"], { unique: false });
		marmaStore.createIndex('marmaGrp', ["sanskrit", "de"], { unique: false });
		marmaStore.createIndex('location', ["bodyRegion", "anatomy", "height", "explanation"], { unique: false });
		marmaStore.createIndex('info', ["typography", "origin"], { unique: false });
	}
	
	// Check if 'marmaValueStore' exists
	if (db.objectStoreNames.contains("marmaValueStore")) {
		console.log("Object store 'marmaValueStore' already exists!");
		var marmaValueStore = event.currentTarget.transaction.objectStore("marmaValueStore");
	//new indexes go here
	} else {
		console.log("Creating object store 'marmaValueStore' ...");
		var marmaValueStore = db.createObjectStore("marmaValueStore", {keyPath: "id"});
		marmaValueStore.createIndex('localisation', 'localisation', { unique: false });
		marmaValueStore.createIndex('awareness', 'awareness', { unique: false });
		marmaValueStore.createIndex('frequency', 'frequency', { unique: false });
	}
};			

function getObjectStore(store_name, mode) {
	var tx = db.transaction(store_name, mode);
	return tx.objectStore(store_name);
}

open.onsuccess = function() {
	console.log("open DB DONE");
	// Start a new transaction
	db = open.result;
	store = getObjectStore("marmaStore", 'readwrite');

	// Initial data
	const initialMarmaData = [ //in on upgrade needed ziehen ?
{ id: 'kurca_ll', marmaName: {sanskrit: 'kūrca', de: 'Kurcha'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'Zehengrundgelenke', height: '0', explanation: 'kurz vor den Zehengelenkskapseln, vorstellbar wie der Bund enes Reisigbesens'} , info: {typography: 'कूर्च ', origin: 'Bündel, Bündel Gras, Resigbesen'}  },
{ id: 'kurca_rl', marmaName: {sanskrit: 'kūrca', de: 'Kurcha'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'Zehengrundgelenke', height: '0', explanation: 'kurz vor den Zehengelenkskapseln, vorstellbar wie der Bund enes Reisigbesens'} , info: {typography: 'कूर्च ', origin: 'Bündel, Bündel Gras'}  },
{ id: 'kurca_la', marmaName: {sanskrit: 'kūrca', de: 'Kurcha'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Mittelhand', height: '850', explanation: 'kurz vor den Fingergelenkskapseln, vorstellbar wie der Bund enes Reisigbesens'} , info: {typography: 'कूर्च ', origin: 'Bündel, Bündel Gras'}  },
{ id: 'kurca_ra', marmaName: {sanskrit: 'kūrca', de: 'Kurcha'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Mittelhand', height: '850', explanation: 'kurz vor den Fingergelenkskapseln, vorstellbar wie der Bund enes Reisigbesens'} , info: {typography: 'कूर्च ', origin: 'Bündel, Bündel Gras'}  },
{ id: 'kurcaS_ll', marmaName: {sanskrit: 'kūrcaśiras', de: 'Kurcha Sira'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'Fußwurzel', height: '0', explanation: 'an den Fußwurzelknochen und spannt sich wie ein Bogen, vorstellbar wie der Bund enes Reisigbesens'} , info: {typography: 'कूर्चशिरस् ', origin: 'Kūrcaśiras besteht aus kūrca (Bündel) und śiras (der Kopf)'}  },
{ id: 'kurcaS_rl', marmaName: {sanskrit: 'kūrcaśiras', de: 'Kurcha Sira'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'Fußwurzel', height: '0', explanation: 'an den Fußwurzelknochen und spannt sich wie ein Bogen, vorstellbar wie der Bund enes Reisigbesens'} , info: {typography: 'कूर्चशिरस् ', origin: 'Kūrcaśiras besteht aus kūrca (Bündel) und śiras (der Kopf)'}  },
{ id: 'kurcaS_la', marmaName: {sanskrit: 'kūrcaśiras', de: 'Kurcha Sira'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Handwurzel', height: '850', explanation: 'an den Handwurzelknochen und spannt sich wie ein Bogen, vorstellbar wie der Bund enes Reisigbesens'} , info: {typography: 'कूर्चशिरस् ', origin: 'Kūrcaśiras besteht aus kūrca (Bündel) und śiras (der Kopf)'}  },
{ id: 'kurcaS_ra', marmaName: {sanskrit: 'kūrcaśiras', de: 'Kurcha Sira'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Handwurzel', height: '850', explanation: 'an den Handwurzelknochen und spannt sich wie ein Bogen, vorstellbar wie der Bund enes Reisigbesens'} , info: {typography: 'कूर्चशिरस् ', origin: 'Kūrcaśiras besteht aus kūrca (Bündel) und śiras (der Kopf)'}  },
{ id: 'ani_ll', marmaName: {sanskrit: 'āṇi', de: 'Ani'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'linker Oberschenkel', height: '430', explanation: 'an der Bündelung des Quadrizeps, ca. eine Handbreit über dem Knie'} , info: {typography: 'आणि', origin: 'Zapfen der Wagenachse'}  },
{ id: 'ani_rl', marmaName: {sanskrit: 'āṇi', de: 'Ani'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'rechter Oberschenkel', height: '430', explanation: 'an der Bündelung des Quadrizeps, ca. eine Handbreit über dem Knie'} , info: {typography: 'आणि', origin: 'Zapfen der Wagenachse'}  },
{ id: 'ani_la', marmaName: {sanskrit: 'āṇi', de: 'Ani'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'linker Oberarm', height: '1000', explanation: 'an der Bündelung des Triezeps, ca. eine Handbreit über dem Ellenbogen'} , info: {typography: 'आणि', origin: 'Zapfen der Wagenachse'}  },
{ id: 'ani_ra', marmaName: {sanskrit: 'āṇi', de: 'Ani'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'rechter Oberarm', height: '1000', explanation: 'an der Bündelung des Triezeps, ca. eine Handbreit über dem Ellenbogen'} , info: {typography: 'आणि', origin: 'Zapfen der Wagenachse'}  },
{ id: 'kakshadara_l', marmaName: {sanskrit: 'kakṣadhara ', de: 'Kakshadhara'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'linke unterste Rippe bis linke oberste Rippe', height: '1000', explanation: 'an der Körperflanke bis hoch zur obersten Rippe. Vorspellbar wie ein Scherengitter aus Sehnen zwischen den Rippen'} , info: {typography: 'कक्षधर ', origin: ''}  },
{ id: 'kakshadara_r', marmaName: {sanskrit: 'kakṣadhara ', de: 'Kakshadhara'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'rechte unterste Rippe bis rechte oberste Rippe', height: '1000', explanation: 'an der Körperflanke bis hoch zur obersten Rippe. Vorspellbar wie ein Scherengitter aus Sehnen zwischen den Rippen'} , info: {typography: 'कक्षधर ', origin: ''}  },
{ id: 'ksipra_ll', marmaName: {sanskrit: 'kṣipra ', de: 'Ksipra'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'Fußwinkel (zwischen Großer- und Zeigezehe)', height: '0', explanation: 'zwischen Großer- und Zeigezehe'} , info: {typography: 'क्षिप्र ', origin: ''}  },
{ id: 'ksipra_rl', marmaName: {sanskrit: 'kṣipra ', de: 'Ksipra'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'Fußwinkel (zwischen Großer- und Zeigezehe)', height: '0', explanation: 'zwischen Großer- und Zeigezehe'} , info: {typography: 'क्षिप्र ', origin: ''}  },
{ id: 'ksipra_la', marmaName: {sanskrit: 'kṣipra ', de: 'Ksipra'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Handwinkel (zwischen Daumen und Zeigefinger)', height: '850', explanation: 'zwischen Daumen und Zeigefinger'} , info: {typography: 'क्षिप्र ', origin: 'schnell'}  },
{ id: 'ksipra_ra', marmaName: {sanskrit: 'kṣipra ', de: 'Ksipra'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Handwinkel (zwischen Daumen und Zeigefinger)', height: '850', explanation: 'zwischen Daumen und Zeigefinger'} , info: {typography: 'क्षिप्र ', origin: 'schnell'}  },
{ id: 'amsa_la', marmaName: {sanskrit: 'aṃsa', de: 'Amsa'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Schulterdach', height: '1400', explanation: 'am Schulterdach über der Oberarmkugel, an der gedachten Verlängerung des Schlüsselbeins'} , info: {typography: 'अंस', origin: 'Schulter'}  },
{ id: 'amsa_ra', marmaName: {sanskrit: 'aṃsa', de: 'Amsa'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnenmarma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Schulterdach', height: '1400', explanation: 'am Schulterdach über der Oberarmkugel, an der gedachten Verlängerung des Schlüsselbeins'} , info: {typography: 'अंस', origin: 'Schulter'}  },
{ id: 'gulpha_ll', marmaName: {sanskrit: 'gulpha ', de: 'Fußgelenk'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenkmarma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'linkes Fußgelenk', height: '0', explanation: 'im Gelenk zwischen Fuß und Unterschenkel'} , info: {typography: 'गुल्फ ', origin: 'Knöchel oder auch zwei'}  },
{ id: 'gulpha_rl', marmaName: {sanskrit: 'gulpha ', de: 'Fußgelenk'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenkmarma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'rechtes Fußgelenk', height: '0', explanation: 'im Gelenk zwischen Fuß und Unterschenkel'} , info: {typography: 'गुल्फ ', origin: 'Knöchel oder auch zwei'}  },
{ id: 'manibandha_la', marmaName: {sanskrit: 'maṇibandha', de: 'Handgelenk'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenkmarma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'linkes Handgelenk', height: '850', explanation: 'im Gelenk zwischen Hand und Unterarm'} , info: {typography: 'मणिबन्ध ', origin: 'Anlegung von Juwelen (maṇi = juwelen)'}  },
{ id: 'manibandha_ra', marmaName: {sanskrit: 'maṇibandha', de: 'Handgelenk'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenkmarma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'rechtes Handgelenk', height: '850', explanation: 'im Gelenk zwischen Hand und Unterarm'} , info: {typography: 'मणिबन्ध ', origin: 'Anlegung von Juwelen (maṇi = juwelen)'}  },
{ id: 'kukundara_l', marmaName: {sanskrit: 'kukundara', de: 'Hüftgelenk'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenkmarma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'linkes Hüftgelenk', height: '850', explanation: 'im Gelenk zwischen Oberschenkel und Hüftknochen. Querachse zwischen den beiden Punkten links und rechts ca. 3 Finger über dem Rollhügel'} , info: {typography: 'कुकुन्दर', origin: 'Kundara = Höhle, Höhler der Lenden.'}  },
{ id: 'kukundara_r', marmaName: {sanskrit: 'kukundara', de: 'Hüftgelenk'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenkmarma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'rechtes Hüftgelenk', height: '850', explanation: 'im Gelenk zwischen Oberschenkel und Hüftknochen. Querachse zwischen den beiden Punkten links und rechts ca. 3 Finger über dem Rollhügel'} , info: {typography: 'कुकुन्दर', origin: 'Kundara = Höhle, Höhler der Lenden.'}  },
{ id: 'janu_ll', marmaName: {sanskrit: 'jānu', de: 'Kniegelenk'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenkmarma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'linkes Kniegelenk', height: '430', explanation: 'im Gelenk zwischen Oberschenkelknochen und Schien- und Wadenbein'} , info: {typography: 'जानु', origin: ''}  },
{ id: 'janu_rl', marmaName: {sanskrit: 'jānu', de: 'Kniegelenk'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenkmarma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'rechtes Kniegelenk', height: '430', explanation: 'im Gelenk zwischen Oberschenkelknochen und Schien- und Wadenbein'} , info: {typography: 'जानु', origin: ''}  },
{ id: 'kurpara_la', marmaName: {sanskrit: 'kūrpara', de: 'Ellenbogengelenk'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenkmarma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'linker Ellenbogen', height: '1000', explanation: 'im Gelenk zwischen Oberarmknochen und Elle und Speiche'} , info: {typography: 'कूर्पर', origin: ''}  },
{ id: 'kurpara_ra', marmaName: {sanskrit: 'kūrpara', de: 'Ellenbogengelenk'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenkmarma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'rechter Ellenbogen', height: '1000', explanation: 'im Gelenk zwischen Oberarmknochen und Elle und Speiche'} , info: {typography: 'कूर्पर', origin: ''}  },
{ id: 'indravasti_ll', marmaName: {sanskrit: 'indravasti', de: 'Wade'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskelmarma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'Wadenmuskel', height: '100', explanation: 'tiefliegend in der Mitte der Wadenmuskulatur'} , info: {typography: 'इन्द्रवस्ति ', origin: 'Indra = Gottheit, vasti = innewohnen '}  },
{ id: 'indravasti_rl', marmaName: {sanskrit: 'indravasti', de: 'Wade'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskelmarma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'Wadenmuskel', height: '100', explanation: 'tiefliegend in der Mitte der Wadenmuskulatur'} , info: {typography: 'इन्द्रवस्ति ', origin: 'Indra = Gottheit, vasti = innewohnen '}  },
{ id: 'indravasti_la', marmaName: {sanskrit: 'indravasti', de: 'Unterarm'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskelmarma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Unterarmmuskel', height: '890', explanation: 'tiefliegend in der Mitte der Unterarmmuskulatur'} , info: {typography: 'इन्द्रवस्ति ', origin: 'Indra = Gottheit, vasti = innewohnen '}  },
{ id: 'indravasti_ra', marmaName: {sanskrit: 'indravasti', de: 'Unterarm'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskelmarma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Unterarmmuskel', height: '890', explanation: 'tiefliegend in der Mitte der Unterarmmuskulatur'} , info: {typography: 'इन्द्रवस्ति ', origin: 'Indra = Gottheit, vasti = innewohnen '}  },
{ id: 'talahridaya_ll', marmaName: {sanskrit: 'talahṛdaya', de: 'Fußsohle'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskelmarma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'linke Fußsohle', height: '0', explanation: 'in der Fußsohlenmuskulatur. Vorstellbar wie ein weiches Ausbreiten aus der Fußsohlenmitte'} , info: {typography: 'तलहृदय ', origin: 'tala = Oberfläche und hṛdaya =Herz'}  },
{ id: 'talahridaya_rl', marmaName: {sanskrit: 'talahṛdaya', de: 'Fußsohle'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskelmarma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'rechte Fußsohle', height: '0', explanation: 'in der Fußsohlenmuskulatur. Vorstellbar wie ein weiches Ausbreiten aus der Fußsohlenmitte'} , info: {typography: 'तलहृदय ', origin: ''}  },
{ id: 'talahridaya_la', marmaName: {sanskrit: 'talahṛdaya', de: 'Handfläche'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskelmarma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'linke Handfläche', height: '850', explanation: 'in der Handflächenmuskulatur. Vorstellbar wie ein weiches Ausbreiten aus der Handflächenmitte'} , info: {typography: 'तलहृदय ', origin: ''}  },
{ id: 'talahridaya_ra', marmaName: {sanskrit: 'talahṛdaya', de: 'Handfläche'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskelmarma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'rechte Handfläche', height: '850', explanation: 'in der Handflächenmuskulatur. Vorstellbar wie ein weiches Ausbreiten aus der Handflächenmitte'} , info: {typography: 'तलहृदय ', origin: ''}  },
{ id: 'urvi_ll', marmaName: {sanskrit: 'urvī', de: 'Oberschenkelmitte'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'innenseite des linken Beins', height: '500', explanation: 'an der Innenseite des linken Oberschenkels. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberarms'} , info: {typography: 'उर्वी ', origin: 'Land, Erde'}  },
{ id: 'urvi_rl', marmaName: {sanskrit: 'urvī', de: 'Oberschenkelmitte'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'innenseite des rechten Beins', height: '500', explanation: 'an der Innenseite des rechten Oberschenkels. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberarms'} , info: {typography: 'उर्वी ', origin: 'Land, Erde'}  },
{ id: 'bahvi_la', marmaName: {sanskrit: 'bāhvī', de: 'Oberarmmitte'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'innenseite des linken Arms', height: '1120', explanation: 'an der Innenseite des linken Oberarms. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberarms'} , info: {typography: 'बाह्वी', origin: 'Arm'}  },
{ id: 'bahvi_ra', marmaName: {sanskrit: 'bāhvī', de: 'Oberarmmitte'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'innenseite des rechten Arms', height: '1120', explanation: 'an der Innenseite des rechten Oberarms. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberarms'} , info: {typography: 'बाह्वी', origin: 'Arm'}  },
{ id: 'lohitaksha_ll', marmaName: {sanskrit: 'lohitākṣa', de: 'Beinblutflussmarma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'Unterhalb des Leistenwinkels an der Oberschenkelwurzel', height: '700', explanation: 'an der Innenseite des linken Oberschenkelansatzes. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberschenkels'} , info: {typography: 'लोहिताक्ष', origin: 'rotes Auge'}  },
{ id: 'lohitaksha_rl', marmaName: {sanskrit: 'lohitākṣa', de: 'Beinblutflussmarma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'Unterhalb des Leistenwinkels an der Oberschenkelwurzel', height: '700', explanation: 'an der Innenseite des rechten Oberschenkelansatzes. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberschenkels'} , info: {typography: 'लोहिताक्ष', origin: 'rotes Auge'}  },
{ id: 'lohitaksha_la', marmaName: {sanskrit: 'lohitākṣa', de: 'Armblutflussmarma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Unterhalb der Achselhöle an der Oberarmwurzel', height: '1200', explanation: 'an der Innenseite des linken Oberarmansatzes. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberarms'} , info: {typography: 'लोहिताक्ष', origin: 'rotes Auge'}  },
{ id: 'lohitaksha_ra', marmaName: {sanskrit: 'lohitākṣa', de: 'Armblutflussmarma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Unterhalb der Achselhöle an der Oberarmwurzel', height: '1200', explanation: 'an der Innenseite des rechten Oberarmansatzes. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberarms'} , info: {typography: 'लोहिताक्ष', origin: 'rotes Auge'}  },
{ id: 'vitapa_ll', marmaName: {sanskrit: 'viṭapa', de: 'Leiste'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'linke Leistengegend', height: '700', explanation: 'am Übergang zwischen Rumpf und Bein in der Leistengegend, bzw. An der inneren Gesäßfalte über dem Oberschenkel'} , info: {typography: 'विटप', origin: 'Ast oder Zweig'}  },
{ id: 'vitapa_rl', marmaName: {sanskrit: 'viṭapa', de: 'Leiste'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'rechte Leistengegend', height: '700', explanation: 'am Übergang zwischen Rumpf und Bein in der Leistengegend, bzw. An der inneren Gesäßfalte über dem Oberschenkel'} , info: {typography: 'विटप', origin: 'Ast oder Zweig'}  },
{ id: 'stanamula_l', marmaName: {sanskrit: 'stanamūla', de: 'Bruskorpboden'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Torso', bodySide: 'links', anatomy: 'rechter unterer Brustkorp', height: '1080', explanation: 'am linken Rippenbogen, von der seitlichen Spitze der linken untersten Rippe bis zum Brustbein'} , info: {typography: 'स्तनमूल', origin: 'Wurzel der Brust'}  },
{ id: 'stanamula_r', marmaName: {sanskrit: 'stanamūla', de: 'Bruskorpboden'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäßmarma'} , location: {bodyRegion: 'Torso', bodySide: 'rechts', anatomy: 'rechter unterer Brustkorp', height: '1080', explanation: 'am rechten Rippenbogen, von der seitlichen Spitze der rechten untersten Rippe bis zum Brustbein'} , info: {typography: 'स्तनमूल', origin: 'Wurzel der Brust'}  },
{ id: 'nitamba_l', marmaName: {sanskrit: 'nitamba', de: 'Hüftknochen'} , marmaGrp: {sanskrit: 'asthi', de: 'Knochenmarma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'Mitte der linken Beckenschaufel', height: '840', explanation: 'in der Mitte der Beckenschaufen. Vorstellbar wie der Punkt an dem das Becken gleichmäßig aufgerichtet werden kann'} , info: {typography: 'नितम्ब ', origin: 'das Gesäß'}  },
{ id: 'nitamba_r', marmaName: {sanskrit: 'nitamba', de: 'Hüftknochen'} , marmaGrp: {sanskrit: 'asthi', de: 'Knochenmarma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'Mitte der rechten Beckenschaufel', height: '840', explanation: 'in der Mitte der Beckenschaufen. Vorstellbar wie der Punkt an dem das Becken gleichmäßig aufgerichtet werden kann'} , info: {typography: 'नितम्ब ', origin: 'das Gesäß'}  },
{ id: 'amsaphalaka_l', marmaName: {sanskrit: 'aṃsaphalaka', de: 'Schulterblatt'} , marmaGrp: {sanskrit: 'asthi', de: 'Knochenmarma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'Mitte des linken Schulterblatts', height: '1230', explanation: 'in der Mitte des Schulterblatts'} , info: {typography: 'अंसफलक ', origin: 'oberer Teil der Wirbelsäule, Schulterblatt'}  },
{ id: 'amsaphalaka_r', marmaName: {sanskrit: 'aṃsaphalaka', de: 'Schulterblatt'} , marmaGrp: {sanskrit: 'asthi', de: 'Knochenmarma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'Mitte des rechten Schulterblatts', height: '1230', explanation: 'in der Mitte des Schulterblatts'} , info: {typography: 'अंसफलक ', origin: 'oberer Teil der Wirbelsäule, Schulterblatt'}  },
	];

	// Initial Values
	const initialMarmaValues = [ //in on upgrade needed ziehen ?
{ id: 'kurca_ll', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kurca_rl', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kurca_la', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kurca_ra', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kurcaS_ll', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kurcaS_rl', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kurcaS_la', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kurcaS_ra', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'ani_ll', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'ani_rl', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'ani_la', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'ani_ra', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kakshadara_l', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kakshadara_r', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'ksipra_ll', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'ksipra_rl', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'ksipra_la', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'ksipra_ra', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'amsa_la', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'amsa_ra', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'gulpha_ll', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'gulpha_rl', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'manibandha_la', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'manibandha_ra', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kukundara_l', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kukundara_r', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'janu_ll', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'janu_rl', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kurpara_la', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'kurpara_ra', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'indravasti_ll', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'indravasti_rl', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'indravasti_la', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'indravasti_ra', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'talahridaya_ll', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'talahridaya_rl', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'talahridaya_la', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'talahridaya_ra', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'urvi_ll', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'urvi_rl', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'bahvi_la', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'bahvi_ra', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'lohitaksha_ll', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'lohitaksha_rl', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'lohitaksha_la', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'lohitaksha_ra', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'vitapa_ll', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'vitapa_rl', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'stanamula_l', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'stanamula_r', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'nitamba_l', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'nitamba_r', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'amsaphalaka_l', localisation: 0, awareness: 0, frequency: 0 },
{ id: 'amsaphalaka_r', localisation: 0, awareness: 0, frequency: 0 },
	];	

//###################################################################################
//Store values , retrieve values, handle color scema
//###################################################################################	
	// initial DB filling
	// Call the function to add data to Store
	  addDataToStore().then(function() {
		console.log("store DONE.");

		// Call the function to add User Values to Store
		addDataToValueStore().then(function() {
		  console.log("ValueStore DONE.");

		  // set design 
		  retrieveDataFromStores();
		}).catch(function(error) {
		  console.log("Error adding data to ValueStore:", error);
		});
	  }).catch(function(error) {
		console.log("Error adding data to Store:", error);
	  });	
	
	function addDataToStore() {
	  return new Promise(function(resolve, reject) {
		let key = sessionStorage.getItem("marmaID");
		let store = getObjectStore("marmaStore", 'readwrite');
		let marmaInfoRequest = store.get(key);
		marmaInfoRequest.onsuccess = function(evt) {
		  let record = evt.target.result;
		  if (record && update !== 1) {
			// Marma information exists, no need to add
			console.log(key + " already exists, no data added.");
			resolve();
		  } else {
			// Marma information not found, or update --> add it / overrite it
			console.log(key + " NOT FOUND / UPDATE");
			console.log("initial filling DB ...");
			initialMarmaData.forEach((marma, index) => {
				let request = store.put(marma);
				request.onsuccess = (event) => {
					console.log(event.target.result + " initial filling store DONE");
					if (index === initialMarmaData.length - 1) {
					  // Resolve the promise only after all data is added
					  console.log("All data added successfully.");
					  resolve();
					}
				};
				request.onerror = function(event) {
				  reject("Error adding data to Store.");
				};
			});
		  }
		};
		marmaInfoRequest.onerror = function(evt) {
		  reject("Error retrieving marma info.");
		};
	  });
	}

	function addDataToValueStore() {
	  return new Promise(function(resolve, reject) {
		let key = sessionStorage.getItem("marmaID");
		let store = getObjectStore("marmaValueStore", 'readwrite');
		let marmaValueRequest = store.get(key);
		marmaValueRequest.onsuccess = function(evt) {
		  let record = evt.target.result;
		  if (record) {
			// Marma information exists, no need to add
			console.log(key + " already exists, values not resetted.");
			resolve();
		  } else {
			// Marma information not found, add it
			console.log(key + " NOT FOUND");
			console.log("initial filling DB ...");
			initialMarmaValues.forEach((marma, index) => {
				let request = store.put(marma);
				request.onsuccess = (event) => {
					console.log(event.target.result + " initial filling User Values DONE");
					if (index === initialMarmaValues.length - 1) {
					  // Resolve the promise only after all data is added
					  console.log("All initial User Values set successfully.");
					  resolve();
					}
				};
				request.onerror = function(event) {
				  reject("Error adding data to Store.");
				};
			});
		  }
		};
		marmaValueRequest.onerror = function(evt) {
		  reject("Error retrieving marma info.");
		};
	  });
	}

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
}; // close on success

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
open.onerror = function(event) {
	console.error("Error opening database:", event.target.error);
};

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




