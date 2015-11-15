import React, { Component, PropTypes } from 'react';
import NewPoll from '../components/NewPoll';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: 3
    };
  }

  addOption() {
    this.setState({...this.state, options: this.state.options + 1});
  }

  render() {
    return (
      <div className='container'>
        <NewPoll options={this.state.options} onAddOption={() => this.addOption()} />
      </div>
    );
  }
}

export default App;
