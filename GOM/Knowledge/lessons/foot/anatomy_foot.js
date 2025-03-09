//Highlightcolors
function setHighlightColors(scene){
	const HighlightRed = new BABYLON.StandardMaterial("HighlightRed", scene);
	HighlightRed.diffuseColor = new BABYLON.Color3(1, 0, 0);
	HighlightRed.alpha = 1;
	const HighlightGreen = new BABYLON.StandardMaterial("HighlightGreen", scene);
	HighlightGreen.diffuseColor = new BABYLON.Color3(0.00000, 0.50196, 0.00000);
	HighlightGreen.alpha = 1;
	const HighlightBlue = new BABYLON.StandardMaterial("HighlightBlue", scene);
	HighlightBlue.diffuseColor = new BABYLON.Color3(0.00000, 0.00000, 0.50196);
	HighlightBlue.alpha = 1;
	const HighlightYellow = new BABYLON.StandardMaterial("HighlightYellow", scene);
	HighlightYellow.diffuseColor = new BABYLON.Color3(1.00000, 0.67843, 0.00000);
	HighlightYellow.alpha = 1;
	
	return { HighlightRed, HighlightGreen, HighlightBlue, HighlightYellow };
}

//Foot Anatomy
function anatomy(scene, applyChangesToDescendants) {
	console.log("footStyle anatomy")
	const highlightColors = setHighlightColors(scene);
	
	// Set appearance of Verse
	var verse = scene.getMeshByName("FJ3360_BP23541_FMA24497_Right calcaneus");
			if (verse) {
				verse.material = highlightColors.HighlightRed;;
				}
	// Set appearance of Verse
	var verse = scene.getMeshByName("FJ6477_BP23520_FMA24482_Right talus");
			if (verse) {
				verse.material = highlightColors.HighlightRed;;
				}

	// Set appearance of Fußwurzel
	var collectionFußwurzel = scene.getTransformNodeByName("Fußwurzel");
	if (collectionFußwurzel) {
		console.log("Set appearance of Fußwurzel")
		applyChangesToDescendants(collectionFußwurzel, function(mesh) {
			if (mesh.material) {
				mesh.material = highlightColors.HighlightGreen; // Apply color
			} else if (!mesh.material){
				collectionFußwurzel = scene.getTransformNodeByName(mesh);
			}
		});
	}

	// Set appearance of Mittelfuß
	var collectionMittelfuß = scene.getTransformNodeByName("Mittelfuß");
	if (collectionMittelfuß) {
		console.log("Set appearance of Mittelfuß")
		applyChangesToDescendants(collectionMittelfuß, function(mesh) {
			if (mesh.material) {
				mesh.material = highlightColors.HighlightBlue; // Apply color
			} else if (!mesh.material){
				collectionMittelfuß = scene.getTransformNodeByName(mesh);
			}
		});
	}

	// Set appearance of Zehenglieder
	var collectionZehenglieder = scene.getTransformNodeByName("Zehenglieder");
	if (collectionZehenglieder) {
		console.log("Set appearance of Zehenglieder")
		applyChangesToDescendants(collectionZehenglieder, function(mesh) {
			if (mesh.material) {
				mesh.material = highlightColors.HighlightYellow; // Apply color
			} else if (!mesh.material){
				collectionZehenglieder = scene.getTransformNodeByName(mesh);
			}
		});
	}
}

//Foot Joint1
function joint1(scene, applyChangesToDescendants) {
	const highlightColors = setHighlightColors(scene);
	console.log("footStyle joints1")
	
	var verse = scene.getMeshByName("FJ3360_BP23541_FMA24497_Right calcaneus");
	if (verse) {
		verse.material = highlightColors.HighlightRed;
		}

	var sprungbein = scene.getMeshByName("FJ6477_BP23520_FMA24482_Right talus");
	if (sprungbein) {
		sprungbein.material = highlightColors.HighlightGreen;
		}
	
	// Set appearance of Fußwurzel
	var collectionFußwurzel = scene.getTransformNodeByName("Fußwurzel");
	if (collectionFußwurzel) {
		console.log("Set appearance of Fußwurzel")
		applyChangesToDescendants(collectionFußwurzel, function(mesh) {
			if (mesh.material) {
				mesh.material = highlightColors.HighlightYellow; // Apply color
			} else if (!mesh.material){
				collectionFußwurzel = scene.getTransformNodeByName(mesh);
			}
		});
	}
}

