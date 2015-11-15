import React, { Component } from 'react';
import PollOption from './PollOption';

export default class NewPoll extends Component {
  render() {
    return (
      <div>
        <textarea className='materialize-textarea' placeholder="Type your question here, options below"></textarea>
        {[1,2,3].map((_, i) => <PollOption index={i + 1} key={i} />)}
      </div>
    );
  }
}
