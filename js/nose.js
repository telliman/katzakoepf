import { getRandomNum, weightedRandom, flipVector } from "./functions.js"

export function Nose(head, ref, fills) {
	this.origin = head.origin.add([0, getRandomNum(-ref * 0.05, ref * 0.03)-20]).add(head.faceVector)
	this.width = getRandomNum(0.04 * ref, 0.07 * ref)/2
	this.height = getRandomNum(0.03 * ref, 0.05 * ref)/2
	if (head.fill == "black") {this.stroke = "white"}
	else {this.stroke = "black"}
	this.fill = weightedRandom(fills.filter((el) => el != "white"))

	let variations = ["Almond", "Heart"]
	let weights = [0, 100]
	
	let variation = weightedRandom(variations, weights)

	let temp = eval(variation)(this.origin, this.width, this.height, this.mirrorPoint, this.fill, this.stroke)

    this.lines = [temp]
}

function Almond(origin, width, height, mirror, fill, stroke) {
	let line = new paper.Path();
	line.style = {
        fillColor: fill,
        strokeColor: stroke,
        strokeWidth: 2
    }

	let p1 = origin.add([0, height])
	let p2 = origin.add([width, 0])
	let p3 = origin.add([0, -height])
	let p4 = origin.add([-width, 0])

	let p1HandleInLength, p1HandleOutLength
	p1HandleInLength = p1HandleOutLength = getRandomNum(width * 0.1, width * 2/3)
	let p3HandleInLength, p3HandleOutLength
	p3HandleInLength = p3HandleOutLength = getRandomNum(width * 0.7, width)

	let p1HandleIn = new paper.Point(-p1HandleInLength, 0)
	let p1HandleOut = new paper.Point(p1HandleOutLength, 0)
	let p3HandleIn = new paper.Point(p3HandleInLength, 0)
	let p3HandleOut = new paper.Point(-p3HandleOutLength, 0)

	let p2HandleInLength, p4HandleOutLength
	p2HandleInLength = p4HandleOutLength = getRandomNum(height * 0.2, height)
	let p4HandleInLength, p2HandleOutLength
	p4HandleInLength = p2HandleOutLength = getRandomNum(height * 0.4, height)

	let p2HandleOut = p3HandleIn.subtract(p1HandleOut.add([0, height*2]))
	p2HandleOut.length = p2HandleOutLength
	let p2HandleIn = flipVector(p2HandleOut)
	p2HandleIn.length = p2HandleInLength
	let p4HandleIn = p3HandleOut.subtract(p1HandleIn.add([0, height*2]))
	p4HandleIn.length = p4HandleInLength
	let p4HandleOut = flipVector(p4HandleIn)
	p4HandleOut.length = p4HandleOutLength

	let s1 = new paper.Segment(p1, p1HandleIn, p1HandleOut)
	let s3 = new paper.Segment(p3, p3HandleIn, p3HandleOut)	
	let s2 = new paper.Segment(p2, p2HandleIn, p2HandleOut)
	let s4 = new paper.Segment(p4, p4HandleIn, p4HandleOut)
	// line.fullySelected = true
	line.add(s1, s2, s3, s4);
	line.closed = true
	
	return line
}

function Heart(origin, width, height, mirror, fill, stroke) {
	let line = new paper.Path();
	line.style = {
        fillColor: fill,
        strokeColor: stroke,
        strokeWidth: 2
    }

	let p1 = origin.add([0, height])
	let p2 = origin.add([width, 0])
	let p3 = origin.add([0, -height])
	let p4 = origin.add([-width, 0])

	let p1HandleInLength, p1HandleOutLength
	p1HandleInLength = p1HandleOutLength = getRandomNum(width * 0.1, width * 2/3)
	let p3HandleInLength, p3HandleOutLength
	p3HandleInLength = p3HandleOutLength = getRandomNum(width * 0.7, width)

	let p1HandleIn = new paper.Point(-p1HandleInLength, 0)
	let p1HandleOut = new paper.Point(p1HandleOutLength, 0)
	let p3HandleIn = new paper.Point(p3HandleInLength, 0)
	let p3HandleOut = new paper.Point(-p3HandleOutLength, 0)

	let p2HandleInLength, p4HandleOutLength
	p2HandleInLength = p4HandleOutLength = getRandomNum(height * 0.2, height)
	let p4HandleInLength, p2HandleOutLength
	p4HandleInLength = p2HandleOutLength = getRandomNum(height * 0.4, height)

	let p2HandleOut = p3HandleIn.subtract(p1HandleOut.add([0, height*2]))
	p2HandleOut.length = p2HandleOutLength
	let p2HandleIn = flipVector(p2HandleOut)
	p2HandleIn.length = p2HandleInLength
	let p4HandleIn = p3HandleOut.subtract(p1HandleIn.add([0, height*2]))
	p4HandleIn.length = p4HandleInLength
	let p4HandleOut = flipVector(p4HandleIn)
	p4HandleOut.length = p4HandleOutLength

	let s1 = new paper.Segment(p1, p1HandleIn, p1HandleOut)
	let s3 = new paper.Segment(p3, p3HandleIn, p3HandleOut)	
	let s2 = new paper.Segment(p2, p2HandleIn, p2HandleOut)
	let s4 = new paper.Segment(p4, p4HandleIn, p4HandleOut)
	// line.fullySelected = true
	line.add(s1, s2, s3, s4);
	line.closed = true
	
	return line
}