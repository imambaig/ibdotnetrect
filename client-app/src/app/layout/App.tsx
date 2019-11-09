import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite'

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if (activityStore.loadingInitial) return <LoadingComponent content='Loading Activities' />
  /*   componentDidMount() {
       axios
         .get<IActivity[]>("http://localhost:5000/api/activities/")
         .then(response => {
           //console.log(response);
           this.setState({
             activities: response.data
           });
         });
     }*/


  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <h1>{activityStore.title}</h1>
        <ActivityDashboard
        />
      </Container>

    </Fragment>
  );

}

export default observer(App);
