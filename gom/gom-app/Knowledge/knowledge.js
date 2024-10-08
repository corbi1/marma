//###################################################################################
//open DB
//###################################################################################	

initDB().then(db => {
    console.log("Database initialized on knowledge");

    function retrieveDataAndBuildContent() {
		console.log("retrieve data ...");
        let store = getObjectStore(db, "knowledgeStore", 'readonly');
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
		console.log("building content ...");
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
		console.log("building accordion ...");
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
		markFinishedLessions()

		// Activate lesson based on URL param 'id'
		const urlParams = new URLSearchParams(window.location.search);
		let lessonId = urlParams.get('id');

		if (lessonId !== null) {
			// Fetch the lesson from IndexedDB
			activateLessonById(lessonId);
			console.log("last viewed " + lessonId);
		} else {
			// When lessonId is null, find the first lesson in progressStore where done == false
			const progressStore = getObjectStore(db, "progressStore", 'readonly');
			const index = progressStore.index("order");

			let request = index.openCursor(null, 'next'); // Iterate in ascending order

			request.onsuccess = function(event) {
				let cursor = event.target.result;
				if (cursor) {
					let progressEntry = cursor.value;

					// Check if the lesson is not done
					if (progressEntry.done === false) {
						activateLessonById(progressEntry.id);
						return; // Stop iteration once we find the first undone lesson
					}

					cursor.continue(); // Continue to the next lesson if current one is done
				}
			};

			request.onerror = function(event) {
				console.log("Error fetching progress from progressStore", event);
			};
		}

		// Function to activate and scroll to a lesson by lessonId
		function activateLessonById(lessonId) {
			console.log("scroll to" + lessonId);
			const knowledgeStore = getObjectStore(db, "knowledgeStore", 'readonly');
			let request = knowledgeStore.get(lessonId);

			request.onsuccess = function(event) {
				let lesson = event.target.result;
				if (lesson) {
					let topic = lesson.topic;

					// Find the element with the id matching the topic and set it active
					let accordionToActivate = document.getElementById(topic);
					if (accordionToActivate) {
						closeAll();
						accordionToActivate.classList.add("active");

						// Enlarge the next panel
						let panel = accordionToActivate.nextElementSibling;
						if (panel && panel.classList.contains("panel")) {
							panel.style.maxHeight = panel.scrollHeight + "px";

							// Wait for the CSS transition to finish before scrolling
							panel.addEventListener('transitionend', function onTransitionEnd() {
								panel.removeEventListener('transitionend', onTransitionEnd);

								// Scroll to the element with data-id=lessonId
								let elementToScrollTo = document.querySelector(`[data-id="${lessonId}"]`);
								if (elementToScrollTo) {
									elementToScrollTo.scrollIntoView({ behavior: "smooth", block: "center" });
								}
							});
						}
					}
				}
			};

			request.onerror = function(event) {
				console.log("Error fetching lesson from knowledgeStore", event);
			};
		}
    }



//###################################################################################
//mark finished lessons
//###################################################################################

    function markFinishedLessions() {
		console.log("marking finished lessons ...");
		const progressStore = getObjectStore(db, "progressStore", 'readonly');

        // Use a cursor to iterate over all entries and log their data
        const cursorRequest = progressStore.openCursor();

        cursorRequest.onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                const progress = cursor.value;

                // log the lesson ID and the 'done' field
                //console.log(`Lesson ID: ${progress.id}, Done: ${progress.done}`);

                // Check if the 'done' field is true
                if (progress.done === true) {
                    const lessonId = progress.id;

                    // Find the corresponding HTML element by lesson ID and update its appearance
                    const element = document.querySelector(`[data-id="${lessonId}"]`);
                    if (element) {
                        // Apply the 'done' class to change the appearance
                        element.classList.add('done');
                    }
                }

                // Continue to the next item in the cursor
                cursor.continue();
            } else {
                console.log('All lessons processed.');
            }
        };

        cursorRequest.onerror = function(event) {
            console.error('Error accessing the progressStore:', event);
        };


		console.log("marking finished topics ...");
        const topicIndex = progressStore.index("topic");

        // Iterate through each unique topic in the document
        let topics = new Set();
        document.querySelectorAll(".accordion").forEach((accordion) => {
            topics.add(accordion.id); // Assuming the accordion ID corresponds to the topic
        });

        // For each topic, check if all related lessons are done
        topics.forEach((topic) => {
            let request = topicIndex.getAll(topic); // Get all lessons for the current topic

            request.onsuccess = function(event) {
                let lessons = event.target.result;

                // Check if all lessons are marked as done
                let allDone = lessons.every((lesson) => lesson.done === true);

                if (allDone) {
                    // Add the "done" class to the corresponding accordion element
                    let topicElement = document.getElementById(topic);
                    if (topicElement) {
                        topicElement.classList.add("done");
						
						let accordionToActivate = document.getElementById(topic);
						let panel = accordionToActivate.nextElementSibling;
						if (panel && panel.classList.contains("panel")) {
							panel.classList.add("done");
						}
                    }
                }
            };

            request.onerror = function(event) {
                console.log("Error fetching lessons for topic:", topic, event);
            };
        });
	} 

    retrieveDataAndBuildContent();

}).catch(error => {
    console.error(error);
});





