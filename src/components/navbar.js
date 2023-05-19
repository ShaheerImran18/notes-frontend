import { Link, useLocation } from "react-router-dom";
import "../styling/home.css";
import { useEffect, useState } from "react";

const Navbar = ({ login }) => {
  
  let location = useLocation()
  const [logout, setLogout] = useState(false)


  let logoutUser = async () => {

      const response = await fetch('http://localhost:4000/user/logout', {
        method: 'GET', 
        credentials: 'include'
      })

      let res_json = await response.json();

      console.log(res_json)

      if (res_json.success) {
        localStorage.removeItem('login')
        window.location.href = "http://localhost:3000/login"
      }
  }

  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') {
    return null;
  }
  
  return (

    <div className="page-content container note-has-grid">
      {login ? (
        <ul className="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
          <li className="nav-item">
            <Link
              to={"/dashboard"}
              className="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active"
              id="all-category"
            >
              <span className="d-none d-md-block">Notes</span>
            </Link>
          </li>
          <li className="nav-item"></li>
          <li className="nav-item ml-auto">
            <a
              className="nav-link btn-primary rounded-pill d-flex align-items-center px-3"
              id="add-notes"
            >
              {" "}
              <i className="icon-note m-1"></i>
              <Link
                to={"/add"}
                style={{ "textDecoration": "none" }}
                className="d-none d-md-block font-14"
              >
                Add note
              </Link>
            </a>
          </li>
          <li className="nav-item ml-auto">
            <a 
              onClick={logoutUser}
              className="nav-link btn-primary rounded-pill d-flex align-items-center px-3"
              id="add-notes"
            >
              {" "}
              <i className="icon-note m-1" ></i>
              <Link
                style={{ "textDecoration": "none" }}
                className="d-none d-md-block font-14"
                
              >
                Logout
              </Link>
            </a>
          </li>
        </ul>
      ) : (
        <ul className="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
          <li className="nav-item">
            <Link
              to={"/"}
              className="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active"
              id="all-category"
            >
              <span className="d-none d-md-block">Notes</span>
            </Link>
          </li>
          <li className="nav-item"></li>
          <li className="nav-item ml-auto">
            <a
              className="nav-link btn-primary rounded-pill d-flex align-items-center px-3"
              id="add-notes"
            >
              {" "}
              <i className="icon-note m-1"></i>
              <Link
                to={"/login"}
                style={{ "textDecoration": "none" }}
                className="d-none d-md-block font-14"
              >
                Login
              </Link>
            </a>
          </li>
          <li className="nav-item ml-auto">
            <a
              className="nav-link btn-primary rounded-pill d-flex align-items-center px-3"
              id="add-notes"
            >
              {" "}
              <i className="icon-note m-1"></i>
              <Link
                to={"/register"}
                style={{ "textDecoration": "none" }}
                className="d-none d-md-block font-14"
              >
                Register
              </Link>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
