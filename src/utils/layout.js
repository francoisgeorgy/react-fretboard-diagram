import * as layout from "./index";
import Assert from "assert-js";

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
    Assert.greaterThan(0, frets, "Number of frets must be an integer greater than 0");
    console.log(`w = ${CONF.paddingLeft} + (${CONF.fretInterval} * ${frets}) + ${CONF.paddingRight} + ((${fretExtra ? 1 : 0}) * ${CONF.fretExtra})`);
    return CONF.paddingLeft + (CONF.fretInterval * frets) + CONF.paddingRight + ((fretExtra ? 1 : 0) * CONF.fretExtra);
}

export function height(strings, fretExtra) {
    Assert.greaterThan(0, strings, "Number of string must be an integer greater than 0");
    console.log(`h = ${CONF.paddingTop} + (${CONF.stringInterval} * (${strings} - 1)) + ${CONF.paddingBottom}`);
    return CONF.paddingTop + (CONF.stringInterval * (strings - 1)) + CONF.paddingBottom;
}

export function stringLength(frets, fretExtra) {
    Assert.greaterThan(0, frets, "NUmber of frets must be an integer greater than 0");
    return frets * layout.CONF.fretInterval + ((fretExtra ? 1 : 0) * CONF.fretExtra);
}

export function fretLength(strings) {
    Assert.greaterThan(0, strings, "Number of string must be an integer greater than 0");
    return (strings - 1) * layout.CONF.stringInterval;
}
