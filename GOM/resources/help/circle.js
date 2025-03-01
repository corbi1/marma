// JavaScript function to show circle
function showCircle(repetition, htmlElement) {
	let circle = document.getElementById("circle");
	let focusElement = document.getElementById(htmlElement);
	let circleContainer = document.getElementById("circleContainer");
	
	let rect = focusElement.getBoundingClientRect();
	let navRect = focusElement.getBoundingClientRect();
	
	circleContainer.style.left = `${rect.left + rect.width / 2 - navRect.left}px`;
	circleContainer.style.top = `${rect.top + rect.height / 2 - navRect.top}px`;
	
	let count = 0;
	let interval = setInterval(() => {
		circle.style.display = "block";
		circle.style.animation = "none";
		void circle.offsetWidth; // Force reflow to restart animation
		circle.style.animation = "shrink 2s forwards";
		count++;
		if (count >= repetition) { // 6 seconds total
			clearInterval(interval);
			setTimeout(() => {
				circle.style.display = "none";
			}, 2000);
		}
	}, 2000);
}