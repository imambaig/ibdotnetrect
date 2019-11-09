import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectdActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setsubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectdActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false);
  }
  const handleOpenCreateForm = () => {
    setSelectdActivity(null);
    setEditMode(true);
  }
  const handleCreateActivity = (activity: IActivity) => {
    setsubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity])
      setSelectdActivity(activity);
      setEditMode(false);
    }).then(() => setsubmitting(false))

  }
  const handleEditActivity = (activity: IActivity) => {
    setsubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectdActivity(activity);
      setEditMode(false);
    }).then(() => setsubmitting(false))
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setsubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)])
    }).then(() => setsubmitting(false))

  }
  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        //console.log(response);
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        setActivities(activities);
      }).then(() => setLoading(false));
  }, []);
  if (loading) return <LoadingComponent content='Loading Activities' />
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
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectdActivity={setSelectdActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>

    </Fragment>
  );

}

export default App;