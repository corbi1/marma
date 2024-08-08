//###################################################################################
//open DB
//###################################################################################	

/*
open.onsuccess = function() {
    console.log("open DB DONE");
    let db = open.result;

    function getObjectStore(storeName, mode) {
        var tx = db.transaction(storeName, mode);
        return tx.objectStore(storeName);
    }
*/

initDB().then(db => {
    console.log("Database initialized on knowledge");

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

}).catch(error => {
    console.error(error);
});





