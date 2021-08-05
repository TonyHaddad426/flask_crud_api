import "./MainHeader.css";
import { NavLink, useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./Store/Auth-Context";
// the Link component listens to clicks on the link and prevents the browser from reloading / sending a server request whenever navigating links
const MainHeader = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn; // stores whether the user is logged in or not
  const history = useHistory(); 

  const logoutHandler = () => {
    authCtx.logout()
    history.replace('/')
  }

  return (
    <header className="header">
      <nav>
        {!isLoggedIn && (
          <ul>
            <li>
              <NavLink activeClassName={"active"} exact to="/">
                Search
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={"active"} to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        )}

        {isLoggedIn && (
          <ul>
            <li>
              <NavLink activeClassName={"active"} exact to="/">
                Search
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={"active"} to="/admin">
                Admin
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default MainHeader;
