import React from 'react'
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { IActivity } from '../../../app/models/activity';
import { format } from 'date-fns';
import ActivityListItemAtendees from './ActivityListItemAtendees'

const ActivittListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    const host = activity.userActivities.filter(x => x.isHost)[0];
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item >
                        <Item.Image size='tiny' circular src={host.image || '/assets/user.png'} style={{ marginBottom: 3 }} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>

                            <Item.Description>
                                Hosted By <Link to={`/profile/${host.username}`}> {host.displayName}</Link>
                            </Item.Description>
                            {activity.isHost &&
                                <Item.Description>
                                    <Label basic color='orange' content='you are hosting this activity' />
                                </Item.Description>}
                            {activity.isGoing && !activity.isHost &&
                                <Item.Description>
                                    <Label basic color='green' content='you are going to this activity' />
                                </Item.Description>}


                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' />>{format(activity.date, 'h:mm a')}
                <Icon name='marker' />{activity.venue},{activity.city}
            </Segment>
            <Segment secondary>
                <ActivityListItemAtendees attendees={activity.userActivities} />
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