var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var db;
var update = 0;
//const initialAsanaData = []

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("marmaDB", 3); // Update the version as needed
		console.log("Loading Database ...");
const initialAsanaData = [
  {
    "id": "adhomukhasvanasana_1",
    "asanaName": {
      "sanskrit": "adho mukha śvānāsana",
      "de": "Herabschauender Hund",
	  "title": "Herabschauender Hund",
	  "synonym": "adho mukha śvānāsana, Herabschauender Hund"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "4",
      "symetric": 1,
      "description": "Füße und Hände stehen auf dem Boden. Beine, Rumpf und Arme sind gestreckt und stützen in das Becken.",
      "origin": "adho (nach unten) & mukha (Gesicht) & śvāna (Hund) & āsana (Haltung) – अधोमुखश्वानासन"
    },
    "explanation": {
      "starting": "Ausgangsposition ist der Vierfüßlerstand. Arme und Beine sind ca. schulterbreit. Füße sind aufgestellt. Arme sind gestreckt und Ellenbogenspitzen schauen nach außen. Rumpf ist gestreckt. Fußballen bleiben am Boden, während die Beine sich strecken.",
      "staying": "Stützachsen links und rechts über die Handflächen über die Arme zur Schulter und über die Rumpfseite zum Becken. Streckung ohne die Schultern vom Rumpf weg zu schieben. Streckung von den Füßen über die Beine bis hoch zum Becken. Halswirbelsäule und Kopf als Verlängerung des geraden Rumpfes.",
      "ending": "Mit den Füßen Richtung Hände laufen ins Utanasana. Alternativ zurück in den Vierfüßlerstand.",
      "alternatives": "Alternativ kann der Hund von einer stehenden Position aus der Vorbeuge gestartet werden."
    },
    "triggers": {
      "feet": "Füße hüftgelenksbreit, Ferse muss nicht auf dem Boden stehen.",
      "legs": "Beine sind gestreckt, soweit es ohne Zerren möglich ist.",
      "pelvis": "Hüfte wird Richtung Decke gestützt.",
      "abdomen torso": "Flanken stützen.",
      "chest": "Brustkorb breitet sich nach links und rechts aus.",
      "back": "Rücken ist gerade.",
      "shoulders": "Schultern nehmen die Last aus den Armen auf, Schultern werden nicht von der Armstreckung vom Rumpf weggezogen.",
      "arms": "Arme sind gestreckt mit minimaler Beugung in der Armbeuge. Armbeugen schauen zueinander, Ellenbogenspitzen nach außen.",
      "hands": "Last verteilt über die Handfläche.",
      "neck+head": "Hals und Kopf entspannt, gerader Blick nach vorne."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Schmerzende Handgelenke: Hände auf einen Klotz; Einschlafende Arme: Ellenbogenspitzen nach außen, Schultern nicht zu den Armen ziehen. Brustkorb nicht nach vorne fallen lassen; Einschlafende Beine: Beine leicht winkeln; Zerren in den Waden: Fersen anheben, Beine leicht winkeln.",
    "problems": "",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "dandasana_1",
    "asanaName": {
      "sanskrit": "Dandāsana",
      "de": "Stabhaltung",
	  "title": "Dandāsana",
	  "synonym": "Dandāsana, Stabhaltung"
    },
    "info": {
      "position": "2",
      "level": "1",
      "difficulty": "1",
      "symetric": 1,
      "description": "Sitzende Haltung mit gestreckten Beinen und aufrechtem Oberkörper. Die Hände stützen neben den Hüften auf dem Boden.",
      "origin": "Danda = Stock & Āsana = Haltung - दण्डासन"
    },
    "explanation": {
      "starting": "Setze dich auf den Boden und strecke beide Beine nach vorne aus. Die Füße sind hüftbreit auseinander. Lege die Hände neben die Hüften auf den Boden, die Finger zeigen nach vorne. Richte den Oberkörper auf.",
      "staying": "Die Beine bleiben gestreckt und die Füße sind aktiv. Halte den Rücken gerade und lang. Burstkorb und Schultern breiten sich seitlich aus. Arme stützen.",
      "ending": "Löse die Haltung entspannt auf.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Die Füße sind hüftbreit auseinander die Fersen schieben nach vorne, Zehen schauen richtung Decke.",
      "legs": "Die Beine sind gestreckt.",
      "pelvis": "das Becken ist aufgerichtet, die Sitzbeinhöcker sind am Boden.",
      "abdomen torso": "Der Rumpf ist aufrecht und lang gestreckt.",
      "chest": "Der Brustkorb breitet sich nach links und rechts aus und ist nach vorne gerichtet.",
      "back": "Der Rücken ist gerade und lang.",
      "shoulders": "Die Schultern sind entspannt und entspennte ausdehnung nach links und rechts an den Schlüsselbeinen.",
      "arms": "Aktive Arme sind gestreckt und unterstützen die Rupmfstreckung.",
      "hands": "Die Hände liegen flach auf dem Boden, die Finger zeigen nach vorne.",
      "neck+head": "Der Kopf ist aufrecht, Schädeldecke orientiert sich zur Decke, der Blick geht geradeaus."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, den Rücken zu runden. Achte darauf, den Rücken gerade zu halten, um Verletzungen zu vermeiden.",
    "problems": "Bei Rückenproblemen kann ein Kissen unter das Gesäß gelegt werden, um den Rücken zu entlasten.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "janusirsasana_1",
    "asanaName": {
      "sanskrit": "Janu Śīrṣāsana",
      "de": "Kopf-Knie-Haltung",
	  "title": "Janu Śīrṣāsana",
	  "synonym": "Janu Śīrṣāsana, janusirsasana, Kopf-Knie-Haltung"
    },
    "info": {
      "position": "2",
      "level": "1",
      "difficulty": "3",
      "symetric": 0,
      "description": "Sitzende Vorwärtsstreckung mit einem angewinkelten Bein. Der Oberkörper ist nach vorne über das gestreckte Bein gestreckt.",
      "origin": "Janu = Knie & Śīrṣa = Kopf - जानुशीर्षासन"
    },
    "explanation": {
      "starting": "Setze dich auf den Boden und strecke beide Beine nach vorne aus (dandaasana). Drehe das rechte Bein im Hüftgelenk nach außen, beuge das Knie und lege die Fußsohle an die Innenseite des linken Oberschenkels. Strecke den Oberkörper über die Hüftgelenke nach vorne über das linke Bein, halte den Rücken gerade. Greife mit den Händen nach dem linken Fuß oder Schienbein.",
      "staying": "Halte den Rücken gerade und lang. Das linke Bein bleibt gestreckt, das rechte Bein angewinkelt. Die Oberschenkelknochen stützen in das Becken.",
      "ending": "Richte den Oberkörper über die Drehung im Hüftgelenk langsam wieder auf und strecke das rechte Bein aus.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Der linke Fuß ist gestreckt, die rechte Fußsohle liegt an der Innenseite des linken Oberschenkels.",
      "legs": "Das linke Bein ist gestreckt, das rechte Bein ist angewinkelt.",
      "pelvis": "Das Becken ist über die Hüftgelenke nach vorne gedreht.",
      "abdomen torso": "Der Rumpf ist lang gestreckt.",
      "chest": "Der Brustkorb ist entspannt und nicht nach vorne gedrückt.",
      "back": "Der Rücken ist gerade und lang.",
      "shoulders": "Die Schultern sind entspannt und nicht hochgezogen.",
      "arms": "Die Arme sind gestreckt und greifen nach dem linken Fuß oder Schienbein.",
      "hands": "Die Hände umfassen den linken Fuß oder Schienbein.",
      "neck+head": "Der Kopf ist entspannt und hängt nach unten."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Achte darauf, den Rücken gerade zu halten. Die Vorstreckung kommt aus der Bewegung im Hüftgelenk, nicht aus der Beugung des Rumpfes.",
    "problems": "Wenn die Füße mit den Händen nicht erreicht werden können nutze ein Band, um die Hände zu unterstützen. Wenn es auf der Innenseite des angewinkelten Beins zerrt nutze Decken oder Klötze um es zu unterstützen. Bei Schwindelgefühl langsam aus der Position kommen.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "marichyasana_I_1",
    "asanaName": {
      "sanskrit": "Marīcyāsana I",
      "de": "Sitz des Weisen Marichi",
      "title": "Marīcyāsana I",
	  "synonym": "Marīcyāsana I, marichyasana I, Sitz des Weisen Marichi"
    },
    "info": {
      "position": "2",
      "level": "1",
      "difficulty": "3",
      "symetric": 0,
      "description": "Sitzende Vorstreckung mit einem angewinkelten Bein. Der Oberkörper streckt sich am aufgestellten gewinkelten Bein über das gestreckte Bein nach vorne. Die Arme umschlingen den Oberkörper und das angewinkelte Bein. Hände sind hinter dem Rücken verschränkt. ",
      "origin": "Marīci = Name eines Weisen & Āsana = Haltung - मरीच्यासन"
    },
    "explanation": {
      "starting": "Setze dich auf den Boden und strecke beide Beine nach vorne aus (dandaasana). Beuge das rechte Knie und stelle den rechten Fuß neben das linke Knie. Streke den Oberkörper über die Hüftgelenksdrehung nach vorne. Der Rechnte Arm geht außen am rechten, aufgestellten bein  vorbei und fasst hinter dem Rücken das Handgelenk des linken Arms.",
      "staying": "Halte den Rücken gerade und lang. Das rechte Bein bleibt angewinkelt, das linke Bein gestreckt. Der Oberkörper streckt sich über das gestreckte Bein.",
      "ending": "Löse die Umfassung mit den Armen auf und komme langsam mit dem Oberkörper wieder nach oben. Strecke das gewinkelte wieder Bein aus.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Der linke Fuß ist gestreckt, der rechte Fuß steht neben dem linken Knie.",
      "legs": "Das linke Bein ist gestreckt, das rechte Bein ist angewinkelt.",
      "pelvis": "Das Becken ist stabil an den Sitzbeinhöcker am Boden verankert.",
      "abdomen torso": "Der Rumpf lang gestreckt.",
      "chest": "Der Brustkorb ist weit und entspannt, kein Druck nach vorne ins Brustbein.",
      "back": "Der Rücken ist lang.",
      "shoulders": "Die Schultern sind entspannt.",
      "arms": "Der Linke Arm greift hinter den Rücken. Der rechte Arm greift um das rechte gewinkelte Bein nach hinten zum linken Arm.",
      "hands": "Die linke Hand und rechte Hand verschrenken sich hinter dem Rücken, oder halten sich am Handgelenk.",
      "neck+head": "Der Kopf ist zum Knie des gestreckten Beines gerichtet."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, den Rücken zu runden. Achte darauf, den Rücken gerade zu halten. Vermeide es mit Armkraft dich gewaltsam in die Vorstreckung zu drücken.",
    "problems": "Wenn die Vorstreckung nicht reicht um das gewinkelte Bein zu Umfassen versuche eine andere Variante.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "marichyasana_III_1",
    "asanaName": {
      "sanskrit": "Marīcyāsana III",
      "de": "Sitz des Weisen Marichi",
      "title": "Marīcyāsana III",
	  "synonym": "Marīcyāsana III, marichyasana I, Sitz des Weisen Marichi"
    },
    "info": {
      "position": "2",
      "level": "1",
      "difficulty": "3",
      "symetric": 0,
      "description": "Sitzende Drehung mit einem angewinkelten Bein. Der Oberkörper ist zur Seite gedreht, ein Arm umschlingt das angewinkelte Bein von vorne.",
      "origin": "Marīci = Name eines Weisen & Āsana = Haltung - मरीच्यासन"
    },
    "explanation": {
      "starting": "Setze dich auf den Boden und strecke beide Beine nach vorne aus (dandaasana). Beuge das rechte Knie und stelle den rechten Fuß neben das linke Knie. Drehe den Oberkörper nach rechts und umschlinge das rechte Bein mit dem linken Arm von vorne. Fasse die Handgelenke hinter dem Rücken.",
      "staying": "Halte den Rücken gerade und lang. Drehe den Oberkörper weiter. Das rechte Bein bleibt angewinkelt, das linke Bein gestreckt.",
      "ending": "Löse die Drehung langsam und strecke das rechte Bein aus.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Der linke Fuß ist gestreckt, der rechte Fuß steht neben dem linken Knie.",
      "legs": "Das linke Bein ist gestreckt, das rechte Bein ist angewinkelt.",
      "pelvis": "Das Becken ist stabil an den Sitzbeinhöcker am Boden verankert.",
      "abdomen torso": "Der Rumpf lang gestreckt.",
      "chest": "Der Brustkorb ist weit und entspannt, kein Druck nach vorne ins Brustbein.",
      "back": "Der Rücken ist lang und dreht sich nach außen zum gewinkelten Bein.",
      "shoulders": "Die Schultern sind entspannt.",
      "arms": "Der linke Arm umschlingt das rechte Bein, der rechte Arm greift hinter den Rumpf.",
      "hands": "Linke und rechte Hand bekommen sich hinter dem Rücken zu fassen.",
      "neck+head": "Der Kopf ist gedreht und schaut über die rechte Schulter."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, den Rücken zu runden. Achte darauf, den Rücken gerade zu halten. Führe die Drehung langsam und aufgewärmt aus. Vermeide es mit Armkraft dich gewaltsam in die Drehung zu drücken oder zu ziehen.",
    "problems": "Die Drehung nur soweit ausführen wie es ohne Zerren möglich ist, variiere wie du das aufgestellte Bein umfasst.",
    "contraindications": "",
    "variants": "marichyasana_III_1,marichyasana_III_2,marichyasana_III_3,marichyasana_III_4",
    "relatedAsanas": ""
  },
  {
    "id": "marichyasana_III_2",
    "asanaName": {
      "sanskrit": "Marīcyāsana III",
      "de": "Sitz des Weisen Marichi",
      "title": "Marīcyāsana III mit Armstütze",
	  "synonym": "Marīcyāsana III, marichyasana I, Sitz des Weisen Marichi"
    },
    "info": {
      "position": "2",
      "level": "1",
      "difficulty": "3",
      "symetric": 0,
      "description": "Sitzende Drehung mit einem angewinkelten Bein. Der Oberkörper ist zur Seite gedreht, ein Arm umschlingt das angewinkelte Bein.",
      "origin": "Marīci = Name eines Weisen & Āsana = Haltung - मरीच्यासन"
    },
    "explanation": {
      "starting": "Setze dich auf den Boden und strecke beide Beine nach vorne aus (dandaasana). Beuge das rechte Knie und stelle den rechten Fuß neben das linke Knie. Drehe den Oberkörper nach rechts und umschlinge das rechte Bein mit dem linken Arm. Lege die rechte Hand hinter dem Rücken auf den Boden.",
      "staying": "Halte den Rücken gerade und lang. Drehe den Oberkörper weiter. Das rechte Bein bleibt angewinkelt, das linke Bein gestreckt.",
      "ending": "Löse die Drehung langsam und strecke das rechte Bein aus.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Der linke Fuß ist gestreckt, der rechte Fuß steht neben dem linken Knie.",
      "legs": "Das linke Bein ist gestreckt, das rechte Bein ist angewinkelt.",
      "pelvis": "Das Becken ist stabil an den Sitzbeinhöcker am Boden verankert.",
      "abdomen torso": "Der Rumpf lang gestreckt.",
      "chest": "Der Brustkorb ist weit und entspannt, kein Druck nach vorne ins Brustbein.",
      "back": "Der Rücken ist lang und dreht sich nach außen zum gewinkelten Bein.",
      "shoulders": "Die Schultern sind entspannt.",
      "arms": "Der linke Arm umschlingt das rechte Bein, der rechte Arm stützt den Rumpf.",
      "hands": "Die linke Hand umfasst das rechte Knie oder den Oberschenkel, die rechte Hand liegt hinter dem Rücken flach auf dem Boden.",
      "neck+head": "Der Kopf ist gedreht und schaut über die rechte Schulter."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, den Rücken zu runden. Achte darauf, den Rücken gerade zu halten. Führe die Drehung langsam und aufgewärmt aus. Vermeide es mit Armkraft dich gewaltsam in die Drehung zu drücken oder zu ziehen.",
    "problems": "Die Drehung nur soweit ausführen wie es ohne Zerren möglich ist, variiere wie du das aufgestellte Bein umfasst.",
    "contraindications": "",
    "variants": "marichyasana_III_1,marichyasana_III_2,marichyasana_III_3,marichyasana_III_4",
    "relatedAsanas": ""
  },
  {
    "id": "marichyasana_III_3",
    "asanaName": {
      "sanskrit": "Marīcyāsana III",
      "de": "Sitz des Weisen Marichi",
      "title": "Marīcyāsana III Halbedrehung",
	  "synonym": "Marīcyāsana III, marichyasana I, Sitz des Weisen Marichi"
    },
    "info": {
      "position": "2",
      "level": "1",
      "difficulty": "3",
      "symetric": 0,
      "description": "Sitzende Drehung mit einem angewinkelten Bein. Der Oberkörper ist zur Seite gedreht, die Außenseite des Linken Ellenbogens stützt an die Außenseite des angewinkelten Beins.",
      "origin": "Marīci = Name eines Weisen & Āsana = Haltung - मरीच्यासन"
    },
    "explanation": {
      "starting": "Setze dich auf den Boden und strecke beide Beine nach vorne aus (dandaasana). Beuge das rechte Knie und stelle den rechten Fuß neben das linke Knie. Drehe den Oberkörper nach rechts. Der Ellenbogen des Gewinkelten rechten Arms stütz zur Ausenseite des augestellten rechten Oberschenkels. Lege die rechte Hand hinter dem Rücken auf den Boden.",
      "staying": "Halte den Rücken gerade und lang. Drehe den Oberkörper weiter. Das rechte Bein bleibt angewinkelt, das linke Bein gestreckt. Je nach Spielraum kannst du die Drehung versterken indem du mit dem Oberarm entlang des Aufgestellten Beins nach vorne rutschst.",
      "ending": "Löse die Drehung langsam und strecke das rechte Bein aus.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Der linke Fuß ist gestreckt, der rechte Fuß steht neben dem linken Knie.",
      "legs": "Das linke Bein ist gestreckt, das rechte Bein ist angewinkelt.",
      "pelvis": "Das Becken ist stabil an den Sitzbeinhöcker am Boden verankert.",
      "abdomen torso": "Der Rumpf lang gestreckt.",
      "chest": "Der Brustkorb ist weit und entspannt, kein Druck nach vorne ins Brustbein.",
      "back": "Der Rücken ist lang und dreht sich nach außen zum gewinkelten Bein.",
      "shoulders": "Die Schultern sind entspannt. Linker Arm und Brustkorb bilden ungefähr einen rechten Winkel.",
      "arms": "Der linke Arm stützt gegen die Außenseite des Rechten Beins. Der rechte Arm stützt den Rumpf.",
      "hands": "Linker arm ist im rechten Winkel, die linke Hand zeigt zur Decke. Die rechte Hand liegt hinter dem Rücken flach auf dem Boden.",
      "neck+head": "Der Kopf ist gedreht und schaut über die rechte Schulter."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, den Rücken zu runden. Achte darauf, den Rücken gerade zu halten. Führe die Drehung langsam und aufgewärmt aus. Vermeide es mit Armkraft dich gewaltsam in die Drehung zu drücken oder zu ziehen.",
    "problems": "Die Drehung nur soweit ausführen wie es ohne Zerren möglich ist, achte hier auch auf deine Schulter. Variiere wie du das aufgestellte Bein umfasst.",
    "contraindications": "",
    "variants": "marichyasana_III_1,marichyasana_III_2,marichyasana_III_3,marichyasana_III_4",
    "relatedAsanas": ""
  },
  {
    "id": "marichyasana_III_4",
    "asanaName": {
      "sanskrit": "Marīcyāsana III",
      "de": "Sitz des Weisen Marichi",
      "title": "Marīcyāsana III Vierteldrehung",
	  "synonym": "Marīcyāsana III, marichyasana I, Sitz des Weisen Marichi"
    },
    "info": {
      "position": "2",
      "level": "1",
      "difficulty": "3",
      "symetric": 0,
      "description": "Sitzende Drehung mit einem angewinkelten Bein. Der Oberkörper ist zur Seite gedreht, eine Hand greift an das angewinkelte Bein.",
      "origin": "Marīci = Name eines Weisen & Āsana = Haltung - मरीच्यासन"
    },
    "explanation": {
      "starting": "Setze dich auf den Boden und strecke beide Beine nach vorne aus (dandaasana). Beuge das rechte Knie und stelle den rechten Fuß neben das linke Knie. Drehe den Oberkörper nach rechts und greife das rechte Schienbein mit Links. Lege die rechte Hand hinter dem Rücken auf den Boden.",
      "staying": "Halte den Rücken gerade und lang. Drehe den Oberkörper weiter. Das rechte Bein bleibt angewinkelt, das linke Bein gestreckt. Je nach Spielraum kannst du das Schienbein des aufgestellten Beins greifen, oder wenn mehr Drehung im Oberkörper möglich, das Schienbein mit der Armbeuge umfassen.",
      "ending": "Löse die Drehung langsam und strecke das rechte Bein aus.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Der linke Fuß ist gestreckt, der rechte Fuß steht neben dem linken Knie.",
      "legs": "Das linke Bein ist gestreckt, das rechte Bein ist angewinkelt.",
      "pelvis": "Das Becken ist stabil an den Sitzbeinhöcker am Boden verankert.",
      "abdomen torso": "Der Rumpf lang gestreckt.",
      "chest": "Der Brustkorb ist weit und entspannt, kein Druck nach vorne ins Brustbein.",
      "back": "Der Rücken ist lang und dreht sich nach außen zum gewinkelten Bein.",
      "shoulders": "Die Schultern sind entspannt.",
      "arms": "Der linke Arm greift zum rechten Schienbein oder umfasst es mit der Armbeuge. Der rechte Arm stützt den Rumpf.",
      "hands": "Die linke Hand umfasst das rechte Knie oder den Oberschenkel, die rechte Hand liegt hinter dem Rücken flach auf dem Boden.",
      "neck+head": "Der Kopf ist gedreht und schaut über die rechte Schulter."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, den Rücken zu runden. Achte darauf, den Rücken gerade zu halten. Führe die Drehung langsam und aufgewärmt aus. Vermeide es mit Armkraft dich gewaltsam in die Drehung zu drücken oder zu ziehen.",
    "problems": "Die Drehung nur soweit ausführen wie es ohne Zerren möglich ist, variiere wie du das aufgestellte Bein umfasst.",
    "contraindications": "",
    "variants": "marichyasana_III_1,marichyasana_III_2,marichyasana_III_3,marichyasana_III_4",
    "relatedAsanas": ""
  },
  {
    "id": "parsvauttanasana_1",
    "asanaName": {
      "sanskrit": "Pārśvauttānaāsana / Pārśvottānāsana",
      "de": "Flankenstreckhaltung",
	  "title": "Pārśvauttānaāsana",
	  "synonym": "Pārśvauttānaāsana, Parsvauttanasana, Pārśvottānāsana, Parsvottanasana, Flankenstreckhaltung"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "3",
      "symetric": 0,
      "description": "Ausfallschritt mit nach vorne gestrecktem Oberkörper. Die Hände greifen den vorderen Fuß oder den großen Zeh.",
      "origin": "Pārśva = Seite & Uttāna = gestreckt - पार्श्वोत्तानासन"
    },
    "explanation": {
      "starting": "Starte im Tadasana. Mache einen großen Schritt mit dem rechten Fuß nach vorne und drehe den linken Fuß leicht nach außen. Strecke den Oberkörper nach vorne über das Hüftgelenk des vorderen Beins, halte den Rücken gerade. Greife mit den Händen den vorderen Fuß oder den großen Zeh.",
      "staying": "Halte den Rücken gerade und lang. Das vordere Bein bleibt gestreckt, das hintere Bein kann leicht gebeugt sein.",
      "ending": "Richte den Oberkörper mit einer Drehung über das rechte Hüftgelenk langsam wieder auf und bringe die Beine zurück in die Ausgangsposition.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Der vordere Fuß zeigt nach vorne, der hintere Fuß ist leicht nach außen gedreht.",
      "legs": "Das vordere Bein ist gestreckt, das hintere Bein kann leicht gebeugt sein.",
      "pelvis": "Das Becken ist über die Hüftgelenke nach vorne gedreht.",
      "abdomen torso": "Der Rumpf ist lang gestreckt.",
      "chest": "Der Brustkorb ist entspannt und fällt nicht nach vorne.",
      "back": "Der Rücken ist gerade und lang.",
      "shoulders": "Die Schultern sind entspannt und nicht hochgezogen.",
      "arms": "Die Arme sind gestreckt und greifen den vorderen Fuß oder den großen Zeh",
      "hands": "Die Hände umfassen den vorderen Fuß oder den großen Zeh",
      "neck+head": "Der Kopf ist in verlängerung des Rumpfes gehalten."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, die Knie durchzustrecken und in den Kniekehlen zu lehnen, eine leichte Beugung ist besser als Druck im Kniegelenk. Achte darauf, den Rücken gerade zu halten. Die Vorstreckung kommt aus der Bewegung im Hüftgelenk, nicht aus der Beugung des Rumpfes.",
    "problems": "Bei Zerren in den Waden Beine leicht winkeln und mit dem Rumpf weniger tief gehen. Benutze Arme und Hilfsmittel um den Oberkörper zu stützen. Bei Schwindelgefühl langsam mit dem Oberkörper nach oben aus der Position kommen.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "paschimottanasana_1",
    "asanaName": {
      "sanskrit": "Paścimottānāsana",
      "de": "Vorwärtsbeuge im Sitzen",
	  "title": "Paścimottānāsana",
	  "synonym": "Paścimottānāsana, Paschimottanasana, Vorwärtsbeuge"
    },
    "info": {
      "position": "2",
      "level": "1",
      "difficulty": "3",
      "symetric": 1,
      "description": "Sitzende Vorwärtsstreckung mit gestreckten Beinen. Der Oberkörper ist nach vorne gestreckt, die Hände greifen die Füße oder Schienbeine.",
      "origin": "Paścima = Westen (hinterer Teil des Körpers) & Uttāna = intensive Dehnung & Āsana = Haltung - पश्चिमोत्तानासन"
    },
    "explanation": {
      "starting": "Setze dich auf den Boden und strecke beide Beine nach vorne aus (dandasana). Die Füße sind hüftbreit auseinander. Drehe den Oberkörper über die Hüftgelenke nach vorne, halte den Rücken gerade. Greife mit den Händen nach den Füßen oder Schienbeinen.",
      "staying": "Halte den Rücken gerade und lang. Die Beine bleiben gestreckt.",
      "ending": "Richte den Oberkörper über die Hüftgelenksdrehung langsam wieder auf und komme zurück in eine aufrechte Sitzposition.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Die Füße sind hüftbreit auseinander die Fersen schieben nach vorne, Zehen schauen richtung Decke.",
      "legs": "Die Beine sind gestreckt.",
      "pelvis": "Das Becken ist über die Hüftgelenke nach vorne gedreht.",
      "abdomen torso": "Der Rumpf ist lang gestreckt.",
      "chest": "Der Brustkorb ist entspannt und nicht nach vorne gedrückt.",
      "back": "Der Rücken ist gerade und lang.",
      "shoulders": "Die Schultern sind entspannt und werden nicht richtung Füße gezogen.",
      "arms": "Die Arme sind gestreckt und greifen nach den Füßen oder Schienbeinen.",
      "hands": "Die Hände umfassen die Füße oder Schienbeine.",
      "neck+head": "Der Kopf hängt entspannt nach unten."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Achte darauf, den Rücken gerade zu halten. Die Vorstreckung kommt aus der Bewegung im Hüftgelenk, nicht aus der Beugung des Rumpfes.",
    "problems": "Bei steifen Beinen oder Rücken kann ein Gurt verwendet werden, um die Hände zu unterstützen. Bei Schwindelgefühl langsam aus der Position kommen.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "pavanmuktasana_1",
    "asanaName": {
      "sanskrit": "Pāvana Muktāsana",
      "de": "Wind-befreiende Haltung",
	  "title": "Pāvana Muktāsana",
	  "synonym": "Pāvana Muktāsana, Pavanmuktasana, Wind-befreiende Haltung"
    },
    "info": {
      "position": "3",
      "level": "1",
      "difficulty": "2",
      "symetric": 1,
      "description": "Liegende Haltung, bei der ein Knie zur Brust gezogen wird, während das andere Bein gestreckt bleibt. Diese Haltung hilft, Blähungen zu lindern.",
      "origin": "Pāvana = Wind & Muktā = befreien & Āsana = Haltung - पावनमुक्तासन"
    },
    "explanation": {
      "starting": "Lege dich auf den Rücken. Beuge nacheinander die Knie und ziehe sieh sanft zur Brust. Halte die Knie mit beiden Händen oder umfasse das Schienbein.",
      "staying": "Halte die Knie fest. Entspanne den Rücken, die Schultern und den Nacken.",
      "ending": "Lasse die Beine nacheinander langsam zurück auf den Boden gleiten.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Füße sind entspannt.",
      "legs": "Die Beine sind angewinkelt und sanft zur Brust gezogen.",
      "pelvis": "Die Beckenschaufeln liegen am Boden. ",
      "abdomen torso": "Der Rumpf liegt flach auf dem Boden.",
      "chest": "Der Brustkorb ist entspannt.",
      "back": "Der Rücken liegt flach auf dem Boden.",
      "shoulders": "Die Schultern sind entspannt und liegen auf dem Boden.",
      "arms": "",
      "hands": "Die Hände umfassen das jeweilige Knie oder Schienbein.",
      "neck+head": "Der Kopf liegt entspannt auf dem Boden, der Blick geht zur Decke."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, das Knie zu stark zur Brust zu ziehen. Achte darauf, den Rücken flach auf dem Boden zu halten.",
    "problems": "Bei Rückenproblemen kann ein Kissen unter den Kopf gelegt werden, um den Nacken zu entlasten.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "prasaritapadottanasana_1",
    "asanaName": {
      "sanskrit": "Prasārita Pādottānāsana",
      "de": "Weitbeinige Vorwärtsstreckung",
	  "title": "Prasārita Pādottānāsana",
	  "synonym": "Prasārita Pādottānāsana, Prasaritapadottanasana, Weitbeinige Vorwärtsstreckung"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "2",
      "symetric": 1,
      "description": "Weitbeiniger Stand mit nach vorne / unten gestrecktem Oberkörper. Die Hände greifen die großen Zehen oder die Füße.",
      "origin": "Prasārita = weit auseinander / ausgebreitet & Pāda = Fuß & Uttān = gestreckt - प्रसारितपादोत्तानासन "
    },
    "explanation": {
      "starting": "Starte im Tadasana. Schere die Beine weit auseinander. Strecke den Oberkörper über die Hüftgelenke nach vorne, halte den Rücken gerade. Je nach Spielraum an den Hüftgelenken kann der Rumpf über die Hüftgelenksdrehung tiefer sinken. Greife mit den Händen die großen Zehen oder die Füße.",
      "staying": "Halte den Rücken gerade und lang, der Brustkorb fällt nicht nach vorne. Die Beine bleiben gestreckt und in einer Achse mit dem Hüftgelenk. Fersen stempeln in den Boden.",
      "ending": "Richte den Oberkörper über die Drehung im Hüftgelenk langsam wieder auf und bringe die Beine zurück in die Ausgangsposition.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Die Füße sind parallel zueinander und weit auseinander.",
      "legs": "Die Beine sind gestreckt.",
      "pelvis": "Das Becken ist über die Hüftgelenke nach vorne gedreht.",
      "abdomen torso": "Der Rumpf lang gestreckt.",
      "chest": "Der Brustkorb ist entspannt und fällt nicht nach vorne.",
      "back": "Der Rücken ist gerade und lang.",
      "shoulders": "Die Schultern sind entspannt und nicht hochgezogen.",
      "arms": "Die Arme sind gestreckt und greifen die großen Zehen oder die Füße.",
      "hands": "Die Hände umfassen die großen Zehen oder die Füße.",
      "neck+head": "Der Kopf hängt entspannt nach unten."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, die Knie durchzustrecken und in den Kniekehlen zu lehnen, eine leichte Beugung ist besser als Druck im Kniegelenk. Achte darauf, den Rücken gerade zu halten. Die Vorstreckung kommt aus der Bewegung im Hüftgelenk, nicht aus der Beugung des Rumpfes.",
    "problems": "Bei Zerren in den Waden Beine leicht winkeln und mit dem Rumpf weniger tief gehen. Benutze Arme und Hilfsmittel um den Oberkörper zu stützen. Bei Schwindelgefühl langsam mit dem Oberkörper nach oben aus der Position kommen.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "savasana_1",
    "asanaName": {
      "sanskrit": "Śavāsana",
      "de": "Totenstellung",
	  "title": "Śavāsana",
	  "synonym": "Śavāsana, Savasana, Totenstellung, Leichenhaltung"
    },
    "info": {
      "position": "3",
      "level": "1",
      "difficulty": "1",
      "symetric": 1,
      "description": "Liegende Entspannungshaltung, bei der der gesamte Körper vollständig entspannt auf dem Boden liegt.",
      "origin": "Śava = Leiche & Āsana = Haltung - शवासन"
    },
    "explanation": {
      "starting": "Starte im sitzen und mit aufgestellten Beinen. Wandere langsam mit den Armen nach hinten, bis du mit langem Rücken auf dem Boden liegst. Die Beine sind hüftbreit auseinander. Lege die Beine nacheinander geführt ab ohne die Hüfte zu kippen. Die Füße fallen locker nach außen. Die Arme liegen entspannt neben dem Körper, die Handflächen zeigen nach oben. Schließe die Augen.",
      "staying": "Lass den gesamten Körper schwer werden und entspanne dich vollständig. Atme ruhig und gleichmäßig. Bleibe für einige Minuten in dieser Haltung.",
      "ending": "Öffne die Augen. Lege den rechten Arm nach oben, oberhalb des Kopfes. Stelle nacheinander beide Beine an. Drehe dich auf die rechte Seite. Verharre einen Augenblick. Stütze dich mit dem linken Arm langsam in eine sitzende Position.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Die Füße fallen locker nach außen.",
      "legs": "Die Beine sind hüftbreit auseinander und vollständig entspannt.",
      "pelvis": "Die Beckenschaufeln liegen am Boden.",
      "abdomen torso": "Der Bauch ist entspannt.",
      "chest": "Der Brustkorb ist geöffnet und entspannt.",
      "back": "Der Rücken liegt flach auf dem Boden.",
      "shoulders": "Die Schultern sind entspannt und liegen auf dem Boden.",
      "arms": "Die Arme liegen entspannt neben dem Körper.",
      "hands": "Die Handflächen zeigen nach oben.",
      "neck+head": "Der Kopf liegt entspannt auf dem Boden, der Blick ist nach innen gerichtet."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, die Augen zu öffnen oder den Körper anzuspannen. Achte darauf, den Körper vollständig zu entspannen.",
    "problems": "Ziehe dir bei Bedarf vorher noch etwas warmes über. Nutze Decken um entspannt leigen zu können. Bei Rückenproblemen kann eine bolstere oder Decke unter die Knie gelegt werden, um den unteren Rücken zu entlasten.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "suptapadangusthasana_1",
    "asanaName": {
      "sanskrit": "Supta Pādāṅguṣṭhāsana",
      "de": "Liegende große Zehenhaltung",
	  "title": "",
	  "synonym": "Supta Pādāṅguṣṭhāsana, Suptapadangusthasana, Liegende große Zehenhaltung"
    },
    "info": {
      "position": "3",
      "level": "1",
      "difficulty": "2",
      "symetric": 0,
      "description": "Liegende Haltung, bei der ein Bein gestreckt nach oben gehalten wird, während das andere Bein auf dem Boden bleibt. Das nach oben gestreckte Bein wird an der großen Zehe gehlaten.",
      "origin": "Supta = liegend & Pāda = Fuß & Aṅguṣṭha = große Zehe & Āsana = Haltung - पादाङ्गुष्ठासन"
    },
    "explanation": {
      "starting": "Lege dich auf den Rücken. Beuge das rechte Knie zur Brust und umfasse die große Zehe des rechten Fußes mit der rechten Hand. Strecke das rechte Bein nach oben, während das linke Bein gestreckt auf dem Boden bleibt.",
      "staying": "Halte das rechte Bein gestreckt und die Schultern entspannt auf dem Boden.",
      "ending": "Beuge das rechte Knie wieder zur Brust und lege das Bein langsam auf den Boden.",
      "alternatives": "Alternativ kann das Asana aus pavanmuktasana gestartet oder beendet werden."
    },
    "triggers": {
      "feet": "Der linke Fuß bleibt auf dem Boden, die rechte Ferse zeigt nach oben.",
      "legs": "Das rechte Bein ist gestreckt und nach oben gehalten, das linke Bein ist gestreckt auf dem Boden.",
      "pelvis": "Durch das anheben des Beines verändert sich die Becken achse nicht. Die Beckenschaufeln liegen entspannt am Boden.",
      "abdomen torso": "Der Rumpf liegt flach ausgebreitet auf dem Boden.",
      "chest": "Der Brustkorb ist entspannt.",
      "back": "Der Rücken liegt flach auf dem Boden.",
      "shoulders": "Die Schultern sind entspannt und liegen auf dem Boden.",
      "arms": "Der rechte Arm ist gestreckt und hält die große Zehe des rechten Fußes, der linke Arm liegt entspannt neben dem Körper.",
      "hands": "Die rechte Hand umfasst die große Zehe des rechten Fußes, die linke Hand liegt flach auf dem Boden.",
      "neck+head": "Der Kopf liegt entspannt auf dem Boden, der Blick geht zur Decke."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, das Bein zu stark zu ziehen oder den Rücken vom Boden zu heben. Achte darauf, die Schultern entspannt zu halten.",
    "problems": "Bei steifen Beinen oder Rücken kann ein Gurt verwendet werden, um das Bein zu unterstützen. Bei Schwindelgefühl langsam aus der Position kommen.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "tadasana_1",
    "asanaName": {
      "sanskrit": "tāḍāsana",
      "de": "Berg-Asana",
	  "title": "tāḍāsana",
	  "synonym":"tāḍāsana, Tadasana, samasthiti, Berg-Asana"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "1",
      "symetric": 1,
      "description": "Sicherer Stand ohne Lehnen. Arme am Rumpf.",
      "origin": "Tāḍa (Berg) & āsana (Haltung) – ताडासन"
    },
    "explanation": {
      "starting": "Stehen und Gewicht auf beiden Fersen ankommen lassen. Arme sind seitlich am Rumpf.",
      "staying": "Stützachse von den Fersen bis zur Schädelkrone aufbauen. Fersen stemmen in den Boden. Gestreckte Beine, aufgerichtete Hüfte und gestreckter Rumpf. Blick geradeaus nach vorne gerichtet.",
      "ending": "Haltung auflösen.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Füße stehen parallel schulterbreit.",
      "legs": "Beine sind gestreckt.",
      "pelvis": "Hüfte ist aufgerichtet.",
      "abdomen torso": "Flanken stützen nach oben.",
      "chest": "Brustkorb breitet sich nach links und rechts aus.",
      "back": "Rücken ist gerade.",
      "shoulders": "Schultern bleiben entspannt auf dem Rumpf, Schulterblätter schmiegen sich an die Rippen.",
      "arms": "Aktive Arme sind seitlich am Rumpf.",
      "hands": "Entspannte ausgebreitete Handflächen.",
      "neck+head": "Hals und Kopf entspannt, gerader Blick nach vorne."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "",
    "problems": "",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "trikonasana_1",
    "asanaName": {
      "sanskrit": "trikoṇāsana",
      "de": "Dreieckshaltung",
	  "title": "Trikoṇāsana",
	  "synonym": "Trikoṇāsana, Trikonasana, Dreieckshaltung"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "5",
      "symetric": 0,
      "description": "Breiter Stand mit gestreckten Beinen. Vorderer Fuß und Knie zeigen nach vorne. Rumpf ist zur Seite geöffnet und über das vordere Bein gestreckt. Stütze mit dem Arm am Boden. Der andere Arm ist zur Decke gestreckt.",
      "origin": "trikoṇa (triangle; tri=three, koṇa=angle) & āsana (Haltung) – त्रिकोणासन"
    },
    "explanation": {
      "starting": "Starte seitlich im Tadasana. Beine scheren seitlich auseinander. Hebe den rechten Fußballen. Rechtes Bein dreht zwischen Hüfte und Ferse nach außen, das Becken dreht leicht mit. Fuß setzt nach vorne gerichtet auf. Rumpf streckt sich über das vordere Hüftgelenk, die Hüfte geht dabei leicht zurück. Der gestreckte Rumpf bleibt zur Seite hin geöffnet. Rechter Arm stützt zum Boden, linker Arm streckt sich zur Decke.",
      "staying": "Die Fersen stützen zum Boden, die Beine sind gestreckt. Beide Rumpfseiten sind parallel nach vorne gestreckt.",
      "ending": "Rumpf zieht sich am nach oben gestreckten Arm wieder nach oben. Vorderes Bein dreht sich wieder ein. Beine schließen.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Hinterer Fuß (links) eher parallel zur Mattenkante, vorderer Fuß (rechts) parallel zur langen Mattenkante.",
      "legs": "Hinteres Bein (links) gestreckt mit Ausrichtung zur Seite, vorderes (rechts) Bein gestreckt Ausrichtung nach vorne.",
      "pelvis": "Hüfte rotiert leicht nach außen mit vorderem Bein. Becken schiebt zurück und über das vordere Hüftgelenk.",
      "abdomen torso": "Flanken parallel gestreckt.",
      "chest": "Brustkorb breitet sich nach links und rechts aus.",
      "back": "Rücken ist gerade.",
      "shoulders": "Schultern breiten sich entspannt nach links und rechts aus und stützen die Arme.",
      "arms": "Rechter Arm stützt zum Boden. Linker Arm nach oben zur Decke gestreckt.",
      "hands": "Rechte Hand stützt nah an der Innenseite des Fußes auf, Finger zeigen nach vorne. Gestreckte linke Hand, Finger zeigen nach oben.",
      "neck+head": "Gesicht schaut zur linken Hand nach oben."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Das vordere Bein muss in einer Achse stehen, keine Verdrehung im Knie.",
    "problems": "Bei Spannungsgefühlen in den Beinen den Fußabstand verringern. Beim Zwicken in den unteren (rechten) Rumpf Hilfsmittel wie Klötze verwenden für die Verlängerung der Armstütze.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "upavisthakonasana_1",
    "asanaName": {
      "sanskrit": "Upaviṣṭha Koṇāsana",
      "de": "Sitzende gewinkelte Haltung",
	  "title": "Upaviṣṭha Koṇāsana",
	  "synonym": "Upaviṣṭha Koṇāsana, Upavisthakonasana, Sitzende gewinkelte Haltung"
    },
    "info": {
      "position": "2",
      "level": "1",
      "difficulty": "3",
      "symetric": 1,
      "description": "Sitzende Vorwärtsbeuge mit weit gespreizten Beinen. Der Oberkörper ist nach vorne gestreckt, die Hände greifen die Füße oder Schienbeine.",
      "origin": "Upaviṣṭha = sitzend & Koṇa = Winkel & Āsana = Haltung उपविष्टकोणासन"
    },
    "explanation": {
      "starting": "Setze dich auf den Boden und spreize die Beine weit auseinander. Strecke den Oberkörper über die Drehung im Hüftgelenk nach vorne, halte den Rücken gerade. Greife mit den Händen nach den Füßen oder Schienbeinen.",
      "staying": "Halte den Rücken gerade und lang. Die Beine bleiben gestreckt.",
      "ending": "Richte den Oberkörper langsam wieder auf und schließe die Beine.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Die Füße sind weit auseinander.",
      "legs": "Die Beine sind gestreckt und stützen ins Hüftgelenk, die Knie sind nicht gebeugt.",
      "pelvis": "Das Becken ist über den Oberschenkelknochen gedreht.",
      "abdomen torso": "Der Rumpf ist lang gestreckt.",
      "chest": "Der Brustkorb hängt nicht nach vorne, kein Druck im Brustbein.",
      "back": "Der Rücken ist gerade und lang.",
      "shoulders": "Die Schultern sind entspannt.",
      "arms": "Die Arme sind gestreckt und greifen nach den Füßen oder Schienbeinen.",
      "hands": "Die Hände umfassen die Füße oder Schienbeine.",
      "neck+head": "Der Kopf hängt entspannt nach unten."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, die Knie zu beugen. Achte darauf, den Rücken gerade zu halten, um Verletzungen zu vermeiden. Um mit den Händen die Füße zu erreichen nicht die Schultern vom Rumpf wegzerren.",
    "problems": "Bei Druck im unteren Rücken weniger tief gehen. Bei steifen Beinen oder Rücken kann ein Gurt verwendet werden, um die Hände zu unterstützen. Bei Schwindelgefühl langsam aus der Position kommen.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "urdvhvahastasana_1",
    "asanaName": {
      "sanskrit": "ūrdhva hastāsana",
      "de": "Vulkan-Asana",
	  "title": "ūrdhva hastāsana",
	  "synonym": "ūrdhva hastāsana, urdvhvahastasana, Vulkan-Asana"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "4",
      "symetric": 1,
      "description": "Sicherer Stand ohne Lehnen. Arme nach oben gestreckt. Gesicht schaut nach oben zu den Händen.",
      "origin": "Ūrdhva (aufrecht) & hasta (Hand) & āsana (Haltung)"
    },
    "explanation": {
      "starting": "Stehen und Gewicht auf beiden Fersen ankommen lassen. Arme über die Seite nach oben strecken. Die Handflächen berühren sich über dem Kopf.",
      "staying": "Stützachse von den Fersen bis zur Schädelkrone aufbauen. Gestreckte Beine, aufgerichtete Hüfte und gestreckter Rumpf. Blick geht nach oben zu den Händen.",
      "ending": "Arme nach unten nehmen und die Haltung auflösen.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Füße stehen parallel schulterbreit.",
      "legs": "Beine sind gestreckt.",
      "pelvis": "Hüfte ist aufgerichtet.",
      "abdomen torso": "Flanken stützen nach oben.",
      "chest": "Brustkorb breitet sich nach links und rechts aus.",
      "back": "Rücken ist gerade.",
      "shoulders": "Schultern bleiben entspannt auf dem Rumpf und werden nicht von den Armen nach oben gezogen. Schulterblätter schmiegen sich an die Rippen.",
      "arms": "Arme strecken aktiv nach oben.",
      "hands": "Handflächen aufeinander.",
      "neck+head": "Kopf nach hinten gelehnt, Blick nach oben zu den Händen."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "",
    "problems": "",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "urdvhvahastasana_2",
    "asanaName": {
      "sanskrit": "ūrdhva hastāsana",
      "de": "Palmen-Asana",
	  "title": "ūrdhva hastāsana",
	  "synonym": "ūrdhva hastāsana, urdvhvahastasana, Palmen-Asana"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "1",
      "symetric": 1,
      "description": "Sicherer Stand ohne Lehnen. Arme nach oben gestreckt. Finger ineinander verschränkt. Handflächen zeigen nach oben.",
      "origin": "Ūrdhva (aufrecht) & hasta (Hand) & āsana (Haltung)"
    },
    "explanation": {
      "starting": "Stehen und Gewicht auf beiden Fersen ankommen lassen. Finger verschränken, Handflächen schauen nach außen. Arme über vorne nach oben strecken. Blick geht gerade nach vorne.",
      "staying": "Stützachse von den Fersen bis zur Schädelkrone aufbauen. Gewicht auf die Fersen bringen. Gestreckte Beine, aufgerichtete Hüfte und gestreckter Rumpf. Blick geradeaus nach vorne gerichtet.",
      "ending": "Arme nach unten nehmen und die Haltung auflösen.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Füße stehen parallel schulterbreit.",
      "legs": "Beine sind gestreckt.",
      "pelvis": "Hüfte ist aufgerichtet.",
      "abdomen torso": "Flanken stützen nach oben.",
      "chest": "Brustkorb breitet sich nach links und rechts aus.",
      "back": "Rücken ist gerade.",
      "shoulders": "Schultern bleiben entspannt auf dem Rumpf.",
      "arms": "Arme strecken aktiv nach oben.",
      "hands": "Handflächen zeigen nach oben, Finger ineinander verschränkt.",
      "neck+head": "Hals und Kopf entspannt, gerader Blick nach vorne."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "",
    "problems": "",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "uttanasana_1",
    "asanaName": {
      "sanskrit": "Uttānāsana",
      "de": "Vorwärtsbeuge im Stehen",
	  "title": "Uttānāsana",
	  "synonym": "Uttānāsana, Uttanasana, Vorwärtsbeuge im Stehen"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "2",
      "symetric": 1,
      "description": "Stehende Vorwärtsbeuge mit gestreckten Beinen. Der Oberkörper ist nach vorne gestreckt, die Hände berühren den Boden oder die Schienbeine. Je nach Spielraum an den Hüftgelenken kann der Rumpf über die Hüftgelenksdrehung tiefer sinken.",
      "origin": "Uttāna = gestreckt - उत्तानासन"
    },
    "explanation": {
      "starting": "Starte im Tadasana. Beuge den Oberkörper nach vorne, halte den Rücken gerade. Lass die Hände in Richtung Boden oder Schienbeine gleiten, je nach Flexibilität.",
      "staying": "Halte den Rücken gerade und lang, der Brustkorb fällt nicht nach vorne. Die Beine bleiben gestreckt und in einer Achse mit dem Hüftgelenk. Fersen stempeln in den Boden.",
      "ending": "Richte den Oberkörper über die Drehung im Hüftgelenk langsam wieder auf.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Die Füße stehen hüftbreit auseinander und parallel zueinander.",
      "legs": "Die Beine sind gestreckt.",
      "pelvis": "Das Becken ist über die Hüftgelenke nach vorne gedreht.",
      "abdomen torso": "Der Rumpf ist lang gestreckt.",
      "chest": "Der Brustkorb ist entspannt und fällt nicht nach vorne.",
      "back": "Der Rücken ist gerade und lang.",
      "shoulders": "Die Schultern sind entspannt und nicht hochgezogen.",
      "arms": "Die Arme hängen entspannt nach unten oder die Hände berühren den Boden oder die Schienbeine.",
      "hands": "Die Hände berühren den Boden oder die Schienbeine.",
      "neck+head": "Der Kopf hängt entspannt nach unten."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Vermeide es, die Knie durchzustrecken und in den Kniekehlen zu lehnen, eine leichte Beugung ist besser als Druck im Kniegelenk. Achte darauf, den Rücken gerade zu halten. Die Vorstreckung kommt aus der Bewegung im Hüftgelenk, nicht aus der Beugung des Rumpfes.",
    "problems": "Bei Zerren in den Waden Beine leicht winkeln und mit dem Rumpf weniger tief gehen. Benutze Arme und Hilfsmittel um den Oberkörper zu stützen. Bei Schwindelgefühl langsam mit dem Oberkörper nach oben aus der Position kommen.",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "utthitaparshvakonasana_1",
    "asanaName": {
      "sanskrit": "utthitapārśvakoṇāsana",
      "de": "Gewinkeltes Dreieck",
	  "title": "Utthitapārśvakoṇāsana",
	  "synonym": "Utthitapārśvakoṇāsana, Utthitaparshvakonasana, Gewinkeltes Dreieck, Weite/offene seitlichgewinkelte Haltung"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "2",
      "symetric": 0,
      "description": "Breiter Stand mit gestrecktem hinteren Bein und angewinkeltem vorderen Bein. Vorderer Fuß und Knie zeigen nach vorne. Rumpf ist zur Seite geöffnet und über das Vorderbein gestreckt. Stütze mit dem Arm auf der Innenseite des Vorderbeins am Boden. Anderer Arm in der Verlängerung des Rumpfes gestreckt.",
      "origin": "utthita = (weites, gestrecktes) & pārśva (seite) & koṇa (Winkel) & āsana (Haltung)"
    },
    "explanation": {
      "starting": "Starte seitlich im Tadasana. Beine scheren seitlich auseinander. Hebe den rechten Fußballen. Rechtes Bein dreht zwischen Hüfte und Ferse nach außen, das Becken dreht leicht mit. Fuß setzt nach vorne gerichtet auf. Das Schienbein des vorderen Beines schiebt nach vorne, maximal soweit bis das Kniegelenk in einer Achse über dem Fußgelenk steht. Der Rumpf streckt sich über das vordere Hüftgelenk. Der gestreckte Rumpf bleibt zur Seite hin geöffnet. Rechter Arm stützt zum Boden, linker Arm streckt sich über den Kopf in Verlängerung der Rumpfflanke zur Decke.",
      "staying": "Die Fersen stützen zum Boden, hinteres Bein ist gestreckt. Beide Rumpfseiten sind parallel nach vorne gestreckt.",
      "ending": "Rumpf zieht sich am nach oben gestreckten Arm wieder nach oben. Vorderes Bein dreht sich wieder ein. Beine schließen.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Hinterer Fuß (links) eher parallel zur Mattenkante, vorderer Fuß (rechts) parallel zur langen Mattenkante.",
      "legs": "Hinteres Bein (links) gestreckt mit Ausrichtung zur Seite, vorderes (rechts) Bein gestreckt Ausrichtung nach vorne.",
      "pelvis": "Hüfte rotiert nach außen mit vorderem Bein. Becken schiebt zurück und über das vordere Hüftgelenk.",
      "abdomen torso": "Flanken parallel gestreckt.",
      "chest": "Brustkorb breitet sich nach links und rechts aus. Brustbein schaut zur Seite.",
      "back": "Rücken ist gerade.",
      "shoulders": "Schultern breiten sich entspannt nach links und rechts aus und stützen die Arme.",
      "arms": "Rechter Arm stützt zum Boden. Linker Arm nach oben zur Decke gestreckt.",
      "hands": "Rechte Hand stützt nah an der Innenseite des Fußes auf, Finger zeigen nach vorne. Gestreckte linke Hand, Finger zeigen nach oben.",
      "neck+head": "Gesicht schaut zur linken Hand nach oben."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "",
    "problems": "",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "utthitatrikonasana_1",
    "asanaName": {
      "sanskrit": "utthitatrikoṇāsana",
      "de": "Dreieckshaltung",
	  "title": "Utthitatrikoṇāsana",
	  "synonym": "Utthitatrikoṇāsana, Utthitatrikonasana, Weite/offene Dreieckshaltung"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "6",
      "symetric": 0,
      "description": "Breiter Stand mit gestreckten Beinen. Vorderer Fuß und Knie zeigen nach vorne. Rumpf ist zur Seite geöffnet und über das vordere Bein gestreckt. Stütze mit dem Arm am Boden. Der andere Arm ist zur Decke gestreckt.",
      "origin": "Utthita (weites, gestrecktes) & trikoṇa (triangle; tri=three, koṇa=angle) & āsana (Haltung) – उत्थितत्रिकोणासन"
    },
    "explanation": {
      "starting": "Starte seitlich im Tadasana. Beine scheren seitlich auseinander. Hebe den rechten Fußballen. Rechtes Bein dreht zwischen Hüfte und Ferse nach außen, das Becken dreht leicht mit. Fuß setzt nach vorne gerichtet auf. Rumpf streckt sich über das vordere Hüftgelenk, die Hüfte geht dabei leicht zurück. Der gestreckte Rumpf bleibt zur Seite hin geöffnet. Rechte Hand umfasst rechten großen Zeh, linker Arm streckt sich zur Decke.",
      "staying": "Die Fersen stützen zum Boden, die Beine sind gestreckt. Beide Rumpfseiten sind parallel nach vorne gestreckt.",
      "ending": "Rumpf zieht sich am nach oben gestreckten Arm wieder nach oben. Vorderes Bein dreht sich wieder ein. Beine schließen.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Hinterer Fuß (links) eher parallel zur Mattenkante, vorderer Fuß (rechts) parallel zur langen Mattenkante.",
      "legs": "Hinteres Bein (links) gestreckt mit Ausrichtung zur Seite, vorderes (rechts) Bein gestreckt Ausrichtung nach vorne.",
      "pelvis": "Hüfte rotiert leicht nach außen mit vorderem Bein. Becken schiebt zurück und über das vordere Hüftgelenk.",
      "abdomen torso": "Flanken parallel gestreckt.",
      "chest": "Brustkorb breitet sich nach links und rechts aus.",
      "back": "Rücken ist gerade.",
      "shoulders": "Schultern breiten sich entspannt nach links und rechts aus und stützen die Arme.",
      "arms": "Rechter Arm zum rechten (vorderen) Fuß gestreckt. Linker Arm nach oben zur Decke gestreckt.",
      "hands": "Rechte Hand hält den großen Zeh, gestreckte Hand, Finger zeigen nach oben.",
      "neck+head": "Gesicht schaut zur linken Hand nach oben."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Das vordere Bein muss in einer Achse stehen, keine Verdrehung im Knie.",
    "problems": "Bei Spannungsgefühlen in den Beinen den Fußabstand verringern. Beim Zwicken in den unteren (rechten) Rumpf Hilfsmittel wie Klötze verwenden für die Verlängerung der Armstütze.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "virabhadrasana_I_1",
    "asanaName": {
      "sanskrit": "Vīrabhadrāsana I",
      "de": "Krieger 1",
	  "title": "Vīrabhadrāsana I",
	  "synonym": "Vīrabhadrāsana 1, Virabhadrasana 1, Krieger 1"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "3",
      "symetric": 0,
      "description": "Breiter Stand mit gestrecktem hinteren Bein und angewinkeltem vorderen Bein. Rumpf, vorderer Fuß und Bein zeigen nach vorne. Hinteres Bein und Fuß zeigen etwas nach außen gerichtet nach vorne. Arme sind nach oben gestreckt.",
      "origin": "Vīra = Held & Bhadra = gut /glücklich(वीरभद्रासन)"
    },
    "explanation": {
      "starting": "Starte seitlich im Tadasana. Beine scheren seitlich auseinander. Hebe die linke (Ferse Hinterbein) an und drehe das Bein zwischen Hüftgelenk und Fußballen ein (ca. 45°) und setze die Ferse wieder auf. Hebe den rechten Fußballen (Vorderes Bein) und drehe das Bein zwischen Hüfte und Ferse nach außen. Das Becken dreht mit. Fuß setzt nach vorne gerichtet auf. Das Schienbein des vorderen Beines schiebt nach vorne, maximal soweit bis das Kniegelenk in einer Achse über dem Fußgelenk steht. Der Rumpf streckt nach oben, die Arme strecken sich über den Kopf in Verlängerung der Rumpfflanke zur Decke.",
      "staying": "Die Fersen stützen zum Boden, hinteres Bein ist gestreckt. Beide Rumpfseiten sind parallel nach oben gestreckt.",
      "ending": "Strecken des vorderen Beines und zurückdrehen der Beine. Schließen der seitlichen gescherten Beine.",
      "alternatives": "Alternativ kannst du mit einem Ausfallschritt nach vorne beginnen und dann das Hintere bein sowie Rumpf drehen."
    },
    "triggers": {
      "feet": "Der hintere Fuß steht schräg, ca. 45°. Der vordere Fuß ist gerade nach vorne ausgerichtet. Fersen stemmen in den Boden.",
      "legs": "Das hintere Bein ist gestreckt. Das vordere Bein angewinkelt. Das Knie schiebt dabei nicht weiter nach vorne als das Fußgelenk.",
      "pelvis": "Das Becken ist aufgerichtet.",
      "abdomen torso": "Gestreckte Flanken nach oben.",
      "chest": "Entspannter ausgebreiteter Brustkorb.",
      "back": "Gerader Rücken, ausgedehnte Rippen.",
      "shoulders": "Schultern werden nicht mit den Armen nach oben gezogen. Schultergürtel ruht auf dem Rumpf.",
      "arms": "Arme sind aktiv zur Decke gestreckt.",
      "hands": "Handflächen schauen sich an.",
      "neck+head": "Blick geht zu den Händen."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Das vordere Bein muss in einer Achse stehen, keine Verdrehung im Knie. Mit dem vorderen Bein nicht ins Knie drücken / über das Fußgelenk hinaus.",
    "problems": "Bei Spannungsgefühlen in den Beinen den Fußabstand verringern. Bei Schwierigkeiten, das Gleichgewicht zu halten, Hilfsmittel verwenden oder den Fußabstand verändern.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "virabhadrasana_II_1",
    "asanaName": {
      "sanskrit": "Vīrabhadrāsana II",
      "de": "Krieger 2",
	  "title": "Vīrabhadrāsana II",
	  "synonym": "Vīrabhadrāsana 2, Virabhadrasana 2, Krieger 2"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "3",
      "symetric": 0,
      "description": "Breiter Stand mit gestrecktem hinteren Bein und angewinkeltem vorderen Bein. Rumpf ist seitlich ausgerichtet. Arme sind seitlich auf Schulterhöhe ausgestreckt.",
      "origin": "Vīra = Held & Bhadra = gut /glücklich(वीरभद्रासन)"
    },
    "explanation": {
      "starting": "Starte seitlich im Tadasana. Beine scheren seitlich auseinander. Hebe den rechten Fußballen (Vorderes Bein) und drehe das Bein zwischen Hüfte und Ferse um 90° nach außen. Das Becken dreht leicht mit. Fuß setzt nach vorne gerichtet auf. Das Schienbein des vorderen Beines schiebt nach vorne, maximal soweit bis das Kniegelenk in einer Achse über dem Fußgelenk steht. Der Rumpf bleibt aufrecht, die Arme strecken sich seitlich auf Schulterhöhe.",
      "staying": "Die Fersen stützen zum Boden, hinteres Bein ist gestreckt. Der Oberkörper schaut zur seite, beide Rumpfseiten sind parallel nach oben gestreckt. Der Blick geht über die Fingerspitzen der vorderen Hand hinaus.",
      "ending": "Strecken des vorderen Beines und zurückdrehen des Beins. Schließen der seitlichen gescherten Beine.",
      "alternatives": "Alternativ kannst du mit einem Ausfallschritt nach vorne beginnen und dann das Hintere bein sowie Rumpf drehen."
    },
    "triggers": {
      "feet": "Der hintere Fuß steht quer zur Matte, der vordere Fuß längs zur Matte. Fersen stemmen in den Boden.",
      "legs": "Das hintere Bein ist gestreckt. Das vordere Bein angewinkelt, das Knie schiebt dabei nicht weiter nach vorne als das Fußgelenk.",
      "pelvis": "Das Becken ist aufgerichtet.",
      "abdomen torso": "Gestreckte Flanken nach oben.",
      "chest": "Entspannter ausgebreiteter Brustkorb. Der Oberkörper ist zur Seite ausgerichtet.",
      "back": "Gerader Rücken, ausgedehnte Rippen.",
      "shoulders": "Schultern sind entspannt und nicht hochgezogen. Schultergürtel ruht auf dem Rumpf.",
      "arms": "Arme sind aktiv seitlich auf Schulterhöhe ausgestreckt.",
      "hands": "Handflächen zeigen nach unten.",
      "neck+head": "Blick geht über die Fingerspitzen der vorderen Hand hinaus."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Das vordere Bein muss in einer Achse stehen, keine Verdrehung im Knie. Mit dem vorderen Bein nicht ins Knie drücken / über das Fußgelenk hinaus.",
    "problems": "Bei Spannungsgefühlen in den Beinen den Fußabstand verringern. Bei Schwierigkeiten, das Gleichgewicht zu halten, Hilfsmittel verwenden oder den Fußabstand verändern. Bei einschlafenden Armen die Arme etwas winkeln.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "virabhadrasana_III_1",
    "asanaName": {
      "sanskrit": "Vīrabhadrāsana III",
      "de": "Krieger 3",
	  "title": "Vīrabhadrāsana III",
	  "synonym": "Vīrabhadrāsana 3, Virabhadrasana 3, Krieger 3"
    },
    "info": {
      "position": "1",
      "level": "2",
      "difficulty": "4",
      "symetric": 0,
      "description": "Ausfallschritt mit gestrecktem vorderen und hinteren Bein. Der Oberkörper und die Arme sind nach vorne ausgestreckt, parallel zum Boden. Das hintere Bein ist angehoben.",
      "origin": "Vīra = Held & Bhadra = gut /glücklich(वीरभद्रासन)"
    },
    "explanation": {
      "starting": "Starte im Tadasana. Mache einen Schritt mit dem rechten Fuß nach vorne und verlagere das Gewicht auf das vordere Bein. Beuge das vordere Knie und Strecke den Oberkörper über das Bein, bis du komplett auf dem vorderen bein stehen kannst. Hebe das hintere Bein an und strecke es nach hinten, während du den Oberkörper nach vorne beugst, bis er parallel zum Boden ist. Streck die Arme nach vorne aus, parallel zum Boden.",
      "staying": "Die Hüften bleiben parallel zum Boden. Das hintere Bein und die Arme bleiben gestreckt. Das Standbeid darf leicht gewinkelt bleiben.",
      "ending": "Senke das hintere Bein langsam ab während du gleichzeitig mit dem Oberkörper über das Hüftgelenk nach oben kommst. Schließe den Schritt und komme zurück in das Tadasana.",
      "alternatives": "virabhadrasanaIII kann aufbauend auf virabhadrasanaI gestartet werden."
    },
    "triggers": {
      "feet": "Der vordere Fuß zeigt nach vorne, die Ferse des hinteren Fußes ist in der Luft.",
      "legs": "Das vordere Bein ist gebeugt, das hintere Bein ist gestreckt und angehoben.",
      "pelvis": "Das Becken ist parallel zum Boden.",
      "abdomen torso": "Der Rumpf ist parallel zum Boden.",
      "chest": "Der Brustkorb ist stabil gehalten und fällt nicht nach vorne.",
      "back": "Der Rücken ist gerade und lang.",
      "shoulders": "Die Schultern sind entspannt und nicht hochgezogen.",
      "arms": "Die Arme sind nach vorne ausgestreckt, parallel zum Boden.",
      "hands": "Die Handflächen zeigen zueinander.",
      "neck+head": "Der Blick geht zum Boden."
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Ein durchgefrücktes Standbein kann Druck im Kniegelenk auslösen.",
    "problems": "Bei Gleichgewichtsproblemen mit den Armen am Boden abstützen oder eine Wand als Stütze verwenden. Bei Spannungen im unteren Rücken das Spielbein leicht senken.",
    "contraindications": "",
    "variants": "",
    "relatedAsanas": ""
  },
  {
    "id": "vrksasana_1",
    "asanaName": {
      "sanskrit": "vṛkṣāsana",
      "de": "Baum-Asana",
	  "title": "Vṛkṣāsana",
	  "synonym": "Vṛkṣāsana, Vrksasana, Baum-Asana"
    },
    "info": {
      "position": "1",
      "level": "1",
      "difficulty": "3",
      "symetric": 0,
      "description": "Einbeinstand, der Fuß des anderen Beins ist am Oberschenkel des Standbeins.",
      "origin": "Vṛkṣa (Baum) & āsana (Haltung) – वृक्षासन"
    },
    "explanation": {
      "starting": "Ausgangsposition ist das Tadasana. Verlagere das Gewicht auf ein Bein. Hebe das andere Bein und bekomme den Fuß am Fußgelenk zu fassen. Platziere den Fuß auf der Innenseite des Oberschenkels, Bein dreht im Hüftgelenk nach außen. Geübte können die Arme über die Seiten nach oben führen.",
      "staying": "Achte darauf, dass das Becken durch das Hochziehen des Spielbeins am Standbein nicht sinkt. Achte auf eine gerade Streckung des Rumpfes.",
      "ending": "Bringe die Arme wieder an die Rumpfseiten und löse das Bein vom Oberschenkel. Gewicht wieder gleichmäßig auf beiden Füßen.",
      "alternatives": ""
    },
    "triggers": {
      "feet": "Standfuß am Boden verwurzelt. Fuß des Spielbeins an der Oberschenkelinnenseite des Standbeins.",
      "legs": "Standbein gestreckt. Spielbein angewinkelt. Drehung im Hüftgelenk nach außen.",
      "pelvis": "Hüfte ist aufgerichtet.",
      "abdomen torso": "Flanken stützen nach oben.",
      "chest": "Brustkorb breitet sich nach links und rechts aus.",
      "back": "Rücken ist gerade.",
      "shoulders": "Schultern bleiben entspannt auf dem Rumpf und werden nicht von den Armen nach oben gezogen. Schulterblätter schmiegen sich an den Brustkorb.",
      "arms": "Arme strecken aktiv nach oben.",
      "hands": "Handflächen aufeinander.",
      "neck+head": ""
    },
    "aids": {
      "belt": 0,
      "block": 0,
      "blanket": 0,
      "chair": 0,
      "bolster": 0,
      "wall": 0
    },
    "dangers": "Entweder den Fuß an den Oberschenkel bringen oder an die Wade, nicht an das Knie. Nutze Hilfsmittel zum Halten des Gleichgewichts.",
    "problems": "Wenn der Fuß am Oberschenkel abrutscht, den Fuß an der Wade anstellen. Alternativ das freie Bein mit Händen oder Band unterstützen.",
    "contraindications": "Vermeide dieses Asana bei Gleichgewichtsstörungen oder Schwindel.",
    "variants": "",
    "relatedAsanas": ""
  }
]

        const initialKnowledgeData = [
{ id: 'Start_Intro', order: 1, topic: 'Start', category: 'special', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Willkommen im Wissensbereich von Gom.', media: '', headline1: '', media1: '', text1: 'Im Wissensbereich von Gom findest du verschiedene Kapitel in denen Lektionen zu einem Thema zusammengefasst sind. ', headline2: '', media2: '', text2: 'Schließe Lektion nach Lektion ab und verfolge deinen Fortschritt auf der Übersichtsseite. Wenn du einen Themenkomplex abgeschlossen hast wird ein neues Thema freigeschalten.', headline3: '', media3: '', text3: 'Die Themen sind gemischt, haben aber natürlich alle einen Bezug zu Yoga. Dabei bauen die Lektionen aufeinander auf, grundsätzlich kannst du dir aber die Themen suchen, die für dich gerade spannend sind. Sollten dir Lektionen zunächst etwas abstrakt erscheinen, kannst du diese zu einem späteren Zeitpunkt natürlich nocheinmal aufrufen, wenn Sie besser in deinen Lernfluss passen.', headline4: '', media4: '', text4: 'Um deine erste Lektion abzuschließen und zur Kapitelübersicht zu gelangen setze den ✓.', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Yoga Praxis_Intro', order: 2, topic: 'Yoga Praxis', category: 'yoga', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: '', media: '', headline1: 'Yoga als Sport', media1: '', text1: 'Yoga ist die Kombination des Physischen, Mentalen und Psychischen. In der westlichen Welt wird mit dem Begriff Yoga meist die physische, sportliche Komponente assoziiert, also das Üben verschiedener Haltungen und Haltugsabfolgen.', headline2: '', media2: '', text2: 'In den folgenden Abschnitten konzentrieren wir uns ebenfalls zunächst auf die physische Komponente. Du lernst den Begriff der Asanas kennen und allgemeine Tipps zum Üben der Haltungen.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Yoga Praxis_Āsana', order: 3, topic: 'Yoga Praxis', category: 'yoga', lesson: 'Āsana', icon: '', content: {intro: 'In erster Linie sind die Haltungen dazu gedacht dabei zu unterstützen körperliche Einschränkungen wahrzunehmen und zu überwinden.', media: '', headline1: '', media1: '', text1: 'Mit verschiedenen Übungen kann der Fokus auf verschiedene Körperbereiche gelegt und dabei Einschränkungen oder Blokaden identifiziert werden. Mit regelmäsiger Übung lassen sich diese Blokaden dann auflösen.', headline2: '', media2: '', text2: 'Stück für Stück erreichst du eine bessere Körperwahrnemung und lernst einen bewusteren Umgang mit deinem Körper, auch im Alltag.', headline3: 'Die Haltungen', media3: '', text3: 'Die meisten Haltungen sind in drei Kategorien eingeteilt: stehend, sitzend und liegend. Diese Haltungen spiegeln die Alltagshaltungen wieder. Zusätzlich gibt es noch komplexere Haltungen, die nicht direkt von einem dieser drei Zustände abgeleitet sind.', headline4: 'Schwierigkeit', media4: '', text4: 'Grundsätzlich gillt, je schwieriger und komplexer die Haltung, desto spezieller sind die Orte am eigenen Körper die man damit in den Fokus rücken kann. Bevor du dich daher an sehr schwierige Haltungen heranwagst, solltest du die weniger schwierigen Haltungen ohne Schmerzen und Einschränkungen gut halten können. Um Verletzungen zu vermeiden suche am besten einen Yoga Kurs, bei dem dir neue Haltungen gezeigt und Fehlhaltungen korrigiert werden.', headline5: 'Abwandlung', media5: '', text5: 'Keine Angst, Yoga ist keine starre Hierarchie von Schwierigkeitsstufen die du nach und nach absolvieren musst. Mit dem kreativen Einsatz der richtigen Hilfsmittel kannst du dich auch schon an Haltungen herantrauen die noch zu schwierig sind. ', headline6: '', media6: '', text6: 'Fühlst du dich bei einem freistehendem Asana noch zu unsicher, versuche es an einer Wand. Erreichst du in einer Haltung zum Abstützen noch nicht den Boden benutze Klötze. Mit Hilfsmitteln kannst du die verschiedenen Haltungen zu weniger schwierigen abwandeln. Über die Zeit näherst du dich dann der Haltung an, bis du diese ohne Hilfsmittel richtig und sicher halten kannst. ', outro: '', quote: ''}  },
{ id: 'Yoga Praxis_ArtenvonYoga', order: 4, topic: 'Yoga Praxis', category: 'yoga', lesson: 'Arten von Yoga', icon: '', content: {intro: '', media: '', headline1: 'Welches Yoga ist das richtige?', media1: '', text1: 'Wenn du im Internet nach einem Yogastudio suchst wirst du wahrscheinlich schnell auf eine ganze Reihe verschiedener Yoga "Arten" stoßen, die dort angeboten werden. Welche für dich die richtige ist musst du individuell für dich herausfinden.', headline2: 'Yoga ist wie Fahrradfahren', media2: '', text2: 'Bevor du dich auf deinen Drahtesel schwingst und losradelst musst du erst einmal lernen Fahrrad zu fahren. Am Anfang am besten an einem sicheren Ort ohne andere Verkehrsteilnehmer und mit Hilfsmittel wie Stützrädern. Früher oder später kannst du dann ohne Stützräder fahren, kannst sicher das Gleichgewicht halten und bist irgendwann so sicher, dass du ohne Probleme Handzeichen geben kannst und sicher am Straßenverkehr teilnehmen kannst. Du hast also alle Grundlagen des Fahrradfahrens verinnerlicht. Danach bist du frei, wie du diese neue Fähigkeit einsetzt. Fährst du damit einfach nur zur Arbeit, unternimmst du in deiner Freizeit lange Fahrradtouren mit Freunden, Radlest du zur Entspannung mit dem Mountain-Bike durch die Natur oder fährst du mit sportlichem Ehrgeiz Radrennen? Du entscheidest dich für die Disziplin, bei der du dich am wohlsten fühlst.', headline3: '', media3: '', text3: 'Bei den in Yogastudios angebotenen Disziplinen verhällt es sich ähnlich. Im Kern geht es immer um die gleichen Asanas. Grundlage ist also immer das Beherrschen der verschiedenen Haltungen. Nur die Art der Yogapraxis unterscheidet sich dann, also z.B. sehr dynamische Wechsel zwischen den Haltungen oder statische ausdauernde Haltungen. Dabei ist grundsätzlich keine Art besser als die andere. Du must die für dich richtige Art finden.', headline4: 'Darauf solltest du achten:', media4: '<ul><li>Egal welche Art von Yoga du praktizierst, die Grundlagen sind immer die Asanas. Achte also darauf, dass du das Wissen und die Fähigkeit hast die Haltungen richtig auszuführen ohne dich dabei zu verletzten.</li><li>Am Anfang deiner Yogakarriere ist eine langsamere Yoga Art zu empfehlen, bei der du die Asanas von Grund auf richtig lernen kannst.</li><li>Lass dich nicht durch Gruppenzwang oder falschem Ehrgeiz zu Asanas hinreisen, bei denen du dich nicht sicher fühlst.</li><li>Nutze Hilfsmittel.</li><li>Wenn du dir Schmerzen oder Schaden zufügst ist es kein Yoga mehr.</li></ul>', text4: '', headline5: 'Der Ursprung', media5: '', text5: 'Asanas sind nur eine von sechs Teildisziplinen die den Kern von Yoga ausmachen. Die Asanas beschreiben die Haltungen also die körperliche Komponente. Konzepte für die Durchführung und Abfolge der Asanas sind später entstanden.', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Yoga Praxis_ĀsanaFolge', order: 5, topic: 'Yoga Praxis', category: 'yoga', lesson: 'Āsana Folge', icon: '', content: {intro: 'Wie bei allem gilt auch beim Yoga: Übung macht den Meister.', media: '', headline1: 'Routinen', media1: '', text1: 'Damit dir das regelmäßige Üben leicht fällt ist es gut eine Routine zu etablieren. Im besten Fall baust du in deinen Tagesablauf ein festes Zeitfenster ein an dem du dir Zeit für Yoga nimmst. Nach wenigen Wochen hat sich dann die Routine etabliert und du kannst regelmäßig ohne großen Aufwand oder Überwindung üben. ', headline2: 'Kein Autopilot', media2: '', text2: 'Routinen sind sehr nützlich um sich Freiräume für das Üben zu schaffen. Während des Übens solltest du aber auf Routinen verzichten.', headline3: '', media3: '', text3: 'Immer die gleichen Asanas in immer der gleichen Abfolge können für einen Zeitraum sinvoll sein, um einen gezielten Übungszweck zu verfolgen. Gleichzeitig besteht die Gefahr, dass dann im "Autopilot" einfach nur vor sich hin geübt wird. Die bewusste Körperwahrnehmung in den Haltungen findet dann nichtmehr oder nichtmehr so intensiv statt und der Übungseffekt ist deutlich geringer.', headline4: 'Tipps für deine Asana Folge', media4: '<ul><li>Setze dir ein bestimmtes Zeitfenster in dem du ungestört üben kannst. Als Anfänger oder Anfängerin solltest du dir pro Asana mindestens 2 bis 5 Minuten Zeit nehmen. Davon ausgehend kannst du dir die Anzahl an Asanas ableiten, die du ohne Stress gut schaffen kannst.</li><li>Starte im Stehen, gehe dann zu sitzenden Haltungen über und beende mit liegenden Asanas. </li><li>Achte darauf, dass du die Intensität und Schwierigkeit langsam steigerst und zum Ende hin wieder reduzierst.</li>', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'marmas_Intro', order: 6, topic: 'marmas', category: 'marmas', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'In diesem Kapitel geht es um Marmas.', media: '', headline1: '', media1: '', text1: 'Das Konzept der Marmas mag in der heutigen Zeit mit moderner Medizin etwas veraltet wirken, liefert aber nach wie vor gute Dienste. ', headline2: '', media2: '', text2: 'Marmas beschreiben besondere Punkte im Körper. Diese besonderen Marma Punkte können uns dabei helfen ein besseres Körpergefühl zu entwickeln und uns in unserer Yogapraxis unterstützen. ', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'marmas_Basics', order: 7, topic: 'marmas', category: 'marmas', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Ein Marma ist ein bedeutsamer, vitaler Ort im Körper eines Menschen.', media: '', headline1: 'Herkunft', media1: '', text1: 'Marmas kommen aus der ayurvedischen Biologie. “Es sind die zentralen Stellen am menschlichen Körper, die sensitiv, verletztbar sind. Sie liegen offen da und sind durch Unfälle, Krankheit oder Angriffe besonders gefährdet. Verletzungen können zur invalidität führen, bzw. totbringend sein.” ¹', headline2: 'Marmas im Yoga-Kontext', media2: '', text2: 'In der Yogapraxis können uns die Marmapunkte helfen  unseren Körper wahrzunehmen.', headline3: '', media3: '', text3: 'Während es unmöglich ist alle Musklen in unserem Arm einzeln wahrzunehmen und anzusteuern ist es deutlich leichter zu denken "ich greife nach dem Glas". Das gelernte automatische Bewegungsmuster der Muskeln befähigt uns dann das Glas sicher zu greifen.', headline4: '', media4: '', text4: 'Genauso helfen uns die Marmapunkte die Haltungsmuster im Yoga besser einzuüben und wahrzunehmen. Mit einer guten Kenntniss der wichtigsten Punkte im Körper und einer guten Wahrnehmeung an diesen Stellen können Fehlhaltungen selbst erkannt und verbessert werden.', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: '1) Yoga Ein Weg für dich, Reinhard Bögele 1996, Seite 43'}  },
{ id: 'marmas_MarmaGruppen', order: 8, topic: 'marmas', category: 'marmas', lesson: 'Marma Gruppen', icon: 'marmas.webp', content: {intro: '', media: '', headline1: 'Sehnen-Marma (Snāyu स्नायु)', media1: '', text1: 'Sehnen-Marmas sind im Yoga die kraftvollen Halteorte. Sie sind der Ort für schnelle, dynamische Bewegung sowie für Entspannung.', headline2: 'Muskel-Marma (Māṃsa मांस)', media2: '', text2: 'Im Yoga helfen uns die Muskel-Marmas gezielt Orte zu enstpannen oder auszudehnen und zu strecken. Muskeln übernehmen die Feinmotorik.', headline3: 'Knochen-Marma (Asthi अस्थि)', media3: '', text3: 'Knochen haben auch im Yoga eine stützende Funktion. Sie sind der Ansatzpunkt für die Sehnen.', headline4: 'Blutgefäß-Marma (Sirā सिरा)', media4: '', text4: 'Im Yoga möchten wir Blut und Nervenbahnen nicht blockieren, sondern einen guten Fluss ermöglichen. Die Blutfluss-Marmas helfen uns Blokaden zu erkennen und zu vermeiden.', headline5: 'Gelenk-Marma (Sandhi सन्धि)', media5: '', text5: 'Ein Gelenk ist eine stabile Verbindung von zwei oder mehr Knochen. Gelneke sind die Koordinationsorte von Bewegungen.', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'marmas_DasKonzept', order: 9, topic: 'marmas', category: 'marmas', lesson: 'Das Konzept', icon: 'concept-icon.webp', content: {intro: 'Das in Gom beschriebene Yogakonzept geht auf das Yoga Forum München e.V. und Reinhard Bögele zurück.', media: '', headline1: 'Geschichte', media1: '', text1: 'Die Yogalehre wurde über sehr viele Generationen von Lehrer*in zu Schüler*in weitergegeben und hat sich stetig weiterentwickelt. T. Krishnamacharya (1888 - 1989) gillt als Vater des modernen Yoga. Er verband die Yogalehre auch mit den Lehren des Ayurveda. Einer seiner bekanntesten Schüler ist B. K. S. Iyengar. Sein Yogastiel zeichnet sich durch genaue Ausrichtung des Körpers in den Haltungen und vorallem das Nutzen von der Hilfsmitteln aus. Die enge Verknüpfung zwischen Yoga und der Marmalehre hat Rocque Lobo geprägt.', headline2: 'Die Marmalehre', media2: '<span class="justify">Reinhard Bögele greift das Konzept von Roque Lobo auf. In dem von Ihm entwickelten Konzept wird Yoga in seiner ursprünglichen Form vermittelt. Außerdem wird es mit Wissen aus den Partnerdisziplinen Samkya und Ayurveda angereichert.</span>', text2: 'Ein zentrales Thema ist die Marmalehre mit der Bögele die Brücke schlägt zwischen der Gesundheitslehre Ayurveda und Yoga. Beides zusammen liefert ein gutes Fundament für einen gesunden Umgang mit sich und seinem Körper.', headline3: '', media3: '', text3: 'Auch in Gom ist die Marmalehre das zentrale Element. Das Yogakonzept des Yoga Forum München e.V. Wird außerdem an vielen weiteren Stellen aufgegriffen.', headline4: 'Mehr Informationen', media4: '', text4: 'Mehr über die Marmas und das Yogakonzept erfahrst du in diesem Buch: ', headline5: '', media5: '<div><p style="text-align:center;">Praxisbuch</p><p style="text-align:center;">AYURVEDA YOGA</p><p style="text-align:center;">Mehr Energie durch Marma-Übungen</p><p style="text-align:center;">Reinhard Bögele</p></div>', text5: '', headline6: '', media6: '', text6: 'Im Buch findest du neben anschaulichen Grafiken und Erklärungen zu den Marmas auch Übungsanleitungen und noch mehr Hintergründe.', outro: '', quote: ''}  },
{ id: 'marmas_funfacts', order: 10, topic: 'marmas', category: 'marmas', lesson: 'fun facts', icon: 'fact-icon.webp', content: {intro: 'Weitere Fakten über Marmas', media: '', headline1: '', media1: '', text1: 'Marma wird im Sanskrit मर्म geschrieben. Die sprachliche Wurzel “mr" heißt sterben. Marman heißt unter anderem der Kern, das Herz einer Sache.', headline2: '', media2: '', text2: 'Es gibt insgesammt 107 Marmas die in 5 Gruppen unterteilt sind: Sehnen-Marmas, Muskel-Marmas, Knochen-Marmas, Blutgefäß-Marma und Gelenk-Marmas.', headline3: '', media3: '', text3: 'Zuerst ausführlich erwähnt wurden Marmas vom Chirurgen Sushruta ca 150 v. Chr. ', headline4: '', media4: '', text4: 'In der ayurvedischen Medizin haben Marmas 7 Bereiche: 3 Doshas und 3 Gunas (Prakriti) und Purusha.', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'fuß_Intro', order: 11, topic: 'fuß', category: 'anatomy', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Der Fuß ist das Fundament für unseren Körper. Eine gute, gesunde Körperaltung beginnt also schon mit der richtigen Fußhaltung.', media: '', headline1: '', media1: '', text1: 'Im Yoga-Kontext ist der Fuß vergleichbar mit den Wurzeln eines Baumes: stützend und nährend. Diese stützende Rolle ist nicht nur in stehenden, sondern auch in sitzenden oder liegenden Haltungen wichtig.', headline2: '', media2: '', text2: 'Im nächsten Abschnitt lernen wir mehr über die Anatomie des Fußes.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'fuß_Anatomie', order: 12, topic: 'fuß', category: 'anatomy', lesson: 'Anatomie', icon: 'anatomy-icon.webp', content: {intro: 'Schauen wir uns den Fuß von den verschiedenen Seiten an:', media: '<iframe src="foot/anatomy_foot.html?footStyle=1"></iframe>', headline1: 'Obenansicht', media1: '<img src="foot/oberseite.png">', text1: 'Die Oberseite des Fußes wird Fußrücken genannt. Aus dieser Perspektive sehen wir gut die verschiedenen Bereiche: Das Fersenbein und Sprungbein (rot) zusammen mit den Kahn- und Keilbeinen (grün) bilden die Fußwurzel. Der Mittelfuß mit den fünf Mittelfußknochen ist blau eignegfärbt. Die Zehen, bestehend aus Grund-, Mittel- und Endgliedern sind gelb gekennzeichnet.', headline2: 'Außenansicht', media2: '<img src="foot/ausenseite.png">', text2: 'In der Außenansicht (Kleinzehenseite) sehen wir, dass der Fuß nur am hinteren Fersenknochen und erst wieder vorne am Ende des Mittelfußes und an den Zehen auf dem Boden aufsteht.', headline3: 'Innenansicht', media3: '<img src="foot/innenseite.png">', text3: 'Auch in der Innenansicht (Großzehenseite) sehen wir, dass der Fuß auf dem hinteren Teil der Ferse und erst wieder vorne am Ende des Mittelfußknochens  auf dem Boden steht.', headline4: 'Untenansicht', media4: '<img src="foot/unterseite.png">', text4: 'Betrachten wir die Fußsohle, also den Fuß von unten, fällt der stabile Fersenhöcker auf, der die Last des Körpers aufnehmen kann.', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'fuß_GelenkeimFuß', order: 13, topic: 'fuß', category: 'anatomy', lesson: 'Gelenke im Fuß', icon: 'leg-icon.webp', content: {intro: 'Das Fußgelenk ist die Verbindung zwischen Wadenbein und Fuß. Insgesammt gibt es im Fuß 33 Gelenke.', media: '', headline1: 'Gelenke der Fußwurzel', media1: '', text1: 'Neben den Gelenken zwischen den Zehengliedern gibt es auch gelenkige Verbindungen zwischen dem Fersenknochen (rot) und dem Fußwurzelknochen (gelb), dem Sprungbein (grün) und dem Fußwurzelknochen, sowie dem Fersenknochen und dem Sprungbein. Die einzelnen Fußwurzelknochen fungieren hier als zwei Fußwurzelpakete, da diese insich eher starr sind.', headline2: '', media2: '<iframe src="foot/anatomy_foot.html?footStyle=2"></iframe>', text2: 'Diese gelenkigen Verbindungen haben nur einen sehr kleinen Bewegungsspielraum und sind dafür verantwortlich, dass der Fuß in sich richtig zentriert gehalten werden kann.', headline3: 'Gelenke der Längsachse', media3: '', text3: 'Eine weitere Möglichkeit die Beweglichkeit des Fußes zu betrachten ist enlang der Längsachse des Fußes, also von der Ferse bis zu den Zehengliedern.', headline4: '', media4: '<iframe src="foot/anatomy_foot.html?footStyle=3"></iframe>', text4: 'Entlang der Innenseite (rot & grün): Ferse, Fußwurzelknochen, Mittelfußknochen der  4. + 5. Zehe mit Zehengrundlgliedern bis zu den Mittel- und Endgliedern. Auf der Außenseite (rot + gelb) des Fußes geht es entlang des Sprungbeins, über das Fußwurzelknochenpaket über die Mittelfußknochen bis zu den Zehengrund-, Mittel- und Endgliedern der Zehen 1 bis 3.', headline5: 'Verdrehungen im Fuß', media5: '', text5: 'Ziel ist es das meiste Gewicht hinten mittig auf den Fußhöcker der Ferse sowie etwas Gewicht vorne am Ende des Mittelfußknochen zu bekommen.', headline6: '', media6: '', text6: 'Wenn das Gewicht vor dem Fußhöcker auf dem Boden aufkommt, sinkt die vordere Ferse, das Sprungbein und die Fußwurzelpakte ab und es entsteht der Plattfuß. Gewicht zu weit hinten am Fersenhöcker kann zu einem Hohlfuß führen. Gewicht zu weit innen könnte einen Knick-Platt-Spreitsfuß oder einen Hallux Valgus hervorrufen. Gewicht zu weit außen führt zu instabilität und Umknicken und in der Folge zu Belastung der Bänder.*', outro: 'Probleme der Fußstellungen können sich bis oben zum Nacken auswirken. Auch Fehlstellungen von oben können sich nach unten auf den Fuß auswirken.', quote: '*Beschriebene Sachverhalte sind nicht als medizinischer Rat aufzufassen.'}  },
{ id: 'fuß_Wahrnehmung', order: 14, topic: 'fuß', category: 'anatomy', lesson: 'Wahrnehmung', icon: 'perception-icon.webp', content: {intro: '', media: '', headline1: 'Stimmulieren der Ferse', media1: '', text1: 'Wahrnehmungsübungen um den vorderen, nach oben stützenden Teil des Fersenknoches zu stimulieren.', headline2: '', media2: '<img src="foot/wahrnehmung1.1.webp">', text2: '', headline3: '', media3: '', text3: 'Rolle das Mattenende etwas zusammen. Stelle dich mit beiden Füßen auf das zusammengerollte Mattenende. Spüre, wie das Gewicht am Fersenhöcker ankommt und der vordere Teil der Ferse nach oben stützt.', headline4: '', media4: '<img src="foot/wahrnehmung2.1.webp">', text4: 'Die vordere Ferse kann auch mit einem Band stimmuliert werden. Dies hat den Vorteil, dass auch in sitzenden oder liegenden Haltugen eine Stimmulanz der Stützachse Ferse und Bein gegeben werden kann.', headline5: 'Fußlängsachse', media5: '<img src="foot/wahrnehmung3.webp">', text5: '', headline6: '', media6: '', text6: 'Stell einen Fuß auf die Mattenkante. Platziere den Fuß so, dass du mit der Ferse halb auf der Matte und halb neben der Matte stehst. Platziere den Fuß so, dass die Mattenkante genau zwischen dem 2. und 3. Zeh verläuft.', outro: '', quote: ''}  },
{ id: 'Gewebearten_Intro', order: 15, topic: 'Gewebearten', category: 'anatomy', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Der menschliche Körper besteht aus vier Gewebetypen.', media: '', headline1: '', media1: '', text1: 'Im Folgenden lernen wir die vier Gewebetypen und Ihren Aufbau bzw. deren Funktionen kennen.', headline2: '', media2: '', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Gewebearten_DievierGewebearten', order: 16, topic: 'Gewebearten', category: 'anatomy', lesson: 'Die vier Gewebearten', icon: 'tissue-icon.webp', content: {intro: 'Der Körper des Menschen hat grundsätzlich die gleichen Strukturen wie jeder Säugetier-Körper. Man kann vier Gewebetypen für den Aufbau des Körpers unterscheiden.', media: '', headline1: 'Binde- und Stützgewebe', media1: '', text1: 'Binde- und Stützgewebe hat, wie der Name verrät, meist eine stützende oder formgebende Funktion. Der Einsatz und die Beschaffenheit ist sehr vielseitig. Du findest es als Fett, Sehnen oder Knochengewebe aber auch als lockeres Gewebe z.B. Um Organe.', headline2: 'Muskelgewebe', media2: '', text2: 'Muskelgewebe ist das einzige Gewebe, welches kontrahieren kann. Dadurch wird Bewegung erst möglich. Zum Arbeiten brauchen Muskeln als Brennstoff ATP (Adenosintriphosphat) und Sauerstoff. Muskeln bestehen zu 60 % aus Protein.', headline3: 'Epithelgewebe', media3: '', text3: 'Das Epithelgewebe bedeckt fast alle inneren und äußeren Körperflächen bzw. Drüsen. Du findest es in der Oberhaut und Lunge. Es übernimmt die Aufgaben Stoffabgabe, Schutz sowie Sekretion.', headline4: 'Nervengewebe', media4: '', text4: 'Das Nervengewebe ist anders aufgebaut als die anderen Gewebearten: Es besteht aus einer flüssigen, zähen, weißen Masse, ähnlich gegrillten Marshmallows. In einer bindegewebigen Hülle befindet sich eine Masse aus Protein und Fett . Zu den Aufgaben zählt die Steuerung des Grund-Tonus und alle anderen Funktionen der Muskeln (z.B. Gelenkstellung, Muskelkontraktion). Außerdem natürlich die Reizübertragung an das Gehirn.', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Sehnen-Marmas_Intro', order: 17, topic: 'Sehnen-Marmas', category: 'marmas', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'In diesem Kapitel lernen wir die Sehnen-Marmas kennen, die erste der 5 Marmagruppen.', media: '', headline1: '', media1: '', text1: 'Du darfst dich nicht nur über Hintergründe zu den Kraftorten freuen, sondern kannst auch etwas über die Sehnen selbst erfahren.', headline2: '', media2: '', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Sehnen-Marmas_Basics', order: 18, topic: 'Sehnen-Marmas', category: 'marmas', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Sehnen-Marmas sind im Yoga die kraftvollen Halteorte. Sie sind der Ort für schnelle dynamische Bewegung sowie für Entspannung.', media: '', headline1: 'Was sind Sehnen?', media1: '', text1: 'Sehnen bestehen aus straffen Bingewebe und aus kollagenen Fasern. Sie haben eine hohe Zugfestigkeit und dehnen sich nur sehr wenig. Sehnen sind die Verbindung zwischen Knochen und Muskeln und übertragen die Kraft.', headline2: 'Eigenschaften der Sehnen im Yoga-Kontext', media2: '', text2: 'Mit Sehnen können z.B. die Eigenschaften stabil, schnell und glatt verknüpft werden.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Sehnen-Marmas_YogaPraxis', order: 19, topic: 'Sehnen-Marmas', category: 'marmas', lesson: 'Yoga Praxis', icon: 'yoga-icon.webp', content: {intro: 'Im Yoga wollen wir uns die kraftvolle, stabile Struktur der Sehnen zu nutze machen.', media: '', headline1: 'Haltearbeit', media1: '', text1: 'Oft wird die Haltearbeit von unseren Muskeln übernommen, meist unbewust. In den Yoga Haltungen wollen wir die Muskeln so weit wie möglich entspannen und die Haltearbeit über die Knochenstütze und die Sehnen leisten.', headline2: 'Kraftort', media2: '', text2: 'Sehnen sind wichtige Kraftorte und stützen den Körper. Angespannt sind sie bereit die Kraft freizusetzten und kraftvolle, schnelle, dynamische Bewegungen auszulösen.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'yogas_Intro', order: 20, topic: 'yogas', category: 'yoga', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Beim Yoga dreht sich nicht alles nur um das rein Körperliche, also die Haltungen oder Bewegungsabläufe. Unter anderem hat Yoga auch eine mentale bzw. psychische Komponente. ', media: '', headline1: '', media1: '', text1: 'In diesem Abschnitt lernen wir kennen, wie wir besser auf uns und unsere Bedürfnisse achten können.', headline2: '', media2: '', text2: 'Außerdem lernen wir Ahimsa kennen. Eine Erinnerung "nicht feindselig" mit unserem Umfeld sowie mit uns selbst zu sein.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'yogas_Die4Yogas', order: 21, topic: 'yogas', category: 'yoga', lesson: 'Die 4 Yogas', icon: 'yoga-icon.webp', content: {intro: 'Aus Yogasicht gibt es vier Beziehungsqualitäten', media: '', headline1: 'ati (अति) ', media1: '', text1: 'zu viel, sehr, übermäßig, extrem', headline2: 'hīna (हीन)', media2: '', text2: 'zu wenig, ohne, leer sein von', headline3: 'mithyā (मिथ्या)', media3: '', text3: 'falsch, unwahr, unwirklich', headline4: 'śam (शम्)', media4: '', text4: 'das passende, Wohlergehen, Wohlstand, Segen, Gesundheit', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: 'Im Yoga wollen wir über die Zeit ein Gefühl für das Richtige und das Passende bekommen.', quote: ''}  },
{ id: 'yogas_DasPassende', order: 22, topic: 'yogas', category: 'yoga', lesson: 'Das Passende', icon: 'check-icon.webp', content: {intro: 'Bei der Frage was gerade passend ist, sollte immer die aktuelle Ausgangssituation betrachtet werden.', media: '', headline1: 'Die Umstände stehen immer mit auf der Matte.', media1: '', text1: 'Hast du beispielsweise schlecht geschlafen, kannst du ruhiger und aufmerksamer in die Übungen gehen, damit diese auch gelingen. Fühlst su dich fit und voller Energie kannst du etwas intensivere Haltungen probieren oder die Haltungen länger halten.', headline2: '', media2: '', text2: 'Wenn du die Umstände bewusst betrachtest, kannst du einen für dich passenden Umgang damit finden.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'yogas_Ahiṃsā', order: 23, topic: 'yogas', category: 'yoga', lesson: 'Ahiṃsā', icon: 'peace-icon.webp', content: {intro: 'अहिंसा = nicht feindselig', media: '', headline1: '', media1: '', text1: 'Ahimsa ist eine der ethischen Regeln bzw. moralische Richtlinie im Yoga. Ahimsa ist keine konkrete Verhaltensregel. Das Gute soll verstärkt werden, das negative reduziert.', headline2: '', media2: '', text2: 'Gemeint ist die “nicht Feindseligkeit” gegenüber anderen, soll aber auch auf sich selbst übertragen werden. Ahimsa setzt sich zusammen aus a = nicht himsa = feindselig.', headline3: 'Beispiele für die Feindseligkeit gegenüber anderen:', media3: '<ul><li>Gewalt</li><li>Hass</li><li>Missgunst</li><li>Lüge</li></ul>', text3: '', headline4: 'Beispiele für die Feindseligkeit gegenüber sich selbst:', media4: '<ul><li>Hunger haben aber nicht essen</li><li>Müde sein aber nicht schlafen</li><li>über sich selbst ärgern</li><li>dir selbst unnötigen Schmerz zufügen</li></ul>', text4: '', headline5: 'Ahiṃsā in der Yoga Praxis', media5: '', text5: 'Auch in der Yogapraxis wollen wir nicht feindselig mit uns und unserem Körper sein. Wir wollen keinen Ehrgeiz, keine Überbelastung und Schmerzen, keine Enttäuschung oder Wut wenn etwas nicht klappt.', headline6: '', media6: '', text6: 'Im Yoga kümmern wir uns um unser Wohlbefinden und wissen, dass Yoga eine Lebensaufgabe ist.', outro: '', quote: ''}  },
{ id: 'Übung_Intro', order: 24, topic: 'Übung', category: 'yoga', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Yoga üben ist leider manchmal mit Rückschlägen verbunden.', media: '', headline1: '', media1: '', text1: 'Übungen die schon gut geklappt haben funktionieren plötzlich nicht mehr so gut. Plötzlich meldet sich ein Zwicken, das man vorher nicht gespürt hat.', headline2: '', media2: '', text2: 'In diesem Abschnitt schauen wir uns an wie wir mit solchen Erfahrungen umgehen können.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Übung_Schwankungen', order: 25, topic: 'Übung', category: 'yoga', lesson: 'Schwankungen', icon: 'graph-icon.webp', content: {intro: 'Beim Üben ist es normal, wenn etwas mal besser und mal wieder schlechter klappt.', media: '', headline1: '', media1: '', text1: 'Wenn es einmal funktioniert hat - und sei es „nur“ unter Anleitung – ist diese Erfahrung ein wichtiger Schritt. Ein wichtiger Zwischenschritt beim Übergang von „Ich kann mir gar nicht vorstellen, wie das gehen soll“ zu „Jetzt klappt es schon gut“.', headline2: 'Die Zeit ist unser Freund', media2: '', text2: 'Nur über die Zeit bekommen wir Schritt für Schritt ein besseres Gefühl und Verständniss wie es sich anfühlen muss. ', headline3: '', media3: '', text3: 'Auch das Nervensystemmuss das neue Muster erst lernen. Dabei ist es völlig normal, dass wir immer wieder in ein altes Muster zurückfällen. Über die Zeit wird sich mit konstantem Üben das neue Muster festigen.', headline4: 'Yoga ist ein Prozess', media4: '', text4: 'Yoga ist keine Disziplin, bei der man ein bestimmtes Ziel erreichen möchte und mit Erreichen des Ziels dann diese Disziplin gemeistert hat. Viel mehr ist es ein konstantes Beschäftigen mit sich und seinem Körper und den ständigen Veränderungen.', headline5: '', media5: '', text5: 'Das konstante Bewerten des eigenen „Fortschritts“ ist dabei eher hinderlich. Scheinbare Rückschritte lösen frustration aus, während eigentlich ein großer Vortschritt erziehlt worden ist. ', headline6: '', media6: '', text6: 'Das Bewusst machen und Reflektieren des aktuellen Ist-Zustandes ohne zu Bewerten ist erwünscht. Auch diese Herangehensweise braucht viel Übung. ', outro: 'Was zunächst also wie eine Verschlechterung wirkt ist eigentlich ein großer Vortschritt.', quote: ''}  },
{ id: 'Übung_Verschlechterung', order: 26, topic: 'Übung', category: 'yoga', lesson: 'Verschlechterung', icon: 'personal-growth-icon.webp', content: {intro: 'Yoga ist ein aufdeckendes Verfahren.', media: '', headline1: '', media1: '', text1: 'Wenn eine Übung mit der Zeit schlechter funktioniert oder auf einmal ein Zwicken, Druck oder Schmerzen spürbar sind muss das nicht bedeuten, dass du dich beim Üben verschlechtert hast. Vielmehr kannst du überlegen und prüfen, ob das Thema schon vorher existiert hat und nun erst bewust geworden ist.', headline2: '', media2: '', text2: 'Manchmal wird eine Fehlhaltung an einer Körperstelle durch eine Fehlhaltung an anderer Stelle kompensiert. Hast du es nun geschafft eine der Fehlhaltungen zu korrigieren, kann es sein, dass sich plötzlich eine ganz andere Körperstelle meldet. ', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: 'Was zunächst also wie eine Verschlechterung wirkt ist eigentlich ein großer Vortschritt.', quote: ''}  },
{ id: 'Übung_Kopfsache', order: 27, topic: 'Übung', category: 'yoga', lesson: 'Kopfsache', icon: 'relax-icon.webp', content: {intro: 'Ca. 60 % von Yoga findet im Kopf statt.', media: '', headline1: '', media1: '', text1: 'Es ist sehr wichtig die wesentlichen Orte im Körper zu kennen, damit wir dort hindenken, sie spüren und ansteuern können. Am Anfang ist es schon ein großer Gewinn, einordnen zu können, wenn sich ein Ort von selbst meldet.', headline2: '', media2: '', text2: 'Deshalb ist es gut sich mit den Marmas zu beschäftigen. Wenn dabei manche Marmas in den Vordergrund rücken und andere vielleicht etwas in den Hintergrund, ist das vollkommen in Ordnung. Es gibt hier keinen fest vorgeschriebenen Zeitplan, nach dem alle Marmas erfahren worden sein sollten. Die Erfahrungen entwickeln sich mit der Zeit und bei jedem individuell. Du lernst ein Leben lang.', headline3: '4 Schritte für die Durchführung einer Übung', media3: '<ol><li>An den Ort denken.</li><li>Prüfen, ist der Ort erreicht?</li><li>Richtung denken.</li><li>Prüfen, richtige Richtung erreicht? </li></ol>', text3: '', headline4: '', media4: '', text4: 'Beschränke dich mit deiner fokussierter Aufmerksamkeit auf ein oder zwei Orte, der Rest organisiert sich mit!', headline5: '', media5: '', text5: 'Tipp: Oft ist es hilfreich das Gehirn beim Wahrnehmen "entspannt zurückzulehnen". Sich hineinzusteigern beeinträchtigt die Erfahrung.', headline6: '', media6: '', text6: '', outro: '“Man muss es denken können.”', quote: ''}  },
{ id: 'Übung_3Sekunden-Regel', order: 28, topic: 'Übung', category: 'yoga', lesson: '3 Sekunden-Regel', icon: 'wait-sandclock-icon.webp', content: {intro: 'Laut dem Münchner Hirnforscher Ernst Pöppel strukturiert unser Bewusstsein die Wahrnehmung der Gegenwart in „Drei-Sekunden-Einheiten“, auch bekannt als die Drei-Sekunden-Regel.', media: '', headline1: '', media1: '', text1: 'Das heißt nur alle 3 Sekunden macht unser Gehirn eine "Bestandsaufname" der aktuellen Sinnenseindrücke.', headline2: '', media2: '', text2: 'Für Yoga bedeutet das, damit Eindrücke wirklich erfasst und gespeichert werden können sollte dem Bewustsein Zeit gegeben werden diese zu erfassen. Das ständige Nachkorrigieren in einer Haltung kann daher manchmal hinderlich sein.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: 'Pöppel,  E.  (1997).  Grenzen des Bewusstseins: wie kommen wir zur Zeit, und wie entsteht Wirklichkeit?.  Deutschland:  Insel-Verlag.'}  },
{ id: 'Verletzungen_Verletzung', order: 29, topic: 'Verletzungen', category: 'yoga', lesson: 'Verletzung', icon: 'medical-briefcase-icon.webp', content: {intro: 'Körperliche Einschränkungen wie z. B. Verletzungen bedeuten nicht unbedingt, dass man mit Yoga pausieren muss.', media: '', headline1: 'Schonen', media1: '', text1: 'Wird ein Körperteil verletzt, muss dieser geschont werden. Die Übungen werden dementsprechend sorgfältig ausgewählt und angepasst, sodass die Heilung des betroffenen Körperteils nicht beeinträchtigt wird.', headline2: 'Yoga findet zuerst im Kopf statt', media2: '', text2: 'Der verletzte Körperteil kann beim Wahrnehmen mit einbezogen werden. Mit den gesunden Körperteilen kann weiter Yoga geübt werden. Es gibt in der Wissenschaft die Vermutung, dass z.B. über Spiegelneuronen der verletzte Körperteil auch von Übungen mit dem gesunden Körperteil profitiert, also dass die mentale Übung einen Effekt hat.¹ ² Noch ist nicht komplett erforscht, wie dieser Effekt erzeugt werden kann.³ In der Yoga Praxis kann aber festgestellt werden, dass etwas auf einer Seite gelerntes dann leichter auch auf der zweiten Seite zu lernen ist.  Wir sprechen dann auch von einer Lehrer- und einer Schülerseite.', headline3: 'Sekundärer Krankeihtsgewinn', media3: '', text3: 'Sekundärer Krankeihtsgewinn beschreibt, wenn durch eine Verletzung andere positive Effekte auftreten. Widmet man einem bestimmten Marma durch eine Verletzung besonders viel Aufmerksamkeit, kann dieses nach der Verletzung sogar stärker sein als das nicht verletzte Pendant. ', headline4: 'Wichtig', media4: '<ul><li>Yoga sollte nicht aus Pflicht getan werden!</li><li>Yoga ist auch Mittel zur Regeneration bei Krankheit, Stress oder Belastung.</li><li>Yoga Unterstützungsmittel nutzen (Klötze, Rolle, Decke etc.).</li><li>Keine Überbeanspruchung oder Ehrgeiz.</li><li>Beachten der 4 Yogas: passend, verkehrt, zu viel, zu wenig.</li></ul>', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: '1) Ertelt, D., Small, S., Solodkin, A., Dettmers, C., McNamara, A., Binkofski, F., & Buccino, G. (2007). Action observation has a positive impact on rehabilitation of motor deficits after stroke. NeuroImage, 36 Suppl 2, T164-173. ----- 2) Reiser, M., Büsch, D., and Munzert, J. (2011). Strength gains by motor imagery with different ratios of physical to mental practice. Front. Psychol. 2:194. doi: 10.3389/fpsyg.2011.00194 -----3) Malouin, F., Jackson, P. L., and Richards, C. L. (2013). Towards the integration of mental practice in rehabilitation programs. A critical review. Front. Hum. Neurosci. 7:576. doi: 10.3389/fnhum.2013.00576'}  },
{ id: 'Āyurveda_Intro', order: 30, topic: 'Āyurveda', category: 'ayurveda', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Yoga beschränkt sich nicht allein auf das Üben verschiedener Körperhaltungen. Unter anderem ist Yoga auch ein Auseinandersetzten mit der eigenen Gesundheit.', media: '', headline1: 'Āyurveda das "Wissen vom Leben"', media1: '', text1: 'Ayurveda ist die Gesundheitslehre aus dem alten Indien und entstand ca. 500 v. Chr.', headline2: '', media2: '', text2: 'Trotz oder gerade wegen der langen Tradition sind die Konzepte auch heute noch relevant.', headline3: '', media3: '', text3: 'Da die Lehren des Ayurveda und die Lehren des Yoga sich sehr gut ergänzen, lohnt es sich, im Kontext des Yoga, auch mit Ayurveda zu beschäftigen.', headline4: '', media4: '', text4: 'Begriffe wie marma und ahimsa haben wir schon kennengelernd. In den kommenden Abschnitten werden wir noch ein paar weitere Begriffe und Konzepte kennenlernen, die uns helfen können einen guten und gesunden Umgang mit uns und unserem Körper zu pflegen.', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Āyurveda_Nützlich+angenehm', order: 31, topic: 'Āyurveda', category: 'ayurveda', lesson: 'Nützlich & angenehm', icon: '', content: {intro: 'Im Yoga streben wir nach nützlichem und angenehmen. Dabei steht "nützlich" vor "angehem". ', media: '', headline1: 'Nützlich und angenehm im Yoga', media1: '', text1: 'Alle Handlungen oder Dinge müssen zunächst auf ihre Nützlichkeit geprüft werden. Der Nutzen ist wichtiger als das etwas angenehm ist. Ist etwas nützlich und unangenehm, können oft Wege gefunden werden, es doch möglichst angenehm zu gestalten. Etwas kann nützlich sein, sich aber zunächst nicht angenehm anfühlen.', headline2: 'Nützlich und angenehm in Ayurveda', media2: '<table><tr><td><p>hita (हित)</p><p><das was nützlich ist, das was gesund ist/p><p>(Grundwissen, gesundes, nahrhaftes)</p></td><td><p>ahita (अहित)</p><p>das was unnütz ist, das was ungesund ist</p><p>(ungesundes, Schmerzen aushalten)</p></td></tr><tr><td><p>sukha (सुख)</p><p>das was angenehm ist</p><p>(Freude, Glück, Vergnügen, Zufriedenheit)</p></td><td><p>duḥkha (दुःख)</p><p>das was angenehm ist</p><p>Unglück, Kummer, Elend, Schmerz, Angst, Qual, Bedrängnis, Leid, Ärger, Not, Trübsal)</p></td></tr></table>', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Āyurveda_Vegas', order: 32, topic: 'Āyurveda', category: 'ayurveda', lesson: 'Vegas', icon: '', content: {intro: 'Vega (वेग) bezieht sich auf den „natürlichen Drang“ oder natürlich Bedürfnisse.', media: '', headline1: 'Es gibt 13 Vegas (Rufe der Natur)', media1: '<ul> <li>Schlafen</li><li>Essen</li> <li>Trinken</li><li>Erbrechen</li><li>Stuhlgang</li><li>Urinieren</li><li>Sexualität</li><li>Atmen</li><li>Gähnen</li><li>Niesen</li><li>Rülpsen</li><li>Flatulenz</li><li>Weinen</li></ul>', text1: '', headline2: '', media2: '', text2: 'Wir sollen diesen Rufen der Natur, also den Signalen unseres Körper folgen, um unsere Gesundheit zu erhalten. ', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Gurvādiguṇa_20Gunas', order: 33, topic: 'Gurvādiguṇa', category: 'ayurveda', lesson: '20 Gunas', icon: '', content: {intro: 'Gurvādiguṇa (गुर्वादिगुण) sind im Ayurveda zehn stoffliche Qualitäts Gegensatzpaare.', media: '', headline1: '', media1: '', text1: 'Mit diesen insgesamt 20 gunas, also stofflichen Qualitäten, lassen sich die Qualitäten des Körpers aber auch das gesammte Universum beschreiben.', headline2: '', media2: '<iframe src="20_gunas/20_gunas.html"></iframe>', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Muskel-Marmas_Intro', order: 34, topic: 'Muskel-Marmas', category: 'marmas', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Die zweite Marmagruppe sind die Muskel-Marmas über die du in diesem Kapitel etwas erfährst.', media: '', headline1: '', media1: '', text1: 'Außerdem gibt es noch etwas über die Funktionsweise von Muskeln und Muskelgewebe zu erfahren.', headline2: '', media2: '', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Muskel-Marmas_Basics', order: 35, topic: 'Muskel-Marmas', category: 'marmas', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Im Yoga helfen uns die Muskel-Marmas gezielt Orte zu enstpannen oder auszudehnen und zu strecken. Muskeln übernehmen die Feinmotorik.', media: '', headline1: 'Was sind Muskeln?', media1: '', text1: 'Muskeln bestehen haptsächlich aus zwei Arten von Musklefasern: tonische Fasern für langanhaltende Haltearbeit und phasische Fasern für schnelle, kraftvolle Bewegungen.', headline2: 'Eigenschaften der Muskeln im Yoga-Kontext', media2: '', text2: 'Attribute der Muskeln sind üblicherweise fest, kompakt, hart oder locker und weich.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Muskel-Marmas_Muskelgewebe', order: 36, topic: 'Muskel-Marmas', category: 'marmas', lesson: 'Muskelgewebe', icon: 'muscles-icon.webp', content: {intro: 'Die Skeletmuskulatur hält das Skelett zusammen bzw. gibt diesem Stabilität.', media: '', headline1: 'Aufbau', media1: '', text1: 'Die Verbindung von Knochen und Muskel bilden die Sehnen. Knochen sowie Muskeln werden von einer Haut umhüllt (Knochen-/ Muskelhaut), hieran sind Bänder (bindegewebige Haut) sowie äußerst stabile Sehnen (-platten) kompakt verwachsen.', headline2: 'Muskelfasern', media2: '<p>Muskelfasern können in zwei (Haupt-)Typen unterschieden werden:</p><p>Typ 1 sind die tonischen Fasern. Sie können langanhaltende Haltearbeit leisten und ermüden dabei nur langsam. Die Fasern haben eine rote Färbung.</p><p>Typ 2 sind die phasischen Fasern. Diese Fasern arbeiten schnell und kraftvoll, ermüden aber schnell. Die Fasern haben eine eher weiße Färbung.</p><p>Im Yoga wollen wir vor allem Muskeln mit einem hohen Anteil an tonischen Fasern nutzen, um mit wenig Kraftaufwand lange in den Übungen verharren zu können.</p>', text2: '', headline3: 'Aufgabe', media3: '', text3: 'Ein Muskel kann jeweils nur seine einzige bestimmungsgemäße Funktion ausführen. So muss es für verschiedene Funktionen verschiedene, entgegengesetzte Muskeln geben (Agonist + Antagonist). Zum Besipiel wird für die Armstreckung der Triezeps angezogen (Strecker) für die Beugung des Arms wird der Bizeps (Beuger) angezogen. Ein Muskel kann sich nicht von sich aus wieder strecken. Es braucht den Gegenspieler, bzw. die Schwerkraft.', headline4: 'Bewegung der Muskelfasern', media4: '<iframe src="muscle_marma/muscle contraction.html"></iframe>', text4: 'Wird ein Muskel angespannt, zieht sich das Muskelgewebe zusammen. Wird der Gegenspieler Muskel angespannt, dehnt sich der Muskel und die Muskelphasern.', headline5: '', media5: '', text5: 'Im Yoga liegt das Interesse vor allem an den Streckmuskeln. ', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Muskel-Marmas_Muskelspannung', order: 37, topic: 'Muskel-Marmas', category: 'marmas', lesson: 'Muskelspannung', icon: 'muscles-icon.webp', content: {intro: 'Musklen haben immer eine Grundspannung, selbst beim Schlafen (Muskeltonus)', media: '', headline1: 'Muskelspindel', media1: '', text1: 'Die Muskelspannung wird von den Muskelspindeln gemessen. Muskelspindeln sind Sinnesorgane in den Muskeln, die den Dehnungszustand bzw. die Muskelspannung der Skelettmuskulatur erfassen. ', headline2: '', media2: '', text2: 'Wird ein Muskel stimuliert, wird die Muskelpannung lokal gemessen und vom Gehirn reguliert. Beispiel ist das Füllen eines Gefäßes unter dem Wasserhahn. Das zusätzliche Gewicht führt zu einer Spannungsänderung im Muskel. Das Gehirn reguliert den zusätzlichen Kraftbedarf und das Gefäß kann weiterhin gehalten werden.', headline3: 'Ruhetonus', media3: '', text3: 'Der Ruhetonus beschreibt die Grundspannung eines Muskles, welcher im Normalfall immer vorhanden ist. Im Yoga versuchen wir einen Tonus zu erreichen, bei dem Gelenke ohne Druck, Muskeln ohne zu starkem Zerren und die Blutgefäße frei sind.', headline4: 'Muskelspannung an Psyche und Soziales gekoppelt', media4: '<p>Stressfaktoren oder Krankheit können sich auf Muskelspannung auswirken*:</p><ul><li>depressive Stimmung: Tonus reduziert – schlaff</li><li>ängstliche Stimmung: Tonus erhöht – angespannt</li><li>ständig leichtes Zittern (Spannung) im Körper, auch bei nicht gezielten Bewegungen</li></ul>', text4: '', headline5: 'Wichtig aus yogischer Sicht', media5: '', text5: 'Nur zart an Muskeln ziehen, Stress vermeiden, ein Zuviel vermeiden. ', headline6: '', media6: '', text6: '', outro: '', quote: '*Beschriebene Sachverhalte sind nicht als medizinischer Rat aufzufassen.'}  },
{ id: 'Muskel-Marmas_funfacts', order: 38, topic: 'Muskel-Marmas', category: 'marmas', lesson: 'fun facts', icon: 'fact-icon.webp', content: {intro: '', media: '', headline1: '', media1: '', text1: 'Ein Mensch hat 656 Muskeln. Der stärkse Muskel im menschlichen Körper ist der Kaumuskel.', headline2: '', media2: '', text2: 'Auch im Schlafen und Sitzen bleibt ein Grund-Tonus der Muskeln erhalten, dieser wird nur bei einer großen Narkose ausgeschaltet (einschließlich Atemmuskulatur → Beatmung erforderlich).', headline3: '', media3: '', text3: 'Der Herzmuskel ist eine modifizierte Form der Skeletmuskulatur. Auch die Zungenmuskulatur gehört zur Skeletmuskulatur. Skeletmuskulatur wird auch als quergestreifte Muskulatur bezeichnet.', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Mahābhūta_Intro', order: 39, topic: 'Mahābhūta', category: 'ayurveda', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Eine wichtige Grundlage im Āyurveda sind die 5 Mahābhūtas', media: '', headline1: '', media1: '', text1: 'Die 5 Mahabhutas lassen sich nicht einfach übersetzten ohne die eigentliche Bedeutung zu verlieren. In den folgenden Lektionen wird das Konzept dieses ayurvedischen Fachbefriffs erklärt.', headline2: '', media2: '', text2: 'Damit das abstrakte Konzept etwas greifbarer wird gibt es auch ein paar Beispiele.', headline3: '', media3: '', text3: 'Auf dem Konzept der Mahbuhtas bauen dann weitere Konzepte auf, wie z.B. Die etwas bekannteren 3 Doshas.', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Mahābhūta_Erklärung', order: 40, topic: 'Mahābhūta', category: 'ayurveda', lesson: 'Erklärung', icon: 'start-icon.webp', content: {intro: 'Die Mahabutas sollten wie Fachausdrücke behandelt werden, die nur schwer durch andere Begriffe beschrieben bzw. umschrieben werden können. Im folgenden versuchen wir das abstrakte Konzept etwas besser zu verstehen.', media: '', headline1: 'Fachbegriff Mahbhuta', media1: '', text1: 'Umschreiben kann man die Mahabhutas am ehesten als Eigenschaften oder Attribute. Dabei sind die Mahabhutas aber keine Substanzen oder physischen Einheiten, sondern eher Qualitäten.', headline2: '', media2: '', text2: 'Ein Gegenstand ist die manifestietrte Form verschiedener Mahabhutas, wobei ein Gegenstand immer alle Mahabhutas in verschiedener Konzentration in sich vereint. ', headline3: 'Mahabhutas basieren auf Beobachtungen der 5 Sinne', media3: '', text3: 'Zunächst wirken die Mahbhutas sehr abstrakt. Tatsächlich ist es aber ein physisches Konzept: Die 5 Mahabhutas sind durch die Sinneswahrnehmungen sehen, schmecken, riechen, hören und spüren erlebbar.', headline4: '', media4: '<ul><li>sehen: Bewegung, Umwandlung = agni (Hitze)</li><li>schmecken: Wasser, fließend = jala (Wasser)</li><li>riechen: verbunden, fest = prithvi (Erde)</li><li>hören: Ätha, Raum = akasha (Raum)</li><li>fühlen: Luft, Temperatur, Bewegung von Luft = vayu (Luft)</li></ul>', text4: '', headline5: '', media5: '', text5: 'Die Mahabhutas haben Ihren Ursprung in der Wahrnehmung der Umwelt, basierend auf den 5 Sinnen, und der Zuordnung von Eigenschaften und Kausalitätszusammenhängen (Ursache – Wirkung).', headline6: '', media6: '', text6: 'In der nächsten Lektion sehen wir uns an, wie die 5 Mahabhutas helfen können ein gutes Gleichgewicht zu schaffen.', outro: '', quote: ''}  },
{ id: 'Mahābhūta_Gleichgewicht', order: 41, topic: 'Mahābhūta', category: 'ayurveda', lesson: 'Gleichgewicht', icon: 'balance-icon.webp', content: {intro: 'Die Mahabhutas sind nicht stagnand, sondern sind in ständiger Veränderung. ', media: '', headline1: '', media1: '', text1: 'Die Veränderungen, die wir in unserer Umwelt beobachten, passieren so auch in unserem Körper.', headline2: 'Ähnliches und Unähnliches', media2: '', text2: 'Ziel ist es die Mahabhutas im Gleichgewicht zu halten. Dabei können die beiden folgenden einfachen Regeln hergenommen werden:', headline3: '', media3: '<ol><li>ähnliches verstärkt</li><li>unähnliches reduziert</li></ol>', text3: '', headline4: '', media4: '', text4: 'Im Klartext bedeutet das: Wollen wir eine Eigenschaft verstärken, müssen wir etwas mit dieser Eigenschaft hinzufügen. Wollen wir eine Eigenschaft reduzieren, müssen wir eine unähnliche Eigenschaft hinzufügen.', headline5: 'persönliche Wahrnehmung ', media5: '', text5: 'Mahabhutas sind dabei symbolisch zu sehen. Ein Konzept um uns zu helfen unser eigenes Gleichgewicht zu finden. Dabei ist die eigene Interpretation maßgeblich. Die Wahrnehmung und interpretation findet auf Basis der eigenen Bedürfnisse oder vergangenen Erfahrungen statt.', headline6: '', media6: '', text6: 'Die Begrifflichkeiten der Mahbhutas können uns dabei helfen und eine Eselsbrücke sein.', outro: '', quote: ''}  },
{ id: 'Mahābhūta_Beispiele', order: 42, topic: 'Mahābhūta', category: 'ayurveda', lesson: 'Beispiele', icon: 'fact-icon.webp', content: {intro: 'Schauen uns wir die 5 Mahabhutas an Beispielen an:', media: '', headline1: 'Agni (अग्नि) - Umwandlung / Hitze', media1: '<img class="icon" src="../../resources/knowledge/white/flame-icon.webp" alt="Flame">', text1: 'Sind wir zu lange an der Sonne merken wir wie unsere Haut verbrennt. Wir können Agni reduzieren, indem wir die Sonne verlassen oder zum Beispiel Jala erhöhen in dem wir feuchte Creme auftragen. Ein anderes Beispiel wäre ein warmes Getränk am Morgen, wenn wir uns nach dem Aufstehen noch träge fühlen.', headline2: 'Jāla (जाल) – Wasser', media2: '<img class="icon" src="../../resources/knowledge/white/drop-icon.webp" alt="Drop">', text2: 'In der Yogapraxis kann es sein, dass wir schwitzen, daher ist es wichtig vor und nach der Praxis auf unseren Flüssigkeitshaushalt zu achten. Beim Essen von eher festen, salzigen oder trockenen Speißen ist es ratsam auch auf genug Flüssigkeitszufuhr zu achten.', headline3: 'Pṛthvī (पृथ्वी) - fest /Erde', media3: '<img class="icon" src="../../resources/knowledge/white/seedling-icon.webp" alt="Earth">', text3: 'Im beruflichen Umfeld unterstützt uns eine stabile Sitzgelegenheit, unter Freunden bevorzugen wir vielleicht eher eine Sitzgelegenheit mit weichen, gemütlichen Eigenschaften. Bei großem Hunger ist eine kalorienhaltige Mahlzeit vielleicht eher das richtige, als eine dünne Suppe.', headline4: 'Ākāśa (आकाश) – Raum', media4: '<img class="icon" src="../../resources/knowledge/white/world-globe-line-icon.webp" alt="Space">', text4: 'War man lange Zeit in einem geschlossenen Innenraum ist es angenehm die Fenster zu öffnen oder nach draußen zu gehen. Ein Getränk schmeckt aus der Flasche anders als eingeschenkt im offenen Glas.', headline5: 'Vāyu (वायु,) - Bewegung, Temperatur / Luft', media5: '<img class="icon" src="../../resources/knowledge/white/wind-icon.webp" alt="Air">', text5: 'Während einer Yogastunde kann es helfen frische, kühle Luft in dem Raum zu lassen, um mit frischer Energie üben zu können. Im heißen Sommer wird oft eine Schüssel Salat bevorzugt, im Winter dann die Warme Suppe.', headline6: 'balancieren als Prozess', media6: '', text6: 'Wir haben erfahren, dass es einen ständigen Veränderungsprozess in unserer Umwelt aber auch in unserem eigenen Körper gibt. Die 5 Sinne ermöglichen uns die Wahrnehmung dieser Prozesse. Aus diesen Wahrnehmungen können dann Schlüsse gezogen werden, wie wir einen wünschenswerten, einen ausbalancierten Zustand erreichen. Dies ist ein fortwährender Prozess.', outro: '', quote: ''}  },
{ id: 'tridoṣa_Intro', order: 43, topic: 'tridoṣa', category: 'ayurveda', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Wir haben bereits die 5 Mahabhutas kennengelernt, die physikalische Attribute beschreiben. Im Folgenden lernen wir jetzt die 3 Doshas kennen.', media: '', headline1: '', media1: '', text1: 'Die drei Doshas sind Funktionssysteme in der ayurvedischen Medizin, die bestimmte Aspekte steuern bzw. damit verbunden sind. Jeder Mensch ist mit seinen Dosha-Ausprägungen geboren. Wenn die drei Doshas im Gleichgewicht sind, erhält sich die perfekte menschliche Gesundheit. ', headline2: '', media2: '', text2: 'Was genau diese drei Funktionssystheme sind lernst du auf der nächsten Seite.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'tridoṣa_Basics', order: 44, topic: 'tridoṣa', category: 'ayurveda', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Während die Mahabhutas physikalische Attribute beschreiben, also die Beschaffenheit, werden mit den 3 Doshas Funktionen beschrieben. Also bewegend,  verändernd, formgebend. Doshas sind also das Wahrnehmen eines Gewichtigen Unterschieds.', media: '', headline1: 'Vata वात = Luft ', media1: '<img class="icon" src="../../resources/knowledge/white/wind-icon.webp" alt="Air">', text1: '', headline2: '', media2: '<div style=”text-align:center;”><p>Im Yoga die Bewegungssteuerung</p><p>(Bewegung / Transport / Herzschlag / Denken)</p></div><p>Vāta-doṣa wird mit dem Beckenbereich asoziiert. Das Wort „vāta“ leitet sich von der Verbwurzel „vā“ ab, was „bewegen“, „informieren“ und „antreiben“ bedeutet, was die natürlichen Handlungen von Vāta sind.</p>', text2: '', headline3: 'Pitta पित्त = Feuer', media3: '<img class="icon" src="../../resources/knowledge/white/flame-icon.webp" alt="Flame">', text3: '', headline4: '', media4: '<div style=”text-align:center;”><p>Im Yoga die Intensitätssteuerung</p><p>(Intensität / Umwandlung /Stoffwechsel)</p></div><p>Pitta-doṣa wird auch mit dem Bauchraum asoziiert. Das Wort „pitta“ leitet sich von der Verbwurzel „tapa“ ab, die „erhitzen“ bedeutet. Daher befasst sich Pitta mit verschiedenen physiologischen Funktionen im Zusammenhang mit Wärme.</p>', text4: '', headline5: 'Kapha कफ =  Erde ', media5: '<img class="icon" src="../../resources/knowledge/white/seedling-icon.webp" alt="Earth">', text5: '', headline6: '', media6: '<div style=”text-align:center;”><p>Im Yoga die Ausdauersteuerung.</p><p>(Ausdauer / Beständigkeit / Konzentration / Form)</p></div><p>Kapha-doṣa wird auch mit dem Brustkorb asoziiert. Kapha repräsentiert Wasser und hält als solches die Körperflüssigkeit aufrecht, steuert Wachstum und Kraft im Körper. Es steht außerdem für potentielle Energie im Körper. Kapha-Doṣa versorgt alle Körperteile mit Nährstoffen und reguliert die beiden anderen Doṣas, Pitta und Vāta.</p>', text6: '', outro: '', quote: 'Beschreibungen der doshas:  Essentials of Ayurveda, Priya Vrat Sharma 1993'}  },
{ id: 'tridoṣa_Beispiele', order: 45, topic: 'tridoṣa', category: 'ayurveda', lesson: 'Beispiele', icon: 'fact-icon.webp', content: {intro: 'Im Yoga suchen wir den passenden Ort sowie Richtung, die passende Intensität und die passende Dauer.', media: '', headline1: '', media1: '', text1: 'Diese drei Aspekte wollen wir in jeder Haltung passend für uns gestalten. Wir wollen uns nicht ausschließlich darauf konzentrieren die richtige Bewegung zu machen und außer Acht lassen, dass die Haltung zu anstrengend ist. Wenn wir diese dadurch nicht lange genug halten können, werden wir kaum einen Lerneffekt haben.', headline2: 'Vata वात = Luft ', media2: '<img class="icon" src="../../resources/knowledge/white/wind-icon.webp" alt="Air">', text2: 'Wenn wir uns im Alltag wenig bewegen können wir durch Bewegung in der Yogapraxis einen Ausgleich schaffen. ', headline3: 'Pitta पित्त = Feuer', media3: '<img class="icon" src="../../resources/knowledge/white/flame-icon.webp" alt="Flame">', text3: 'In der Yogapraxis wollen wir Stress vermeiden. Wir wollen uns nicht durch Ehrgeiz und falsche Erwartungshaltungen an uns selbst zu Haltungen hinreisen lassen die noch nicht passend für uns sind.', headline4: 'Kapha कफ =  Erde ', media4: '<img class="icon" src="../../resources/knowledge/white/seedling-icon.webp" alt="Earth">', text4: 'Nach einem ereignisreichen Tag kann uns die Yogapraxis helfen uns wieder zu erden.', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Knochen-Marmas_Intro', order: 46, topic: 'Knochen-Marmas', category: 'marmas', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Die dritte Familie der Marmas sind die Knochen-Marmas.', media: '', headline1: '', media1: '', text1: 'Auch hier schlagen wir die Brücke von der Marmatheorie zu modernen Erkenntnissen. So kannst du auch ein bisschen etwas über den Aufbau eines Knochens erfahren.', headline2: '', media2: '', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Knochen-Marmas_Basics', order: 47, topic: 'Knochen-Marmas', category: 'marmas', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Knochen haben auch im Yoga eine stützende Funktion. Sie sind der Ansatzpunkt für die Sehnen.', media: '<iframe src="bone_marma/bone.html"></iframe>', headline1: 'Aufbau', media1: '', text1: 'Knochen bestehen aus ca 45% anorganischen Stoffen, außerdem aus ca. 25% Wasser und 30 % organischen Stoffen. Es ist also lebendes Gewebe, welches ebenfalls Veränderungen ausgesetzt ist, wenn auch nur sehr langsam.', headline2: 'Eigenschaften der Knochen im Yoga-Kontext', media2: '', text2: 'Knochen werden meist mit den Attributen schwer, fest und hart beschrieben. Qualitäten sind geführt, stabil, gestützt.', headline3: '', media3: '<ul><li>Knochen sind lebendig</li><li>Knochen sind Koordinationsorte</li><li>Knochen bilden Gelenke</li><li>Knochen sind unsere Stütze</li></ul>', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Knochen-Marmas_Knochengewebe', order: 48, topic: 'Knochen-Marmas', category: 'marmas', lesson: 'Knochengewebe', icon: 'bone-icon.webp', content: {intro: 'Knochengewebe ist besonders hartes Gewebe, das aus vielen einzelnen Knochen das Skelett bildet.', media: '', headline1: '', media1: '', text1: 'Knochen sind umhüllt von einer Knochenhaut mit vielen Blutgefäßen (Periost). Diese ist sehr schmerzempfindlich, der Knochen selbst allerdings nicht.', headline2: '', media2: '', text2: 'Knochengewebe besteht aus ener festen Struktur, der Knochenmatrix. Diese besteht aus kollagenen Fasern. Die Knochenmatrix wird durch anorganische Kristalle verfestigt. In der Matrix finden sich Knochenzellen (Osteozyten), die über die Knochenkanälchen miteinander verbunden sind.', headline3: '', media3: '', text3: 'Der Knochen selbst lebt und ist durchblutet. Zur Erhaltung der Belastbarkeit und Stützung des Körpers  finden ständige Aufbau-, Umbau- und Anbau-Prozesse statt. Im Alter verlangsamen sich diese Prozesse. Der Erhalt der Knochenstabilität kann durch Druck und Zugbelasung erhalten bzw. verbessert werden.', headline4: '', media4: '', text4: 'Bei einem Bruch wird nach kurzer Zeit zunächst überschießendes Knochenmaterial Aufgebaut. Die Beule aus Knochengewebe wird späterer durch Osteoklasten wieder abgebaut bis zur Anpassung an die ursprüngliche Form des Knochens.', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'triguṇas_Basics', order: 49, topic: 'triguṇas', category: 'ayurveda', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Die Gunas sind die drei grundlegenden Qualitäten, Eigenschaften und Merkmale des Universums.', media: '', headline1: '', media1: '', text1: 'Aus den Triguṇas der indischen Philosophie erkennt Āyurveda Sattva als rein an, während die anderen beiden – Rajas und Tamas – als Doṣas die den Geist beeinträchtigen betrachtet werden; sie sind als mānasadoṣa bekannt.', headline2: 'Sattva (सत्त्व) ', media2: '', text2: 'Reinheit, Güte, Geist, Harmonie, natürlicher Charakter, bewusster Geist', headline3: 'Rajas (रजस्) ', media3: '', text3: 'Leidenschaft, Aktivität, Mobilität', headline4: 'Tamas (तमस् )', media4: '', text4: 'Dunkelheit, Gleichgültigkeit, Trägheit, Widerstand gegen eine Aktion', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: 'Essentials of Ayurveda, Priya Vrat Sharma 1993'}  },
{ id: 'Blutgefäß-Marma_Intro', order: 50, topic: 'Blutgefäß-Marma', category: 'marmas', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'In dieem Abschnitt betrachten wir die Blutgefäß-Marma.', media: '', headline1: '', media1: '', text1: 'Die Blutgefäß-Marma in diesem Abschnitt sind etwas abstrakter, als die Marmas die wir schon kennengelernt haben.', headline2: '', media2: '', text2: 'Der Begriff des Blutfluss Marmas umfast in Ayurveda etwas mehr als nur den reinen Blutfluss. Dennoch ist auch hier der Blutfluss ist einer der wichtigsten Aspekte des Marmas. Im folgenden findest du daher gleich mehrere Lektionen zu dem Thema.', headline3: '', media3: '', text3: 'Außerdem inkludiert Blutfluss Marma auch das Nervensystem. Das folgente Kapitel dreht sich daher um das Nervensystem.', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Blutgefäß-Marma_Basics', order: 51, topic: 'Blutgefäß-Marma', category: 'marmas', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Im Yoga möchten wir Blut und Nervenbahnen weder von außen noch durch Muskelspannung quetschen und blockieren, sondern einen guten Fluss ermöglichen. Die Blutfluss Marmas helfen uns Blokaden zu erkennen und zu vermeiden.', media: '', headline1: 'Bedeutung', media1: '', text1: 'Unter Blutgefäß-Marma sind nicht nur Venen und Aterien sondern auch das Lymphische System, Organe und die Nervenbahnen zusammengefasst.', headline2: 'Eigenschaften der Blut-, Nerven- und Lymphsysteme im Yoga-Kontext', media2: '', text2: 'Wünschenswerte Eigenschaften bei den Blutfluss Marmas sind fließend, klar, weich und flüssig.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Blutgefäß-Marma_Arterien', order: 52, topic: 'Blutgefäß-Marma', category: 'marmas', lesson: 'Arterien', icon: 'drop-icon.webp', content: {intro: 'Arterien, auch Schlagadern genannt, dienen dem Transport des Blutes vom Herzen in das Gewebe. Arterien transportieren sauerstoffreiches Blut.', media: '<iframe src="blood_marma/blood.html?bloodStyle=A"></iframe>', headline1: 'Aufbau', media1: '<ul><li>Arterien bestehen aus drei Schichten.</li><li>Arterien haben generell eine dickere Wand als Venen, weil in ihnen ein höherer Druck herrscht.</li><li>Die mittlere Schicht (Media) enthält glatte Muskulatur und/oder elastisches Bindegewebe. Diese dicke mittlere Schicht ist bei den Venen kaum ausgeprägt.</li></ul>', text1: '', headline2: 'Bluttransport', media2: '', text2: 'Eine vom Herzen erzeugte Druckwelle treibt den Bluttransport in den Arterien an. ', headline3: '', media3: '', text3: 'Die vom Herzen erzeugte Pulswelle dehnt die Arterienwand, bevor diese sich wieder zusammenzieht. Der vom Herz erzeugte Pumpstoß wird durch die sich sich wieder zusammenziehende  Arterie in eine kontinuierliche Strömung umgewandelt. → Windkesselfunktion', headline4: 'fun facts', media4: '', text4: 'In den Arterien ist das Pulsieren des Herzschlags spürbar, weshalb sie auch Schlag- oder Pulsadern genannt werden.', headline5: '', media5: '', text5: 'Bekannteste Arterie ist die Aorta (Hauptschlagader). Das Herz pumpt das Blut aus der linken Herzkammer direkt in dieses dickste aller Gefäße (bis zu 3cm dick).', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Blutgefäß-Marma_Venen', order: 53, topic: 'Blutgefäß-Marma', category: 'marmas', lesson: 'Venen', icon: 'drop-icon.webp', content: {intro: 'Venen, auch Blutadern genannt, dienen der Speicherung und dem Rücktransport des Blutes zum Herzen. Venen transportieren sauerstoffarmens Blut.', media: '<iframe src="blood_marma/blood.html?bloodStyle=V"></iframe>', headline1: 'Aufbau', media1: '<ul><li>Venen bestehen aus drei Schichten.</li><li>Die mittlere Schicht (Media) ist bei den Venen kaum ausgeprägt, da ein geringer Druck herscht.</li><li>Bein- und Armvenen besitzen Venenklappen. Diese ventielfunktion sorgt dafür, dass das Blut zum Herzen hin fließt, bzw. verhindern Rückfluss/Versacken des Blutes.</li></ul>', text1: '', headline2: 'Bluttransport', media2: '', text2: 'Die Muskelpumpe ist mit Unterstützung der Venenklappen die Antriebskraft des Blutflusses in den Venen. ', headline3: '', media3: '', text3: 'Während die Arterien für den Bluttransport zu den Organen und der Perepherie des Körpers verantwortlich sind transportieren die Venen das Blut wieder zurück zum Herz.', headline4: '', media4: '', text4: 'Damit das Blut nicht „in den Beinen versackt“, ist ein gut aufeinander abgestimmtes System aus Venenklappen und Muskelpumpe erforderlich. Venenklappen lassen nur den Blutfluss in Richtung Herz zu. Um einen Rückfluss zu verhindern schliesen sie sich und fungieren so als Ventile. Für das Vorantreiben des Blutflusses in den Venen ist die umgebende Skeletmuskulatur verantwortlich. Die angespannten Muskeln verdicken sich und drücken so die dazwischenliegenden Venen zusammen → Muskelpumpe.', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Blutgefäß-Marma_Kapillaren', order: 54, topic: 'Blutgefäß-Marma', category: 'marmas', lesson: 'Kapillaren', icon: 'drop-icon.webp', content: {intro: 'Die Kapillaren bilden den Übergang vom arteriellen zum venösen System. ', media: '', headline1: '', media1: '', text1: 'Die Kapillare sind winzige Blutgefäße. Sie befinden sich am Übergang der beiden Systeme und bilden ein feines Netwerk.', headline2: '', media2: '', text2: 'Die Kapillare sind verantwortlich für den Gas- und Stoffaustausch. Hier erfolgt die Abgabe von Sauerstoff aus dem arteriellen System und Aufnahme von CO2 in das venöse System.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Nervensystem_Intro', order: 55, topic: 'Nervensystem', category: 'anatomy', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Das Nervensystem spielt bei allen Vorgängen in unserem Körper eine wichtige Rolle.', media: '', headline1: '', media1: '', text1: 'Im Folgenden lernen wir drei verschieden Varianten kennen, wie der Aufbau des Nervensystems beschrieben werden kann.', headline2: '', media2: '', text2: 'Je nachdem Welche Funktion des Nervensystems beschrieben wird ist es Hilfreich das richtige Konzept zu kennen.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Nervensystem_TopografischerAufbau', order: 56, topic: 'Nervensystem', category: 'anatomy', lesson: 'Topografischer Aufbau', icon: 'cell-molecule-icon.webp', content: {intro: '', media: '', headline1: 'Zentrales Nervensystem ', media1: '', text1: 'Besteht aus dem Gehirn und Rückenmark und ist verantwortlich für die Zentrale Reizverarbeitung.', headline2: 'Peripheres Nervensystem', media2: '', text2: 'Besteht aus Nerven in Muskeln und Organen bzw. ist die Verbindung der Organe mit dem zentralen Nervensystem. ', headline3: 'Funktionsweise', media3: '', text3: 'Reize werden über Rezeptoren in der Peripherie wahrgenommen und über das periphere Nervensystem an das zentrale Nervensystem weitergegeben (Afferenz = Reizaufnahme).', headline4: '', media4: '', text4: 'Im zentralen Nervensystem werden die Reize verarbeitet (d.h. integriert und koordiniert).', headline5: '', media5: '', text5: 'Aus dem zentralen Nervensystem gelangt z.B. der motorische Befehl dann über das periphere Nervensystem zurück zum Muskel (Efferenz = Reizbeantwortung).', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Nervensystem_FunktionalerAufbau', order: 57, topic: 'Nervensystem', category: 'anatomy', lesson: 'Funktionaler Aufbau', icon: 'cell-molecule-icon.webp', content: {intro: '', media: '', headline1: 'somatisches Nervensystem', media1: '', text1: 'Dient der willkürlichen oder bewussten motorischen Ansteuerung der Skelettmuskulatur bzw. der Wahrnehmung der Körperperipherie.', headline2: 'vegetativen Nervensystem', media2: '', text2: 'Unbewusste und unwillkürliche Steuerung der inneren Organe und lebenswichtiger Vorgänge z.B. Verdauung, Blutkreislauf, Atmung, Körpertemperatur.', headline3: '', media3: '', text3: 'Die Aufgabe ist das Gleichgewicht der physiologischen Körperfunktionen aufrechtzuerhalten.', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Nervensystem_vegetativesNervensystem', order: 58, topic: 'Nervensystem', category: 'anatomy', lesson: 'vegetatives Nervensystem', icon: 'intestine-icon.webp', content: {intro: 'Das vegetative Nervensystem kann weiter untergliedert werden in:', media: '', headline1: 'sympathisches Nervensystem (Sympathikus)', media1: '', text1: 'Verantwortlich für erhöhte Leistungsbereitschaft sowie den Abbau von Energiereserven („fight and flight“)', headline2: 'parasympathisches Nervensystem (Parasympathikus)', media2: '', text2: 'Steuert die Regeneration des Organismus und Aufbau von Energiereserven („rest and digest“)', headline3: 'enterisches Nervensystem', media3: '', text3: 'Übernimmt die Steuerung der Magen-Darm-Funktionen.', headline4: 'Yoga Kontext', media4: '', text4: 'Die Idee im Yoga ist es geziehlt mit Übungen / Aktivität den Sympathikus ansteuern, um dann über den Parasympathikus die Regeneration zu steigern. ', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Gelenk-Marmas_Into', order: 59, topic: 'Gelenk-Marmas', category: 'marmas', lesson: 'Into', icon: 'intro-icon.webp', content: {intro: 'Die letzte Marmagruppe die wir kennenlernen sind die Gelenk-Marmas', media: '', headline1: '', media1: '', text1: '', headline2: '', media2: '', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Gelenk-Marmas_Basics', order: 60, topic: 'Gelenk-Marmas', category: 'marmas', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Ein Gelenk ist eine stabile Verbindung von zwei oder mehr Knochen.', media: '', headline1: 'Aufgabe', media1: '', text1: 'Das Gelenk gibt Richtung und Führung. Es ist verantwortlich für die Zentrierung und die Position der Knochen zueinander und der Position des Körpers im Raum. ', headline2: '', media2: '', text2: 'Gelenke sind auch der Ort der Bewegung (Roll - Gleit – Bewegung): Es muss darauf geachtet werden, dass Gelenke frei von Druck sind und diese sich nicht versteifen.', headline3: 'Qualität', media3: '', text3: 'Nach Ayurveda ist die Qualität der Gelenkmarmas: glatt, fliesend, beweglich, ölig.', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Gelenk-Marmas_Gelenkarten', order: 61, topic: 'Gelenk-Marmas', category: 'marmas', lesson: 'Gelenkarten', icon: 'anatomy-icon.webp', content: {intro: 'Es gibt 6 verschiedene Gelenkarten im Menschlichen Körper:', media: '<iframe src="joints_marma/joints_v3.html"></iframe>', headline1: '1. Kugelgelenk ', media1: '', text1: 'Kugelgelnke befinden sich am Schultergelenk oder Hüftgelenk. Am Hüftgelenk ist größte Stabilität erforderlich, daher ist dort die Pfanne groß. Am Schultergelenk braucht es große Bewegungsfreiheit, daher eine kleine Pfanne.', headline2: '2. Zapfengelenk', media2: '', text2: 'Zapfengelenke befinden sich am Ellenbogengelenk. Das Gelenk beugt in einer Achse.', headline3: '3. Eigelenk', media3: '', text3: 'Ein Eigelenk befindet sich z.B. am Handgelenk.', headline4: '4. Planes Gelenk', media4: '', text4: 'Plane Gelenke befinden sich z.B. am Mittelfuß-, Handwurzel- oder Kiefergelenk.', headline5: '5. Sattelgelenk', media5: '', text5: 'Das Daumenwurzelgelenk ist ein Sattelgelenk.', headline6: '6. Scharniergelenk', media6: '', text6: 'Scharniergelenke befinden sich z.B. an den Fingermittel- und endgliedgelenken.', outro: '', quote: ''}  },
{ id: 'Gelenk-Marmas_Aufbau', order: 62, topic: 'Gelenk-Marmas', category: 'marmas', lesson: 'Aufbau', icon: 'anatomy-icon.webp', content: {intro: '', media: '', headline1: '', media1: '', text1: '', headline2: '', media2: '', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Kommunikation_Intro', order: 63, topic: 'Kommunikation', category: 'yoga', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Man kann nicht nicht Kommunizieren.', media: '', headline1: '', media1: '', text1: 'Nicht nur das gesprochene Wort, sondern auch Betonung, Gestik und Mimik und andere äßere Aspekte sind Kommunikation.', headline2: '', media2: '', text2: 'Auch im Yoga ist kommunikation wichtig, zum einen zwischen der Übenden und anleitenden person, aber auch der innere Dialog.', headline3: '', media3: '', text3: 'Im Folgenden lernen wir ein Kommunikationsmodell kennen und ein paar Tips, wie klare Kommunikation funktionieren kann.', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Kommunikation_Kommunikations-modell', order: 64, topic: 'Kommunikation', category: 'yoga', lesson: 'Kommunikations- modell', icon: '', content: {intro: 'Ein bekanntes Kommunikationsmodell ist das Kommunikationsquadrat von Schulz von Thun.', media: '', headline1: '', media1: '', text1: 'Er beschreibt in seinem Modell, dass jede Kommunikation immer gleichzeitig vier Bestandteile hat.', headline2: '', media2: '<ul><li>eine Sachinformation (worüber ich informiere)</li><li>eine Selbstkundgabe (was ich von mir zu erkennen gebe)</li><li>einen Beziehungshinweis (was ich von dir halte und wie ich zu dir stehe)</li><li>einen Appell (was ich bei dir erreichen möchte)</li></ul>', text2: '', headline3: '', media3: '', text3: 'Diese vier Dimensionen hat Shulz von Thun in einem Quadrat dargestellt, bei dem der Sender diese vier Botschaften sendet und der Empfäger mit vier Ohren diese empfängt.', headline4: 'Das Geber und Nehmer Modell.', media4: '', text4: 'Dr. Roland Lüthi hat darauf aufbauend das Modell erweitert.', headline5: '', media5: '', text5: 'Der Informationsgeber gibt die Botschaft bestehend aus den vier Dimensionen Sachinhalt, Appell, Beziehung und Selbstoffenbarung. Der Informationsnehmer nimmt sich die Information, allerdings muss dies nicht genau der gegebenen Information entsprechen. Der Nehmer kann zum Beispiel den Appell stärker wahrnehmen, die anderen Dimensionen schwächer, als vom Geber beabsichtigt. In einem anderen Fall könnte der Nehmer die Beziehungsebene anders deuten als der Geber.', headline6: '', media6: '', text6: 'Die Dimensionen zwischen Geber und Nehmer müssen nicht genau deckungsgleich sein. Die folge ist eine Unsymetrie in der Kommuination, Missverständnisse können die Folge sein.', outro: '', quote: ''}  },
{ id: 'Kommunikation_Kommunikation', order: 65, topic: 'Kommunikation', category: 'yoga', lesson: 'Kommunikation', icon: '', content: {intro: 'In der Kommunikation kann nicht davon ausgegangen werden, dass der Informations Empfänger die Botschaten so aufnimmt wie vom Informationsgeber beabsichtigt. ', media: '', headline1: '', media1: '', text1: 'Der Informationsnehmer ist durch seine eignen Erfahrungen und Umwelt geprägt und interpretiert die Botschaften daher anders. Fehlkommunikation und Missverständnisse sind die Folge. Eine möglichst klare Komminikation mit wenig Interpretationsspielraum ist daher wichtig.', headline2: 'Weichmacher', media2: '', text2: 'Um eine klare Botschaften zu senden müssen "Weichmacher" vermieden werden. Weichmacher sind zum Beispiel:', headline3: '', media3: '<ul><li>vielleicht</li><li>eigentlich</li><li>eventuell</li><li>wahrscheinlich</li></ul>', text3: 'Außerdem die Benutzung des Konjunktiv oder Einleitungssätze wie "wenn ich das richtig verstanden habe".', headline4: 'Die Botschaft "Aber"', media4: '', text4: 'Antwortet man seinem Gegenüber mit "aber ..." ist das “Aber” gleichbedeutend mit einer Vereinung von allem was der Gesprächspartner vorher gesagt hat. Dies führt zu ungewollter Konfrontation.', headline5: '', media5: '', text5: 'Um das Argument des Gegenübers nicht direkt zu nigieren, den eigenen Aspekt mit anzuführen kann mit verbindenden Elementen an die Konversation mit "und", "außerdem" oder "gleichzeitig" angeknüpft werden.', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Yoga-Sûtra_Intro', order: 66, topic: 'Yoga-Sûtra', category: 'yoga', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Das Yoga-Sutra ist der Yoga-Leitfaden. ', media: '', headline1: '', media1: '', text1: 'Dieser Letfaden beschreibt in insgesamt 195 Versen unterteilt in vier Kapiteln die Essenz des Yoga.', headline2: '', media2: '', text2: 'Im folgenden werden wir ein paar wichtige Sutren kennenlernen.', headline3: '', media3: '', text3: 'Achtung! Da es sich um eine der ältesten Überlieferungen der Yogatradition handelt variieren Übersetzungen teilweise etwas in der Interpretation und Formulierung. In GOM wurde versucht verständlich den Kern der Aussage wiederzugeben.', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Yoga-Sûtra_Sutra1.2', order: 67, topic: 'Yoga-Sûtra', category: 'yoga', lesson: 'Sutra 1. 2', icon: '', content: {intro: 'Das Sutra 1. 2 ist der zweite Vers und damit einer der wichtigsten.', media: '', headline1: '', media1: '', text1: 'yogas-citta-vritti-nirodha', headline2: '', media2: '', text2: 'योगश्चित्तवृत्तिनिरोधः', headline3: '', media3: '', text3: 'Yoga ist die Beruhigung der Gedanken.', headline4: '', media4: '', text4: 'Citta (चित्त) ist ein Sanskrit-Wort, das sich auf „Wahrnehmung, Aufmerksamkeit“ bezieht. Außerdem wird es als Herz, Gedanken, Verstand und Bewusstsein übersetzt.', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: 'James Haughton Woods „The Yoga System of Patanjali“ https://archive.org/details/yogasystemofpata00wooduoft/page/xxx/mode/2up?view=theater'}  },
{ id: 'Yoga-Sûtra_5Vṛtti', order: 68, topic: 'Yoga-Sûtra', category: 'yoga', lesson: '5 Vṛtti', icon: '', content: {intro: 'Im Yoga Sutra 1.5 ist beschrieben, dass es fünf seelisch-geistige Vorgänge gibt.', media: '<iframe src="Sutras/vriti.html"></iframe>', headline1: '', media1: '', text1: 'Diese können entweder leidvoll (Kliṣṭa - क्लिष्ट) oder Akliṣṭa (अक्लिष्ट) angenehm bzw. ungestört sein.', headline2: 'Pramāṇa (प्रमाण) — richtige Wahrnehmung / gültiges Wissen', media2: '', text2: 'Die richtige Wahrnehmung entsteht durch direkte Beobachtung, Schlussfolgerung oder die Worte anderer.¹ Auch im Ayurveda sind die vier Werkzeuge zum Erlangen und Testen von Wissen Wahrnehmung, Schlussfolgerung, Vergleich und Schriften/Recherche.²', headline3: 'Viparyaya (विपर्यय — —) — falsche Wahrnehmung / Fehler', media3: '', text3: 'Eine Fehlwahrnehmung ist falsches Wissen, das nicht auf der tatsächlichen Sachlage beruht.¹ Viparyaya lässt sich in fünf Typen unterteilen, die 5 kleśas: 1. Unwissenheit, Ignoranz oder falsche Identifizierung; 2. Egoissmuss, Selbstsucht; 3. Sucht, Drang zur Leidenschafft; 4. Wut, Drang zum Hass, Abneigung vom Guten; 5. Angst vor dem Tod.³', headline4: 'Vikalpa (विकल्प) — Konzeptualisierung', media4: '', text4: 'Die Konzeptualisierung beruht auf sprachlichem Wissen, nicht auf dem Kontakt mit realen Dingen.¹ Mögliche Übersetzungen des Wortes sind z.B. Zweifel, Unsicherheit, Unentschlossenheit, Zögern⁴ oder Gedankenkarussel.', headline5: 'Nidrā (निद्रा)— Schlaf', media5: '', text5: 'Schlaf ist ein Muster, das auf der Wahrnehmung beruht, dass nichts existiert.¹', headline6: 'Smṛti (स्मृति) — Erinnerung ', media6: '', text6: 'Erinnern ist das Bewahren von Erlebnissen.¹ ', outro: '', quote: '1) Chip Hartranft „The Yoga-Sûtra of Patañjali - Sanskrit-English Translation & Glossary“ https://www.arlingtoncenter.org/Sanskrit-English.pdf 2) https://www.wisdomlib.org/definition/pramana#ayurveda 3) https://www.wisdomlib.org/definition/viparyaya#samkhya 4) https://www.wisdomlib.org/definition/vikalpa#yoga'}  },
{ id: 'Prakriti_Prakṛti+Puruṣa', order: 69, topic: 'Prakriti', category: 'yoga', lesson: 'Prakṛti & Puruṣa', icon: '', content: {intro: 'Prakṛti und Puruṣa sind zwei grundlegende Faktoren, die für die Entstehung der Prapañca, der sichtbaren Welt, dem Schauplatz aller Aktivitäten.²', media: '', headline1: 'Prakṛti प्रकृति ', media1: '', text1: 'Prakriti wird als Kosmische Natur¹, Urauslöser¹ , (Ur-) Natur, Materie² oder unverursachtes Produkt³ beschrieben. Im Ayuveda wird Prakriti auch mit der inneren Natur oder Konstitution⁴ erklärt. Prakriti ist aber nicht im klassischen Sinn rein stofflich zu sehen. ', headline2: '', media2: '', text2: 'Prakriti setzt sich zusammen aus der Vorsilbe pra = bevor, vorangehend und der Wurzel kri = machen, produzieren. Die unverursachte (Ur-)Natur.', headline3: 'Puruṣa पुरुष ', media3: '', text3: 'Purusha wird als kosmisches Sein¹, Geist bzw. Seele² oder als Bewustsein beschrieben. ', headline4: '', media4: '', text4: 'Purusha ist derjenige, der Wahrnehmungs und Denkprozesse beobachtet, der Zuschauende oder der Seher. Zusammen mit Prakriti bildet Purusha den logisch-praktischen Hintergrund für das Bewustsein von konkreten Erfahrung, von Wahrnehmung und Denken.³ Analogie: Purusha ist der Bewohner der Stadt, Prakriti ist die Stadt, also Herr/Bewohner von Prakriti.', headline5: 'Bereiche von Prakṛti & Puruṣa', media5: '<iframe src="prakriti/pranas.html"></iframe>', text5: 'Prakriti wird durch die 3 Doshas und 3 Gunas,  Puruṣa duch Atnun charakterisiert. Sie lassen sich also durch die 7 Pranas beschreiben:', headline6: '', media6: '<ol><li>Vata</li><li>Pitta</li><li>Kapha</li><li>Sattva</li><li>Rajas</li><li>Tamas</li><li>Atman</li></ol>', text6: '  ', outro: '', quote: '1: THE SIVA PURANA; J.L.Shastri 1950; 1.6 2: Encyclopaedic Dictionary of Puranas, Swami Parmeshwaranand 3:  Yoga Ein Weg für dich, Reinhard Bögele 1996, Seite 58ff 4: Essentials of Ayurveda, Priya Vrat Sharma 1993'}  },
{ id: 'Ayurvedischer Tag_Intro', order: 70, topic: 'Ayurvedischer Tag', category: 'ayurveda', lesson: 'Intro', icon: 'intro-icon.webp', content: {intro: 'Wir wollen unseren Tagesablauf individuell so gestalten, dass wir am Abend direkt entspannt einschlafen können.', media: '', headline1: '', media1: '', text1: 'Ayurveda hällte ein paar kleine Tips bereit, die uns dabie helfen können.', headline2: '', media2: '', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Ayurvedischer Tag_Morgenroutine', order: 71, topic: 'Ayurvedischer Tag', category: 'ayurveda', lesson: 'Morgenroutine', icon: '', content: {intro: 'Hat sich unser Körper auf eine feste Morgenroutine eingestellt kann es leichterfallen in den Tag zu starten.', media: '', headline1: '', media1: '', text1: 'Im folgenden ein Beispiel für eine Morgenroutine, die helfen kann die Lebensgeister für einen guten Start zu wecken und uns gut auf den bevorstehenden Tag vorbereitet:', headline2: '', media2: '<ul><li>Glas warmes Wasser</li><li>Stuhlgang</li><li>~ 4 Asanas (z.B. Tadasana, halber Hund oder Sonnengruß)</li><li>Frühstück</li><li>Prüfen: Wie viel Energie steht mir heute zur Verfügung.</li><li>Sozialkontakte</li></ul>', text2: '', headline3: 'Energie prüfen', media3: '', text3: 'Jeden Morgen können wir prüfen, wie viel Energie uns für den Tag zur Verfügung steht. Davon sollten wir 50% für uns selbst und 50% für anderes aufwänden. Wenn an einem Tag nur 60% der üblichen Energiemenge zur Verfügung stehen, sollten wir nicht an uns sparen sondern auch diese Menge zumindest gleich aufteilen.', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },
{ id: 'Ayurvedischer Tag_Abendroutine', order: 72, topic: 'Ayurvedischer Tag', category: 'ayurveda', lesson: 'Abendroutine', icon: '', content: {intro: 'Auch am Abend ist es sinvoll eine Routine zu etablieren.', media: '', headline1: '', media1: '', text1: 'Bei einer festen Schlafenzeit kann sich unser Körper darauf einstellen und wird automatisch müde. Wenn wir rechtzeitig vor dem Schlafengehen das Handy weglegen und den spannenden Thriller abschalten, kann auch unser Gehirn zur ruhe kommen.', headline2: 'Abendmeditation', media2: '', text2: 'Helfen kann auch ein kurze Abendmeditation in der du den Tag nocheinmal revue passieren lassen kannst. ', headline3: '', media3: '', text3: 'Was ist mir heute besonders gut gelungen? Warum ist es mir besonders gut gelungen? ', headline4: '', media4: '', text4: 'Fasse für diech die Essenz des tages in 2-5 Minuten nocheinmal zusammen.', headline5: '', media5: '', text5: '', headline6: '', media6: '', text6: '', outro: '', quote: ''}  },

		];
        const initialMarmaData = [
{ id: 'kurca_ll', marmaName: {sanskrit: 'kūrca', de: 'Mittelfuß-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'Zehengrundgelenke', explanation: 'kurz vor den Zehengelenkskapseln, vorstellbar wie der Bund eines Reisigbesens'} , info: {typography: 'कूर्च ', origin: 'Bündel, Bündel Gras, Resigbesen', tipp: 'Umfasse deinen Fuß von oben am unteren Ende des Mittelfußes mit Daumen und Zeigefinger um die Bündelung wahrzunehmen.'}  },
{ id: 'kurca_rl', marmaName: {sanskrit: 'kūrca', de: 'Mittelfuß-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'Zehengrundgelenke', explanation: 'kurz vor den Zehengelenkskapseln, vorstellbar wie der Bund eines Reisigbesens'} , info: {typography: 'कूर्च ', origin: 'Bündel, Bündel Gras', tipp: 'Umfasse deinen Fuß von oben am unteren Ende des Mittelfußes mit Daumen und Zeigefinger um die Bündelung wahrzunehmen.'}  },
{ id: 'kurca_la', marmaName: {sanskrit: 'kūrca', de: 'Mittelhand-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Mittelhand', explanation: 'kurz vor den Fingergelenkskapseln, vorstellbar wie der Bund eines Reisigbesens'} , info: {typography: 'कूर्च ', origin: 'Bündel, Bündel Gras', tipp: 'Umfasse deine Hand von oben kurz vor den Fingergrundgliedern mit Daumen und Zeigefinger um die Bündelung wahrzunehmen.'}  },
{ id: 'kurca_ra', marmaName: {sanskrit: 'kūrca', de: 'Mittelhand-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Mittelhand', explanation: 'kurz vor den Fingergelenkskapseln, vorstellbar wie der Bund eines Reisigbesens'} , info: {typography: 'कूर्च ', origin: 'Bündel, Bündel Gras', tipp: 'Umfasse deine Hand von oben kurz vor den Fingergrundgliedern mit Daumen und Zeigefinger um die Bündelung wahrzunehmen.'}  },
{ id: 'kurcas_ll', marmaName: {sanskrit: 'kūrcaśiras', de: 'Fußwurzel-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'Fußwurzel', explanation: 'an den Fußwurzelknochen und spannt sich wie ein Bogen, vorstellbar wie der Bund eines Reisigbesens'} , info: {typography: 'कूर्चशिरस् ', origin: 'Kūrcaśiras besteht aus kūrca (Bündel) und śiras (der Kopf)', tipp: 'Umfasse deine Fußwurzel von oben mit Daumen und Zeigefinger um die Bündelung wahrzunehmen.'}  },
{ id: 'kurcas_rl', marmaName: {sanskrit: 'kūrcaśiras', de: 'Fußwurzel-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'Fußwurzel', explanation: 'an den Fußwurzelknochen und spannt sich wie ein Bogen, vorstellbar wie der Bund eines Reisigbesens'} , info: {typography: 'कूर्चशिरस् ', origin: 'Kūrcaśiras besteht aus kūrca (Bündel) und śiras (der Kopf)', tipp: 'Umfasse deine Fußwurzel von oben mit Daumen und Zeigefinger um die Bündelung wahrzunehmen.'}  },
{ id: 'kurcas_la', marmaName: {sanskrit: 'kūrcaśiras', de: 'Handwurzel-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Handwurzel', explanation: 'an den Handwurzelknochen und spannt sich wie ein Bogen, vorstellbar wie der Bund eines Reisigbesens'} , info: {typography: 'कूर्चशिरस् ', origin: 'Kūrcaśiras besteht aus kūrca (Bündel) und śiras (der Kopf)', tipp: 'Umfasse deine Handwurzel von oben mit Daumen und Zeigefinger um die Bündelung wahrzunehmen.'}  },
{ id: 'kurcas_ra', marmaName: {sanskrit: 'kūrcaśiras', de: 'Handwurzel-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Handwurzel', explanation: 'an den Handwurzelknochen und spannt sich wie ein Bogen, vorstellbar wie der Bund eines Reisigbesens'} , info: {typography: 'कूर्चशिरस् ', origin: 'Kūrcaśiras besteht aus kūrca (Bündel) und śiras (der Kopf)', tipp: 'Umfasse deine Handwurzel von oben mit Daumen und Zeigefinger um die Bündelung wahrzunehmen.'}  },
{ id: 'ani_ll', marmaName: {sanskrit: 'āṇi', de: 'Beinkraft-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'linker Oberschenkel', explanation: 'an der Bündelung des Quadrizeps, ca. eine Handbreit über dem Knie'} , info: {typography: 'आणि', origin: 'Zapfen der Wagenachse', tipp: 'Das Bein-āṇi kannst du gut bei Haltungen ansteuern, bei denen es um Beinstreckung geht. Um dich vorallem auf die Beinstreckung und Wahrnehmung des Bein-āṇi zu konzentrieren versuche es mit der Haltung Supta Padangusthasana und einem Band am nach oben gestreckten Bein.'}  },
{ id: 'ani_rl', marmaName: {sanskrit: 'āṇi', de: 'Beinkraft-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'rechter Oberschenkel', explanation: 'an der Bündelung des Quadrizeps, ca. eine Handbreit über dem Knie'} , info: {typography: 'आणि', origin: 'Zapfen der Wagenachse', tipp: 'Das Bein-āṇi kannst du gut bei Haltungen ansteuern, bei denen es um Beinstreckung geht. Um dich vorallem auf die Beinstreckung und Wahrnehmung des Bein-āṇi zu konzentrieren versuche es mit der Haltung Supta Padangusthasana und einem Band am nach oben gestreckten Bein.'}  },
{ id: 'ani_la', marmaName: {sanskrit: 'āṇi', de: 'Armkraft-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'linker Oberarm', explanation: 'an der Bündelung des Triezeps, ca. eine Handbreit über dem Ellenbogen'} , info: {typography: 'आणि', origin: 'Zapfen der Wagenachse', tipp: 'Das Arm-āṇi kannst du gut bei Haltungen ansteuern, bei denen es um Armstreckung geht. Um das Arm-āṇi wahrzunehmen versuche im Tadasana die Arme entlang der Körperflanken nach unten zu strecken. Führe sie dann, immernoch gestreckt, langsam nach hinten.'}  },
{ id: 'ani_ra', marmaName: {sanskrit: 'āṇi', de: 'Armkraft-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'rechter Oberarm', explanation: 'an der Bündelung des Triezeps, ca. eine Handbreit über dem Ellenbogen'} , info: {typography: 'आणि', origin: 'Zapfen der Wagenachse', tipp: 'Das Arm-āṇi kannst du gut bei Haltungen ansteuern, bei denen es um Armstreckung geht. Um das Arm-āṇi wahrzunehmen versuche im Tadasana die Arme entlang der Körperflanken nach unten zu strecken. Führe sie dann, immernoch gestreckt, langsam nach hinten.'}  },
{ id: 'kakshadara_l', marmaName: {sanskrit: 'kakṣadhara ', de: 'Oberste-Rippe-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'linke unterste Rippe bis linke oberste Rippe', explanation: 'an der Körperflanke bis hoch zur obersten Rippe. Vorspellbar wie ein Scherengitter aus Sehnen zwischen den Rippen'} , info: {typography: 'कक्षधर ', origin: '-', tipp: 'Kakṣadhara ist das Oberste-Rippen Marma. Es soll dir helfen den kompletten Rumpf ausgehend von den Flanken bis zur obersten Rippe zu strecken. Um die Flankenstreckung zu stimmulieren fahre mit einer Hand von der Hüfte bis nach oben unter die Achselhöhle.'}  },
{ id: 'kakshadara_r', marmaName: {sanskrit: 'kakṣadhara ', de: 'Oberste-Rippe-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'rechte unterste Rippe bis rechte oberste Rippe', explanation: 'an der Körperflanke bis hoch zur obersten Rippe. Vorspellbar wie ein Scherengitter aus Sehnen zwischen den Rippen'} , info: {typography: 'कक्षधर ', origin: '-', tipp: 'Kakṣadhara ist das Oberste-Rippen Marma. Es soll dir helfen den kompletten Rumpf ausgehend von den Flanken bis zur obersten Rippe zu strecken. Um die Flankenstreckung zu stimmulieren fahre mit einer Hand von der Hüfte bis nach oben unter die Achselhöhle.'}  },
{ id: 'ksipra_ll', marmaName: {sanskrit: 'kṣipra ', de: 'Fußwinkel-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'Fußwinkel (zwischen Großer- und Zeigezehe)', explanation: 'zwischen Großer- und Zeigezehe'} , info: {typography: 'क्षिप्र ', origin: '-', tipp: 'Im Tadasana kannst du ein Gefühl für kṣipra bekommen in dem du dein Gewicht nach vorne verlagerst bis die Ferse vom Boden leicht abhebt. Spüre wie viel Kraft an dem Ort ist.'}  },
{ id: 'ksipra_rl', marmaName: {sanskrit: 'kṣipra ', de: 'Fußwinkel-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'Fußwinkel (zwischen Großer- und Zeigezehe)', explanation: 'zwischen Großer- und Zeigezehe'} , info: {typography: 'क्षिप्र ', origin: '-', tipp: 'Im Tadasana kannst du ein Gefühl für kṣipra bekommen in dem du dein Gewicht nach vorne verlagerst bis die Ferse vom Boden leicht abhebt. Spüre wie viel Kraft an dem Ort ist.'}  },
{ id: 'ksipra_la', marmaName: {sanskrit: 'kṣipra ', de: 'Handwinkel-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Handwinkel (zwischen Daumen und Zeigefinger)', explanation: 'zwischen Daumen und Zeigefinger'} , info: {typography: 'क्षिप्र ', origin: 'schnell', tipp: 'Begebe dich in den Vierfüßlerstand und verwurzle deine Hände. Spüre wie viel Kraft kṣipra aufnehmen kann.'}  },
{ id: 'ksipra_ra', marmaName: {sanskrit: 'kṣipra ', de: 'Handwinkel-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Handwinkel (zwischen Daumen und Zeigefinger)', explanation: 'zwischen Daumen und Zeigefinger'} , info: {typography: 'क्षिप्र ', origin: 'schnell', tipp: 'Begebe dich in den Vierfüßlerstand und verwurzle deine Hände. Spüre wie viel Kraft kṣipra aufnehmen kann.'}  },
{ id: 'amsa_la', marmaName: {sanskrit: 'aṃsa', de: 'Schulterhöhe-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Schulterdach', explanation: 'am Schulterdach über der Oberarmkugel, an der gedachten Verlängerung des Schlüsselbeins'} , info: {typography: 'अंस', origin: 'Schulter', tipp: 'Stütze im Vierfüßlerstand Oberarme in die Schulter um das stabile aṃsa wahrzunhemen. Um die entspannte Ausdehnung im Schulterbereich wahrzunehmen, stelle dich ins Tadasana und lege dier eine Bandschlaufe um die Schultern und ziehe sie fest. Wenn du die Schultern nach vorne oder hinten bewegst wirst du merken, dass das Band locker wird.'}  },
{ id: 'amsa_ra', marmaName: {sanskrit: 'aṃsa', de: 'Schulterhöhe-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Schulterdach', explanation: 'am Schulterdach über der Oberarmkugel, an der gedachten Verlängerung des Schlüsselbeins'} , info: {typography: 'अंस', origin: 'Schulter', tipp: 'Stütze im Vierfüßlerstand Oberarme in die Schulter um das stabile aṃsa wahrzunhemen. Um die entspannte Ausdehnung im Schulterbereich wahrzunehmen, stelle dich ins Tadasana und lege dier eine Bandschlaufe um die Schultern und ziehe sie fest. Wenn du die Schultern nach vorne oder hinten bewegst wirst du merken, dass das Band locker wird.'}  },
{ id: 'basti_c', marmaName: {sanskrit: 'basti', de: 'Blasen-Marma'} , marmaGrp: {sanskrit: 'snayu', de: 'Sehnen-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'mittig', anatomy: 'Blase', explanation: 'Mittig im Becken und beschreibt die Blase'} , info: {typography: 'बस्ति', origin: '-', tipp: '-'}  },
{ id: 'gulpha_ll', marmaName: {sanskrit: 'gulpha ', de: 'Fußgelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'linkes Fußgelenk', explanation: 'im Gelenk zwischen Fuß und Unterschenkel'} , info: {typography: 'गुल्फ ', origin: 'Knöchel oder auch zwei', tipp: 'Nutze ein Band als Lot in einem Standasana wie Tadasa, um zu prüfen, ob dein Fußgelenk gut ausgerichtet ist.'}  },
{ id: 'gulpha_rl', marmaName: {sanskrit: 'gulpha ', de: 'Fußgelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'rechtes Fußgelenk', explanation: 'im Gelenk zwischen Fuß und Unterschenkel'} , info: {typography: 'गुल्फ ', origin: 'Knöchel oder auch zwei', tipp: 'Nutze ein Band als Lot in einem Standasana wie Tadasa, um zu prüfen, ob dein Fußgelenk gut ausgerichtet ist.'}  },
{ id: 'manibandha_la', marmaName: {sanskrit: 'maṇibandha', de: 'Handgelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'linkes Handgelenk', explanation: 'im Gelenk zwischen Hand und Unterarm'} , info: {typography: 'मणिबन्ध ', origin: 'Anlegung von Juwelen (maṇi = juwelen)', tipp: 'Prüfe im Vierfüßlerstand, ob dein Handgelenk gut ausgerichtet und frei von Druck ist. Nutze den Kraftort kṣipra um die Last aufzunhemen.'}  },
{ id: 'manibandha_ra', marmaName: {sanskrit: 'maṇibandha', de: 'Handgelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'rechtes Handgelenk', explanation: 'im Gelenk zwischen Hand und Unterarm'} , info: {typography: 'मणिबन्ध ', origin: 'Anlegung von Juwelen (maṇi = juwelen)', tipp: 'Prüfe im Vierfüßlerstand, ob dein Handgelenk gut ausgerichtet und frei von Druck ist. Nutze den Kraftort kṣipra um die Last aufzunhemen.'}  },
{ id: 'krkatika_l', marmaName: {sanskrit: 'kṛkāṭikā', de: 'Halswirbelsäule-Kopf-Gelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Kopf', bodySide: 'links', anatomy: 'Gelenk zwiechen Schädelknochen und obersten Halswirbel', explanation: 'am Übergang zwischen Halswirbelsäule und Schädel. An der linken kleinen Auflagefläche des obersten Halswirbels'} , info: {typography: 'कृकाटिका', origin: 'Hals oder Halsgelenk', tipp: 'Nehme die Fingerspitzen deiner Zeigefinger hinter die Ohren und bilde eine gedachte Achse. Mache langsame Nick-Bewegungen um den Ort des Gelenks wahrzunehmen.'}  },
{ id: 'krkatika_r', marmaName: {sanskrit: 'kṛkāṭikā', de: 'Halswirbelsäule-Kopf-Gelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Kopf', bodySide: 'rechts', anatomy: 'Gelenk zwiechen Schädelknochen und obersten Halswirbel', explanation: 'am Übergang zwischen Halswirbelsäule und Schädel. An der rechten kleinen Auflagefläche des obersten Halswirbels'} , info: {typography: 'कृकाटिका', origin: 'Hals oder Halsgelenk', tipp: 'Nehme die Fingerspitzen deiner Zeigefinger hinter die Ohren und bilde eine gedachte Achse. Mache langsame Nick-Bewegungen um den Ort des Gelenks wahrzunehmen.'}  },
{ id: 'kukundara_l', marmaName: {sanskrit: 'kukundara', de: 'Hüftgelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'linkes Hüftgelenk', explanation: 'im Gelenk zwischen Oberschenkel und Hüftknochen. Die Querachse zwischen den beiden Gelenken links und rechts findest du ca. 3 Finger breit über dem Rollhügel'} , info: {typography: 'कुकुन्दर', origin: 'Kundara = Höhle, Höhler der Lenden.', tipp: 'Fasse dir mit beiden Händen an die Seite des Hüftgelenks. Stelle dir vor, wie das Becken um die Oberschenkelkugel rollt, während du dich langsam nach vorne streckst.'}  },
{ id: 'kukundara_r', marmaName: {sanskrit: 'kukundara', de: 'Hüftgelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'rechtes Hüftgelenk', explanation: 'im Gelenk zwischen Oberschenkel und Hüftknochen. Die Querachse zwischen den beiden Gelenken links und rechts findest du ca. 3 Finger breit über dem Rollhügel'} , info: {typography: 'कुकुन्दर', origin: 'Kundara = Höhle, Höhler der Lenden.', tipp: 'Fasse dir mit beiden Händen an die Seite des Hüftgelenks. Stelle dir vor, wie das Becken um die Oberschenkelkugel rollt, während du dich langsam nach vorne streckst.'}  },
{ id: 'janu_ll', marmaName: {sanskrit: 'jānu', de: 'Kniegelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'linkes Kniegelenk', explanation: 'im Gelenk zwischen Oberschenkelknochen und Schien- sowie Wadenbein'} , info: {typography: 'जानु', origin: '-', tipp: 'Achte darauf, dass Ober- und Unterschenkel in einer Achse sind. Drehbewegungen des Beines finden immer in der Hüfte statt, nicht am Knie.'}  },
{ id: 'janu_rl', marmaName: {sanskrit: 'jānu', de: 'Kniegelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'rechtes Kniegelenk', explanation: 'im Gelenk zwischen Oberschenkelknochen und Schien- sowie Wadenbein'} , info: {typography: 'जानु', origin: '-', tipp: 'Achte darauf, dass Ober- und Unterschenkel in einer Achse sind. Drehbewegungen des Beines finden immer in der Hüfte statt, nicht am Knie. Vermeide das Knie zu überstrecken, im zweifel ist es besser das Bein leicht zu winkeln.'}  },
{ id: 'kurpara_la', marmaName: {sanskrit: 'kūrpara', de: 'Ellenbogengelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'linker Ellenbogen', explanation: 'im Gelenk zwischen Oberarmknochen und Elle sowie Speiche'} , info: {typography: 'कूर्पर', origin: '-', tipp: 'Achte in Positionen wie dem herbaschauenden Hund darauf, dass die Ellenbogen nach außen zeigen. Vermeide eine Überstreckung des Armes.'}  },
{ id: 'kurpara_ra', marmaName: {sanskrit: 'kūrpara', de: 'Ellenbogengelenk-Marma'} , marmaGrp: {sanskrit: 'sandhi', de: 'Gelenk-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'rechter Ellenbogen', explanation: 'im Gelenk zwischen Oberarmknochen und Elle sowie Speiche'} , info: {typography: 'कूर्पर', origin: '-', tipp: 'Achte in Positionen wie dem herbaschauenden Hund darauf, dass die Ellenbogen nach außen zeigen. Vermeide eine Überstreckung des Armes.'}  },
{ id: 'indravasti_ll', marmaName: {sanskrit: 'indravasti', de: 'Wadenmitte-Marma'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskel-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'Wadenmuskel', explanation: 'tiefliegend in der Mitte der Wadenmuskulatur'} , info: {typography: 'इन्द्रवस्ति ', origin: 'Indra = Gottheit, vasti = innewohnen ', tipp: 'Spürst du ein Zerren in der Wade oder schläft vielleicht sogar der Fuß ein, versuche locker zu lassen. Manchmal kann es helfen das bein etwas zu winkeln.'}  },
{ id: 'indravasti_rl', marmaName: {sanskrit: 'indravasti', de: 'Wadenmitte-Marma'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskel-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'Wadenmuskel', explanation: 'tiefliegend in der Mitte der Wadenmuskulatur'} , info: {typography: 'इन्द्रवस्ति ', origin: 'Indra = Gottheit, vasti = innewohnen ', tipp: 'Spürst du ein Zerren in der Wade oder schläft vielleicht sogar der Fuß ein, versuche locker zu lassen. Manchmal kann es helfen das bein etwas zu winkeln.'}  },
{ id: 'indravasti_la', marmaName: {sanskrit: 'indravasti', de: 'Unterarmmitte-Marma'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskel-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Unterarmmuskel', explanation: 'tiefliegend in der Mitte der Unterarmmuskulatur'} , info: {typography: 'इन्द्रवस्ति ', origin: 'Indra = Gottheit, vasti = innewohnen ', tipp: 'Spürst du ein Zerren am Unterarm versuche hier locker zu lassen. Manchmal hilft es das āṇi besser anzusteuern.'}  },
{ id: 'indravasti_ra', marmaName: {sanskrit: 'indravasti', de: 'Unterarmmitte-Marma'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskel-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Unterarmmuskel', explanation: 'tiefliegend in der Mitte der Unterarmmuskulatur'} , info: {typography: 'इन्द्रवस्ति ', origin: 'Indra = Gottheit, vasti = innewohnen ', tipp: 'Spürst du ein Zerren am Unterarm versuche hier locker zu lassen. Manchmal hilft es das āṇi besser anzusteuern.'}  },
{ id: 'talahridaya_ll', marmaName: {sanskrit: 'talahṛdaya', de: 'Fußsohlen-Marma'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskel-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'linke Fußsohle', explanation: 'in der Fußsohlenmuskulatur. Vorstellbar wie ein weiches Ausbreiten aus der Fußsohlenmitte'} , info: {typography: 'तलहृदय ', origin: 'tala = Oberfläche und hṛdaya =Herz', tipp: 'Willst du die Entspannung und Ausdehnung im talahṛdaya stimmulieren bringe alle Fingerspitzen in der Mitte der Fußsohle zusammen und fahre mit allen Fingern gleichzeitig auseinander.'}  },
{ id: 'talahridaya_rl', marmaName: {sanskrit: 'talahṛdaya', de: 'Fußsohlen-Marma'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskel-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'rechte Fußsohle', explanation: 'in der Fußsohlenmuskulatur. Vorstellbar wie ein weiches Ausbreiten aus der Fußsohlenmitte'} , info: {typography: 'तलहृदय ', origin: '-', tipp: 'Willst du die Entspannung und Ausdehnung im talahṛdaya stimmulieren bringe alle Fingerspitzen in der Mitte der Fußsohle zusammen und fahre mit allen Fingern gleichzeitig auseinander.'}  },
{ id: 'talahridaya_la', marmaName: {sanskrit: 'talahṛdaya', de: 'Handflächen-Marma'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskel-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'linke Handfläche', explanation: 'in der Handflächenmuskulatur. Vorstellbar wie ein weiches Ausbreiten aus der Handflächenmitte'} , info: {typography: 'तलहृदय ', origin: '-', tipp: 'Willst du die Entspannung und Ausdehnung im talahṛdaya stimmulieren bringe alle Fingerspitzen in der Mitte der anderen Handfläche zusammen und fahre mit allen Fingern gleichzeitig auseinander.'}  },
{ id: 'talahridaya_ra', marmaName: {sanskrit: 'talahṛdaya', de: 'Handflächen-Marma'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskel-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'rechte Handfläche', explanation: 'in der Handflächenmuskulatur. Vorstellbar wie ein weiches Ausbreiten aus der Handflächenmitte'} , info: {typography: 'तलहृदय ', origin: '-', tipp: 'Willst du die Entspannung und Ausdehnung im talahṛdaya stimmulieren bringe alle Fingerspitzen in der Mitte der anderen Handfläche zusammen und fahre mit allen Fingern gleichzeitig auseinander.'}  },
{ id: 'stanarohita_l', marmaName: {sanskrit: 'stanarohita', de: 'Brustkorbaufrichtungs-Marma'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskel-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'Brustmuskel (pectoralis minor)', explanation: 'rechts auf der Vorderseite des Brustkorps oberhalb der Brustwarze'} , info: {typography: 'स्तनरोहित', origin: '-', tipp: 'Lege deine Hände links und rechts neben dem Brustbein auf dein Brustkorb. Versuche diese Gegend zu entspannen, während sich der Brustkorb nach links und rechts ausdehnt.'}  },
{ id: 'stanarohita_r', marmaName: {sanskrit: 'stanarohita', de: 'Brustkorbaufrichtungs-Marma'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskel-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'Brustmuskel (pectoralis minor)', explanation: 'links auf der Vorderseite des Brustkorps oberhalb der Brustwarze'} , info: {typography: 'स्तनरोहित', origin: '-', tipp: 'Lege deine Hände links und rechts neben dem Brustbein auf dein Brustkorb. Versuche diese Gegend zu entspannen, während sich der Brustkorb nach links und rechts ausdehnt.'}  },
{ id: 'guda_c', marmaName: {sanskrit: 'guḍa', de: 'Beckenboden-Marma'} , marmaGrp: {sanskrit: 'mamsa', de: 'Muskel-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'mittig', anatomy: 'Beckenboden ( Rektum, bzw. Anus)', explanation: 'am Beckenboden'} , info: {typography: 'गुद', origin: '-', tipp: '-'}  },
{ id: 'urvi_ll', marmaName: {sanskrit: 'urvī', de: 'Oberschenkelmitte-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'innenseite des linken Beins', explanation: 'an der Innenseite des linken Oberschenkels. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberschenkels'} , info: {typography: 'उर्वी ', origin: 'Land, Erde', tipp: '-'}  },
{ id: 'urvi_rl', marmaName: {sanskrit: 'urvī', de: 'Oberschenkelmitte-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'innenseite des rechten Beins', explanation: 'an der Innenseite des rechten Oberschenkels. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberschenkels'} , info: {typography: 'उर्वी ', origin: 'Land, Erde', tipp: '-'}  },
{ id: 'bahvi_la', marmaName: {sanskrit: 'bāhvī', de: 'Oberarmmitte-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'innenseite des linken Arms', explanation: 'an der Innenseite des linken Oberarms. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberarms'} , info: {typography: 'बाह्वी', origin: 'Arm', tipp: 'Umfasse deinen linken Oberarm mit deiner rechten Hand, der Daumen auf der Innenseite, die anderen Finger auf der Außenseite. Erspüre mit dem Daumen in der Mitte des Oberarms die pulsierende Blutbahn.'}  },
{ id: 'bahvi_ra', marmaName: {sanskrit: 'bāhvī', de: 'Oberarmmitte-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'innenseite des rechten Arms', explanation: 'an der Innenseite des rechten Oberarms. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberarms'} , info: {typography: 'बाह्वी', origin: 'Arm', tipp: 'Umfasse deinen rechten Oberarm mit deiner linken Hand, der Daumen auf der Innenseite, die anderen Finger auf der Außenseite. Erspüre mit dem Daumen in der Mitte des Oberarms die pulsierende Blutbahn.'}  },
{ id: 'lohitaksha_ll', marmaName: {sanskrit: 'lohitākṣa', de: 'Beinblutfluss-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'Unterhalb des Leistenwinkels an der Oberschenkelwurzel', explanation: 'an der Innenseite des linken Oberschenkelansatzes. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberschenkels'} , info: {typography: 'लोहिताक्ष', origin: 'rotes Auge', tipp: 'Achte beim Üben darauf dein Bein zentriert in der Achse zu halten. Kippt dein Bein zu weit nach innen blockiertst du das lohitākṣa.'}  },
{ id: 'lohitaksha_rl', marmaName: {sanskrit: 'lohitākṣa', de: 'Beinblutfluss-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'Unterhalb des Leistenwinkels an der Oberschenkelwurzel', explanation: 'an der Innenseite des rechten Oberschenkelansatzes. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberschenkels'} , info: {typography: 'लोहिताक्ष', origin: 'rotes Auge', tipp: 'Achte beim Üben darauf dein Bein zentriert in der Achse zu halten. Kippt dein Bein zu weit nach innen blockiertst du das lohitākṣa.'}  },
{ id: 'lohitaksha_la', marmaName: {sanskrit: 'lohitākṣa', de: 'Armblutfluss-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'links', anatomy: 'Unterhalb der Achselhöle an der Oberarmwurzel', explanation: 'an der Innenseite des linken Oberarmansatzes. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberarms'} , info: {typography: 'लोहिताक्ष', origin: 'rotes Auge', tipp: 'Achte beim Üben darauf deinen Arm zentriert in der Achse zu halten. Dreht der Arm zu weit nach innen blockiertst du das lohitākṣa. Auch wenn die Schultern nach oben oder nach hinten gezogen werden kann das zu Druck im lohitākṣa führen.'}  },
{ id: 'lohitaksha_ra', marmaName: {sanskrit: 'lohitākṣa', de: 'Armblutfluss-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Arm', bodySide: 'rechts', anatomy: 'Unterhalb der Achselhöle an der Oberarmwurzel', explanation: 'an der Innenseite des rechten Oberarmansatzes. An dem Ort verlaufen Blutbahnen und Nervenstränge in einer Muskelloge des Oberarms'} , info: {typography: 'लोहिताक्ष', origin: 'rotes Auge', tipp: 'Achte beim Üben darauf deinen Arm zentriert in der Achse zu halten. Dreht der Arm zu weit nach innen blockiertst du das lohitākṣa. Auch wenn die Schultern nach oben oder nach hinten gezogen werden kann das zu Druck im lohitākṣa führen.'}  },
{ id: 'vitapa_ll', marmaName: {sanskrit: 'viṭapa', de: 'Leisten-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'links', anatomy: 'linke Leistengegend', explanation: 'am Übergang zwischen Rumpf und Bein in der Leistengegend'} , info: {typography: 'विटप', origin: 'Ast oder Zweig', tipp: 'Um viṭapa bei Vorstreckübungen nicht zu blockieren muss die Leistengegend Platz bekommen. Versuche den Rumpf zu strecken und dann über die Hüftgelenke zu drehen. Achte darauf nicht nach vorne in die Leiste "zu fallen" sondern halte den Rumpf stabil.'}  },
{ id: 'vitapa_rl', marmaName: {sanskrit: 'viṭapa', de: 'Leisten-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Bein', bodySide: 'rechts', anatomy: 'rechte Leistengegend', explanation: 'am Übergang zwischen Rumpf und Bein in der Leistengegend'} , info: {typography: 'विटप', origin: 'Ast oder Zweig', tipp: 'Um viṭapa bei Vorstreckübungen nicht zu blockieren muss die Leistengegend Platz bekommen. Versuche den Rumpf zu strecken und dann über die Hüftgelenke zu drehen. Achte darauf nicht nach vorne in die Leiste "zu fallen" sondern halte den Rumpf stabil.'}  },
{ id: 'stanamula_l', marmaName: {sanskrit: 'stanamūla', de: 'Bruskorbboden-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'linker unterer Brustkorb vorne', explanation: 'am linken untersten Rippenbogen, von der seitlichen Spitze der linken Rippe bis zum Brustbein'} , info: {typography: 'स्तनमूल', origin: 'Wurzel der Brust', tipp: 'Denke an eine Ausdehnung der unteren Rippen nach links un rechts um deinen Organen und der Lunge Platz zu geben.'}  },
{ id: 'stanamula_r', marmaName: {sanskrit: 'stanamūla', de: 'Bruskorbboden-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'rechter unterer Brustkorb vorne', explanation: 'am rechten untersten Rippenbogen, von der seitlichen Spitze der rechten Rippe bis zum Brustbein'} , info: {typography: 'स्तनमूल', origin: 'Wurzel der Brust', tipp: 'Denke an eine Ausdehnung der unteren Rippen nach links un rechts um deinen Organen und der Lunge Platz zu geben.'}  },
{ id: 'parsvasandhi_l', marmaName: {sanskrit: 'pārśvasandhi', de: 'Rippen-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'oberhalb der rechten Niere', explanation: 'am rechten hinteren Rumpf oberhalb der Niere'} , info: {typography: 'सन्धिपार्श्व', origin: 'pārśva = Seiten; sandhi = Verbindung, Gelenke', tipp: 'Lege dich auf den Boden. Spüre, wie sich die hinteren Rippen entspannt ausbreiten können. Stelle dir vor, dass sich die Organe hieraußbreiten können. Für eine Andere Wahrnehmungsübung befestige einen Gurt zum Besipiel an einem Tischbein und lege es dir in einem Sitzasana um den unteren Brustkorb, so dass durch den Gurt die Rundung und entpannte Außdehnung der hinternen Rippen wahrnehmbar wird. '}  },
{ id: 'parsvasandhi_r', marmaName: {sanskrit: 'pārśvasandhi', de: 'Rippen-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'oberhalb der linken Niere', explanation: 'am linken hinteren Rumpf oberhalb der Niere'} , info: {typography: 'सन्धिपार्श्व', origin: 'pārśva = Seiten; sandhi = Verbindung, Gelenke', tipp: 'Lege dich auf den Boden. Spüre, wie sich die hinteren Rippen entspannt ausbreiten können. Stelle dir vor, dass sich die Organe hieraußbreiten können. Für eine Andere Wahrnehmungsübung befestige einen Gurt zum Besipiel an einem Tischbein und lege es dir in einem Sitzasana um den unteren Brustkorb, so dass durch den Gurt die Rundung und entpannte Außdehnung der hinternen Rippen wahrnehmbar wird. '}  },
{ id: 'brhati_l', marmaName: {sanskrit: 'bṛhatī', de: 'Rückenstreck-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'Mitte des Rückens, links der Bruswirbelsäule, auf einer Höhe mit dem am vorderen Brustkorp befindlichen stanarohita', explanation: 'auf mittlerer Höhe der Rückseite des Brustkorbs. '} , info: {typography: 'बृहती ', origin: '-', tipp: 'Lege dich auf den Boden. Spüre, wie sich deine Schulterblätter und der Rumpf zwischen den Schulterblättern entspannt am Boden ablegen.'}  },
{ id: 'brhati_r', marmaName: {sanskrit: 'bṛhatī', de: 'Rückenstreck-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'Mitte des Rückens, links der Bruswirbelsäule, auf einer Höhe mit dem am vorderen Brustkorp befindlichen stanarohita', explanation: 'auf mittlerer Höhe der Rückseite des Brustkorbs. '} , info: {typography: 'बृहती ', origin: '-', tipp: 'Lege dich auf den Boden. Spüre, wie sich deine Schulterblätter und der Rumpf zwischen den Schulterblättern entspannt am Boden ablegen.'}  },
{ id: 'apastambha_l', marmaName: {sanskrit: 'apastambha', de: 'Lungepforte / Lungenstütze'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'linker Hauptbronchus', explanation: 'mittig im Brustkorb, von vorne betrachtet links des Brustbeins. Dieser Ort beschreibt die erste Gabelung der Luftröhre um den linken Lungenflügel mit Luft zu versorgen'} , info: {typography: 'अपस्तम्भ', origin: 'apa = weg / hinab, stambha = geführt, stabil', tipp: 'Atme ein und aus. Spüre wie sich beim Ausatmen hinter deinem Brustbein die Lunge entspannt senkt.'}  },
{ id: 'apastambha_r', marmaName: {sanskrit: 'apastambha', de: 'Lungepforte / Lungenstütze'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'rechter Hauptbronchus', explanation: 'mittig im Brustkorb, von vorne betrachtet rechts des Brustbeins. Dieser Ort beschreibt die erste Gabelung der Luftröhre um den rechten Lungenflügel mit Luft zu versorgen'} , info: {typography: 'अपस्तम्भ', origin: 'apa = weg / hinab, stambha = geführt, stabil', tipp: 'Atme ein und aus. Spüre wie sich beim Ausatmen hinter deinem Brustbein die Lunge entspannt senkt.'}  },
{ id: 'apalapa_l', marmaName: {sanskrit: 'apalāpa', de: 'Achselhöhlen-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'Achselhöhle', explanation: 'an der Achselhöhle, zwischen Oberarmgelenk und Brustkorb'} , info: {typography: 'अपलाप', origin: '-', tipp: '-'}  },
{ id: 'apalapa_r', marmaName: {sanskrit: 'apalāpa', de: 'Achselhöhlen-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'Achselhöhle', explanation: 'an der Achselhöhle, zwischen Oberarmgelenk und Brustkorb'} , info: {typography: 'अपलाप', origin: '-', tipp: '-'}  },
{ id: 'nabhi_c', marmaName: {sanskrit: 'nābhi', de: 'Nabel-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'mittig', anatomy: 'Nabel', explanation: 'am Nabel'} , info: {typography: 'नाभि', origin: '-', tipp: '-'}  },
{ id: 'hrdaya_c', marmaName: {sanskrit: 'hṛdaya', de: 'Herz-Marma'} , marmaGrp: {sanskrit: 'sira', de: 'Blutgefäß-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'mittig', anatomy: 'Herz', explanation: 'Mittig im Brustkorb und beschreibt den Herzmuskel'} , info: {typography: 'हृदय', origin: '-', tipp: '-'}  },
{ id: 'nitamba_l', marmaName: {sanskrit: 'nitamba', de: 'Hüftknochen-Marma'} , marmaGrp: {sanskrit: 'asthi', de: 'Knochen-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'Mitte der linken Beckenschaufel', explanation: 'in der Mitte der Beckenschaufeln. Vorstellbar wie der Punkt an dem das Becken gleichmäßig aufgerichtet werden kann'} , info: {typography: 'नितम्ब ', origin: 'das Gesäß', tipp: 'Fahre mit Dauem und Zeigefinger von vorne nach hinten die obere Kante deines Beckens ab. Lege beide Handflächen von hinten auf deine Hüftknochen. Mache dir bewusst, das diese große knöcherne Schale deine Organe hält. Versuche das Becken daher nicht nach vorne kippen zu lassen. Vielleicht hilft dir die Vorstellung der Hänkel eines Wäschekorbes.'}  },
{ id: 'nitamba_r', marmaName: {sanskrit: 'nitamba', de: 'Hüftknochen-Marma'} , marmaGrp: {sanskrit: 'asthi', de: 'Knochen-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'Mitte der rechten Beckenschaufel', explanation: 'in der Mitte der Beckenschaufeln. Vorstellbar wie der Punkt an dem das Becken gleichmäßig aufgerichtet werden kann'} , info: {typography: 'नितम्ब ', origin: 'das Gesäß', tipp: 'Fahre mit Dauem und Zeigefinger von vorne nach hinten die obere Kante deines Beckens ab. Lege beide Handflächen von hinten auf deine Hüftknochen. Mache dir bewusst, das diese große knöcherne Schale deine Organe hält. Versuche das Becken daher nicht nach vorne kippen zu lassen. Vielleicht hilft dir die Vorstellung der Hänkel eines Wäschekorbes.'}  },
{ id: 'amsaphalaka_l', marmaName: {sanskrit: 'aṃsaphalaka', de: 'Schulterblatt-Marma'} , marmaGrp: {sanskrit: 'asthi', de: 'Knochen-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'Mitte des linken Schulterblatts', explanation: 'in der Mitte des Schulterblatts'} , info: {typography: 'अंसफलक ', origin: 'oberer Teil der Wirbelsäule, Schulterblatt', tipp: 'Kreise deine Schulter und spüre wie beweglich dein Schulterblatt ist. Beim Yogaüben möchten wir in den Haltungen, dass das Schulterblatt entspannt an den Rippen anliegt.'}  },
{ id: 'amsaphalaka_r', marmaName: {sanskrit: 'aṃsaphalaka', de: 'Schulterblatt-Marma'} , marmaGrp: {sanskrit: 'asthi', de: 'Knochen-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'Mitte des rechten Schulterblatts', explanation: 'in der Mitte des Schulterblatts'} , info: {typography: 'अंसफलक ', origin: 'oberer Teil der Wirbelsäule, Schulterblatt', tipp: 'Kreise deine Schulter und spüre wie beweglich dein Schulterblatt ist. Beim Yogaüben möchten wir in den Haltungen, dass das Schulterblatt entspannt an den Rippen anliegt.'}  },
{ id: 'katikataruna_l', marmaName: {sanskrit: 'kaṭīkataruṇa', de: 'Kreuzbein-Darmbein-Marma'} , marmaGrp: {sanskrit: 'asthi', de: 'Knochen-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'links', anatomy: 'linker Übergang des starren Gelenks Kreuzbein und Darmbein', explanation: 'am unterer Rücken beim Übergang Kreuzbein und Darmbein'} , info: {typography: 'कटीकतरुण ', origin: '-', tipp: 'Lege dich mit dem Rücken auf den Boden und stelle die Beine an. Spüre deinen unterer Rücken und Kreutzbein flächig am Boden aufliegen. Stelle dir eine flächige Ausdehnung vor.'}  },
{ id: 'katikataruna_r', marmaName: {sanskrit: 'kaṭīkataruṇa', de: 'Kreuzbein-Darmbein-Marma'} , marmaGrp: {sanskrit: 'asthi', de: 'Knochen-Marma'} , location: {bodyRegion: 'Rumpf', bodySide: 'rechts', anatomy: 'rechter Übergang des starren Gelenks Kreuzbein und Darmbein', explanation: 'am unterer Rücken beim Übergang Kreuzbein und Darmbein'} , info: {typography: 'कटीकतरुण ', origin: '-', tipp: 'Lege dich mit dem Rücken auf den Boden und stelle die Beine an. Spüre deinen unterer Rücken und Kreutzbein flächig am Boden aufliegen. Stelle dir eine flächige Ausdehnung vor.'}  },

		];

		request.onupgradeneeded = (event) => {
			db = event.target.result;
			console.log("Current IndexedDB version:", event.oldVersion);
			console.log("Updating Database to Version:", event.newVersion);

			// Create "asanaStore" if it doesn't exist
			if (!db.objectStoreNames.contains("asanaStore")) {
				console.log("creating asanaStore ...");
				let asanaStore = db.createObjectStore("asanaStore", { keyPath: "id" });
				asanaStore.createIndex('asanaNameSK', 'asanaName.sanskrit', { unique: false });
				asanaStore.createIndex('asanaNameDE', 'asanaName.de', { unique: false });
				asanaStore.createIndex('position', 'info.position', { unique: false });
				asanaStore.createIndex('level', 'info.level', { unique: false });
				asanaStore.createIndex('block', 'aids.block', { unique: false });
				asanaStore.createIndex('belt', 'aids.belt', { unique: false });
				asanaStore.createIndex('roll', 'aids.roll', { unique: false });
				asanaStore.createIndex('blanket', 'aids.blanket', { unique: false });
				asanaStore.createIndex('chair', 'aids.chair', { unique: false });
				asanaStore.createIndex('wall', 'aids.wall', { unique: false });
			}

			// Create "knowledgeStore" if it doesn't exist
			if (!db.objectStoreNames.contains("knowledgeStore")) {
				console.log("creating knowledgeStore ...");
				let knowledgeStore = db.createObjectStore("knowledgeStore", { keyPath: "id" });
				knowledgeStore.createIndex('topic', 'topic', { unique: false });
				knowledgeStore.createIndex('lesson', 'lesson', { unique: false });
				knowledgeStore.createIndex('order', 'order', { unique: false });
				knowledgeStore.createIndex('category', 'category', { unique: false });
			}

			// Create "progressStore" if it doesn't exist
			if (!db.objectStoreNames.contains("progressStore")) {
				console.log("creating progressStore ...");
				let progressStore = db.createObjectStore("progressStore", { keyPath: "id" });
				progressStore.createIndex('topic', 'topic', { unique: false });
				progressStore.createIndex('order', 'order', { unique: false });
				progressStore.createIndex('done', 'done', { unique: false });
				progressStore.createIndex('favorite', 'favorite', { unique: false });
			}

			// Create "marmaStore" if it doesn't exist
			if (!db.objectStoreNames.contains("marmaStore")) {
				console.log("creating marmaStore ...");
				let marmaStore = db.createObjectStore("marmaStore", { keyPath: "id" });
				marmaStore.createIndex('marmaName', 'marmaName.sanskrit', { unique: false });
				marmaStore.createIndex('marmaGrp', 'marmaGrp.sanskrit', { unique: false });
				marmaStore.createIndex('bodyRegion', 'location.bodyRegion', { unique: false });
				marmaStore.createIndex('bodySide', 'location.bodySide', { unique: false });
				//marmaStore.createIndex('info', ["typography", "origin", "tipp"], { unique: false }); // compound indexes
			} else {
				// If upgrading from an older version, modify indexes as needed
				console.log("Updating marmaStore indexes...");
				marmaStore = event.target.transaction.objectStore("marmaStore");

				// Update indexes conditionally based on oldVersion
				if (event.oldVersion < 2) {
					console.log("Updating indexes for version 2...");
					
				const indicesV2 = [
					{ name: "marmaName", keyPath: "marmaName.sanskrit" },
					{ name: "marmaGrp", keyPath: "marmaGrp.sanskrit" },
					{ name: "bodyRegion", keyPath: "location.bodyRegion" },
					{ name: "bodySide", keyPath: "location.bodySide" }
				];

				indicesV2.forEach(({ name, keyPath }) => {
					if (marmaStore.indexNames.contains(name)) {
						marmaStore.deleteIndex(name);
					}
					marmaStore.createIndex(name, keyPath, { unique: false });
				});

				}
				console.log("Indexes updated successfully.");
			}

			// Create "marmaValueStore" if it doesn't exist
			if (!db.objectStoreNames.contains("marmaValueStore")) {
				console.log("creating marmaValueStore ...");
				let marmaValueStore = db.createObjectStore("marmaValueStore", { keyPath: "id" });
				marmaValueStore.createIndex('localisation', 'localisation', { unique: false });
				marmaValueStore.createIndex('awareness', 'awareness', { unique: false });
				marmaValueStore.createIndex('frequency', 'frequency', { unique: false });
			}
		};

		request.onsuccess = (event) => {
			db = event.target.result;
			console.log("Database OPEN");
			console.log("Current IndexedDB version:", db.version);

			// Create a transaction for both knowledgeStore and progressStore
			const { transaction, stores } = getStores(db, ["asanaStore", "knowledgeStore", "progressStore", "marmaStore", "marmaValueStore"], "readwrite");

			const asanaStore = stores["asanaStore"];
			const knowledgeStore = stores["knowledgeStore"];
			const progressStore = stores["progressStore"];
			const marmaStore = stores["marmaStore"];
			const marmaValueStore = stores["marmaValueStore"];

			// Update asanaStore
			console.log("Updating Asana Data...");
			// Create a map for quick lookup of new data
			const newAsanaDataMap = new Map(initialAsanaData.map(asana => [asana.id, asana]));

			// Retrieve all existing items in the asanaStore
			asanaStore.getAll().onsuccess = (event) => {
				const existingAsanas = event.target.result;
				const existingAsanaIds = new Set(existingAsanas.map(item => item.id));

				// Update or Add items in asanaStore
				initialAsanaData.forEach(asana => {
					const isNew = !existingAsanaIds.has(asana.id); // Check if the asana is new

					// Add or update the asana in asanaStore
					//console.log("Updating Data: " + asana.id);
					asanaStore.put(asana);

					// Remove the processed id from the existingIds set
					existingAsanaIds.delete(asana.id);
				});

				// Delete items not in the new data from both stores (left over ids in the map)
				existingAsanaIds.forEach(id => {
					console.log("Deleting: " + id);
					asanaStore.delete(id); // Delete from asanaStore
				});

				console.log("Asana Data updated");
			};


			// Update knowledgeStore
			console.log("Updating Knowledge Data...");
			// Create a map for quick lookup of new data
			const newKnowledgeDataMap = new Map(initialKnowledgeData.map(lesson => [lesson.id, lesson]));

			// Retrieve all existing items in the knowledgeStore
			knowledgeStore.getAll().onsuccess = (event) => {
				const existingKnowledgeItems = event.target.result;
				const existingKnowledgeIds = new Set(existingKnowledgeItems.map(item => item.id));

				// Update or Add items in knowledgeStore
				initialKnowledgeData.forEach(lesson => {
					const isNew = !existingKnowledgeIds.has(lesson.id); // Check if the lesson is new

					// Add or update the lesson in knowledgeStore
					//console.log("Updating Data: " + lesson.id);
					knowledgeStore.put(lesson);

					if (isNew) {
						// If the lesson is new, add a corresponding entry in progressStore
						console.log("Creating: " + lesson.id);
						progressStore.put({
							id: lesson.id,
							topic: lesson.topic,
							order: lesson.order,
							done: 0,
							favorite: 0
						});
					}

					// Remove the processed id from the existingIds set
					existingKnowledgeIds.delete(lesson.id);
				});

				// Delete items not in the new data from both stores (left over ids in the map)
				existingKnowledgeIds.forEach(id => {
					console.log("Deleting: " + id);
					knowledgeStore.delete(id); // Delete from knowledgeStore
					progressStore.delete(id); // Delete from progressStore
				});

				console.log("Knowledge Data updated");
			};

			// Update marmaStore every time
			console.log("Updating Marma Data...");
			// Create a map for easy lookup of new data
			const newMarmaDataMap = new Map(initialMarmaData.map(marma => [marma.id, marma]));

			// Fetch all existing items from marmaStore
			marmaStore.getAll().onsuccess = (event) => {
				const existingMarmaItems = event.target.result;
				const existingMarmaIds = new Set(existingMarmaItems.map(item => item.id));

				// Update or Add items in marmaStore
				initialMarmaData.forEach(marma => {
					const isNew = !existingMarmaIds.has(marma.id); // Check if the marma is new

					// Add or update the marma in marmaStore
					marmaStore.put(marma);
					
					marmaStore.get(marma.id).onsuccess = function(event) {
						console.log(event.target.result);
					};

					if (isNew) {
						// If new, create a corresponding entry in MarmaValueStore
						console.log("Initializing marma values for: " + marma.id);
						marmaValueStore.put({
							id: marma.id,
							localisation: 0,
							awareness: 0,
							frequency: 0
						});
					}

					// Remove the processed id from the existingIds set
					existingMarmaIds.delete(marma.id);
				});

				// Delete items not in the new data from all three stores
				existingMarmaIds.forEach(id => {
					console.log("Deleting: " + id);
					marmaStore.delete(id);
					marmaValueStore.delete(id);
				});

				console.log("Marma Data updated");
			};
			
			transaction.oncomplete = () => {
				console.log("Transaction complete");
				resolve(db);
			};

			transaction.onerror = (event) => {
				console.error("Transaction error: ", event.target.errorCode);
			};
		};
	});
}








//accessing multiple stores in one transaction
function getStores(db, storeNames, mode = "readonly") {
    if (!Array.isArray(storeNames) || storeNames.length === 0) {
        throw new Error("storeNames must be a non-empty array");
    }

    const tx = db.transaction(storeNames, mode);
    const stores = {};

    storeNames.forEach(name => {
        stores[name] = tx.objectStore(name);
    });

    return { transaction: tx, stores };
}

//only for one store in transaction 
function getObjectStore(db, storeName, mode) {
	if (Array.isArray(storeName)) {
        throw new Error("getObjectStore only supports a single store. For multiple stores, use getStores.");
		getStores(db, storeName, mode)
    }
    const transaction = db.transaction([storeName], mode);
    return transaction.objectStore(storeName);
}


//initDB()