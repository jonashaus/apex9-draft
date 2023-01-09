import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContextProvider";

const Login = () => {
  const { handleAddToast } = useContext(AppContext);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div>
        <h1 className="">Welcome back Dale!</h1>
        <h2>Now please go home again!</h2>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            onClick={() => handleAddToast("success", "go back to canada")}
          >
            Fuck off
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
