import { useEffect, useState } from "react";
import "./Main.css";
import { Link } from "react-router-dom";

function Main(props) {
  const [idInstance, setIdInstance] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [idInstanceDirty, setIdInstanceDirty] = useState(false);
  const [apiTokenDirty, setApiTokenDirty] = useState(false);
  const [idInstanceError, setIdInstanceError] = useState(
    "This field shouldnot be empty"
  );
  const [apiTokenError, setApiTokenError] = useState(
    "This field shouldnot be empty"
  );
  const [formValid, setFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(idInstance, apiToken);
  };
  useEffect(() => {
    if (idInstanceError || apiTokenError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [idInstanceError, apiTokenError, formValid]);
  const idInstanceHandler = (e) => {
    setIdInstance(e.target.value);
    const reg = /^\d+$/;
    const check = reg.test(e.target.value);
    if (!check && e.target.value) {
      setIdInstanceError("The Id Instance should only be numbers");
    } else {
      setIdInstanceError("");
    }
  };
  const apiTokenHandler = (e) => {
    setApiToken(e.target.value);
    const reg = /^[^\W]+$/i;
    const check = reg.test(e.target.value);
    if (!check) {
      setApiTokenError("The Api Token should  not contain special characters");
    } else {
      setApiTokenError("");
    }
  };
  const blurHandler = (e) => {
    switch (e.target.name) {
      case "idinstance":
        setIdInstanceDirty(true);
        break;
      case "apitoken":
        setApiTokenDirty(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="all">
      <div className="topbox">Logo</div>
      <div className="centerbox">
        <p className="header">Use WhatApp on your computer</p>
        <ol className="list">
          <li>Create account on the website of Green ApI</li>
          <li>Authorize User account</li>
          <li>Get access parameters and fill this fields</li>
        </ol>
        <div className="code">
          Enter your info from green ApI
          <form>
            <label>Id instance</label>
            {idInstanceError && idInstanceDirty && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {idInstanceError}
              </div>
            )}
            <input
              onBlur={blurHandler}
              name="idinstance"
              type="text"
              value={idInstance}
              onChange={idInstanceHandler}
            />
            <label>ApI Token</label>
            {apiTokenError && apiTokenDirty && (
              <div style={{ color: "red", fontSize: "11px" }}>
                {apiTokenError}
              </div>
            )}
            <input
              onBlur={blurHandler}
              name="apitoken"
              type="text"
              value={apiToken}
              onChange={apiTokenHandler}
            />
            <button
              className="btn btn-info mt-3 col-4"
              disabled={!formValid}
              onClick={handleSubmit}
            >
              <Link className="link" to={"/messages"}>
                Enter
              </Link>
            </button>
          </form>
        </div>
        <div className="tutorial"></div>
      </div>
    </div>
  );
}
export default Main;
