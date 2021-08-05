import React, { useState } from "react";
import classes from "./AdminForm.module.css";

const AddItemForm = (props) => {
  const [enteredStore, setEnteredStore] = useState("");
  const [enteredItem, setEnteredItem] = useState("");
  const [enteredItemPrice, setEnteredItemPrice] = useState("");

  const storeInputHandler = (event) => {
    setEnteredStore(event.target.value);
  };

  const itemInputHandler = (event) => {
    setEnteredItem(event.target.value);
  };

  const itemPriceInputHandler = (event) => {
    setEnteredItemPrice(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault(); // prevents default of request being seint.. which makes sure the page doesn't reload prematurely

    let store = enteredStore;
    if (enteredStore == "") {
      store = props.stores[0].store_name;
    }
    let store_id;
    for (let key in props.stores) {
      console.log(props.stores[key].store_name)
      if (props.stores[key].store_name === store) {
          store_id = props.stores[key].store_id
      }
    }

    const requestBody = {
      store: store,
      store_id: store_id,
      item: enteredItem,
      item_price: parseFloat(enteredItemPrice),
    };
    console.log("Request Body: ", requestBody);
    props.createItemHandler(requestBody);
    setEnteredStore("");
    setEnteredItem("");
    setEnteredItemPrice("");
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.user__controls}>
        <div className={classes.userfilter}>
          <div className={classes.user__control}>
            <label>Pick Store</label>
            <select
              name="Store"
              value={enteredStore}
              onChange={storeInputHandler}
            >
              {
                /* the map method takes an array and executes a function on each item within that array */
                props.stores.map((store) => (
                  <option key={store.store_id} value={store.store_name}>
                    {store.store_name}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
        <div className={classes.user__control}>
          <label>New Item</label>
          <input type="text" value={enteredItem} onChange={itemInputHandler} />
        </div>
        <div className={classes.user__control}>
          <label>New Item Price</label>
          <input
            type="text"
            value={enteredItemPrice}
            onChange={itemPriceInputHandler}
          />
        </div>
      </div>
      <div className={classes.user__actions}>
        <button type="submit">Add Item</button>
      </div>
    </form>
  );
};
export default AddItemForm;
