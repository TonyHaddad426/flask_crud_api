import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import ErrorModal from "../ErrorModal";
import Spinner from "../Spinner";
import AuthContext from "../Store/Auth-Context";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const history = useHistory();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  console.log("isLogin ", isLogin);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: add validation
    if (isLogin) {
      setIsLoading(true);
      // if isLogin is true, then authenticate existing user
      fetch(`http://127.0.0.1:5000/auth`, {
        method: "POST",
        body: JSON.stringify({
          username: enteredUsername,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("response", response);
          return response.json(); // return promise
        })
        .then((data) => {
          console.log("Auth response ", data, data.description);
          if (data.description) {
            throw new Error(data.description);
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
          console.log("JWT ", data.access_token);
          authCtx.login(data.access_token, Date.now() + 3600000); // persist auth token provided by flask backend server
          history.replace("/admin"); // use history object to call the replace method
        })
        .catch((err) => props.setError(err.message));
    } else {
      setIsLoading(true);
      // else if isLogin is false, create new user
      fetch(`http://127.0.0.1:5000/register`, {
        method: "POST",
        body: JSON.stringify({
          username: enteredUsername,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          setIsLoading(false)
          console.log("response", response);
          return response.json(); // return promise
        })
        .then((data) => {
          console.log("Signup response ", data);
          if (data.message && data.message !== "User created succesfully") {
            throw new Error(data.message);
          }
          history.replace("/login");
          switchAuthModeHandler();
          alert("User created succesfully. Please login!")
          
        })
        .catch((err) => props.setError(err.message));
    }
  };

  let displayErrorModal;

  if (props.error) {
    displayErrorModal = (
      <ErrorModal
        setError={props.errorHandler}
        message={props.error}
      ></ErrorModal>
    );
  } else {
    displayErrorModal = null;
  }

  return (
    <div>
      {displayErrorModal}
      <h1 className={classes.title}>
        Login or create new user to add new items or stores
      </h1>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              required
              ref={usernameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <Spinner />}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
