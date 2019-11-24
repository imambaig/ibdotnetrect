import React, { useContext } from 'react'
import { Item, Button, Label, Segment, SegmentGroup, Icon } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { Link } from "react-router-dom";
import { IActivity } from '../../../app/models/activity';
import { format } from 'date-fns';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ActivittListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item >
                        <Item.Image size='tiny' circular src='/assets/user.png'></Item.Image>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>

                            <Item.Description>
                                Hosted By bob
                </Item.Description>

                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' />>{format(activity.date, 'h:mm a')}
                <Icon name='marker' />{activity.venue},{activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
        </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link} to={`/activities/${activity.id}`}
                    floated='right' content='View' color='blue' />
            </Segment>
        </Segment.Group>

    )
}

export default ActivittListItem