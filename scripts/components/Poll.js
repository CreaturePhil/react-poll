import React, { Component, PropTypes } from 'react';

export default class Poll extends Component {
  render() {
    return (
      <form method='POST' action='/api/polls'>
        <input type='hidden' name='_csrf' defaultValue={this.props.csrfToken} />
        <input type='hidden' name='_id' defaultValue={this.props.data._id} />
        <h1>{this.props.data.question}</h1>
        {this.props.data.options.map((option, i) => (
          <p key={i}>
            <input type='radio' className='with-gap' name='group' id={'option' + i} />
            <label htmlFor={'option' + i }>{option.name}</label>
          </p>
        ))}
        <button type='submit' className='btn waves-effect waves-light'>Vote</button>
      </form>
    );
  }
}
