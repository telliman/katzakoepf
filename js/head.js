import { getRandomNum, weightedRandom, flipVector, makeWobbly } from "./functions.js"

export function Head(origin, ref, fills) {
	this.origin = origin
	this.width = getRandomNum(0.8 * ref, ref)/2
	this.height = getRandomNum(0.4 * ref, 0.75 * ref)/2
	this.fill = weightedRandom(fills)
	if (this.fill == "black") {this.stroke = "white"}
	else {this.stroke = "black"}
	this.faceVector = new paper.Point(getRandomNum(-this.width * 0.1, this.width * 0.1), getRandomNum(0, -this.height * 0.2))

	this.line = new paper.Path();
	this.line.style = {
        fillColor: this.fill,
        strokeColor: this.stroke,
        strokeWidth: 2
    }

	this.p1 = this.origin.add([0, this.height])
	this.p2 = this.origin.add([this.width, 0])
	this.p3 = this.origin.add([0, -this.height])
	this.p4 = this.origin.add([-this.width, 0])

	this.p1HandleInLength = this.p1HandleOutLength = getRandomNum(this.width * 0.25, this.width * 2/3)
	this.p3HandleInLength = this.p3HandleOutLength = getRandomNum(this.width * 0.4, this.width * 2/3)

	this.p1HandleIn = new paper.Point(-this.p1HandleInLength, 0)
	this.p1HandleOut = new paper.Point(this.p1HandleOutLength, 0)
	this.p3HandleIn = new paper.Point(this.p3HandleInLength, 0)
	this.p3HandleOut = new paper.Point(-this.p3HandleOutLength, 0)

	this.p2HandleInLength = this.p4HandleOutLength = getRandomNum(this.height * 0.4, this.height)
	this.p4HandleInLength = this.p2HandleOutLength = getRandomNum(this.height * 0.6, this.height)

	this.p2HandleOut = this.p3HandleIn.subtract(this.p1HandleOut.add([0, this.height*2]))
	this.p2HandleOut.length = this.p2HandleOutLength
	this.p2HandleIn = flipVector(this.p2HandleOut)
	this.p2HandleIn.length = this.p2HandleInLength
	this.p4HandleIn = this.p3HandleOut.subtract(this.p1HandleIn.add([0, this.height*2]))
	this.p4HandleIn.length = this.p4HandleInLength
	this.p4HandleOut = flipVector(this.p4HandleIn)
	this.p4HandleOut.length = this.p4HandleOutLength

	this.s1 = new paper.Segment(this.p1, this.p1HandleIn, this.p1HandleOut)
	this.s3 = new paper.Segment(this.p3, this.p3HandleIn, this.p3HandleOut)	
	this.s2 = new paper.Segment(this.p2, this.p2HandleIn, this.p2HandleOut)
	this.s4 = new paper.Segment(this.p4, this.p4HandleIn, this.p4HandleOut)
	this.line.add(this.s1, this.s2, this.s3, this.s4);
	this.line.closed = true
	// this.line.fullySelected = true
	if (weightedRandom([true, false], [0, 100]) == true) {
		this.line = makeWobbly(this.line, 15, 0.6, 1)
	}

	this.lines = [this.line]
}