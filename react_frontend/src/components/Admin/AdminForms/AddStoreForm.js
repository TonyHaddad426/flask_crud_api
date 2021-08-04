import React, { useCallback, useEffect, useState } from "react";
import classes from "./AdminForm.module.css";

const AddStoreForm = (props) => {
  const [enteredStore, setEnteredStore] = useState("");



  const storeInputHandler = (event) => {
    setEnteredStore(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault(); // prevents default of request being sent.. which makes sure the page doesn't reload prematurely
    let store = enteredStore;

    const requestBody = {
      store: store,
    };
    console.log("Request Body: ", requestBody);
    props.createStoreHandler(requestBody); // createStoreHandler must be passed down from App.js
    setEnteredStore("");



  };




  return (
    <form onSubmit={submitHandler}>
      <div className={classes.user__controls}>
        <div className={classes.userfilter}>
        <div className={classes.user__control}>
          <label>New Store</label>
          <input
            type="text"
            value={enteredStore}
            onChange={storeInputHandler}
          />
          </div>
        </div>
      </div>
      <div className={classes.user__actions}>
        <button type="submit">Add Store</button>
      </div>
    </form>
  );
};

export default AddStoreForm;
