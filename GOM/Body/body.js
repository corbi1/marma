document.addEventListener("DOMContentLoaded", function() {
	
const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

function getQueryParam(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**** Colors *****/
let marmaDesign = "";
marmaDesign = getQueryParam('marmaDesign');
console.log(marmaDesign);
let key = getQueryParam('key');
console.log(key);
let marmaName;
let meshName;
if (key !== null){
	marmaName = getQueryParam('marmaName');
	meshName = key + "_" + marmaName;
	document.getElementById('marmaFocusHelp').style.display = "block";
	document.getElementById('camSliderHelp').style.display = "none";
	document.getElementById('helpbtn').style.color = "black";
	document.getElementById('menueButton-container').style.display = "none";
} else if (key == null) {
	document.getElementById('marmaFocusHelp').style.display = "none";
	document.getElementById('camSliderHelp').style.display = "block";
}


console.log(meshName);

var bgColor;
var mainColor1, mainColor2;

console.log("style: " + marmaDesign);
if (marmaDesign == "snayu") {
	bgColor = "rgba(219, 214, 160, "
	document.documentElement.style.background = "transparent";
	document.body.style.background = "transparent";
} else if (marmaDesign == "mamsa"){
	bgColor = "rgba(222, 176, 214, "
	document.documentElement.style.background = "transparent";
	document.body.style.background = "transparent";
} else if (marmaDesign == "sandhi"){
	bgColor = "rgba(162, 168, 222, "
	document.documentElement.style.background = "transparent";
	document.body.style.background = "transparent";
} else if (marmaDesign == "sira"){
	bgColor = "rgba(223, 107, 112, "
	document.documentElement.style.background = "transparent";
	document.body.style.background = "transparent";
} else if (marmaDesign == "asthi"){
	bgColor = "rgba(194, 179, 190,  " 
	document.documentElement.style.background = "transparent";
	document.body.style.background = "transparent";
} else {
	bgColor = "rgba(81, 35, 112, "
	mainColor1 = "rgba(33, 13, 38, 0.9)";
	mainColor2 = "rgba(40, 36, 54, 21)";
	var	textColor = "white";
	document.documentElement.style.setProperty('--mainColor-1', mainColor1);
	document.documentElement.style.setProperty('--mainColor-2', mainColor2);
	document.documentElement.style.setProperty('--textColor', textColor);
}
console.log(bgColor);
document.documentElement.style.setProperty('--bg-color-005', bgColor + " 0.05)");
document.documentElement.style.setProperty('--bg-color-010', bgColor + " 0.10)");
document.documentElement.style.setProperty('--bg-color-030', bgColor + " 0.30)");
document.documentElement.style.setProperty('--bg-color-050', bgColor + " 0.50)");
document.documentElement.style.setProperty('--bg-color-090', bgColor + " 0.90)");
document.documentElement.style.setProperty('--bg-color-100', bgColor + " 1.00)");

const transparent = new BABYLON.Color4(0,0,0,0.0000000000000001);
const transparentHex = transparent.toHexString();

var scene;
/**** build human body *****/
const createScene = function () {
	const scene = new BABYLON.Scene(engine);


	/**** build world *****/
	//scene.debugLayer.show()
	//var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: 1000, height: 1000, subdivisions: 2}, scene);
	//new BABYLON.AxesViewer(scene, 1000);
	scene.clearColor = transparent;


	/**** Materials *****/
	//color
	const skincolor = new BABYLON.StandardMaterial("skincolor");
	skincolor.diffuseColor = new BABYLON.Color3(0.96863, 0.82745, 0.65098);
	skincolor.alpha = 0.5;
	const haircolor = new BABYLON.StandardMaterial("haircolor");
	haircolor.diffuseColor = new BABYLON.Color3(0.74902, 0.62353, 0.50588);
	haircolor.alpha = 0.5;		
	const musclecolor = new BABYLON.StandardMaterial("musclecolor");
	musclecolor.diffuseColor = new BABYLON.Color3(0.87843, 0.35294, 0.19608);
	musclecolor.alpha = 0.5;
	const bonecolor = new BABYLON.StandardMaterial("bonecolor");
	bonecolor.diffuseColor = new BABYLON.Color3(0.79608, 0.79608, 0.79608);
	bonecolor.alpha = 0.5;
	const cartilagecolor = new BABYLON.StandardMaterial("cartilagecolor");
	cartilagecolor.diffuseColor = new BABYLON.Color3(0.75294, 0.71765, 0.68235);
	cartilagecolor.alpha = 0.5;		
	const arterycolor = new BABYLON.StandardMaterial("arterycolor");
	arterycolor.diffuseColor = new BABYLON.Color3(0.38824, 0.09020, 0.02745);
	arterycolor.alpha = 0.5;	
	const veincolor = new BABYLON.StandardMaterial("veincolor");
	veincolor.diffuseColor = new BABYLON.Color3(0.15686, 0.15686, 0.78431);
	veincolor.alpha = 0.5;
	const nervecolor = new BABYLON.StandardMaterial("nervecolor");
	nervecolor.diffuseColor = new BABYLON.Color3(0.94902, 0.84314, 0.42745);
	nervecolor.alpha = 0.5;
	const organcolor = new BABYLON.StandardMaterial("organcolor");
	organcolor.diffuseColor = new BABYLON.Color3(0.73725, 0.72941, 0.42745);
	organcolor.alpha = 0.5;		
	const digestioncolor = new BABYLON.StandardMaterial("digestioncolor");
	digestioncolor.diffuseColor = new BABYLON.Color3(0.94902, 0.59608, 0.58039);
	digestioncolor.alpha = 0.5;
	const lungcolor = new BABYLON.StandardMaterial("lungcolor");
	lungcolor.diffuseColor = new BABYLON.Color3(0.80784, 0.72941, 0.84314);
	lungcolor.alpha = 0.5;
	const livercolor = new BABYLON.StandardMaterial("livercolor");
	livercolor.diffuseColor = new BABYLON.Color3(0.45490, 0.30980, 0.16471);
	livercolor.alpha = 0.5;

	//marmas
	const snayu = new BABYLON.StandardMaterial("snayu");
	snayu.diffuseColor = new BABYLON.Color3(0.8588, 0.8392, 0.6275);
	snayu.alpha = 0.5;
	const mamsa = new BABYLON.StandardMaterial("mamsa");
	mamsa.diffuseColor = new BABYLON.Color3(0.8706, 0.6902, 0.8392);
	mamsa.alpha = 0.5;
	const sandhi = new BABYLON.StandardMaterial("sandhi");
	sandhi.diffuseColor = new BABYLON.Color3(0.6353, 0.6588, 0.8706);
	sandhi.alpha = 0.5;
	const sira = new BABYLON.StandardMaterial("sira");
	sira.diffuseColor = new BABYLON.Color3(0.8745, 0.4196, 0.4392);
	sira.alpha = 0.5;
	const asthi = new BABYLON.StandardMaterial("asthi");
	asthi.diffuseColor = new BABYLON.Color3(0.7608, 0.7020, 0.7451);
	asthi.alpha = 0.5;

	BABYLON.SceneLoader.ImportMeshAsync(
		"",
		"https://raw.githubusercontent.com/corbi1/marma/main/",
		"human3d_v8.6.glb"
	).then((result) => {
		console.log("loaded: human3d_v8.6.glb");

		// Iterate through each mesh to set rotation
		result.meshes.forEach((mesh) => {
			// Ensure transformations are baked into the geometry
			if (mesh.parent) {
				mesh.computeWorldMatrix(true); // Ensure world matrix is up-to-date
				mesh.bakeCurrentTransformIntoVertices();
			}
			
			// Apply additional rotation if needed
			mesh.rotationQuaternion = null;
			mesh.rotation.x += Math.PI / 2;
		});


		// Apply position offsets
		result.meshes.forEach((mesh) => {

		if (mesh.parent) {
				mesh.parent.computeWorldMatrix(true); // Update parent world matrix
				mesh.parent.position.set(0, 0, 0); // Reset parent position
				mesh.parent.rotationQuaternion = null; // Ensure no quaternion overrides
				mesh.parent.rotation.set(0, 0, 0); // Reset parent rotation
				mesh.parent.scaling.set(1, 1, 1); // Reset parent scale
			}

			mesh.setAbsolutePosition(new BABYLON.Vector3(0, 73, -100)); //x = left and right (red); y = up and down (green); z = back and forth (blue)
		});

		// Recursive function to apply changes to all descendants of a node
		function applyChangesToDescendants(node, changesFunction) {
			node.getChildren().forEach(function (child) {
				// Apply changes to the current child
				changesFunction(child);
				
				// Recursively apply changes to its descendants
				applyChangesToDescendants(child, changesFunction);
			});
		}

		// Set appearance of skin
		var collectionSkin = scene.getTransformNodeByName("Äußeres");
		console.log(collectionSkin);
		if (collectionSkin) {
			console.log("Set appearance of skin")
			applyChangesToDescendants(collectionSkin, function(mesh) {
				if (mesh.material) {
					mesh.material = skincolor; // Apply color
				} else if (!mesh.material){
					collectionSkin = scene.getTransformNodeByName(mesh);
				}
			});
		}

		// Set appearance of flesh
		var collectionflesh = scene.getTransformNodeByName("Zahnfleisch");
		console.log(collectionflesh);
		if (collectionflesh) {
			console.log("Set appearance of flesh")
			applyChangesToDescendants(collectionflesh, function(mesh) {
				if (mesh.material) {
					mesh.material = musclecolor; // Apply color
				} else if (!mesh.material){
					collectionflesh = scene.getTransformNodeByName(mesh);
				}
			});
		}

		// Set appearance of hair
		var collectionHair = scene.getTransformNodeByName("Haar");
		if (collectionHair) {
			console.log("Set appearance of Hair")
			applyChangesToDescendants(collectionHair, function(mesh) {
				if (mesh.material) {
					mesh.material = haircolor; // Apply color
				} else if (!mesh.material){
					collectionHair = scene.getTransformNodeByName(mesh);
				}
			});
		}

		// Set appearance of muscles
		var collectionMuscle = scene.getTransformNodeByName("Muskeln");
		if (collectionMuscle) {
			console.log("Set appearance of muscles")
			applyChangesToDescendants(collectionMuscle, function(mesh) {
				if (mesh.material) {
					mesh.material = musclecolor; // Apply color
				} else if (!mesh.material){
					collectionMuscle = scene.getTransformNodeByName(mesh);
				}
			});
		}

		// Set appearance of bones
		var collectionBones = scene.getTransformNodeByName("Knochen");
		if (collectionBones) {
			console.log("Set appearance of bones")
			applyChangesToDescendants(collectionBones, function(mesh) {
				if (mesh.material) {
					mesh.material = bonecolor; // Apply color
				} else if (!mesh.material){
					collectionBones = scene.getTransformNodeByName(mesh);
				}
			});
		}

		// Set appearance of artery
		var collectionArtery = scene.getTransformNodeByName("Arterien");
		if (collectionArtery) {
			console.log("Set appearance of artery")
			applyChangesToDescendants(collectionArtery, function(mesh) {
				if (mesh.material) {
					mesh.material = arterycolor; // Apply color
				} else if (!mesh.material){
					collectionArtery = scene.getTransformNodeByName(mesh);
				}
			});
		}		

		// Set appearance of vein
		var collectionVein = scene.getTransformNodeByName("Venen");
		if (collectionVein) {
			console.log("Set appearance of vein")
			applyChangesToDescendants(collectionVein, function(mesh) {
				if (mesh.material) {
					mesh.material = veincolor; // Apply color
				} else if (!mesh.material){
					collectionVein = scene.getTransformNodeByName(mesh);
				}
			});
		}			

		// Set appearance of nerve
		var collectionNerve = scene.getTransformNodeByName("Nerven");
		if (collectionNerve) {
			console.log("Set appearance of nerve")
			applyChangesToDescendants(collectionNerve, function(mesh) {
				if (mesh.material) {
					mesh.material = nervecolor; // Apply color
				} else if (!mesh.material){
					collectionNerve = scene.getTransformNodeByName(mesh);
				}
			});
		}

		// Set appearance of organs
		var collectionOrgans = scene.getTransformNodeByName("Organe");
		if (collectionOrgans) {
			console.log("Set appearance of organs")
			applyChangesToDescendants(collectionOrgans, function(mesh) {
				if (mesh.material) {
					mesh.material = organcolor; // Apply color
				} else if (!mesh.material){
					collectionOrgans = scene.getTransformNodeByName(mesh);
				}
			});
		}

		// Set appearance of digestion
		var collectionDigestion = scene.getTransformNodeByName("Verdauung");
		if (collectionDigestion) {
			console.log("Set appearance of digestion")
			applyChangesToDescendants(collectionDigestion, function(mesh) {
				if (mesh.material) {
					mesh.material = digestioncolor; // Apply color
				} else if (!mesh.material){
					collectionDigestion = scene.getTransformNodeByName(mesh);
				}
			});
		}

		// Set appearance of lung
		var collectionLung = scene.getTransformNodeByName("Lunge");
		if (collectionLung) {
			console.log("Set appearance of lung")
			applyChangesToDescendants(collectionLung, function(mesh) {
				if (mesh.material) {
					mesh.material = lungcolor; // Apply color
				} else if (!mesh.material){
					collectionLung = scene.getTransformNodeByName(mesh);
				}
			});
		}

		// Set appearance of liver
		var collectionLiver = scene.getTransformNodeByName("Leber");
		if (collectionLiver) {
			console.log("Set appearance of liver")
			applyChangesToDescendants(collectionLiver, function(mesh) {
				if (mesh.material) {
					mesh.material = livercolor; // Apply color
				} else if (!mesh.material){
					collectionLiver = scene.getTransformNodeByName(mesh);
				}
			});
		}

		// Set appearance of cartilage
		var nodeNames = ["M_Arm_r_Sehnen", "M_Arm_l_Sehnen", "M_Bein_r_Sehnen", "M_Bein_l_Sehnen", "Sehnen", "costal Cartilage", "Bandscheiben", "Augapfel"]; // Add your node names here

		// Iterate through the array and apply the changes to each node
		nodeNames.forEach(function(nodeName) {
			var node = scene.getTransformNodeByName(nodeName);
			if (node) {
				console.log("Set appearance of:", nodeName);
				applyChangesToDescendants(node, function(mesh) {
					if (mesh.material) {
						mesh.material = cartilagecolor; // Apply color
					} else if (!mesh.material) {
						var childNode = scene.getTransformNodeByName(mesh.name);
						if (childNode) {
							applyChangesToDescendants(childNode, function(childMesh) {
								if (childMesh.material) {
									childMesh.material = cartilagecolor; // Apply color
								}
							});
						}
					}
				});
			} else {
				console.log("Node not found:", nodeName);
			}
		});
		
		// Set appearance of snayu
		var collectionSnayu = scene.getTransformNodeByName("snayu");
		if (collectionSnayu) {
			console.log("Set appearance of snayu")
			applyChangesToDescendants(collectionSnayu, function(mesh) {
				if (mesh.material) {
					mesh.material = snayu; // Apply color
				} else if (!mesh.material){
					collectionSnayu = scene.getTransformNodeByName(mesh);
				}
			});
		}
		
		// Set appearance of mamsa
		var collectionMamsa = scene.getTransformNodeByName("mamsa");
		if (collectionMamsa) {
			console.log("Set appearance of mamsa")
			applyChangesToDescendants(collectionMamsa, function(mesh) {
				if (mesh.material) {
					mesh.material = mamsa; // Apply color
				} else if (!mesh.material){
					collectionMamsa = scene.getTransformNodeByName(mesh);
				}
			});
		}
		
		// Set appearance of sandhi
		var collectionSandhi = scene.getTransformNodeByName("sandhi");
		if (collectionSandhi) {
			console.log("Set appearance of sandhi")
			applyChangesToDescendants(collectionSandhi, function(mesh) {
				if (mesh.material) {
					mesh.material = sandhi; // Apply color
				} else if (!mesh.material){
					collectionSandhi = scene.getTransformNodeByName(mesh);
				}
			});
		}
		
		// Set appearance of sira
		var collectionSira = scene.getTransformNodeByName("sira");
		if (collectionSira) {
			console.log("Set appearance of sira")
			applyChangesToDescendants(collectionSira, function(mesh) {
				if (mesh.material) {
					mesh.material = sira; // Apply color
				} else if (!mesh.material){
					collectionSira = scene.getTransformNodeByName(mesh);
				}
			});
		}
		
		// Set appearance of asthi
		var collectionAsthi = scene.getTransformNodeByName("asthi");
		if (collectionAsthi) {
			console.log("Set appearance of asthi")
			applyChangesToDescendants(collectionAsthi, function(mesh) {
				if (mesh.material) {
					mesh.material = asthi; // Apply color
				} else if (!mesh.material){
					collectionAsthi = scene.getTransformNodeByName(mesh);
				}
			});
		}
		
		if (meshName) {
		
		}
		

		// Register a render loop to repeatedly render the scene
		engine.runRenderLoop(function () {
			scene.render();
		});
	initializeUI(scene);
	showLic();
	
	});
};

function setLight(camera, scene) {
/**** Set light *****/
		const light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 1, 0), scene);
		light.intensity = 0.5;
		light.specular = new BABYLON.Color3.Black();
		const light1 = new BABYLON.DirectionalLight("FrontRightLight", new BABYLON.Vector3(5, -1, 5), scene);
		light1.specular = new BABYLON.Color3.Black();
		light1.intensity = 0.6;
		const light2 = new BABYLON.DirectionalLight("FrontLeftLight", new BABYLON.Vector3(-5, -1, 5), scene);
		light2.specular = new BABYLON.Color3.Black();
		light2.intensity = 0.6;
		const light3 = new BABYLON.DirectionalLight("BackLight", new BABYLON.Vector3(0, -1, -5), scene);
		light3.specular = new BABYLON.Color3.Black();
		
		scene.registerBeforeRender(function () {
			light.position = camera.position;
		});
        return scene;
};

/**** License Info *****/
var licviz = 1;
function showLic(){
	if (licviz == 1){
		document.getElementById("licInfo1").classList.add('visible');
		document.getElementById("licInfo1").classList.remove('hidden');
		document.getElementById("licInfo2").classList.add('hidden');
		document.getElementById("licInfo2").classList.remove('visible');
		licviz = 0;
	} else if (licviz == 0){
		document.getElementById("licInfo2").classList.add('visible');
		document.getElementById("licInfo2").classList.remove('hidden');
		licviz = 1;
	}
}

function initializeUI(scene) {

	const modelheight = 1700;
	var cameraY = modelheight/2 // Starting position at the middle
	var camera

	const CAMcontroll = document.getElementById('CAMcontroll');
	const CAMslider = document.createElement('input');
	CAMslider.classList.add('slider');
	CAMslider.id = 'CAMslider';
	CAMslider.type = 'range';
	CAMslider.min = '0';
	CAMslider.max = modelheight; // Set maximum to model height
	CAMslider.value = modelheight - cameraY;

	let betaReset = false; // Flag to track if beta reset is complete

	CAMslider.addEventListener('input', () => {
		const invertedValue = CAMslider.max - CAMslider.value;

		if (!betaReset) {
			// Perform the smooth beta transition only once
			animateBeta(camera, Math.PI / 2, () => {
				betaReset = true; // Mark the beta as reset
				changeCamera(camera, parseFloat(invertedValue)); // Update Y position after transition
			});
		} else {
			// Update the camera position without changing beta
			changeCamera(camera, parseFloat(invertedValue));
		}
			updateIconPosition(); // Optional: Updates the icon position if needed
		});

	// Reset betaReset on slider release
	CAMslider.addEventListener('mouseup', () => {
		betaReset = false; // Allow animation to trigger again on next click
	});

	// For better cross-device support (touch and pointer devices)
	CAMslider.addEventListener('touchend', () => {
		betaReset = false; // Reset beta on touch release
	});

	CAMslider.addEventListener('pointerup', () => {
		betaReset = false; // Reset beta on pointer release
	});

	CAMcontroll.appendChild(CAMslider);

	const thumbIcon = document.createElement('div');
	thumbIcon.id = 'thumb-icon';
	CAMcontroll.appendChild(thumbIcon);
	const elem = document.createElement("img");
	elem.src = '../resources/body/see-icon.png';
	thumbIcon.appendChild(elem);

	function updateIconPosition() {
		const sliderHeight = CAMslider.offsetHeight;
		const thumbHeight = thumbIcon.offsetHeight;
		const max = CAMslider.max;
		const min = CAMslider.min;
		const value = CAMslider.value;
		const isFirefox = typeof InstallTrigger !== 'undefined';
		const offset = isFirefox ? 0 : 5;
		const top = ((value - min) / (max - min)) * (sliderHeight - (thumbHeight - offset)) - (((1-(value - min)) / (max - min)) * offset) - offset;
		thumbIcon.style.top = `${top}px`;
	}
		
	function changeCamera(camera, value) {
		const originalRadius = camera.radius; // Save the current radius
		camera.setTarget(new BABYLON.Vector3(0, value, 0));
		camera.position.y = value; // Update the camera's Y position
		camera.beta = Math.PI / 2;
		camera.radius = originalRadius; // Restore the radius
		//console.log ("camera focus at: " + value)
		
	}

	// Function to animate the camera's beta angle
	function animateBeta(camera, targetBeta, onComplete) {
		const currentBeta = camera.beta; // Start angle

		const animation = new BABYLON.Animation(
			"betaAnimation",                // Animation name
			"beta",                         // Property to animate
			60,                             // Frames per second
			BABYLON.Animation.ANIMATIONTYPE_FLOAT, // Animation type
			BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT // No looping
		);

		// Animation keys (start and end values)
		const keys = [
			{ frame: 0, value: currentBeta },
			{ frame: 30, value: targetBeta } // duration 30 frame of 60
		];

		animation.setKeys(keys);

		// Attach the animation to the camera
		camera.animations = [animation];

		// Start the animation
		const anim = scene.beginAnimation(camera, 0, 30, false);

		// Call onComplete once animation ends
		anim.onAnimationEnd = () => {
			if (onComplete) onComplete();
		};
	}

	// rotation Controll
	const rotationControl = document.createElement('div');
	rotationControl.id = 'rotationControll';

	// Create the nested <img> element
	const rotationIcon = document.createElement('img');
	rotationIcon.src = '../resources/body/stop-rotate-icon.webp'; // Set initial image
	rotationIcon.alt = 'Rotation Control'; // Accessibility text
	rotationIcon.id = 'rotationIcon'; // Add ID for styling in CSS

	rotationHelptxt = document.getElementById("rotHelptxt");
	rotationHelpimg = document.getElementById("rotHelpimg");

	// Append the <img> to the div
	rotationControl.appendChild(rotationIcon);

	// Add the event listener for click events
	let isRotationStopped = true; // State toggle for idle rotation speed
	rotationControl.addEventListener('click', () => {
		cameraRotation();
	});

	// Define the cameraRotation function
	function cameraRotation() {
		if (isRotationStopped) {
			camera.autoRotationBehavior.idleRotationSpeed = 0.0;
			rotationIcon.src = '../resources/body/start-rotate-icon.webp'; // rotate image color= #6A995D
			rotationHelptxt.innerHTML = "starten";
			rotationHelpimg.src = '../resources/body/start-rotate-icon.webp';	
		} else {
			camera.autoRotationBehavior.idleRotationSpeed = 0.1;
			rotationIcon.src = '../resources/body/stop-rotate-icon.webp'; // stop image color= #993636
			rotationHelptxt.innerHTML = "stoppen";
			rotationHelpimg.src = '../resources/body/stop-rotate-icon.webp';
		}
		isRotationStopped = !isRotationStopped; // Toggle the state
	}

	// Append the rotation control div to the target element
	CAMcontroll.appendChild(rotationControl);

	
/**** Set camera *****/	
	camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, cameraY, 0), scene);
	camera.useAutoRotationBehavior = true;
	camera.alpha = 5;
	camera.beta = 1.5;
	camera.radius = 2350;
	if (getQueryParam('cameraR') >= 0 && getQueryParam('cameraR') != null ){ // Zoom from parameter
		camera.radius = getQueryParam('cameraR');
	}

	camera.attachControl(canvas, true);
	camera.autoRotationBehavior.idleRotationSpeed = 0.1;
	
	// Set camera limits
	camera.lowerRadiusLimit = 10;
	camera.upperRadiusLimit = modelheight * 5;

	// Adjust zoom speed
	camera.useNaturalPinchZoom = true;  // Enable natural pinch zoom
	//camera.pinchPrecision = 8; default = 12
	//panningSensibility= 1000; default = 100
	camera.wheelPrecision = 0.5; //default = 1

	setLight(camera, scene);
	
