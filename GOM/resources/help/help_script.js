/***** help *****/
var currentIndex = 0;
// JavaScript function to toggle the overlay
function toggleHelp(direction = "vertical") {
    console.log("toggleHelp called with direction:", direction);
	const overlay = document.getElementById("helpOL");
    const helpContainer = document.getElementById("help");
    const helpBtn = document.getElementById("helpbtn");
    const nextButton = document.getElementById("nextHelp");
    const helpContents = document.querySelectorAll("#helpOL .overlayContent > div");

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
function handleNavigation() {
    const helpContents = document.querySelectorAll("#helpOL .overlayContent > div");
    const nextButton = document.getElementById("nextHelp");

    function resetNavigation() {
        currentIndex = 0;
        nextButton.querySelector("img").src = "../resources/icons/white/next-icon.webp";
        helpContents.forEach((content, i) => {
            if (i === 0) {
                content.classList.remove("hidden");
            } else {
                content.classList.add("hidden");
            }
        });
        resetZIndex();
    }

    function showContent(index) {
        helpContents.forEach((content, i) => {
            if (i === index) {
                content.classList.remove("hidden");
            } else {
                content.classList.add("hidden");
            }
        });
        updateZIndex(index);
    }

    nextButton.addEventListener("click", () => {
        if (currentIndex < helpContents.length - 1) {
			currentIndex++;
			if (currentIndex === helpContents.length - 1) {
				nextButton.querySelector("img").src = "../resources/knowledge/white/check-mark-icon.webp";
			}
            showContent(currentIndex);
        } else {
            // Reset navigation to the initial state
			toggleHelp();
            resetNavigation();
			currentIndex = 0;
		}
    });

	if (currentIndex === helpContents.length - 1) {
        nextButton.querySelector("img").src = "../resources/knowledge/white/check-mark-icon.webp";
    }

    // Initialize with the first content
    resetNavigation();
}

// Initialize navigation when the script loads
document.addEventListener("DOMContentLoaded", handleNavigation);