const tap = require("crocks/helpers/tap");
const pipe = require("crocks/helpers/pipe");
const {fmap,ifDebug} = require("./utils")

const removeDoubleQuotes = item => item.replace(/"/g, "");
const str2arr = match => item => item.match(match);
const str2arrByDoubleQuotes = str2arr(/("[^"]*")|[^,]+/g);
const str2arrByNewLine = str2arr(/[^\r\n]+/g);
const str2arrByComas = str2arr(/[^,]+/g);
const destructureSingleArr = item => (item.length > 1 ? item : item[0]);



const csv2array = shouldDebug => csv =>
  pipe(
    str2arrByNewLine,
    fmap(str2arrByDoubleQuotes),
    fmap(fmap(removeDoubleQuotes)),
    fmap(fmap(str2arrByComas)),
    fmap(fmap(destructureSingleArr)),
    tap(ifDebug(shouldDebug))
  )(csv);


module.exports = { csv2array };
