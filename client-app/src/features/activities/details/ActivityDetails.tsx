import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedSidebar from './ActivityDetailedSidebar'
import ActivityDetailedChat from './ActivityDetailedChat'
import { RootStoreContext } from '../../../app/stores/rootStore'

interface DetailParams {
    id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const rootStore = useContext(RootStoreContext);
    const { activity, loadActivity, loadingInitial } = rootStore.activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id, history]);

    if (loadingInitial || !activity) return <LoadingComponent content='Loading activity..' />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar attendees={activity.attendees} />
            </Grid.Column>
        </Grid>
    )
}
export default observer(ActivityDetails)