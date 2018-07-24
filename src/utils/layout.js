import * as layout from "./index";

export const CONF = {
    paddingLeft : 20,
    paddingRight : 10,
    paddingTop: 10,
    paddingBottom: 10,
    stringInterval: 10,
    fretInterval: 20,
    fretExtra: 10,
    dotIn: 5,
    dotOut: 5
};

export function width(frets, fretExtra) {
    console.log(`w = ${CONF.paddingLeft} + (${CONF.fretInterval} * ${frets}) + ${CONF.paddingRight} + ((${fretExtra ? 1 : 0}) * ${CONF.fretExtra})`);
    return CONF.paddingLeft + (CONF.fretInterval * frets) + CONF.paddingRight + ((fretExtra ? 1 : 0) * CONF.fretExtra);
}

export function height(strings, fretExtra) {
    console.log(`h = ${CONF.paddingTop} + (${CONF.stringInterval} * (${strings} - 1)) + ${CONF.paddingBottom}`);
    return CONF.paddingTop + (CONF.stringInterval * (strings - 1)) + CONF.paddingBottom;
}

export function stringLength(frets, fretExtra) {
    return (frets - 1) * layout.CONF.fretInterval + ((fretExtra ? 1 : 0) * CONF.fretExtra);
}
