/***** help *****/
var currentIndexTWO = 0;
// JavaScript function to toggle the overlay
function toggleHelpTWO() {
    const overlay = document.getElementById("helpOLTWO");
    const helpContainer = document.getElementById("helpTWO");
    const helpBtn = document.getElementById("helpbtnTWO");
    const nextButton = document.getElementById("nextHelpTWO");
    const helpContents = document.querySelectorAll("#helpOLTWO .overlayContent > div");
	const hint = document.getElementById("hintTWO");

    if (overlay.style.height === "100%") {
        overlay.style.height = "0%";
		helpBtn.style.fontSize = "2.5em";
        helpBtn.textContent = "?"; // Change to "?"
		resetZIndexTWO();
    } else {
        overlay.style.height = "100%";
		helpBtn.textContent = "×"; // Change to "×"
		helpBtn.style.fontSize = "60px";
		hint.classList.add("hidden");

        
		if (currentIndexTWO === helpContents.length - 1) {
			nextButton.querySelector("img").src = "../resources/knowledge/white/check-mark-icon.webp";
		}else{
			nextButton.querySelector("img").src = "../resources/icons/white/next-icon.webp";
		}
        helpContents.forEach((content, i) => {
            if (i === currentIndexTWO) {
                content.classList.remove("hidden");
            } else {
                content.classList.add("hidden");
            }
        });
        updateZIndexTWO(currentIndexTWO)
    }
}

// JavaScript function to show hint text for 5 seconds
function showHintTWO() {
    const helpContainer = document.getElementById("helpTWO");
	const hint = document.getElementById("hintTWO");
    // Set height to auto and calculate full height
    hint.classList.remove("hidden");
    const autoHeight = hint.scrollHeight + "px";

    // Set height to 0 before transitioning
    hint.style.height = "0";
    setTimeout(() => {
        hint.style.transition = "height 0.5s ease";
        hint.style.height = autoHeight;
    });

    // Add pulse animation to the help container
    helpContainer.classList.add("pulse");

    // Remove pulse animation and hide the hint after 5 seconds
    setTimeout(() => {
        helpContainer.classList.remove("pulse");
        hint.style.height = "0";
        setTimeout(() => {
            hint.classList.add("hidden");
            hint.style.transition = ""; // Reset transition property
        }, 500); // Match the transition duration
    }, 5000);
}

// JavaScript function to handle navigation
function handleTWONavigation() {
    const helpContents = document.querySelectorAll("#helpOLTWO .overlayContent > div");
    const nextButton = document.getElementById("nextHelpTWO");

    function resetNavigation() {
        currentIndexTWO = 0;
        nextButton.querySelector("img").src = "../resources/icons/white/next-icon.webp";
        helpContents.forEach((content, i) => {
            if (i === 0) {
                content.classList.remove("hidden");
            } else {
                content.classList.add("hidden");
            }
        });
        resetZIndexTWO();
    }

    function showContent(index) {
        helpContents.forEach((content, i) => {
            if (i === index) {
                content.classList.remove("hidden");
            } else {
                content.classList.add("hidden");
            }
        });
        updateZIndexTWO(index);
    }

    nextButton.addEventListener("click", () => {
        if (currentIndexTWO < helpContents.length - 1) {
			currentIndexTWO++;
			if (currentIndexTWO === helpContents.length - 1) {
				nextButton.querySelector("img").src = "../resources/knowledge/white/check-mark-icon.webp";
			}
            showContent(currentIndexTWO);
        } else {
            // Reset navigation to the initial state
			toggleHelpTWO();
            resetNavigation();
			currentIndexTWO = 0;
		}
    });

	if (currentIndexTWO === helpContents.length - 1) {
        nextButton.querySelector("img").src = "../resources/knowledge/white/check-mark-icon.webp";
    }

    // Initialize with the first content
    resetNavigation();
}

// Initialize navigation when the script loads
document.addEventListener("DOMContentLoaded", handleTWONavigation);