//Foot Joint2
function joint2(scene, applyChangesToDescendants) {
	const highlightColors = setHighlightColors(scene);
	console.log("footStyle joints2")

	var verse = scene.getMeshByName("FJ3360_BP23541_FMA24497_Right calcaneus");
	if (verse) {
		verse.material = highlightColors.HighlightRed;
		}

	var sprungbein = scene.getMeshByName("FJ6477_BP23520_FMA24482_Right talus");
	if (sprungbein) {
		sprungbein.material = highlightColors.HighlightGreen;
		}
	
	// Set appearance of Fußwurzel
	var collectionFußwurzel = scene.getTransformNodeByName("Fußwurzel");
	if (collectionFußwurzel) {
		console.log("Set appearance of Fußwurzel")
		applyChangesToDescendants(collectionFußwurzel, function(mesh) {
			if (mesh.material) {
				mesh.material = highlightColors.HighlightGreen; // Apply color
			} else if (!mesh.material){
				collectionFußwurzel = scene.getTransformNodeByName(mesh);
			}
		});
	}

	var Fußwurzel = scene.getMeshByName("FJ3364_BP24103_FMA24528_Right cuboid bone");
	if (Fußwurzel) {
		Fußwurzel.material = highlightColors.HighlightYellow;
		}			

	// Set appearance of Mittelfuß
	var collectionMittelfuß = scene.getTransformNodeByName("Mittelfuß");
	if (collectionMittelfuß) {
		console.log("Set appearance of Mittelfuß");
		applyChangesToDescendants(collectionMittelfuß, function(mesh) {
			if (mesh.material) {
				mesh.material = highlightColors.HighlightGreen; // Apply green color
			}
		});
	}

	// Set specific meshes in Mittelfuß to yellow
	var mittelfußYellowMeshes = [
		"FJ6453_BP23705_FMA24515_Right fifth metatarsal bone", 
		"FJ3357_BP23640_FMA24513_Right fourth metatarsal bone"
	];

	mittelfußYellowMeshes.forEach(function(meshName) {
		var mesh = scene.getMeshByName(meshName);
		if (mesh) {
			mesh.material = highlightColors.HighlightYellow; // Apply yellow color to specific meshes
		}
	});

	// Set appearance of Zehenglieder
	var collectionZehenglieder = scene.getTransformNodeByName("Zehenglieder");
	if (collectionZehenglieder) {
		console.log("Set appearance of Zehenglieder");
		applyChangesToDescendants(collectionZehenglieder, function(mesh) {
			if (mesh.material) {
				mesh.material = highlightColors.HighlightGreen; // Apply green color
			}
		});
	}

	// Set specific meshes in Zehenglieder to yellow
	var zehengliederYellowMeshes = [
		"FJ3324_BP21863_FMA32640_Proximal phalanx of right little toe", 
		"FJ3305_BP21890_FMA230986_Middle phalanx of right little toe",
		"FJ3195_BP21926_FMA32658_Distal phalanx of right little toe",
		"FJ3321_BP21914_FMA32638_Proximal phalanx of right fourth toe",
		"FJ3302_BP21929_FMA32646_Middle phalanx of right fourth toe",
		"FJ3191_BP21925_FMA32656_Distal phalanx of right fourth toe"
	];

	zehengliederYellowMeshes.forEach(function(meshName) {
		var mesh = scene.getMeshByName(meshName);
		if (mesh) {
			mesh.material = highlightColors.HighlightYellow; // Apply yellow color to specific meshes
		}
	});
}	
