import { useState } from "react";
import { useRouter } from "next/router";

const CredentialForm = ({
  submitButtonText,
  submitHandler,
  centerButtonText,
  centerButtonRoute,
  leftButtonText,
  leftButtonRoute,
  scorePassword,
  emailReadOnly,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordScore, setPasswordScore] = useState({
    score: 0,
    classes: "form-control",
    text: " ",
  });

  const linkDivClasses = leftButtonText
    ? "justify-content-between"
    : "justify-content-end";

  const submitMiddleWare = (event) => {
    submitHandler(event, email, password);
  };

  const passwordInputHandler = async (event) => {
    let score = calculatePWscore(event.target.value);
    let scoreValue = { score: 0, classes: "", text: " " };
    if (score > 0)
      scoreValue = {
        score: score,
        classes: "c-danger",
        text: "Too weak",
      };
    if (score > 40)
      scoreValue = {
        score: score,
        classes: "c-warning",
        text: "Could be stronger",
      };
    if (score > 70)
      scoreValue = {
        score: score,
        classes: "c-success",
        text: "Strong!",
      };
    if (score > 80)
      scoreValue = {
        score: score,
        classes: "c-success",
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
    <form className="needs-validation" onSubmit={submitMiddleWare} noValidate>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          value={email || ""}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          aria-describedby="validationEmail"
          required
          disabled={emailReadOnly}
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
              passwordVisible ? `bi bi-eye-fill` : `bi bi-eye-slash-fill`
            }
            id="pwVisToggle"
            onClick={() => setPasswordVisible(!passwordVisible)}
          ></i>
        </label>
        <input
          type={passwordVisible ? "text" : "password"}
          value={password || ""}
          name="password"
          className={`form-control ${scorePassword && passwordScore.classes}`}
          aria-describedby="validationPassword"
          onChange={(e) => setPassword(e.target.value)}
          onInput={scorePassword && passwordInputHandler}
          required
        />

        {scorePassword && (
          <div id="passwordScore" className="form-text">
            {passwordScore.text}
          </div>
        )}
        <div id="validationPassword" className="invalid-feedback">
          Please choose a password.
        </div>
      </div>
      <div className="row">
        <div className={`col d-flex ${linkDivClasses}`}>
          {leftButtonRoute && (
            <button
              type="button"
              className="btn btn-link ps-0"
              onClick={() => router.push(`${leftButtonRoute}`)}
            >
              {leftButtonText}
            </button>
          )}
          {centerButtonRoute && (
            <button
              type="button"
              className="btn btn-link"
              onClick={() => router.push(`${centerButtonRoute}`)}
            >
              {centerButtonText}
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {submitButtonText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CredentialForm;
