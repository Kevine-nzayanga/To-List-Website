const userContainer = document.getElementById('container');
const getUsers = () => {
  return fetch('https://dummyjson.com/todos?limit=12')
    .then(response => response.json())
    .then(response => response.todos)
    .catch(error => error);
};
const displayUsers = async () => {
  const users = await getUsers();
  console.log(users);
  if (Array.isArray(users)) {
    users.forEach(item => {
      let div = document.createElement('div');
      let userName = document.createElement('input');
      let ids = document.createElement('span');
      let checkbox = document.createElement('input');
      let icon = document.createElement('i');
      div.classList.add('people');
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.padding = '2px';
      div.style.marginBottom = '10px';

      // Apply styles to the input element
      userName.classList.add('user-name');
      userName.style.marginRight = '10px';
      userName.style.padding = '5px';
      userName.style.border = '1px solid #ccc';
      userName.style.width='480px';
      userName.style.height='30px';



      // Apply styles to the span element
      ids.style.marginRight = '10px';

      // Apply styles to the checkbox
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;
      checkbox.style.marginRight = '10px';

      // Apply styles to the icon
      icon.classList.add('fa', 'fa-trash');
      icon.style.cursor = 'pointer';
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;
      icon.classList.add('fa', 'fa-trash');
      ids.appendChild(icon);
      userName.value = item.todo;
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          userName.style.textDecoration = 'line-through';
        } else {
          userName.style.textDecoration = 'none';
        }
      });
      icon.addEventListener('click', () => {
        deleteUser(item.id);
        div.remove();
      });
      div.appendChild(checkbox);
      div.appendChild(userName);
      div.appendChild(ids);
      div.setAttribute('key', item.id);
      div.setAttribute('class', 'people');
      userContainer.appendChild(div);
    });
  }
};
const deleteUser = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.log(error);
  }
};
displayUsers();
const addForm = document.getElementById('addForm');
addForm.addEventListener('submit', event => {
  event.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const newTask = taskInput.value;
  taskInput.value = '';
  if (newTask) {
    const div = document.createElement('div');
    const userName = document.createElement('input');
    const ids = document.createElement('span');
    const checkbox = document.createElement('input');
    const icon = document.createElement('i');
    div.classList.add('people');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.padding = '10px';
    div.style.border = '1px solid #ccc';
    div.style.marginBottom = '10px';

    userName.classList.add('user-name');
    userName.style.marginRight = '10px';
    userName.style.padding = '5px';
    userName.style.border = '1px solid #ccc';

    ids.style.marginRight = '10px';

    checkbox.type = 'checkbox';
    checkbox.checked = false;
    checkbox.style.marginRight = '10px';

    icon.classList.add('fa', 'fa-trash');
    icon.style.cursor = 'pointer';
    ids.appendChild(icon);
    userName.value = newTask;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        userName.style.textDecoration = 'line-through';
      } else {
        userName.style.textDecoration = 'none';
      }
    });
    div.appendChild(checkbox);
    div.appendChild(userName);
    div.appendChild(ids);
    div.setAttribute('key', Date.now());
    div.setAttribute('class', 'people');
    userContainer.prepend(div);
  }
});