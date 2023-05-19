import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { useLocation } from 'react-router-dom';
import Landing from "./components/Landing";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import AddNote from "./components/AddNote.js";
import Navbar from "./components/navbar";
import { useEffect, useRef, useState } from "react";
import UpdateNote from "./components/UpdateNote";

const App = () => {
  //let location = useLocation();

  let [login, setLogin] = useState(false);

  useEffect(() => {
    const loginSession = localStorage.getItem("login");
    if (loginSession) {
      setLogin(loginSession);
    }
  }, []);

  return (
    <div style={{ background: "#1B2430" }}>
      <Router>
        <Navbar login={login} />

        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/add" element={<AddNote />} />
          <Route
            exact
            path="/login"
            element={<Login setLogin={setLogin} />}
          ></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path='/update/:id' element={<UpdateNote />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
