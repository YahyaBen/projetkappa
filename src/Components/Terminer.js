import React from "react";
import firebase from "../Util/firebase";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";

const Terminer = () => {
  const [Done, setDone] = useState([]);

  const timer = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  const Details = (U) => {
    alert(
      U.data().name +
      " a mis : " +
      timer(
        U.data({
          serverTimestamps: "estimate",
        }).DateTerminer.toMillis() -
        U.data({
          serverTimestamps: "estimate",
        }).DatePause.toMillis()
      ) +
      " en pause."
    );
  };
  useEffect(() => {
   const Fermer = firebase
      .firestore()
      .collection("GestionPauses")
      .orderBy("DateTerminer","asc")
      .where("EnTerminer", "==", true)
      .onSnapshot((users) => {
        setDone(users.docs);
      });
      return () => Fermer()
  }, []);
  return (
    <div className="Table">
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td className="tg-ycr8"><strong>Name</strong></td>
            <td className="tg-ycr8"><strong>Temps A</strong></td>
            <td className="tg-ycr8"><strong>Temps B</strong></td>
            <td className="tg-i81m"><strong>Temps de pause(B-A)</strong></td>
            <td className="tg-i81m"><strong>Action</strong></td>
          </tr>
        </tbody>
        <tbody>
          {Done.map((U) => (
            <tr key={U.id}>
              <td className="tg-ycr8">{U.data().name}</td>
              <td className="tg-ycr8">
                {U.data({ serverTimestamps: "estimate" })
                  .DatePause.toDate()
                  .toTimeString().substring(0, 12)}{" "}
              </td>
              <td className="tg-ycr8">
                {U.data({ serverTimestamps: "estimate" })
                  .DateTerminer.toDate()
                  .toTimeString().substring(0, 12)}{" "}
              </td>
              <td className="tg-ycr8">
                {timer(
                  U.data({
                    serverTimestamps: "estimate",
                  }).DateTerminer.toMillis() -
                  U.data({
                    serverTimestamps: "estimate",
                  }).DatePause.toMillis()
                )}
              </td>
              <td className="tg-ycr8">
                <Button variant="outline-primary" onClick={() => Details(U)}>
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Terminer;
