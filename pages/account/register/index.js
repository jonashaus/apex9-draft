import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Toast from "../../../components/elements/Toast";
import registerSVG from "../../../public/images/register.svg";

const Register = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [toast, setToast] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState({
    score: 0,
    classes: "form-control",
    text: " ",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    //Validate Form
    const form = document.querySelector(".needs-validation");
    if (form.checkValidity()) {
      //Valid --> Register
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        setToast({ colorScheme: "danger", text: error.message });
      } else {
        setToast({
          colorScheme: "success",
          text: "Check your email for the confirmation link.",
        });
      }
    }
    form.classList.add("was-validated");
  };

  const toastHandler = () => {
    setToast(null);
  };

  const passwordInputHandler = async (event) => {
    let score = calculatePWscore(event.target.value);
    let scoreValue = { score: 0, classes: "form-control", text: " " };
    if (score > 0)
      scoreValue = {
        score: score,
        classes: "form-control c-danger",
        text: "Too weak",
      };
    if (score > 40)
      scoreValue = {
        score: score,
        classes: "form-control c-warning",
        text: "Could be stronger",
      };
    if (score > 70)
      scoreValue = {
        score: score,
        classes: "form-control c-success",
        text: "Strong!",
      };
    if (score > 80)
      scoreValue = {
        score: score,
        classes: "form-control c-success",
        text: "Fucking strong!",
      };
    setPassword(event.target.value);
    setPasswordScore(scoreValue);
  };

  const calculatePWscore = (pw) => {
    let score = 0;
    if (pw) {
      // award every unique letter until 5 repetitions
      var letters = new Object();
      for (let i = 0; i < pw.length; i++) {
        letters[pw[i]] = (letters[pw[i]] || 0) + 1;
        score += 5.0 / letters[pw[i]];
      }

      // bonus points for mixing it up
      let variations = {
        digits: /\d/.test(pw),
        lower: /[a-z]/.test(pw),
        upper: /[A-Z]/.test(pw),
        nonWords: /\W/.test(pw),
      };

      let variationCount = 0;
      for (let check in variations) {
        variationCount += variations[check] == true ? 1 : 0;
      }
      score += (variationCount - 1) * 10;
    }
    return score;
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
          <div className="col-12 col-md-6 mb-3 align-self-center">
            <h1>Register</h1>
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
                  Please enter a valid email address.
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
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  ></i>
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password || ""}
                  className={passwordScore.classes}
                  aria-describedby="validationPassword"
                  onInput={passwordInputHandler}
                  required
                />

                <div id="passwordScore" className="form-text">
                  {passwordScore.text}
                </div>

                <div id="validationPassword" className="invalid-feedback">
                  Please choose a password.
                </div>
              </div>
              <div className="row">
                <div className="col align-self-center">
                  <button
                    type="button"
                    className="btn btn-link ps-0"
                    onClick={() => router.push("/account/login")}
                  >
                    Login
                  </button>
                </div>
                <div className="col d-flex justify-content-end">
                  <button className="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <Image src={registerSVG} alt="" className="img-fluid" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
