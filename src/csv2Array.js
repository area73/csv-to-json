const tap = require("crocks/helpers/tap");
const pipe = require("crocks/helpers/pipe");
const {fmap,ifDebug} = require("./utils")

const removeDoubleQuotes = item => item.replace(/"/g, "");
const str2arr = match => item => item.match(match);
const str2arrByDoubleQuotes = item => str2arr(/("[^"]*")|[^,]+/g)(item);
const str2arrByNewLine = item => str2arr(/[^\r\n]+/g)(item);
const str2arrByComas = item => str2arr(/[^,]+/g)(item);
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
