import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
class App extends Component {
  state = {
    values: []
  };
  componentDidMount() {
    axios.get("http://localhost:5000/api/values/").then(response => {
      //console.log(response);
      this.setState({
        values: response.data
      });
    });
    this.setState({
      values: [{ id: 1, name: "one" }, { id: 2, name: "two" }]
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>dotnet react</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
        <ul>
          {this.state.values.map((value: any) => (
            <li key={value.id}>{value.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
