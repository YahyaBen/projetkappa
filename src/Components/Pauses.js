import React from "react";
import firebase from "../Util/firebase";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Chrono from './Chrono'

const Pauses = () => {
  const [Pauses, setPauses] = useState([]);
  const [Test, setTest] = useState();
  ////////////////////////////////
  
  const [TabChrono,setTabChrono] = useState([])

  ///////////////////////////////

  const isDone =  async (B) => {

    const db = firebase.firestore();
    const Modifier = db.batch();

    if(Test !== undefined){
    firebase.firestore().collection("/GestionPauses").add({
      idUser: Test.id,
      name: Test.data().name,
      EnPause: true,
      DatePause: firebase.firestore.FieldValue.serverTimestamp(),
      EnTerminer: false,
      DateTerminer: null,
    });
    
    const DocumentA = db.collection("Utilisateurs").doc(Test.id);
        Modifier.update(DocumentA, {
      EnPause: true,
    });
  }
    const DocumentB = db.collection("GestionPauses").doc(B.id);

    Modifier.update(DocumentB, {
      EnPause: false,
      EnTerminer: true,
      DateTerminer: firebase.firestore.FieldValue.serverTimestamp(),  
    });

    await Modifier.commit();
  }

  useEffect(() => {
    
    const Fermer = firebase
      .firestore()
      .collection("GestionPauses")
      .orderBy("DatePause", "desc")
      .where("EnPause", "==", true)
      .onSnapshot((users) => {
        setPauses(users.docs);
      });
    firebase.firestore().collection("/Utilisateurs").orderBy("timeFireBase", "asc").where("EnPause", "==", false).onSnapshot((Users) => {
      setTest(Users.docs[0])
    })
    return () => Fermer()
  }, []);
  return (
    <div className="Table">
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td className="tg-ycr8"><strong>Name</strong></td>
            <td className="tg-i81m"><strong>TimePauseFB</strong></td>
            <td className="tg-i81m"><strong>Chrono</strong></td>
            <td className="tg-i81m"><strong>Action</strong></td>
          </tr>
        </tbody>
        <tbody>
          {Pauses.map((U) => (
            <tr key={U.data().id}>
              <td>{U.data().name}</td>
              <td className="tg-ycr8">
                {U.data({ serverTimestamps: "estimate" })
                  .DatePause.toDate().toTimeString().substring(0, 12)}{" "}
              </td>
              <td >
                
                
                
                <Chrono key={U.id} Time={U.data().DatePause == null ? "charger" : U.data({ serverTimestamps: 'estimate' }).DatePause.seconds} />
                
                
                
                
                </td>
              <td className="tg-ycr8">
                <Button key={U.id} variant="outline-primary" onClick={() => isDone(U)}>Terminer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Pauses;