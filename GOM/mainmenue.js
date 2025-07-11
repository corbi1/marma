
//###################################################################################
//Menue
//###################################################################################	


function toggleMenue() {
  document.querySelector(".menueButton").classList.toggle("change");
  const menue = document.getElementById("Menue");
  const titleBar = document.getElementById("titleBar");

	if (menue.style.height === "0%") {
	  menue.style.height = "calc(100vh - 4em - 50px)";
	  titleBar.classList.add("fixed");
	} else {
	  menue.style.height = "0%";
	  titleBar.classList.remove("fixed");
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
    const request = indexedDB.open("marmaDB");
    request.onsuccess = (event) => {
        const db = event.target.result;
        db.close();  // Close any open connections

        // Delete the database
        const deleteRequest = indexedDB.deleteDatabase("marmaDB");
        deleteRequest.onsuccess = () => {
            console.log("Database deleted successfully.");
        };
        deleteRequest.onerror = (event) => {
            console.error("Error deleting database:", event.target.errorCode);
        };
        deleteRequest.onblocked = () => {
            console.warn("Database deletion blocked! Close all open tabs with this database.");
        };
    };
    request.onerror = (event) => {
        console.error("Error opening database for deletion:", event.target.errorCode);
    };
}


