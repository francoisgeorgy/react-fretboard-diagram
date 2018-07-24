
const STROKE_WIDTH = 1;

export function horizontalLine(x, y, length) {

    //add stroke-width/2 to Y coordinate to correct SVG coordinates. See https://codepen.io/fgeorgy/pen/NBjYzP

    return `M ${x},${y+STROKE_WIDTH/2} h ${length}`;
}

export function verticalLine(x, y, length) {
    return 'M';
}
