export function getRandomNum(min, max, decimal = 0) {
	min = Math.ceil(min);
	max = Math.floor(max) + 1;
	return Math.floor((Math.random() * (max - min) + min) * 10**decimal)/(10**decimal); // The maximum is inclusive and the minimum is inclusive
  }

export function weightedRandom(items, weights) {
    var i;

    for (i = 1; i < weights.length; i++)
        weights[i] += weights[i - 1];
    
    var random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
    
    return items[i];
}

export function distance(point1, point2) {
	var temp = Math.pow((point1.x - point2.x), 2) + Math.pow((point1.y - point2.y), 2)
	return Math.sqrt(temp)
}

export function flipVector(vector) {
    var flipped = new paper.Point(-vector.x, -vector.y)
	return flipped
}

export function flipVectorH(vector) {
	var flipped = new paper.Point(-vector.x, vector.y)
	return flipped
}

export function flipVectorV(vector) {
	var flipped = new paper.Point(vector.x, -vector.y)
	return flipped
}

export function makeWobbly(path, numberOfWaves, wobbliness, pathLocation, randomizeSectionLength, intervals) {
	randomizeSectionLength = typeof randomizeSectionLength !== "undefined" ? randomizeSectionLength : 0.3;
	wobbliness = typeof wobbliness !== "undefined" ? wobbliness : 0.5;
	pathLocation = typeof pathLocation !== "undefined" ? pathLocation : 0.5;
	intervals = typeof intervals !== "undefined" ? intervals : [[0, 1]];

	var numberOfSections = numberOfWaves * 2
	var sectionLength = path.length/numberOfSections
	var strength = sectionLength * (wobbliness/2)
	var Switch = 1

	var movement = (getRandomNum(0, 19)/10)
	var newPath = new paper.Path()
	newPath.strokeColor = path.strokeColor
	newPath.strokeWidth = path.strokeWidth;
	newPath.fillColor = path.fillColor
	for (var i = 0; i < numberOfSections; i++) {
		var offset = sectionLength * i + (sectionLength * movement)
		if (randomizeSectionLength) {
			offset = offset + getRandomNum(0, randomizeSectionLength * sectionLength * 10)/10
		}

		if (offset > path.length) {
			offset = offset - path.length
		}
		else if (offset < 0) {
			offset = path.length - offset
		}

		var point = path.getPointAt(offset)
		var normal = path.getNormalAt(offset)
		point = point.subtract(normal.multiply((strength * pathLocation)))
        console.log(pathLocation)
        console.log(normal, 1)
        console.log(normal.multiply(strength * pathLocation), 2)
		newPath.add(point)

		Switch *= -1
		pathLocation += Switch
	}

	newPath.closed = true
	newPath.smooth({type: "continuous"})
	
	var waveSizes = [0.3, 0.5]
	var sizeIndex = 1
	Switch = 1
	for (var i = 0; i < newPath.segments.length; i++) {
		var priorIndex = i - 1
		var nextIndex = i + 1
		if (i == 0) {priorIndex = newPath.segments.length - 1}
		else if (i == newPath.segments.length - 1) {nextIndex = 0}
		var current = newPath.segments[i]
		var prior = newPath.segments[priorIndex]
		var next = newPath.segments[nextIndex]

		var handleInLength = distance(current.point, prior.point) * waveSizes[sizeIndex]
		var handleOutLength = distance(current.point, next.point) * waveSizes[sizeIndex]

		current.handleIn.length = handleInLength
		current.handleOut.length = handleOutLength

		Switch *= -1
		sizeIndex += Switch
	}

	// newPath.fullySelected = true

	return newPath
}