import React, { useState } from "react";
import "./Item.css";

function Item(props) {
  // changes to state cause child components to be rendered / updated again
  useState(); // useState is a React hook that returns an array

  return (
    <div className="item">
      <div>{props.store}</div>
      <div className="item__description">
        <h2>{props.title}</h2>
        <div className="item__price">${props.amount}</div>
      </div>
    </div>
  );
}

export default Item;
