import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styling/loginRegister.css";

const Login = ({setLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loginSession = localStorage.getItem('login')
    if (loginSession)  {
      window.location.href="http://localhost:3000/dashboard"
    }
  }, [])


  useEffect(() => {
    if (success) {
      localStorage.setItem('login', true)
      setTimeout(() => {
        window.location.href = "http://localhost:3000/dashboard";
      }, 1000);
    }
  }, [success]);


  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform validation checks
    let errors = {};

    if (!username) {
      errors.username = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    let data = {
      username: username,
      password: password,
    };

    // Make API call to register user
    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        credentials: 'include'
        
      });

      let server_response = await response.json();
      
      setMessage(server_response.status);
      setSuccess(server_response.success);
      if (success) {
        console.log(server_response)
      }
      setLogin(true)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
        <div className="container d-flex flex-column justify-content-center align-items-center custom-container">
            <div className="card bg-dark text-white" style={{ "border-radius": "1rem" }}>
                <div className="card-body p-10 text-center">

                    <h3 className="fw-bold mb-2">Login</h3>
                    <p className="text-white-50 ">Please enter your credentials!</p>

                    <div className="form-outline form-white mb-4 col-12">
                        <input type="email" id="typeEmailX" className="form-control form-control-lg" 
                        value={username} onChange={e => setUsername(e.target.value)} />
                        <label className="form-label" for="typeEmailX">Username</label>
                    </div>

                    <div className="form-outline form-white mb-4 col-12">
                        <input type="password" id="typePasswordX" className="form-control form-control-lg"
                        value={password} onChange={e => setPassword(e.target.value)} />
                        <label className="form-label" for="typePasswordX">Password</label>
                    </div>

                    <div className="col-12 mb-4">
                        <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={e => handleLogin(e)}>Login</button>
                    </div>

                    <div>
                        <p className="mb-0">Don't have an account? <a href="http://localhost:3000/register" className="text-white-50 fw-bold" style={{ textDecoration: 'none' }}>Sign Up</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
