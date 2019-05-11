import React, { FC, useState, useCallback } from "react";
import "./App.css";
import userService, {
    Service,
    ServiceResponse,
    UserObject
} from "@tkoaly/user-service-js-client";

const App: FC = () => {
    const [token, setToken] = useState("");
    const [service, setService] = useState(Service.KJYR);
    const [returnedData, setReturnedData] = useState("");
    const [backendUrl, setBackendUrl] = useState("https://users.tko-aly.fi");
    const [error, setError] = useState("");

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setError("");
            setReturnedData("");
            try {
                const res: ServiceResponse<
                    UserObject
                > = await userService.getMyData(token, service, {
                    baseURL: backendUrl
                });
                setReturnedData(JSON.stringify(res, null, 2));
            } catch (err) {
                if (err.response && err.response.data) {
                    setError(JSON.stringify(err.response.data, null, 2));
                }
            }
        },
        [backendUrl, service, token]
    );

    return (
        <div className="App">
            <h1>User service test page</h1>
            <form onSubmit={handleSubmit} method="POST">
                <p>
                    Token:{" "}
                    <input
                        type="text"
                        name="token"
                        onChange={e => setToken(e.target.value)}
                        value={token}
                        size={80}
                    />
                </p>
                <p>
                    Back-end URL:{" "}
                    <input
                        type="text"
                        name="backendUrl"
                        onChange={e => setBackendUrl(e.target.value)}
                        value={backendUrl}
                        size={80}
                    />
                </p>
                <p>
                    Service:{" "}
                    <select
                        onChange={e => setService(e.target.value as Service)}
                        value={service}
                    >
                        {Object.keys(Service).map((key: any) => (
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
                    {error && (
                        <p>
                            <b>ERROR: </b>
                            <br />
                            {error}
                        </p>
                    )}
                    <p>{returnedData}</p>
                </pre>
            </form>
        </div>
    );
};

export default App;
