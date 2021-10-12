import React from 'react';
import axios from 'axios';
import './App.css';
import { Input, Button } from 'semantic-ui-react';

const api = 'http://localhost:3001/api/'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: 0,
      urlInput: '',
      destinationInput: '',
    }

    this.timeout = 0;
  }

  onInputChange(event) {
    this.setState({ buttonState: 0, urlInput: event.target.value });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (event.target.value.length > 0) {
        axios.get(api + 'urls/' + event.target.value).then((res) => {
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

  onButtonClick(event) {
    axios.post(api + 'urls', { url: this.state.urlInput, destination: this.state.destinationInput }).then((res) => {
      console.log(res);
    })
  }

  render() {
    if (this.state.buttonState === 0) {
      var button = <Button loading>Loading</Button>
    } else if (this.state.buttonState === 1) {
      button = <Button negative>Not Available</Button>
    } else if (this.state.buttonState === 2) {
      button = <Button positive onClick={(event) => this.onButtonClick()}>Create</Button>
    }
    return (
      <React.Fragment>
        <Input value={this.state.destinationInput} style={{ margin: '10px' }} placeholder='https://example.com' onChange={(event) => this.setState({ destinationInput: event.target.value })} />
        <br />
        <Input value={this.state.urlInput} style={{ marginLeft: '10px' }} action={button} onChange={(event) => this.onInputChange(event)} label={window.location.origin + '/'} placeholder='shortened-url' />
      </React.Fragment>
    );
  }
}

export default App;