import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../app/common/form/TextInput'
import { Form, Button, Label, Header } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'
import { IUserFormValues } from '../../app/models/user'
import { FORM_ERROR } from 'final-form'
import { combineValidators, isRequired } from 'revalidate'
import ErrorMessage from '../../app/common/form/ErrorMessage'
const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
})
const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;
    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({ handleSubmit, submitting, form, submitError, invalid, pristine, dirtyFieldsSinceLastSubmit }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2' content='Login to dotnetreact' color='teal' />
                    <Field name='email' component={TextInput} placeholder='Email' />
                    <Field name='password' component={TextInput} placeholder='Password' type='password' />
                    {submitError && dirtyFieldsSinceLastSubmit && (<ErrorMessage error={submitError} text='invalid email or password' />)}
                    <Button disabled={invalid && !dirtyFieldsSinceLastSubmit || pristine} loading={submitting} color='teal' content='Login' fluid />

                </Form>

            )}
        />
    )
}
export default LoginForm;