export function Deco(head, nose, mouth, eyes) {
	this.lines = MaskMouthNeck(head, nose, mouth, eyes)
	this.lines = MaskMouth(head, nose, mouth, eyes)
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

function MaskMouth(head, nose, mouth, eyes) {
	var tempList = []
	var temp = new paper.Path();
	temp.style = {
        fillColor: "grey",
        strokeColor: "black",
        strokeWidth: 2
    }

	var p1 = nose.origin.add([0, -nose.height * 2])
	var p2 = nose.origin.add([nose.width * 4, head.height/4])
	var p3 = nose.origin.add([0, head.height/2])
	var p4 = nose.origin.add([-nose.width * 4, head.height/4])

	temp.add(p1, p2, p3, p4);
	temp.closed = true
	// line.fullySelected = true

	temp = temp.intersect(head.line)

	tempList.push(temp)
	return tempList
}