import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Image from "next/image";
import Script from "next/script";
import Toast from "../elements/Toast";

import loginSVG from "../../public/images/login.svg";

const Login = () => {
  const supabase = useSupabaseClient();
  const [error, setError] = useState();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Validate Form
    const form = document.querySelector(".needs-validation");
    if (form.checkValidity()) {
      //Valid --> SignIn
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        setError(error);
      }
    }
    form.classList.add("was-validated");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <Toast
          colorScheme="danger"
          text={error.message}
          onDismiss={errorHandler}
        ></Toast>
      )}
      <main
        className="container d-flex-align-items-center justify-content-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="row">
          <div className="col-md-6 mb-3 align-self-center">
            <h1>Login</h1>
            <form
              className="needs-validation"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="email"
                  aria-describedby="validationEmail"
                  required
                />
                <div id="validationEmail" className="invalid-feedback">
                  Please enter your email address.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password{" "}
                  <i
                    className={
                      passwordVisible
                        ? `bi bi-eye-fill`
                        : `bi bi-eye-slash-fill`
                    }
                    id="pwVisToggle"
                    onClick={(e) => setPasswordVisible(!passwordVisible)}
                  ></i>
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="password"
                  name="password"
                  aria-describedby="validationDefaultPassword"
                  required
                />
                <div
                  id="validationDefaultPassword"
                  className="invalid-feedback"
                >
                  Please enter your password.
                </div>
              </div>

              <div className="row">
                <div className="col align-self-center">
                  <a href="/user/register">Register</a>
                </div>
                <div className="col d-flex justify-content-end">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <Image src={loginSVG} alt="" className="img-fluid" />
          </div>
        </div>

        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            id="liveToast"
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              {/* <img src="..." className="rounded me-2" alt="..."/> */}
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">
              Hello, world! This is a toast message.
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
