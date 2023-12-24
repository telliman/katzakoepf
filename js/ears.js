import { getRandomNum, weightedRandom } from "./functions.js"

export function Ears(head, ref, fills) {
	this.width = getRandomNum(0.15 * ref, 0.25 * ref)/2
	let maxHeight = 0.15 * ref
	if (maxHeight > (ref - (head.height*2))/2) {maxHeight = (ref - (head.height*2))/2}
	this.height = getRandomNum(0.03 * ref, maxHeight) + head.height
	let maxEarDistance = head.width - this.width
	let minEarDistance = maxEarDistance * 0.75
	let earDistance = getRandomNum(-maxEarDistance, -minEarDistance)
	this.origin = head.origin.add([earDistance, 0])
	this.fill = head.fill
	this.stroke = head.stroke

	this.line = new paper.Path();
	this.line.style = {
        fillColor: this.fill,
        strokeColor: this.stroke,
        strokeWidth: 2
    }

	this.p1 = this.origin.subtract(this.width, 0)
	this.p2 = this.origin.add([0, -this.height])
	this.p3 = this.origin.add(this.width, 0)
	
	this.p2HandleLength = getRandomNum(ref * 0.02, this.width * 0.7)
	this.p1HandleLength = this.p3HandleLength =  getRandomNum(-this.height * 0.5, -this.height * 0.9)

	this.s1 = new paper.Segment(this.p1, [0, 0], [0, this.p1HandleLength])
	this.s2 = new paper.Segment(this.p2, [-this.p2HandleLength, 0], [this.p2HandleLength, 0])
	this.s3 = new paper.Segment(this.p3, [0, -this.p3HandleLength], [0, 0])

	this.line.add(this.p1, this.s2, this.p3);
	this.line.closed = true
	// this.line.fullySelected = true
	let angleFactor = 0.03
	let maxAngle = 100/(maxEarDistance - minEarDistance) * earDistance * angleFactor
	this.line.rotate(getRandomNum(-maxAngle, maxAngle), this.origin)
	this.line2 = this.line.clone()
	if (weightedRandom([true, false], [80, 20]) == true) {this.line2.scale(-1, 1, head.origin)}
	else {this.line2.translate([-earDistance * 2, 0])}
	this.line = this.line.subtract(head.lines[0])
	this.line2 = this.line2.subtract(head.lines[0])

	console.log(this.line)

    this.lines = [this.line, this.line2]
}