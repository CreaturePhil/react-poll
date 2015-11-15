import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement, incrementIfOdd, incrementAsync } from '../actions/counter';
import { addTodo, completeTodo, setVisibilityFilter } from '../actions/todos';
import { VisibilityFilters } from '../constants/TodoFilters';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';
import NewPoll from '../components/NewPoll';

class App extends Component {
  render() {
    const { dispatch, visibleTodos, visibilityFilter, counter } = this.props;
    return (
      <div className='container'>
        <NewPoll />
      </div>
    );
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })),
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired,
  counter: PropTypes.number.isRequired
};

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
}

export default connect(mapStateToProps)(App);
