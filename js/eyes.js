import { getRandomNum} from "./functions.js"

export function Eyes(head, ref) {
	this.width = getRandomNum(0.15 * ref, 0.22 * ref)/2
	this.height = getRandomNum(0.05 * ref, 0.5 * this.width*2)/2
    let eyeDistance = getRandomNum(this.width * 2 + 0.2 * ref, 0.35 * ref)
	this.origin = head.origin.add([-eyeDistance/2, -20]).add(head.faceVector)

    let eyeDistance2 = eyeDistance - (head.faceVector.x * 0.2)

    this.lines = []

    let eyeballs = Eyeballs(this.origin, this.width, this.height, eyeDistance2)
    for (let i = 0; i < eyeballs.length; i++) {
        this.lines.push(eyeballs[i])
    }

    this.pupilOrigin = this.origin
    this.pupilWidth = getRandomNum(0.02 * ref, 0.04 * ref, 1)/2
    this.pupilHeight = getRandomNum(0.02 * ref, 0.08 * ref, 1)/2
    if (this.pupilHeight < this.pupilWidth) {
        this.pupilHeight = this.pupilWidth
    }
    this.pupilOrigin = this.origin.add(getRandomNum(-this.width/3, this.width/3), getRandomNum(-this.height/2, 0))

    let pupils = Pupils(this.pupilOrigin, this.pupilWidth, this.pupilHeight, eyeballs, eyeDistance2)
    for (let i = 0; i < pupils.length; i++) {
        this.lines.push(pupils[i])
    }
}

function Eyeballs(origin, width, height, distance) {

	let line = new paper.Path();
	line.style = {
        fillColor: "white",
        strokeColor: "black",
        strokeWidth: 2
    }

	let p1 = origin.add([0, height])
	let p2 = origin.add([width, 0])
	let p3 = origin.add([0, -height])
	let p4 = origin.add([-width, 0])

    let p1HandleIn, p1HandleOut, p3HandleOut, p3HandleIn;
	p1HandleIn = p1HandleOut = p3HandleOut = p3HandleIn = getRandomNum(0.4 * width, width * 2/3)
    let p4HandleOut, p2HandleIn, p2HandleOut, p4HandleIn;
	p4HandleOut = p2HandleIn = p2HandleOut = p4HandleIn = getRandomNum(0.15 * height, height * 0.8)
	
	let s1 = new paper.Segment(p1, [-p1HandleIn,0], [p1HandleOut, 0])
	let s2 = new paper.Segment(p2, [0, p2HandleIn], [0, -p2HandleOut])
	let s3 = new paper.Segment(p3, [p3HandleIn,0], [-p3HandleOut, 0])
	let s4 = new paper.Segment(p4, [0, -p4HandleIn], [0, p4HandleOut])
	line.add(s1, s2, s3, s4);
	line.closed = true
	// line.fullySelected = true
	line.rotate(5, origin)
	let line2 = line.clone().scale(-1, 1, origin)
	line2.translate([distance, 0])

    let lines = [line, line2]
    return lines
}

function Pupils(origin, width, height, eyeballs, distance) {

    let line = new paper.Path()
    line.style = {
        fillColor: "black",
        strokeColor: "black",
        strokeWidth: 2
    }

    let p1 = origin.add([0, height])
	let p2 = origin.add([width, 0])
	let p3 = origin.add([0, -height])
	let p4 = origin.add([-width, 0])

	line.add(p1, p2, p3, p4);
	line.closed = true

	// line.fullySelected = true
    line.smooth({type: "continuous"})
	let line2 = line.clone().translate([distance, 0])
    line = line.intersect(eyeballs[0])
    line2 = line2.intersect(eyeballs[1])
    let lines = [line, line2]
    return lines
}