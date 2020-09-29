import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "@aws-amplify/auth";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { user: "" };
  }

  async componentDidMount() {
    const userInfo = await Auth.currentUserInfo();
    const answer = await axios.get(
      `http://awscdci3-env.eba-hf4peyrq.eu-central-1.elasticbeanstalk.com/hello?name=${userInfo.username}`
    );
    console.log(answer);

    this.setState({ user: answer.data });
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>We now have Auth!</h1>
          <p>{this.state.user}</p>
        </header>
        <AmplifySignOut />
      </div>
    );
  }
}

export default withAuthenticator(App);
