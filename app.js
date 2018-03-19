//remove todo from list
function removeTodo(e) {}

//save todos
function saveTodo() {
  var newInput = document.getElementById('myInput').value;

  if (newInput === '') {
    console.log('empty input');
    return;
  }

  var todo = {
    text: newInput,
    checked: false
  };

  if (localStorage.getItem('todos') === null) {
    console.log('null');
    var todos = [];

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
  } else {
    console.log('notnull');
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

    //X button
    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.onclick = 'removeTodo()';
    span.appendChild(txt);
    li.appendChild(span);

    //checked
    if (todos[i].checked) {
      li.classList.toggle('checked');
    }
  }
}
