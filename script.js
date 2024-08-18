const enterTask = document.getElementById('enterTask');
const addTask = document.getElementById('addTask');
const listTask = document.querySelector('.listTask');
const displayDate = document.querySelector('#displayDate');

const date = new Date();
const currentDate = `${date.getDate()}-${
  date.getMonth() + 1
}-${date.getFullYear()}`;
displayDate.innerHTML = currentDate;

window.onload = () => {
  const storedDate = localStorage.getItem('date');

  if (storedDate !== currentDate) {
    // Clear tasks if the date has changed
    listTask.innerHTML = '';
  } else {
    // Load tasks from localStorage
    listTask.innerHTML = localStorage.getItem('data') || '';
  }

  // Reattach event listeners to dynamically created spans
  document.querySelectorAll('span').forEach((span) => {
    span.addEventListener('click', () => {
      span.parentElement.remove();
      saveData();
    });
  });
};

addTask.addEventListener('click', () => {
  if (enterTask.value == '') {
    alert('you must enter your tasks');
  } else {
    const list = document.createElement('li');
    const span = document.createElement('span');
    list.textContent = enterTask.value;
    listTask.appendChild(list);
    span.innerHTML = '\u00d7';
    list.appendChild(span);

    span.addEventListener('click', () => {
      span.parentElement.remove();
      saveData();
    });
  }
  enterTask.value = '';
  saveData();
});

function saveData() {
  localStorage.setItem('data', listTask.innerHTML);
  localStorage.setItem('date', currentDate);
}
