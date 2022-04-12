import { readFile } from 'fs';
let counter = 1;

interface List {
  name: string;
  id: string;
  value: string;
  title: string;
  items: string[];
  done: boolean;
}

function parser(r: string) {
  const row: string = r.replace(' ', '_');
  const obj: List = {
    name: row,
    id: row + '_' + counter++,
    title: row,
    value: 'value',
    items: [],
    done: false,
  };
  console.log(obj);
}

readFile('./list.txt', 'utf8', (err, text) => {
  //   console.log(text);
  const s = text.split('\n');
  console.log(s);
  s.forEach((t) => {
    parser(t.trim());
  });
});
