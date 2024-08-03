/*
########################################
build lesson
########################################
*/

document.addEventListener('DOMContentLoaded', () => {
	const urlParams = new URLSearchParams(window.location.search);
	const lessonId = urlParams.get('id');
	if (!lessonId) {
		console.error('No lesson ID provided in the URL');
		return;
	}

	const request = indexedDB.open('marmaDB', 1);

	request.onsuccess = function (event) {
		let db = event.target.result;
		if (!db.objectStoreNames.contains("knowledgeStore")) {
			console.error('knowledgeStore not found in DB');
			return;
		}
		let transaction = db.transaction(['knowledgeStore'], 'readonly');
		let store = transaction.objectStore('knowledgeStore');
		let getRequest = store.get(lessonId);

		getRequest.onsuccess = async function (event) {
			let lessonData = event.target.result;
			if (!lessonData) {
				console.error('Lesson not found in DB');
				return;
			}
			await populateContent(lessonData);
		};

		getRequest.onerror = function (event) {
			console.error('Error fetching data from DB', event);
		};
	};

	request.onerror = function (event) {
		console.error('Error opening DB', event);
	};

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	async function fetchHtml(url) {
		const response = await fetch(url);
		if (response.ok) {
			return await response.text();
		} else {
			throw new Error('Network response was not ok');
		}
	}

	async function populateContent(lessonData) {
		const content = lessonData.content;


		// Populate topic with the topic (capitalized)
		const topic = document.getElementById("topic");
		if (topic) {
			topic.textContent = capitalizeFirstLetter(lessonData.topic);
		}

		// Populate title and headline2 with the lesson
		const title = document.getElementById("title");
		const lesson = document.getElementById("lesson");
		if (title) {
			title.textContent = lessonData.lesson;
		}
		if (lesson) {
			lesson.textContent = lessonData.lesson;
		}


		// Populate the rest of the content
		for (const key in content) {
			const element = document.getElementById(key);
			if (element) {
				if (content[key]) {
					if (key.startsWith('media') && content[key].endsWith('.html')) {
						try {
							const htmlContent = await fetchHtml(content[key]);
							element.innerHTML = htmlContent;
						} catch (error) {
							console.error('Error fetching HTML content:', error);
							element.classList.add('hidden');
						}
					} if (isHTML(content[key])) {
                                element.innerHTML = content[key]; 
					} else {
						element.textContent = content[key];
					}
				} else {
					element.classList.add('hidden');
				}
			}
		}
	}
	
	function isHTML(str) {
		const doc = new DOMParser().parseFromString(str, 'text/html');
		return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
	}
});

/*
########################################
Done - Button
########################################
*/

document.getElementById('doneButton').addEventListener('click', function() {
    // Create confetti elements
    const confettiContainer = document.getElementById('confettiContainer');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);
    }
    
    // Navigate to new page after the animation
    setTimeout(function() {
        window.location.href = '../knowledge.html'; // Replace with your desired URL
    }, 3000); // Duration of the animation in milliseconds
});

function getRandomColor() {
    //const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7', '#f9bec7'];
	const colors = ['#361747', '#B34BEB', '#52226B', '#943EC2', '#753199', '#3A226B', '#69226B', '#B74DF0'];
    return colors[Math.floor(Math.random() * colors.length)];
}