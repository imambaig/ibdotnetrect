import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../app/common/form/TextInput'
import TextAreaInput from '../../app/common/form/TextAreaInput'
import { Form, Button } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'
import { IUserFormValues } from '../../app/models/user'
import { FORM_ERROR } from 'final-form'
import { combineValidators, isRequired } from 'revalidate'
import { IProfile } from '../../app/models/profile'

const validate = combineValidators({
    displayName: isRequired('displayName')
});
interface IProps {
    updateProfile: (profile: IProfile) => void;
    profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
    return (
        <FinalForm onSubmit={updateProfile} validate={validate} initialValues={profile} render={({ handleSubmit, invalid, pristine, submitting }) => (
            <Form onSubmit={handleSubmit} error>
                <Field name='displayName' component={TextInput} placeholder='Display Name' value={profile.displayName} />
                <Field name='bio' component={TextInput} placeholder='Bio' value={profile!.bio} />
                <Button loading={submitting} floated='right' disabled={invalid || pristine} positive content='Update profile' />

            </Form>
        )} >


        </FinalForm>
    )
}

export default ProfileEditForm