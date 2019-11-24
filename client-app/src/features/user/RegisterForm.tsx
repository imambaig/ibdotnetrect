import React, { useContext } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../app/common/form/TextInput'
import { Form, Button, Header } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'
import { IUserFormValues } from '../../app/models/user'
import { FORM_ERROR } from 'final-form'
import { combineValidators, isRequired } from 'revalidate'
import ErrorMessage from '../../app/common/form/ErrorMessage'
const validate = combineValidators({
    username: isRequired('username'),
    displayName: isRequired('displayName'),
    email: isRequired('email'),
    password: isRequired('password')
})
const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { register } = rootStore.userStore;
    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({ handleSubmit, submitting, form, submitError, invalid, pristine, dirtyFieldsSinceLastSubmit }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2' content='Signup' color='teal' />
                    <Field name='username' component={TextInput} placeholder='Username' />
                    <Field name='displayName' component={TextInput} placeholder='Display Name' />
                    <Field name='email' component={TextInput} placeholder='Email' />
                    <Field name='password' component={TextInput} placeholder='Password' type='password' />
                    {submitError && dirtyFieldsSinceLastSubmit && (<ErrorMessage error={submitError} text={JSON.stringify(submitError.data.errors)} />)}
                    <Button disabled={invalid && !dirtyFieldsSinceLastSubmit || pristine} loading={submitting} color='teal' content='Register' fluid />

                </Form>

            )}
        />
    )
}
export default RegisterForm;