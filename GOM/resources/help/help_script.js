/***** help *****/
var currentIndex = 0;
// JavaScript function to toggle the overlay
function toggleHelp() {
    const overlay = document.getElementById("helpOL");
    const helpContainer = document.getElementById("help");
    const helpBtn = document.getElementById("helpbtn");
    const nextButton = document.getElementById("nextHelp");
    const helpContents = document.querySelectorAll("#helpOL .overlayContent > div");

    if (overlay.style.height === "100%") {
        overlay.style.height = "0%";
        document.getElementById('helpbtn').style.color = "black";
		helpBtn.style.fontSize = "2.5em";
		helpBtn.textContent = "?"; // Change to "?"
		resetZIndex();
    } else {
        overlay.style.height = "100%";
        document.getElementById('helpbtn').style.color = "white";
		helpBtn.textContent = "×"; // Change to "×"
		helpBtn.style.fontSize = "60px";
		hint.classList.add("hidden");

        
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

// JavaScript function to show hint text for 5 seconds
function showHint() {
    const helpContainer = document.getElementById("help");
    const hint = document.getElementById("hint");

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