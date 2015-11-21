import React, { Component, PropTypes } from 'react';
import NewPoll from '../components/NewPoll';
import Poll from '../components/Poll';

const csrfToken = $('#csrf').attr('content');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: 3,
      data: [{_id: '', question: '', options: [{}]}]
    };
  }

  componentDidMount() {
    $.getJSON('/api/polls', data => {
      this.setState({...this.state, data});
    });
  }

  addOption() {
    this.setState({...this.state, options: this.state.options + 1});
  }

  render() {
    //    <NewPoll options={this.state.options} onAddOption={() => this.addOption()} csrfToken={csrfToken} />
    return (
      <div className='container'>
        <Poll data={this.state.data[0]} csrfToken={csrfToken} />
      </div>
    );
  }
}

export default App;
