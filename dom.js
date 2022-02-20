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
    // const cp_id = cb.name + '_' + counter_for_id++;
    const done = checkedList.includes(cb.id) ? 'checked' : '';

    document.querySelector('#all_cases').insertAdjacentHTML(
      'beforeend',
      `<div class="w3-panel w3-light-indigo">
        <input class="w3-check" type="checkbox" id="${cb.id}" name="${cb.id}" 
        value="${cb.value}" ${done}>
        <label for="${cb.name}">
        <b><u> ${cb.text} </u></b></label>
        <br> 
        <ul>${items(cb.items)}</ul>
      </div>`
    );
    //  done ? refreshDone(cb) : refreshPending(cb);
  });

  
})();

function refreshPending() {
  const x = document.querySelector('#pending_cases');
  x.innerHTML = '';
  checkboxList.forEach((cb) => {
    if (!checkedList.includes(cb.id)) {
      x.insertAdjacentHTML(
        'beforeend',
        `<div class="w3-panel w3-light-indigo">
        <p><b><u> ${cb.text} </u></b></p>
        <ul>${items(cb.items)}</ul>
        </div>`
      );
    }
  });
}

function refreshDone() {
  const x = document.querySelector('#done_cases');
  x.innerHTML = '';
  checkboxList.forEach((cb) => {
    if (checkedList.includes(cb.id)) {
      x.insertAdjacentHTML(
        'beforeend',
        `<div class="w3-panel w3-light-indigo">
        <p><b><u> ${cb.text} </u></b></p>
        <ul>${items(cb.items)}</ul>
        </div>`
      );
    }
  });
}

function items(items) {
  if (!items) return '';
  let builder = '';
  items.forEach((item) => {
    builder += `<li>${item}</li>`;
  });
  return builder;
}
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

function openTab(event, tabID) {
  var i, tabLinks;
  var x = document.getElementsByClassName('cases');
  refreshDone();
  refreshPending();
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  tabLinks = document.getElementsByClassName('tablink');
  for (i = 0; i < x.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' w3-indigo', '');
  }
  document.getElementById(tabID).style.display = 'block';
  event.currentTarget.className += ' w3-indigo';
}
