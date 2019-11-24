import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity, IActivityFormValues, ActivityFormValues } from '../../../app/models/activity'
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form'
import { values } from 'mobx';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
    title: isRequired({ message: 'The event title is required' }),
    category: isRequired({ message: 'The event category is required' }),
    description: composeValidators(
        isRequired('Description',
            hasLengthGreaterThan(4)({ message: 'Description needsd to be atleast 5 characters' }))

    ),
    city: isRequired({ message: 'The event city is required' }),
    venue: isRequired({ message: 'The event venue is required' }),
    date: isRequired({ message: 'The event date is required' }),
    time: isRequired({ message: 'The event time is required' }),
})

interface DetailsParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParams>> = ({ match, history }) => {
    const rootStore = useContext(RootStoreContext);
    const { createActivity, editActivity, submitting, activity: initialFormState, loadActivity } = rootStore.activityStore;


    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }
    const [activity, setActivity] = useState<IActivityFormValues>(new ActivityFormValues());
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id).then((activity) => setActivity(new ActivityFormValues(activity))).finally(() => setLoading(false));
        }

    }, [loadActivity, match.params.id]);
    /* const handleSubmit = () => {
         if (activity.id.length === 0) {
             let newActivity = {
                 ...activity,
                 id: uuid()
             }
             createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
 
         } else {
             editActivity(activity).then(() => history.push(`/activities/${activity.id}`))
         }
     }*/
    const handleFinaFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            //console.log(newActivity);
            createActivity(newActivity);

        } else {
            editActivity(activity);
        }
    }
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //console.log(event.target.value);
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing >
                    <FinalForm onSubmit={handleFinaFormSubmit}
                        validate={validate}
                        initialValues={activity}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field name='title' placeholder='Title' value={activity.title} component={TextInput} />
                                <Field component={TextAreaInput} name='description' rows={3} placeholder='Description' value={activity.description} />
                                <Field component={SelectInput} options={category} name='category' placeholder='Category' value={activity.category} />
                                <Form.Group widths='equal'>
                                    <Field component={DateInput} name='date' date={true} placeholder='Date' value={activity.date} />
                                    <Field component={DateInput} name='time' time={true} placeholder='Time' value={activity.time} />
                                </Form.Group>
                                <Field component={TextInput} name='city' placeholder='City' value={activity.city} />
                                <Field component={TextInput} name='venue' placeholder='Venue' value={activity.venue} />
                                <Button loading={submitting} disabled={loading || invalid || pristine} onClick={() => handleSubmit} floated='right' positive type='sunmit' content='Submit' />
                                <Button disabled={loading} onClick={activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.push('/activities')} floated='right' type='sbuttonunmit' content='Cancel' />
                            </Form>
                        )}
                    />


                </Segment>
            </Grid.Column>
        </Grid>

    )
}
export default observer(ActivityForm)