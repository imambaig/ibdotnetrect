import { Item, Label, Segment } from "semantic-ui-react"
import React, { useContext, Fragment } from 'react'
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from "mobx-react-lite";
import ActivittListItem from "./ActivittListItem";


const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate } = activityStore;
    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {group}
                    </Label>

                    <Item.Group divided>
                        {activities.map(activity => (
                            <ActivittListItem key={activity.id} activity={activity} />
                        ))}
                    </Item.Group>

                </Fragment>
            ))}
        </Fragment>

    );
};
export default observer(ActivityList)