/***** visibility control*****/
	//document.addEventListener("DOMContentLoaded", function() {
		const icons = ["marmas.webp","skin.webp", "muscles.webp", "bones.webp", "intestines.webp", "blood.webp", "nerves.webp"];
		const container = document.getElementById('vizContrl');
		const column = document.getElementById('column-1');
		let selectedIndex = -1; //no button selected

		// Create buttons and sliders dynamically
		icons.forEach((icon, index) => {
			const item = document.createElement('div');
            item.classList.add('item');

			// Create value display
			const valueDisplay = document.createElement('div');
            valueDisplay.classList.add('vDisplay');
			valueDisplay.classList.add('valueDisplay');			
			
			// Create button
			const button = document.createElement('button');
			button.classList.add('button');
			button.style.backgroundImage = `url('../resources/body/${icon}')`;
			button.addEventListener('click', () => toggleVisibility(index));
			item.appendChild(button);
			button.appendChild(valueDisplay);
			
			const sliderContainer = document.createElement('div');
            sliderContainer.classList.add('sliderContainer');

			// Create slider
			const slider = document.createElement('input');
			slider.classList.add('slider');
			slider.type = 'range';
			slider.min = '0';
			slider.max = '100';
			slider.value = '50';
			slider.addEventListener('input', () => {
				setMeshVisibility(index, slider.value);
				updateSliderBackground(slider);
				updateValueDisplay(valueDisplay, slider);
			});
			updateSliderBackground(slider);
			updateValueDisplay(valueDisplay, slider);
			sliderContainer.appendChild(slider);
			
			item.appendChild(sliderContainer);
            column.appendChild(item);
			
		});
		
		// Function to update the slider's background
		function updateSliderBackground(slider) {
			const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
			slider.style.background = `linear-gradient(to right, var(--bg-color-100) 0%, var(--bg-color-100) ${value}%, var(--bg-white) ${value}%, var(--bg-white) 100%)`;
		}

		// Function to update displayed value
		function updateValueDisplay(valueDisplay, slider) {
			const value = slider.value
			valueDisplay.innerHTML = value + " %";
			valueDisplay.style.width = value + "%";
		}

		// Toggle visibility of sliders and buttons
		function toggleVisibility(index) {
			//const sliders = document.querySelectorAll('.slider');
			const container = document.getElementById('vizContrl');
			const sliderContainers = document.querySelectorAll('.sliderContainer');
			const items = document.querySelectorAll('.item');
			const buttons = document.querySelectorAll('.button');
			const valueDisplays = document.querySelectorAll('.vDisplay');

			if (selectedIndex === index) { 
				// **State 1**: Same button clicked again
				// Deselect the current button and remove "not-selected" from all
				sliderContainers[index].classList.remove('visible');
				valueDisplays.forEach(display => {display.classList.remove('visible');});
				items.forEach(item => item.classList.remove('selected', 'not-selected'));
				container.classList.remove('selected');
				selectedIndex = -1;
			} else {
				if (selectedIndex !== -1) {
					// **State 2**: New button clicked when another is already selected
					// Remove the current selection and set all others to "not-selected"
					sliderContainers[selectedIndex].classList.remove('visible');
					//valueDisplays[index].classList.remove('visible');
					items[selectedIndex].classList.remove('selected');
					items.forEach((item, i) => {
						if (i !== index) item.classList.add('not-selected');
					});
				} else {
				// **State 3**: New button clicked with no button currently selected
					items.forEach((item, i) => {
						if (i !== index) item.classList.add('not-selected');
					});
				}
				container.classList.add('selected');
				// Select the new button
				sliderContainers[index].classList.add('visible');
				valueDisplays[index].classList.add('visible');
				items[index].classList.add('selected');
				items[index].classList.remove('not-selected');
				selectedIndex = index;
			}
		}

	// Define collections of meshes
	var meshCollections = [
	["snayu", "mamsa", "sandhi", "sira", "asthi"],
	["Äußeres"],
	["Muskeln"],
	["Knochen"],
	["Organe"],
	["Arterien", "Venen"],
	["Nerven"]
	];

	// Helper function to apply changes to all descendants
	function applyChangesToDescendants(node, callback) {
		callback(node);
		node.getChildMeshes().forEach(function(child) {
			applyChangesToDescendants(child, callback);
		});
	}

	// Function to set mesh visibility or opacity
	function setMeshVisibility(index, opacity) {
		//console.log("index: " + index);
		//console.log("collection: " + meshCollections[index]);

		// Iterate through the collection of names
		meshCollections[index].forEach(function(collectionName) {
			var node = scene.getTransformNodeByName(collectionName);
			if (node) {
				//console.log("Set opacity of:", collectionName);
				applyChangesToDescendants(node, function(mesh) {
					if (mesh.material) {
						mesh.material.alpha = opacity / 100;
					}
				});
			} else {
				console.log("Node not found:", collectionName);
			}
		});
	}

	// Set camera focus on selected mesh
	if (meshName) {
		console.log("meshName:", meshName);
		//hide camera control
		document.getElementById("CAMslider").classList.add('hidden');
		document.getElementById("thumb-icon").classList.add('hidden');
		// Find the mesh by name
		const selectedMesh = scene.getMeshByName(meshName);
		if (selectedMesh) {
			console.log("mesh: ", meshName);
			// Display the mesh name in the div
			document.getElementById("meshNameDiv").innerText = `${marmaName}`;
			document.getElementById("meshNameDiv").classList.remove('hidden');

			// Focus the camera on the mesh
			const meshPosition = selectedMesh.getBoundingInfo().boundingBox.centerWorld;
			camera.setTarget(meshPosition);
			cameraY = meshPosition.y;
			camera.position.y = cameraY;
			camera.beta = Math.PI / 2;
			CAMslider.value = modelheight - cameraY;
			console.log("hight: ", cameraY);
		} else {
			document.getElementById("meshNameDiv").innerText = `Mesh not found: ${meshName}`;
		}
	}	
	
	
	document.getElementById("loading-screen").style.display = "none";
	document.getElementById("helpbtn").classList.remove('hidden');
	showHint();
	//document.getElementById('menueButton-container').classList.remove('hidden');
	setTimeout(updateIconPosition, 0);
	//});
}

const load = createScene(); //Call the createScene function

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
engine.resize();
});

});
