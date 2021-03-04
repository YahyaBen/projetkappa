import React from "react";
import firebase from "../Util/firebase";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";

const Attente = () => {

  const [Utilisateurs, setUtilisateurs] = useState([]);
  const [Size, setSize] = useState(firebase.firestore().collection("/GestionPauses").where("EnPause", "==", true).onSnapshot(Snap => { setSize(Snap.size) }))

  const isPause = async (B) => {

    if (Size <= 2) {
      firebase.firestore().collection("/GestionPauses").add({
        idUser: B.id,
        name: B.data().name,
        EnPause: true,
        DatePause: firebase.firestore.FieldValue.serverTimestamp(),
        EnTerminer: false,
        DateTerminer: null,
      });
      const db = firebase.firestore();
      const Modifier = db.batch();
      const Document = db.collection("Utilisateurs").doc(B.id);
      Modifier.update(Document, {
        EnPause: true,
      });
      await Modifier.commit();
    }
    else alert("Please wait ...")
  };

  //Read data
  useEffect( () => {
    firebase
      .firestore()
      .collection("Utilisateurs")
      .orderBy('timeFireBase', 'asc')
      .where("EnPause", "==", false)
      .onSnapshot((users) => {
        setUtilisateurs(users.docs);
      });
  }, [Size]);

  return (
    <div className="Table">
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td className="tg-ycr8">
              <strong>Name</strong>
            </td>
            <td className="tg-ycr8">
              <strong>TimeLocale</strong>
            </td>
            <td className="tg-i81m">
              <strong>TimeFireBase</strong>
            </td>
            <td className="tg-i81m">
              <strong>Action</strong>
            </td>
          </tr>
        </tbody>
        <tbody>
          {Utilisateurs.map((U) => (
            <tr key={U.id}>
              <td className="tg-ycr8">{U.data().name}</td>
              <td className="tg-ycr8">
                {new Date(U.data().DateDemandePause).toUTCString()}
              </td>
              <td className="tg-ycr8">
                {U.data({ serverTimestamps: "estimate" })
                  .timeFireBase.toDate()
                  .toTimeString().substring(0, 12)}
              </td>
              {/* // React dosent allow a date object o Array in children */}
              <td className="tg-ycr8">
                <Button variant="outline-primary" onClick={() => isPause(U)}>
                  Prendre Pause
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Attente;