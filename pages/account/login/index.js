import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Image from "next/image";
import Toast from "../../../components/elements/Toast";
import loginSVG from "../../../public/images/login.svg";

const Login = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [toast, setToast] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    //Validate Form
    const form = document.querySelector(".needs-validation");
    if (form.checkValidity()) {
      //Valid --> Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        setToast({ colorScheme: "danger", text: error.message });
      } else {
        setToast({
          colorScheme: "success",
          text: "Welcome back!",
        });
      }
    }
    form.classList.add("was-validated");
  };

  const toastHandler = () => {
    setToast(null);
  };

  return (
    <>
      {toast && (
        <Toast
          colorScheme={toast.colorScheme}
          text={toast.text}
          onDismiss={toastHandler}
        ></Toast>
      )}
      <main
        className="container d-flex align-items-center justify-content-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="row">
          <div className="col-md-6 mb-3 align-self-center">
            <h1>Login</h1>
            <form
              className="needs-validation"
              onSubmit={submitHandler}
              noValidate
            >
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
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
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  ></i>
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  aria-describedby="validationPassword"
                  required
                />
                <div id="validationPassword" className="invalid-feedback">
                  Please enter your password.
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-link ps-0"
                    onClick={() => router.push("/account/register")}
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => router.push("/account/forgotpassword")}
                  >
                    Forgot your password?
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <Image src={loginSVG} alt="" className="img-fluid" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
