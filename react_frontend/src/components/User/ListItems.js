import React from "react";
import UserForm from "./UserForm/UserForm";
import classes from "./ListItems.module.css";
import ErrorModal from "../ErrorModal";

const ListItems = (props) => {
  // the requestBody data is passed up to this component via the props sent to the UserForm component
  const saveUserResponseData = (requestBody) => {
    const data = {
      ...requestBody,
    };
    // here we are passing the request body data, to be sent to the Flask backend server, up to the App.js file
    props.onAddItems(data);
  };

  let displayErrorModal;

  if (props.error) {
    displayErrorModal = <ErrorModal setError={props.setError} message={props.error}></ErrorModal>;
  } else {
    displayErrorModal = null;
  }

  return (
    <div>
      {displayErrorModal}
      <div>
        <h1 className={classes.title}>
          Search for items in a store
        </h1>
        <div className={classes.user}>
          <UserForm
            stores={props.storeNameList}
            onFetchUserData={saveUserResponseData}
          ></UserForm>
        </div>
      </div>
    </div>
  );
};

export default ListItems;
