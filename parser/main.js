"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var counter = 1;
var CBItemList = [];
function parser(str) {
    var row = str.replace(' ', '_');
    var obj = {
        name: row,
        id: row + '_' + counter++,
        title: row,
        value: 'value',
        items: [],
        done: false
    };
    CBItemList.push(obj);
    console.log(CBItemList);
}
(0, fs_1.readFile)('./list.txt', 'utf8', function (err, text) {
    //   console.log(text);
    var s = text.split('\n');
    console.log(s);
    s.forEach(function (t) {
        parser(t.trim());
    });
});
