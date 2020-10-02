import React from 'react';
import {
    Container,
    Grid,
    Header,
    Segment,
} from 'semantic-ui-react'
const Footer = () => {
    return (

            <Segment inverted vertical style={{ margin: '5em 0em 0em 0em', padding: '5em 0em', bottom: "0em" }}>
            <Container textAlign='center'>
                <Grid divided inverted stackable>

                    <Grid.Column >
                        <Header inverted as='h4' content='Solution' />
                        <p>
                            With markdown and great detail we write out our solutions here
            </p>
                    </Grid.Column>
                </Grid>
            </Container>
        </Segment>
    );
}

export default Footer;
