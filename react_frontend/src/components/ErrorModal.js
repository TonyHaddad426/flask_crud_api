import React from "react";
import Card from "./Card";
import classes from "./Modal.module.css";


const ErrorModal = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.setError}>
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>Something went wrong:</h2>
        </header>
        <div className={classes.content}>
          <p className={classes.h1}>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <button type="submit" onClick={props.setError}>Okay</button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
