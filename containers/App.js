import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement, incrementIfOdd, incrementAsync } from '../actions/counter';
import { addTodo, completeTodo, setVisibilityFilter } from '../actions/todos';
import { VisibilityFilters } from '../constants/TodoFilters';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

class App extends Component {
  render() {
    const { dispatch, visibleTodos, visibilityFilter, counter } = this.props;
    return (
      <div>
        <Counter increment={() => dispatch(increment())} decrement={() => dispatch(decrement())} incrementIfOdd={() => dispatch(incrementIfOdd())} incrementAsync={() => dispatch(incrementAsync())} counter={counter} />
        <AddTodo onAddSubmit={text => dispatch(addTodo(text))} />
        <TodoList todos={visibleTodos} onTodoClick={index => dispatch(completeTodo(index))} />
        <Footer filter={visibilityFilter} onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter))} />
      </div>
    );
  }
}

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
