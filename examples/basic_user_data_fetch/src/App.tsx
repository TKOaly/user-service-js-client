import * as React from "react";
import "./App.css";

import userService, { Service, ServiceResponse, UserObject } from "@tkoaly/user-service-client";

interface AppState {
  token: string;
  service: Service;
  returnedData: string;
  backendUrl: string;
  error: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      token: "",
      service: Service.KJYR,
      returnedData: "",
      backendUrl: "https://users.tko-aly.fi",
      error: ""
    };
  }

  public handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ token: e.target.value });
  };

  public handleServiceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    this.setState({ service: e.target.value as Service });
  };

  public handleBackendChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({ backendUrl: e.target.value });
  };

  public handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    this.setState({ error: "", returnedData: "" });
    try {
      const res: ServiceResponse<UserObject> = await userService.getMyData(
        this.state.token,
        this.state.service,
        {
          baseURL: this.state.backendUrl
        }
      );
      this.setState({ returnedData: JSON.stringify(res, null, 2) });
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        this.setState({ error: JSON.stringify(err.response.data, null, 2) });
      }
    }
  };

  public render() {
    return (
      <div className="App">
        <h1>User service test page</h1>
        <form onSubmit={event => this.handleSubmit(event)} method="POST">
          <p>
            Token:{" "}
            <input
              type="text"
              name="token"
              onChange={this.handleTokenChange}
              value={this.state.token}
              size={80}
            />
          </p>
          <p>
            Back-end URL:{" "}
            <input
              type="text"
              name="backendUrl"
              onChange={this.handleBackendChange}
              value={this.state.backendUrl}
              size={80}
            />
          </p>
          <p>
            Service:{" "}
            <select
              onChange={this.handleServiceChange}
              value={this.state.service}
            >
              {Object.keys(Service).map((key: string) => (
                <option key={Service[key]} value={Service[key]}>
                  {key}
                </option>
              ))}
            </select>
          </p>
          <p>
            <button>Fetch user data</button>
          </p>
          <hr />
          <p>Returned data:</p>
          <pre>
            {this.state.error && (
              <p>
                <b>ERROR: </b>
                <br />
                {this.state.error}
              </p>
            )}
            <p>{this.state.returnedData}</p>
          </pre>
        </form>
      </div>
    );
  }
}

export default App;
