import React, { useEffect, useState } from "react";
import "../styling/loginRegister.css";

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  

  useEffect(() => {
    const loginSession = localStorage.getItem('login')
    if (loginSession)  {
      window.location.href="http://localhost:3000/dashboard"
    }
  }, [])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.location.href = "http://localhost:3000/login";
      }, 1000);
    }
  }, [success]);

  

  const handleSubmit = async (e) => {
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
      name: fullname,
      username: username,
      password: password,
    };
    // Make API call to register user
    try {
      const response = await fetch("http://localhost:4000/user/register", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });

      let server_response = await response.json();
      setMessage(server_response.status);
      setSuccess(server_response.success);
      console.log(message)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div
          className="card bg-dark text-white"
          style={{ 'borderRadius' : '1rem' }}
        >
          <div className="card-body p-10 text-center">
            <h3 className="fw-bold mb-2  text-capitalize">Register</h3>
            <p className="text-white-50 ">
              Please enter your credentials!
            </p>

            <div className="form-outline form-white mb-4">
              <input
                value={fullname}
                onChange={e => setFullname(e.target.value)}
                type="text"
                id="typeEmailX"
                className="form-control form-control-lg"
              />
              <label className="form-label" for="typeEmailX">
                Name
              </label>
            </div>

            <div className="form-outline form-white mb-4">
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                id="typeEmailX"
                className="form-control form-control-lg"
              />
              <label className="form-label" for="typeEmailX">
                Username
              </label>
            </div>

            <div className="form-outline form-white mb-4">
              <input
                type="password"
                id="typePasswordX"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-control form-control-lg"
              />
              <label className="form-label" for="typePasswordX">
                Password
              </label>
            </div>

            <button className="btn btn-primary p-1 " type="submit" onClick={e => handleSubmit(e)}>
              Register
            </button>

            <div>
              <p className="mb-0">
                Already have an account?{" "}
                <a href="http://localhost:3000/login" className="text-white-50 fw-bold"style={{textDecoration: 'none'}}>Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
