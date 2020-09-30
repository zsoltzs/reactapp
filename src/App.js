import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "@aws-amplify/auth";
import axios from "axios";

function App(props) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getUserName() {
      const userInfo = await Auth.currentUserInfo();
      const answer = await axios.get(
        `https://awscdci3-env.eba-hf4peyrq.eu-central-1.elasticbeanstalk.com/hello?name=${userInfo.username}`
      );
      setUserName(answer.data);
    }
    getUserName();
  });

  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>We now have Auth!</h1>
        <p>{userName}</p>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
