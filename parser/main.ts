import { readFile } from 'fs';
let counter = 1;
const CBItemList = [];
interface CBItem {
  name: string;
  id: string;
  value: string;
  title: string;
  items: string[];
  done: boolean;
}

function parser(str: string) {
  const row: string = str.replace(' ', '_');
  const obj: CBItem = {
    name: row,
    id: row + '_' + counter++,
    title: row,
    value: 'value',
    items: [],
    done: false,
  };
  CBItemList.push(obj);
  console.log(CBItemList);
}

readFile('./list.txt', 'utf8', (err, text) => {
  //   console.log(text);
  const s = text.split('\n');
  console.log(s);
  s.forEach((t) => {
    parser(t.trim());
  });
});
