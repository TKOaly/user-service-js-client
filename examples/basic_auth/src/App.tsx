import * as React from "react";
import "./App.css";

import userService, { AuthenticationModel, Service } from "user-service-js-client";
import logo from "./logo.svg";

interface AppState {
  isAuthenticated: boolean;
  token: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isAuthenticated: false,
      token: ""
    };
  }
  public async componentDidMount() {
    if (localStorage.getItem("tekis_auth_token")) {
      this.setState({
        token: localStorage.getItem("tekis_auth_token") || "",
        isAuthenticated: true
      });
    } else {
      const authModel: AuthenticationModel = await userService.authenticate("test_user", "test_user", Service.KJYR);
      console.log(authModel);
    }
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
