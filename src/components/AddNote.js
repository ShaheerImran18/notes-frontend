import React, { useState } from "react";
import { Link, json } from "react-router-dom";

function AddNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {

    setNote((prevNote) => {
      return {
        ... prevNote,
        [event.target.name]: event.target.value,
      };
    });

  }

  // if title or note missing, return
  const submitNote = async () => {


    if (!note.title) {
      console.log('No title')
      return
    }
    if (!note.content) {
      console.log('No note content')
      return
    }

    const res = await fetch('http://localhost:4000/notes/add', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(note), // body data type must match "Content-Type" header
        credentials: 'include'
    })

    const json_response = await res.json()

    if (json_response.success) {
      window.location.href = "http://localhost:3000/dashboard"
      return
    }
    
  }

  return (
    <div>
      <div
        className="col-md container p-3"
        style={{'background-color': "#1B2430"}}
        id="addnotesmodal"
        
      >
        <div classNameName="" role="document">
          <div className="border-0">
           
            <div className="">
              <div className="notes-box">
                <div className="notes-content">
                  <form id="addnotesmodalTitle">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="note-title">
                          <label>Note Title</label>
                          <input
                          onChange={e => handleChange(e)}
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            minlength="60"
                            placeholder="Title"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="note-description">
                          <label>Note Description</label>
                          <textarea
                            onChange={e => handleChange(e)}
                            name="content"
                            id="note-has-description"
                            className="form-control"
                            minlength="60"
                            placeholder="Description"
                            rows="10"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              
              <button className="m-3 btn btn-primary" data-dismiss="modal" onClick={submitNote}>
                Add
              </button>
              <Link to="/dashboard"><button id="btn-n-add" className="btn btn-danger"  >
                Discard
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
