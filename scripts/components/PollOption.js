import React, { Component, PropTypes } from 'react';

export default class PollOption extends Component {
  render() {
    let optionInput;
    const name = 'option' + this.props.index;

    if (this.props.options === this.props.index) {
      optionInput = <input type='text' placeholder='Enter poll option...' onChange={this.props.onAddOption} />;
    } else {
      optionInput = <input type='text' placeholder='Enter poll option...' name={name} required />;
    }

    return (
      <div className='row'>
        <div className='input-field col s1'>
          <h5>{this.props.index}.</h5>
        </div>
        <div className='input-field col s11'>
          {optionInput}
        </div>
      </div>
    );
  }
}

PollOption.PropTypes = {
  index: PropTypes.number.isRequired,
  onAddOption: PropTypes.func.isRequired,
  options: PropTypes.number.isRequired
};
