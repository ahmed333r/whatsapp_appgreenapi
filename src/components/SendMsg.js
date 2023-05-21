import axios from "axios";
import { useState } from "react";
import "./SendMsg.css";
import Swal from "sweetalert2";
import ReceiveMessage from "./ReceiveMessage";
import { Link } from "react-router-dom";

function SendMsg(props) {
  const idInstance = props.idInstance;
  const apiTokenInstance = props.apiTokenInstance;
  const host = "https://api.green-api.com";

  const [message, setMessage] = useState("");
  const [telephone, setTelephone] = useState("");
  const [telephoneDirty, setTelephoneDirty] = useState(false);
  const [telephoneError, setTelephoneError] = useState(
    "This Field cannot be empty"
  );
  // const [valid, setValid] = useState(false);
  const body = {
    chatId: `${telephone}@c.us`,
    message: message,
  };

  const send = () =>
    axios
      .post(
        `${host}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        body
      )
      .then((data) => {
        console.log(data.status);
        data.status === 200
          && Swal.fire("Your message has been sent.")
      }).catch(() => {
        return  Swal.fire("Error, message hasn't been sent.");
      })
  const telephoneNumHandler = (e) => {
    setTelephone(e.target.value);
    const reg = /^7\d{10}$/i;
    const check = reg.test(e.target.value);
    if (!check) {
      setTelephoneError("Number begins with 7 and consists of 11 numbers");
    } else {
      setTelephoneError("");
    }
  };
  const blurHandler = (e) => {
    setTelephoneDirty(true);
  };

  return (
    <>
      <div className="form m-5 bg-success col-4 p-4">
        <h5 className="h4">Send a message</h5>
        <label
          style={{ marginBottom: "0px" }}
          htmlFor="telephone"
          className="form-label"
        >
          Telephon Number
        </label>
        {telephoneDirty && telephoneError && (
          <div
            style={{
              color: "red",
              fontSize: "12px",
            }}
            className="note"
          >
            ({telephoneError})
          </div>
        )}
        <input
          onBlur={blurHandler}
          type="text"
          name="telephone"
          value={telephone}
          className="form-control"
          onChange={telephoneNumHandler}
          id="telephone"
          placeholder="Telephon Number"
        />

        <label htmlFor="message" className="form-label">
          Message
        </label>
        <input
          value={message}
          className="form-control"
          id="message"
          placeholder="Message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          onClick={send}
          type="button"
          className="btn btn-secondary mt-5"
        >
          Send Message
        </button>
      </div>
      <ReceiveMessage
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
      />
      <button type="button" className="btn btn-primary bt ">
        <Link className="link" to="/">
          Back
        </Link>
      </button>
    </>
  );
}
export default SendMsg;
