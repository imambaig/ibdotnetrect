import React, { useContext, useEffect } from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import { Grid } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore'
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";

import { observer } from 'mobx-react-lite';

interface RouteParams {
    username: string
}

interface IProps extends RouteComponentProps<RouteParams> { }

const ProfilePage: React.FC<IProps> = ({ match }) => {
    const rootStore = useContext(RootStoreContext)
    const { loadingProfile, profile, loadProfile } = rootStore.profileStore;

    useEffect(() => {
        loadProfile(match.params.username)
    }, [loadProfile, match])

    if (loadingProfile) return <LoadingComponent content='Loading profile ...' />
    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile!} />
                <ProfileContent />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ProfilePage);
