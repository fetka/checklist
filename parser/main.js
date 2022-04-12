"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var counter = 1;
function parser(r) {
    var row = r.replace(' ', '_');
    var obj = {
        name: row,
        id: row + '_' + counter++,
        title: row,
        value: 'value',
        items: [],
        done: false
    };
    console.log(obj);
}
(0, fs_1.readFile)('./list.txt', 'utf8', function (err, text) {
    //   console.log(text);
    var s = text.split('\n');
    console.log(s);
    s.forEach(function (t) {
        parser(t.trim());
    });
});
