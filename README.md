# csv-to-json
csv to json converter



```
program
.option('-d, --debug', 'output extra debugging')
.option('-s, --small', 'small pizza size')
.option('-f, --csv-file <type>', 'file path of csv file to convert')
.option('-o, --output-file <type>', 'file path of output file to convert, if not stated it will save the file in the same place that source file with a *.json extension')
.option('-n, --header-name <type>', 'by default it will return an array of objects, if -n is set it will return an object that has the array with the name set by -n parameter ')
```

Usage:
```bash
node csv2json  -f data/star-wars/test.csv -n testData
```
