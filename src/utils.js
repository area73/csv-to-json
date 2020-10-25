const fmap = fn => iterable => iterable.map(fn);
const Identity = require('crocks/Identity')

const ifDebug = outputAllow => outputAllow ? console.log : Identity

module.exports = {fmap, ifDebug}
