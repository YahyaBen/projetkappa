import React from "react";
// import firebase from "../Util/firebase";
import { Button } from "react-bootstrap";

const Reset = () => {

  const isReset = async () => {
    // const db = firebase.firestore();  // https://stackoverflow.com/questions/53836195/firebase-functions-update-all-documents-inside-a-collection
    // const Modifier = db.batch();      // https://www.reddit.com/r/Firebase/comments/e9l5kk/can_i_update_multiple_docs_in_collection_group_in/

    // firebase
    // .firestore()
    // .collection("GestionPauses")
    // .where("EnTerminer", "==", true)
    // .onSnapshot((users) => {
    //     Modifier.update(users,{
    //         EnPause: false,
    //   EnTerminer: false,
    // })});
    // await Modifier.commit();
  }



  return (
    <div>
      <Button variant="outline-danger" onClick={() => isReset()}>
        Reset
      </Button>
    </div>
  );
};

export default Reset;
