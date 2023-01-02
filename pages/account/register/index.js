import { useContext } from "react";
import { AppContext } from "../../../context/AppContextProvider";
import CredentialForm from "../../../components/elements/CredentialForm";
import CredentialsWrapper from "../../../components/elements/CredentialsWrapper";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import registerSVG from "../../../public/images/register.svg";

const Register = () => {
  const { handleAddToast } = useContext(AppContext);
  const supabase = useSupabaseClient();

  const submitHandler = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      handleAddToast("danger", error.message);
    } else {
      handleAddToast("success", "Check your email for the confirmation link.");
    }
  };

  return (
    <CredentialsWrapper title="Register" image={registerSVG}>
      <CredentialForm
        submitButtonText="Register"
        submitHandler={submitHandler}
        leftButtonText="Login"
        leftButtonRoute="/account/login"
        scorePassword
      ></CredentialForm>
    </CredentialsWrapper>
  );
};

export default Register;
