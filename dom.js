const checkedList = JSON.parse(localStorage.getItem(STORAGE_NAME)) || [];
const resetBtn = document.querySelector('#reset__button');
const store_name = document.querySelector('#store_name');
const all_counter = document.querySelector('#all_counter');
const done_counter = document.querySelector('#done_counter');
const pending_counter = document.querySelector('#pending_counter');
const badgeElements = document.querySelectorAll('.w3-badge');

all_counter.innerHTML = checkboxList.length;
store_name.innerHTML += `${STORAGE_NAME}`;

// builds up the 'All' tab inner html structure
(function () {
  // let checkedCounter = 0;
  checkboxList.forEach((cb) => {
    const done = checkedList.includes(cb.id) ? 'checked' : '';
    // done ? ++checkedCounter : '';
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
  });
  done_counter.innerHTML = checkedList.length;
  pending_counter.innerHTML = checkboxList.length - checkedList.length;
  setVisibilityOfBadges();
})();

function buildPendingTabContent() {
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

function buildDoneTabContent() {
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
// helper
function items(items) {
  if (!items) return '';
  let builder = '';
  items.forEach((item) => {
    builder += `<li>${item}</li>`;
  });
  return builder;
}

// handles changes triggered by checkbox
const cbElements = document.querySelectorAll('.w3-check');
cbElements.forEach((el) => {
  el.addEventListener('change', (ev) => {
    if (ev.target.checked && !checkedList.includes(ev.target.id)) {
      checkedList.push(ev.target.id);
    } else {
      const idx = checkedList.indexOf(ev.target.id);
      if (idx !== -1) {
        checkedList.splice(idx, 1);
      }
    }
    done_counter.innerHTML = checkedList.length;
    pending_counter.innerHTML = checkboxList.length - checkedList.length;

    localStorage.setItem(STORAGE_NAME, JSON.stringify(checkedList));
    // console.log(checkedList);
  });
});

// observes changes of badges' values and sets visibility in navbar

function setVisibilityOfBadges() {
  badgeElements.forEach((el) => {
    // console.log(el.innerHTML);
    if (parseInt(el.innerHTML) > 0) {
      el.style.visibility = 'visible';
    } else {
      el.style.visibility = 'hidden';
      // m.target.style.display = 'none'
    }
  });
}

const observer = new MutationObserver(function (mutationsList) {
  mutationsList.forEach((m) => {
    if (parseInt(m.target.innerHTML) > 0) {
      m.target.style.visibility = 'visible';
    } else {
      m.target.style.visibility = 'hidden';
      // m.target.style.display = 'none'
    }
  });
});

observer.observe(badgeElements[2], { subtree: true, childList: true });
observer.observe(badgeElements[1], { subtree: true, childList: true });
observer.observe(badgeElements[0], { subtree: true, childList: true });

// resets state
resetBtn.addEventListener('click', () => {
  cbElements.forEach((el) => {
    el.checked = false;
  });
  checkedList.length = 0;
  pending_counter.innerHTML = checkboxList.length;
  done_counter.innerHTML = 0;
  setVisibilityOfBadges();
  localStorage.setItem(STORAGE_NAME, JSON.stringify([]));
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
