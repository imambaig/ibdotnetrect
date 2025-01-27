import React, { useContext, useEffect, useState } from 'react'
import { Grid, Button, Loader } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'

import LoadingComponent from '../../../app/layout/LoadingComponent'
import { RootStoreContext } from '../../../app/stores/rootStore'
import InfineScroll from 'react-infinite-scroller'
import ActivityFilters from './ActivityFilters'
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder'

const ActivityDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadActivities, loadingInitial, setPage, page, totalPages } = rootStore.activityStore;
    const [loadingNext, setLoadingNext] = useState(false);
    const handleGetNext = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadActivities().then(() => setLoadingNext(false))


    }
    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    return (
        <Grid>
            <Grid.Column width={10}>
                {(loadingInitial && page === 0) ? (<ActivityListItemPlaceholder />) :
                    (<InfineScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && page + 1 < totalPages}
                        initialLoad={false}>
                        <ActivityList />
                    </InfineScroll>)
                }




            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);