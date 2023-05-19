import React, { useEffect, useState } from "react";
import { Link, json, useParams } from "react-router-dom";

function UpdateNote(props) {
  const { id } = useParams();

  const [note, setNote] = useState({});

  useEffect(() => {
    if (!id) return;
    const getNote = async () => {
      try {
        const res = await fetch(`http://localhost:4000/notes/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status == 404) {
          console.log("couldn fetch note");
          return;
        }

        const note_json = await res.json();

        setNote(note_json[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getNote();
  }, []);

  function handleChange(event) {
    setNote((prevNote) => {
      return {
        ...prevNote,
        [event.target.name]: event.target.value,
      };
    });
  }

  // if title or note missing, return
  const submitNote = async () => {
    if (!note.title) {
      console.log("No title");
      return;
    }
    if (!note.content) {
      console.log("No note content");
      return;
    }

    let bodyData = {
        'title': note.title,
        'content': note.content
    }
    const res = await fetch(`http://localhost:4000/notes/update/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bodyData), // body data type must match "Content-Type" header
      credentials: "include",
    });

    const json_response = await res.json();

    if (json_response.success) {
      window.location.href = "http://localhost:3000/dashboard";
      return;
    }
  };

  return (
    <div>
      <div
        className="col-md container p-3"
        style={{ "background-color": "#1B2430" }}
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
                            value={note.title || ''}
                            onChange={(e) => handleChange(e)}
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
                            value={note.content || ''}
                            onChange={(e) => handleChange(e)}
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
              <button
                className="m-3 btn btn-primary"
                data-dismiss="modal"
                onClick={submitNote}
              >
                Update
              </button>
              <Link to="/dashboard">
                <button id="btn-n-add" className="btn btn-danger">
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

export default UpdateNote;
