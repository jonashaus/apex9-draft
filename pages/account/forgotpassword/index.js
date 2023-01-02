import { useContext } from "react";
import { AppContext } from "../../../context/AppContextProvider";
import CredentialForm from "../../../components/elements/CredentialForm";
import CredentialsWrapper from "../../../components/elements/CredentialsWrapper";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import forgotpasswordSVG from "../../../public/images/forgot_password.svg";

const ForgotPassword = () => {
  const { handleAddToast } = useContext(AppContext);
  const supabase = useSupabaseClient();

  const submitHandler = async (email, password) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      handleAddToast("danger", error.message);
    } else {
      handleAddToast(
        "success",
        "Check your email for the password reset instructions."
      );
    }
  };
  return (
    <CredentialsWrapper title="Reset Password" image={forgotpasswordSVG}>
      <CredentialForm
        submitButtonText="Reset"
        submitHandler={submitHandler}
        noPassword
      ></CredentialForm>
    </CredentialsWrapper>
  );
};

export default ForgotPassword;
