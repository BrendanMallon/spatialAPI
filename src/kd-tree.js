class kdTree {
  synthesizeTree(pointList, depth) {
    if (pointList.length === 0) {
      return null;
    }
    let k = pointList[0].length;

    let axis = depth % k;

    pointList.sort((a, b) => a[axis] - b[axis]);
    let median = Math.floor(pointList.length / 2);

    return {
      location: pointList[median],
      split: axis,
      left_child: this.synthesizeTree(pointList.slice(0, median), depth + 1),
      right_child: this.synthesizeTree(
        pointList.slice(median + 1, pointList.length),
        depth + 1
      ),
    };
  }
  constructor(pointList) {
    this.root = this.synthesizeTree(pointList, 0);
  }
  rangeQueryUtil(node, result, x, y, w, h) {
    if (!node) {
      return;
    }
    let point = node.location;
    let axis = node.split;
    let coords = [x, y];
    let shift = [w, h];
    // console.log(point);
    // console.log(coords);
    // console.log(axis);
    // console.log(point[axis] < coords[axis]);
    if (
      point[0] >= x &&
      point[0] <= x + w &&
      point[1] >= y &&
      point[1] <= y + h
    ) {
      result.push(point);
    }
    if (point[axis] > coords[axis]) {
      this.rangeQueryUtil(node.left_child, result, x, y, w, h);
    }
    if (point[axis] < coords[axis] + shift[axis]) {
      this.rangeQueryUtil(node.right_child, result, x, y, w, h);
    }
  }
  rangeQuery(x, y, w, h) {
    let result = [];
    this.rangeQueryUtil(this.root, result, x, y, w, h);
    return result;
  }
}
