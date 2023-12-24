import { getRandomNum } from "./functions.js";
import { Head } from "./head.js";
import { Eyes } from "./eyes.js";
import { Nose } from "./nose.js";
import { Mouth } from "./mouth.js";
import { Ears } from "./ears.js";
import { Deco } from "./deco.js";

const cWidth = 400
const cHeight = 400

export const ref = 400

window.onload = function() {
	// Get a reference to the canvas object
	var canvas = document.getElementById('myCanvas');
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);

	canvas.width = cWidth
	canvas.height = cHeight
	
	var originCanvas = new paper.Point(cWidth/2, cHeight/2);
	console.log(cWidth, cHeight);

	var generalStrokeWidth = 2

	var headLayer = new paper.Layer()
	var decoLayer = new paper.Layer()
	var faceLayer = new paper.Layer()
	var tempLayer = new paper.Layer()

	tempLayer.activate()
	var head = new Head(originCanvas, ref)
	headLayer.addChildren(head.lines)
	var eyes = new Eyes(head, ref)
	faceLayer.addChildren(eyes.lines)
	var nose = new Nose(head, ref)
	faceLayer.addChildren(nose.lines)
	var mouth = new Mouth(head, nose, ref)
	faceLayer.addChildren(mouth.lines)
	var ears = new Ears(head, ref)
	headLayer.addChildren(ears.lines)
	// var deco = new Deco(head, nose, mouth, eyes)
	// decoLayer.addChildren(deco.lines)
	
	console.log(headLayer.children)
	tempLayer.removeChildren()

	// Draw the view now:
	paper.view.draw();
}






// // console.log(headLayer.children);
// var test = makeWobbly(head.line, 15, 0.6, 1)


// function saveAsSVG() {
// 	var downloadLink = document.getElementById('saveSVG')
// 	var svgString = project.exportSVG({asString:true})
// 	var url = URL.createObjectURL(new Blob([svgString], {
// 			type: 'image/svg+xml'
// 		}));
// 	downloadLink.href = url
// 	downloadLink.download = 'katzakopf.svg';
// }

// var saveButton = document.getElementById("save");
// saveButton.addEventListener("click", saveAsSVG);