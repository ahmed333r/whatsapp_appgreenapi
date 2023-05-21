import { Route, Routes } from "react-router-dom";
import "./App.css";
import SendMsg from "./components/SendMsg";
import Main from "./pages/Main";
import { useEffect, useState } from "react";
function App() {
  const getData = (idInstance, apiToken) => {
    setIdInstance(idInstance);
    setApiToken(apiToken);
  };

  const [idInstance, setIdInstance] = useState("");
  const [apiToken, setApiToken] = useState("");
  console.log(idInstance);
  console.log(apiToken);
  useEffect(() => {
    const data1 = window.localStorage.getItem("Id");
    const data2 = window.localStorage.getItem("api");
    if (data1 !== "" && data2 !== "") {
      setIdInstance(data1);
      setApiToken(data2);
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem("Id", idInstance);
    window.localStorage.setItem("api", apiToken);
  }, [idInstance, apiToken]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main onSubmit={getData} />} />
        <Route
          path="/messages"
          element={
            <SendMsg idInstance={idInstance} apiTokenInstance={apiToken} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
