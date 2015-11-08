import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
  renderTodo(todo, index) {
    return <Todo {...todo} key={index} onClick={() => this.props.onTodoClick(index)} />;
  }

  render() {
    return (
      <ul>
        {this.props.todos.map((todo, index) => this.renderTodo(todo, index))}
      </ul>
    );
  }
}

TodoList.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
};
