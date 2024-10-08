
//###################################################################################
//Menue
//###################################################################################	


function toggleMenue() {
  document.querySelector(".menueButton").classList.toggle("change");
  const contentHeight = document.querySelector('.content').scrollHeight; // Get the height of the content
  const windowHeight = window.innerHeight; // Get the height of the window
  const menue = document.getElementById("Menue");

  if (contentHeight > windowHeight) {
    // If content takes up more space than the window height, toggle between 100% and 0 height
    if (menue.style.height === "calc(100% - 50px)") {
      menue.style.height = "0";
	  //document.getElementById("footer").style.position = "relative";
	  
    } else {
      menue.style.height = "calc(100% - 50px)";
	  //document.getElementById("footer").style.position = "fixed";
    }
  } else {
    // If content takes up less space than the window height, toggle between 0 and calc(100% - 7.5em)
    if (menue.style.height === "calc(100% - 7.5em)") {
      menue.style.height = "0";
    } else {
      menue.style.height = "calc(100% - 7.5em)";
    }
  }
} 



//###################################################################################
//Accordion
//###################################################################################		
	
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
	if( !this.classList.contains('active') ){
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


//###################################################################################
//delete DB
//###################################################################################
function deleteDB() {
	indexedDB.deleteDatabase('marmaDB').onsuccess=(function(e){console.log("Delete marmaDB OK");})
}


