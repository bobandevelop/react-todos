import React, { Component } from "react";
import PropTypes from "prop-types";
import { TodoForm, TodoList, Footer } from "./components/todo";
import {
  addTodo,
  generateId,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodos
} from "./lib/todoHelpers";
import { pipe, partial } from "./lib/utils";
import { loadTodos, createTodo } from "./lib/todoService";
import "./App.css";

class App extends Component {
  state = {
    todos: [],
    currentTodo: ""
  };

  static contextTypes = {
    route: PropTypes.string
  };

  componentDidMount() {
    loadTodos().then(data => this.setState({ todos: data.todos }));
  }

  handleInputChange = evt => {
    this.setState({
      currentTodo: evt.target.value
    });
  };

  handleEmptySubmit = evt => {
    evt.preventDefault();
    this.setState({
      errorMessage: "Please supply a todo name"
    });
  };

  handleToggle = id => {
    const getUpdatedTodos = pipe(
      findById,
      toggleTodo,
      partial(updateTodo, this.state.todos)
    );
    const updatedTodos = getUpdatedTodos(id, this.state.todos);
    this.setState({ todos: updatedTodos });
  };

  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({ todos: updatedTodos });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const newId = generateId();
    const newTodo = {
      id: newId,
      name: this.state.currentTodo,
      isComplete: false
    };
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: "",
      errorMessage: ""
    });
    createTodo(newTodo).then(() => console.log("Todo added"));
  };

  render() {
    const submitHandler = this.state.currentTodo
      ? this.handleSubmit
      : this.handleEmptySubmit;
    const displayTodos = filterTodos(this.state.todos, this.context.route);
    return (
      <div className="App">
        <div className="App-header">
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && (
            <span className="error">{this.state.errorMessage}</span>
          )}
          <TodoForm
            handleInputChange={this.handleInputChange}
            handleSubmit={submitHandler}
            currentTodo={this.state.currentTodo}
          />
          <TodoList
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}
            todos={displayTodos}
          />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
