import Image from "next/image";
import CredentialForm from "../../../components/elements/CredentialForm";
import loginSVG from "../../../public/images/login.svg";

const Test = () => {
  const submitHandler = async (event, email, password) => {
    event.preventDefault();

    //Validate Form
    const form = document.querySelector(".needs-validation");
    if (form.checkValidity()) {
      console.log(`Parsed Email: ${email}`);
      console.log(`Email: ${event.target[0].value}`);
    }
    form.classList.add("was-validated");
  };

  return (
    <main
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "85vh" }}
    >
      <div className="row">
        <div className="col-md-6 mb-3 align-self-center">
          <h1>Login</h1>
          <CredentialForm
            submitButtonText="Login"
            submitHandler={submitHandler}
            leftButtonText="Register"
            leftButtonRoute="/account/register"
            centerButtonText="Forgot your password?"
            centerButtonRoute="/account/forgotpassword"
          ></CredentialForm>
        </div>
        <div className="col-md-6 d-none d-md-block">
          <Image src={loginSVG} alt="" className="img-fluid" />
        </div>
      </div>
    </main>
  );
};
export default Test;
