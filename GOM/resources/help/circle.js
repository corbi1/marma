// JavaScript function to show circle
function showCircle(repetition, htmlElementId, animation = "radiate", hintText = "") {
	if (typeof animation !== "string" || animation.trim() === "") {
		animation = "radiate";
	}
	
	let focusElement = document.getElementById(htmlElementId);
	if (!focusElement) {
		console.warn(`Element with ID '${htmlElementId}' not found.`);
		return;
	}
	
	// Find nested .circle-container and .circle inside the passed element
	let circleContainer = focusElement.querySelector(".circle-container");
	let circle = circleContainer?.querySelector(".circle");

	if (!circle || !circleContainer) {
		console.warn("Circle or Circle Container not found inside the provided element.");
		return;
	}

	const hint = focusElement.querySelector(".hint");
	if (!hint) {
		console.warn("Hint element not found in container.");
	} else {
		if (hintText) {
			hint.querySelector("p").textContent = hintText;
		}
		
		hint.classList.remove("hidden");
		hint.style.height = "0px";
		const autoHeight = hint.scrollHeight + "px";
		setTimeout(() => {
			hint.style.transition = "height 0.5s ease";
			hint.style.height = autoHeight;
		});	
	}
	
	let rect = focusElement.getBoundingClientRect();
	let navRect = focusElement.getBoundingClientRect();
	
	circleContainer.style.left = `${rect.left + rect.width / 2 - navRect.left}px`;
	circleContainer.style.top = `${rect.top + rect.height / 2 - navRect.top}px`;
	
	let count = 0;
	let interval = setInterval(() => {
		circle.style.display = "block";
		circle.style.animation = "none";
		void circle.offsetWidth; // Force reflow to restart animation
		circle.style.animation = animation + " 2s forwards";
		count++;
		if (count >= repetition) { // 6 seconds total
			clearInterval(interval);
			setTimeout(() => {
				circle.style.display = "none";
				if (hint) {
					hint.style.height = "0";
					setTimeout(() => {
						hint.classList.add("hidden");
						hint.style.transition = ""; // Reset transition property
						console.log("hide hint");
					}, 500); // Match the transition duration
				}
			}, 2000);
		}
	}, 2000);
}