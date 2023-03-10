import CredentialForm from "../../../components/elements/CredentialForm";
import CredentialsWrapper from "../../../components/elements/CredentialsWrapper";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import changepasswordSVG from "../../../public/images/change_password.svg";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ChangePassword = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const submitHandler = async (email, password) => {
    if (!user) {
      toast.warn("You have to log in before you can change your password!");
    } else {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Your password was changed successfully");
        router.push("/");
      }
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
