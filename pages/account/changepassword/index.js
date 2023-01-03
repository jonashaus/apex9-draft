import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContextProvider";
import CredentialForm from "../../../components/elements/CredentialForm";
import CredentialsWrapper from "../../../components/elements/CredentialsWrapper";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import changepasswordSVG from "../../../public/images/change_password.svg";
import { useRouter } from "next/router";

const ChangePassword = () => {
  const { handleAddToast } = useContext(AppContext);
  const supabase = useSupabaseClient();

  const router = useRouter();
  const user = useUser();
  useEffect(() => {
    if (!user) {
      handleAddToast(
        "warning",
        "You have to log in before you can change your password!"
      );
      router.push("/account/login");
    }
  }, []);

  const submitHandler = async (email, password) => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) {
      handleAddToast("danger", error.message);
    } else {
      handleAddToast("success", "Your password was changed successfully");
      router.push("/");
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
