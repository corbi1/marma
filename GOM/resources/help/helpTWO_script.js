/***** help *****/
var currentIndexTWO = 0;
// JavaScript function to toggle the overlay
function toggleHelpTWO(direction = "vertical") {
    const overlay = document.getElementById("helpOLTWO");
    const helpContainer = document.getElementById("helpTWO");
    const helpBtn = document.getElementById("helpbtnTWO");
    const nextButton = document.getElementById("nextHelpTWO");
    const helpContents = document.querySelectorAll("#helpOLTWO .overlayContent > div");

	// Apply transition only to the specified direction
		overlay.style.transition = direction === "vertical" ? "height 0.3s ease" : "width 0.3s ease";

    const isExpanded = (direction === "vertical" && overlay.style.height === "100%") ||
                       (direction === "horizontal" && overlay.style.width === "100%");

    if (isExpanded) {
		overlay.style.height = direction === "vertical" ? "0%" : "100%";
		overlay.style.width = direction === "horizontal" ? "0%" : "100%";
		helpBtn.style.fontSize = "2.5em";
		helpBtn.textContent = "?"; // Change to "?"
		resetZIndex();
    } else {
        overlay.style.height = "100%";
		overlay.style.width = "100%";
		helpBtn.textContent = "×"; // Change to "×"
		helpBtn.style.fontSize = "60px";
		//hint.classList.add("hidden");

        
		if (currentIndex === helpContents.length - 1) {
			nextButton.querySelector("img").src = "../resources/knowledge/white/check-mark-icon.webp";
		}else{
			nextButton.querySelector("img").src = "../resources/icons/white/next-icon.webp";
		}
        helpContents.forEach((content, i) => {
            if (i === currentIndex) {
                content.classList.remove("hidden");
            } else {
                content.classList.add("hidden");
            }
        });
        updateZIndex(currentIndex)
    }
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