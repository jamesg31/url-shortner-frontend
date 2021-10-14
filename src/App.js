import React from 'react';
import axios from 'axios';
import { Input, Button, Segment } from 'semantic-ui-react';
import validator from 'validator'
import NavHeader from './components/NavHeader';
import './App.css';
import Login from './components/Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: 0,
      urlInput: '',
      destinationInput: '',
      destinationInputError: false
    }

    this.timeout = 0;
  }

  onUrlInputChange(event) {
    this.setState({ buttonState: 0, urlInput: event.target.value });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (event.target.value.length > 0) {
        axios.get('/api/urls/' + event.target.value).then((res) => {
          console.log(res.data);
          if (res.data.length === 0) {
            this.setState({ buttonState: 2 });
          } else {
            this.setState({ buttonState: 1 });
          }
        })
      }
    }, 300);
  }

  onDestinationInputChange(event) {
    if (!validator.isURL(event.target.value)) {
      this.setState({ destinationInput: event.target.value, destinationInputError: true })
    } else {
      this.setState({ destinationInput: event.target.value, destinationInputError: false })
    }
  }

  onButtonClick = () => {
    axios.post('/api/urls', { url: this.state.urlInput, destination: this.state.destinationInput }).then((res) => {
      console.log(res);
    })
  }

  render() {
    if (this.state.buttonState === 0) {
      var button = <Button loading>Loading</Button>
    } else if (this.state.buttonState === 1) {
      button = <Button negative>Not Available</Button>
    } else if (this.state.buttonState === 2) {
      button = <Login onComplete={this.onButtonClick}>Create</Login>
    }
    if (this.state.destinationInputError) {
      var destinationInput = <Input error value={this.state.destinationInput} placeholder='https://example.com' onChange={(event) => this.onDestinationInputChange(event)} />
    } else {
      destinationInput = <Input value={this.state.destinationInput} placeholder='https://example.com' onChange={(event) => this.onDestinationInputChange(event)} />
    }
    return (
      <React.Fragment>
        <NavHeader />
        <Segment.Group className='create-form' horizontal raised>
          <Segment className='create-form-segment' align="right">
            <h4>Destination:</h4>
            {destinationInput}
          </Segment>
          <Segment className='create-form-segment'>
            <h4>URL:</h4>
            <Input value={this.state.urlInput} action={button} onChange={(event) => this.onUrlInputChange(event)} label={window.location.origin + '/'} placeholder='shortened-url' />
          </Segment>
        </Segment.Group>
      </React.Fragment>
    );
  }
}

export default App;