import React from 'react'
import { Message } from 'semantic-ui-react'

export default ({ message, color}) => (
    <Message color={color}>
        {message}
    </Message>
)
