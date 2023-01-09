import CredentialForm from "../../../components/elements/CredentialForm";
import CredentialsWrapper from "../../../components/elements/CredentialsWrapper";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import loginSVG from "../../../public/images/login.svg";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Login = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  if (user) {
    toast.info("You're already logged in!");
    router.push("/");
  } else {
    const submitHandler = async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back!");
        router.push("/");
      }
    };
    return (
      <>
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
      </>
    );
  }
};
export default Login;
