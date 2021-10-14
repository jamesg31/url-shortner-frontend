import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { Button } from 'semantic-ui-react';

class Login extends React.Component {
    onSuccess = (res) => {
        console.log(res);
        axios.post('/api/auth/google', { token: res.tokenId }).then((res) => {
            console.log(res);
            this.props.onComplete();
        })
    }

    onFailure = (res) => {
        console.log(res);
    }

    render() {
        return (
            <GoogleLogin
                clientId="1064340871794-5mn674kkvp5sdjnb7bdjoukrr77ao5pq.apps.googleusercontent.com"
                render={renderProps => (
                    <Button positive onClick={renderProps.onClick}>{this.props.children}</Button>
                )}
                buttonText="Login"
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}
            />
        )
    }
}

export default Login;