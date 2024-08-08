var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var db;
var store;
var data;
var update = 0;


function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("marmaDB", 1); // Update the version as needed

// initial knowledge data
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

// Initial marma data
const initialMarmaData = [ 
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

// Initial Marma Values
const initialMarmaValues = [
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

        request.onupgradeneeded = (event) => {
            db = event.target.result;

            // knowledge Object Store
            if (!db.objectStoreNames.contains("knowledgeStore")) {
                console.log("Creating object store 'knowledgeStore' ...");
                let knowledgeStore = db.createObjectStore("knowledgeStore", { keyPath: "id" });
                knowledgeStore.createIndex('topic', 'topic', { unique: false });
                knowledgeStore.createIndex('lesson', 'lesson', { unique: false });
                knowledgeStore.createIndex('order', 'order', { unique: false });
                knowledgeStore.createIndex('category', 'category', { unique: false });
                knowledgeStore.createIndex('content', ["intro", "media1", "text1", "media2", "text2", "media3", "text3", "media4", "text4", "media5", "text5"], { unique: false });

                initialKnowledgeData.forEach((lesson) => {
                    knowledgeStore.put(lesson);
                });
            }

            // Marma Search Object Stores
            if (!db.objectStoreNames.contains("marmaStore")) {
                console.log("Creating object store 'marmaStore' ...");
                let marmaStore = db.createObjectStore("marmaStore", { keyPath: "id" });
                marmaStore.createIndex('marmaName', ["sanskrit", "de"], { unique: false });
                marmaStore.createIndex('marmaGrp', ["sanskrit", "de"], { unique: false });
                marmaStore.createIndex('location', ["bodyRegion", "anatomy", "height", "explanation"], { unique: false });
                marmaStore.createIndex('info', ["typography", "origin"], { unique: false });
				
                initialMarmaData.forEach((marma) => {
                    marmaStore.put(marma);
                });
				
            } else {
				console.log("Object store 'marmaStore' already exists!");
				let marmaStore = getObjectStore("marmaStore", "readwrite");
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
			}

            if (!db.objectStoreNames.contains("marmaValueStore")) {
                console.log("Creating object store 'marmaValueStore' ...");
                let marmaValueStore = db.createObjectStore("marmaValueStore", { keyPath: "id" });
                marmaValueStore.createIndex('localisation', 'localisation', { unique: false });
                marmaValueStore.createIndex('awareness', 'awareness', { unique: false });
                marmaValueStore.createIndex('frequency', 'frequency', { unique: false });
				
				initialMarmaValues.forEach((mValue) => {
                    marmaValueStore.put(mValue);
                });
				
            } else {
						console.log("Object store 'marmaValueStore' already exists!");
				var marmaValueStore = event.currentTarget.transaction.objectStore("marmaValueStore");
			}
        };

        request.onsuccess = (event) => {
            db = event.target.result;
			
			//update knowledge every time
			let knowledgeStore = getObjectStore("knowledgeStore", "readwrite");
			initialKnowledgeData.forEach((lesson) => { 
				knowledgeStore.put(lesson);
			});
			
			//update marmas every time
			let marmaStore = getObjectStore("marmaStore", "readwrite");
			initialMarmaData.forEach((marma) => { 
				marmaStore.put(marma);
			});
			
            resolve(db);
        };

        request.onerror = (event) => {
            reject('Database error: ' + event.target.errorCode);
        };
    });
}

function getObjectStore(store_name, mode) {
	var tx = db.transaction(store_name, mode);
	return tx.objectStore(store_name);
}

initDB()