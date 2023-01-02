import Image from "next/image";
import CredentialForm from "../../../components/elements/CredentialForm";
import CredentialsWrapper from "../../../components/elements/CredentialsWrapper";
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
    <CredentialsWrapper title="Login" image={loginSVG}>
      <CredentialForm
        submitButtonText="Login"
        submitHandler={submitHandler}
        leftButtonText="Register"
        leftButtonRoute="/account/register"
        centerButtonText="Forgot your password?"
        centerButtonRoute="/account/forgotpassword"
      ></CredentialForm>
    </CredentialsWrapper>
  );
};
export default Test;
