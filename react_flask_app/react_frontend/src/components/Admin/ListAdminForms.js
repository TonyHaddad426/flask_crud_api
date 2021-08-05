import React from "react";
import AddItemForm from "./AdminForms/AddItemForm";
import AddStoreForm from "./AdminForms/AddStoreForm";
import classes from "./ListAdminForms.module.css";
import ErrorModal from "../ErrorModal"

const ListAdminForms = (props) => {
  // the requestBody data is passed up to this component via the props sent to the UserForm component
  const saveAdminItemResponseData = (requestBody) => {
    const data = {
      ...requestBody,
    };
    // here we are passing the request body data, to be sent to the Flask backend server, up to the App.js file
    props.createItemHandler(data);
  };

  const saveAdminStoreResponseData = (requestBody) => {
    const data = {
      ...requestBody,
    };
    // here we are passing the request body data, to be sent to the Flask backend server, up to the App.js file
    props.createStoreHandler(data);
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
       <h1 className={classes.title}>Add an item to an existing store</h1>
      <div className={classes.user}>
     
        <AddItemForm
          stores={props.stores}
          createItemHandler={saveAdminItemResponseData}
        ></AddItemForm>
      </div>
      <h1 className={classes.title}>Add a new store</h1>
      <div className={classes.user}>
        <AddStoreForm
        
          setError={props.setError}
          updateStoreListHandler={props.updateStoreListHandler}
          createStoreHandler={saveAdminStoreResponseData}
        ></AddStoreForm>
      </div>
    </div>
  );
};

export default ListAdminForms;
