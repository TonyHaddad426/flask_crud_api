import React, { useState } from "react";
import classes from "./UserForm.module.css";

const UserForm = (props) => {
  const [enteredStore, setEnteredStore] = useState("");
  const [enteredItem, setEnteredItem] = useState("");
  // console.log(props.stores[0].store_name);
  const storeInputHandler = (event) => {
    setEnteredStore(event.target.value);
  };

  const itemInputHandler = (event) => {
    setEnteredItem(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault(); // prevents default of request being seint.. which makes sure the page doesn't reload prematurely

    const requestBody = {
      store: enteredStore,
      item: enteredItem,
    };
    console.log("Request Body: ", requestBody);
    props.onFetchUserData(requestBody);
    setEnteredStore("");
    setEnteredItem("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.user__controls}>
        <div className={classes.userfilter}>
          <div className={classes.user__control}>
            <label>Store</label>
            <select name="Store" value={enteredStore} onChange={storeInputHandler}>
              <option value={null}>All Stores</option>
              {
                /* the map method takes an array and executes a function on each item within that array */
                props.stores.map((store) => (
                  <option key={store.store_id} value={store.store_name}>{store.store_name}</option>
                ))
              }
            </select>
          </div>
       </div>
        <div className={classes.user__control}>
          <label>Item</label>
          <input type="text" value={enteredItem} onChange={itemInputHandler} />
        </div>
      </div>
      <div className={classes.user__actions}>
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default UserForm;
