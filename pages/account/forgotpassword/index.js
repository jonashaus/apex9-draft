import CredentialForm from "../../../components/elements/CredentialForm";
import CredentialsWrapper from "../../../components/elements/CredentialsWrapper";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import forgotpasswordSVG from "../../../public/images/forgot_password.svg";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ForgotPassword = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      toast.warn("Please log out before requesting a new password!");
      router.push("/");
    }
  });

  const submitHandler = async (email, password) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email for the password reset instructions.");
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
