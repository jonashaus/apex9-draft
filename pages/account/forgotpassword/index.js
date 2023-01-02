import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Image from "next/image";
import loginSVG from "../../../public/images/login.svg";

const ForgotPassword = () => {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    //Validate Form
    const form = document.querySelector(".needs-validation");
    if (form.checkValidity()) {
      //Valid --> Reset Password
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://www.youtube.com/watch?v=0Fs96oZ4se0&t=1229s",
      });
      if (error) {
        handleAddToast("danger", error.message);
      } else {
        handleAddToast(
          "success",
          "Check your email for the password reset instructions."
        );
      }
    }
    form.classList.add("was-validated");
  };
  return (
    <>
      <main
        className="container d-flex align-items-center justify-content-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="row">
          <div className="col-md-6 mb-3 align-self-center">
            <h1>Reset Password</h1>
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
              <div className="row">
                <div className="col d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Reset password
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

export default ForgotPassword;
