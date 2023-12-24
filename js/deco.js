import { getRandomNum, weightedRandom } from "./functions.js";

export function Deco(head, nose, mouth, eyes, fills) {
	if (head.fill == "black") {this.stroke = "white"}
	else {this.stroke = "black"}
	let filtered = fills.filter((el) => el != head.fill)
	this.fill = weightedRandom(filtered.filter((el) => el != head.stroke))
	// this.lines = MaskMouthNeck(head, nose, mouth, eyes)
	if (weightedRandom([true, false], [40, 60]) == true) {
		this.lines = MaskMouth(head, nose, mouth, eyes, this.fill, this.stroke)
	}
}

function MaskMouthNeck(head, nose, mouth, eyes) {
	var tempList = []
	var temp = new paper.Path();
    temp.style = {
        fillColor: "grey",
        strokeColor: "black",
        strokeWidth: 2
    }

	var p1 = nose.origin
	var p2 = nose.origin.add([nose.width * 2, head.height/4])
	var p3 = nose.origin.add([head.width, head.height])
	var p4 = nose.origin.add([0, head.height * 2])
	var p5 = nose.origin.add([-head.width, head.height])
	var p6 = nose.origin.add([-nose.width * 2, head.height/4])

	temp.add(p1, p2, p3, p4, p5, p6);
	temp.closed = true
	// line.fullySelected = true

	temp = temp.intersect(head.line)

	tempList.push(temp)
	return tempList
}

function MaskMouth(head, nose, mouth, eyes, fill, stroke) {
	var tempList = []
	var temp = new paper.Path();
	temp.style = {
        fillColor: fill,
        strokeColor: stroke,
        strokeWidth: 2
    }

	let line = new paper.Path.Line(nose.origin, nose.origin.add(0, head.height * 2))
	let max = line.getIntersections(head.line)[0].offset

	var p1 = nose.origin.add([0, getRandomNum(mouth.height, max * 0.9)])
	let sides = getRandomNum(mouth.width * 1.1, head.width * 0.8)
	var p2 = nose.origin.add([sides, mouth.height * 0.75])
	var p3 = nose.origin.add([0, -getRandomNum(0, nose.height * 2)])
	var p4 = nose.origin.add([-sides, mouth.height * 0.75])

	temp.add(p1, p2, p3, p4);
	temp.closed = true
	// temp.fullySelected = true
	temp.smooth({type: "continuous"})

	tempList.push(temp)
	return tempList
}