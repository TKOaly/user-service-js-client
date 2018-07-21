import * as React from "react";
import "./App.css";

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
  public componentDidMount() {
    if (localStorage.getItem("tekis_auth_token")) {
      this.setState({
        token: localStorage.getItem("tekis_auth_token") || "",
        isAuthenticated: true
      });
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
