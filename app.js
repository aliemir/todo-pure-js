//save todos
function saveTodo() {
  var newInput = document.getElementById('myInput').value;

  if (newInput === '') {
    alert('you must type something.');
    return;
  }

  var todo = {
    text: newInput,
    checked: false
  };

  if (localStorage.getItem('todos') === null) {
    var todos = [];

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
  } else {
    var todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  fetchTodos();
}

//Get Items from localStorage
function fetchTodos() {
  var ul = document.getElementById('myUL');
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  var todos = JSON.parse(localStorage.getItem('todos'));

  for (var i = 0; i < todos.length; i++) {
    //fetch and create textnode
    var li = document.createElement('li');
    var todo = document.createTextNode(todos[i].text);
    li.appendChild(todo);
    ul.appendChild(li);
    li.addEventListener(
      'click',
      function() {
        updateTodo(this);
      },
      false
    );

    //X button
    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.addEventListener(
      'click',
      function() {
        removeTodo(this.parentElement.innerText);
      },
      false
    );
    span.appendChild(txt);
    li.appendChild(span);

    //checked
    if (todos[i].checked) {
      li.classList.toggle('checked');
    }
  }
}
//remove todo from list
function removeTodo(tx) {
  var removingTodo = tx.substring(0, tx.length - 1);
  var todos = JSON.parse(localStorage.getItem('todos'));
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].text == removingTodo) {
      todos.splice(i, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }
  fetchTodos();
}
//update Todo
function updateTodo(li) {
  li.classList.toggle('checked');
  var updatingTodo = li.innerText.substring(0, li.innerText.length - 1);
  console.log(updatingTodo);
  var todos = JSON.parse(localStorage.getItem('todos'));
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].text == updatingTodo) {
      if (todos[i].checked) {
        todos[i].checked = false;
      } else {
        todos[i].checked = true;
      }
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }
}
