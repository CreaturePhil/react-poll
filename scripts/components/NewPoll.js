import React, { Component, PropTypes } from 'react';
import PollOption from './PollOption';

export default class NewPoll extends Component {
  render() {
    return (
      <div>
        <textarea className='materialize-textarea' placeholder="Type your question here, options below"></textarea>
        {[...Array(this.props.options)].map((_, i) => (
          <PollOption index={i + 1} key={i} options={this.props.options} onAddOption={this.props.onAddOption} />)
        )}
        <button type='submit' className='btn waves-effect waves-light'>Create Poll</button>
      </div>
    );
  }
}

NewPoll.PropTypes = {
  onAddOption: PropTypes.func.isRequired,
  options: PropTypes.number.isRequired
};
