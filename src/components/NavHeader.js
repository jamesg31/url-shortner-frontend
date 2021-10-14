import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

class NavHeader extends React.Component {
    render() {
        return (
            <Menu size='large' secondary>
                <Container>
                    <Menu.Item position='right'>
                        <Button as='a' primary='true' style={{ marginTop: '.5em' }}>
                            Log in
                        </Button>
                    </Menu.Item>
                </Container>
            </Menu>
        );
    }
}

export default NavHeader;