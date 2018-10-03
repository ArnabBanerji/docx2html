var path=require('path');
var fs=require('fs');

var docx2html = require('./lib/index');
var outputFilePath = path.resolve(__dirname, 'output-contract-mock.docx');

docx2html(outputFilePath).then(function (html) {
    fs.writeFileSync(outputFilePath.replace('.docx', '.html'), html.toString());
    console.log('HTML created!');
});
