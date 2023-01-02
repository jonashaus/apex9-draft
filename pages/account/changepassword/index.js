import { useContext } from "react";
import { AppContext } from "../../../context/AppContextProvider";
import CredentialForm from "../../../components/elements/CredentialForm";
import CredentialsWrapper from "../../../components/elements/CredentialsWrapper";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import changepasswordSVG from "../../../public/images/change_password.svg";

const ChangePassword = () => {
  const { handleAddToast } = useContext(AppContext);
  const supabase = useSupabaseClient();

  const submitHandler = async (email, password) => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) {
      handleAddToast("danger", error.message);
    } else {
      handleAddToast("success", "Your password was changed successfully");
    }
  };
  return (
    <CredentialsWrapper title="Change Password" image={changepasswordSVG}>
      <CredentialForm
        submitButtonText="Change"
        submitHandler={submitHandler}
        noEmail
      ></CredentialForm>
    </CredentialsWrapper>
  );
};

export default ChangePassword;
