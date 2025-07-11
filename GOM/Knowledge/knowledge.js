//###################################################################################
//open DB
//###################################################################################	
initDB().then(db => {
	console.log("Database initialized on knowledge");

	function retrieveDataAndBuildContent() {
		console.log("Retrieving data...");
		let store = getObjectStore(db, "knowledgeStore", "readonly");
		let request = store.getAll();

		request.onsuccess = function (event) {
			let data = event.target.result;
			data.sort((a, b) => a.order - b.order); // Maintain original topic order

			// Fetch progress data once
			getProgressData((progressMap) => {
				let filteredLessons = filterLessons(data, progressMap);
				buildContent(filteredLessons, progressMap);

				// After building content, mark finished lessons & topics
				markFinishedLessons(progressMap);
			});
		};

		request.onerror = function (event) {
			console.error("Error retrieving data from store", event);
		};
	}

	function getProgressData(callback) {
		let progressStore = getObjectStore(db, "progressStore", "readonly");
		let progressRequest = progressStore.getAll();

		progressRequest.onsuccess = function (event) {
			let progressMap = new Map();

			event.target.result.forEach((progress) => {
				progressMap[progress.id] = progress;
			});
			callback(progressMap);
		};

		progressRequest.onerror = function (event) {
			console.error("Error retrieving progress data", event);
			callback(new Map()); // Fallback if there's an error
		};
	}

	function filterLessons(data, progressMap) {
		let topics = {};

		// Group lessons by topic
		data.forEach((lesson) => {
			if (!topics[lesson.topic]) {
				topics[lesson.topic] = {
					lessons: [],
					order: lesson.order,
					hasUndone: false, // Track if any lesson is unfinished
				};
			}
			topics[lesson.topic].lessons.push(lesson);

			if (progressMap[lesson.id] && progressMap[lesson.id].done === 0) {
				topics[lesson.topic].hasUndone = true; // Mark topic as having undone lessons
			}
		});

		// Separate topics
		let topicsArray = Object.values(topics);
		let topicsWithUndone = topicsArray.filter((t) => t.hasUndone);
		let fullyDoneTopics = topicsArray.filter((t) => !t.hasUndone);

		// Keep only the first 4 topics with undone lessons
		let selectedUndoneTopics = topicsWithUndone.slice(0, 400);

		// Merge selected undone topics with fully done topics while keeping original order
		let finalTopics = [...selectedUndoneTopics, ...fullyDoneTopics].sort((a, b) => a.order - b.order);

		return finalTopics.flatMap((topic) => topic.lessons);
	}

	function buildContent(data, progressMap) {
		console.log("building content ...");
		let contentDiv = document.getElementById("content");
		contentDiv.innerHTML = ""; // Clear content before adding new elements

		let fragment = document.createDocumentFragment();
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
			topicButton.innerHTML = `<img src="../resources/knowledge/white/${topics[topic][0].category}-icon.webp">${topic.charAt(0).toUpperCase() + topic.slice(1)}`;
			topicDiv.appendChild(topicButton);

			let panelDiv = document.createElement("div");
			panelDiv.className = "panel";

			topics[topic].forEach((lesson) => {
				let lessonDiv = document.createElement("div");
				lessonDiv.className = "lesson";
				lessonDiv.style.backgroundImage = `url(../resources/knowledge/${lesson.icon})`;
				lessonDiv.dataset.id = lesson.id;

				let lessonP = document.createElement("p");
				lessonP.textContent = lesson.lesson;
				lessonDiv.appendChild(lessonP);

				// Add event listener in batch instead of per item
				lessonDiv.addEventListener("click", () => {
					window.location.href = `lessons/lesson.html?id=${lesson.id}`;
				});

				panelDiv.appendChild(lessonDiv);
			});

			topicDiv.appendChild(panelDiv);
			fragment.appendChild(topicDiv); // save html elemnts temporarily
		}
		contentDiv.appendChild(fragment); // apply all html elemnts in Batch update
		addAccordionFunctionality(progressMap, data);
	}


//###################################################################################
//accordion
//###################################################################################

	function addAccordionFunctionality(progressMap, data) {
		console.log("Building accordion...");

		// Use event delegation to handle clicks on all accordions
		document.getElementById("content").addEventListener("click", function (event) {
			if (event.target.classList.contains("accordion")) {
				let accordion = event.target;
				let panel = accordion.nextElementSibling;

				// Close all accordions except the one clicked
				document.querySelectorAll(".accordion.active").forEach(activeAccordion => {
					if (activeAccordion !== accordion) {
						activeAccordion.classList.remove("active");
						activeAccordion.nextElementSibling.style.maxHeight = null;
					}
				});

				// Toggle active class and expand/collapse panel
				accordion.classList.toggle("active");
				if (panel.style.maxHeight) {
					panel.style.maxHeight = null;
				} else {
					panel.style.maxHeight = panel.scrollHeight + "px";
				}
			}
		});

		// Check for last viewed or first undone lesson
		activateInitialLesson(progressMap, data);
	}

	function activateInitialLesson(progressMap, data) {
		const urlParams = new URLSearchParams(window.location.search);
		let lessonId = urlParams.get("id");

		if (lessonId) {
			activateLessonById(lessonId);
			console.log("Last viewed lesson:", lessonId);
			return;
		}

		// Find the first undone lesson using progressMap
		let firstUndoneLesson = data.find(lesson => progressMap[lesson.id]?.done === 0);

		if (firstUndoneLesson) {
			console.log("First undone lesson:", firstUndoneLesson.id);

			if (firstUndoneLesson.order === 1) {
				console.log("Redirecting to:", `lessons/lesson.html?id=${firstUndoneLesson.id}&nr=${firstUndoneLesson.order}`);
				window.location.href = `lessons/lesson.html?id=${firstUndoneLesson.id}&nr=${firstUndoneLesson.order}`;
			} else {
				activateLessonById(firstUndoneLesson.id);
			}
		}
	}

	function activateLessonById(lessonId) {
		console.log("Scrolling to lesson:", lessonId);

		// Find lesson in the existing data instead of querying IndexedDB again
		let lesson = document.querySelector(`[data-id="${lessonId}"]`);
		if (lesson) {
			let topic = lesson.closest(".topic").querySelector(".accordion");

			if (topic) {
				// Close all accordions before opening the correct one
				document.querySelectorAll(".accordion.active").forEach(activeAccordion => {
					if (activeAccordion !== topic) {
						activeAccordion.classList.remove("active");
						activeAccordion.nextElementSibling.style.maxHeight = null;
					}
				});

				// Open the correct topic
				topic.classList.add("active");
				let panel = topic.nextElementSibling;
				if (panel) {
					panel.style.maxHeight = panel.scrollHeight + "px";

					// Scroll to the lesson smoothly after expansion
					panel.addEventListener("transitionend", function onTransitionEnd() {
						panel.removeEventListener("transitionend", onTransitionEnd);
						lesson.scrollIntoView({ behavior: "smooth", block: "center" });
					});
				}
			}
		}
	}

//###################################################################################
//mark finished lessons
//###################################################################################

	function markFinishedLessons(progressMap) {
		console.log("Marking finished lessons...");

		// Iterate over progressMap instead of querying IndexedDB again
		Object.values(progressMap).forEach((progress) => {
			if (progress.done === 1) {
				const lessonId = progress.id;
				const element = document.querySelector(`[data-id="${lessonId}"]`);
				if (element) {
					element.classList.add("done");
				}
			}
		});

		console.log("Marking finished topics...");
		let topics = new Set();

		document.querySelectorAll(".accordion").forEach((accordion) => {
			topics.add(accordion.id); // accordion ID corresponds to the topic
		});

		topics.forEach((topic) => {
			let topicLessons = Object.values(progressMap).filter((p) => p.topic === topic);

			if (topicLessons.length > 0 && topicLessons.every((lesson) => lesson.done === 1)) {
				let topicElement = document.getElementById(topic);
				if (topicElement) {
					topicElement.classList.add("done");
					console.log(`Marked ${topic} as done`);

					let panel = topicElement.nextElementSibling;
					if (panel && panel.classList.contains("panel")) {
						panel.classList.add("done");
					}
				}
			}
		});
	}

	retrieveDataAndBuildContent();

}).catch(error => {
	console.error(error);
});





