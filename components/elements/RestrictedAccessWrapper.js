import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const RestrictedAccessWrapper = (props) => {
  const [accessCode, setAccessCode] = useState("");
  const [protectedContentVisible, setProtectedContentVisible] = useState(false);

  const handleSubmit = () => {
    if (accessCode == props.accessCode) {
      setProtectedContentVisible(true);
    } else {
      toast.error("Incorrect access code");
    }
  };

  return (
    <div className="container">
      {!protectedContentVisible ? (
        <div
          className="container d-flex align-items-center justify-content-center"
          style={{ minHeight: "85vh" }}
        >
          <div className="row">
            <form className="row text-center">
              <label htmlFor="accessCode" className="form-label">
                Access Code
              </label>
              <input
                id="accessCode"
                className="form-control mb-3 text-center"
                type="password"
                onChange={(e) => setAccessCode(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Enter
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>{props.children}</>
      )}
    </div>
  );
};

export default RestrictedAccessWrapper;
