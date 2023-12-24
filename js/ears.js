import { getRandomNum } from "./functions.js"

export function Ears(head, ref) {
	this.width = getRandomNum(0.08 * ref, 0.2 * ref)/2
	this.height = getRandomNum(0.05 * ref, 0.25 * ref)/2 + head.height
	this.origin = head.origin.add([-head.width + 20, 0])

	this.rect = new paper.Path.Rectangle(this.origin, this.origin.add([this.width * 2, -this.height]))
	this.rect.strokeColor = null
	this.intersections = this.rect.getIntersections(head.line)

	this.line = new paper.Path();
	this.line.style = {
        fillColor: "white",
        strokeColor: "black",
        strokeWidth: 2
    }

	this.p1 = this.intersections[0].point
	this.p2 = this.origin.add([this.width, -this.height])
	this.p3 = this.intersections[1].point
	
	this.p2HandleLength = getRandomNum(ref * 0.01, this.width * 0.9)

	this.s2 = new paper.Segment(this.p2, [-this.p2HandleLength, 0], [this.p2HandleLength, 0])

	this.line.add(this.p1, this.s2, this.p3);
	this.line.closed = true
	// this.line.fullySelected = true
	this.line2 = this.line.clone()
	this.line2.scale(-1, 1, head.origin)
	this.line = this.line.subtract(head.lines[0])
	this.line2 = this.line2.subtract(head.lines[0])

    this.lines = [this.line, this.line2]
}