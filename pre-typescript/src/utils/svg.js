
export function horizontalLine(x, y, length, width) {

    //add stroke-width/2 to Y coordinate to correct SVG coordinates. See https://codepen.io/fgeorgy/pen/NBjYzP

    // return `M ${x},${y + currentLayout.stringWidth/2} h ${length}`;
    return `M ${x},${y + width/2} h ${length}`;
}

export function verticalLine(x, y, length, width) {

    //add stroke-width/2 to X coordinate to correct SVG coordinates. See https://codepen.io/fgeorgy/pen/NBjYzP

    // return `M ${x + currentLayout.fretWidth/2},${y} v ${length}`;
    return `M ${x + width/2},${y} v ${length}`;
}
