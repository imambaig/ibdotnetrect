import React from 'react'
import { AxiosResponse } from 'axios'
import { MessageContent, Message } from 'semantic-ui-react'
import { object } from 'prop-types'

interface IProps {
    error: AxiosResponse,
    text?: string

}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
    console.log(error);
    return (

        <Message error>
            <Message.Header>{error.statusText}</Message.Header>
            {error && error.data && Object.keys(error.data.error).length > 0 && (
                <Message.List>
                    {Object.values(error.data.error).flat().map((err, i) => (
                        <Message.Item key={i}>{err} </Message.Item>
                    ))}
                </Message.List>
            )}
            {text && <Message.Content content={text} />}
        </Message>
    )
}

export default ErrorMessage