import React, { Component, PropTypes } from 'react';
import NewPoll from '../components/NewPoll';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    return (
      <div className='container'>
        <NewPoll />
      </div>
    );
  }
}

export default App;
