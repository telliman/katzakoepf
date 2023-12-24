import { getRandomNum, weightedRandom, flipVector, flipVectorH } from "./functions.js"

export var Mouth = function(head, nose, ref) {
	this.height = getRandomNum(0.15 * ref, 0.4 * ref)/2
    this.width = getRandomNum(0.5 * this.height, 1 * this.height)/2
	this.origin = nose.origin
	this.mirrorPoint = head.origin

	let variations = ["Grumpy", "Snout"]
	let weights = [50, 50]
	
	let variation = weightedRandom(variations, weights)

	this.lines = []
	let temp = eval(variation)(this.origin, this.width, this.height, this.mirrorPoint)
    for (let i = 0; i < temp.length; i++) {
		if (temp[i].subtract(nose.lines[0])) {
			if (temp[i].closed == true) {
				this.lines.push(temp[i].subtract(nose.lines[0]))
			}
			else {
				this.lines.push(temp[i].subtract(nose.lines[0], {trace: false}))
			}
		}
		else {
			this.lines.push(temp[i])
		}
    }
}

function Snout(origin, width, height, mirror) {
    let line = new paper.Path();
	line.style = {
        fillColor: "pink",
        strokeColor: "black",
        strokeWidth: 2
    }

	let p1 = origin
	let p2 = origin.clone().add([width, height])
	let p3 = origin

	let p2HandleLength = getRandomNum(width, width * 1.2)
	let vector = p2.clone().subtract(origin)
	let p2HandleIn = vector.clone().rotate(90)
	p2HandleIn.length = p2HandleLength
	let p2HandleOut = flipVector(p2HandleIn)

	let s2 = new paper.Segment(p2, p2HandleIn, p2HandleOut)

	line.add(p1, s2, p3);
	line.closed = true
	// line.fullySelected = true
	let line2 = line.clone()
	line2.scale(-1, 1, mirror)

	let lines = [line, line2]
    return lines
}

function Grumpy(origin, width, height, mirror) {

	let p2 = origin.add([0, height * 0.7])

    let line = new paper.Path.Line(origin, p2)
    let line2 = new paper.Path();
	line.style = line2.style = {
        fillColor: null,
        strokeColor: "black",
        strokeWidth: 2
    }

	let length = width * 0.75
	let length2 = length + getRandomNum(-0.1 * length, 0.1 * length, 1)
	let vector = new paper.Point(-1, 1).normalize(length).rotate(getRandomNum(0, -35))
	let vector2 = flipVectorH(vector).normalize(length2)
	line2.add(p2.add(vector2), p2, p2.add(vector));
	// line.fullySelected = true

	let lines = [line, line2]
    return lines
}