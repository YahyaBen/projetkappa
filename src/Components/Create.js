import React from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import firebase from "../Util/firebase";
import { useState } from "react";

const Create = () => {
  const [nom, setNom] = useState("");

  // Add New
  const Add = () => {
    firebase.firestore().collection("/Utilisateurs").add({
      name: nom,
      DateDemandePause: Date.now(),
      timeFireBase: firebase.firestore.FieldValue.serverTimestamp(), // https://github.com/firebase/firebase-js-sdk/issues/1929
      EnPause: false, // https://firebase.google.com/docs/reference/js/firebase.firestore.SnapshotOptions.html
      EnTerminer: false,
    });

  };

  return (
    <div className="Input">
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Bonjour</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          id="inputGroup-sizing-default"
          placeholder="Enter votre nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>

      <Button type="submit" onClick={Add}>
        Demander
      </Button>
    </div>
  );
};

export default Create;
