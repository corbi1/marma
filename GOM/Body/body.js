document.addEventListener("DOMContentLoaded", function() {
	
const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let scene;
let camera;

function getQueryParam(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

let key = getQueryParam('key');
console.log(key);
if (key !== null) {
	document.getElementById('menueButton-container').style.display = "none";
}
let marmaName;
let meshName;

/**** Colors *****/
let marmaDesign = "";
marmaDesign = getQueryParam('marmaDesign');

var bgColor;
var mainColor1, mainColor2;

console.log("style: " + marmaDesign);

// marma Gruppen
const marmaGRP = {
    snayu: "Sehnen-Marma",
    mamsa: "Muskel-Marma",
    sandhi: "Gelenk-Marma",
    sira: "Blutgefäß-Marma",
    asthi: "Knochen-Marma"
};


// marma colors
const colorMap = {
    snayu: "rgba(219, 214, 160, ",
    mamsa: "rgba(222, 176, 214, ",
    sandhi: "rgba(162, 168, 222, ",
    sira: "rgba(223, 107, 112, ",
    asthi: "rgba(194, 179, 190, "
};

// Check if marmaDesign is in the colorMap
if (colorMap[marmaDesign]) {
    bgColor = colorMap[marmaDesign];
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent"; // Only for defined styles
} else {
    bgColor = "rgba(81, 35, 112, ";
    mainColor1 = "rgba(33, 13, 38, 0.9)";
    mainColor2 = "rgba(40, 36, 54, 21)";
    let textColor = "white";

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

//###################################################################################
/**** create 3d scene *****/
//###################################################################################
const createScene = function () {
	scene = new BABYLON.Scene(engine);

	/**** build world *****/
	//scene.debugLayer.show()
	//var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: 1000, height: 1000, subdivisions: 2}, scene);
	//new BABYLON.AxesViewer(scene, 1000);
	scene.clearColor = transparent;

	/**** Materials *****/
	// Function to create a material
	function createMaterial(name, color, alpha = 0.5) {
		const material = new BABYLON.StandardMaterial(name);
		material.diffuseColor = new BABYLON.Color3(...color);
		material.alpha = alpha;
		return material;
	}

	// Define colors of the meshes
	const colors = {
		skin: [0.96863, 0.82745, 0.65098],
		hair: [0.74902, 0.62353, 0.50588],
		muscle: [0.87843, 0.35294, 0.19608],
		bone: [0.79608, 0.79608, 0.79608],
		cartilage: [0.75294, 0.71765, 0.68235], //#C0B7AE
		yearn: [0.85882, 0.84314, 0.78431], //DBD7C8
		artery: [0.38824, 0.09020, 0.02745],
		vein: [0.15686, 0.15686, 0.78431],
		nerve: [0.94902, 0.84314, 0.42745],
		organ: [0.73725, 0.72941, 0.42745],
		digestion: [0.94902, 0.59608, 0.58039],
		lung: [0.80784, 0.72941, 0.84314],
		liver: [0.45490, 0.30980, 0.16471],
		snayu: [0.8588, 0.8392, 0.6275],
		mamsa: [0.8706, 0.6902, 0.8392],
		sandhi: [0.6353, 0.6588, 0.8706],
		sira: [0.8745, 0.4196, 0.4392],
		asthi: [0.7608, 0.7020, 0.7451],
	};

	// Create materials dynamically
	const materials = Object.fromEntries(
		Object.entries(colors).map(([key, color]) => {
			//const alpha = key === 'snayu' ? 1 : 0.5; // If the key is "snayu", set alpha to 1, otherwise use default alpha
			alpha = 0.5;
			return [key, createMaterial(key, color, alpha)];
		})
	);

	BABYLON.SceneLoader.ImportMeshAsync(
		"",
		"https://raw.githubusercontent.com/corbi1/marma/main/3D/",
		"human3d_v8.7.glb"
	).then((result) => {
		console.log("loaded: human3d_v8.7.glb");

		// Apply transformations (baking, rotation, parent reset)
		result.meshes.forEach((mesh) => {
			if (mesh.parent) {
				//console.log(mesh.getAbsolutePosition())
				mesh.computeWorldMatrix(true); // Ensure world matrix is up-to-date
				mesh.bakeCurrentTransformIntoVertices();

				// Reset parent transforms
				//mesh.parent.position.set(0, 0, 0);
				//mesh.parent.rotationQuaternion = null;
				//mesh.parent.rotation.set(0, 0, 0);
				//mesh.parent.scaling.set(1, 1, 1);
			}

			// Apply rotation
			mesh.rotationQuaternion = null;
			mesh.rotation.x += Math.PI / 2;
		});

		// Set absolute position (AFTER all transformations are applied)
		result.meshes.forEach((mesh) => {
			mesh.computeWorldMatrix(true); // Ensure world matrix is updated
			mesh.setAbsolutePosition(new BABYLON.Vector3(0, 73, -100));
		});

		// Nodes and materials mapping
		const nodeMaterialMap = {
			"Äußeres": "skin",
			"Zahnfleisch": "muscle",
			"Haar": "hair",
			"Muskeln": "muscle",
			"Knochen": "bone",
			"Arterien": "artery",
			"Venen": "vein",
			"Nerven": "nerve",
			"Organe": "organ",
			"Verdauung": "digestion",
			"Lunge": "lung",
			"Leber": "liver",
			"snayu": "snayu",
			"mamsa": "mamsa",
			"sandhi": "sandhi",
			"sira": "sira",
			"asthi": "asthi"
		};

		// Apply materials dynamically
		Object.entries(nodeMaterialMap).forEach(([nodeName, materialKey]) => {
			const node = scene.getTransformNodeByName(nodeName);
			if (node) {
				console.log(`Set appearance of ${nodeName}`);
				applyChangesToDescendants(node, (mesh) => {
					if (mesh.material) mesh.material = materials[materialKey];
				});
			}
		});

		// Set cartilage color for multiple nodes
		["costal Cartilage", "Bandscheiben"]
			.forEach((nodeName) => {
				const node = scene.getTransformNodeByName(nodeName);
				if (node) {
					console.log(`Set appearance of ${nodeName}`);
					applyChangesToDescendants(node, (mesh) => {
						if (mesh.material) mesh.material = materials.cartilage;
					});
				}
			});
		// Set yearn color for multiple nodes
		["M_Arm_r_Sehnen", "M_Arm_l_Sehnen", "M_Bein_r_Sehnen", "M_Bein_l_Sehnen", "Sehnen", "Augapfel"]
			.forEach((nodeName) => {
				const node = scene.getTransformNodeByName(nodeName);
				if (node) {
					console.log(`Set appearance of ${nodeName}`);
					applyChangesToDescendants(node, (mesh) => {
						if (mesh.material) mesh.material = materials.yearn;
					});
				}
			});

			// Flip Marmas on x-axis
			const collectionMarma = scene.getTransformNodeByName("Marmas");
			if (collectionMarma) {
				console.log("Flip Marmas on x-axis");
				collectionMarma.scaling.x *= -1;
			}

        scene.executeWhenReady(() => {
            // Now it's safe to create the camera and everything else
            initializeUI(scene);
            showLic();

            // Start the render loop *after* everything is ready
            engine.runRenderLoop(() => {
                scene.render();
            });
        });
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

// Recursive function to apply changes to all descendants of a node
function applyChangesToDescendants(node, changesFunction) {
	node.getChildren().forEach(function (child) {
		// Apply changes to the current child
		changesFunction(child);
		
		// Recursively apply changes to its descendants
		applyChangesToDescendants(child, changesFunction);
	});
}

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
document.getElementById("licInfo").addEventListener("click", showLic);

//###################################################################################
/**** create UI *****/
//###################################################################################
let selectedIndex = -1;
function initializeUI(scene) {
    const modelHeight = 1700;
    let cameraY = modelHeight / 2;

    const meshCollections = [
        ["snayu", "mamsa", "sandhi", "sira", "asthi"],
        ["Äußeres"],
        ["Muskeln"],
        ["Knochen"],
        ["Organe"],
        ["Arterien", "Venen"],
        ["Nerven"]
    ];

    /*** Camera Setup ***/
    camera = setupCamera(scene, cameraY, modelHeight);
    setLight(camera, scene);

    /*** Initialize UI Elements ***/
    setupCameraControls(modelHeight, cameraY);
    initializeMeshControls(meshCollections);

    //if (meshName) focusOnMesh(meshName);
	if (key !== null) {
		marmaName = getQueryParam('marmaName');
		meshName = key + "_" + marmaName;
		console.log(meshName);
		document.getElementById('marmaFocusHelp').style.display = "block";
		document.getElementById('camSliderHelp').style.display = "none";

		let targetMesh = scene.getMeshByName(meshName);
		if (targetMesh) {
			handlePickedMeshes(targetMesh);
			document.getElementById('CAMsliderIcon').style.display = "none";
		} else {
			console.warn("Mesh not found:", meshName);
		}
	} else if (key == null) {
		document.getElementById('marmaFocusHelp').style.display = "none";
		document.getElementById('camSliderHelp').style.display = "block";
	}

    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("help").classList.remove('hidden');
    document.getElementById("CAMcontroll").classList.remove('hidden');	
    showCircle(3,"help","radiate","Hilfe")
	setTimeout(updateIconPosition, 0);
}

/*** Function to Set Up Camera Controls ***/
let isAnimatingBeta = false; // Track if beta animation is running

function setupCameraControls(modelHeight, cameraY) {
    //const CAMcontroll = document.getElementById('CAMcontroll');
	const CAMcontroll = document.getElementById('CAMsliderContainer');

    // Camera slider
    const CAMslider = createSlider('CAMslider', 0, modelHeight, modelHeight - cameraY, () => {});
    CAMcontroll.appendChild(CAMslider);
    CAMcontroll.appendChild(createIcon('thumb-icon', '../resources/body/see-icon.png'));

	let lastCameraY = camera.position.y; // Store last known position
	let lastCameraRadius = camera.radius; // Store the current radius

	CAMslider.addEventListener('input', () => {
		const invertedValue = CAMslider.max - CAMslider.value; // Calculate once

		if (!isAnimatingBeta && Math.abs(camera.beta - Math.PI / 2) > 0.01) {
			isAnimatingBeta = true;
			changeCameraAnimated(0, lastCameraY, 0, lastCameraRadius, Math.PI / 2, 60, () => { 
				console.log("Camera transition complete!");
				isAnimatingBeta = false;
			});
		} else {
			changeCamera(camera, invertedValue); // Normal movement
		}

		lastCameraY = invertedValue; // Update last known Y value
		updateIconPosition();
	});

    // Rotation control
	document.getElementById('rotationIcon').addEventListener('click', toggleCameraRotation);
}

/*** Function to Set Up Camera ***/
function setupCamera(scene, cameraY, modelHeight) {
    camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, cameraY, 0), scene);
    camera.useAutoRotationBehavior = true;
    camera.alpha = 5;
    camera.beta = 1.5;
    camera.radius = 2350;
    camera.attachControl(canvas, true);
    camera.autoRotationBehavior.idleRotationSpeed = 0.1;
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 5 * modelHeight;
    camera.useNaturalPinchZoom = true;
    camera.wheelPrecision = 0.5;
    return camera;
}

/*** Function to Initialize Mesh Controls ***/
function initializeMeshControls(meshCollections) {
    const icons = ["marmas.webp", "skin.webp", "muscles.webp", "bones.webp", "intestines.webp", "blood.webp", "nerves.webp"];
    const column = document.getElementById('column-1');

    icons.forEach((icon, index) => {
        const item = document.createElement('div');
        item.classList.add('item');

        // Create value display
        const valueDisplay = document.createElement('div');
        valueDisplay.classList.add('vDisplay', 'valueDisplay');

        // Create button
        const button = document.createElement('button');
        button.classList.add('button');
        button.style.backgroundImage = `url('../resources/body/${icon}')`;
        button.addEventListener('click', () => toggleVisibility(index));
        item.appendChild(button);
        button.appendChild(valueDisplay);

        // Create slider container
        const sliderContainer = document.createElement('div');
        sliderContainer.classList.add('sliderContainer');

        // Create slider
        const slider = createSlider('', 0, 100, 50, (slider) => {
            setMeshVisibility(index, slider.value, meshCollections);
            updateSliderVisuals(slider, valueDisplay);
        });
        sliderContainer.appendChild(slider);
        updateSliderVisuals(slider, valueDisplay);

        item.appendChild(sliderContainer);
        column.appendChild(item);
    });
}

/*** Helper Functions ***/
function createSlider(id, min, max, value, onInput) {
    const slider = document.createElement('input');
    slider.classList.add('slider');
    if (id) slider.id = id;
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.value = value;
    slider.addEventListener('input', () => onInput(slider));
    return slider;
}

function createIcon(id, src, onClick) {
    const icon = document.createElement('div');
    icon.id = id;
    const img = document.createElement('img');
    img.src = src;
    icon.appendChild(img);
    if (onClick) icon.addEventListener('click', onClick);
    return icon;
}

function updateIconPosition() {
	thumbIcon = document.getElementById('thumb-icon');
	const sliderHeight = CAMslider.offsetHeight;
	const thumbHeight = thumbIcon.offsetHeight;
	const max = CAMslider.max;
	const min = CAMslider.min;
	const value = CAMslider.value;
	const isFirefox = typeof InstallTrigger !== 'undefined';
	const offset = isFirefox ? 0 : 5;
	const top = ((value - min) / (max - min)) * (sliderHeight - (thumbHeight - offset)) - ((((value - min)) / (max - min)) * offset) - offset;
	thumbIcon.style.top = `${top}px`;
}

function changeCamera(camera, value) {
    const originalRadius = camera.radius;

    // Smoothly animate the Y-axis transition
    BABYLON.Animation.CreateAndStartAnimation(
        "yMove",
        camera,
        "position.y",
        60, // FPS
        15, // Duration (frames)
        camera.position.y,
        value,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    // Keep camera beta stable
    camera.setTarget(new BABYLON.Vector3(0, value, 0));
    camera.beta = Math.PI / 2;
    camera.radius = originalRadius;
}

// Function to animate the camera
function changeCameraAnimated(x, y, z, radius, beta, durationFrames = 30, onComplete) {
    if (!camera || !scene) {
        console.error("Camera or scene is not initialized yet!");
        return;
    }

    const targetPosition = new BABYLON.Vector3(x, y, z);
    const startTarget = camera.target.clone();

    let animations = [];

    // Animate beta only if it has changed
    if (Math.abs(camera.beta - beta) > 0.01) {
        const betaAnimation = new BABYLON.Animation(
            "betaAnimation",
            "beta",
            durationFrames,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        betaAnimation.setKeys([
            { frame: 0, value: camera.beta },
            { frame: durationFrames, value: beta }
        ]);
        animations.push(betaAnimation);
    }

    // Animate radius only if it has changed
    if (Math.abs(camera.radius - radius) > 0.01) {
        const radiusAnimation = new BABYLON.Animation(
            "radiusAnimation",
            "radius",
            durationFrames,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        radiusAnimation.setKeys([
            { frame: 0, value: camera.radius },
            { frame: durationFrames, value: radius }
        ]);
        animations.push(radiusAnimation);
    }

    // Animate target position only if it has changed
    if (!camera.target.equals(targetPosition)) {
        const targetAnimation = new BABYLON.Animation(
            "targetAnimation",
            "target",
            durationFrames,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        targetAnimation.setKeys([
            { frame: 0, value: startTarget },
            { frame: durationFrames, value: targetPosition }
        ]);
        animations.push(targetAnimation);
    }

    // If no animation needs to run, exit
    if (animations.length === 0) {
        console.log("No animation required, all values are the same.");
        if (onComplete) onComplete();
        return;
    }

    //easing
    const easingFunction = new BABYLON.SineEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    animations.forEach(anim => {
        anim.setEasingFunction(easingFunction);
    });

    // Assign animations to the camera
    camera.animations = animations;

    // Start the animation
    const animation = scene.beginAnimation(camera, 0, durationFrames, false);

    if (onComplete) {
        animation.onAnimationEnd = onComplete;
    }
}

function toggleCameraRotation() {
    const cameraRotation = camera.autoRotationBehavior;
    const isStopped = cameraRotation.idleRotationSpeed === 0;
    cameraRotation.idleRotationSpeed = isStopped ? 0.1 : 0.0;
	document.getElementById('rotationIcon').src = isStopped ? '../resources/body/stop-rotate-icon.webp' : '../resources/body/start-rotate-icon.webp';// Update the image source based on rotation state
}

/*** Toggle Visibility Logic ***/

function toggleVisibility(index) {
    const container = document.getElementById('vizContrl');
    const sliderContainers = document.querySelectorAll('.sliderContainer');
    const items = document.querySelectorAll('.item');
    const valueDisplays = document.querySelectorAll('.vDisplay');

    if (selectedIndex === index) {
        // **State 1**: Deselect the current selection
        sliderContainers[index].classList.remove('visible');
        valueDisplays.forEach(display => display.classList.remove('visible'));
        items.forEach(item => item.classList.remove('selected', 'not-selected'));
        container.classList.remove('selected');
        selectedIndex = -1;
    } else {
        if (selectedIndex !== -1) {
            // **State 2**: New selection while another is active
            sliderContainers[selectedIndex].classList.remove('visible');
            items[selectedIndex].classList.remove('selected');
        }

        // **State 3**: Select the new item
        container.classList.add('selected');
        sliderContainers[index].classList.add('visible');
        valueDisplays[index].classList.add('visible');
        items[index].classList.add('selected');
        items.forEach((item, i) => item.classList.toggle('not-selected', i !== index));

        selectedIndex = index;
    }
}

function setMeshVisibility(index, opacity, meshCollections) {
    meshCollections[index].forEach(name => {
        const node = scene.getTransformNodeByName(name);
        if (node) applyChangesToDescendants(node, mesh => mesh.material && (mesh.material.alpha = opacity / 100));
    });
}

function focusOnMesh(meshName, meshParent) {
    const selectedMesh = scene.getMeshByName(meshName);
    let marmaName = meshName.split('_')[0];
	if (selectedMesh) {
        document.getElementById("meshNameDiv").innerText = marmaName;
		document.getElementById("meshParentDiv").innerText = marmaGRP[meshParent] //"Gruppe: " + meshParent  ;
        document.getElementById("meshInfoDiv").classList.remove('hidden');
        const position = selectedMesh.getBoundingInfo().boundingBox.centerWorld;
        changeCameraAnimated(
            position.x,
            position.y,
            position.z,
            300, //radius
            Math.PI / 2, //angle
            60,
            () => {
                console.log("Camera transition complete!");
            }
        );
		//hide camera control
		document.getElementById("CAMsliderContainer").classList.add('hidden');
		document.getElementById("thumb-icon").classList.add('hidden');

		document.getElementById("CAMsliderIcon").style.display = "block";
		// linkt to marma
		let parameter = meshName.split('_').slice(0, 2).join('_');
		document.getElementById("marmaLink").href = "../Marmas/marmas.html?filterWindow=0&Marma=" + parameter;
    }
}

function defocusOnMesh() {
	document.getElementById("meshInfoDiv").classList.add('hidden');
	changeCameraAnimated(0, camera.target.y, 0, 1000, Math.PI / 2, 60, () => {
		console.log("Camera transition complete!");
	});
	activateMesh();
	document.getElementById("CAMsliderContainer").classList.remove('hidden');
	document.getElementById("thumb-icon").classList.remove('hidden');
	document.getElementById("CAMsliderIcon").style.display = "none";
}
document.getElementById("CAMsliderIcon").addEventListener("click", defocusOnMesh);

function updateSliderVisuals(slider, valueDisplay) {
    const percentage = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, var(--bg-color-100) 0%, var(--bg-color-100) ${percentage}%, var(--bg-white) ${percentage}%, var(--bg-white) 100%)`;
    valueDisplay.innerHTML = `${slider.value} %`;
    valueDisplay.style.width = `${slider.value}%`;
}

const load = createScene(); //Call the createScene function

//####################################################################################################

/*
// Create a function to show a 3D callout at the center of the mesh
function show3DCallout(mesh, parentName) {
    // Remove any existing callouts
    remove3DCallouts();

    // Create a plane mesh to display the callout text
    var calloutPlane = BABYLON.MeshBuilder.CreatePlane("calloutPlane", { size: 100 }, scene);
    calloutPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL; // Make it always face the camera

    // Calculate the offset for the callout position (next to the mesh)
    mesh.computeWorldMatrix(true)
	var worldPosition = mesh.getAbsolutePosition();
	console.log(worldPosition)
    var offset = new BABYLON.Vector3(20, 0, 0);  // Adjust this for positioning next to the mesh (x +2 offset)
    calloutPlane.position = worldPosition.add(offset); // Position it next to the mesh

    // Create a dynamic texture to hold the text
    var dynamicTexture = new BABYLON.DynamicTexture("dynamicTexture", 512, scene, false);
    var ctx = dynamicTexture.getContext();
    ctx.font = "80px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Mesh: ${mesh.name}`, 10, 40);
    ctx.fillText(`Parent: ${parentName}`, 10, 80);
    dynamicTexture.update();

    // Assign the texture to the plane's material
    var material = new BABYLON.StandardMaterial("calloutMaterial", scene);
    material.diffuseTexture = dynamicTexture;
    material.backFaceCulling = false;
    calloutPlane.material = material;

    // Optionally, you can make the callout disappear after some time
    setTimeout(() => {
        remove3DCallouts(); // Remove callout after 3 seconds (optional)
    }, 3000);
}

// Function to remove all previous 3D callouts from the scene
function remove3DCallouts() {
    scene.meshes.forEach(mesh => {
        if (mesh.name.startsWith("calloutPlane")) {
            mesh.dispose();
        }
    });
}

*/

// activate meshes
function handlePickedMeshes(pickedMesh) {
        let parentNode = pickedMesh.parent;
        let grandParentNode = parentNode ? parentNode.parent : null;

        if (grandParentNode && grandParentNode.id === "Marmas") {
            console.log(`Activated: Mesh - ${pickedMesh.name}, Parent - ${parentNode ? parentNode.name : "None"}`);
            activateMesh(pickedMesh);
            focusOnMesh(pickedMesh.name, parentNode.name);
            // show3DCallout(innerMesh, parentNode.name);
        }

}

// On click
scene.onPointerPick = function (evt, pickInfo) {
    let pickedMeshes = scene.multiPick(evt.clientX, evt.clientY);
	if (pickedMeshes.length > 0) {
        let innerMesh = pickedMeshes[pickedMeshes.length - 1].pickedMesh;
		handlePickedMeshes(innerMesh);
	}
    
};

let currentActiveMesh = null;  // Keep track of the currently active mesh
let originalMaterial = null;   // Store the original material of the active mesh

// Function to apply the 'active' material to a mesh
function activateMesh(mesh) {
    // Reset the previously active mesh's material, if there is one
    if (currentActiveMesh && currentActiveMesh !== mesh) {
        // Reset the material of the previous active mesh
        currentActiveMesh.material = originalMaterial;
    }

    if (mesh){
		// Store the original material of the mesh that is being activated
		originalMaterial = mesh.material;
		
		// Apply the active material (red) to the mesh
		const activeMaterial = new BABYLON.StandardMaterial("activeMaterial", scene);  // Create a new instance
		activeMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);  // Red color
		activeMaterial.alpha = 0.999;  // Full opacity
		mesh.material = activeMaterial;  // Set it to the mesh

		// Update the current active mesh reference
		currentActiveMesh = mesh;
	}
}

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
engine.resize();
});

});