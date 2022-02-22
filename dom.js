const doneList = JSON.parse(localStorage.getItem(DONE_STORAGE_NAME)) || [];
const selectedList =
  JSON.parse(localStorage.getItem(SELECTED_STORAGE_NAME)) || [];
const resetBtn = document.querySelector('#reset__button');
const store_name = document.querySelector('#store_name');
const all_counter = document.querySelector('#all_counter');
const done_counter = document.querySelector('#done_counter');
const pending_counter = document.querySelector('#pending_counter');
const badgeElements = document.querySelectorAll('.w3-badge');

all_counter.innerHTML = checkboxList.length;
store_name.innerHTML += `${DONE_STORAGE_NAME}`;

// observes changes of badges' values and sets visibility in navbar
const observer = new MutationObserver(function (mutationsList) {
  mutationsList.forEach((m) => {
    if (parseInt(m.target.innerHTML) > 0) {
      m.target.style.visibility = 'visible';
    } else {
      m.target.style.visibility = 'hidden';
    }
  });
});
function setVisibilityOfBadges() {
  badgeElements.forEach((el) => {
    if (parseInt(el.innerHTML) > 0) {
      el.style.visibility = 'visible';
    } else {
      el.style.visibility = 'hidden';
    }

    observer.observe(el, { childList: true });
  });
}

// builds up the 'All' tab inner html structure
(function () {
  checkboxList.forEach((cb) => {
    const done = doneList.includes(cb.id) ? 'checked' : '';

    document.querySelector('#all_cases').insertAdjacentHTML(
      'beforeend',
      `<div class="w3-panel w3-light-indigo">
        <input class="w3-check" type="checkbox" id="${cb.id}" name="${cb.id}" 
        value="${cb.value}" ${done}>
        <label for="${cb.name}" >
        <b><u class="title"> ${cb.title} </u></b></label>
        <br> 
        <ul>${items(cb.items)}</ul>
      </div>`
    );
  });

  done_counter.innerHTML = doneList.length;
  pending_counter.innerHTML = checkboxList.length - doneList.length;
  setVisibilityOfBadges();
})();

// handles title selection
const titles = document.querySelectorAll('.title');

titles.forEach((title) => {
  if (
    selectedList.includes(
      title.parentElement.parentElement.parentElement.firstElementChild.id
    )
  ) {
    title.innerHTML = '<mark>' + title.innerHTML + '</mark>';
  }
  console.log(
    title.parentElement.parentElement.parentElement.firstElementChild.id
  );
  title.addEventListener('click', (ev) => {
    ev.stopPropagation();
    if (ev.currentTarget.innerHTML.includes('<mark>')) {
      console.log(ev.currentTarget);
      ev.currentTarget.innerHTML = ev.currentTarget.innerHTML.replace(
        '<mark>',
        ''
      );
      removeItemFromList(
        selectedList,
        ev.currentTarget.parentElement.parentElement.parentElement
          .firstElementChild.id
      );
      localStorage.setItem(SELECTED_STORAGE_NAME, JSON.stringify(selectedList));
    } else {
      ev.target.innerHTML = '<mark>' + ev.target.innerHTML;
      selectedList.push(
        ev.target.parentElement.parentElement.parentElement.firstElementChild.id
      );
      localStorage.setItem(SELECTED_STORAGE_NAME, JSON.stringify(selectedList));
      // console.log(
      //   ev.target.parentElement.parentElement.parentElement.firstElementChild.id
      // );
    }
  });
});

function buildPendingTabContent() {
  const x = document.querySelector('#pending_cases');
  x.innerHTML = '';

  checkboxList.forEach((cb) => {
    if (!doneList.includes(cb.id)) {
      x.insertAdjacentHTML(
        'beforeend',
        `<div class="w3-panel w3-light-indigo">
        <p><b><u> ${cb.title} </u></b></p>
        <ul>${items(cb.items)}</ul>
        </div>`
      );
    }
  });
}

function buildDoneTabContent() {
  const x = document.querySelector('#done_cases');
  x.innerHTML = '';

  checkboxList.forEach((cb) => {
    if (doneList.includes(cb.id)) {
      x.insertAdjacentHTML(
        'beforeend',
        `<div class="w3-panel w3-light-indigo">
        <p><b><u> ${cb.title} </u></b></p>
        <ul>${items(cb.items)}</ul>
        </div>`
      );
    }
  });
}

// handles changes triggered by checkbox
const cbElements = document.querySelectorAll('.w3-check');
cbElements.forEach((el) => {
  el.addEventListener('change', (ev) => {
    if (ev.target.checked && !doneList.includes(ev.target.id)) {
      doneList.push(ev.target.id);
    } else {
      // const idx = doneList.indexOf(ev.target.id);
      // if (idx !== -1) {
      //   doneList.splice(idx, 1);
      // }
      removeItemFromList(doneList, ev.target.id);
    }
    done_counter.innerHTML = doneList.length;
    pending_counter.innerHTML = checkboxList.length - doneList.length;

    localStorage.setItem(DONE_STORAGE_NAME, JSON.stringify(doneList));
    // console.log(checkedList);
  });
});

// resets state
resetBtn.addEventListener('click', () => {
  cbElements.forEach((el) => {
    el.checked = false;
  });
  doneList.length = 0;
  pending_counter.innerHTML = checkboxList.length;
  done_counter.innerHTML = 0;
  setVisibilityOfBadges();
  titles.forEach((title) => {
    title.innerHTML = title.innerHTML.replace('<mark>', '');
  });
  localStorage.setItem(DONE_STORAGE_NAME, JSON.stringify([]));
  localStorage.setItem(SELECTED_STORAGE_NAME, JSON.stringify([]));
});

// operates navigation
function openTab(event, tabID) {
  var i, tabLinks;
  var x = document.getElementsByClassName('cases');
  buildDoneTabContent();
  buildPendingTabContent();
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

// helpers
function items(items) {
  if (!items) return '';
  let builder = '';
  items.forEach((item) => {
    builder += `<li>${item}</li>`;
  });
  return builder;
}
function removeItemFromList(list, item) {
  const idx = list.indexOf(item);
  if (idx !== -1) {
    list.splice(idx, 1);
  }
}
