/*
########################################
build lesson
########################################
*/

var lessonId;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    lessonId = urlParams.get('id');

    if (!lessonId) {
        console.error('No lesson ID provided in the URL');
        return;
    }

    initDB().then(async (db) => {
        const store = getObjectStore(db, "knowledgeStore", "readonly");
        const getRequest = store.get(lessonId);

        getRequest.onsuccess = async (event) => {
            const lessonData = event.target.result;
            if (!lessonData) {
                console.error('Lesson not found in DB');
                return;
            }
            await populateContent(lessonData);
        };

        getRequest.onerror = (event) => {
            console.error('Error fetching data from DB', event);
        };
    }).catch((error) => {
        console.error('Error initializing DB:', error);
    });

    // Populate lesson content into the page
    async function populateContent(lessonData) {
        const content = lessonData.content;
        document.getElementById("topic").textContent = capitalizeFirstLetter(lessonData.topic);
        document.getElementById("title").textContent = lessonData.lesson;
        document.getElementById("lesson").textContent = lessonData.lesson;

        for (const key in content) {
            const element = document.getElementById(key);
            if (element) {
                if (content[key]) {
                    if (key.startsWith('media') && content[key].endsWith('.html')) {
                        const htmlContent = await fetchHtml(content[key]);
                        element.innerHTML = htmlContent;
                    } else if (isHTML(content[key])) {
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

    function isHTML(str) {
        const doc = new DOMParser().parseFromString(str, 'text/html');
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
    }
});

// Handle Done button click and confetti animation
document.getElementById('doneButton').addEventListener('click', function () {
    markLessonAsDone(lessonId);

    const confettiContainer = document.getElementById('confettiContainer');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);
    }

    setTimeout(function () {
        // Optionally navigate to another page
         window.location.href = '../knowledge.html?id=' + lessonId;
    }, 3000);
});

function getRandomColor() {
    //const colors = ['#361747', '#B34BEB', '#52226B', '#943EC2', '#753199', '#3A226B', '#69226B', '#B74DF0']; //lila
	const colors = ['#D5B56E', '#BBA53D', '#AA7F2E', '#DBAC34', '#E3AC36', '#ac8c44', '#D4AF37']; //gold
    return colors[Math.floor(Math.random() * colors.length)];
}

function markLessonAsDone(lessonId) {
    initDB().then(db => {
        const progressStore = getObjectStore(db, "progressStore", 'readwrite');
        const getRequest = progressStore.get(lessonId);

        getRequest.onsuccess = function (event) {
            const progress = event.target.result;
            if (progress) {
                progress.done = true;
                const updateRequest = progressStore.put(progress);
                updateRequest.onsuccess = () => {
                    console.log(`Lesson ${lessonId} marked as done.`);
                };
                updateRequest.onerror = (event) => {
                    console.error('Error updating progressStore:', event);
                };
            } else {
                console.error(`Lesson with ID ${lessonId} not found in progressStore.`);
            }
        };

        getRequest.onerror = function (event) {
            console.error("Error accessing progressStore:", event);
        };
    }).catch((error) => {
        console.error('Error initializing DB:', error);
    });
}