const checkedList = JSON.parse(localStorage.getItem(STORAGE_NAME)) || [];
// console.log(checkedList);
// console.log(localStorage.getItem(STORAGE_NAME));

// const saveBtn = document.querySelector('#save__button');
const clearBtn = document.querySelector('#clear__button');
const resetBtn = document.querySelector('#reset__button');
const store_name = document.querySelector('#store_name');
store_name.innerHTML += `${STORAGE_NAME}`;

// saveBtn.addEventListener('click', () => {
//   localStorage.setItem(STORAGE_NAME, JSON.stringify(checkedList));
// });

// clearBtn.addEventListener('click', () => {
//   localStorage.setItem(STORAGE_NAME, JSON.stringify([]));
// });

(function () {
  let counter_for_id = 1;
  checkboxList.forEach((cb) => {
    const cp_id = cb.name + '_' + counter_for_id++;
    const done = checkedList.includes(cp_id) ? 'checked' : '';

    function items(items) {
      if (!items) return '';
      let builder = '';
      items.forEach((item) => {
        builder += `<li>${item}</li>`;
      });
      return builder;
    }

    document.querySelector('#all_cases').insertAdjacentHTML(
      'beforeend',
      `<div class="w3-panel w3-light-blue">
        <input class="w3-check" type="checkbox" id="${cp_id}" name="${cp_id}" value="${cb.value}" ${done}>
        <label for="${cb.name}">
        <b><u> ${cb.text} </u></b></label>
        <br> 
        <ul>${items(cb.items)}</ul>
      </div>`
    );
  });
})();

const cbElements = document.querySelectorAll('.w3-check');

cbElements.forEach((el) => {
  el.addEventListener('change', (ev) => {
    if (ev.target.checked && !checkedList.includes(ev.target.id)) {
      checkedList.push(ev.target.id);
    } else {
      const idx = checkedList.indexOf(ev.target.id);
      if (idx !== -1) checkedList.splice(idx, 1);
    }
    localStorage.setItem(STORAGE_NAME, JSON.stringify(checkedList));
    // console.log(checkedList);
  });
});

resetBtn.addEventListener('click', () => {
  cbElements.forEach((el) => {
    el.checked = false;
  });
  checkedList.length = 0;
  localStorage.setItem(STORAGE_NAME, JSON.stringify([]));
});

function openCity(tabID) {
  var i;
  var x = document.getElementsByClassName("cases");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(tabID).style.display = "block";  
}