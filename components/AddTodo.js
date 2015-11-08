import React, { Component, PropTypes } from 'react';

export default class AddTodo extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const node = this.refs.input;
    const text = node.value.trim();
    this.props.onAddSubmit(text);
    node.value = '';
  }

  render() {
      return (
        <div>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input type='text' ref='input' />
            <input type='submit' value='Add' />
          </form>
        </div>
      );
  }
}

AddTodo.propTypes = {
  onAddSubmit: PropTypes.func.isRequired
};
