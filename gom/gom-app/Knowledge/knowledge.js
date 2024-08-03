
// Open (or create) the database
var open = indexedDB.open("marmaDB", 1);
console.log("open Db ...");

// Create DB schema
open.onupgradeneeded = function(event) {
    let db = event.target.result;

    // Initial data
    const initialKnowledgeData = [
{ id: 'marmas_Basics', order: '1', topic: 'marmas', category: 'ayurveda', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Ein Marma ist ein bedeutsamer, vitaler Ort am Körper eines Menschen.', media: '', headline1: 'Herkunft', media1: '', text1: 'Marmas kommen aus der ayurvedischen Biologie. “Es sind die zentralen Stellen am menschlichen Körper, die sensitiv, verletztbar sind. Sie liegen offen da und sind durch Unfälle, Krankheit oder Angriffe besonders gefährdet. Verletzungen können zur invalidität führen, bzw. totbringend sein.” ¹', headline2: 'Marmas im Yoga-Kontext', media2: '', text2: 'In der Yogapraxis können uns die Marmapunkte helfen  unseren Körper wahrzunehmen.', headline3: '', media3: '', text3: 'Während es unmöglich ist alle Musklen in unserem Arm einzeln wahrzunehmen und anzusteuern ist es deutlich leichter zu denken "ich greife nach dem Glas". Das gelernte automatische Bewegungsmuster der Muskeln befähigt uns dann das Glas sicher zu greifen.', headline4: '', media4: '', text4: 'Genauso helfen uns die Marmapunkte die Haltungsmuster im Yoga besser einzuüben und wahrzunehmen. Mit einer guten Kenntniss der wichtigsten Punkte im Körper und einer guten Wahrnehmeung an diesen Stellen können Fehlhaltungen erkannt und verbessert werden.', headline5: '', media5: '', text5: '', outro: '', quote: '1) Yoga Ein Weg für dich, Reinhard Bögele 1996, Seite 43'}  },
{ id: 'marmas_MarmaGruppen', order: '2', topic: 'marmas', category: 'ayurveda', lesson: 'Marma Gruppen', icon: 'marmas.webp', content: {intro: '', media: '', headline1: 'Sehnen Marma (Snāyu स्नायु)', media1: '', text1: 'Sehnen Marmas sind im Yoga die kraftvollen Halteorte. Sie sind der Ort für schnelle dynamische Bewegung, aber auch für Entspannung.', headline2: 'Muskel Marma (Māṃsa मांस)', media2: '', text2: 'Im Yoga helfen uns die Muskelmarmas gezielt Orte zu enstpannen oder auszudehnen und zu strecken. Muskeln übernehmen die Feinmotorik.', headline3: 'Knochen Marma (Asthi अस्थि)', media3: '', text3: 'Knochen haben auch im Yoga eine stützende Funktion. Sie sind der Ansatzpunkt für die Sehnen.', headline4: 'Blutgefäß Marma (Sirā सिरा)', media4: '', text4: 'Im Yoga möchten wir Blut und Nervenbahnen nicht blockieren, sondern einen guten Fluss ermöglichen. Die Blutflussmarmas helfen uns Blokaden zu erkennen und zu vermeiden.', headline5: 'Gelenk Marma (Sandhi सन्धि)', media5: '', text5: 'Ein Gelenk ist eine stabile Verbindung von zwei oder mehr Knochen.', outro: '', quote: ''}  },
{ id: 'marmas_funfacts', order: '3', topic: 'marmas', category: 'ayurveda', lesson: 'fun facts', icon: 'fact-icon.webp', content: {intro: 'Einige Fun-Facts zu Marmas', media: '', headline1: '', media1: '', text1: 'Marma wird im Sanskrit मर्म geschrieben. Die sprachliche Wurzel “mr" heißt sterben. Marman heißt unter anderem der Kern, das Herz einer Sache.', headline2: '', media2: '', text2: 'Es gibt insgesammt 107 Marmas die in 5 Gruppen unterteilt sind: Sehnen Marmas, Muskel Marmas, Knochen Marmas, BlutgefäßMarmas und Gelenk Marmas.', headline3: '', media3: '', text3: 'Zuerst ausführlich erwähnt wurden Marmas vom Chirurgen Sushruta ca 150 v. Chr. ', headline4: '', media4: '', text4: 'In der ayurvedisschen Medizin haben Marmas 7 Bereiche: 3 Doshas und 3 Gunas (Prakriti) und Purusha.', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'fuß_Basics', order: '4', topic: 'fuß', category: 'anatomy', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Der Fuß ist das Fundament für unseren Körper. Eine gute, gesunde Körperaltung beginnt also schon mit der richtigen Fußhaltung.', media: '', headline1: '', media1: '', text1: 'Im Yoga-Kontext ist der Fuß vergleichbar mit den Wurzeln eines Baumes: stützend und nährend. Diese stützende Rolle ist nicht nur in stehenden, sondern auch in sitzenden oder liegenden Haltungen wichtig.', headline2: '', media2: '', text2: 'Im nächsten Abschnitt lernen wir mehr über die Anatomie des Fußes.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'fuß_Anatomie', order: '5', topic: 'fuß', category: 'anatomy', lesson: 'Anatomie', icon: 'anatomy-icon.webp', content: {intro: 'Schauen wir uns den Fuß von den verschiedenen Seiten an:', media: '<iframe src="foot/anatomy_foot.html"></iframe>', headline1: 'Obenansicht', media1: '<img src="foot/oberseite.png">', text1: 'Von der Obenansicht sehen wir gut die vier verschiedenen Bereiche: schwarz der Versenknochen, grün Fußwurzelknochen, blau die fünf Mittelfußknochen und rot die Zehenglieder.', headline2: 'Außenansicht', media2: '<img src="foot/ausenseite.png">', text2: 'In der Außenansicht (klein Zehen Seite) sehen wir, dass der Fuß nur am hinteren Versenknochen und erst wieder vorne am Ende des Mittelfußknochens auf dem Boden aufsteht. Am Vorderfuß stehen die Grundzehenglieder, die Mittelzehenglieder und die Endzehenglieder auf dem Boden.', headline3: 'Innenansicht', media3: '<img src="foot/innenseite.png">', text3: 'Auch in der Innenansicht (Großzehenseite) sehen wir, dass der Fuß auf dem hinteren Teil der Ferse und erst wieder vorne am Ende des Mittelfußknochens  auf dem Boden steht.', headline4: 'Untenansicht', media4: '<img src="foot/unterseite.png">', text4: 'Von unten betrachtet fällt der stabile Versenhöcker auf, der die Last des Körpers aufnehmen kann.', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'fuß_Wahrnehmungs-übung', order: '6', topic: 'fuß', category: 'anatomy', lesson: 'Wahrnehmungs- übung', icon: 'perception-icon.png', content: {intro: '', media: '', headline1: '', media1: '', text1: '', headline2: '', media2: '', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Sehnen marma_Basics', order: '7', topic: 'Sehnen marma', category: 'anatomy', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Sehnen Marmas sind im Yoga die kraftvollen Halteorte. Sie sind der Ort für schnelle dynamische Bewegung, aber auch für Entspannung.', media: '', headline1: 'Was sind Sehnen?', media1: '', text1: 'Sehnen bestehen aus straffen Bingewebe und und aus kollagenen Fasern. Sie haben eine hohe Zugfestigkeit und dehnen sich nur sehr wenig. Sehnen sind die Verbindung zwischen Knochen und Muskeln und übertragen die Kraft.', headline2: 'Eigenschaften der Sehnen im Yoga-Kontext', media2: '', text2: 'Mit Sehnen können z.B. die Eigenschaften stabil, schnell und glatt verknüpft werden.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Sehnen marma_YogaPraxis', order: '8', topic: 'Sehnen marma', category: 'anatomy', lesson: 'Yoga Praxis', icon: 'yoga-icon.webp', content: {intro: 'Im Yoga wollen wir uns die Kraftvole stabile Struktur der Sehen zu nutze machen.', media: '', headline1: 'Haltearbeit', media1: '', text1: 'Oft wird die Haltearbeit von unseren Muskeln übernommen, meist unbewust. In Yoga Haltungen wollen wir die Muskeln so viel wie möglich entspannen und die Haltearbeit über Knochenstütze und die Sehnen leisten.', headline2: 'Kraftort', media2: '', text2: 'Sehnen sind wichtige Kraftorte und stützen den Körper. Angespannt sind sie bereit die Kraft freizusetzten und kraftvolle, schnelle, dynamische Bewegungen auszulösen.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Muskel Marmas_Basics', order: '9', topic: 'Muskel Marmas', category: 'anatomy', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Im Yoga helfen uns die Muskelmarmas gezielt Orte zu enstpannen oder auszudehnen und zu strecken. Muskeln übernehmen die Feinmotorik.', media: '', headline1: 'Was sind Muskeln?', media1: '', text1: 'Muskeln bestehen haptsächlich aus zwei Arten von Musklefaser: tonische Fasern für Langanhaltende Haltearbeit und phasische Fasern für schnelle, kraftvolle Bewegungen.', headline2: 'Eigenschaften der Muskeln im Yoga-Kontext', media2: '', text2: 'Attribute der Muskeln sind üblicherweise fest, kompakt, hart oder locker und weich.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Muskel Marmas_Muskelgewebe', order: '10', topic: 'Muskel Marmas', category: 'anatomy', lesson: 'Muskelgewebe', icon: 'muscles-icon.webp', content: {intro: 'Die Skeletmuskulatur hält das Skelett zusammen bzw. gibt diesem Stabilität.', media: '', headline1: 'Aufbau', media1: '', text1: 'Die Verbindung von Knochen und Muskel bilden die Sehnen. Knochen sowie Muskeln werden von einer Haut umhüllt (Knochen-/ Muskelhaut), hieran sind Bänder (bindegewebige Haut) sowie äußerst stabile Sehnen (-platten) kompakt verwachsen.', headline2: 'Muskelfasern', media2: '<p>Muskelfasern können in zwei (Haupt-)Typen unterschieden werden.</p><p>Typ 1 sind die tonischen Fasern. Sie können langanhaltende Haltearbeit leisten und ermüden dabei nur langsam. Die Fasern haben eine rote Färbung.</p><p>Typ 2 sind die phasischen Fasern. Diese Fasern arbeiten schnell und kraftvoll, ermüden aber schnell. Die Fasern haben eine eher weiße Färbung.</p><p>Im Yoga wollen wir vor allem Muskeln mit einem hohen Anteil an tonischen Fasern nutzen, um mit wenig Kraftaufwand lange in den Übungen verharren zu können.</p>', text2: '', headline3: 'Aufgabe', media3: '', text3: 'Ein Muskel kann jeweils nur seine einzige bestimmungsgemäße Funktion ausführen. So muss es für verschiedene Funktionen verschiedene, entgegengesetzte Muskeln geben (Agonist + Antagonist). Zum Besipiel wird für die Armstreckung der Triezeps angezogen (Strecker) für die Beugung des Arms wird der Bizeps (Beuger) angezogen. Ein Muskel kann sich nicht von sich aus wieder strecken. Es braucht den Gegenspieler, bzw. die Schwerkraft.', headline4: '', media4: '', text4: 'Im Yoga liegt das Interesse vor allem an den Streckmuskeln. ', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Muskel Marmas_Muskelspannung', order: '11', topic: 'Muskel Marmas', category: 'anatomy', lesson: 'Muskelspannung', icon: '', content: {intro: 'Musklen haben immer eine Grundspannung, selbst beim Schlafen (Muskeltonus)', media: '', headline1: '', media1: '', text1: 'Die Muskelspannung wird von den Muskelspindeln gemessen. Muskelspindeln sind Sinnesorgane in den Muskeln, die den Dehnungszustand bzw. die Muskelspannung der Skelettmuskulatur erfassen. ', headline2: '', media2: '', text2: 'Wird ein Muskel stimuliert, wird die Muskelpannung lokal gemessen und vom Gehirn reguliert. Beispiel ist das Füllen eines Gefäßes unter dem Wasserhahn. Das zusätzliche Gewicht führt zu einer Spannungsänderung im Muskel. Das Gehirn reguliert den zusätzlichen Kraftbedarf und das Gefäß kann weiterhin gehalten werden.', headline3: '', media3: '', text3: 'Der Ruhetonus beschreibt die Grundspannung eines Muskles, welcher im Normalfall immer vorhanden ist. Im Yoga versuchen wir einen Tonus zu erreichen, bei dem Gelenke ohne Druck, Muskeln ohne zu starkem Zerren und die Blutgefäße frei sind.', headline4: 'Muskelspannung an Psyche und Sozieles gekoppelt', media4: '<p>Stressfaktoren oder Krankheit können sich auf Muskelspannung auswirken:</p><ul><li>depressive Stimmung: Tonus reduziert – schlaff</li><li>ängstliche Stimmung: Tonus erhöht – angespannt</li><li>ständig leichtes Zittern (Spannung) im Körper, auch bei nicht gezielten Bewegungen</li></ul>', text4: '', headline5: 'Wichtig aus yogischer Sicht', media5: '', text5: 'Nur zart an Muskeln ziehen, Stress enthalten, ein Zuviel vermeiden. ', outro: '', quote: ''}  },
{ id: 'Muskel Marmas_funfacts', order: '12', topic: 'Muskel Marmas', category: 'anatomy', lesson: 'fun facts', icon: 'fact-icon.webp', content: {intro: '', media: '', headline1: '', media1: '', text1: 'Ein Mensch hat 656 Muskeln. Der stärkse Muskel im menschlichen Körper ist der Kaumuskel.', headline2: '', media2: '', text2: 'Auch im Schlafen und Sitzen bleibt ein Grund-Tonus der Muskeln erhalten, dieser wird nur bei einer großen Narkose ausgeschaltet (einschließlich Atemmuskulatur → Beatmung erforderlich).', headline3: '', media3: '', text3: 'Der Herzmuskel ist eine modifizierte Form der Skeletmuskulatur. Auch die Zungenmuskulatur gehört zur Skeletmuskulatur. Skeletmuskulatur wird auch als quergestreifte Muskulatur bezeichnet.', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Knochen Marmas_Basics', order: '13', topic: 'Knochen Marmas', category: 'anatomy', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Knochen haben auch im Yoga eine stützende Funktion. Sie sind der Ansatzpunkt für die Sehnen.', media: '', headline1: 'Aufbau', media1: '', text1: 'Knochen bestehen aus ca 45% anorganischen Stoffen, außerdem aus ca. 25% Wasser und 30 % organischen Stoffen. Es ist also lebendes Gewebe, welches ebenfalls Veränderungen ausgesetzt ist, wenn auch nur sehr langsam.', headline2: 'Eigenschaften der Knochen im Yoga-Kontext', media2: '', text2: 'Knochen werden meist mit den Attributen schwer, fest und hart beschrieben. Qualitäten sind geführt, stabil, gestützt.', headline3: '', media3: '<ul><li>Knochen sind lebendig</li><li>Knochen sind Koordinationsorte</li><li>Knochen bilden Gelenke</li><li>Knochen sind unsere Stütze</li></ul>', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Knochen Marmas_Knochengewebe', order: '14', topic: 'Knochen Marmas', category: 'anatomy', lesson: 'Knochengewebe', icon: 'bone-icon.png', content: {intro: 'Knochengewebe ist besonders hartes Gewebe, das aus vielen einzelnen Knochen das Skelett bildet.', media: '', headline1: '', media1: '', text1: 'Knochen sind umhüllt von einer Knochenhaut mit vielen Blutgefäßen (Periost). Diese ist sehr schmerzempfindlich, der Knochen selbst allerdings nicht.', headline2: '', media2: '', text2: 'Knochengewebe besteht aus ener festen Struktur, der Knochenmatrix. Diese besteht aus kollagenen Fasern. Die Knochenmatrix wird durch anorganische Kristalle verfestigt. In der Matrix finden sich Knochenzellen (Osteozyten), die über die Knochenkanälchen miteinander verbunden sind.', headline3: '', media3: '', text3: 'Der Knochen selbst lebt und ist durchblutet. Zur Erhaltung der Belastbarkeit und Stützung des Körpers  finden ständige Aufbau-, Umbau- und Anbau-Prozesse statt. Im Alter verlangsamen sich diese Prozesse. Der Erhalt der Knochenstabilität kann durch Druck und Zugbelasung erhalten bzw. verbessert werden.', headline4: '', media4: '', text4: 'Bei einem Bruch wird nach kurzer Zeit zunächst überschießendes Knochenmaterial Aufgebaut. Die Beule aus Knochengewebe wird späterer durch Osteoklasten wieder abgebaut bis zur Anpassung an die ursprüngliche Form des Knochens.', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Blutgefäß Marmas_Basics', order: '15', topic: 'Blutgefäß Marmas', category: 'anatomy', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Im Yoga möchten wir Blut und Nervenbahnen weder von außen noch durch Muskelspannung quetschen und blockieren, sondern einen guten Fluss ermöglichen. Die Blutfluss Marmas helfen uns Blokaden zu erkennen und zu vermeiden.', media: '', headline1: 'Bedeutung', media1: '', text1: 'Unter Blutgefäß Marmas sind nicht nur Venen und Aterien sondern auch das Lymphische System, Organe und die Nervenbahnen zusammengefasst.', headline2: 'Eigenschaften der Blut-, Nerven- und Lymphsysteme im Yoga-Kontext', media2: '', text2: 'Wünschenswerte Eigenschaften bei den Blutfluss Marmas sind fließend, klar, weich und flüssig.', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Blutgefäß Marmas_Arterien', order: '16', topic: 'Blutgefäß Marmas', category: 'anatomy', lesson: 'Arterien', icon: 'drop-icon.png', content: {intro: 'Arterien, auch Schlagadern genannt, dienen dem Transport des Blutes vom Herzen in das Gewebe. Arterien transportieren sauerstoffreiches Blut.', media: '', headline1: 'Aufbau', media1: '<ul><li>Arterien bestehen aus drei Schichten.</li><li>Arterien haben generell eine dickere Wand als Venen, weil in ihnen ein höherer Druck herrscht.</li><li>Die mittlere Schicht (Media) enthält glatte Muskulatur und/oder elastisches Bindegewebe. Diese dicke mittlere Schicht ist bei den Venen kaum ausgeprägt.</li></ul>', text1: '', headline2: 'Bluttransport', media2: '', text2: 'Eine vom Herzen erzeugte Druckwelle treibt den Bluttransport in den Arterien an. ', headline3: '', media3: '', text3: 'Strömt Blut in das Gefäß, dehnt die Pulswelle zunächst die Arterienwand, bevor diese sich wieder zusammenzieht. Der durch die Herzpumpe erzeugte diskontinuierliche Blutstrom wird in eine kontinuierliche Strömung umgewandelt. → Windkesselfunktion', headline4: 'fun facts', media4: '', text4: 'In den Arterien ist das Pulsieren des Herzschlags spürbar, weshalb sie auch Schlag- oder Pulsadern genannt werden.', headline5: '', media5: '', text5: 'Bekannteste Arterie ist die Aorta (Hauptschlagader). Das Herz pumpt das Blut aus der linken Herzkammer direkt in dieses dickste aller Gefäße (bis zu 3cm dick).', outro: '', quote: ''}  },
{ id: 'Blutgefäß Marmas_Venen', order: '17', topic: 'Blutgefäß Marmas', category: 'anatomy', lesson: 'Venen', icon: 'drop-icon.png', content: {intro: 'Venen, auch Blutadern genannt, dienen der Speicherung und dem Rücktransport des Blutes zum Herzen. Venen transportieren sauerstoffarmens Blut.', media: '', headline1: 'Aufbau', media1: '<ul><li>Venen bestehen aus drei Schichten.</li><li>Die mittlere Schicht (Media) ist bei den Venen kaum ausgeprägt, da ein geringer Druck herscht.</li><li>Bein- und Armvenen besitzen Venenklappen. Diese ventielfunktion sorgt dafür, dass das Blut zum Herzen hin fließt, bzw. verhindern Rückfluss/Versacken des Blutes.</li></ul>', text1: '', headline2: 'Bluttransport', media2: '', text2: 'Die Muskelpumpe ist mit Unterstützung der Venenklappen die Antriebskraft des Blutflusses in den Venen. ', headline3: '', media3: '', text3: 'Die Venen sind die Blutgefäße, die Blut aus der Peripherie des Körpers, beispielsweise den Beinen entgegen der Schwerkraft zurück zum Herzen transportieren. ', headline4: '', media4: '', text4: 'Damit das Blut nicht „in den Beinen versackt“, ist ein gut aufeinander abgestimmtes System aus Venenklappen und Muskelpumpe erforderlich. Venenklappen haben eine Ventilfunktion, das bedeutet, dass sie nur den Blutfluss in Richtung Herz zulassen. In der umgebenden Skelettmuskulatur verdicken sich die Muskelbäuche und drücken die dazwischenliegenden Venen zusammen → Muskelpumpe.', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Blutgefäß Marmas_Kapillaren', order: '18', topic: 'Blutgefäß Marmas', category: 'anatomy', lesson: 'Kapillaren', icon: 'drop-icon.png', content: {intro: 'Die Kapillaren, auch Haargefäße genannt, bilden den Übergang von den Arterien zum venösen System. ', media: '', headline1: '', media1: '', text1: 'Im Bereich der Kapillaren, auch Kapillargebiet genannt, erfolgt der Gas- und Stoffaustausch.', headline2: '', media2: '', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Gelenk Marmas_Basics', order: '19', topic: 'Gelenk Marmas', category: 'anatomy', lesson: 'Basics', icon: 'start-icon.webp', content: {intro: 'Ein Gelenk ist eine stabile Verbindung von zwei oder mehr Knochen.', media: '', headline1: 'Aufgabe', media1: '', text1: 'Das Gelenk gibt Richtung und Führung. Es ist verantwortlich für die Zentrierung und die Position der Knochen zueinander und der Position des Körpers im Raum. ', headline2: '', media2: '', text2: 'Gelenke sind auch der Ort der Bewegung (Roll - Gleit – Bewegung): Es muss darauf geachtet werden, dass Gelenke frei von Druck sind und diese sich nicht versteifen.', headline3: 'Qualität', media3: '', text3: 'Nach Ayurveda ist die Qualität der Gelenkmarmas: glatt, fliesend, beweglich, ölig.', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },
{ id: 'Gelenk Marmas_Gelenkarten', order: '20', topic: 'Gelenk Marmas', category: 'anatomy', lesson: 'Gelenkarten', icon: '', content: {intro: 'Es gibt 6 verschiedene Gelenkarten im Menschlichen Körper:', media: '', headline1: 'Planes Gelenk (z.B. Mittelfuß-/Handwurzel-/Kiefergelenk)', media1: '', text1: '', headline2: 'Scharniergelenk (z.B. Fingermittel-/endgliedgelenk)', media2: '', text2: '', headline3: 'Zapfengelenk (Ellenbogengelenk)', media3: '', text3: '', headline4: 'Eigelenk (z.B. Handgelenk)', media4: '', text4: '', headline5: 'Sattelgelenk (z.B. Daumenwurzelgelenk)', media5: '', text5: '', outro: 'Kugelgelenk (z.B. Hüftgelenk → größte Stabilität erforderlich: große Pfanne)', quote: ''}  },
{ id: 'Gelenk Marmas_Aufbau', order: '21', topic: 'Gelenk Marmas', category: 'anatomy', lesson: 'Aufbau', icon: '', content: {intro: '', media: '', headline1: '', media1: '', text1: '', headline2: '', media2: '', text2: '', headline3: '', media3: '', text3: '', headline4: '', media4: '', text4: '', headline5: '', media5: '', text5: '', outro: '', quote: ''}  },

	];

    if (!db.objectStoreNames.contains("knowledgeStore")) {
        console.log("Creating object store 'knowledgeStore' ...");
        let knowledgeStore = db.createObjectStore("knowledgeStore", { keyPath: "id" });
        knowledgeStore.createIndex('topic', 'topic', { unique: false });
        knowledgeStore.createIndex('lesson', 'lesson', { unique: false });
		knowledgeStore.createIndex('order', 'order', { unique: false });
        knowledgeStore.createIndex('category', 'category', { unique: false });
        knowledgeStore.createIndex('content', ["intro", "media1", "text1", "media2", "text2", "media3", "text3", "media4", "text4", "media5", "text5"], { unique: false });

        console.log("initial filling DB ...");
        initialKnowledgeData.forEach((lesson) => {
            knowledgeStore.put(lesson);
        });
    }
};

open.onsuccess = function() {
    console.log("open DB DONE");
    let db = open.result;

    function getObjectStore(storeName, mode) {
        var tx = db.transaction(storeName, mode);
        return tx.objectStore(storeName);
    }

    function retrieveDataAndBuildContent() {
        let store = getObjectStore("knowledgeStore", 'readonly');
        let request = store.getAll();

        request.onsuccess = function(event) {
            let data = event.target.result;
			data.sort((a, b) => a.order - b.order);
            buildContent(data);
        };

        request.onerror = function(event) {
            console.error("Error retrieving data from store");
        };
    }

    function buildContent(data) {
        let contentDiv = document.getElementById("content");

        let topics = {};

        // Group lessons by topic
        data.forEach(item => {
            if (!topics[item.topic]) {
                topics[item.topic] = [];
            }
            topics[item.topic].push(item);
        });

        // Create HTML structure
        for (let topic in topics) {
            let topicDiv = document.createElement("div");
            topicDiv.className = "topic";

            let topicButton = document.createElement("button");
            topicButton.className = `accordion ${topics[topic][0].category}`;
            topicButton.id = topic;
            topicButton.innerHTML = `<img src="../resources/knowledge/w-${topics[topic][0].category}-icon.webp">${topic.charAt(0).toUpperCase() + topic.slice(1)}`;
            topicDiv.appendChild(topicButton);

            let panelDiv = document.createElement("div");
            panelDiv.className = "panel";

            topics[topic].forEach(lesson => {
                let lessonDiv = document.createElement("div");
                lessonDiv.className = "lesson";
                lessonDiv.style.backgroundImage = `url(../resources/knowledge/${lesson.icon})`;
                lessonDiv.dataset.id = lesson.id; // Store the id in a data attribute
                lessonDiv.addEventListener("click", function() {
                    window.location.href = `lessons/lesson.html?id=${this.dataset.id}`;
                });
                let lessonP = document.createElement("p");
                lessonP.textContent = lesson.lesson;
                lessonDiv.appendChild(lessonP);
                panelDiv.appendChild(lessonDiv);
            });

            topicDiv.appendChild(panelDiv);
            contentDiv.appendChild(topicDiv);
        }

        addAccordionFunctionality();
    }


//###################################################################################
//accordion
//###################################################################################
    function addAccordionFunctionality() {
        var acc = document.getElementsByClassName("accordion");
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                if (!this.classList.contains('active')) {
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
	}

    retrieveDataAndBuildContent();
};



