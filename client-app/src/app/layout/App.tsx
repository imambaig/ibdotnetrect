import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from 'react-toastify'

const App: React.FC<RouteComponentProps> = ({ location }) => {

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
      <ToastContainer position='bottom-right' />>
        <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createactivity', '/manage/:id']} component={ActivityForm} />
              <Route component={NotFound} />
            </Switch>

          </Container>
        </Fragment>
      )}
      />

    </Fragment>
  );

}

export default withRouter(observer(App));
