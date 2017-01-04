'use strict';
var fs = require('fs');
var beautifier = require("html");
let cheerio = require('cheerio')
var open = require("open");

var filename = 'result.html';

var writeHtmlToFile = (html) => {
  var prettyData = beautifier.prettyPrint(html, {indent_size: 2});
  fs.writeFile(filename, prettyData, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Result written to " + filename);
    open(filename);
  });
}

var html = `
<html>
<head>
<meta charset="UTF-8">
  <title>JS Regular Expressions Viewer</title>
  <style>
    pre {
      line-height: 2;
    }
    span {
      background-color: #eee;
      padding: 1px;
      outline: 1px solid #999;
    }
  </style>
</head>
<body>
  <pre></pre>
</body>
</html>
`

let $ = cheerio.load(html, {
  normalizeWhitespace: true
  // xmlMode: true
});

const viewer = (str, regex) => {
  var target = $('pre');
  var replacement = str.replace(regex, str => `<span>${str}</span>`);
  $("pre").html(replacement);
  // console.debug($.html());
  writeHtmlToFile($.html());
}

module.exports = viewer;