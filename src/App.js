import React, { Component } from 'react';
import './App.scss';

import TodoItem from './todoItem';

const initTodos = [
  {
    name: 'Get the dragged data with the dataTransfer.getData() method. This method will return any data that was set to the same type in the setData() method',
    id: 0,
    status: 'done',
    autoEdit: false
  },
  {
    name: 'Card header dropdown repair',
    id: 1,
    status: 'todo',
    autoEdit: false
  },
  {
    name: 'Button hover texts',
    id: 2,
    status: 'todo',
    autoEdit: false
  },
  {
    name: 'All the code refactor',
    id: 3,
    status: 'todo',
    autoEdit: false
  },
  {
    name: 'localstorage work',
    id: 4,
    status: 'todo',
    autoEdit: false
  }
]

class App extends Component {
  constructor(props) {
    super(props);

    if (!localStorage.getItem('todos-hf-react')) {
      localStorage.setItem('todos-hf-react', JSON.stringify(initTodos));
    }

    this.state = { todos: JSON.parse(localStorage.getItem('todos-hf-react')) };

    this.stateChange = this.stateChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.idSetter = this.idSetter.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.comparator = this.comparator.bind(this);
  }

  componentWillMount() {
    const todos = this.getTodos();

    this.stateChange(todos);
  }

  getTodos() {
    return this.state.todos
  }

  stateChange(todos) {
    this.setState({ todos });
    if (localStorage.getItem('todos-hf-react')) {
      localStorage.setItem('todos-hf-react', JSON.stringify(todos));
    }
  }

  onAdd(event) {
    event.preventDefault();

    const todos = this.getTodos();
    const name = '';
    const autoEdit = true;

    let status = event.target.getAttribute('data-status');
    let id = this.idSetter(todos);

    todos.push({ name, id, status, autoEdit });

    this.stateChange(todos);
  }

  idSetter(todos, tempId = 0) {
    Object.keys(todos).forEach(function(key) {
      todos[key].autoEdit = false;

      if (todos[key].id >= tempId) {
        tempId = todos[key].id + 1;
      }
    });

    return tempId
  }

  onDelete(id) {
    const todos = this.getTodos();

    let filteredTodos = todos.filter(todo => {
      return todo.id !== id;
    })

    this.stateChange(filteredTodos);
  }

  onEditSubmit(name, id) {
    let todos = this.getTodos();

    Object.keys(todos).forEach(function(key) {
      if (todos[key].id === id) {
        todos[key].name = name;
      }
    });
    this.stateChange(todos);
  }

  setStatus(id, status) {
    let todos = this.getTodos();
    let newId = this.idSetter(todos);

    Object.keys(todos).forEach(function(key) {
      if (todos[key].id === id) {
        todos[key].status = status;
        todos[key].id = newId;
      }
    });

    this.stateChange(todos);
  }

  comparator(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  render() {
    return (
      <div className="main-container">
        <div className="header">
          <span>Let's Do It! :)</span>
        </div>
        <div className="pseudo-body">
          <div className="grid-container">
            <div className="grid-item todo">
              <div className="column-title">I have to do...</div>
              {
                this.state.todos.sort(this.comparator).map(todo => {
                  let todoList;
                  if (todo.status === 'todo') {
                    todoList =
                     <TodoItem
                      key={todo.id}
                      {...todo}
                      onDelete={this.onDelete}
                      onEditSubmit={this.onEditSubmit}
                      setStatus={this.setStatus}
                    />
                  }
                  return todoList
                })
              }
              <div className="column-add-card" data-status="todo" onClick={this.onAdd} title="Click here to add a new todo card">Add a card...</div>
            </div>
            <div className="grid-item doing">
              <div className="column-title">I'm doing...</div>
                {
                  this.state.todos.sort(this.comparator).map(todo => {
                    let todoList;
                    if (todo.status === 'doing') {
                      todoList =
                       <TodoItem
                        key={todo.id}
                        {...todo}
                        onDelete={this.onDelete}
                        onEditSubmit={this.onEditSubmit}
                        setStatus={this.setStatus}
                      />
                    }

                    return todoList
                  })
                }
              <div className="column-add-card" data-status="doing" onClick={this.onAdd} title="Click here to add a new todo card">Add a card...</div>
            </div>
            <div className="grid-item done">
              <div className="column-title">I've done this all!</div>
                {
                  this.state.todos.sort(this.comparator).map(todo => {
                    let todoList;
                    if (todo.status === 'done') {
                      todoList =
                       <TodoItem
                        key={todo.id}
                        {...todo}
                        onDelete={this.onDelete}
                        onEditSubmit={this.onEditSubmit}
                        setStatus={this.setStatus}
                      />
                    }
                    return todoList
                  })
                }
              <div className="column-add-card" data-status="done" onClick={this.onAdd} title="Click here to add a new todo card">Add a card...</div>
            </div>
          </div>
        </div>
        <div className="footer">
          <span>Ferenc Hartmann's TODO React App</span>
        </div>
      </div>
    );
  }
}

export default App;
