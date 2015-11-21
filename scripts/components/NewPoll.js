import React, { Component, PropTypes } from 'react';
import PollOption from './PollOption';

export default class NewPoll extends Component {
  render() {
    return (
      <form method='POST'>
        <input type='hidden' name='_csrf' defaultValue={$('#csrf').attr('content')} />
        <textarea className='materialize-textarea' placeholder='Type your question here, options below' name='question' required></textarea>
        {[...Array(this.props.options)].map((_, i) =>
          (<PollOption index={i + 1} key={i} options={this.props.options} onAddOption={this.props.onAddOption} />)
        )}
        <button type='submit' className='btn waves-effect waves-light'>Create Poll</button>
      </form>
    );
  }
}

NewPoll.PropTypes = {
  onAddOption: PropTypes.func.isRequired,
  options: PropTypes.number.isRequired
};
