import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styling/home.css";

const Dashboard = ({setUpdateId}) => {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    let session = localStorage.getItem("login");

    const getNotes = async () => {
      try {
        const response = await fetch("http://localhost:4000/notes/", {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          credentials: "include",
        });

        if (response.status != 200) {
          localStorage.removeItem("login");
          window.location.href = "http://localhost:3000/login";
        }
        const res_json = await response.json();
        console.log(res_json);

        setNotes(res_json);
      } catch (err) {
        console.log(err);
      }
    };

    getNotes();
  }, []);

  const deleteNote = async (id) => {
      const res = await fetch(`http://localhost:4000/notes/del/${id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: 'include'
      })

      console.log(res)
      const res_json = await res.json()
      console.log(res_json)

      if (res_json.success) {
        window.location.href = "http://localhost:3000/dashboard"
        return
      }
  };

  return (
    <div className="page-content container note-has-grid">
      <div className="tab-content bg-transparent">
        <div id="note-full-container" className="row">
          {notes.map((note) => {
            return (
              
              <div
                className="col-sm-4 single-note-item all-category note-important"
                key={note._id}
              >
                <div className="card card-body">
                <Link to={{pathname:`/update/${note._id}` } } style={{"textDecoration": "none"}}>
                  <span className="side-stick"></span>
                  <h5
                    className="note-title text-truncate w-75 mb-0"
                    data-noteheading="Go for lunch"
                  >
                    {note.title}{" "}
                    <i className="point fa fa-circle ml-1 font-10"></i>
                  </h5>
                  </Link>
                  <p className="note-date font-12 text-muted">
                    {note.created_at}
                  </p>
                  <div className="note-content">
                    <p
                      className="note-inner-content text-muted"
                      data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis."
                    >
                      {note.content}
                    </p>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <span className="mr-1">
                      <i className="fa fa-star favourite-note"></i>
                    </span>
                    <span className="mr-1">
                      <i className="fa fa-trash remove-note"></i>
                    </span>
                   
                    <div className="ml-auto">
                      <a className="nav-link dropdown-toggle category-dropdown label-group p-0" 
                      style={{"color": "red", "textDecoration":"underline"}} onClick={e => deleteNote(note._id)}>
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
