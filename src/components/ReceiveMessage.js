import axios from "axios";
import "./Receive.css";
import { useState } from "react";
function ReceiveMessage(props) {
  const idInstance = props.idInstance;
  const apiTokenInstance = props.apiTokenInstance;
  const host = "https://api.green-api.com";
  const [data, setData] = useState([]);
  const getMessage = () => {
    axios
      .get(
        `${host}/waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}`
      )
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      });
  };
  return (
    <>
      <div className="card w-50 m-4 h-25">
        <div className="card-body">
          <h1 className="card-title">Received Messages</h1>
          {data.map((ele) => {
            return ele.type === "incoming" &&
              ele.typeMessage === "textMessage" ? (
              <div key={ele.idMessage}>
                <div>Sender Name: {ele.senderName}</div>
                <div>Telephone: {ele.senderId}</div>
                <div>Message: {ele.textMessage}</div>
                <hr />
              </div>
            ) : null;
          })}
          <button
            onClick={getMessage}
            type="button"
            className="btn btn-primary"
          >
            Get message
          </button>
        </div>
      </div>
    </>
  );
}
export default ReceiveMessage;
