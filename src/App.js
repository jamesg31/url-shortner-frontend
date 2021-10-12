import React from 'react';
import './App.css';
import { Input, Button } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: 2
    }
  }

  changeState(prevState) {
    this.setState({ buttonState: prevState - 1 });
  }

  onInputChange(event) {
    if (event.target.value === 'hello world') {
      this.setState({ buttonState: 1 })
    } else if (event.target.value === 'hello') {
      this.setState({ buttonState: 0 })
    }
  }

  render() {
    if (this.state.buttonState === 2) {
      var button = <Button loading>Loading</Button>
    } else if (this.state.buttonState === 0) {
      button = <Button negative>Not Available</Button>
    } else if (this.state.buttonState === 1) {
      button = <Button positive>Create</Button>
    }
    return (
      <React.Fragment>
        <Input style={{ margin: '10px' }} action={button} onChange={(event) => this.onInputChange(event)} />

        <Button onClick={() => this.changeState(this.state.buttonState)}>state change</Button>
        <Button onClick={() => this.setState({ buttonState: 2 })}>state reset</Button>
        <p>buttonState: {this.state.buttonState}</p>
      </React.Fragment>
    );
  }
}

export default App;
