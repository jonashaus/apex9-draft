import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Tags from "../../components/elements/Tags";

const Testing = () => {
  const [tags, setTags] = useState([
    "admin",
    "camelot",
    "synlab",
    "purchaser",
    "member",
    "teacher",
  ]);

  const addTagHandler = (tag) => {
    setTags((prevState) => {
      return [...prevState, tag];
    });
  };

  const removeTagHandler = (tag) => {
    setTags(tags.filter((e) => e !== tag));
  };

  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      >
        Launch demo modal
      </button>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal1" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Modal title</h1>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal2" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">"user.full_name"</h3>
                <div className="col d-flex justify-content-end">
                  <button className="btn btn-warning text-white me-3">
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button className="btn btn-danger text-white">
                    <i className="bi bi-trash2-fill"></i>
                  </button>
                </div>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testing;
