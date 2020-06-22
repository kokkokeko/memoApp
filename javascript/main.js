document.getElementById('main_content').setAttribute('placeholder',
  '明日は曇りだった。明後日は雨だった。今日は晴れていた。明日は曇りだっ.....');
let btn = document.getElementById('submit');
let memosList = document.getElementById('memos');

btn.addEventListener('click', addList);

function addList(e) {
  e.preventDefault();
  /*
  <li class="memo">
    <h2>ここにタイトル</h2>
    <p>
      <span class="date">2016年5月9日</span> 明日は曇りだった。明後日は雨だった。今日は晴れていた。明日は曇りだった。明後日は雨だった。今日は晴れていた。明日は曇りだった。明後日は雨だった。今日は晴れていた。明日は曇りだった。明後日は雨だった。今日は晴れていた。明日は曇りだった。明後日は雨だった。
    </p>
    <!-- <a href="#" class="btn">&gt;もっと見る</a> -->
  </li>
  */

  // form inputs
  let title = document.getElementById('title');
  let main = document.getElementById('main_content');

  // new memo
  let li = document.createElement('li');
  li.className = "memo";

  // add h2
  let head = document.createElement('h2');
  head.appendChild(document.createTextNode(title.value));

  li.appendChild(document.createTextNode('\n        '));
  li.appendChild(head);

  // create span
  let span = document.createElement('span');
  span.appendChild(document.createTextNode(formatNowDate()));

  // add paragraph
  let p = document.createElement('p');
  p.appendChild(document.createTextNode('\n        '));
  p.appendChild(span);
  p.appendChild(document.createTextNode(main.value));
  li.appendChild(document.createTextNode('\n        '));
  li.appendChild(p);

  // add delete button
  let delBtn = document.createElement('button');
  delBtn.classList.add("delBtn", "delete");
  delBtn.appendChild(document.createTextNode("delete"));
  li.appendChild(document.createTextNode('\n        '));
  li.appendChild(delBtn);

  // add update button
  let updateBtn = document.createElement('button');
  updateBtn.classList.add("updateBtn", "update");
  updateBtn.id = "modalBtn";
  updateBtn.appendChild(document.createTextNode("update"));
  li.appendChild(document.createTextNode('\n        '));
  li.appendChild(updateBtn);

  li.appendChild(document.createTextNode('\n        '));
  memosList.appendChild(li);

}


function formatNowDate() {
  let now = new Date();
  return now.getFullYear() + "年" +
    twoDigit((now.getMonth() + 1)) + "月" +
    twoDigit(now.getDate()) + "日 " +
    twoDigit(now.getHours()) + ":" +
    twoDigit(now.getMinutes()) + ":" +
    twoDigit(now.getSeconds());

  function twoDigit(num) {
    return ("0" + num).slice(-2);
  }

}

memosList.addEventListener('click', removeItem);

function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm("Are you sure?")) {
      let li = e.target.parentElement;
      memosList.removeChild(li);
    }
  }
}

let filter = document.getElementById('filter');

filter.addEventListener('keyup', filterItems);

function filterItems(e) {
  let text = e.target.value.toLowerCase();

  let items = memosList.getElementsByTagName('li');

  Array.from(items).forEach(function(item) {
    // pick up title(h2), p(main_content), span(date)
    let itemName = item.firstElementChild.innerText + item.firstElementChild.nextElementSibling.innerText;

    if (itemName.toLowerCase().includes(text)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  })
}


let modal = document.getElementById('simple_modal');
// let modalBtn = document.getElementById('modalBtn');
let closeBtn = document.getElementsByClassName('closeBtn')[0];


// modalBtn.addEventListener('click', openModal);
memosList.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutSide);

// Four variables below will be used in two function openModal, updateItem.
let title_before_update;
let main_content_before_update;
let updateForm_title;
let updateForm_main_content;

function openModal(e) {
  if (e.target.classList.contains('update')) {

    /*
    <li class="memo">
      <h2>ここにタイトル</h2>
      <p>
        <span class="date">2016年5月9日</span> 明日は曇りだった。明後日は雨だった。今日は晴れていた。明日は曇りだった。明後日は雨だった。今日は晴れていた。明日は曇りだった。明後日は雨だった。今日は晴れていた。明日は曇りだった。明後日は雨だった。今日は晴れていた。明日は曇りだった。明後日は雨だった。
      </p>
      <button>
      ...
      ...
    </li>
    */

    // get <h2>'s text'
    title_before_update = e.target.parentElement.firstElementChild;
    // get only <p>'s text but not <span>'s date.
    main_content_before_update = e.target.parentElement.firstElementChild.nextElementSibling.childNodes[2];


    updateForm_title = document.querySelector('#updateMemo input[type="text"]');
    updateForm_main_content = document.querySelector('#updateMemo textarea');

    // copy the created memo before.
    updateForm_title.value = title_before_update.textContent;
    updateForm_main_content.value = main_content_before_update.textContent;

    modal.style.display = 'block';
  }
}

function closeModal() {
  modal.style.display = 'none';
}

function clickOutSide(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

let update_submit = document.querySelector('#updateMemo #submit');

update_submit.addEventListener('click', updateItem);

function updateItem(e) {
  e.preventDefault();

  title_before_update.textContent = updateForm_title.value; // used in openModal, updateItem
  main_content_before_update.textContent = updateForm_main_content.value; // used in openModal, updateItem

  modal.style.display = 'none';

}