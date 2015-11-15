import React, { Component, PropTypes } from 'react';

export default class PollOption extends Component {
  render() {
    return (
      <div className='row'>
        <div className='input-field col s1'>
          <h5>{this.props.index}.</h5>
        </div>
        <div className='input-field col s11'>
          <input type='text' placeholder='Enter poll option...' required />
        </div>
      </div>
    );
  }
}

PollOption.PropTypes = {
  index: PropTypes.number.isRequired
};
