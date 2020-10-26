const { program } = require('commander');
program.version('0.0.2');

program
.option('-d, --debug', 'output extra debugging')
.option('-s, --small', 'small pizza size')
.option('-f, --csv-file <type>', 'file path of csv file to convert')
.option('-o, --output-file <type>', 'file path of output file to convert, if not stated it will save the file in the same place that source file with a *.json extension')
.option('-n, --header-name <type>', 'by default it will return an array of objects, if -n is set it will return an object that has the array with the name set by -n parameter ')



program.parse(process.argv);
if (program.debug) console.log(program.opts());

// -----[1]-------
const fs = require("fs");
const fmap = require("./src/utils")
const configFile = "utf-8";
// -----[2]------
const { Async } = require("crocks");
// ----[3]-------
const pipe = require("crocks/helpers/pipe");
const {csv2array} = require('./src/csv2Array');
const {array2Json} = require('./src/array2Json')

const head = require("crocks/pointfree/head")
const tail = require("crocks/pointfree/tail")

const readFile = Async.fromNode(fs.readFile);
const csvAsync = readFile(program.csvFile, configFile);

const error = err => console.log("error parsing file:\n", err);

const processData = async function(data) {

  const arr = await  pipe(
    csv2array(program.debug),
  )(data);

  // TODO try to improve these (work with maybe monads and not option() them
  // arrHead :: m a -> Maybe a
  const arrHead = head(arr).option([])
  // arrTail :: m a -> Maybe (m a)
  const arrTail = tail(arr).option([])
  const output = array2Json(arrHead)(arrTail)
  const jsonFile = program.headerName ? {[program.headerName]: output} : output
  // console.log(jsonFile);
  // TODO:  write to disk  make it functional
  const fileName = program.outputFile || program.csvFile.replace(/.csv$/g, ".json");
  fs.writeFile(fileName, JSON.stringify(jsonFile), (err) => { if (err) throw err; });

};


csvAsync.fork(error, processData);
