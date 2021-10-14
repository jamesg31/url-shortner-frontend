import React from 'react';
import axios from 'axios';
import { List, Header, Button } from 'semantic-ui-react';
import './URLList.css';

class URLList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urls: [1]
        }
    }

    componentDidMount() {
        this.updateList();
    }

    updateList() {
        axios.get('/api/urls').then((res) => {
            this.setState({ urls: res.data });
        });
    }

    render() {
        if (this.state.urls.length > 0) {
            var list = <List divided verticalAlign='middle' className='url-list'>
                <Header as='h1'>Manage URL's:</Header>
                {this.state.urls.map((url) => {
                    return (
                        <List.Item>
                            <List.Content floated='right'><Button negative>Delete</Button></List.Content>
                            <List.Content>
                                <List.Header>URL: /{url.url}</List.Header>
                                Redirect Destination: {url.destination}
                            </List.Content>
                        </List.Item>
                    )
                })}
            </List>
        } else {
            list = null;
        }
        return (
            <React.Fragment>
                {list}
            </React.Fragment>
        )
    }
}

export default URLList;